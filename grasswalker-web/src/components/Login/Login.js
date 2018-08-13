/**
 * Created by Sai on 6/27/18.
 */
import React, { Component } from 'react';
import '../../App.css';
import {
  Link
} from 'react-router-dom'
import {NotificationContainer, NotificationManager} from 'react-notifications';


class Login extends Component{

    constructor(props){
        super(props);
        this.submitLogin = this.submitLogin.bind(this);
        this.createNotifcation = this.createNotification.bind(this);

    }

    createNotification = (type,msg,title) => {
        if(type=='success'){
            console.log("succes");
            return NotificationManager.success(msg,title);
        }
        else{
            console.log("error");
            return NotificationManager.error(msg,title);
        }
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
        var server = window.localStorage.getItem('server');
        fetch(server+'/api/rest_auth/login/',{
            method: 'POST',
            body: data
        })
        .then(response => {
            if(response.status!=400){
                this.createNotification('success','Logged in as : '+username,'Success');
                return response.json();

            }
            else{
                this.createNotification('error','Login failed for '+username+'. Please verify credentials and try again.','Error');
                throw new Error("Login failed");
            }
        })
        .then(response => {
            console.log(response);
            this.setState({loggedIn:true},function(){
                window.localStorage.setItem('key',response.key);
                window.localStorage.setItem('username',username);
                console.log(this.state);
            });
            window.setTimeout(function() {
                window.location.href = "/lab/";
            }, 1000);
            var token = window.localStorage.getItem('key');
            var auth = 'Token '+token;
            var server = window.localStorage.getItem('server');
            fetch(server+'/api/userlab/',{
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
        })
        .catch(error => {
            window.setTimeout(function() {
                    window.location.href = "/logout/";
            }, 3000);
        });

    }

    render() {
        return(
            <div className="container col-lg-3 col-md-4 col-sm-6">
            <NotificationContainer/>
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
              <button type="submit" className="btn btn-primary-gw">Login!</button>
            </form>
            </div>

    );
    }
}

export default Login;