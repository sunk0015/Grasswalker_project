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
import fileDownload from 'js-file-download';

class DatasetDetail extends Component{
    constructor(props){
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {detailContent:null};
        var server = window.localStorage.getItem('server');
        this.downloadLink = "/lab/dataset/download/" + this.props.match.params.datasetid+"/";
        this.downloadDataset = this.downloadDataset.bind(this);
        this.createNotification = this.createNotification.bind(this);
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
    createNotification = (type,msg,title) => {
        if(type=='success'){
            console.log("succes");
            return NotificationManager.success(msg,title);
        }
        else{
            console.log("error");
            return NotificationManager.error(msg,title);
        }
    }

    downloadDataset(){
        var token = window.localStorage.getItem('key');
        var auth = 'Token '+token;
        var server = window.localStorage.getItem('server');
        var datasetid = this.props.match.params.datasetid;
        var data = new FormData();
        data.append('datasetid',datasetid);
        var title = this.props.location.state.datasettitle;
        fetch(server+'/api/datasetlist/download/',{
            method: 'POST',
            headers: {
                'Authorization' : auth
            },
            body: data
        })
        .then(response => response.blob())
        .then(blob => {
            console.log(blob);
            fileDownload(blob,title+'.csv');
            this.createNotification('success','Downloaded '+title,'Success');
        });
    }

    render(){
        if(this.state.detailContent){
            return(
            <div className="container">
                <NotificationContainer/>
                <h1>Dataset: {this.props.location.state.datasettitle}</h1>
                <NotificationContainer/>
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-1 sidebar">
                        <ul className="list-group">
                            <li className="list-group-item">
                            <a className="sidebarLink" onClick={this.downloadDataset} >Download Dataset</a>
                            </li>
                            <li className="list-group-item">
                            <a className="sidebarLink" href={window.location.href} onClick={this.showDeleteDatasetModal}>Delete Dataset</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-5 main dataset-detail">
                        <div className="container">
                            <div className="container">
                                <div className="row"><p><b>Date: </b> <br/>{this.state.detailContent.date}</p></div>
                                <div className="row"><p><b>Abstract: </b> <br/>{this.state.detailContent.abstract}</p></div>
                                <div className="row"><p><b>Methodology:</b> <br/>{this.state.detailContent.methodology}</p></div>
                                <div className="row"><p><b>Preview:</b> <br/>{this.state.detailContent.file}</p></div>
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