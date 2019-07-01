import React from 'react';
import { Link } from 'react-router-dom';

export default class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleInputs(event) {
        const { type, value } = event.target;
        this.setState({ [type]: value });
    }

    handleLogin(event) {
        event.preventDefault();
        const loginInfo = {...this.state};
        this.props.loginAxios(loginInfo);
    }

    handleGuestLogin(event) {
        event.preventDefault();
        this.props.guestLoginAxios();
    }

    render() {
        return (
            <div className="col-10 offset-1 col-sm-6 offset-sm-3 col-lg-4 offset-lg-4 text-center py-4 my-2">
                <form className="form-signin">
                    <h1 className="font-weight-light user-form-title">KronoStory</h1>
                    <h1 className="h3 mb-3 font-weight-light">Please sign in</h1>
                    <label htmlFor="inputEmail" className="sr-only ">Email address</label>
                    <input
                        type="email"
                        id="inputEmail"
                        className="form-control mb-2"
                        placeholder="Email address"
                        required="text"
                        onChange={event => this.handleInputs(event)}
                        autoFocus
                    />
                    <p className={(this.props.emailFormat && !this.props.emailEmpty) ? "text-danger" : "text-danger d-none"}>{this.props.emailFormat}</p>
                    <p className={this.props.emailEmpty ? "text-danger" : "text-danger d-none"}>{this.props.emailEmpty}</p>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input
                        type="password"
                        id="inputPassword"
                        className="form-control mb-2"
                        placeholder="Password"
                        required="password"
                        onChange={event => this.handleInputs(event)}
                    />
                    <p className={this.props.passwordEmpty ? "text-danger" : "text-danger d-none"}>{this.props.passwordEmpty}</p>
                    <p className={this.props.badLogin ? "text-danger" : "text-danger d-none"}>{this.props.badLogin}</p>
                    <button
                        className="btn btn-lg btn-primary btn-block mb-2"
                        type="submit"
                        onClick={event => this.handleLogin(event)}
                    >
                        Sign in
                    </button>
                    <p className="guest" onClick={event => this.handleGuestLogin(event)}>Guest Login</p>
                    <p className="mt-5 mb-2 text-muted">Don't have an account?</p>
                    <Link to="/user-signup">
                        <button className="btn btn-lg btn-outline-primary btn-block">Sign Up</button>
                    </Link>
                </form>
            </div>
        )
    }
}
