import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Locationdata = (props) => {
    if (true && props.location.aboutProps){}
    else {window.location.href = '/dashboard'}
    const [locationdata, setLocationdata] = useState()

    useEffect(() => {
        const data = {
            url : props.location.aboutProps.url
        }
        axios.post('http://localhost:5000/api/get-location-data', data)
        .then(resp => {
            console.log(resp)
            const data = resp.data.payload.split('%40')
            const loc_list = []
            for(let i=0;i<data.length;i++){
                const loc = data[i].split('%20')
                if (loc.length>1) loc_list.push(loc)
            }
            setLocationdata(loc_list)
        })
        .catch(err => console.log(err))
    },[props.location.aboutProps.url])

    return (
        <div className="table-wrapper">
            <div>
            <h2>Location Data for Short URL : <a className='shortlink' href={`http://localhost:5000/${props.location.aboutProps.url}`}>{props.location.aboutProps.url}</a></h2>
            </div>
            <table className='table table-responsive table-striped table-bordered'>
                <tbody>
                    <tr>
                        <th>Continent</th>
                        <th>Clicks</th>
                    </tr>
                    { locationdata !== undefined ? locationdata.map(
                        (location) =>{
                            return(
                                <tr key={location[0]}>
                                    <td>{location[0]}</td>
                                    <td>{location[1]}</td>
                                </tr>
                            )
                        }
                    )
                    : <tr><td>No Location Data</td></tr>}
                </tbody>
            </table>          
        </div>
    )
}

export default Locationdata   