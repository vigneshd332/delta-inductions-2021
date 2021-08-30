import React, { useState, useEffect } from "react"
import axios from "axios"

const AssignMembers = () => {
    const [assignedUsernames,setassignedUsernames] = useState()
    const [usernames,setusernames] = useState()
    const [pollname,setPollname] = useState()
    useEffect(() => {
        if(JSON.parse(localStorage.getItem('pollName')) === null) {
            window.location.href = '/polls'
        }
        const data = {
            pollName : JSON.parse(localStorage.getItem('pollName')),
            userName : '',
            action : 'GET'
        }
        data.pollName === null ? window.location.href = '/polls' :
        setPollname(data.pollName)
        axios.post('http://localhost:5000/api/poll-groups',data)
        .then(resp => {
            console.log(resp)
            let assigned = resp.data.assigned.split(' ')
            assigned.shift()
            let unassigned = resp.data.unassigned.split(' ')
            if(unassigned===[""]){
                console.log('yoooo')
            }
            setassignedUsernames(assigned)
            setusernames(unassigned)
        })
        .catch(error => console.log(error))
    }, [])
    return (
        <div>
            <h2>Assigned Users</h2>
            <div id='assigned'>
                { assignedUsernames !== undefined ? assignedUsernames.map((name) => {
                    return(
                        name !== "" ?
                        <form onSubmit={
                            (e) => {
                                e.preventDefault()
                                let btn = document.getElementById(`${name}-btn`)
                                let dest = ''
                                if (btn.innerHTML==='+'){
                                    btn.innerHTML='-'
                                    dest = document.getElementById('assigned')
                                }
                                else{
                                    btn.innerHTML='+'
                                    dest = document.getElementById('unassigned')
                                }
                                const data = {
                                    userName : e.target.id,
                                    pollName : pollname,
                                    action : 'POST'
                                }
                                axios.post('http://localhost:5000/api/poll-groups',data)
                                .then(resp => {
                                    console.log(resp)
                                    let form = document.getElementById(e.target.id)
                                    let form2=form.cloneNode(true)
                                    dest.appendChild(form2)
                                    form.remove()
                                })
                                .catch(err => console.log(err))
                            }
                        } id={`${name}`}>
                            <p className='display-td'>{name} <button id={`${name}-btn`} className='add-plus-btn' type='submit'>-</button></p>
                        </form> : null
                    )
                    }) : <p>No Users Assigned</p>
                }
            </div>
            <hr />
            <h2>Unassigned Users</h2>
            <div id='unassigned'>
                { usernames !== undefined ? usernames.map((names) => {
                    return(
                    names !== "" ? 
                    <form onSubmit={
                        (e) => {
                            e.preventDefault()
                            let btn = document.getElementById(`${names}-btn`)
                            let dest = ''
                            if (btn.innerHTML==='+'){
                                btn.innerHTML='-'
                                dest = document.getElementById('assigned')
                            }
                            else{
                                btn.innerHTML='+'
                                dest = document.getElementById('unassigned')
                            }
                            const data = {
                                userName : e.target.id,
                                pollName : pollname,
                                action : 'POST'
                            }
                            axios.post('http://localhost:5000/api/poll-groups',data)
                            .then(resp => {
                                console.log(resp)
                                let form = document.getElementById(e.target.id)
                                let form2=form.cloneNode(true)
                                dest.appendChild(form2)
                                form.remove()
                            })
                            .catch(err => console.log(err))
                        }
                    } id={`${names}`}>
                        <p className='display-td'>{names} <button id={`${names}-btn`} className='add-plus-btn' type='submit'>+</button></p>
                    </form> : null
                    )
                    }) : <p>No Users to assign</p>
                }
            </div>
        </div>
    )
}

export default AssignMembers
