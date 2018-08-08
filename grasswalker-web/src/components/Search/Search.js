/**
 * Created by Sai on 6/19/18.
 */
import React, { Component } from 'react';
import '../../App.css';
import './Search.css';
import Results from './Results.js';
import {
  Link,
} from 'react-router-dom';

class Search extends Component {
    constructor(props){
        super();
        this.state = {showResults:false, numResults:0, datasets:[],folders:[]};
        this.submitSearch = this.submitSearch.bind(this);
        this.filterTable = this.filterTable.bind(this);
        this.fetchDatasets = this.fetchDatasets.bind(this);
        this.fetchFolders = this.fetchFolders.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.refreshSearchTable = this.refreshSearchTable.bind(this);
    }

    fetchDatasets(query){
        var token = window.localStorage.getItem('key');
        var auth = 'Token '+token;
        var server = window.localStorage.getItem('server');
        return fetch(server+'/api/searchdataset/'+query+"/",{
            method: 'GET',
            headers: {
                'Authorization' : auth
            }
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
    }

    fetchFolders(query){
        var token = window.localStorage.getItem('key');
        var auth = 'Token '+token;
        var server = window.localStorage.getItem('server');
        return fetch(server+'/api/searchfolder/'+query+"/",{
            method: 'GET',
            headers: {
                'Authorization' : auth
            }
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
    }

    fetchData(query){
        return Promise.all([this.fetchDatasets(query),this.fetchFolders(query)]);
    }

    submitSearch(event){
        event.preventDefault();
        var query = event.target.query.value;
        this.fetchData(query).then(([datasets,folders])=>{
            console.log(datasets);
            console.log(folders);
            this.setState({datasets:datasets,folders:folders,showResults:false},()=>{
                console.log("Query: ",query);
                console.log(this.state);
                this.refreshSearchTable();
            });
        });
    }

    refreshSearchTable(){
        this.setState({showResults:false},()=>{
            this.setState({showResults:true},()=>{
                console.log(this.state);
            });
        });
    }

    filterTable(){

    }
    render (){
        return (
            <div className="container">
                <h1>Grasswalker</h1> 
                <div className="row">
                    <p className="lead" styles="align-text:center;">
                    Grasswalker is an effort to collaborate data between academic research labs.
                    Try the search feature below!</p> 
                </div>
                <form onSubmit={this.submitSearch}>
                <div className="form-group">
                    <div className="input-group">
                      <input type="text" name="query" className="form-control" placeholder="Search for..." /> 
                    <span className="input-group-btn">
                        <button className="btn btn-lg btn-primary-gw">Go!</button> 
                    </span>  
                  </div> 
                </div>
                </form>
                { this.state.showResults ? <SearchResultTable datasets={this.state.datasets} folders={this.state.folders} filter={this.filterTable}/> : null }
            </div>
        )
    }
}

class SearchResultTable extends Component{
    constructor(props){
        super(props);
        var dataset_rows = [];
        for(var i=0;i<props.datasets.length;i++){
            console.log(props.datasets[i]);
            dataset_rows.push(<DatasetRow key={i} id={props.datasets[i].id} title={props.datasets[i].title} abstract={props.datasets[i].abstract} folder={null} link={null}></DatasetRow>)
        }
        var folder_rows = [];
        for(var i=0;i<props.folders.length;i++){
            folder_rows.push(<FolderRow key={i} id={props.folders[i].id} name={props.folders[i].name} description={props.folders[i].description} owner={null} link={null}></FolderRow>)
        }
        var searchItems = [];
        searchItems.push(<SearchFilterItem key={0} title={"Data Type"} values={['Datasets','Folders']}/>);
        searchItems.push(<SearchFilterItem key={1} title={"Lab"} values={['Mine','Lab A']}/>);
        this.state = {datasets:dataset_rows,folders:folder_rows,searchItems:searchItems};

    }

    render(){
        return(
            <div className="row">
                <div className="search-sidebar">
                    <SearchFilter searchItems={this.state.searchItems}/>
                </div>
                <div className="search-table">
                    <table className="table">
                      <thead className="thead-dark">
                        <tr>
                            <th className="text-center">Dataset</th>
                            <th className="text-center">Title</th>
                            <th className="text-center">Abstract</th>
                        </tr>
                      </thead>
                      <tbody>
                            {this.state.datasets}
                      </tbody>
                    </table>
                    <table className="table">
                      <thead className="thead-dark">
                        <tr>
                            <th className="text-center">Folder</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.folders}
                      </tbody>
                    </table>
                </div>
            </div>

        )
    }
}

class DatasetRow extends Component{
    constructor(props){
        super(props);
        this.detailDatasetView = "/lab/dataset/"+props.id+"/";
        this.to = {
            'pathname':this.detailDatasetView,
            'state':{
                'datasettitle':this.props.title
            }
        }
    }
    render(){
        return(
            <tr>
              <td className="filterable-cell" scope="col"><Link to={this.to}>{this.props.id}</Link></td>
              <td className="filterable-cell" scope="col">{this.props.title}</td>
              <td className="filterable-cell" scope="col">{this.props.abstract}</td>
            </tr>
        )
    }
}

class FolderRow extends Component{
    constructor(props){
        super(props);
        this.folderHome = "/lab/"+props.id+"/";
        this.to = {
            'pathname':this.folderHome,
            'state':{
                'foldername':this.props.name
            }
        }
    }
    render(){
        return(
            <tr>
              <td className="filterable-cell" scope="col"><Link to={this.to}>{this.props.id}</Link></td>
              <td className="filterable-cell" scope="col">{this.props.name}</td>
              <td className="filterable-cell" scope="col">{this.props.description}</td>
            </tr>
        )
    }
}

class SearchFilter extends Component{
    render(){
        return(
                    <div className="card">
                        <div className="card-group-item">
                            <header className="card-header">
                                <h5 className="title">Filter Results </h5>
                            </header>
                        </div>
                        <form>
                            {this.props.searchItems}
                        </form>
                    </div>
        )
    }
}

class SearchFilterItem extends Component{
    constructor(props){
        super(props);
        console.log(props.title);
        console.log(props);
        var options = []
        for (var i=0;i<props.values.length;i++){
            var val = props.values[i];
            options.push(
                <div key={i} className="search-filter-row">
                    <input type="checkbox" key={i} value={val}></input>
                    <label className="label">{val}</label>
                </div>
            )
        }
        this.state = {options:options};
    }
    render(){
        return(
            <div className="search-filter-item">
                <label>{this.props.title}</label>
                <div>
                    {this.state.options}
                </div>
            </div>
            )
    }
}
export default Search;

