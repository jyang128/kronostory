import React from 'react';
import axios from 'axios';
import CreateProjectForm from './forms/create-project-form';
import Dashboard from './profile/dashboard';
import Footer from './layout/footer';
import Header from './layout/header';
import ProjectCatalog from './project/project-catalog';
import ProjectDetails from './project/project-details';
import UserLogin from './forms/user-login';
import UserSignup from './forms/user-signup';

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
                this.setState({
                    projects: response.data, 
                    userId: response.data[1].user_id
                }, ()=>console.log("userid: ", this.state.userId)
                );
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
                currentPage = <CreateProjectForm setView={this.setView} userId={this.state.userId} />;
        }

        return(
            <React.Fragment>
            <div className="container-fluid header-bg">
                <Header title="KronoStory" setView={this.setView} />    
            </div>
            {currentPage}
            <Footer setView={this.setView} />
            </React.Fragment>

        );
    }
}