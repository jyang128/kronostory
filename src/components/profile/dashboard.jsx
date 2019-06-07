import React from 'react';
import ProjectCard from '../project/project-card';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            individualProjects: [],
            ownPage: false
        }
    }
    componentDidMount() {
        const id = this.props.location.state.userId * 1;
        this.getIndividualProjects(id);
    }
    getIndividualProjects(id) {
        axios.get(`/api/projects.php?userId=${id}`)
            .then(response => {
                if (this.props.location.state.loggedUser) {
                    if (this.props.location.state.loggedUser.id == this.props.location.state.userId) {
                        this.setState({
                            individualProjects: response.data,
                            ownPage: true
                        });
                    } else {
                        this.setState({
                            individualProjects: response.data
                        })
                    }
                } else {
                    this.setState({
                        individualProjects: response.data, 
                    }, ()=>console.log("userid: ", this.state.userId)
                    );
                }
                console.log(this.state);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function (response) {
              
            });
    }
    
    render(){
        let userProjectCards = this.state.individualProjects.map( (project) => {
            return <ProjectCard 
                key={project.id} 
                projectData={project} 
                delete={this.props.delete} 
                userStatus={this.state.ownPage}
            />;
        })

        return(
            <div className="container-fluid">
                <div className="row d-flex justify-content-between py-3 mx-2">
                    <h3 className="align-self-center">Projects by {this.props.location.state.username}</h3>
                </div>
                { (this.state.ownPage)
                    ? 
                    <div className="row d-flex justify-content-between py-3 mb-4 mx-2">
                        <Link to="/create-project">
                            <button className="btn btn-primary">
                                Create New Project
                            </button>
                        </Link>
                    </div>
                    : 
                    <div></div>
                }
                <div className="row d-flex">
                    {userProjectCards}
                </div>
            </div>
        );
    }
}