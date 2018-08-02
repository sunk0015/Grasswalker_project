/**
 * Created by Sai on 7/31/18.
 */
import React, { Component } from 'react';
import '../../App.css';
import './Lab.css';
import {
  Link,
} from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class DeleteDatasetForm extends Component{
    constructor(props){
        super(props);
        this.deleteDataset = this.deleteDataset.bind(this);
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
  };

    deleteDataset(event){
        event.preventDefault();
        var token = window.localStorage.getItem('key');
        var auth = 'Token '+token;
        var server = window.localStorage.getItem('server');
        var data= new FormData();
        var id = event.target.dataset.value;
        var select = event.target.dataset;
        var selectedIndex = select.selectedIndex;
        var name = event.target.dataset.options[selectedIndex].text;
        data.append('datasetid',id);
        fetch(server+'/api/datasetlist/delete/',{
            method: 'DELETE',
            headers: {
                'Authorization' : auth
            },
            body: data
        })
        .then(response => {
            if (response.status==204){
                console.log(response);
                this.createNotification('success','Deleted Dataset: '+name,'Success');
                this.props.closeModal();
            }
            else{
                console.log(response);
                this.createNotification('error','Failed to delete Dataset '+name,'Failed');
                this.props.closeModal();
                return;
            }
        });
    }
    render(){
        console.log("DELETE");
        console.log(this.props);
        return(
        <div className={this.props.modalState} tabIndex="-1" role="dialog">
                <NotificationContainer/>
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">{this.props.modalContent.name}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.closeModal}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                        <form onSubmit={this.deleteDataset}>
                      <div className="modal-body">
                            <div className="container">
                                <div className="row">
                                    <label> Dataset: <br/>
                                        <select id="dataset" name="dataset">
                                            {this.props.modalContent.delete_options}
                                        </select>
                                    </label>
                                </div>
                            </div>
                        </div>
                      <div className="modal-footer">
                        <button type="submit" className="btn btn-primary-gw">{this.props.modalContent['buttonLabel']}</button>
                        <button type="button" className="btn btn-secondary-gw" data-dismiss="modal" onClick={this.props.closeModal}>Close</button>
                      </div>
                        </form>
                    </div>
                  </div>
            </div>
    )
    }
}

export default DeleteDatasetForm;
