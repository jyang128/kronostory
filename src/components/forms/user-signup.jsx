import React from 'react';
import axios from 'axios';

export default class UserSignup extends React.Component {
	constructor(props){
		super(props);
		this.state={
			email:"",
			password:"",
			repassword:"",
			firstName:"",
			lastName:"",
			username:"",
			usernameError:"",
			emailError:"",
			passwordMismatch:"",
			passwordNumber:"",
			passwordUppercase:"",
			emailFormat:"",
			keywordError:"",
			dashesError:"",
			firstNameEmpty:"",
			lastNameEmpty:"",
			emailEmpty:"",
			passwordEmpty:"",
			usernameEmpty:""
		};
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
        let request = {url:'/api/signup.php',method:"POST",data:{
			first_name:this.state.firstName,
			last_name:this.state.lastName,
			username:this.state.username,
			password:this.state.password,
			repassword:this.state.repassword,
			email:this.state.email
		}}
        axios(request)
            .then(response => {
				//need to setState to go to dashboard
				this.setState({
					usernameError:"",
					emailError:"",
					passwordMismatch:"",
					passwordNumber:"",
					passwordUppercase:"",
					emailFormat:"",
					keywordError:"",
					dashesError:"",
					firstNameEmpty:"",
					lastNameEmpty:"",
					emailEmpty:"",
					passwordEmpty:"",
					usernameEmpty:""
				});
				if(typeof response.data === "string"){
					let arr = [];
					if(response.data.includes("is taken")){
						arr = response.data.split(" ");
						this.setState({usernameError:arr[0]+" is already taken",});
					}
					if(response.data.includes("is already being")){
						arr = response.data.split(" ");
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
					if(response.data.includes("as a username")){
						arr = response.data.split(" ");
						this.setState({keywordError:arr[16]+" can't be used as a username"});
					}
					if(response.data.includes("dashes")){
						this.setState({dashesError:"The username can't contain dashes"});
					}
					if(response.data.includes("#firstname")){
						this.setState({firstNameEmpty:"You must enter a first name"});
					}
					if(response.data.includes("#lastname")){
						this.setState({lastNameEmpty:"You must enter a last name"});
					}
					if(response.data.includes("#email")){
						this.setState({emailEmpty:"You must enter a email"});
					}
					if(response.data.includes("#username")){
						this.setState({usernameEmpty:"You must enter a username"});
					}
					if(response.data.includes("#password")){
						this.setState({passwordEmpty:"You must enter a password"});
					}
				}
				else{
					this.props.loginUser(response.data[0]);
				}
            })
            .catch( error => console.error(error));
	}
	render() {
		return (
			<div className="col-10 offset-1 col-sm-6 offset-sm-3 col-lg-4 offset-lg-4 text-center py-4 my-2">
				<form className="form-signin">
					<h1 className="font-weight-light user-form-title">KronoStory</h1>
					<h1 className="h3 mb-3 font-weight-light">Sign Up</h1>
					<label htmlFor="inputPassword" className="sr-only">First Name</label>
					<input
						type="text"
						id="firstName"
						className="form-control mb-2"
						placeholder="First Name"
						onChange={this.onChangeHandler}
					/>
					<p className={this.state.firstNameEmpty ? "text-danger" : "text-danger d-none"}>{this.state.firstNameEmpty}</p>
					<label htmlFor="inputPassword" className="sr-only">Last Name</label>
					<input
						type="text"
						id="lastName"
						className="form-control mb-2"
						placeholder="Last Name"
						onChange={this.onChangeHandler}
					/>
					<p className={this.state.lastNameEmpty ? "text-danger" : "text-danger d-none"}>{this.state.lastNameEmpty}</p>
					<div className="checkbox">
					</div>
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
					<p className={this.state.keywordError ? "text-danger" : "text-danger d-none"}>{this.state.keywordError}</p>
					<p className={this.state.dashesError ? "text-danger" : "text-danger d-none"}>{this.state.dashesError}</p>
					<p className={this.state.usernameEmpty ? "text-danger" : "text-danger d-none"}>{this.state.usernameEmpty}</p>
					<label htmlFor="inputEmail" className="sr-only">Email Address</label>
					<input
						type="email"
						id="inputEmail"
						className="form-control mb-2"
						placeholder="Email address"
						required="text"
						onChange={this.onChangeHandler}
					/>
					<p className={this.state.emailError ? "text-danger" : "text-danger d-none"}>{this.state.emailError}</p>
					<p className={(this.state.emailFormat && !this.state.emailEmpty) ? "text-danger" : "text-danger d-none"}>{this.state.emailFormat}</p>
					<p className={this.state.emailEmpty ? "text-danger" : "text-danger d-none"}>{this.state.emailEmpty}</p>
					<label htmlFor="inputPassword" className="sr-only">Password</label>
					<input
						type="password"
						id="inputPassword"
						className="form-control mb-2"
						placeholder="Password"
						required="password"
						onChange={this.onChangeHandler} />
					<p className={(this.state.passwordUppercase && !this.state.passwordEmpty) ? "text-danger" : "text-danger d-none"}>{this.state.passwordUppercase}</p>
					<p className={(this.state.passwordNumber && !this.state.passwordEmpty) ? "text-danger" : "text-danger d-none"}>{this.state.passwordNumber}</p>
					<p className={this.state.passwordEmpty ? "text-danger" : "text-danger d-none"}>{this.state.passwordEmpty}</p>
					<label htmlFor="inputPassword" className="sr-only">Re-enter Password</label>
					<input
						type="password"
						id="reEnter"
						className="form-control mb-2"
						placeholder="Re-enter Password"
						required="password"
						onChange={this.onChangeHandler} />
					<p className={this.state.passwordMismatch ? "text-danger" : "text-danger d-none"}>{this.state.passwordMismatch}</p>
					<p><small class="text-muted">Password must have at least 1 capital letter and 1 number.</small></p>
					<button
						className="btn btn-lg btn-primary btn-block mt-4"
						onClick={this.signupHandler}
					>
						Sign Up
					</button>
				</form>
			</div>
		)
	}
}
