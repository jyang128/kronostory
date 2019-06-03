import React from 'react';
import axios from 'axios';
import CreateProjectForm from './create-project-form';
import Dashboard from './dashboard';
import Footer from './footer';
import Header from './header';
import ProjectCatalog from './project-catalog';
import ProjectDetails from './project-details';
import UserLogin from './user-login';
import UserSignup from './user-signup';

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            projects: [],
            view: {
                name: 'userSignup',
                params: {}
            }
        }
        this.setView = this.setView.bind(this)
    }

    componentDidMount() {
        this.getProjects();
    }
    getProjects() {
        axios.get('/api/projects.php')
            .then(response => {
                // handle success
                console.log(response.data);
                this.setState({projects: response.data});
                console.log(this.state);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function (response) {
              
            });
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
                currentPage = <ProjectCatalog setView={this.setView} projects={this.state.projects}/>;
                break;
            case 'userLogin':
                currentPage = <UserLogin setView={this.setView} />;
                break;
            case 'userSignup':
                currentPage = <UserSignup setView={this.setView} />;
                break;
            case 'dashboard':
                currentPage = <Dashboard setView={this.setView} projects={this.state.projects} />;
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
                <Header title="KronoStory" setView={this.setView} />    
            </div>
            <div className="container-fluid">
                {currentPage}
                <Footer setView={this.setView} />
            </div>
            </React.Fragment>

        );
    }
}