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
import DeleteProjectForm from './DeleteProjectForm';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Project from './Project';
import Modal from './Modal';
import Sidebar from './Sidebar';
import GenericModal from './GenericModal';

class Lab extends Component {
    constructor(props){
        super(props);
        var labname = window.localStorage.getItem('labname');
        this.state = {labname:labname,projects:null,showModal:false,modalContent:{}};
        this.componentDidMount = this.componentDidMount.bind(this);
        this.updateModalState = this.updateModalState.bind(this);
        this.updateModalContent = this.updateModalContent.bind(this);
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
            var labname = window.localStorage.getItem('labname');
            for(var i=0;i<response.length;i++){
                projects.push(<Project key={response[i].id} proj={response[i]}/>);
            }
            this.setState({labname:labname,projects:projects,sidebar_projects_data:response},function(){
                console.log(this.state);
            });
        });
    }

    closeModal(){
        this.setState({showModal:false});
    }

    updateModalState(showModal){
        this.setState({showModal})
    }
    updateModalContent(event){
        this.setState(event);
    }
    render(){
        return(
            <div className="container">
                <h1>{this.state.labname}</h1>
                <NotificationContainer/>
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-1 sidebar">
                        <Sidebar isLabHome={true} projects={this.state.sidebar_projects_data} updateModalContent={this.updateModalContent}/>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-5 main">
                        <div className="container">
                            <Modal showModal={this.state.showModal} type={this.state.formDatasetType} modalContent={this.state.modalContent} closeModal={this.closeModal}/>
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




export default Lab;