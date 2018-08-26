/**
 * Created by Sai on 8/13/18.
 */
import React, { Component } from 'react';
import '../../App.css';
import './Login.css';
import {
  Link
} from 'react-router-dom'
import {NotificationContainer, NotificationManager} from 'react-notifications';



class CreateAccount extends Component{

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
        var username = event.target.username.value;
        var password1 = event.target.password.value;
        var password2 = event.target.confirmpassword.value;
        var email = event.target.email.value;
        var labkey = event.target.labkey.value;
        var data = new FormData();
        data.append('username', username);
        data.append('password1', password1);
        data.append('password2', password2);
        data.append('email', email);
        var server = window.localStorage.getItem('server');
        fetch(server+'/api/rest_auth/registration/',{
            method: 'POST',
            body: data
        })
        .then(response => {
            console.log(response.status);
            if(response.status>=400){
                throw new Error(response);
            }
            else{
                var json = response;
                var server = window.localStorage.getItem('server');
                var auth = 'Token '+json.key;
                console.log(auth);
                fetch(server+'/api/labkey/'+labkey+'/',{
                    method: 'GET',
                    headers: {
                        'Authorization' : auth
                    }
                })
                .then(labresponse => labresponse.json())
                .catch(error => console.error(error))
                .then(labresponse => {
                    console.log("GOT lab from key");
                    console.log(labresponse);
                });
            }
        })
        .catch(err => console.error(err));


    }

    render() {
        return(
            <div className="container col-lg-3 col-md-4 col-sm-6">
            <h2>Create Account</h2>
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
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" className="form-control" id="confirmpassword" placeholder="Confirm Password"/>
              </div>
                <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" id="email" placeholder="Email"/>
              </div>
                <div className="form-group">
                <label>Lab Key</label>
                <input type="labkey" className="form-control" id="labkey" placeholder="Contact lab admin for key"/>
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

export default CreateAccount;