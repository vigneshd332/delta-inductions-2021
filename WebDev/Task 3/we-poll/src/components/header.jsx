import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
            <div className='header'>
                <table className='header-table'>
                    <tbody>
                        <tr>
                            <td style={{ textAlign: 'left', paddingLeft: '15px'}}>
                                <h1>We Poll</h1>
                            </td>
                            <td style={{ textAlign: 'right', paddingRight: '15px'}}>
                                <form onSubmit={
                                    () => {
                                        localStorage.setItem("username", JSON.stringify(null))
                                        localStorage.setItem("password", JSON.stringify(null))
                                        window.location.href = "/login"
                                    }
                                }>
                                    <button className="logout-btn">Logout</button>
                                </form>
                            </td>
                        </tr>
                    </tbody>
                </table>              
            </div>
        )
    }
}
