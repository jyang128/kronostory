import React from 'react';
import ProjectCard from '../project/project-card';
import { Link } from 'react-router-dom';

export default class Dashboard extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let userProjectCards = this.props.projects.map( (project) => {
            console.log(project.id);
            return <ProjectCard setView={this.props.setView} key={project.id} projectData={project} delete={this.props.delete} userStatus={this.props.userStatus}/>;
        })
        return(
            <div className="container-fluid">
                <div className="row d-flex justify-content-between py-3 mx-2">
                    <h3 className="align-self-center">Dashboard - Anonymous || Projects by Anonymous</h3>
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