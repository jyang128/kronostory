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
            user: null
        }
        this.delete = this.delete.bind(this);
    }
    componentDidMount() {
        this.getProjects();
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
                    this.setState({user: response.data[0]}, () => {
                        this.props.history.push('/dashboard');
                    });
                }
            })
            .catch( error => console.error(error))
            .finally( response => console.log('inside .finally login ', response))
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
    render(){
        return(
            <React.Fragment>
            <div className="container-fluid header">
                <Header title="KronoStory" setView={this.setView} currentUser={this.state.user} />
            </div>
            <div className="container-fluid">
                <Switch>
                    <Route exact path="/" render={props => <ProjectCatalog {...props} projects={this.state.projects}/> }/>
                    <Route path="/user-login" render={props => <UserLogin {...props} loginAxios={loginInfo => this.loginUser(loginInfo)} /> } />
                    <Route path="/user-signup" component={UserSignup}/>
                    <Route path="/dashboard" render={props => <Dashboard {...props} projects={this.state.projects} delete={this.delete} userStatus={this.state.user}/> }/>
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
                    <Route path="/create-project" render={props => <CreateProjectForm {...props} userId={this.state.userId}/> }/>
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