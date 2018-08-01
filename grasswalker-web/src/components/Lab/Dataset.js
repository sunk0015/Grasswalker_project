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
class Dataset extends Component{
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
            <div className="dataset">
                <div className="dataset-content">
                    <h5>{this.props.dataset.title}</h5>
                    <p>{this.props.dataset.abstract}</p>
                    <Link to={this.to}>View Detail</Link>
                    <div className="footer">Dataset</div>
                </div>
            </div>
        )
    }
}
export default Dataset;