import React from 'react';
import ProjectCard from '../project/project-card';

export default class Dashboard extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    handleNewProject(event) {
        event.preventDefault();
        this.props.setView('createProjectForm', {});
    }
    render(){
        let userProjectCards = this.props.projects.map( (project) => {
            console.log(project.id);
            return <ProjectCard setView={this.props.setView} key={project.id} projectData={project}/>;
        })
        return(
            <React.Fragment>
                <div className="row d-flex justify-content-between py-3 mx-2">
                    <h3 className="align-self-center">Dashboard - Anonymous || Projects by Anonymous</h3>
                </div>
                <div className="row d-flex justify-content-between py-3 mb-4 mx-2">
                    <button 
                        className="btn btn-primary" 
                        onClick={event => this.handleNewProject(event)}
                    >
                        setView('create-project')
                    </button>
                </div>
                <div className="row d-flex">
                    {userProjectCards}
                </div>
            </React.Fragment>
        );
    }
}