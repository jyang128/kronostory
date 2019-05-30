import React from 'react';
import Header from './header';
import ProjectCatalog from './project-catalog';

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            projects: []
        }
    }

    componentDidMount() {
        this.getProjects();
    }
    

    getProjects() {
        fetch('/api/projects.php')
            .then(res => res.json())
            .then(data => this.setState({ projects: data }, ()=>console.log("work?")));
    }

    render(){
        return(
            <React.Fragment>
            <div className="container-fluid">
                <Header title="Progress Tracker" />    
            </div>
            <div className="container-fluid">
                <ProjectCatalog />
            </div>
            </React.Fragment>

        );
    }
}