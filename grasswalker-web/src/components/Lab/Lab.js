/**
 * Created by Sai on 7/19/18.
 */
import React, { Component } from 'react';
import '../../App.css';
import './Lab.css';

class Lab extends Component {
    constructor(props){
        super(props);
        var labname = window.localStorage.getItem('labname');
        this.state = {labname:labname}
    }
    render(){
        return(
            <div className="container"><h1>{this.state.labname}</h1></div>
        )
    }
}

export default Lab;