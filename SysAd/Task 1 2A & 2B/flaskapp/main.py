from typing import Counter
from flask import Flask, request, redirect, url_for, session,  escape
from flask import render_template as Render
from flaskext.mysql import MySQL
import os
app = Flask(__name__)
app.secret_key = os.urandom(24)

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'JayJay'
app.config['MYSQL_DATABASE_PASSWORD'] = 'noobmaster69'
app.config['MYSQL_DATABASE_DB'] = 'alphaq'
app.config['MYSQL_DATABASE_HOST'] = 'database' #change value to 'localhost' on a local machine
mysql.init_app(app)

@app.route('/createmom', methods = ['POST', 'GET'])
def createmom():
    if(session.get('logged_in')!=True):
        return redirect(url_for('signin'))
    if request.method== 'GET':
        username = session.get('username')
        return Render('createmom.html',username=username)
    if request.method== 'POST':
        date=request.form['date']
        author=request.form['author']
        content=request.form['content']
        if(date=='' or author==''):
            return redirect(url_for('createmom'))
        cursor = mysql.connect().cursor()
        cursor.execute("INSERT INTO MoMDB(date, author, content) VALUES ('"+date+"', '"+author+"', '"+content+"');")
        mysql.connect().commit()
        cursor.close()
        return redirect(url_for('createmom'))

@app.route('/signin', methods = ['POST', 'GET'])
def signin():
    if request.method == 'GET':
        return Render('signin.html')
     
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username!='' and password!='':
            cursor = mysql.connect().cursor()
            cursor.execute('''SELECT username FROM users;''')
            qResults=cursor.fetchall()
            users = [field[0] for field in qResults]
            if(username in users):
                cursor.execute("SELECT password FROM users WHERE username='"+username+"';")
                pwd=[feild[0] for feild in cursor.fetchall()]
                if password==pwd[0]:
                    session['username'] = username
                    session['logged_in'] = True
                    cursor.close()
                    return redirect(url_for('index'))
                else:
                    cursor.close()
                    return 'Error youre a noob'
            else:
                cursor.close()
                return redirect(url_for('index'))
        else:
            return redirect(url_for('signin'))

@app.route("/index")
def index():
    if(session.get('logged_in')!=True):
        return redirect(url_for('signin'))       
    else:
        return Render('index.html')

@app.route('/')
def main():
    return redirect(url_for('index'))

@app.route('/logout')
def logout():
    if(session.get('logged_in')==True):
        session.pop('username', None)
        session['logged_in']=False
    return redirect(url_for('index'))
    

@app.route('/moms.local', methods = ['POST','GET'])
def moms():
    if(session.get('logged_in')!=True):
        return redirect(url_for('signin'))
    if request.method=='GET':
        cursor = mysql.connect().cursor()
        cursor.execute('SELECT * FROM MoMDB;')
        table=cursor.fetchall()
        cursor.close()
        return Render('moms.local.html',table=table)
    
    if request.method=='POST':
        username=request.form['username']
        date=request.form['date']
        cursor=mysql.connect().cursor()
        if username!='' or date!='':
            if date=='':
                cursor.execute("SELECT * FROM MoMDB WHERE author='"+username+"';")
            elif username=='':
                cursor.execute("SELECT * FROM MoMDB WHERE date='"+date+"';")
            else:
                cursor.execute("SELECT * FROM MoMDB WHERE author='"+username+"' AND date='"+date+"';")
            table=cursor.fetchall()
            cursor.close()
            return Render('moms.local.html',table=table)
        else:
            cursor.execute('SELECT * FROM MoMDB;')
            table=cursor.fetchall()
            cursor.close()
            return Render('moms.local.html',table=table)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000) # renove parameters inside run() for local use