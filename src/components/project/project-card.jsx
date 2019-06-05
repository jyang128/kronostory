import React from 'react';
import './project.css';
import { Link } from 'react-router-dom';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class ProjectCard extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="col-12 col-sm-4 mb-4" >
              <div className="card">
                <img className="card-img-top" src={this.props.projectData.primary_image} alt="project card"/>
                <div className="card-body">
                  <h5 className="card-title">{this.props.projectData.title}</h5>
                  <p className="card-text">{this.props.projectData.description}</p>
                  <Link to={`project-details/${this.props.projectData.id}`}>
                      <button className="btn btn-primary">
                          Go To Project
                      </button>
                  </Link>
                  <UncontrolledDropdown className="dots">
                    <DropdownToggle caret>
                      ...
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={()=>{this.props.delete(this.props.projectData.id);console.log("click")}}>Delete</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </div>
            </div>
        );
    }
}