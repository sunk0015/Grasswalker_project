/**
 * Created by Sai on 6/19/18.
 */
import React, { Component } from 'react';
import '../../App.css';

class Upload extends Component {
handleChangeFile(event) {
  const file = event.target.files[0];
  let formData = new FormData();
  formData.append('file', file);
  //Make a request to server and send formData
}

    render (){
        return (
            <div className="jumbotron">
                <input type="file" onChange={this.handleChangeFile.bind(this)}></input>
            </div>
        )
    }
}

export default Upload;