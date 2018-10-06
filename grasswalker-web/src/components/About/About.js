/**
 * Created by Sai on 10/5/18.
 */
import React, { Component } from 'react';
import '../../App.css';
import './About.css';


class About extends Component{


    render(){
        return(
            <div className="about-container">
                <h4 className="about-container-text">Work Together.</h4>
                <p>{"Welcome to Grasswalker. We are a network of research laboratories that make our data available to participating institutions. We accelerate research by giving members access to high quality, well documented data-sets from other luminaries in their field, and ensure that donors of data receive appropriate academic credit for their work."}</p>
                <p>{"We are looking for revolutionaries to help us build the future of research in our invite-only beta."}</p>
                <p>{"If you’d like to join us, send an email to emily.kilen@grasswalker.org."}</p>
            </div>
        )
    }
}

export default About;