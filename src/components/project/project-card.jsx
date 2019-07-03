import React from 'react';
import './project.css';
import DeleteDropdown from './delete-dropdown.jsx';
import { Link } from 'react-router-dom';

export default class ProjectCard extends React.Component{
	render(){
		let deleteButton;

		if(this.props.userStatus) {
			if(this.props.userStatus.id === this.props.projectData.user_id){
					deleteButton = (<DeleteDropdown 
						delete={this.props.delete} 
						projectData={this.props.projectData} 
						styleOption={1}
						icon={'...'}
					/>);
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
