import React from 'react';
import Header from './header';
import ProjectCatalog from './project-catalog';
import ProjectDetails from './project-details';
import Dashboard from './dashboard';
import CreateProjectForm from './create-project-form';

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            projects: [],
            view: {
                name: 'createProjectForm',
                params: {}
            }
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
        let currentPage;
        const pageName = this.state.view.name;
        switch (pageName) {
            case 'catalog':
                currentPage = <ProjectCatalog />;
                break;
            case 'dashboard':
                currentPage = <Dashboard />;
                break;
            case 'projectDetails':
                currentPage = <ProjectDetails />;
                break;
            case 'createProjectForm':
                currentPage = <CreateProjectForm />;
        }

        return(
            <React.Fragment>
            <div className="container-fluid header-bg">
                <Header title="KronoStory" />    
            </div>
            <div className="container-fluid">
                {/* <ProjectCatalog />
                <Dashboard />
                <ProjectDetails />
                <CreateProjectForm/> */}
                {currentPage}
            </div>
            </React.Fragment>

        );
    }
}