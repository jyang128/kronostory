import React from 'react';
import './project.css';
import { Link } from 'react-router-dom';

export default class ProjectCard extends React.Component{
	constructor(props){
		super(props);
	}
	dropdown(event){
		if(!event.target.querySelector(".delete")){
			return;
		}
		if(event.target.querySelector(".delete").className === "delete d-none"){
			event.target.querySelector(".delete").className = "delete";
		}
		else{
			event.target.querySelector(".delete").className += " d-none";
		}
	}
    render(){
        let deleteButton;
        if(this.props.userStatus) {
          if(this.props.userStatus.id === this.props.projectData.user_id){
            deleteButton = (
              <div>
                <div className="dots" onClick={this.dropdown}>
                  ...
                  <div className="delete d-none" onClick={ () => {this.props.delete(this.props.projectData.id); console.log("click")} }>
                    delete
                  </div>
                </div>
              </div>
            );
          }
        } else {
            deleteButton = null;
        }
        return(
          <div className="col-12 col-sm-3 mb-3">
              <div className="card">
                <img className="card-img-top" src={this.props.projectData.primary_image} alt="project card"/>
                <div className="card-body">
                  <h5 className="card-title">{this.props.projectData.title}</h5>
                  <h6>By: {this.props.projectData.username}</h6>
                  <p className="card-text text-truncate">{this.props.projectData.description}</p>
                  <Link to={`project-details/${this.props.projectData.id}`}>
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