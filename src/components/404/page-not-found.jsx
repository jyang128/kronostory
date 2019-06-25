import React from 'react';
import './404.css';
import { Link } from 'react-router-dom';

export default class PageNotFound extends React.Component {
    render(){
        return(
            <div className="row page-not-found">
                <div className="page-not-found-inner">
                    <h1>404 Page Not Found</h1>
                    <Link to="/">
                        <h4 className="page-not-found-icon">Back to Home <i className="fas fa-home"></i></h4>
                    </Link>
                </div>
            </div>
        );
    }
}
