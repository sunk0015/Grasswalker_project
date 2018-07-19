/**
 * Created by Sai on 6/19/18.
 */
import React, { Component } from 'react';
import '../../App.css';
import Dataset from '../Dataset/Dataset.js'
class Shared extends Component {
    render (){
        return (
            <div className="container">
                <Dataset/>
            </div>
        )
    }
}

export default Shared;