import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import deleteicon from '../delete.svg'

const Dashboard = () => {
    const [urls,setURLS] = useState([]);
    const [formvalue,setFormvalue] = useState();
    const [shortvalue, setShortvalue] = useState();
    const [message, setMessage] = useState();

    useEffect(()=>{
        async function fetchData() {
            const resp = await axios.get('http://localhost:5000/api/get-urls')
            //console.log(resp.data.data)
            setURLS(resp.data.data)
        }
        fetchData();

    },[]);

    function formChange(e) {
        setFormvalue(e.target.value);
    }
    function shortChange(e) {
        setShortvalue(e.target.value);
        
    }
    function setMessageval(msg){
        setMessage(msg)
    }
    return (
        <div>
            <div className='form'>
                <form onSubmit={
                    (e)=>{
                        e.preventDefault();
                        if(formvalue===undefined){
                            setMessageval('Well, enter something lol')
                            return;
                        }
                        const data = {
                            'url' : formvalue,
                            'short': shortvalue
                        }
                        axios.post('http://localhost:5000/api/shorten-url',data)
                        .then(resp => {
                            if (resp.data.status==='success') window.location.reload()
                            setMessageval(resp.data.message)
                        })
                        .catch(error=>{console.log(error)})
                    }
                }>
                    <div>
                        <input placeholder='Unshortened URL' name='lurl' type='url' onChange={formChange}></input>
                        <input placeholder='Custom Short URL (optional)' name='surl' type='text' onChange={shortChange} ></input>
                    </div>
                    <div className='btn-wrapper'>
                        <button type='submit'>Shorten</button>
                    </div>
                    <p className='error-message'>{message}</p>
                </form>
            </div>
            <div className='table-wrapper'>
                <table className='table'>
                    <tbody>
                        <tr>
                            <th>Original URL</th>
                            <th>Shortened URL</th>
                            <th>Location Data</th>
                            <th>Clicks</th>
                        </tr>
                        { urls !== undefined ? urls.map(
                            (url) => {
                                return(
                                    <tr key={url[0]} id={`parent${url[2]}`}>
                                        <td>{url[1]}</td>
                                        <td><a className='shortlink' href={`http://localhost:5000/${url[2]}`}>{url[2]}</a></td>
                                        <td>
                                            <form id={url[2]} onSubmit={
                                                (e) => {
                                                    e.preventDefault() 
                                                }
                                            }>
                                                <button className='btn-view' type='submit'><Link to={{
                                                    pathname : '/locationdata',
                                                    aboutProps : {
                                                        url : url[2]
                                                    }
                                                }} className='navlink'>View</Link></button>
                                            </form>
                                        </td>
                                        <td>{url[4]}</td>
                                        <td id="delete-td">
                                            <form id={url[2]} onSubmit={
                                                (e) => {
                                                    e.preventDefault()
                                                    const data = {
                                                        url : e.target.id
                                                    }
                                                    axios.post('http://localhost:5000/api/delete-url',data)
                                                    .then(
                                                        document.getElementById(`parent${url[2]}`).remove()
                                                    )
                                                    .catch(error=>{console.log(error)})
                                                }
                                            }>
                                                <button className="btn-delete" type='submit'>
                                                    <img src={deleteicon} height='25px' width='20x' alt='Delete Icon'/>
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                )
                            }
                        ) : <p>No URLs Added</p> 
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard
