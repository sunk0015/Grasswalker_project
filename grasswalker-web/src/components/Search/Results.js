/**
 * Created by Sai on 6/27/18.
 */
import React, { Component } from 'react';
import '../../App.css';

class Results extends Component {
    constructor(props){
        super();
        console.log(props.results);
    }

    render (){
        return (
            <div className="container">
                <h1>Results</h1>
                {this.props.results.map((object, i) => <Result obj={object} key={i} />)}
            </div>
        )
    }
}

class Result extends Component{
    constructor(props){
        super();
        console.log(props.obj.title);
    }
    render(){
        return (
        <div className="card">
          <div className="card-header">
            {this.props.obj.title}
          </div>
          <div className="card-body">
            <h4 className="card-title">'Dataset: ' {this.props.obj.title} 'Date: ' {this.props.obj.date}</h4>
            <p className="card-text">'Abstract: ' {this.props.obj.abstract}</p>
          </div>
        </div>
        )
    }
}

export default Results;