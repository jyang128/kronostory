import React from 'react';
import Header from './header';
import ProjectCatalog from './project-catalog';
import ProjectDetails from './project-details';
import Dashboard from './dashboard';
import CreateProjectForm from './create-project-form';
import axios from 'axios';

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
        axios.get('/api/projects.php')
            .then(function (response) {
                // handle success
                console.log(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }
    render(){
        return(
            <React.Fragment>
            <div className="container-fluid header-bg">
                <Header title="KronoStory" />    
            </div>
            <div className="container-fluid">
                <ProjectCatalog />
                <Dashboard />
                <ProjectDetails />
                <CreateProjectForm/>
            </div>
            </React.Fragment>

        );
    }
}