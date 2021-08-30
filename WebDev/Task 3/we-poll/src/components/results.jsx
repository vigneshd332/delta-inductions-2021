import React, { useState, useEffect} from 'react'
import axios from 'axios'

const Results = () => {
    const [polls,setPolls]= useState()
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
                poll_list.push(list)
            }
            setPolls(poll_list)
        })        
    }, [])
    return (
        <div>
            <h2>Your Poll Results</h2>
            <table style={{display: 'flex', justifyContent: 'center', width: '100%'}} cellSpacing='0px'>
            <tbody className='display-tbody'>
            {
                polls !== undefined ? polls.map(
                    (poll) =>{
                        return (
                            poll[3] === 'false' ?
                            <div key={poll[1]}>
                                        <div className='table-subdiv-heading'>
                                            {poll[1]}
                                        </div>
                                        {
                                            poll[2].split(' ').map((option) => {
                                                return (
                                                    <tr key={option}>
                                                        <div id={`${poll[2]}div`}>
                                                            <td className='display-td'>{option}</td>
                                                            <td className='display-td'>{poll[4][poll[2].split(' ').indexOf(option)]}</td>
                                                        </div>
                                                    </tr>
                                                )
                                            }
                                            )
                                        }
                                        <div className='hr-container'>
                                            <hr />
                                        </div>
                            </div> : null
                        )
                    }
            
                ) : <h1>You have not been assigned to any poll</h1>
            } 
            </tbody> 
        </table>
        </div>
    )
}

export default Results
