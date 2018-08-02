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
import Project from './Project';
import Modal from './Modal';
import Dataset from './Dataset';

class DatasetDetail extends Component{
    constructor(props){
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {detailContent:null};
    }

    componentDidMount(){
        var token = window.localStorage.getItem('key');
        var auth = 'Token '+token;
        var server = window.localStorage.getItem('server');
        var datasetid = this.props.match.params.datasetid;
        fetch(server+'/api/dataset/'+datasetid+'/',{
            method: 'GET',
            headers: {
                'Authorization' : auth
            }
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            var detailContent = [];
            detailContent.title = response.title;
            detailContent.date = response.date;
            detailContent.abstract = response.abstract;
            detailContent.methodology = response.methodology;
            detailContent.file = response.file;
            console.log(detailContent);
            this.setState({detailContent:detailContent},function(){
                console.log("Detail content");
                console.log(this.state.detailContent.date);
            });
        });

    }

    render(){
        if(this.state.detailContent){
            return(
            <div className="container">
                <h1>Dataset: {this.props.location.state.datasettitle}</h1>
                <NotificationContainer/>
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-1 sidebar">
                        <ul className="list-group">
                            <li className="list-group-item">
                            <a className="sidebarLink" href="#">Download Dataset!</a>
                            </li>
                            <li className="list-group-item">
                            <a className="sidebarLink" href="#" onClick={this.showDeleteDatasetModal}>Delete Dataset!</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-5 main">
                        <div className="container">
                            <div className="container">
                                <div className="row"><h3><b>Date: </b>{this.state.detailContent.date}</h3></div>
                                <div className="row"><h3><b>Abstract: </b>{this.state.detailContent.abstract}</h3></div>
                                <div className="row"><h3><b>Methodology:</b>{this.state.detailContent.methodology}</h3></div>
                                <div className="row"><h3><b>Preview:</b>{this.state.detailContent.file}</h3></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        }
        else{
            return(
            <div className="container">
                    <h1>Fetching dataset content</h1>
            </div>
            )
        }

    }
}

export default DatasetDetail;