/**
 * Created by Sai on 8/29/18.
 */
import React, { Component } from 'react';
import '../../App.css';
import './Lab.css';
import {
  Link,
} from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import DropboxChooser from 'react-dropbox-chooser';



class DBoxChooser extends React{

    constructor(props){
        super(props);
        alert("Dropbox");
    }
    render(){
        return(
            <DropboxChooser
                    appKey={'zgx0z57ovobicis'}
                    success={files => this.onSuccess(files)}
                    cancel={() => this.onCancel()}
                    multiselect={true}
                    <button className="dropbox-button">Choose from Dropbox!</button>
                </DropboxChooser>
        )
    }
}

export default DBoxChooser;