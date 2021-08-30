import React from 'react'
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className='header'>
            <table className='navbar'>
                <tbody>
                    <tr>
                        <td>
                            <NavLink className='navbarlink' activeClassName='active' to='/dashboard'><span className='navButton'>Dashboard</span></NavLink>
                            {/* <NavLink className='navbarlink' activeClassName='active' to='/'><span className='navButton'>Home</span></NavLink>*/}
                            <NavLink className='navbarlink' activeClassName='active' to='/teams'><span className='navButton'>Teams</span></NavLink>       
                            <NavLink className='navbarlink' activeClassName='active' to='/polls'><span className='navButton'>Polls</span></NavLink>
                            <NavLink className='navbarlink' activeClassName='active' to='/vote'><span className='navButton'>Vote</span></NavLink>
                            <NavLink className='navbarlink' activeClassName='active' to='/results'><span className='navButton'>Results</span></NavLink>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default NavBar
