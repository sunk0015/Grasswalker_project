import React, { Component } from 'react';
import './App.css';

// import route Components here
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

import Search from './components/Search/Search.js';
import Shared from './components/Shared/Shared.js';
import Upload from './components/Upload/Upload.js';
import Navigation from './components/Navigation/Navigation.js'
import Login from './components/Login/Login.js';
import Logout from './components/Logout/Logout.js';
import Content from './components/Content/Content.js';
import Lab from './components/Lab/Lab.js';
import FolderHome from './components/Lab/FolderHome.js';
import DatasetDetail from './components/Lab/DatasetDetail.js';
import {withRouter} from 'react-router';

class App extends Component {
    constructor(props){
        super(props);
        // window.localStorage.setItem('server','http://ec2-34-220-195-209.us-west-2.compute.amazonaws.com:8000');
        window.localStorage.setItem('server','http://localhost:8000');
    }

  render() {
    return (
      <Router>
        <div className="App">
            <div className="page-container">
            <Navigation/> 
            <Route exact path="/" component={Search} /> 
            <Route exact path="/search" component={Search} /> 
            <Route exact path="/shared" component={Shared} /> 
            <Route exact path="/upload" component={Upload} /> 
            <Route exact path="/login" component={Login} /> 
            <Route exact path="/logout" component={Logout} /> 
            <Route exact path="/lab" component={Lab} /> 
            <Route exact path="/lab/:folderid/" component={FolderHome} /> 
            <Route exact path="/lab/dataset/:datasetid/" render={(props) => <DatasetDetail {...props}/>}  /> 
          </div>
        </div>
      </Router>
    );
  }
}

class Home extends Component {
    render (){
        return (
            <div className="jumbotron">
                <h1>Grasswalker</h1> 
              <p className="lead">
                Grasswalker is an effort to collaborate data between academic research labs.
                Try the search feature below!
              </p> 
              <div className="input-group">
                  <input type="text" className="form-control" placeholder="Search for..." /> 
                <span className="input-group-btn">
                    <button className="btn btn-lg btn-primary">Go!</button> 
                </span>  
              </div> 
            </div>
        )
    }
}

export default App;
