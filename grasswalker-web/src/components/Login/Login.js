/**
 * Created by Sai on 6/27/18.
 */
import React, { Component } from 'react';
import '../../App.css';
import {
  Link
} from 'react-router-dom'

class Login extends Component{
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
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log(response);
            window.localStorage.setItem('key',response.key);
        });
    }

    render() {
        return(
            <div className="container col-lg-3 col-md-4 col-sm-6">
            <form id='loginForm' onSubmit={this.submitLogin}>
              <div className="form-group">
                <label for="username">Username</label>
                <input type="text" className="form-control" id="username" placeholder="Enter username"/>
              </div>
              <div className="form-group">
                <label for="passwordinput">Password</label>
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