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
                name: 'dashboard',
                params: {}
            }
        }
        this.setView = this.setView.bind(this)
    }

    componentDidMount() {
        this.getProjects();
    }
    getProjects() {
        fetch('/api/projects.php')
            .then(res => res.json())
            .then(data => this.setState({ projects: data }, ()=>console.log("work?")));
    }
    setView(name, params) {
        const view = {name, params};
        this.setState({view});
    }
    render(){
        let currentPage;
        const pageName = this.state.view.name;
        switch (pageName) {
            case 'catalog':
                currentPage = <ProjectCatalog setView={this.setView} />;
                break;
            case 'dashboard':
                currentPage = <Dashboard setView={this.setView} />;
                break;
            case 'projectDetails':
                currentPage = <ProjectDetails setView={this.setView} />;
                break;
            case 'createProjectForm':
                currentPage = <CreateProjectForm setView={this.setView} />;
        }

        return(
            <React.Fragment>
            <div className="container-fluid header-bg">
                <Header title="KronoStory" setView={this.setView}/>    
            </div>
            <div className="container-fluid">
                {currentPage}
            </div>
            </React.Fragment>

        );
    }
}