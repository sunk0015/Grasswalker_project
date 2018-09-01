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
import DropboxChooser from 'react-dropbox-chooser';
import fileDownload from 'js-file-download';
import Dropzone from 'react-dropzone';


class CreateDatasetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        templates:null,
        showMethodologyTemplate:false,
        template:null,
        chosenFiles:[],
        chosenFileNames:[],
        showContent:"container show-div",
        showFileUpload:"container hide-div",
        dropzoneShow:"row show-div",
        dropboxShow:"row hide-div",
        filesShow:"row show-div",
    };
    this.createNotification = this.createNotification.bind(this);
    this.createDataset = this.createDataset.bind(this);
    this.createMultipleDatasets = this.createMultipleDatasets.bind(this);
    this.changeTemplate = this.changeTemplate.bind(this);
    this.dropboxSuccess = this.dropboxSuccess.bind(this);
    this.dropboxCancel = this.dropboxCancel.bind(this);
    this.dropzoneOnDrop = this.dropzoneOnDrop.bind(this);
    this.fileUploadChange = this.fileUploadChange.bind(this);
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
            var templates = [];
            for(var i =0;i<response.length;i++){
                templates.push(<option key={response[i].id} value={response[i].id}> {response[i].name} </option>);
            }
            templates.push(<option key={-1} value={-1}>--------</option>)
            this.setState({templates:templates});
        });
  }

    createNotification = (type,msg,title) => {
        if(type=='success'){
            return NotificationManager.success(msg,title);
        }
        else{
            return NotificationManager.error(msg,title);
        }
    }

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
                this.createNotification('success','Created Dataset: '+title,'Success');
                this.props.closeModal();
            }
            else{
                this.createNotification('error','Dataset '+title+' not created','Failed');
                this.props.closeModal();
                return;
            }
        });
    }

    createMultipleDatasets(event){
        event.preventDefault();
        var token = window.localStorage.getItem('key');
        var auth = 'Token '+token;
        var server = window.localStorage.getItem('server');
        var files = this.state.chosenFiles;
        var datasets = [];
        var useFileName = event.target.datasetTitle.value==""? true:false;
        var folder =  this.props.modalContent.parentId;
        var abstract = event.target.datasetAbstract.value;
        var methodology = event.target.datasetMethodology.value;
        console.log(files);
        files.forEach(file => {
            var title = "";
            if(useFileName){
                title= file.name;
            }
            else{
               title = event.target.datasetTitle.value;
            }
            var dataset = new FormData();
            dataset.append('folder',folder);
            dataset.append('title',title);
            dataset.append('abstract',abstract);
            dataset.append('methodology',methodology);
            dataset.append('file',file);
            fetch(server+'/api/datasetlist/',{
                method: 'POST',
                headers: {
                    'Authorization' : auth,
                },
                body: dataset
            })
            .then(response => {
                if (response.status==201){
                    response = response.json()
                    this.createNotification('success','Created Dataset: '+title,'Success');
                    this.props.closeModal();
                }
                else{
                    this.createNotification('error','Dataset '+title+' not created','Failed');
                    this.props.closeModal();
                    return;
                }
            });
        });
        console.log(datasets);

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

    dropboxSuccess(files){

        var addedFiles = [];
        var addedNames = [];
        files.forEach(file =>{
            addedNames.push(file.name);
            console.log(file);
            fetch(file.link)
            .then(response =>response.blob())
            .then(blob => {
                var fileBlob = new File([blob], file.name, {type: "text/json;charset=utf-8"});
                console.log(fileBlob);
                this.setState(
                    { chosenFiles: [...this.state.chosenFiles, fileBlob],
                        chosenFileNames:[...this.state.chosenFileNames, file.name]
                    }
                );
            });
        });

    }

    dropboxCancel(event){
        console.log(event);
    }

    dropzoneOnDrop(files){
        var addedFiles = [];
        var addedNames = [];
        files.forEach(file =>{
            addedFiles.push(file);
            console.log(file);
            addedNames.push(file.name);
        });


        this.setState(
            { chosenFiles: [...this.state.chosenFiles, ...addedFiles ],
                chosenFileNames:[...this.state.chosenFileNames, ...addedNames]
            }
        );

    }


    fileUploadChange(event){
        if(event.target.value=="dropbox"){
            this.setState({chosenFiles:[], chosenFileNames:[], dropzoneShow:"row hide-div", dropboxShow:"row show-div",});
        }
        else{
            this.setState({chosenFiles:[], chosenFileNames:[], dropzoneShow:"row show-div", dropboxShow:"row hide-div",});
        }
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
                        <form onSubmit={this.createMultipleDatasets}>
                      <div className="modal-body">
                            <div className="container">
                                <div className="container">
                                    <div className="row">
                                        <label> Parent Folder/Project: <br/>
                                            <b>{this.props.modalContent.parentName}</b>
                                        </label>
                                    </div>
                                    <div className="row">
                                        <label>Upload Type: <br/>
                                            <select id="fileuploadtype" onChange={this.fileUploadChange}>
                                                <option value="dnd">Drag and Drop</option>
                                                <option value="dropbox">Dropbox</option>
                                            </select>
                                        </label>
                                    </div>
                                </div>
                                <div className={this.state.showContent}>
                                    <label>Meta Data</label>
                                    <div className="row">
                                        <label>Privacy:<br/>
                                            <select>
                                                <option>Public</option>
                                                <option>Private</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className="row">
                                        <label> Title: (file name wil be used if left blank) <br/>
                                            <input type="text" name="datasetTitle" defaultValue=""/>
                                        </label>
                                    </div>
                                    <div className="row">
                                        <label> Abstract: <br/>
                                            <input type="text" name="datasetAbstract" defaultValue=""/>
                                        </label>
                                    </div>
                                    <div className="row">
                                        <label> Methodology: <br/>
                                            <input type="text" name="datasetMethodology" defaultValue=""/>
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
                                </div>
                                <div className="dataset-fileupload">
                                    <label>File Upload
                                    <div className={this.state.dropzoneShow}>
                                            <div className="row">
                                                <Dropzone onDrop={this.dropzoneOnDrop}>Drag and drop files here.</Dropzone>
                                            </div>
                                    </div>
                                    <div className={this.state.dropboxShow}>
                                            <div className="row">
                                                <DropboxChooser
                                                    appKey={'kwaxy35eb83eo4i'}
                                                    success={files => this.dropboxSuccess(files)}
                                                    cancel={() => this.dropboxCancel()}
                                                    multiselect={true}
                                                    extensions={['.csv']}
                                                    linkType="direct" >
                                                    <div className="dropbox-dropin-btn dropbox-dropin-default">
                                                        <span className="dropin-btn-status"></span>Choose from Dropbox
                                                    </div>
                                                </DropboxChooser>
                                            </div>
                                    </div>
                                    </label>
                                </div>
                                <div className="row">
                                    <label>Files: {this.state.chosenFileNames}</label>
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
