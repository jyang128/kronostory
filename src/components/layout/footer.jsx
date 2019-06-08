import React from 'react';
import './layout.css';
import { Link } from 'react-router-dom';

export default class Footer extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
        <div className="row d-flex justify-content-between py-3 mx-2">
            <div>Copyright &copy;2019 Kronostory</div>
            <div>
                <Link to="/" className="mr-3">About</Link>
                <Link to="/user-signup" className="mr-3">Sign Up</Link>
                <Link to="/user-login" className="mr-3">Log In</Link>
            </div>
        </div>        
    );
    }
}