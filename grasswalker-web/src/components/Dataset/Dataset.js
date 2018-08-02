/**
 * Created by Sai on 7/12/18.
 */
import React, { Component } from 'react';
import '../../App.css';
import './Dataset.css';

class Dataset extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return(
            <div className="card" styles="width: 20rem;">
              <div className="card-body">
                <h4 className="card-title">{this.props.name}</h4>
                <p className="card-text">{this.props.description}</p>
                <a href={this.props.link} className="btn btn-primary-gw">Dataset Details</a>
              </div>
            </div>
        )
    }
}

export default Dataset;