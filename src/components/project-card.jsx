import React from 'react';

export default class ProjectCard extends React.Component{
    handleProjectClick(event) {
        event.preventDefault();
        this.props.setView('projectDetails', {});
    }
    render(){
        return(
            <div className="col-12 col-sm-4 mb-4" >
                <div className="card">
                <img className="card-img-top" src={this.props.projectData.primary_image} alt="project card"/>
                <div className="card-body">
                <h5 className="card-title">{this.props.projectData.title}</h5>
                <p className="card-text">{this.props.projectData.description}</p>
                <button 
                    className="btn btn-primary" 
                    onClick={event => this.handleProjectClick(event)}
                >
                    setView('project-details')
                </button>
                <div className="dots">...</div>
                </div>
                </div>
            </div>
        );
    }
}