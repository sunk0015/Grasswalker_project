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
import ProjectContent from './ProjectContent';
import Modal from './Modal';
import DatasetContent from './DatasetContent';
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
                subfolders.push(<ProjectContent key={response[i].id} proj={response[i]}/>);
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
            console.log("ABCDEFG");
            console.log(response);
            var subdatasets = [];
            for(var i=0;i<response.length;i++){
                console.log(response[i]);
                subdatasets.push(<DatasetContent key={response[i].id} dataset={response[i]}/>);
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
            <div className="content-container">
                <NotificationContainer/>
                <div className="labhome-container">
                    <div className="labhome-sidebar">
                        <div className="labhome-sidebar-title">Folder: {this.state.foldername} {this.state.folderId}</div>
                        <div className="labhome-sidebar-options">
                            <div className="labhome-sidebar-option">Projects</div>
                            <div className="labhome-sidebar-option">Search</div>
                            <div className="labhome-sidebar-option">Data Standards</div>
                            <div className="labhome-sidebar-option">Folder Actions
                                     <Sidebar isLabHome={false} parentId={this.props.match.params.folderid} parentName={this.props.location.state.foldername} child_folders={this.state.child_folders} child_datasets={this.state.child_datasets} updateModalContent={this.updateModalContent}/>
                            </div>
                        </div>
                    </div>
                    <div className="labhome-content">
                        <Modal showModal={this.state.showModal} type={this.state.formDatasetType} modalContent={this.state.modalContent} closeModal={this.closeModal}/>
                        <h3 className="labhome-content-title">Folders</h3>
                        <div className="folderhome-projectlist">
                            {this.state.child_folders}
                        </div>
                        <h3 className="labhome-content-title">Datasets</h3>
                        <div className="folderhome-datasetlist">
                            {this.state.child_datasets}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default FolderHome;
