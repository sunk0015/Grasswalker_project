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
            <div className="dataset-card">
                  <div class="card-header">
                    Dataset
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">{this.props.dataset.title}</h5>
                    <p><b>Date:</b></p>
                    <p class="card-text">{this.props.dataset.date}</p>
                    <p><b>Abstract:</b></p>
                    <p class="card-text">{this.props.dataset.abstract}</p>
                  </div>
                  <div class="card-footer text-muted">
                        <Link to={this.to}>Explore Dataset</Link>
                  </div>
            </div>
        )
    }
}
export default Dataset;