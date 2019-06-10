import React from 'react';
import axios from 'axios';
import './layout.css';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    constructor(props){
        super(props);
    }
    dashboardHandler(event){
        event.target.parentElement.className += " d-none";
    }
    dropdownHandler(event){
		if(!event.target.querySelector(".dropdown-low")){
			return;
		}
		if(event.target.querySelector(".dropdown-low").className === "dropdown-low d-none"){
			event.target.querySelector(".dropdown-low").className = "dropdown-low";
		}
		else{
			event.target.querySelector(".dropdown-low").className += " d-none";
		}
	}
    render(){
        return(
            <div className="row d-flex justify-content-between py-2 mx-2">
                <div className="logo d-flex align-items-center">
                    <div className="logo-icon">
                        <img className="img-fluid" src="/images/white-logo.png" />
                    </div>
                    <h2>
                        <Link to="/">
                            {this.props.title}
                        </Link>
                    </h2>
                </div>
                
                {this.props.userSeshData.id 
                    ?   <div className="menu-nav align-self-center">
                            <i className="far fa-user-circle"></i> 
                            <span className="mr-1" onClick={this.dropdownHandler}>
                                {this.props.userSeshData.username} &#9663;
                                <div className="dropdown-low d-none">
                                    <Link to='/user-login' className="logout dropdown-link" onClick={this.props.logoutHandler}>
                                        logout
                                    </Link>
                                    <Link to={{
                                        pathname: '/dashboard',
                                        search: `?user=${this.props.userSeshData.id}`,
                                        state: {
                                            userId: this.props.userSeshData.id, 
                                            username: this.props.userSeshData.username, 
                                        }
                                    }} className="dashboard dropdown-link" onClick={this.dashboardHandler}>
                						dashboard
                					</Link>
                                </div>
                            </span>
                        </div>
                    :  <div className="menu-nav align-self-center">
                            <Link to="/user-signup">Sign Up</Link>
                            <Link to="/user-login">Log In</Link>
                        </div>
                }
            </div>
            
        );
    }
}