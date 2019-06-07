import React from 'react';

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

    render() {
        return (
            <div className="text-center mt-5 col-4 offset-4">
                <form className="form-signin">
                    <h1 className="font-weight-light text-primary">KronoStory</h1>
                    <h1 className="h3 mb-3 font-weight-light">Please sign in</h1>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input 
                        type="email" 
                        id="inputEmail" 
                        className="form-control" 
                        placeholder="Email address" 
                        required="text" 
                        onChange={event => this.handleInputs(event)}
                        autoFocus 
                    />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input 
                        type="password" 
                        id="inputPassword" 
                        className="form-control" 
                        placeholder="Password" 
                        required="password" 
                        onChange={event => this.handleInputs(event)}
                    />
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>
                    <button 
                        className="btn btn-lg btn-primary btn-block" 
                        type="submit"
                        onClick={event => this.handleLogin(event)}
                    >
                        Sign in
                    </button>
                    <p className="mt-5 mb-2 text-muted">Don't have an account?</p>
                    <button className="btn btn-lg btn-outline-primary btn-block">Sign Up</button>
                </form>
            </div>
        )
    }
}