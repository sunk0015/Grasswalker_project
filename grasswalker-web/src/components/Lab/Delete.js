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


class DeleteProjectForm extends Component{
    constructor(props){
        super(props);
        this.deleteProject = this.deleteProject.bind(this);
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

    deleteProject(event){
        event.preventDefault();
        var token = window.localStorage.getItem('key');
        var auth = 'Token '+token;
        var server = window.localStorage.getItem('server');
        var data= new FormData();
        var id = event.target.projectname.value;
        var select = event.target.projectname;
        var selectedIndex = select.selectedIndex;
        var name = event.target.projectname.options[selectedIndex].text;
        data.append('projectid',id);
        fetch(server+'/api/projectlist/delete/',{
            method: 'DELETE',
            headers: {
                'Authorization' : auth
            },
            body: data
        })
        .then(response => {
            if (response.status==204){
                console.log(response);
                this.createNotification('success','Deleted Project: '+name,'Success');
                this.props.closeModal();
            }
            else{
                console.log(response);
                this.createNotification('error','Failed to delete Project '+name,'Failed');
                this.props.closeModal();
                return;
            }
        });
    }
    render(){
        console.log(this.props);
        return(
        <div className={this.props.modalState} tabIndex="-1" role="dialog">
                <NotificationContainer/>
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">{this.props.modalContent.name}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.closeModal}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                        <form onSubmit={this.deleteProject}>
                      <div className="modal-body">
                            <div className="container">
                                <div className="row">
                                    <label> Project: <br/>
                                        <select id="projectname" name="projectname">
                                            {this.props.projects}
                                        </select>
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
    )
    }
}

export default DeleteProjectForm;
