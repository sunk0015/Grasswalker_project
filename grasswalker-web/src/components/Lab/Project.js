/**
 * Created by Sai on 7/30/18.
 */
import React, { Component } from 'react';
import '../../App.css';
import './Lab.css';
import {
  Link,
} from 'react-router-dom';
import CreateDatasetForm from './CreateDataset';
import CreateProjectForm from './CreateProject';
import CreateFolderForm from './CreateFolder';
import DeleteProjectForm from './DeleteProjectForm';
import {NotificationContainer, NotificationManager} from 'react-notifications';
class Project extends Component{
    constructor(props){
        super(props);
        this.detailView = "/lab/folder/"+props.proj.id+"/";
        this.to = {
            'pathname':this.detailView,
            'state':{
                'foldername':this.props.proj.name
            }
        }
    }

    render(){
        return(
            <div className="folder">
                  <div className="card-header">Folder</div>
                  <div className="card-body">
                    <h5 className="card-title">{this.props.proj.name}</h5>
                    <p><b>Description:</b></p>
                    <p className="card-text">{this.props.proj.description}</p>
                  </div>
                  <div className="card-footer folder-card-footer text-muted"><Link className="folder-card-link" to={this.to}>Explore Folder</Link></div>
            </div>
        )
    }
}

export default Project;