/**
 * Created by Sai on 7/31/18.
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
import Dataset from './Dataset'

class Sidebar extends Component{

    constructor(props){
        super(props);
        var labname = window.localStorage.getItem('labname');
        this.state = {projects:null,sidebar_child_folders:null,sidebar_child_datasets:null,showModal:false,modalContent:{}};
        this.componentDidMount = this.componentDidMount.bind(this);
        this.showDatasetModal = this.showDatasetModal.bind(this);
        this.showProjectModal = this.showProjectModal.bind(this);
        this.showFolderModal = this.showFolderModal.bind(this);
        this.showTemplateModal = this.showTemplateModal.bind(this);
        this.showDeleteProjectModal = this.showDeleteProjectModal.bind(this);
        this.showDeleteFolderModal = this.showDeleteFolderModal.bind(this);
        this.showDeleteDatasetModal = this.showDeleteDatasetModal.bind(this);
        this.showDeleteTemplateModal = this.showDeleteTemplateModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount(){
        if(!this.props.isLabHome){
            var token = window.localStorage.getItem('key');
            var auth = 'Token '+token;
            var server = window.localStorage.getItem('server');
            var folderid = this.props.parentId;
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
                this.setState({sidebar_child_folders:response,folderid:folderid},function(){
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
                this.setState({sidebar_child_datasets:response},function(){
                    console.log(this.state);
                });
            });
        }
    }
    showDatasetModal(){
        var parentId = null;
        var parentName = null;
        if(!this.props.isLabHome){
            parentId = this.props.parentId;
            parentName = this.props.parentName;
        }
        this.props.updateModalContent({showModal:true,formDatasetType:"dataset",modalContent:{'name':'Create a new Dataset!','parentId':parentId,'parentName':parentName,'buttonLabel':'Upload Dataset!'}});
    }
    showProjectModal(){
        this.props.updateModalContent({showModal:true,formDatasetType:"project",modalContent:{'name':'Create a new Project!','buttonLabel':'Create Project!'}});
    }
    showFolderModal(){
        var parentId = null;
        var parentName = null;
        if(!this.props.isLabHome){
            parentId = this.props.parentId;
            parentName = this.props.parentName;
        }
        this.props.updateModalContent({showModal:true,formDatasetType:"folder",modalContent:{'name':'Create a new Folder!','parentId':parentId,'parentName':parentName,'buttonLabel':'Create Folder!'}});
    }
    showTemplateModal(){
        this.props.updateModalContent({showModal:true,formDatasetType:"template",modalContent:{'name':'Create a new Template!','buttonLabel':'Create Template!'}});
    }
    showDeleteProjectModal(){
        var projects = [];
        if(this.props.isLabHome){
            projects = this.props.projects;
        }
        var delete_options = [];
        for(var i =0;i<projects.length;i++){
            delete_options.push(<option key={projects[i].id} value={projects[i].id}> {projects[i].name} </option>);
        }
        this.props.updateModalContent({showModal:true,formDatasetType:"deleteproject",modalContent:{'name':'Delete Project','delete_options':delete_options,'buttonLabel':'Delete Project!'}});
    }
    showDeleteFolderModal(){
        var projects = [];
        if(!this.props.isLabHome){
            projects = this.state.sidebar_child_folders;
        }
        var delete_options = [];
        for(var i =0;i<projects.length;i++){
            delete_options.push(<option key={projects[i].id} value={projects[i].id}> {projects[i].name} </option>);
        }
        this.props.updateModalContent({showModal:true,formDatasetType:"deletefolder",modalContent:{'name':'Delete Folder','delete_options':delete_options,'buttonLabel':'Delete Folder!'}});
    }
    showDeleteDatasetModal(){
        var datasets = [];
        if(!this.props.isLabHome){
            datasets = this.state.sidebar_child_datasets;
        }
        var delete_options = [];
        for(var i =0;i<datasets.length;i++){
            delete_options.push(<option key={datasets[i].id} value={datasets[i].id}> {datasets[i].title} </option>);
        }
        this.props.updateModalContent({showModal:true,formDatasetType:"deletedataset",modalContent:{'name':'Delete Dataset','delete_options':delete_options,'buttonLabel':'Delete Dataset!'}});
    }
    showDeleteTemplateModal(){

    }
    closeModal(){
        this.props.updateModalContent({showModal:false});
    }

    render(){

        if(this.props.isLabHome){
            //lab home (top level projects are displayed) i.e. no parent to the page
            return(
                <div className="">
                    <ul className="list-group">
                      <li className="list-group-item">
                        <a className="sidebarLink" onClick={this.showProjectModal}>Create Project!</a>
                        </li>
                      <li className="list-group-item">
                        <a className="sidebarLink" onClick={this.showTemplateModal}>Create Template!</a>
                        </li>
                        <li className="list-group-item">
                        <a className="sidebarLink" onClick={this.showDeleteProjectModal}>Delete Project!</a>
                        </li>
                    </ul>
                </div>
            )
        }
        else{
            //home page is a Folder (or Project) i.e. has a parent or top level folder
            return(
                <div className="">
                    <ul className="list-group">
                        <li className="list-group-item">
                        <a className="sidebarLink" onClick={this.showTemplateModal}>Create Template!</a>
                        </li>
                      <li className="list-group-item">
                        <a className="sidebarLink" onClick={this.showDatasetModal}>Upload Dataset!</a>
                        </li>
                      <li className="list-group-item">
                        <a className="sidebarLink" onClick={this.showFolderModal}>Create Folder!</a>
                        </li>
                        <li className="list-group-item">
                        <a className="sidebarLink" onClick={this.showDeleteFolderModal}>Delete Folder!</a>
                        </li>
                        <li className="list-group-item">
                        <a className="sidebarLink" onClick={this.showDeleteDatasetModal}>Delete Dataset!</a>
                        </li>
                    </ul>
                </div>
            )
        }

    }
}

export default Sidebar;