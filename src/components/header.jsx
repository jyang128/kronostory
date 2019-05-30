import React from 'react';

export default class Header extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="row d-flex justify-content-between my-4 mx-2">
                <h1 className="align-self-center">{this.props.title}</h1>
                <div className="menu-nav align-self-center">
                    <span>Sign Up</span>
                    <i className="far fa-user-circle"></i>
                    <span>Log In</span>
                </div>
            </div>
            
        );
    }
}