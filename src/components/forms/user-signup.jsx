import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class UserSignup extends React.Component {
	constructor(props){
		super(props);
		this.state={email:"",password:"",repassword:"",firstName:"",lastName:"",username:"",usernameError:"",emailError:"",passwordMismatch:"",passwordNumber:"",passwordUppercase:"",emailFormat:""};
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
            case "username":
    			this.setState({username: event.target.value});
		}
	}
	signupHandler(event){
		event.preventDefault();
        let request = {url:'/api/signup.php',method:"POST",data:{first_name:this.state.firstName,last_name:this.state.lastName,username:this.state.username,password:this.state.password,repassword:this.state.repassword,email:this.state.email}}
        axios(request)
            .then(response => {
				//need to setState to go to dashboard
				this.setState({emailError:"", passwordMismatch:"", usernameError:"", passwordUppercase:"", passwordNumber:""});
				if(typeof response.data === "string"){
					if(response.data.includes("is taken")){
						console.log("setting state");
						let arr = response.data.split(" ");
						this.setState({usernameError:arr[0]+" is already taken",});
					}
					if(response.data.includes("is already being")){
						console.log("setting state");
						let arr = response.data.split(" ");
						this.setState({emailError:arr[0]+" is already taken"});
					}
					if(response.data.includes("match")){
						this.setState({passwordMismatch:"The passwords don't match"});
					}
					if(response.data.includes("uppercase")){
						this.setState({passwordUppercase:"The password needs an uppercase letter"});
					}
					if(response.data.includes("number")){
						this.setState({passwordNumber:"The password needs a number"});
					}
					if(response.data.includes("email")){
						this.setState({emailFormat:"The email entered is invalid"});
					}
					
				}
				else{
					console.log(response.data);
					this.props.loginUser(response.data[0]);
				}
            })
            .catch(function (error) {
                // handle error
                console.error(error);
            })
            .finally(function (response) {
              
            });
	}
	render() {
		return (
			<div className="col-10 offset-1 col-sm-6 offset-sm-3 col-lg-4 offset-lg-4 text-center my-5">
				<form className="form-signin">
					<h1 className="font-weight-light text-primary">KronoStory</h1>
					<h1 className="h3 mb-3 font-weight-light">Sign Up</h1>
                    <label htmlFor="inputEmail" className="sr-only">Username</label>
					<input 
						type="email" 
						id="username" 
						className="form-control mb-2" 
						placeholder="Username" 
						required="text" 
						onChange={this.onChangeHandler}
					/>
					<p className={this.state.usernameError ? "text-danger" : "text-danger d-none"}>{this.state.usernameError}</p>
					<label htmlFor="inputEmail" className="sr-only">Email address</label>
					<input 
						type="email" 
						id="inputEmail" 
						className="form-control mb-2" 
						placeholder="Email address" 
						required="text" 
						onChange={this.onChangeHandler}
					/>
					<p className={this.state.emailError ? "text-danger" : "text-danger d-none"}>{this.state.emailError}</p>
					<p className={this.state.emailFormat ? "text-danger" : "text-danger d-none"}>{this.state.emailFormat}</p>
					<label htmlFor="inputPassword" className="sr-only">Password</label>
					<input 
						type="password" 
						id="inputPassword" 
						className="form-control mb-2" 
						placeholder="Password" 
						required="password" 
						onChange={this.onChangeHandler} />
					<p className={this.state.passwordUppercase ? "text-danger" : "text-danger d-none"}>{this.state.passwordUppercase}</p>
					<p className={this.state.passwordNumber ? "text-danger" : "text-danger d-none"}>{this.state.passwordNumber}</p>
					<label htmlFor="inputPassword" className="sr-only">Re-enter Password</label>
					<input 
						type="password" 
						id="reEnter" 
						className="form-control mb-2" 
						placeholder="Re-enter Password" 
						required="password" 
						onChange={this.onChangeHandler} />
					<p className={this.state.passwordMismatch ? "text-danger" : "text-danger d-none"}>{this.state.passwordMismatch}</p>
					<label htmlFor="inputPassword" className="sr-only">First Name</label>
					<input 
						type="text" 
						id="firstName" 
						className="form-control mb-2" 
						placeholder="First Name" 
						onChange={this.onChangeHandler} 
					/>
					<label htmlFor="inputPassword" className="sr-only">Last Name</label>
					<input 
						type="text" 
						id="lastName" 
						className="form-control mb-2" 
						placeholder="Last Name" 
						onChange={this.onChangeHandler} 
					/>
					<div className="checkbox">
					</div>
					<button 
						className="btn btn-lg btn-primary btn-block" 
						onClick={this.signupHandler}
					>
						Sign Up
					</button>
				</form>
			</div>
		)
	}
}