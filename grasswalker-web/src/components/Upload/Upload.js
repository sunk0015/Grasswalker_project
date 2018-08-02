/**
 * Created by Sai on 6/19/18.
 */
import React, { Component } from 'react';
import '../../App.css';
import './Upload.css';

class Upload extends Component {
    constructor(props){
        super(props);
        this.state = {
            showNewDataset:false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.redner = this.render.bind(this);
    }

    onSubmit(event){
        event.preventDefault();
        this.setState({showNewDataset:true},function(){
            this.forceUpdate(function(){
                alert(event.persist());
            });
        });
    }
    render(){
        if(this.state.showNewDataset){
            return(
                <div className="container">
                    <h1>Upload a Dataset</h1> 
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 leftdiv">
                                <ExistingProject onSubmit={this.onSubmit}/>
                            </div>
                            <div className="col-md-6 rightdiv">
                                <NewProject onSubmit={this.onSubmit}/>
                            </div>
                        </div>
                        <div className="row">
                            <NewDataset project="Laba"/>
                        </div>
                    </div>
                </div>

            )
        }
        else{
            return(
                <div className="container">
                    <h1>Upload a Dataset</h1> 
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 leftdiv">
                                <ExistingProject onSubmit={this.onSubmit}/>
                            </div>
                            <div className="col-md-6 rightdiv">
                                <NewProject onSubmit={this.onSubmit}/>
                            </div>
                        </div>
                    </div>
                </div>

            )
        }

    }
}

class UploadFile extends Component {
        handleChangeFile(event) {
      const file = event.target.files[0];
      let formData = new FormData();
      formData.append('file', file);
      //Make a request to server and send formData
    }

    render (){
        return (
            <div className="jumbotron">
                <input type="file" onSubmit={this.handleChangeFile.bind(this)}></input>
            </div>
        )
    }
}


class ExistingProject extends Component {
    constructor(props){
        super(props);
        this.state = {projects:[],selectedOption:null}
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){
        var token = window.localStorage.getItem('key');
        var auth = 'Token '+token;
        var server = window.localStorage.getItem('server');
        fetch(server+'/api/folderlist/',{
            method: 'GET',
            headers: {
                'Authorization' : auth
            }
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log(response);
            var folders = [];
            for(var i =0;i<response.length;i++){
                folders.push(<option key={response[i].id} value={response[i].name}> {response[i].name} </option>);
            }
            this.setState({projects:folders},function(){
                console.log(this.state.projects);
            });
        });
    }

    render (){
        return (
                <div className="container" >
                    <p>Choose an existing project!</p>
                    <br/>
                    <form onSubmit={this.props.onSubmit}>
                    <div className="container">
                        <div className="row">
                            <select name="projectname">
                                {this.state.projects}
                            </select>
                        </div>
                        <div className="row">
                            <input type="submit" className="btn btn-primary-gw" value="Choose Project"/>
                        </div>
                    </div>
                    </form>
                </div>
        )
    }
}

class NewProject extends Component {
    constructor(props){
        super(props);
        this.state = {owners: [],name:'Project name',description:'Brief description'}
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount(){
        var token = window.localStorage.getItem('key');
        var auth = 'Token '+token;
        var server = window.localStorage.getItem('server');
        fetch(server+'/api/userlist/',{
            method: 'GET',
            headers: {
                'Authorization' : auth
            }
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log(response);
        });
    }

    render (){
        return (
            <div className="container">
                <p>Create a NEW project for your dataset!</p>
                <form onSubmit={this.props.onSubmit}>
                    <div className="container">
                        <div className="row">
                            <label> Name: <br/>
                                <input type="text" name="projectname" defaultValue={this.state.name}/>
                            </label>
                        </div>
                        <div className="row">
                            <label> Description: <br/>
                                <input type="text" name="projectdescription" defaultValue={this.state.description}/>
                            </label>
                        </div>
                        <div className="row">
                            <input type="submit" className="btn btn-primary-gw" value="Submit"/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

class NewDataset extends Component{
    constructor(props){
        super(props);
    }
    render (){
        return (
            <div className="newDataset">
                <div className="container">
                    <h3>Create your dataset in the project: {this.props.project}</h3>
                </div>
            </div>
        )
    }
}

export default Upload;