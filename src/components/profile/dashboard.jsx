import React from 'react';
import ProjectCard from '../project/project-card';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            individualProjects: []
        }
    }
    componentDidMount() {
        console.log(this.props.location.state.userId, this.props.location.state.username);
        const id = this.props.location.state.userId;
        this.getIndividualProjects(id);
    }
    getIndividualProjects(id) {
        axios.get(`/api/projects.php?userId=${id}`)
            .then(response => {
                console.log(response.data);
                this.setState({
                    individualProjects: response.data, 
                }, ()=>console.log("userid: ", this.state.userId)
                );
                console.log(this.state);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function (response) {
              
            });
    }
    
    render(){
        // console.log('User Status is ', this.props.userStatus);
        // const userUsername = this.props.userStatus.username;
        // const userName = this.props.userStatus.first_name + ' ' + this.props.userStatus.last_name;
        let userProjectCards = this.state.individualProjects.map( (project) => {
            console.log(project.id);
            return <ProjectCard setView={this.props.setView} key={project.id} projectData={project} delete={this.props.delete} userStatus={this.props.userStatus}/>;
        })
        return(
            <div className="container-fluid">
                <div className="row d-flex justify-content-between py-3 mx-2">
                    <h3 className="align-self-center">Projects by {this.props.location.state.username}</h3>
                </div>
                <div className="row d-flex justify-content-between py-3 mb-4 mx-2">
                    <Link to="/create-project">
                    <button className="btn btn-primary">
                         Create New Project
                    </button>
                    </Link>
                </div>
                <div className="row d-flex">
                    {userProjectCards}
                </div>
            </div>
        );
    }
}