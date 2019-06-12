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
            },
            emailFormat:"",
            emailEmpty:"",
            passwordEmpty:""
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
                this.setState({
                    userSeshData: response.data[0],
                    projects: response.data[1]
                })
            })
            .catch(error => console.error(error))
    }
    loginUser(loginInfo) {
        const submittedEmail = loginInfo.email;
        const submittedPassword = loginInfo.password;
        this.setState({
            emailFormat:"",
            emailEmpty:"",
            passwordEmpty:""
        });
        axios.get(`/api/login.php?email=${submittedEmail}&password=${submittedPassword}`)
            .then(response => {
                if(typeof response.data === "string"){
                    if(response.data.includes("invalid")){
                        console.log("its a string.");
                        this.setState({emailFormat:"The email is invalid"});
                    }
                    if(response.data.includes("#email")){
                        this.setState({emailEmpty:"You must enter an email"});
                    }
                    if(response.data.includes("#password")){
                        this.setState({passwordEmpty:"You must enter a password"});
                    }
                }
                else{
                    if (response.data[0].id) {
                        this.setState({
                            userSeshData: response.data[0]
                        }, () => {
                            this.props.history.push({
                                pathname: `/${this.state.userSeshData.username}`
                            });
                        });
                    }
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
                        pathname: `/${this.state.userSeshData.username}`
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
                });
            });
          })
          .catch(error => console.error(error))
    }
    render(){
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
                            emailFormat={this.state.emailFormat}
                            emailEmpty={this.state.emailEmpty}
                            passwordEmpty={this.state.passwordEmpty}
                        />
                    }/>
                    <Route path="/user-signup" render={props => (
                        <UserSignup {...props}
                            userSeshData={this.state.userSeshData}
                            loginUser={this.loginUser}
                        />
                    )}/>
                    <Route path="/create-project" render={props =>
                        <CreateProjectForm {...props}
                            userId={this.state.userSeshData.id}
                            createNewProject={this.createNewProject}
                        />
                    }/>
                    <Route exact path="/:username" render={props => (
                        <Dashboard {...props}
                            userStatus={this.state.userSeshData}
                        />
                    )}/>
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
