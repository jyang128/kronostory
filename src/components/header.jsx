import React from 'react';

export default class Header extends React.Component {
    constructor(props){
        super(props);
    }
    handleTitleClick(event){
        event.preventDefault();
        this.props.setView('catalog', {});
    }
    handleUserClick(event){
        event.preventDefault();
        this.props.setView('dashboard', {});
    }
    render(){
        return(
            <div className="row d-flex justify-content-between py-3 mx-2">
                <h1 
                    className="align-self-center" 
                    onClick={event => this.handleTitleClick(event)}
                >
                    {this.props.title}
                </h1>
                <div className="menu-nav align-self-center">
                    <span>Sign Up</span>
                    <i 
                        className="far fa-user-circle"
                        onClick={event => this.handleUserClick(event)}
                    ></i>
                    <span>Log In</span>
                </div>
            </div>
            
        );
    }
}