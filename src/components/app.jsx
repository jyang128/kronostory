import React from 'react';
import Header from './header';
import ProjectCatalog from './project-catalog';
import ProjectDetails from './project-details';
import Dashboard from './dashboard';

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
            <div className="container-fluid header-bg">
                <Header title="Progress Tracker" />    
            </div>
            <div>
                <ProjectCatalog />
                <Dashboard />
                <ProjectDetails />
            </div>
            </React.Fragment>

        );
    }
}