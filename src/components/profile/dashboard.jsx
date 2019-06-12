import React from 'react';
import ProjectCard from '../project/project-card';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            individualProjects: [],
            userSeshData: {
                id: null,
                username: ''
            },
            loading: false,
            userMatch: false
        }
    }
    componentDidMount() {
        const username = this.props.match.params.username;
        this.getIndividualProjects(username);
    }
    componentDidUpdate(prevProps) {
        if(prevProps.match.params.username !== this.props.match.params.username){
            this.getIndividualProjects(this.props.match.params.username);
        }
    }
    delete(id){
        axios.patch('/api/delete.php',{"id":id})
            .then( () => {
                let newProjects = this.state.individualProjects.slice(0);
                for(let i = 0; i < newProjects.length; i++){
                    if(newProjects[i].id === id){
                        newProjects.splice(i,1);
                        break;
                    }
                }
                this.setState({ individualProjects: newProjects });
            })
            .catch(error => console.error(error))
    }
    getIndividualProjects(username) {
        this.setState({loading: true}, ()=>{
            axios.get(`/api/projects.php?username=${username}`)
            .then(response => {
                this.setState({
                    userSeshData: response.data[0],
                    individualProjects: response.data[1],
                    userMatch: response.data[2].userMatch
                })
            })
            .catch(error => console.error(error))
            .finally(()=>{
                this.setState({loading: false});
            })
        })
    }
    render(){
        let userProjectCards = this.state.individualProjects.map( (project) => {
            return <ProjectCard 
                key={project.id} 
                projectData={project} 
                delete={id => this.delete(id)} 
                userStatus={this.state.userSeshData}
            />;
        })
        let createProjectButton;
        if(this.state.userMatch){
            createProjectButton = <div className="row d-flex justify-content-between py-3 mb-4 mx-2">
                <Link to="/create-project">
                    <button className="btn btn-primary">
                        Create New Project
                    </button>
                </Link>
            </div>
        } else {
            createProjectButton = null;
        }
        let loader = null;
        if (this.state.loading) {
            loader = <div className="loader"><img className="loading-icon" src="/images/loader.svg" /></div>
        }
        return(
            <div className="container-fluid">
                <div className="row d-flex justify-content-between py-3 mx-2">
                    <h3 className="align-self-center">
                        {this.state.individualProjects.length > 0 ? 
                            `Projects by ${this.state.individualProjects[0].username}`
                            : "No projects yet!"}
                    </h3>
                </div>
                {createProjectButton}
                <div className="row d-flex">
                    {userProjectCards}
                </div>
                {loader}
            </div>
        );
    }
}
