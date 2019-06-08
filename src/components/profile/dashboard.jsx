import React from 'react';
import ProjectCard from '../project/project-card';
import axios from 'axios';
import './profile.css';
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
            loading: false
        }
    }
    componentDidMount() {
        const id = this.props.location.state.userId;
        this.getIndividualProjects(id);
    }
    getIndividualProjects(id) {
        // before - loading screen
        this.setState({loading: true}, ()=>{
            axios.get(`/api/projects.php?userId=${id}`)
            .then(response => {
                this.setState({
                    userSeshData: response.data[0],
                    individualProjects: response.data[1]
                })
            })
            .catch(function (error) {
                console.error(error);
            })
            .finally(()=>{
                this.setState({loading: false});
            })
        })
    }
    render(){
        console.log(this.state.loading);
        let userProjectCards = this.state.individualProjects.map( (project) => {
            return <ProjectCard 
                key={project.id} 
                projectData={project} 
                delete={this.props.delete} 
            />;
        })
        let createProjectButton;
        if(this.state.userSeshData.id == this.props.location.state.userId){
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
                            : "This user has not posted any projects yet!"}
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
