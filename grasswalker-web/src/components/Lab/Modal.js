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
import CreateTemplateForm from './CreateTemplate';
import DeleteProjectForm from './DeleteProjectForm';
import DeleteDatasetForm from './DeleteDatasetForm';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Project from './Project';

class Modal extends Component{
    constructor(props){
        super(props);
    }
    render(){
        this.modalState = this.props.showModal ? 'modal showModal modalOverflow':'modal hideModal modalOverflow';
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
        else if(this.props.type=='template'){
            return (
                <CreateTemplateForm modalState={this.modalState} modalContent={this.props.modalContent} projects={this.props.projects} closeModal={this.props.closeModal}/>
            );

        }
        else if(this.props.type=='deleteproject'){

            return(
                <DeleteProjectForm modalState={this.modalState} modalContent={this.props.modalContent} projects={this.props.projects} closeModal={this.props.closeModal} />
            );
        }
        else if(this.props.type=='deletefolder'){

            return(
                <DeleteProjectForm modalState={this.modalState} modalContent={this.props.modalContent} projects={this.props.projects} closeModal={this.props.closeModal} />
            );
        }
        else if(this.props.type=='deletedataset'){

            return(
                <DeleteDatasetForm modalState={this.modalState} modalContent={this.props.modalContent} projects={this.props.projects} closeModal={this.props.closeModal} />
            );
        }
        else{
            return(
                <div></div>
            )
        }
    }

}

export default Modal;