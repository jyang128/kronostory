import React from 'react';

export default class UserSignup extends React.Component {
    render() {
        return (
            <div className="text-center mt-5 col-4 offset-4">
                <form className="form-signin">
                    <h1 className="font-weight-light text-primary">KronoStory</h1>
                    <h1 className="h3 mb-3 font-weight-light">Sign Up</h1>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="text" autoFocus />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="password" />
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                    <p className="mt-5 mb-2 text-muted">Don't have an account?</p>
                    <button className="btn btn-lg btn-outline-primary btn-block">Sign Up</button>
                </form>
            </div>
        )
    }
}