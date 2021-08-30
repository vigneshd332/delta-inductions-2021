import React from 'react'
import axios from 'axios'

const AddMember = () => {
    
    return (
        <tr>
            <td>
                <div>
                    <h3 style={{ paddingBottom: '10px'}}>Add Member</h3>
                    <form className="login-form" onSubmit={
                            (e) => {
                                let membercolumn=''
                                e.preventDefault()
                                JSON.parse(localStorage.getItem("membermod")) ? membercolumn=JSON.parse(localStorage.getItem("membermod")) : 
                                window.location.href='/teams'
                                let teammod=JSON.parse(localStorage.getItem("teammod"))
                                localStorage.removeItem('membermod')
                                localStorage.removeItem('teammod')
                                const data={
                                    memberName : document.getElementById('memberNameField').value,
                                    membercol : membercolumn,
                                    teammod : teammod
                                }
                                if(data.membercol !== ''){
                                    axios.post('http://localhost:5000/api/add-member', data)
                                .then(response => {
                                    console.log(response);
                                    window.location.href='/teams'
                                })
                                .catch(error => {console.log(error)})
                                }
                                else{
                                    window.location.href='/teams'
                                }
                            }
                        } encType='mutlipart/form-data' method='post' >
                        <div className='login-fields'>
                            <p>Member Name : <input id='memberNameField' type="text" name='teamName'></input></p>
                        </div>
                        <button type="submit">Add Member</button>
                    </form>
                </div>
            </td>
        </tr>
    )
}

export default AddMember