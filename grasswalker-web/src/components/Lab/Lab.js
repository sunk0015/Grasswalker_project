/**
 * Created by Sai on 7/19/18.
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
import DeleteProjectForm from './Delete';
import {NotificationContainer, NotificationManager} from 'react-notifications';
class Lab extends Component {
    constructor(props){
        super(props);
        var labname = window.localStorage.getItem('labname');
        this.state = {labname:labname,projects:null,showModal:false,modalContent:{}};
        this.componentDidMount = this.componentDidMount.bind(this);
        this.showDatasetModal = this.showDatasetModal.bind(this);
        this.showProjectModal = this.showProjectModal.bind(this);
        this.showFolderModal = this.showFolderModal.bind(this);
        this.showDeleteModal = this.showDeleteModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount(){
        var token = window.localStorage.getItem('key');
        var auth = 'Token '+token;
        var server = window.localStorage.getItem('server');
        fetch(server+'/api/projectlist/',{
            method: 'GET',
            headers: {
                'Authorization' : auth
            }
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            var projects = [];
            console.log(response);
            var labname = window.localStorage.getItem('labname');
            for(var i=0;i<response.length;i++){
                console.log(response[i]);
                projects.push(<Project key={response[i].id} proj={response[i]}/>);
            }
            this.setState({labname:labname,projects:projects,projects_response:response},function(){
                console.log(this.state);
            });
        });
    }
    showDatasetModal(){
        var response = this.state.projects_response;
        var folders = [];
        for(var i =0;i<response.length;i++){
            folders.push(<option key={response[i].id} value={response[i].id}> {response[i].name} </option>);
            console.log(response[i].id);
        }
        console.log(folders)
        this.setState({showModal:true,formDatasetType:"dataset",modalContent:{'name':'Create a new Dataset!','projects':folders,'buttonLabel':'Upload Dataset!'}});
    }
    showProjectModal(){
        this.setState({showModal:true,formDatasetType:"project",modalContent:{'name':'Create a new Project!','buttonLabel':'Create Project!'}});
    }
    showFolderModal(){
        var response = this.state.projects_response;
        var folders = [];
        for(var i =0;i<response.length;i++){
            folders.push(<option key={response[i].id} value={response[i].id}> {response[i].name} </option>);
        }
        this.setState({showModal:true,formDatasetType:"folder",modalContent:{'name':'Create a new Folder!','projects':folders,'buttonLabel':'Create Folder!'}});
    }
    showDeleteModal(){
        var folders = [];
        var response = this.state.projects_response;
        for(var i =0;i<response.length;i++){
            folders.push(<option key={response[i].id} value={response[i].id}> {response[i].name} </option>);
        }
        this.setState({showModal:true,formDatasetType:"delete",modalContent:{'name':'Delete Project','projects':folders,'buttonLabel':'Delete!'}});
    }
    closeModal(){
        this.setState({showModal:false});
    }

    render(){
        return(
            <div className="container">
                <h1>{this.state.labname}</h1>
                <NotificationContainer/>
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-1 sidebar">
                        <ul className="list-group">
                          <li className="list-group-item">
                            <a className="sidebarLink" href="#" onClick={this.showDatasetModal}>Upload a new Dataset!</a>
                            </li>
                          <li className="list-group-item">
                            <a className="sidebarLink" href="#" onClick={this.showProjectModal}>Create a new Project!</a>
                            </li>
                          <li className="list-group-item">
                            <a className="sidebarLink" href="#" onClick={this.showFolderModal}>Create a new Folder!</a>
                            </li>
                            <li className="list-group-item">
                            <a className="sidebarLink" href="#" onClick={this.showDeleteModal}>Delete a Project!</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-5 main">
                        <div className="container">
                            <Modal showModal={this.state.showModal} type={this.state.formDatasetType} projects={this.state.modalContent.projects} modalContent={this.state.modalContent} closeModal={this.closeModal}/>
                            <div className="parent">
                                        {this.state.projects}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class Modal extends Component{
    constructor(props){
        super(props);
    }
    render(){
        this.modalState = this.props.showModal ? 'modal showModal':'modal hideModal';
        if (this.props.type=='dataset'){
            return (
                <CreateDatasetForm modalState={this.modalState} modalContent={this.props.modalContent} projects={this.props.projects} closeModal={this.props.closeModal}/>
            );

        }
        else if(this.props.type=='project'){
            return (
                <CreateProjectForm modalState={this.modalState} modalContent={this.props.modalContent} closeModal={this.props.closeModal}/>
            );

        }
        else if(this.props.type=='folder'){
            return (
                <CreateFolderForm modalState={this.modalState} modalContent={this.props.modalContent} projects={this.props.projects} closeModal={this.props.closeModal}/>
            );

        }
        else if(this.props.type=='delete'){

            return(
                <DeleteProjectForm modalState={this.modalState} modalContent={this.props.modalContent} projects={this.props.projects} closeModal={this.props.closeModal} />
            );
        }
        else{
            return(
                <div></div>
            )
        }
    }

}



class Project extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="folder">
                <div className="folder-content">
                    <h5>{this.props.proj.name}</h5>
                    <p>{this.props.proj.description}</p>
                    <a href="#">Explore Datasets</a>
                </div>
            </div>
        )
    }
}
export default Lab;