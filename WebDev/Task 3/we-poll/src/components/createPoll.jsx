import React from 'react'
import axios from 'axios'

const CreatePoll = () => {
    
    return (
        <tr>
            <td>
            <div>
                <h3 style={{ paddingBottom: '10px'}}>Create Poll</h3>
                    <form className="login-form" onSubmit={
                            (e) => {
                                e.preventDefault()
                                JSON.parse(localStorage.getItem('form-submit-teamname')) === null ? 
                                window.location.href='/home' :
                                e.preventDefault()
                                const data={
                                    pollName : document.getElementById('pollNameField').value,
                                    teamName : JSON.parse(localStorage.getItem("form-submit-teamname")),
                                    options : document.getElementById('pollOptionsField').value
                                }
                                localStorage.setItem("form-submit-teamname", JSON.stringify(null))
                                data.teamName === null ? 
                                window.location.href='/teams' :
                                axios.post('http://localhost:5000/api/create-poll', data)
                                .then(response => {
                                    console.log(response);
                                    window.location.href='/polls'
                                })
                                .catch(error => {console.log(error)})
                            }
                        } encType='mutlipart/form-data' method='post' >
                        <div className='login-fields'>
                            <p>Poll Name : <input id='pollNameField' type="text"></input></p>
                            <p>Poll Options(seperated by space) : <input id='pollOptionsField' type="text"></input></p>
                        </div>
                        <button type="submit">Create Poll</button>
                    </form>
                </div>
            </td>
        </tr>
    )
}

export default CreatePoll