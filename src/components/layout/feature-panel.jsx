import React from 'react';
import './layout.css';

export default class FeaturePanel extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <React.Fragment>
                <div className="col-12 text-center">
                    <h3 className="pb-4">Do you like to build?</h3>
                </div>
                <div className="col-12 col-md-4 mt-md-0 mt-2 justify-content-center h-100 hero-content-container">
                    <div className="feature-content text-center p-4">
                        <img className="feature-icon" src="images/checklist.svg" alt="checklist"/>
                        <h3 className="mt-4">Title Here</h3>
                        <p>Placeholder Content</p>
                    </div>
                </div>
                <div className="col-12 col-md-4 mt-md-0 mt-2 justify-content-center h-100 hero-content-container">
                    <div className="feature-content text-center p-4">
                        <img className="feature-icon" src="images/clock.svg" alt="clock"/>
                        <h3 className="mt-4">Title Here</h3>
                        <p>Placeholder Content</p>
                    </div>
                </div>
                <div className="col-12 col-md-4 mt-md-0 mt-2 justify-content-center h-100 hero-content-container">
                    <div className="feature-content text-center p-4">
                        <img className="feature-icon" src="images/corkboard.svg" alt="corkboard"/>
                        <h3 className="mt-4">Title Here</h3>
                        <p>Placeholder Content</p>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}