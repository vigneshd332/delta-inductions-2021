import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Teams = () => {
    if(JSON.parse(localStorage.getItem('pollName'))){
        localStorage.removeItem('pollName')
    }
    const [teams,setTeams] = useState()
    const [isOwner,setisOwner] = useState()
    useEffect(() => {
        const data = {
            userName: JSON.parse(localStorage.getItem("username"))
        }
        axios.post('http://localhost:5000/api/get-teams', data)
        .then(response => {
        let payload = response.data.payload.split('%40')
        let ownerStates = response.data.ownerStates.split('%20')
        let teamlist=[]
        for( let i=0;i<payload.length;i++){
            let list = payload[i].split('%20')
            teamlist.push(list)
        }
        teamlist.pop()
        setTeams(teamlist)
        setisOwner(ownerStates)
        })        
    }, [])
    return(
        <div>
            <h1>Your Teams</h1>
            <table style={{display: 'flex', justifyContent: 'center', width: '100%'}} cellSpacing='0px'>
            <tbody className='display-tbody'>
            {   
                teams !== undefined ? teams.map(
                    (team) =>{
                        return (
                            <div key={team[0]} id={`${team[0]}div`}>
                                        <div className='table-subdiv-heading'>
                                            {team[0]}
                                        </div>
                                        <tr>
                                            <td className='display-td'>Team Owner : </td>
                                            <td className='display-td'>{team[1]}</td>
                                        </tr>
                                        <tr>
                                            <td className='display-td'>Team Member 1 : </td>
                                            <td className='display-td' id={`${team[0]}mem1`}>{team[2]}</td>
                                            {isOwner ? (isOwner[teams.indexOf(team)]=== 'true' ? 
                                            (team[2]==='None' ? 
                                            <td className='add-plus'>
                                                <form onSubmit={
                                                    (e) => {
                                                        e.preventDefault()
                                                        localStorage.setItem("membermod", JSON.stringify('member2'))
                                                        localStorage.setItem('teammod', JSON.stringify(e.target.id))
                                                        window.location.href='/add-member'
                                                    }
                                                    }  id={team[0]}>
                                                    <button type='submit' className='add-plus-btn'>
                                                        +
                                                    </button>
                                                </form>
                                            </td> :
                                            <td className= 'add-plus'>
                                                <form onSubmit={
                                                    (e) => {
                                                        e.preventDefault()
                                                        if(document.getElementById(`${team[0]}mem1btn`).innerHTML==='+'){
                                                            localStorage.setItem("membermod", JSON.stringify('member4'))
                                                            localStorage.setItem('teammod', JSON.stringify(e.target.id))
                                                            window.location.href='/add-member'     
                                                        }
                                                        document.getElementById(`${team[0]}mem1`).innerHTML='None'
                                                        document.getElementById(`${team[0]}mem1btn`).innerHTML='+'
                                                        console.log(e.target.id)
                                                        const data = {
                                                            membermod : 'member2',
                                                            teammod : e.target.id
                                                        }
                                                        axios.post('http://localhost:5000/api/remove-member', data)
                                                        .then(response => {
                                                            console.log(response)
                                                        })
                                                        .catch(error => {console.log(error)})
                                                    }
                                                }  id={team[0]}>
                                                    <button type='submit' className='add-plus-btn' id={`${team[0]}mem1btn`}>
                                                    -
                                                    </button>
                                                </form>
                                            </td>) :
                                            null) : 
                                            null
                                            }
                                        </tr>
                                        <tr>
                                            <td className='display-td'>Team Member 2 : </td>
                                            <td className='display-td' id={`${team[0]}mem2`}>{team[3]}</td>
                                            {isOwner ? (isOwner[teams.indexOf(team)]=== 'true' ? 
                                            (team[3]==='None' ? 
                                            <td className='add-plus'>
                                                <form onSubmit={
                                                    (e) => {
                                                        e.preventDefault()
                                                        localStorage.setItem("membermod", JSON.stringify('member3'))
                                                        localStorage.setItem('teammod', JSON.stringify(e.target.id))
                                                        window.location.href='/add-member'
                                                    }
                                                    } id={team[0]}>
                                                    <button type='submit' className='add-plus-btn'>
                                                        +
                                                    </button>
                                                </form>
                                            </td> :
                                            <td className= 'add-plus'>
                                                <form onSubmit={
                                                    (e) => {
                                                        e.preventDefault()
                                                        if(document.getElementById(`${team[0]}mem2btn`).innerHTML==='+'){
                                                            localStorage.setItem("membermod", JSON.stringify('member4'))
                                                            localStorage.setItem('teammod', JSON.stringify(e.target.id))
                                                            window.location.href='/add-member'     
                                                        }
                                                        document.getElementById(`${team[0]}mem2`).innerHTML='None'
                                                        document.getElementById(`${team[0]}mem2btn`).innerHTML='+'
                                                        const data = {
                                                            membermod : 'member3',
                                                            teammod : e.target.id
                                                        }
                                                        axios.post('http://localhost:5000/api/remove-member', data)
                                                        .then(response => {
                                                            console.log(response)
                                                        })
                                                        .catch(error => {console.log(error)})
                                                    }
                                                }  id={team[0]}>
                                                    <button type='submit' className='add-plus-btn' id={`${team[0]}mem2btn`}>
                                                    -
                                                    </button>
                                                </form>
                                            </td>) :
                                            null) : 
                                            null
                                            }
                                        </tr>
                                        <tr>
                                            <td className='display-td'>Team Member 3 : </td>
                                            <td className='display-td' id={`${team[0]}mem3`}>{team[4]}</td>
                                            {isOwner ? (isOwner[teams.indexOf(team)]=== 'true' ? 
                                            (team[4]==='None' ? 
                                            <td className='add-plus'>
                                                <form onSubmit={
                                                    (e) => {
                                                        e.preventDefault()
                                                        localStorage.setItem("membermod", JSON.stringify('member4'))
                                                        localStorage.setItem('teammod', JSON.stringify(e.target.id))
                                                        window.location.href='/add-member'
                                                    }
                                                    }  id={team[0]}>
                                                    <button type='submit' className='add-plus-btn'>
                                                        +
                                                    </button>
                                                </form>
                                            </td> :
                                            <td className= 'add-plus'>
                                                <form onSubmit={
                                                    (e) => {
                                                        e.preventDefault()
                                                        if(document.getElementById(`${team[0]}mem3btn`).innerHTML==='+'){
                                                            localStorage.setItem("membermod", JSON.stringify('member4'))
                                                            localStorage.setItem('teammod', JSON.stringify(e.target.id))
                                                            window.location.href='/add-member'     
                                                        }
                                                        document.getElementById(`${team[0]}mem3`).innerHTML='None'
                                                        document.getElementById(`${team[0]}mem3btn`).innerHTML='+'
                                                        const data = {
                                                            membermod : 'member4',
                                                            teammod : e.target.id
                                                        }
                                                        axios.post('http://localhost:5000/api/remove-member', data)
                                                        .then(response => {
                                                            console.log(response)
                                                        })
                                                        .catch(error => {console.log(error)})
                                                    }
                                                }  id={team[0]}>
                                                    <button type='submit' className='add-plus-btn' id={`${team[0]}mem3btn`}>
                                                    -
                                                    </button>
                                                </form>
                                            </td>) :
                                            null) : 
                                            null
                                            }
                                        </tr>
                                        {isOwner ? (isOwner[teams.indexOf(team)]=== 'true' ?
                                        <React.Fragment>
                                            <tr>
                                            <td>
                                                <form id={team[0]} style={{padding: '5px'}} onSubmit={
                                                    (e) => {
                                                        e.preventDefault()
                                                        localStorage.setItem("form-submit-teamname", JSON.stringify(e.target.id))
                                                        window.location.href='/create-poll'
                                                    }
                                                }>
                                                    <button type='submit'>Create Poll in Team</button>
                                                </form>
                                                <div className='hr-container'>
                                                    <hr />
                                                </div>
                                            </td>
                                            <td>
                                            <form id={team[0]} style={{padding: '5px'}} onSubmit={
                                                    (e) => {
                                                        e.preventDefault()
                                                        document.getElementById(`${e.target.id}div`).remove()
                                                        const data = { 
                                                            teamName : e.target.id
                                                        }
                                                        axios.post('http://localhost:5000/api/delete-team',data)
                                                        .then(resp => { console.log(resp) })
                                                        .catch(error => {console.log(error)})
                                                    }
                                                }>
                                                    <button type='submit'>Delete Team</button>
                                                </form>
                                                <div className='hr-container'>
                                                    <hr />
                                                </div>
                                            </td>
                                            </tr> 
                                        </React.Fragment> :
                                            <React.Fragment>
                                                <div>
                                                <form id={team[0]} style={{padding: '5px'}} onSubmit={
                                                    (e) => {
                                                        e.preventDefault()
                                                        localStorage.setItem("form-submit-teamname", JSON.stringify(e.target.id))
                                                        window.location.href='/create-poll'
                                                    }
                                                }>
                                                    <button type='submit'>Create Poll in Team</button>
                                                </form>
                                                <div className='hr-container'>
                                                    <hr />
                                                </div>
                                                </div>
                                            </React.Fragment>) : 
                                            null
                                            }
                            </div>
                        )
                    }
            
                ) : <h1>No Posts to Show</h1>
            } 
            </tbody> 
            </table> 
        </div>
    )
}

export default Teams
