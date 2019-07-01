import React from 'react';
import './layout.css';
import { Link } from 'react-router-dom';

export default class HeroPanel extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        let callToAction;
        if(this.props.userSeshData.id){
            callToAction = (
                <Link to="project-details/1">
                    <button className="btn btn-primary">
                        View Sample Project
                    </button>  
                </Link> 
            );
        } else {
            callToAction = (
                <button className="btn btn-primary" onClick={this.props.loginGuest}>
                    Explore as Guest User
                </button> 
            );
        }
        return(
            <React.Fragment>
                <div className="col-12 d-flex justify-content-center">
                    <div className="align-self-center mx-5">
                        <div className="hero-content p-4">
                            <h3>What is KronoStory?</h3>
                            <p>KronoStory is a community for finding and showcasing creative work and personal endeavors, featuring timelines that make it easy to see the whole process.</p>
                            { callToAction }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}