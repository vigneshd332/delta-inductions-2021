import React from 'react'
import CreateTeam from './createTeam';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';


const Dashboard = () => {
    return (
        <div>
            <Router>
                <table>
                    <tbody>
                        <Switch>
                        <Route path='/create-team' component={CreateTeam} />
                        <Route path={['/dashboard','']}>
                            <tr>
                                <td>
                                    <button style={{textDecoration:'none'}}><NavLink className='navlink' activeClassName='active' to='/create-team'><span style={{textDecoration:'none',color: '#000000'}}> Create Team </span></NavLink></button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    
                                </td>
                            </tr>
                        </Route>
                        </Switch>
                    </tbody>
                </table>
            </Router>
        </div>
    )
}

export default Dashboard
