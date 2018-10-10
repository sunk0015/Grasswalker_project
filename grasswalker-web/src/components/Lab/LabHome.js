/**
 * Created by Sai on 10/5/18.
 */
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
import ProjectContent from './ProjectContent';
import Modal from './Modal';
import Sidebar from './Sidebar';
import GenericModal from './GenericModal';

class LabHome extends Component {
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
            console.log(response);
            var projects = [];
            var labname = window.localStorage.getItem('labname');
            for(var i=0;i<response.length;i++){
                console.log(response[i]);
                projects.push(<ProjectContent key={response[i].id} proj={response[i]}/>);
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
            <div className="content-container">
                <NotificationContainer/>
                <div className="labhome-container">
                    <div className="labhome-sidebar">
                        <div className="labhome-sidebar-title">{this.state.labname}</div>
                        <div className="labhome-sidebar-options">
                            <div className="labhome-sidebar-option">Projects</div>
                            <div className="labhome-sidebar-option">Search</div>
                            <div className="labhome-sidebar-option">Data Standards</div>
                            <div className="labhome-sidebar-option">Lab Actions
                                <Sidebar isLabHome={true} projects={this.state.sidebar_projects_data} updateModalContent={this.updateModalContent}/>
                            </div>
                        </div>
                    </div>
                    <div className="labhome-content">
                        <Modal showModal={this.state.showModal} type={this.state.formDatasetType} modalContent={this.state.modalContent} closeModal={this.closeModal}/>
                        <h3 className="labhome-content-title">Projects</h3>
                        <div className="labhome-projectlist">
                            {this.state.projects}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}




export default LabHome;