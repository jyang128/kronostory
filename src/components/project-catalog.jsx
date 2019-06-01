import React from 'react';
import ProjectCard from './project-card';
import HeroPanel from './hero-panel';
import FeaturePanel from './feature-panel';

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
            <React.Fragment>
                <div className="row mb-4 hero-bg">
                    <HeroPanel setView={this.props.setView}/>
                </div>
                <div className="row d-flex">
                    {projectCards}
                </div>
                <div className="row d-flex mb-4 feature-bg py-5">
                    <FeaturePanel/>
                </div>
            </React.Fragment>
        );
    }
}