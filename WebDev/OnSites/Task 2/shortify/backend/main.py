import ast
import string
import random
import requests
from flask import Flask, request, redirect
from flaskext.mysql import MySQL
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

mysql=MySQL()
app.config['MYSQL_DATABASE_USER'] = 'shortify'
app.config['MYSQL_DATABASE_PASSWORD'] = 'smolboiurls'
app.config['MYSQL_DATABASE_DB'] = 'shortify'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

@app.route('/api/get-urls', methods=['GET'])
@cross_origin()
def get_urls():
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM urls")
    data = cursor.fetchall()
    return {'status': 'success', 'data': data}

@app.route('/api/shorten-url', methods=['POST'])
@cross_origin()
def shorten_url():
    conn = mysql.connect()
    cursor = conn.cursor()
    dict_str = request.data.decode("UTF-8")
    mydata = ast.literal_eval(dict_str)
    customshort=False
    url = mydata['url']
    cursor.execute("SELECT * FROM urls WHERE longurl = %s;", (url,))
    data = cursor.fetchone()
    if data is not None:
        return {'status': 'fail', 'message': 'URL already exists'}
    cursor.execute("SELECT shortedurl FROM urls;")
    data = cursor.fetchall()
    shorts=[]
    for x in data:
        shorts.append(x[0])
    if 'short' in mydata:
        short = mydata['short']
        customshort=True
        if short in shorts:
            return {'status': 'fail', 'message': 'Short URL already exists'}
    if customshort==False:
        loop=True
        while loop:
            short = ''.join(random.choices(string.ascii_letters + string.digits, k = 7))  
            if short not in shorts:
                loop=False     
    cursor.execute("INSERT INTO urls (longurl, shortedurl, clicks, locationdata) VALUES (%s, %s, %s, %s);", (url, short, '0', 'None'))
    conn.commit()
    cursor.execute("SELECT * FROM urls WHERE longurl = %s;", (url,))
    data = cursor.fetchone()
    cursor.close()
    return {'status': 'success', 'data':data}

@app.route('/api/get-location-data', methods=['POST'])
@cross_origin()
def get_locationdata():
    conn = mysql.connect()
    cursor = conn.cursor()
    dict_str = request.data.decode("UTF-8")
    mydata = ast.literal_eval(dict_str)
    url = mydata['url']
    cursor.execute('SELECT locationdata FROM urls where shortedurl = %s;',(url,))
    data = cursor.fetchone()[0]
    return {'status':'lol', 'payload':data}

@app.route('/api/delete-url', methods=['POST'])
@cross_origin()
def delete_url():
    conn = mysql.connect()
    cursor = conn.cursor()
    dict_str = request.data.decode("UTF-8")
    mydata = ast.literal_eval(dict_str)
    url = mydata['url']
    cursor.execute('DELETE FROM urls WHERE shortedurl = %s;',(url,))
    conn.commit()
    cursor.close()
    return {'status':'success'}

@app.route('/<url>')
@cross_origin()
def redirect_url(url):
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM urls WHERE shortedurl = %s;", (url,))
    data = cursor.fetchone()
    if data is None:
        return {'status': 'fail', 'message': 'URL does not exist'}
    cursor.execute("UPDATE urls SET clicks = clicks + 1 WHERE shortedurl = %s;", (url,))   
    conn.commit()
    redirect_url = data[1]

    if 'HTTP_X_FORWARDED_FOR' in request.environ:
        req=request.environ['HTTP_X_FORWARDED_FOR']
    else:
        req = request.remote_addr

    locationdata = requests.get('http://ip-api.com/json/'+req+'?fields=status,message,continent')

    if 'continent' in locationdata.json():
        loc = locationdata.json()['continent']
    else:
        loc= 'localhost'

    cursor.execute('SELECT locationdata FROM urls where shortedurl = %s;',(url,))
    data = cursor.fetchone()[0].split('%40')
    newdata=[]
    notExists=True
    for x in data:
        newdata.append(x.split('%20'))
    for x in newdata:
        if x[0] != 'None' and loc==x[0]:
            x[1] = str(int(x[1])+1)
            notExists=False
    if notExists:
        newdata.append([loc,'1'])
    for x in newdata:
        if len(x)<2:
            newdata.remove(x)
    payload=''
    for x in newdata:
        if x[0] !='':
            x='%20'.join(x)
            payload = payload + x + '%40'
    cursor.execute('UPDATE urls SET locationdata = %s WHERE shortedurl=%s;',(payload,url))
    conn.commit()
    cursor.close()
    return redirect(redirect_url)

if __name__ == "__main__":
    app.run(debug=True)