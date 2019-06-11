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
import { Route, Switch, withRouter } from 'react-router-dom';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            projects: [],
            userSeshData: {
                id: null,
                username: ''
            }
        }
        this.createNewProject = this.createNewProject.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }
    componentDidMount() {
        this.getProjects();
    }
    getProjects() {
        axios.get(`/api/projects.php`)
            .then(response => {
                console.log("what response:",response);
                this.setState({
                    userSeshData: response.data[0],
                    projects: response.data[1]
                })
            })
            .catch(error => console.error(error))
    }
    loginUser(loginInfo) {
        const submittedEmail = loginInfo.email;
        axios.get(`/api/login.php?email=${submittedEmail}`)
            .then(response => {
                if (response.data[0].id) {
                    this.setState({
                        userSeshData: response.data[0]
                    }, () => {
                        this.props.history.push({
                            pathname: `/${this.state.userSeshData.username}`,
                            state: {
                                userId: this.state.userSeshData.username
                            }
                        });
                    });
                }
            })
            .catch(error => console.error(error))
    }
    loginGuest() {
        axios.get('/api/guest-login.php')
            .then(response => {
                console.log('login guest response.data', response.data[0])
                this.setState({
                    userSeshData: response.data[0],
                }, () => {
                    this.props.history.push({
                        pathname: `/${this.state.userSeshData.username}`,
                        state: {
                            userId: this.state.userSeshData.username
                        }
                    });
                });
            })
            .catch(error => console.error(error))
    }
    logoutHandler(event){
        axios.get(`/api/logout.php`)
            .then(response => {
                this.setState({userSeshData: {
                    id: null,
                    username: ''
                }});
            })
            .catch(error => console.error(error));
        event.target.parentElement.className += " d-none";
    }
    createNewProject(formData){
        axios.post('/api/uploads/create-project.php', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => {
              let newProjects = [...this.state.projects,response.data[0]]
              this.setState({projects: newProjects}, () => {
                this.props.history.push({
                    pathname: `/${this.state.userSeshData.username}`,
                    state: {
                        user: this.state.userSeshData, 
                        userId: this.state.userSeshData.id, 
                        userSession: this.state.userSeshData.id}
                });
            });
          })
          .catch(error => console.error(error))
    }
    render(){
        console.log(this.state.projects);
        return(
            <React.Fragment>
            <div className="container-fluid header">
                <Header title="kronostory" userSeshData={this.state.userSeshData} logoutHandler={this.logoutHandler}/>
            </div>
            <div className="container-fluid">
                <Switch>
                    <Route exact path="/" render={props => 
                        <ProjectCatalog {...props} 
                            projects={this.state.projects}
                        /> 
                    }/>
                    <Route path="/user-login" render={props => 
                        <UserLogin {...props} 
                            loginAxios={loginInfo => this.loginUser(loginInfo)}
                            guestLoginAxios={() => this.loginGuest()} 
                        /> 
                    }/>
                    <Route path="/user-signup" render={props => (
                        <UserSignup {...props}
                            userSeshData={this.state.userSeshData}
                            loginUser={this.loginUser}
                        />
                    )}/>
                    <Route exact path="/:username" render={props => (
                        <Dashboard {...props} 
                            userStatus={this.state.userSeshData}
                            // key={this.props.location.state.userId}
                        />
                    )}/>
                    <Route path="/create-project" render={props => 
                        <CreateProjectForm {...props} 
                            userId={this.state.userSeshData.id} 
                            createNewProject={this.createNewProject}
                        /> 
                    }/>
                    <Route path="/project-details/:id" render={props => (
                        <ProjectDetails {...props}
                            user = {this.state.projects.filter(project =>
                                project.id === parseInt(props.match.params.id, 10)
                                )[0]
                            }  
                        />
                    )}/>
                </Switch>
            </div>
            <div className="container-fluid footer">
                <Footer/>
            </div>
            </React.Fragment>
        );
    }
}

export default withRouter(App);