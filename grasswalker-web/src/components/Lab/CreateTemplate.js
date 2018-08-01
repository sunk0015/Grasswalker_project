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

class CreateTemplateForm extends Component{
    constructor(props) {
        super(props);
        this.addField = this.addField.bind(this);
        this.deleteField = this.deleteField.bind(this);
        this.createTemplate = this.createTemplate.bind(this);
        this.state = {fieldCount:0,fieldId:0,fields:[]};
        this.createNotification = this.createNotification.bind(this);
        console.log("initial state");
        console.log(this.state);
    }

    addField(){
        this.setState((prevState, props) => ({
            fields:[...this.state.fields,<KeyValuePair key={prevState.fieldId} id={prevState.fieldId}/>],
            fieldCount: prevState.fieldCount + 1,
            fieldId: prevState.fieldId+1
        }),()=>{
            //callback on update
            console.log("Added a field");
            console.log(this.state);
        });
    }
    deleteField(){
        var update_fields = this.state.fields;
        var update_fieldCount = this.state.fieldCount-1;
        console.log("delete called");
        console.log(update_fields);
        update_fields.splice(-1,1);
        console.log(update_fields);
        this.setState({field:update_fields,fi:update_fieldCount},()=>{
            console.log("Finished deleteing field");
            console.log(this.state);
        })
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

    createTemplate(event){
        event.preventDefault();
        var elements = event.target.elements;
        var fieldCount = this.state.fieldCount;
        var contentString = "";
        for(var i=1;i<elements.length-1;i+=2){
            if(elements[i].type=="text"){
                console.log("Template");
                console.log(elements[i].value);
                contentString+=elements[i].value;
                console.log(elements[i+1].value);
                contentString+=":"+elements[i+1].value+";";
            }
        }
        console.log(contentString);
        var token = window.localStorage.getItem('key');
        var auth = 'Token '+token;
        var server = window.localStorage.getItem('server');
        var data= new FormData();
        var name = event.target.templatename.value;
        data.append('name',name);
        data.append('content',contentString);
        fetch(server+'/api/templatelist/',{
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
                this.createNotification('success','Created Template: '+name,'Success');
                this.props.closeModal();
            }
            else{
                console.log(response);
                this.createNotification('error','Template '+name+' not created','Failed');
                this.props.closeModal();
                return;
            }
        });
    }

    render(){
        console.log(this.state.fieldCount);
        this.deleteButtonStatus = this.state.fieldCount < 1?  "hideDeleteButton btn btn-primary":"btn btn-primary";
        console.log(this.deleteButtonStatus);
        return(
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
                        <form onSubmit={this.createTemplate}>
                      <div className="modal-body">
                        <div className="container">
                            <div className="row">
                                <label> Template Name: <br/>
                                    <input type="text" name="templatename" defaultValue="Name"/>
                                </label>
                            </div>
                            {this.state.fields}
                            <div className="row">
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addField}>+Field</button>
                                <button type="button" className={this.deleteButtonStatus} data-dismiss="modal" onClick={this.deleteField}>-Field</button>
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
    )
    }
}

class KeyValuePair extends Component{
    constructor(props){
        super(props);
        this.fieldname = "field"+this.props.id
        this.fieldvalue = "value"+this.props.id
    }
    render(){
        return(
                <div key={this.key} id={this.props.id} className="row">
                    <label> Field: <br/>
                        <input type="text" name={this.fieldname} defaultValue="Name"/>
                        <input type="text" name={this.fieldvalue} defaultValue="Default Value"/>
                    </label>
                </div>
        )
    }
}

export default CreateTemplateForm;