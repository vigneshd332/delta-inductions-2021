import React from 'react';
import axios from 'axios';
import '../pages.css';
import Header from './header';

function Login() {
  return (
    <div className="App">
      <Header />
      {window.location.pathname === '/register' ? 
      <header className="App-header">
      <div>
              <h3 style={{ paddingBottom: '10px'}}>Register</h3>
              <form class="login-form" onSubmit={
                (e) => {
                  e.preventDefault()
                  const data={
                      userName : document.getElementById('userNameField').value,
                      password : document.getElementById('passwordField').value,
                      rpassword : document.getElementById('rpasswordField').value
                  }
                  if(data.userName && data.password && data.rpassword){
                    if(data.password === data.rpassword){
                      axios.post('http://localhost:5000/api/register', data)
                      .then(response => {
                        if (response.data.message === 'success') {
                          window.location.href = 'http://localhost:3000/login'
                        }
                      })
                      .catch(error => {console.log(error)})
                    }
                  }
                }
              } encType='mutlipart/form-data' method='post' >
                  <div className='login-fields'>
                      <p>Username : <input type="text" id='userNameField'></input></p>
                      <p>Password : <input type="password" id='passwordField'></input></p>
                      <p>Re-Enter Password : <input type="password" id='rpasswordField'></input></p>
                  </div>
                  <button type="submit">Register</button>
              </form>
          </div>
      </header> : 
      <header className="App-header">
      <div>
              <h3 style={{ paddingBottom: '10px'}}>Login</h3>
              <form class="login-form" onSubmit={
                (e) => {
                  e.preventDefault()
                  console.log(e.nativeEvent.submitter.value)
                  if(e.nativeEvent.submitter.value === 'register'){
                    window.location.href = '/register'
                  }
                  const data={
                      userName : document.getElementById('userNameField').value,
                      password : document.getElementById('passwordField').value
                  }
                  axios.post('http://localhost:5000/api/auth', data)
                  .then(response => {
                    if (response.data.doLogin === true) {
                      localStorage.setItem("username", JSON.stringify(response.data.username))
                      localStorage.setItem("password", JSON.stringify(response.data.password))
                      window.location.href = 'http://localhost:3000/dashboard'
                    }
                  })
                  .catch(error => {console.log(error)})
                }
              } encType='mutlipart/form-data' method='post' >
                  <div className='login-fields'>
                      <p>Username : <input type="text" id='userNameField'></input></p>
                      <p>Password : <input type="password" id='passwordField'></input></p>
                  </div>
                  <div style={{display: 'flex'}}>
                  <button type="submit" value='login'>Login</button>
                  <button type="submit" value='register'>Register</button>
                  </div>
              </form>
          </div>
    </header>}
    </div>
  );
}

export default Login;