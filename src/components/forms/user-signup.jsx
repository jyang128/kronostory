import React from 'react';

export default class UserSignup extends React.Component {
  constructor(props){
    super(props);
    this.state={email:"",password:"",repassword:"",firstName:"",lastName:""};
    this.signupHandler=this.signupHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  onChangeHandler(event){
    switch(event.target.id){
      case "inputEmail":
        this.setState({email: event.target.value});
        break;
      case "inputPassword":
        this.setState({password: event.target.value});
        break;
      case "reEnter":
        this.setState({repassword: event.target.value});
        break;
      case "firstName":
        this.setState({firstName: event.target.value});
        break;
      case "lastName":
        this.setState({lastName: event.target.value});
        break;
    }
  }
    signupHandler(event){
      event.preventDefault();
      this.props.setView("dashboard",{});
    }
    render() {
        return (
            <div className="text-center mt-5 col-4 offset-4">
                <form className="form-signin">
                    <h1 className="font-weight-light text-primary">KronoStory</h1>
                    <h1 className="h3 mb-3 font-weight-light">Sign Up</h1>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control mb-2" placeholder="Email address" required="text" onChange={this.onChangeHandler} />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control mb-2" placeholder="Password" required="password" onChange={this.onChangeHandler} />
                    <label htmlFor="inputPassword" className="sr-only">Re-enter Password</label>
                    <input type="password" id="reEnter" className="form-control mb-2" placeholder="Re-enter Password" required="password" onChange={this.onChangeHandler} />
                    <label htmlFor="inputPassword" className="sr-only">First Name</label>
                    <input type="text" id="firstName" className="form-control mb-2" placeholder="First Name" onChange={this.onChangeHandler} />
                    <label htmlFor="inputPassword" className="sr-only">Last Name</label>
                    <input type="text" id="lastName" className="form-control mb-2" placeholder="Last Name" onChange={this.onChangeHandler} />
                    <div className="checkbox">
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" onClick={this.signupHandler}>Sign Up</button>
                </form>
            </div>
        )
    }
}