import React from 'react';
import Header from './components/header.jsx';
import ProjectCatalog from './components/project-catalog.jsx';

export default class App extends React.Component{
    constructor(props){
        super(props);
        
    }
    render(){
        return(
            <div className="container">
                <Header title="Progress Tracker"/>
                <ProjectCatalog/>
            </div>
        );
    }
}