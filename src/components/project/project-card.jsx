import React from 'react';
import './project.css';
import { Link } from 'react-router-dom';

export default class ProjectCard extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="col-12 col-sm-4 mb-4" >
                <div className="card">
                <img className="card-img-top" src={this.props.projectData.primary_image} alt="project card"/>
                <div className="card-body">
                <h5 className="card-title">{this.props.projectData.title}</h5>
                <p className="card-text">{this.props.projectData.description}</p>
                <Link to={`project-details/${this.props.projectData.id}`}>
                    <button className="btn btn-primary">
                        Go To Project
                    </button>
                </Link>
                <div className="dots">...</div>
                </div>
                </div>
            </div>
        );
    }
}