import React from 'react';

export default class UserSignup extends React.Component {
    render() {
        return (
            <div className="text-center mt-5 col-4 offset-4">
                <form className="form-signin">
                    <h1 className="font-weight-light text-primary">KronoStory</h1>
                    <h1 className="h3 mb-3 font-weight-light">Sign Up</h1>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control mb-2" placeholder="Email address" required="text" autoFocus />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control mb-2" placeholder="Password" required="password" />
                    <label htmlFor="inputPassword" className="sr-only">Re-enter Password</label>
                    <input type="password" id="inputPassword" className="form-control mb-2" placeholder="Re-enter Password" required="password" />
                    <label htmlFor="inputPassword" className="sr-only">First Name</label>
                    <input type="password" id="inputPassword" className="form-control mb-2" placeholder="First Name" required="password" />
                    <label htmlFor="inputPassword" className="sr-only">Last Name</label>
                    <input type="password" id="inputPassword" className="form-control mb-2" placeholder="Last Name" required="password" />
                    <div className="checkbox">
                    </div>
                    <button className="btn btn-lg btn-primary btn-block">Sign Up</button>
                </form>
            </div>
        )
    }
}