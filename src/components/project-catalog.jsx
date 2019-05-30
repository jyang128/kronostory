import React from 'react';
import ProjectCard from './project-card';

export default class ProjectCatalog extends React.Component{
    render(){
        
        return(
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
        );
    }
}