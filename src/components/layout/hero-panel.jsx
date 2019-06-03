import React from 'react';
import './layout.css';

export default class HeroPanel extends React.Component {
    constructor(props){
        super(props);
    }
    handleHeroCardButton(event) {
        event.preventDefault();
        this.props.setView('projectDetails', {});
    }
    render(){
        return(
            <React.Fragment>
                <div className="col-12 col-md-6 offset-md-6 d-flex justify-content-center h-100">
                    <div className="align-self-center mx-5">
                        <div className="hero-content p-4">
                            <h3>Title Here</h3>
                            <p>Here's some placeholder content for the hero panel; has a white bg from CSS rule in .hero-content so we can see how wide the text can possibly get. Padding/margin can be tweaked with spacer classes. The button could click through to a featured project.</p>
                            <button 
                                className="btn btn-primary"
                                onClick={event => this.handleHeroCardButton(event)}
                            >
                                setView('project-details')
                                </button>   
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}