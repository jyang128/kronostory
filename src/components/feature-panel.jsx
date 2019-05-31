import React from 'react';

export default class FeaturePanel extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <React.Fragment>
                <div className="col-12 col-md-4 d-flex justify-content-center h-100 hero-content-container">
                    <div className="align-self-center m-5">
                        <div className="hero-content text-center p-4">
                            <h3>Title Here</h3>
                            <p>Placeholder Content</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4 d-flex justify-content-center h-100 hero-content-container">
                    <div className="align-self-center m-5">
                        <div className="hero-content text-center p-4">
                            <h3>Title Here</h3>
                            <p>Placeholder Content</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4 d-flex justify-content-center h-100 hero-content-container">
                    <div className="align-self-center m-5">
                        <div className="hero-content text-center p-4">
                            <h3>Title Here</h3>
                            <p>Placeholder Content</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}