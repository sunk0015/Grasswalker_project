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
import Sidebar from './Sidebar';

class FolderHome extends Component{
    constructor(props){
        super(props);
        console.log(this.props.location.state);
        console.log(this.props);
        //state and functions to bind
        var labname = window.localStorage.getItem('labname');
        var foldername = this.props.location.state.foldername;
        this.state = {labname:labname,foldername:foldername,child_folders:null, sidebar_child_folders:null,child_datasets:null, showModal:false,modalContent:{},folderid:null, showFolder:true};
        this.closeModal = this.closeModal.bind(this);
        this.updateModalContent = this.updateModalContent.bind(this);

        //auth
        var token = window.localStorage.getItem('key');
        var auth = 'Token '+token;
        var server = window.localStorage.getItem('server');
        var folderid = this.props.match.params.folderid;
        console.log("Folderid is "+folderid);
        fetch(server+'/api/folderlist/'+folderid+'/',{
            method: 'GET',
            headers: {
                'Authorization' : auth
            }
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log("response from folderlist call");
            var subfolders = [];
            var labname = window.localStorage.getItem('labname');
            console.log(labname);
            for(var i=0;i<response.length;i++){
                subfolders.push(<Project key={response[i].id} proj={response[i]}/>);
            }
            this.setState({child_folders:subfolders,sidebar_child_folders:response,folderid:folderid},function(){
                console.log(this.state);
            });
        });
        fetch(server+'/api/datasetlist/'+folderid+'/',{
            method: 'GET',
            headers: {
                'Authorization' : auth
            }
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            var subdatasets = [];
            for(var i=0;i<response.length;i++){
                console.log(response[i]);
                subdatasets.push(<Dataset key={response[i].id} dataset={response[i]}/>);
            }
            this.setState({child_datasets:subdatasets,sidebar_child_datasets:response},function(){
                console.log(this.state);
            });
        });
    }

    closeModal(){
        this.setState({showModal:false});
    }

    updateModalContent(event){
        this.setState(event);
    }



    render(){
        return(
            <div className="container">
                <h1>Folder: {this.state.foldername} {this.state.folderId}</h1>
                <NotificationContainer/>
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-1 sidebar">
                        <Sidebar isLabHome={false} parentId={this.props.match.params.folderid} parentName={this.props.location.state.foldername} child_folders={this.state.child_folders} child_datasets={this.state.child_datasets} updateModalContent={this.updateModalContent}/>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-5 main">
                        <div className="container">
                            <Modal showModal={this.state.showModal} type={this.state.formDatasetType} projects={this.state.modalContent.projects} modalContent={this.state.modalContent} closeModal={this.closeModal}/>
                            <div className="parent">
                                        {this.state.child_folders}
                            </div>
                            <div className="parent">
                                        {this.state.child_datasets}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default FolderHome;
