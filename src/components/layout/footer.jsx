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
                <Link to="/" className="mr-3">Home</Link>
                <Link to="/" className="mr-3">About</Link>
                {
                    this.props.userSeshData.username ?
                        <Link to={`/${this.props.userSeshData.username}`} className="dashboard dropdown-link" >
                            Account
                        </Link>
                        :
                        <Link to="/user-login" className="mr-3">Account</Link>
                }

            </div>
        </div>
    );
    }
}
