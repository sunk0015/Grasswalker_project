/**
 * Created by Sai on 6/19/18.
 */
import React, { Component } from 'react';
import '../../App.css';
import Dataset from '../Dataset/Dataset.js'
import Dropbox from 'dropbox';

class Shared extends Component {

    constructor(props){
        super(props);
        this.dropBox = this.dropBox.bind(this);
        this.state = {content:1};
    }
    dropBox(){
        this.setState({content:this.state.content+1});
        var Dropbox = require('dropbox').Dropbox;
        var dbx = new Dropbox({ accessToken: 'cQCT-2Yk8vAAAAAAAAAELYuPZvFvdu_5fqeUqx6ByEI_g6j4Ci7t4456LGdfdDUZ' });
        dbx.filesListFolder({path: ''})
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });

        dbx.filesDownloadZip({path:'/Lab data 1'})
            .then(function(response){
               console.log(response);
            })
            .catch(function(error){
                console.log(error);
            });
    }
    render (){
        return (
            <div className="container">
                <button onClick={this.dropBox}>Click me</button>
                <div>
            <p>{this.state.content}</p>
                </div>
            </div>
        )
    }
}

export default Shared;