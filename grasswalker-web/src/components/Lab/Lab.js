/**
 * Created by Sai on 7/19/18.
 */
import React, { Component } from 'react';
import '../../App.css';
import './Lab.css';
import {
  Link,
} from 'react-router-dom';
class Lab extends Component {
    constructor(props){
        super(props);
        var labname = window.localStorage.getItem('labname');
        this.state = {labname:labname,projects:null};
        this.componentDidMount = this.componentDidMount.bind(this);
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
            this.setState({labname:labname,projects:projects},function(){
                console.log(this.state);
            });
        });
    }
    render(){
        return(
            <div className="container">
                <h1>{this.state.labname}</h1>
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-1 sidebar">
                        <ul className="list-group">
                          <li className="list-group-item">
                            <a className="sidebarLink" href="/lab/">Create a new Project!</a>
                            </li>
                          <li className="list-group-item">
                            <a className="sidebarLink" href="/lab/">Upload a new Dataset to a Project!</a>
                            </li>
                          <li className="list-group-item">
                            <a className="sidebarLink" href="/lab/">Delete a Project!</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-5 main">
                        <div className="parent-wrapper">
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

class Project extends Component{
    constructor(props){
        super(props);
        console.log("Project");
        console.log(props.proj);
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