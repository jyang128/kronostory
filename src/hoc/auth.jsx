import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

export default function(WrappedComponent){
    class Auth extends Component {
        constructor(props){
            super(props);
            this.state = {
                userId: null,
                loading: false
            }
        }
        componentDidMount(){
            this.checkLoginStatus();
        }
        checkLoginStatus(){
            this.setState({loading: true}, () => {
                axios.get('/api/check-login.php')
                    .then( response => {
                        this.setState({userId: response.data.id})
                        this.checkForRedirect();
                    })
                    .catch( error => console.error(error))
            })
        }
        checkForRedirect(){
            if(this.state.userId === null) {
                this.props.history.push({
                    pathname: '/user-login'
                })
            } else {
                this.setState({loading: false});
            }
        }
        render(){
            let loader = null;
            if (this.state.loading) {
                loader = <div className="loader"><img className="loading-icon" src="/images/loader.svg" /></div>
            }
            return (
                <React.Fragment>
                    <WrappedComponent {...this.props}/>
                    {loader}
                </React.Fragment>
            )
        }
    }
    return withRouter(Auth);
}

