/**
 * Created by Sai on 7/28/18.
 */

import React, { Component } from 'react';
import '../../App.css';
import './Lab.css';
import {
  Link,
} from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';


class CreateDatasetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {templates:null,showMethodologyTemplate:false,template:null};
    this.createNotification = this.createNotification.bind(this);
    this.createDataset = this.createDataset.bind(this);
    this.changeTemplate = this.changeTemplate.bind(this);
    var token = window.localStorage.getItem('key');
    var auth = 'Token '+token;
    var server = window.localStorage.getItem('server');
    fetch(server+'/api/templatelist/',{
        method: 'GET',
        headers: {
            'Authorization' : auth
        },
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          console.log("templates");
          console.log(response);
            var templates = [];
            for(var i =0;i<response.length;i++){
                templates.push(<option key={response[i].id} value={response[i].id}> {response[i].name} </option>);
                console.log(response[i].id);
            }
            templates.push(<option key={-1} value={-1}>--------</option>)
            this.setState({templates:templates});
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
  };

createDataset(event){
    event.preventDefault();
    var token = window.localStorage.getItem('key');
    var auth = 'Token '+token;
    var server = window.localStorage.getItem('server');
    var data= new FormData();
    var folder =  this.props.modalContent.parentId;
    var title = event.target.datasetTitle.value;
    var abstract = event.target.datasetAbstract.value;
    var methodology = event.target.datasetTitle.value;
    var file = event.target.file.files[0] ;
    data.append('folder',folder);
    data.append('title',title);
    data.append('abstract',abstract);
    data.append('methodology',methodology);
    data.append('file',file);
    fetch(server+'/api/datasetlist/',{
        method: 'POST',
        headers: {
            'Authorization' : auth
        },
        body: data
    })
    .then(response => {
        if (response.status==201){
            response = response.json()
            console.log(response);
            this.createNotification('success','Created Dataset: '+title,'Success');
            this.props.closeModal();
        }
        else{
            console.log(response);
            this.createNotification('error','Dataset '+title+' not created','Failed');
            this.props.closeModal();
            return;
        }
    });
}

changeTemplate(event){
    event.preventDefault();
    var token = window.localStorage.getItem('key');
    var auth = 'Token '+token;
    var server = window.localStorage.getItem('server');
    var templateid = event.target.value;
    fetch(server+'/api/template/'+templateid+'/',{
        method: 'GET',
        headers: {
            'Authorization' : auth
        }
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        this.setState({showMethodologyTemplate:true,template:<TemplateForm templateName={response.name} contentString={response.content}/>});
    });
}

  render() {
        this.methodologyTemplateClass = this.state.showMethodologyTemplate ? "showTemplate" : "hideTemplate";
         return (
        <div className={this.props.modalState} tabIndex="-1" role="dialog">
                <NotificationContainer/>
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">{this.props.modalContent['name']}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.closeModal}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                        <form onSubmit={this.createDataset}>
                      <div className="modal-body">
                            <div className="container">
                                <div className="row">
                                    <label> Parent Folder/Project: <br/>
                                        <b>{this.props.modalContent.parentName}</b>
                                    </label>
                                </div>
                                <div className="row">
                                    <label>Privacy:<br/>
                                        <select>
                                            <option>Public</option>
                                            <option>Private</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="row">
                                    <label> Title: <br/>
                                        <input type="text" name="datasetTitle" defaultValue="Dataset"/>
                                    </label>
                                </div>
                                <div className="row">
                                    <label> Abstract: <br/>
                                        <input type="text" name="datasetAbstract" defaultValue="Abstract"/>
                                    </label>
                                </div>
                                <div className="row">
                                    <label> Methodology: <br/>
                                        <input type="text" name="datasetMethodology" defaultValue="Methodology"/>
                                    </label>
                                </div>
                                <div className="row">
                                    <label> Template (optional): <br/>
                                        <select name="templateid" value={-1} onChange={this.changeTemplate}>
                                            {this.state.templates}
                                        </select>
                                    </label>
                                </div>
                                <div className="row">
                                    <div className={this.methodologyTemplateClass}>
                                        {this.state.template}
                                    </div>
                                </div>
                                <div className="row">
                                    <label> File: <br/>
                                        <input type="file" name="file"/>
                                    </label>
                                </div>
                            </div>
                        </div>
                      <div className="modal-footer">
                        <button type="submit" className="btn btn-primary">{this.props.modalContent['buttonLabel']}</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.closeModal}>Close</button>
                      </div>
                        </form>
                    </div>
                  </div>
            </div>
        );
    }
}

class TemplateForm extends Component{
    constructor(props) {
        super(props);
        var pairs = props.contentString.split(';');
        var fields = [];
        for (var i = 0; i < pairs.length - 1; i++) {
            //less than length-1 because the last element will be an empty string "" the way split works
            var keyval = pairs[i].split(":");
            var key = keyval[0];
            var val = keyval[1];
            var element = <div className="row"><label key={i}>{key}: <br/><input type={"text"} name={"methodology"+key} defaultValue={val}></input></label></div>
            fields.push(element);

        }
        this.state = {fields:fields};
    }
    render(){
        return(
            <div className="container">
                {this.props.templateName}
                {this.state.fields}
            </div>
        )
    }
}

export default CreateDatasetForm;