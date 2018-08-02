/**
 * Created by Sai on 8/2/18.
 */
import React, { Component } from 'react';
import logo from './GW-LOGO-FULL.png'; // Tell Webpack this JS file uses this image

console.log(logo); // /logo.84287d09.png

class Logo extends Component{
    render(){
        return(
               <img src={logo} hspace="20" height="80px" width="129px"/>
        )
    }
}

export default Logo;