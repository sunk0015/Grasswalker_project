/**
 * Created by Sai on 6/19/18.
 */
import React, { Component } from 'react';
import '../../App.css';
import Results from './Results.js';
class Search extends Component {
    constructor(props){
        super();
        this.state = {showResults:false, numResults:0, results:null};
        this.submitSearch = this.submitSearch.bind(this);
    }

    submitSearch(event){
        event.preventDefault();
        var token = window.localStorage.getItem('key');
        var auth = 'Token '+token;
        fetch('http://localhost:8000/api/datasetlist/',{
            method: 'GET',
            headers: {
                'Authorization' : auth
            }
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            this.setState({showResults: true, numResults:response.length, results:response},function(){
                console.log(this.state);
            });
        });
    }

    render (){
        return (
            <div className="container">
                <h1>Grasswalker</h1> 
              <p className="lead">
                Grasswalker is an effort to collaborate data between academic research labs.
                Try the search feature below!
              </p> 
                <form onSubmit={this.submitSearch}>
                <div className="form-group">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Search for..." /> 
                    <span className="input-group-btn">
                        <button className="btn btn-lg btn-primary">Go!</button> 
                    </span>  
                  </div> 
                </div>
                </form>
                { this.state.showResults ? <Results numResults={this.state.numResults} results={this.state.results}/> : null }
            </div>
        )
    }
}

export default Search;