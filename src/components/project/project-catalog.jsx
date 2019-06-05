import React from 'react';
import ProjectCard from './project-card';
import HeroPanel from '../layout/hero-panel';
import FeaturePanel from '../layout/feature-panel';
import './project.css';

export default class ProjectCatalog extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let projectCards = this.props.projects.map( (project) => {
            console.log(project.id);
            return <ProjectCard setView={this.props.setView} key={project.id} projectData={project}/>;
        })
        return(
            <div className="container-fluid">
                <div className="row mb-4 hero-bg">
                    <HeroPanel setView={this.props.setView}/>
                </div>
                <div className="row d-flex">
                    {projectCards}
                </div>
                <div className="row d-flex mb-4 feature-bg py-5">
                    <FeaturePanel/>
                </div>
            </div>
        );
    }
}