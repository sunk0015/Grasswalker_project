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



class CreateFolderForm extends Component{
      constructor(props) {
        super(props);
        this.createNotification = this.createNotification.bind(this);
        this.createFolder = this.createFolder.bind(this);
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
      createFolder(event){
        event.preventDefault();
        var token = window.localStorage.getItem('key');
        var auth = 'Token '+token;
        var server = window.localStorage.getItem('server');
        var data= new FormData();
        var parent =  this.props.modalContent.parentId;
        var name = event.target.foldername.value;
        var description = event.target.folderdescription.value;
        data.append('parent',parent);
        data.append('name',name);
        data.append('description',description);
        fetch(server+'/api/folderlist/',{
            method: 'POST',
            headers: {
                'Authorization' : auth
            },
            body: data
        })
        .then(response => {
            if (response.status==201){
                response = response.json()
                this.createNotification('success','Created project: '+name,'Success');
                this.props.closeModal();
            }
            else{
                this.createNotification('error','Project '+name+' not created','Failed');
                this.props.closeModal();
                return;
            }
        });
    }
    render(){
        return(
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
                        <form onSubmit={this.createFolder}>
                      <div className="modal-body">
                        <div className="container">
                            <div className="row">
                                <label> Parent: <br/>
                                    <b>{this.props.modalContent.parentName}</b>
                                </label>
                            </div>
                            <div className="row">
                                <label> Name: <br/>
                                    <input type="text" name="foldername" defaultValue="Name"/>
                                </label>
                            </div>
                            <div className="row">
                                <label> Description: <br/>
                                    <input type="text" name="folderdescription" defaultValue="Description"/>
                                </label>
                            </div>
                        </div>
                        </div>
                      <div className="modal-footer">
                        <button type="submit" className="btn btn-primary-gw">{this.props.modalContent['buttonLabel']}</button>
                        <button type="button" className="btn btn-secondary-gw" data-dismiss="modal" onClick={this.props.closeModal}>Close</button>
                      </div>
                    </form>
                    </div>
                  </div>
            </div>
        )
    }
}

export default CreateFolderForm;