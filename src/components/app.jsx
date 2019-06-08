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
        this.delete = this.delete.bind(this);
        this.createNewProject = this.createNewProject.bind(this);
    }
    componentDidMount() {
        this.getProjects();
    }
    getProjects() {
        axios.get(`/api/projects.php`)
            .then(response => {
                // handle success
                this.setState({
                    // this is an object with key sessionid and a string number
                    // in backend, this value come from $_SESSION['userId']
                    userSeshData: response.data[0],
                    projects: response.data[1]
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function (response) {
              
            });
    }
    delete(id){
        axios.patch('/api/delete.php',{"id":id})
            .then(response => {
                let newProjects = this.state.projects.slice(0);
                for(let i = 0; i < newProjects.length; i++){
                    if(newProjects[i].id === id){
                        newProjects.splice(i,1);
                        break;
                    }
                }
                this.setState({projects:newProjects});
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function (response) {
              
            });
    }
    loginUser(loginInfo) {
        const submittedEmail = loginInfo.email;
        axios.get(`/api/login.php?email=${submittedEmail}`)
            .then(response => {
                if (response.data[0].id) {
                    this.setState({
                        userSeshData: response.data[0]
                    }, () => {
                        //  {id: "2", first_name: "Pug", last_name: "Man", username: "pugman100", 
                        //  password: "pass", …} {sessionid: "2"}
                        this.props.history.push({
                            pathname: '/dashboard',
                            search: `?user=${this.state.userSeshData.id}`,
                            state: {
                                user: this.state.userSeshData, 
                                userId: this.state.userSeshData.id, 
                                userSession: this.state.userSeshData.id}
                        });
                    });
                }
            })
            .catch( error => console.error(error))
            .finally( () => {})
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
                    pathname: '/dashboard',
                    search: `?user=${this.state.userSeshData.id}`,
                    state: {
                        user: this.state.userSeshData, 
                        userId: this.state.userSeshData.id, 
                        userSession: this.state.userSeshData.id}
                });
            });
          })
          .catch(function (error) {
              console.error(error);
          });
    }
    render(){
        return(
            <React.Fragment>
            <div className="container-fluid header">
                <Header title="KronoStory" userSeshData={this.state.userSeshData}/>
            </div>
            <div className="container-fluid">
                <Switch>
                    <Route exact path="/" render={props => <ProjectCatalog {...props} projects={this.state.projects}/> }/>
                    <Route path="/user-login" render={props => <UserLogin {...props} loginAxios={loginInfo => this.loginUser(loginInfo)} /> } />
                    <Route path="/user-signup" component={UserSignup}/>
                    <Route path="/dashboard" render={props => (
                        <Dashboard {...props} 
                            delete={this.delete} 
                            userStatus={this.state.userSeshData}
                        />
                        )
                    }/>
                    <Route 
                        path="/project-details/:id"
                        render={props => (
                            <ProjectDetails 
                                user = {this.state.projects.filter(project =>
                                    project.id === parseInt(props.match.params.id, 10)
                                    )[0]
                                }
                                {...props}
                            />) }
                    />
                    <Route path="/create-project" render={props => <CreateProjectForm {...props} userId={this.state.userSeshData.id} createNewProject={this.createNewProject}/> }/>
                </Switch>
            </div>
            <div className="container-fluid footer">
                <Footer setView={this.setView} />
            </div>
            </React.Fragment>
        );
    }
}

export default withRouter(App);