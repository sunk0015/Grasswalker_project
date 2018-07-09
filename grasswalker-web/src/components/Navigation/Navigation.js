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

class Navigation extends Component {
    constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      settingsColor: 'white',
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
        <div className="Navigation"> 
          <nav className="navbar navbar-expand navbar-dark bg-dark">
             
            <Link to="/" className="LinkStyle nav-padded">Grasswalker</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
                    <span className="navbar-toggler-icon" /> 
            </button> 
            <div className="collapse navbar-collapse" id="navbarNav"> 
              <ul className="navbar-nav">
                <li className="nav-item nav-padded">
                    <Link to="/search/">Search</Link> 
                </li> 
                <li className="nav-item nav-padded">
                    <Link to="/upload/">Upload</Link> 
                </li> 
                <li className="nav-item nav-padded">
                    <Link to="/shared/">Shared With Me</Link> 
                </li> 
              </ul> 
              <div
                className="collapse navbar-collapse justify-content-end"
                id="navbarNav"
              > 
                <ul className="navbar-nav">
                <li className="nav-item nav-padded">
                  <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret color={this.state.settingsColor}>Settings</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        <Link to="/shared/">My Account</Link> 
                      </DropdownItem>
                      <DropdownItem>
                        <Link to="/login/">Login</Link> 
                      </DropdownItem>
                      <DropdownItem>
                        <Link to="/shared/">Create Account</Link> 
                      </DropdownItem>
                      <DropdownItem>
                        <Link to="/upload/">Log Out</Link> 
                      </DropdownItem>
                      <DropdownItem>
                        <Link to="/search/">Help</Link> 
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </li> 

                </ul> 
              </div>  
            </div>  
          </nav> 
        </div> 
    );
  }
}

export default Navigation;