/**
 * Created by Sai on 7/28/18.
 */

import React, { Component } from 'react';
import '../../App.css';
import './Lab.css';
import {
  Link,
} from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';


class CreateDatasetForm extends React.Component {
  constructor(props) {
    super(props);
    this.createNotification = this.createNotification.bind(this);
    this.createDataset = this.createDataset.bind(this);
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
  };

createDataset(event){
    event.preventDefault();
    var token = window.localStorage.getItem('key');
    var auth = 'Token '+token;
    var server = window.localStorage.getItem('server');
    var data= new FormData();
    var folder =  event.target.foldername.value;
    var title = event.target.datasetTitle.value;
    var abstract = event.target.datasetAbstract.value;
    var methodology = event.target.datasetTitle.value;
    var file = event.target.file.files[0] ;
    data.append('folder',folder);
    data.append('title',title);
    data.append('abstract',abstract);
    data.append('methodology',methodology);
    data.append('file',file);
    fetch(server+'/api/datasetlist/',{
        method: 'POST',
        headers: {
            'Authorization' : auth
        },
        body: data
    })
    .then(response => {
        if (response.status==201){
            response = response.json()
            console.log(response);
            this.createNotification('success','Created Dataset: '+title,'Success');
            this.props.closeModal();
        }
        else{
            console.log(response);
            this.createNotification('error','Dataset '+title+' not created','Failed');
            this.props.closeModal();
            return;
        }
    });
    }
  render() {
        return (

        <div className={this.props.modalState} tabIndex="-1" role="dialog">
                <NotificationContainer/>
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">{this.props.modalContent['name']}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.closeModal}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                        <form onSubmit={this.createDataset}>
                      <div className="modal-body">
                            <div className="container">
                                <div className="row">
                                    <label> Project: <br/>
                                        <select id="foldername" name="foldername">
                                            {this.props.projects}
                                        </select>
                                    </label>
                                </div>
                                <div className="row">
                                    <label> Title: <br/>
                                        <input type="text" name="datasetTitle" defaultValue="Dataset"/>
                                    </label>
                                </div>
                                <div className="row">
                                    <label> Abstract: <br/>
                                        <input type="text" name="datasetAbstract" defaultValue="Abstract"/>
                                    </label>
                                </div>
                                <div className="row">
                                    <label> Methodology: <br/>
                                        <input type="text" name="datasetMethodology" defaultValue="Methodology"/>
                                    </label>
                                </div>
                                <div className="row">
                                    <label> File: <br/>
                                        <input type="file" name="file"/>
                                    </label>
                                </div>
                            </div>
                        </div>
                      <div className="modal-footer">
                        <button type="submit" className="btn btn-primary">{this.props.modalContent['buttonLabel']}</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.closeModal}>Close</button>
                      </div>
                        </form>
                    </div>
                  </div>
            </div>
        );
    }
}

export default CreateDatasetForm;