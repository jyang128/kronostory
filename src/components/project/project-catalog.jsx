import React from 'react';
import ProjectCard from './project-card';
import HeroPanel from '../layout/hero-panel';
import Slider from "react-slick";
import './project.css';

export default class ProjectCatalog extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            sort: 'all'
        }
        this.sortProjects = this.sortProjects.bind(this);
    }

    sortProjects(e) {
        document.querySelector(".sort-link.active").classList.remove("active");
        let sortCategory = e.target.id;
        e.target.className += " active";
        this.setState({sort: sortCategory });
    }

    render(){

        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 7,
            slidesToScroll: 2,
            initialSlide: 0,
            responsive: [
              {
                breakpoint: 815,
                settings: {
                  slidesToShow: 4,
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 3
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
              }
            ]
        };

        let projectCards;

        switch(this.state.sort) {
            case 'all':
                projectCards = this.props.projects.map( (project) => {
                    return <ProjectCard setView={this.props.setView} key={project.id} projectData={project}/>;
                });
                break;
            case 'art':
                projectCards = this.props.projects.map( (project) => {
                    if (project.category==="art") {
                        return <ProjectCard setView={this.props.setView} key={project.id} projectData={project}/>;
                    }
                });
                break;
            case 'gardening':
                projectCards = this.props.projects.map( (project) => {
                    if (project.category==="gardening") {
                        return <ProjectCard setView={this.props.setView} key={project.id} projectData={project}/>;
                    }
                });
                break;
            case 'technology':
                projectCards = this.props.projects.map( (project) => {
                    if (project.category==="technology") {
                        return <ProjectCard setView={this.props.setView} key={project.id} projectData={project}/>;
                    }
                });
                break;
            case 'crafting':
                projectCards = this.props.projects.map( (project) => {
                    if (project.category==="crafting") {
                        return <ProjectCard setView={this.props.setView} key={project.id} projectData={project}/>;
                    }
                });
                break;
            case 'health':
                projectCards = this.props.projects.map( (project) => {
                    if (project.category==="health") {
                        return <ProjectCard setView={this.props.setView} key={project.id} projectData={project}/>;
                    }
                });
                break;
            case 'animal':
                projectCards = this.props.projects.map( (project) => {
                    if (project.category==="animal") {
                        return <ProjectCard setView={this.props.setView} key={project.id} projectData={project}/>;
                    }
                });
        }

        return(
            <React.Fragment>
                <div className="row hero-bg">
                    <HeroPanel setView={this.props.setView}/>
                </div>
                <div className="project-sort p-4">
                    <Slider {...settings}>
                        <div id="all" className="sort-link mx-2 active" onClick={this.sortProjects}>All</div>
                        <div id="art" className="sort-link mx-2" onClick={this.sortProjects}>Art</div>
                        <div id="gardening" className="sort-link mx-2" onClick={this.sortProjects}>Gardening</div>
                        <div id="technology" className="sort-link mx-2" onClick={this.sortProjects}>Technology</div>
                        <div id="crafting" className="sort-link mx-2" onClick={this.sortProjects}>Crafting</div>
                        <div id="health" className="sort-link mx-2" onClick={this.sortProjects}>Health</div>
                        <div id="animal" className="sort-link mx-2" onClick={this.sortProjects}>Animal</div>
                    </Slider>
                </div>
                <div className="row d-flex">
                    {projectCards}
                </div>
            </React.Fragment>
        );
    }
}