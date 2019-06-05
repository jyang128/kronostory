import React from 'react';
import './layout.css';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="row d-flex justify-content-between py-3 mx-2">
                <h1 className="align-self-center">
                    <Link to="/">
                        {this.props.title}
                    </Link>
                </h1>

                {this.props.currentUser 
                ? <div className="menu-nav align-self-center">
                        <Link to="/dashboard">
                            <i className="far fa-user-circle"></i> 
                          <span>{this.props.currentUser.username}</span><i 
                        className="far fa-user-circle"></i>
                        </Link>
                        <span>{this.props.currentUser.username}</span><i 
                        className="far fa-user-circle"
                        onClick={event => this.handleUserClick(event)}
                    ></i>
                </div>
                :  <div className="menu-nav align-self-center">
                     <Link to="/user-signup">Sign Up</Link> <Link to="/user-login">Log In</Link>
                   </div>
                }
            </div>
            
        );
    }
}