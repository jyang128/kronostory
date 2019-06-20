import React from 'react';
import ProjectCard from './project-card';
import HeroPanel from '../layout/hero-panel';
import Slider from "react-slick";
import './project.css';

export default class ProjectCatalog extends React.Component{
    constructor(props){
        super(props);
        this.sortProjects = this.sortProjects.bind(this);
    }
    componentDidMount(){
        let filterView;
        let categories = ['art', 'gardening', 'technology', 'crafting', 'health', 'animal'];
        if(location.search && categories.includes(location.search.match(/\=(.*)/)[1])){
            filterView = location.search.match(/\=(.*)/)[1];
        } else {
            filterView = 'all';
        }
        this.props.changeFilterView(filterView);
    }
    sortProjects(event) {
        document.querySelector(".sort-link.active").classList.remove("active");
        let filterView = event.target.id;
        event.target.className += " active";
        this.props.changeFilterView(filterView);
        this.props.history.push({
            pathname: '/',
            search: `?filter=${filterView}`
        });
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
        if(this.props.filterView === 'all') {
            projectCards = this.props.projects.map( project => {
                return <ProjectCard key={project.id} projectData={project}/>;
            })
        } else {
            projectCards = this.props.projects.map( project => {
                if (project.category === this.props.filterView) {
                    return <ProjectCard key={project.id} projectData={project}/>;
                }
            })
        }
        
        return(
            <React.Fragment>
                <div className="row hero-bg">
                    <HeroPanel/>
                </div>
                <div id="project-sort" className="project-sort p-4">
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