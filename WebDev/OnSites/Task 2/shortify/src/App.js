import React from "react";
import Header from "./components/header";
import Dashboard from "./components/dashboard";
import Locationdata from "./components/locationdata";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='wrapper'>
        <Router>
          <Switch>
            <Route exact path={"/locationdata"} component={Locationdata}/>
            <Route exact path={["/dashboard",'']} component={Dashboard}/>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
