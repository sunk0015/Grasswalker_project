/**
 * Created by Sai on 10/5/18.
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


class ProjectContent extends Component{
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
        console.log(this.to);
        return(
            <div className="labhome-projectdetail">
                    <div className="projectcontent-project-title"><Link id="linkcolor" to={this.to}>{this.props.proj.name}</Link></div>
                    <div className="projectcontent-project-text">{this.props.proj.description}</div>
            </div>
        )
    }
}

export default ProjectContent;