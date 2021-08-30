import React, { useState,useEffect} from 'react'
import axios from 'axios'
//import { BrowserRouter as Router, Route, Switch, Link, NavLink } from 'react-router-dom';

const Polls = () => {
    if(JSON.parse(localStorage.getItem('pollName'))){
        localStorage.removeItem('pollName')
    }
    const [polls,setPolls]= useState()
    useEffect(() => {
        const data = {
            userName: JSON.parse(localStorage.getItem("username")),
            isVote : 'false'
        }
        axios.post('http://localhost:5000/api/get-polls', data)
        .then(response => {
            let payload=response.data.payload.split('%40')
            let poll_list=[]
            payload.pop()
            for( let i=0;i<payload.length;i++){
                let list = payload[i].split('%20')
                list[4]=list[4].split(' ')
                poll_list.push(list)
            }
            setPolls(poll_list)
        })        
    }, [])
    return (
        <div>
            <h2>Your Polls</h2>
            <table style={{display: 'flex', justifyContent: 'center', width: '100%'}} cellSpacing='0px'>
            <tbody className='display-tbody'>
            {
                polls !== undefined ? polls.map(
                    (poll) =>{
                        return (
                            <div key={poll[1]} id={`${poll[1]}div`}>
                                        <div className='table-subdiv-heading'>
                                            {poll[1]}
                                        </div>
                                        <tr>
                                            <td className='display-td'>Poll Team : </td>
                                            <td className='display-td'>{poll[0]}</td>
                                            <td className='display-td'>Votes</td>
                                        </tr>
                                        {
                                            poll[2].split(' ').map((option) => {
                                                return (
                                                    <tr key={option}>
                                                        <td className='display-td'>Option : </td>
                                                        <td className='display-td'>{option}</td>
                                                        <td className='display-td'>{poll[4][poll[2].split(' ').indexOf(option)]}</td>
                                                    </tr>
                                                )
                                            }
                                            )
                                        }
                                        <tr>
                                            <td className='display-td'>Open : </td>
                                            <td className='display-td'>{poll[3]}</td>
                                            <td className='display-td'>Total : {poll[4].map((i) => Number(i)).reduce((a, b) => a + b, 0)}</td>
                                        </tr>
                                        <tr>
                                            <td style={{paddingTop: '5px'}}>
                                                <form onSubmit={
                                                    (e) => {
                                                        e.preventDefault()
                                                        document.getElementById(`${e.target.id}div`).remove()
                                                        const data = {
                                                            pollName : e.target.id
                                                        }
                                                        axios.post('http://localhost:5000/api/delete-poll',data)
                                                        .then(res =>{
                                                            console.log(res)
                                                        })
                                                        .catch(error=>{console.log(error)})
                                                    }
                                                } id={poll[1]}>
                                                <button type='submit'>Delete Poll</button>
                                                </form>
                                            </td>
                                            <td style={{paddingTop: '5px'}}>                                                
                                                <form onSubmit={
                                                    (e) => {
                                                        e.preventDefault()
                                                        const data = {
                                                            pollName : e.target.id
                                                        }
                                                        axios.post('http://localhost:5000/api/change-poll-status',data)
                                                        .then(res =>{
                                                            console.log(res)
                                                            window.location.reload()
                                                        })
                                                        .catch(error=>{console.log(error)})
                                                    }
                                                } id={poll[1]}>
                                                <button type='submit'>{poll[3] === 'true' ? <React.Fragment>End Poll</React.Fragment> : <React.Fragment>ReOpen Poll</React.Fragment>}</button>
                                                </form>                                                
                                            </td>
                                            <td style={{paddingTop: '5px'}}>
                                                <form onSubmit={
                                                    (e) => {
                                                        e.preventDefault()
                                                        localStorage.setItem('pollName',JSON.stringify(e.target.id))
                                                        window.location.href = '/assign'
                                                    }
                                                } id={poll[1]}>
                                                    <button type='submit'>Manage Voters</button>
                                                </form>
                                            </td>
                                        </tr>
                                        <div className='hr-container'>
                                            <hr />
                                        </div>
                            </div>
                        )
                    }
            
                ) : <h1>No Poll Results to Show</h1>
            } 
            </tbody> 
        </table>
        </div>
    )
}

export default Polls
