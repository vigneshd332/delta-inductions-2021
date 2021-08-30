import React from 'react'
import axios from 'axios'

const CreateTeam = () => {
    
    return (
        <tr>
            <td>
                <div>
                    <h3 style={{ paddingBottom: '10px'}}>Create Team</h3>
                    <form className="login-form" onSubmit={
                            (e) => {
                                e.preventDefault()
                                const data={
                                    teamName : document.getElementById('teamNameField').value,
                                    userName : JSON.parse(localStorage.getItem("username"))
                                }
                                axios.post('http://localhost:5000/api/create-team', data)
                                .then(response => {
                                    console.log(response);
                                    window.location.href='/teams'
                                })
                                .catch(error => {console.log(error)})
                            }
                        } encType='mutlipart/form-data' method='post' >
                        <div className='login-fields'>
                            <p>Team Name : <input id='teamNameField' type="text" name='teamName'></input></p>
                        </div>
                        <button type="submit">Create Team</button>
                    </form>
                </div>
            </td>
        </tr>
    )
}

export default CreateTeam
