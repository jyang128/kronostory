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
            <div className="row d-flex justify-content-between py-3 mx-2">
                <h1 className="align-self-center">
                    <Link to="/">
                        {this.props.title}
                    </Link>
                </h1>

                {this.props.userSeshData.id 
                    ?   <div className="menu-nav align-self-center">
                            <span className="mr-1" onClick={this.dropdownHandler}>
                                {this.props.userSeshData.username}
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
                            <i className="far fa-user-circle"></i>  
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