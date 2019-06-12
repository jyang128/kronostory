import React from 'react';
import './project.css';
import { Link } from 'react-router-dom';

export default class ProjectCard extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showDelete: false
		}
		this.handleDelete = this.handleDelete.bind(this);
		this.toggleDeleteButton = this.toggleDeleteButton.bind(this);
		this.mouseLeaveDeleteButton = this.mouseLeaveDeleteButton.bind(this);
		this.closeDropdown = this.closeDropdown.bind(this);
	}
	componentDidMount(){
		document.addEventListener('click', this.closeDropdown)
		window.addEventListener('scroll', this.closeDropdown)
	}
	componentWillUnmount(){
		document.removeEventListener('click', this.closeDropdown)
		window.removeEventListener('scroll', this.closeDropdown)
	}
	closeDropdown(event){
		if(event.target.className !== 'dots'){
			this.setState({showDelete: false})
		}
	}
	toggleDeleteButton(){
		this.setState({showDelete: !this.state.showDelete})
	}
	mouseLeaveDeleteButton(){
		this.setState({showDelete: false})
	}
	handleDelete(){
		this.toggleDeleteButton();
		this.props.delete(this.props.projectData.id);
	}
	render(){
		let deleteButton;
		let deleteButtonClass;
		let dropdownClass;

		if(this.state.showDelete){
			deleteButtonClass = 'delete-button';
			dropdownClass = 'delete-dropdown-arrow';
		} else {
			deleteButtonClass = 'delete-button d-none';
			dropdownClass = 'delete-dropdown-arrow d-none';
		}

		if(this.props.userStatus) {
			if(this.props.userStatus.id === this.props.projectData.user_id){
					deleteButton = (
					<div>
						<div className="dots" onClick={this.toggleDeleteButton} >
							...
							<div className={deleteButtonClass} onClick={this.handleDelete} >
								delete
							</div>
							<div className={dropdownClass}></div>
						</div>
					</div>
					);
			} 
		} else {
			deleteButton = null;
		}

		let primaryImg = this.props.projectData.primary_image;

		const imgStyle = {
			backgroundImage: 'url(' + (primaryImg ? primaryImg : "/images/placeholder-img.jpg") + ')'
		};
		return(
		<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
			<div className="card" onMouseLeave={this.mouseLeaveDeleteButton}>
				<div className="card-main-img" style={imgStyle}></div>
				<div className="card-body">
					<h5 className="card-title">{this.props.projectData.title}</h5>
					<h6 className="user-link">
						By: {' '}
						<Link to={`/${this.props.projectData.username}`}>
							{this.props.projectData.username}
						</Link>
					</h6>
					<p className="card-text text-truncate">{this.props.projectData.description}</p>
					<Link to={`/project-details/${this.props.projectData.id}`}>
					<button className="btn btn-primary">
					Go To Project
					</button>
					</Link>
					{deleteButton}
				</div>
			</div>
		</div>
		);
	}
}