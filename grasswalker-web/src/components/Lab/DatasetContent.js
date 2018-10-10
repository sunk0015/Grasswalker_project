/**
 * Created by Sai on 10/10/18.
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


class DatasetContent extends Component{
    constructor(props){
        super(props);
        this.detailDatasetView = "/lab/dataset/"+props.dataset.id+"/";
        this.to = {
            'pathname':this.detailDatasetView,
            'state':{
                'datasettitle':this.props.dataset.title
            }
        }
    }
    render(){
        return(
            <div className="labhome-detail">
                    <div className="projectcontent-title"><Link id="linkcolor" to={this.to}>{this.props.dataset.title}</Link></div>
                    <div className="projectcontent-text">{this.props.dataset.date}</div>
                    <div className="projectcontent-text">{this.props.dataset.abstract}</div>
            </div>
        )
    }
}
export default DatasetContent;