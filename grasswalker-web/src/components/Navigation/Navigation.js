/**
 * Created by Sai on 6/19/18.
 */

import React, { Component } from 'react';
import '../../App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

import Search from '../Search/Search.js'
import Shared from '../Shared/Shared.js'
import Upload from '../Upload/Upload.js'
import Login from '../Login/Login.js'

import './Navigation.css'

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import Logo from '../../images/Logo.js';

class Navigation extends Component {

  constructor(props){
    console.log(window.localStorage);
    console.log(lab);
    super(props);
    var lab = window.localStorage.getItem('labname');
    if(lab!=null){
          this.state = {showLab:true, lab:lab};
    }
    else{
          this.state = {showLab:false, lab:null};
    }
    console.log(this.state);
  }

  render() {
    return (
        <div className="Navigation"> 
          <nav className="navbar navbar-expand-lg">
            <Logo className="logo"/>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav">
                <li className="nav-item nav-padded">
                    <Link to="/search/">Search</Link> 
                </li> 
                <li className="nav-item nav-padded">
                    <HomePage display={this.state.showLab} lab={this.state.lab}/>
                </li> 
        {/*
                <li className="nav-item nav-padded">
                    <Link to="/upload/">Upload</Link> 
                </li> 
                <li className="nav-item nav-padded">
                    <Link to="/shared/">Share</Link> 
                </li> 
                <li className="nav-item nav-padded">
                    <Link to="/shared/">Shared With Me</Link> 
                </li> 
        */}
              </ul> 
            </div>
            <SettingsDropdown/>
          </nav>
        </div> 
    );
  }
}

class SettingsDropdown extends Component{
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    var token = window.localStorage.getItem('key');
    var msg = "";
    console.log("token"+token);
    if(token){
      msg = "Logged in as "+ window.localStorage.getItem('username');
    }
    else{
      msg = "Not logged in";
    }
    console.log(msg);
    console.log("msg");
    this.state = {
      dropdownOpen: false,
      settingsColor: 'white',
      loggedIn: msg,
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render(){
    return(
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav" > 
                  <ul className="navbar-nav">
                          <li className="nav-item nav-padded">
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                              <DropdownToggle caret color={this.state.settingsColor}>{this.state.loggedIn}</DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem>
                                  <Link to="/login/">Login</Link> 
                                </DropdownItem>
                                <DropdownItem>
                                  <Link to="/shared/">Create Account</Link> 
                                </DropdownItem>
                                <DropdownItem>
                                  <Link to="/logout/">Log Out</Link> 
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                    </li> 
                </ul> 
          </div>  
    )
  }
}

class HomePage extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
        <Link to="/lab/">{this.props.lab}</Link> 
    )
  }
}
export default Navigation;