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
        this.detailView = "/lab/"+props.proj.id+"/";
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
                <div className="folder-content">
                    <h5>{this.props.proj.name}</h5>
                    <p>{this.props.proj.description}</p>
                    <Link to={this.to}>Explore</Link>
                    <div className="footer">Folder</div>
                </div>
            </div>
        )
    }
}

export default Project;