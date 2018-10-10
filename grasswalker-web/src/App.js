import React, { Component } from 'react';
import './App.css';
import Nav from './images/Nav.js';

// import route Components here
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

import MetaTags from 'react-meta-tags';

import About from './components/About/About.js';
import Search from './components/Search/Search.js';
import Shared from './components/Shared/Shared.js';
import Upload from './components/Upload/Upload.js';
import Navigation from './components/Navigation/Navigation.js'
import Login from './components/Login/Login.js';
import Logout from './components/Login/Logout.js';
import CreateAccount from './components/Login/CreateAccount.js';
import Content from './components/Content/Content.js';
import Lab from './components/Lab/Lab.js';
import LabHome from './components/Lab/LabHome.js';
import FolderHome from './components/Lab/FolderHome.js';
import DatasetDetail from './components/Lab/DatasetDetail.js';
import {withRouter} from 'react-router';

class App extends Component {
    constructor(props){
        super(props);
        // window.localStorage.setItem('server','http://localhost:8000');
        window.localStorage.setItem('server','http://grasswalker.org:8000');
    }

  render() {
    return (
      <Router>
        <div className="App">
            <div className="page-container">
                <div className="grasswalker-header center">
                    <h3 className="grasswalker-header-text">Grasswalker</h3>
                </div>
                <Nav/>
                <div className="content-container">
                    <Route exact path="/" component={Home} /> 
                    <Route exact path="/home" component={Home} /> 
                    <Route exact path="/about" component={About} /> 
                    <Route exact path="/shared" component={Shared} /> 
                    <Route exact path="/upload" component={Upload} /> 
                    <Route exact path="/login" component={Login} /> 
                    <Route exact path="/logout" component={Logout} /> 
                    <Route exact path="/create" component={CreateAccount} /> 
                    <Route exact path="/lab" component={LabHome} /> 
                    <Route exact path="/lab/folder/:folderid/" render={(props) => <FolderHome {...props}/>} /> 
                    <Route exact path="/lab/folder/delete/:folderid/" render={(props) => <FolderHome {...props}/>} /> 
                    <Route exact path="/lab/dataset/:datasetid/" render={(props) => <DatasetDetail {...props}/>}  /> 
                    <Route exact path="/lab/dataset/delete/:datasetid/" render={(props) => <DatasetDetail {...props}/>}  />
                </div>
 
            </div>
        </div>
      </Router>
    );
  }
}

class Home extends Component {
    render (){
        return (
            <div className="container">
                <div className="home-banner">
                    <div className="home-banner-text">Welcome to Grasswalker</div>
                    <div>{"We let the world's most brilliant minds work together."}</div>
                    <br/>
                    <div className="home-learn-more">{"Learn More"}</div>
                </div>

            </div>
        )
    }
}

export default App;
