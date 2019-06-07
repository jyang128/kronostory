import React from 'react';
import './layout.css';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    constructor(props){
        super(props);
    }
    dropdown(event){
		if(!event.target.querySelector(".dropdown")){
			return;
		}
        console.log("click");
		if(event.target.querySelector(".dropdown").className === "dropdown d-none"){
            console.log("not showing yet");
			event.target.querySelector(".dropdown").className = "dropdown";
		}
		else{
			event.target.querySelector(".dropdown-item").className += " d-none";
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

                {this.props.currentUser 
                    ?   <div className="menu-nav align-self-center">
                            <span className="mr-1" onClick={this.dropdown}>
                                {this.props.currentUser.username}
                                <div className="dropdown-low d-none">
                                    <Link to={{
                                        pathname: '/login',
                                        search: `?user=${this.props.currentUser.id}`,
                                        state: {
                                            userId: this.props.currentUser.id, 
                                            username: this.props.currentUser.username, 
                                            loggedUser: this.props.currentUser
                                        }
                                    }} className="logout dropdown-link">
                                        logout
                                    </Link>
                                    <Link to={{
                                        pathname: '/dashboard',
                                        search: `?user=${this.props.currentUser.id}`,
                                        state: {
                                            userId: this.props.currentUser.id, 
                                            username: this.props.currentUser.username, 
                                            loggedUser: this.props.currentUser
                                        }
                                    }} className="dashboard dropdown-link">
                						dashboard
                					</Link>
                                </div>
                            </span>
                            <i className="far fa-user-circle"></i>  
                        </div>
                    :  <div className="menu-nav align-self-center">
                            <Link to="/user-signup">Sign Up</Link> <Link to="/user-login">Log In</Link>
                        </div>
                }
            </div>
            
        );
    }
}