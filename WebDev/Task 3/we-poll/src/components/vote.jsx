import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Vote = () => {
    const [polls,setPolls] = useState()
    const [loggedusername,setUsername] = useState()
    useEffect(() => {
        const data = {
            userName: JSON.parse(localStorage.getItem("username")),
            isVote : 'true'
        }
        axios.post('http://localhost:5000/api/get-polls', data)
        .then(response => {
            let payload=response.data.payload.split('%40')
            let poll_list=[]
            payload.pop()
            for( let i=0;i<payload.length;i++){
                let list = payload[i].split('%20')
                list[4]=list[4].split(' ')
                list[5]=list[5].split(' ')
                poll_list.push(list)
            }
            setPolls(poll_list)
        })        
    }, [])
    useEffect(() => {
        setUsername(JSON.parse(localStorage.getItem('username')))
    }, [])
    return (
        <div>
            <h2>Open Polls</h2>
            <p>Polls you have been assigned to and havent voted, appear here</p>
            <table style={{display: 'flex', justifyContent: 'center', width: '100%',padding : '5px'}} cellSpacing='0px'>
            <tbody className='display-tbody'>
            {
                polls !== undefined ? polls.map(
                    (poll) =>{
                        return (
                            poll[5].includes(loggedusername) ? null :
                            <div key={poll[1]} id={`${poll[1]}div`}>
                                <div id={`${poll[1]}wrapper`}>
                                        <div className='table-subdiv-heading'>
                                            {poll[1]}
                                        </div>
                                        {
                                            poll[2].split(' ').map((option) => {
                                                return (
                                                    <tr key={option}>
                                                        <div id={`${poll[2]}div`}>
                                                            <td className='display-td'>{option}</td>
                                                            <td className='display-td'>
                                                                <form style={{padding : '2px'}} onSubmit={
                                                                    (e) => {
                                                                        e.preventDefault()
                                                                        let params = e.target.id.split('%20')
                                                                        const data = {
                                                                            pollName : params[0],
                                                                            voteIndex : params[1],
                                                                            userName : JSON.parse(localStorage.getItem('username'))
                                                                        }
                                                                        axios.post('http://localhost:5000/api/vote', data)
                                                                        .then(resp => {
                                                                            console.log(resp)
                                                                                document.getElementById(`${poll[1]}wrapper`).style.display = 'none'
                                                                                let newDiv = document.createElement('div')
                                                                                if (resp.data.message==='success'){
                                                                                    newDiv.appendChild(document.createTextNode(`Your Vote for ${poll[1]} has been recorded`))
                                                                                }
                                                                                else {
                                                                                    newDiv.appendChild(document.createTextNode(`Error Encountered`))
                                                                                }
                                                                                document.getElementById(`${poll[1]}div`).appendChild(newDiv)
                                                                                let hrcontainer = document.createElement('div')
                                                                                hrcontainer.className = 'hr-container'
                                                                                let hr = document.createElement('hr')
                                                                                hr.className = 'display-hr'
                                                                                hrcontainer.appendChild(hr)
                                                                                document.getElementById(`${poll[1]}div`).appendChild(hrcontainer)
                                                                                document.getElementById(`${poll[1]}wrapper`).remove()
                                                                        })
                                                                        .catch(err => (console.log(err)))
                                                                    }
                                                                } id={`${poll[1]}%20${poll[2].split(' ').indexOf(option)}`}>
                                                                    <button type='submit'>Vote</button>
                                                                </form>
                                                            </td>
                                                        </div>
                                                    </tr>
                                                )
                                            }
                                            )
                                        }
                                        <div className='hr-container'>
                                            <hr />
                                        </div>
                                </div>
                            </div>
                        )
                    }
            
                ) : <h1>You have not been assigned to any poll</h1>
            } 
            </tbody> 
        </table>
        </div>
    )
}

export default Vote

