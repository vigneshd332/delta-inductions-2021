import ast
from flask import Flask, request
from flaskext.mysql import MySQL
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

mysql=MySQL()
app.config['MYSQL_DATABASE_USER'] = 'admin'
app.config['MYSQL_DATABASE_PASSWORD'] = 'noobmaster69'
app.config['MYSQL_DATABASE_DB'] = 'wepoll'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

@app.route('/api/index')
def index():
    return {'token' :'lmaoo hi'}

@app.route('/api/auth', methods = ['POST'])
@cross_origin()
def auth():
    if request.method == 'POST':
        dict_str = request.data.decode("UTF-8")
        mydata = ast.literal_eval(dict_str)
        username = mydata["userName"]
        password = mydata["password"]
        conn=mysql.connect()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE username = '" + username + "';")
        data = cursor.fetchone()
        print(data)
        cursor.close()
        if data is None:
            return {'username': None, 'password': password,'message': 'User Doesnt Exist', 'doLogin': False}
        else:
            if data[1] == password:
                return {'username': username, 'password': password, 'message': 'Login Successful', 'doLogin': True}
            else:
                return {'username': None, 'password': password, 'message': 'Incorrect Password', 'doLogin': False}
    return "Error, GET methods are not supported"

@app.route('/api/create-team', methods =['POST'])
@cross_origin()
def create_team():
    if request.method == 'POST':
        dict_str = request.data.decode("UTF-8")
        mydata = ast.literal_eval(dict_str)
        teamname = mydata["teamName"]
        username = mydata['userName']
        conn=mysql.connect()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM teams WHERE teamname = '" + teamname + "';")
        teams = cursor.fetchone()
        if(teams is None):
            if(teamname ==''):
                return {'teamname': None, 'username': None ,'message': 'Team Name cannot be Empty'}                
            cursor.execute("INSERT INTO teams (teamname,member1) VALUES ('" + teamname + "','"+username+"');")
            conn.commit()
            cursor.close()
            return {'teamname': teamname, 'username': username ,'message': 'Team Created'}
        else:
            cursor.close()
            return {'teamname': None, 'message': 'Team Already Exists'}

@app.route('/api/get-teams', methods =['POST'])
def get_teams():
    dict_str = request.data.decode("UTF-8")
    mydata = ast.literal_eval(dict_str)
    username = mydata['userName']
    conn=mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM teams WHERE '"+username+"' IN (member1,member2,member3,member4);")
    teams = cursor.fetchall()
    cursor.execute("SELECT * FROM teams WHERE '"+username+"' IN (member1);")
    ownerStates = cursor.fetchall()
    cursor.close()
    isOwner =[]
    for x in ownerStates:
        isOwner.append(x[0])
    ownerStates=[]
    payload=''
    for x in teams:
        if x[0] in isOwner:
            ownerStates.append('true')
        else:
            ownerStates.append('false')
        x='%20'.join(['None' if v is None else v for v in x])
        payload = payload + x + '%40'
    ownerStates='%20'.join(ownerStates)
    return{'payload':payload,'ownerStates':ownerStates}

@app.route('/api/get-polls', methods =['POST'])
def get_polls():
    dict_str = request.data.decode("UTF-8")
    mydata = ast.literal_eval(dict_str)
    username = mydata['userName']
    isvote = mydata['isVote']
    conn=mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT teamname FROM teams WHERE '"+username+"' IN (member1,member2,member3,member4);")
    teams = cursor.fetchall()
    teams = [ele for entry in teams for ele in entry]
    cursor.execute("SELECT * FROM polls WHERE teamname IN ('"+"','".join(teams)+"');")
    polls = cursor.fetchall()
    if isvote == 'true':
        cursor.execute("SELECT * FROM polls WHERE assigned like '%"+username+"%';")
        polls = polls + cursor.fetchall()
    cursor.close()
    payload=''
    for x in polls:
        x='%20'.join(x)
        payload = payload + x + '%40'
    return{'payload':payload}

@app.route('/api/create-poll', methods =['POST'])
@cross_origin()
def create_poll():
    if request.method == 'POST':
        print('data = ',request.data)
        dict_str = request.data.decode("UTF-8")
        mydata = ast.literal_eval(dict_str)
        teamname = mydata["teamName"]
        pollname = mydata["pollName"]
        options = mydata["options"]
        votes=[]
        for x in options.split(' '):
            votes.append('0')
        votes=' '.join(votes)
        conn=mysql.connect()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM polls WHERE pollname = '" + pollname + "';")
        polls = cursor.fetchone()
        if(polls is None):
            if(pollname ==''):
                return {'pollname': None, 'message': 'Poll Name cannot be Empty'}                
            cursor.execute("INSERT INTO polls (pollname,teamname,options,state,votes,voted,assigned) VALUES ('" + pollname + "','"+teamname+"','"+options+"','true','"+votes+"','none','none');")
            conn.commit()
            cursor.close()
            return {'pollname': pollname, 'message': 'Poll Created'}
        else:
            cursor.close()
            return {'pollname': None, 'message': 'Poll Already Exists'}

@app.route('/api/add-member', methods=['POST'])
@cross_origin()
def add_member():
    dict_str = request.data.decode("UTF-8")
    mydata = ast.literal_eval(dict_str)
    membername = mydata["memberName"]
    membercol = mydata["membercol"]
    teammod = mydata["teammod"]
    conn=mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username = '"+membername+"';")
    data = cursor.fetchone()
    if data is None:
        cursor.close()
        return {'membername': None, 'message': 'User Doesnt Exist'}
    else:
        cursor.execute("UPDATE teams SET "+membercol+" = '"+membername+"' WHERE teamname = '"+teammod+"';")
        conn.commit()
        cursor.close()
        return {'membername': membername, 'message': 'Member Added', 'teamname' : teammod}

@app.route('/api/remove-member', methods=['POST'])
@cross_origin()
def remove_member():
    dict_str = request.data.decode("UTF-8")
    mydata = ast.literal_eval(dict_str)
    membermod = mydata["membermod"]
    teammod = mydata["teammod"]
    conn=mysql.connect()
    cursor = conn.cursor()
    cursor.execute("UPDATE teams SET "+membermod+" = 'None' WHERE teamname = '"+teammod+"';")
    conn.commit()
    cursor.close()
    return {'message': 'success', 'membername': membermod, 'teammod': teammod}

@app.route('/api/delete-poll', methods=['POST'])
@cross_origin()
def delete_poll():
    dict_str = request.data.decode("UTF-8")
    mydata = ast.literal_eval(dict_str)
    poll = mydata['pollName']
    conn=mysql.connect()
    cursor=conn.cursor()
    cursor.execute("SELECT * FROM polls WHERE pollname='"+poll+"';")
    data=cursor.fetchone()
    if data is None:
        cursor.close()
        return {'message': 'Poll does not exist', 'pollName':None}
    else:
        cursor.execute("DELETE FROM polls WHERE pollname='"+poll+"';")
        conn.commit()
        cursor.close()
        return {'message': 'Poll Deleted', 'pollName': poll}

@app.route('/api/change-poll-status', methods=['POST'])
@cross_origin()
def changepollstatus():
    dict_str = request.data.decode("UTF-8")
    mydata = ast.literal_eval(dict_str)
    poll = mydata['pollName']
    conn=mysql.connect()
    cursor=conn.cursor()
    cursor.execute("SELECT state FROM polls WHERE pollname='"+poll+"';")
    data=cursor.fetchone()
    if data[0]=='true':
        cursor.execute("UPDATE polls SET state='false' WHERE pollname='"+poll+"';")
        message = 'State set to false'
    else:
        cursor.execute("UPDATE polls SET state='true' WHERE pollname='"+poll+"';")
        message = 'State set to true'
    conn.commit()
    cursor.close()
    return{'message': message, 'pollName':poll}

@app.route('/api/register', methods=['POST'])
@cross_origin()
def register():
    dict_str = request.data.decode("UTF-8")
    mydata = ast.literal_eval(dict_str)
    username = mydata['userName']
    password = mydata['password']
    conn=mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username = '"+username+"';")
    data = cursor.fetchone()
    if data is None:
        cursor.execute("INSERT INTO users (username,password) VALUES ('"+username+"','"+password+"');")
        conn.commit()
        cursor.close()
        return {'message': 'success', 'username': username}
    else:
        cursor.close()
        return {'message': 'Username already exists', 'username': None}

@app.route('/api/vote', methods=['POST'])
@cross_origin()
def vote():
    dict_str = request.data.decode("UTF-8")
    mydata = ast.literal_eval(dict_str)
    pollname = mydata['pollName']
    voteIndex = int(mydata['voteIndex'])
    username = mydata['userName']
    conn=mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT votes FROM polls WHERE pollname='"+pollname+"';")
    votes = cursor.fetchone()
    votes=votes[0].split(' ')
    votes[voteIndex] = str(int(votes[voteIndex])+1)
    votes=' '.join(votes)
    cursor.execute("UPDATE polls SET votes='"+votes+"' WHERE pollname='"+pollname+"';")
    cursor.execute("SELECT voted FROM polls WHERE pollname='"+pollname+"';")
    voted = cursor.fetchone()
    voted = voted[0].split(' ')
    voted.append(username)
    voted=' '.join(voted)
    cursor.execute("UPDATE polls SET voted='"+voted+"' WHERE pollname='"+pollname+"';")
    conn.commit()
    cursor.close()
    return {'message' : 'success'}

@app.route('/api/delete-team', methods=['POST'])
@cross_origin()
def delete_team():
    dict_str = request.data.decode("UTF-8")
    mydata = ast.literal_eval(dict_str)
    teamname = mydata['teamName']
    conn=mysql.connect()
    cursor=conn.cursor()
    cursor.execute("SELECT * FROM teams WHERE teamname='"+teamname+"';")
    data=cursor.fetchone()
    if data is None:
        cursor.close()
        return {'message': 'Team does not exist', 'teamName':None}
    else:
        cursor.execute("DELETE FROM teams WHERE teamname='"+teamname+"';")
        cursor.execute("DELETE FROM polls WHERE teamname='"+teamname+"';")
        conn.commit()
        cursor.close()
        return {'message': 'Team Deleted', 'teamName': teamname}

@app.route('/api/poll-groups', methods=['POST'])
@cross_origin()
def poll_groups():
    dict_str = request.data.decode("UTF-8")
    mydata = ast.literal_eval(dict_str)
    pollName = mydata['pollName']
    userName = mydata['userName']
    action = mydata['action']
    conn=mysql.connect()
    cursor=conn.cursor()
    if action=='GET':
        cursor.execute("SELECT assigned FROM polls WHERE pollname='"+pollName+"';")
        assigned = cursor.fetchone()[0].split(' ')
        cursor.execute("SELECT teamname FROM polls WHERE pollname='"+pollName+"';")
        teamname = cursor.fetchone()[0]
        cursor.execute("SELECT member1, member2, member3, member4 FROM teams where teamname='"+teamname+"';")
        teammembers = cursor.fetchone()
        cursor.execute("SELECT username FROM users")
        users = cursor.fetchall()
        allusers=[]
        unassigned=[]
        for user in users:
            allusers.append(user[0])
        for user in allusers:
            if user in assigned:
                continue
            else:
                if user not in teammembers:
                    unassigned.append(user)
        assigned=' '.join(assigned)
        unassigned=' '.join(unassigned)
        cursor.close()
        return {'message':'success', 'assigned':assigned, 'unassigned' : unassigned}
    elif action=='POST':
        cursor.execute("SELECT assigned FROM polls WHERE pollname='"+pollName+"';")
        res = cursor.fetchone()[0].split(' ')
        if userName in res:
            res.remove(userName)
        else:
            res.append(userName)
        res=' '.join(res)
        cursor.execute("UPDATE polls SET assigned='"+res+"' WHERE pollname='"+pollName+"';")
        conn.commit()
        cursor.close()
        return {'message': 'done', 'username' : userName, 'pollname': pollName}

if __name__ == "__main__":
    app.run(debug=True)
