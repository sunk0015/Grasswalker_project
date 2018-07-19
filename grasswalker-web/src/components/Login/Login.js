/**
 * Created by Sai on 6/27/18.
 */
import React, { Component } from 'react';
import '../../App.css';
import {
  Link
} from 'react-router-dom'

class Login extends Component{

    constructor(props){
        super(props);
        this.submitLogin = this.submitLogin.bind(this);
    }

    submitLogin(event){
        event.preventDefault();
        var data= new FormData();
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        console.log(username);
        console.log(password);
        data.append('username', username);
        data.append('password', password);
        fetch('http://localhost:8000/api/rest_auth/login/',{
            method: 'POST',
            body: data
        })
        .then(response => response.json())
        .catch(error => {
            console.log("Error logging in");
            window.setTimeout(function() {
                window.location.href = "/logout/";
             }, 1000);
        })
        .then(response => {
            console.log(response);
            this.setState({loggedIn:true},function(){
                window.localStorage.setItem('key',response.key);
                window.localStorage.setItem('username',username);
                console.log(this.state);
            });
            window.setTimeout(function() {
                window.location.href = "/search/";
            }, 1000);
            var token = window.localStorage.getItem('key');
            var auth = 'Token '+token;
            console.log("got here");
            fetch('http://localhost:8000/api/userlab/',{
                method: 'GET',
                headers: {
                    'Authorization' : auth
                }
            })
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                window.localStorage.setItem('labname',response[0].name);
            });
        });

    }

    render() {
        return(
            <div className="container col-lg-3 col-md-4 col-sm-6">
            <form id='loginForm' onSubmit={this.submitLogin}>
              <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" id="username" placeholder="Enter username"/>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password"/>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" className="form-check-input"/>
                  Remember me
                </label>
              </div>
              <button type="submit" className="btn btn-primary">Login!</button>
            </form>
            </div>



    );
    }
}

export default Login;