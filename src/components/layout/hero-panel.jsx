import React from 'react';
import './layout.css';
import { Link } from 'react-router-dom';

export default class HeroPanel extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <React.Fragment>
                <div className="col-12 col-md-6 offset-md-6 d-flex justify-content-center h-100">
                    <div className="align-self-center mx-5">
                        <div className="hero-content p-4">
                            <h3>What is KronoStory?</h3>
                            <p>Kronostory a community for finding and showcasing creative work and projects, featuring timelines that make it easy to see the whole process.</p>
                            <Link to="project-details/1">
                                <button className="btn btn-primary">
                                    View Sample Project
                                </button>  
                            </Link> 
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}