# Delta WebDev Task 3 : WePoll
A Polling website made with React(frontend), Flask(backend) and MySQL(database)

## Workflow :
<bl>
  <li>New Users register by the Register option and Existing Users Login using the Login option</li>
  <li>By default there will be one user 'admin' for database operations, 'admin' will also function as a normal site use</li>
  <li>Users can create Teams to create and manage polls, any team member can create,delete polls and manage the voter pool for a poll</li>
  <li>The person(or bot, script kiddies smh) who creates the team is the owner for the specific Team</li>
  <li>Only Team Owners can delete, add members to or remove members from a Team</li>
  <li>Users not in the team will show up in the voter pool and can be added or removed by the add/remove options respectively</li>
  <li>Poll results are visible to the Voter poll after the poll ends, poll team members can view the results at any time</li>
</bl>

## Installation

### Prerequisites : 
<ul>
  <li>MySQL</li>
  <li>ReactJS</li>
  <li>Python</li>
  <li>Flask</li>
</ul>

### Setup :
<ul>
  <li><b>Installing Flask :</b> <code>pip3 install flask</code></li>
  <li><b>Installing flask-sql extension :</b> <code>pip3 install flask-mysql</code></li>
  <li><b>Installing flask-cors for cross-origin requests :</b> <code>pip3 install flask-cors</code></li>
  <li><b>Setting up the Database (Bash Script) :</b> <code>./serverinstall.sh</code></li>
</ul>
  
