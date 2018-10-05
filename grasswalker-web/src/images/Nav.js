/**
 * Created by Sai on 10/3/18.
 */
import React, { Component } from 'react';
import nav from './nav.png';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

class Nav extends Component{
    constructor(props){
        super(props);
        this.img = <img src={nav} hspace="20" height="10%" width="95%"/>
    }
    render(){
        return(
                <div className="nav-img">
                    <div className="row">
                        <div className="nav-item nav-item-border center nav-item-text">About</div>
                        <div className="nav-item nav-item-border center nav-item-text">Exchange</div>
                        <div className="nav-item nav-item-border center nav-item-text"><a href={"/lab"}>My Lab</a></div>
                        <div className="nav-item center nav-item-text">Contact Us</div>
                    </div>
                </div>
        )
    }
}

export default Nav;