import React from 'react';
import ProjectCard from './project-card';
import HeroPanel from './hero-panel';
import FeaturePanel from './feature-panel';

export default class ProjectCatalog extends React.Component{
    render(){
        
        return(
            <React.Fragment>
                <div className="row mb-4 hero-bg">
                    <HeroPanel/>
                </div>
                <div className="row d-flex">
                <div className="col-12 col-sm-4 mb-4">
                    <ProjectCard/>
                </div>
                <div className="col-12 col-sm-4 mb-4">
                    <ProjectCard/>
                </div>
                <div className="col-12 col-sm-4 mb-4">
                    <ProjectCard/>
                </div>
                <div className="col-12 col-sm-4 mb-4">
                    <ProjectCard/>
                </div>
                <div className="col-12 col-sm-4 mb-4">
                    <ProjectCard/>
                </div>
                </div>
                <div className="row d-flex mb-4 feature-bg">
                    <FeaturePanel/>
                </div>
            </React.Fragment>
        );
    }
}