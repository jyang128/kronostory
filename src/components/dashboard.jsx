import React from 'react';
import ProjectCard from './project-card';

export default class Dashboard extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <React.Fragment>
                <div className="row d-flex justify-content-between py-3 mx-2">
                    <h3 className="align-self-center">Dashboard - Anonymous || Projects by Anonymous</h3>
                </div>
                <div className="row d-flex justify-content-between py-3 mb-4 mx-2">
                    <button className="btn btn-primary">setView('create-project')</button>
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
                </div>
            </React.Fragment>
        );
    }
}