/**
 * Created by Sai on 7/11/18.
 */
import React, { Component } from 'react';
import '../../App.css';
import {
  Link
} from 'react-router-dom'

class Logout extends Component{
    constructor(props){
        super(props);
        var token = window.localStorage.getItem('key');
        var auth = 'Token '+token;
        var data= new FormData();
        fetch('http://localhost:8000/api/rest_auth/logout/',{
            method: 'POST',
            headers: {
                'Authorization' : auth
            },
            body: data
        })
        .then(response => response.json())
        .catch(error => {
              window.setTimeout(function() {
                window.location.href = "/login/";
             }, 5000);
        })
        .then(response => {
            console.log(this);
            this.setState({loggedIn:false},function(){
                window.localStorage.removeItem('key');
                window.localStorage.removeItem('username');
                window.localStorage.removeItem('labname');
                console.log(this.state);
            });
            window.setTimeout(function() {
                window.location.href = "/login/";
             }, 5000);
        });

    }

    render() {
        return(
            <p>Logged out</p>
        );
    }
}

export default Logout;