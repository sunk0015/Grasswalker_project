/**
 * Created by Sai on 8/30/18.
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

class GenericModal extends Component{
    constructor(props){
        super(props);
    }
    render(){
        this.modalState = this.props.showModal ? 'modal showModal modalOverflow':'modal hideModal modalOverflow';
        return(
            <div className={this.modalState}>
                <NotificationContainer/>
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">{this.props.modalContent['name']}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.closeModal}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                        <div className="generic-modal-content">
                            <select className="selectpicker">
                              <option>Upload Dataset(s)</option>
                              <option>Create Folder(s)</option>

                            </select>

                        </div>
                        <div className="modal-footer">
                        </div>
                    </div>
                  </div>
            </div>
        )
    }

}

export default GenericModal;