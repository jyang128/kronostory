import React from 'react';
import Header from './header';
import ProjectCatalog from './project-catalog';
import ProjectDetails from './project-details';

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
            <div className="container">
                <Header title="Progress Tracker" />
                <ProjectCatalog />
                <ProjectDetails />
            </div>
        );
    }
}