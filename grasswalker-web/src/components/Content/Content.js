/**
 * Created by Sai on 6/19/18.
 */

import React, { Component } from 'react';
import '../../App.css';

class Content extends Component {

  render() {
    return (
      <div className="content">
        <div className="container">
          <h1> Grasswalker </h1>
          <p className="lead">
            Grasswalker is an effort to collaborate data between academic
            research labs. Try the search feature below!
          </p>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for..."
            />
            <span className="input-group-btn">
              <button className="btn btn-lg btn-primary">Go!</button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;