import React from 'react';
import './layout.css';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showDropdownMenu: false
        }
        this.toggleMenuNav = this.toggleMenuNav.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
    }
    addEventListeners(){
		document.addEventListener('click', this.closeDropdown)
		window.addEventListener('scroll', this.closeDropdown)
	}
	removeEventListeners(){
		document.removeEventListener('click', this.closeDropdown)
		window.removeEventListener('scroll', this.closeDropdown)
	}
    closeDropdown(event){
        if(event.target.className !== 'username'){
            this.setState({showDropdownMenu: false})
        }
    }
    toggleMenuNav(){
        this.setState({showDropdownMenu: !this.state.showDropdownMenu});
    }
    render(){
        console.log(this.state)

        let menuNav;
        let menuNavClass;
        let menuNavDropdownClass;

        if(this.state.showDropdownMenu){
            menuNavClass = "menu-nav-dropdown";
            this.addEventListeners();
        } else {
            menuNavClass = "menu-nav-dropdown d-none"
            this.removeEventListeners();
        }
        
        if(this.props.userSeshData.id) {
            menuNav = (
                <div className="menu-nav d-flex align-items-center" onClick={this.toggleMenuNav}>
                    <i className="far fa-user-circle" />
                    <span className="username d-flex align-items-center">
                        <span className="d-none d-sm-block">{this.props.userSeshData.username}</span> 
                        <div className={menuNavClass}>
                            <Link to='/' className="dropdown-link">
                                Home
                            </Link>
                            <Link to={{
                                pathname: `/${this.props.userSeshData.username}`,
                                state: {
                                    userId: this.props.userSeshData.id, 
                                    username: this.props.userSeshData.username, 
                                }
                            }} className="dropdown-link" onClick={this.dashboardHandler}>
                                dashboard
                            </Link>
                            <Link to='/user-login' className="dropdown-link" onClick={this.props.logoutHandler}>
                                logout
                            </Link>
                        </div>
                    </span>
                    <i className="fas fa-caret-down" />
                </div>
                );
        } else {
            menuNav = (
                <div className="menu-nav align-self-center">
                    <Link className="mr-2" to="/user-signup">Sign Up</Link>
                    <Link to="/user-login">Log In</Link>
                </div>
                );
        }

        return(
            <React.Fragment>
            <div className="row d-flex justify-content-between py-3 mx-2">
                <div className="logo d-flex align-items-center">
                    <div className="logo-icon">
                        <img className="img-fluid" src="/images/white-logo.png" />
                    </div>
                    <h4>
                        <Link to="/">
                            {this.props.title}
                        </Link>
                    </h4>
                </div>
                {menuNav}
            </div>
            </React.Fragment>
        );
    }
}