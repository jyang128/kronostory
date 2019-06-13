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
		this.closeDropdown = this.closeDropdown.bind(this);
	}
	componentDidMount(){
		document.addEventListener('click', this.closeDropdown)
	}
	componentWillUnmount(){
		document.removeEventListener('click', this.closeDropdown)
	}
	closeDropdown(event){
		if(event.target.className !== 'dots'){
			this.setState({showDelete: false})
		}
	}
	toggleDeleteButton(){
		this.setState({showDelete: !this.state.showDelete})
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
		} else {
			deleteButtonClass = 'delete-button d-none';
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
			<div className="card">
				<Link to={`/project-details/${this.props.projectData.id}`}>
					<div className="card-main-img" style={imgStyle}></div>
				</Link>
				<div className="card-body">
					<Link to={`/project-details/${this.props.projectData.id}`}>
						<h6 className="card-title">
						{this.props.projectData.title.length > 25 ? this.props.projectData.title.substring(0,25) + '...' : this.props.projectData.title}</h6>
					</Link>
					<p className="user-link">
						By: {' '}
						<Link to={`/${this.props.projectData.username}`}>
							{this.props.projectData.username}
						</Link>
					</p>
					<p>
						<small className="card-text">{
							this.props.projectData.description.length > 35 ? this.props.projectData.description.substring(0,35) + '...' : this.props.projectData.description
							}</small>
					</p>
					{deleteButton}
				</div>
			</div>
		</div>
		);
	}
}