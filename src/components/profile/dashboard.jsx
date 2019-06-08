import React from 'react';
import ProjectCard from '../project/project-card';
import axios from 'axios';
import './profile.css';
import { Link } from 'react-router-dom';

export default class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            individualProjects: [],
            userSession: null
        }
    }
    componentDidMount() {
        console.log('dashboard location.state is ', this.props.location);
        const id = this.props.location.state.userId;
        console.log('dashboard "id" is ', id);
        this.getIndividualProjects(id);
    }
    getIndividualProjects(id) {
        axios.get(`/api/projects.php?userId=${id}`)
            .then(response => {
                console.log('response', response);
                if (this.props.location.state.user) {
                    console.log('this.props.location.state.userId is ', this.props.location.state.userId);
                    console.log('this.props.location.state.userSession.sessionId ', this.props.location.state.userSession);
                    if (this.props.location.state.userId == this.props.location.state.userSession) {
                        console.log('userSession is', response.data[0].sessionId)
                        console.log('response.data[1][1] ', response.data[1])
                        this.setState({
                            individualProjects: response.data[1],
                            userSession: response.data[0].sessionId
                        });
                    } else {
                        this.setState({
                            individualProjects: response.data[1]
                        }, ()=>console.log("individual project ", this.state.individualProjects))
                    }
                } else {
                    this.setState({
                        individualProjects: response.data[1], 
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
        console.log(this.state);
        let userProjectCards = this.state.individualProjects.map( (project) => {
            return <ProjectCard 
                key={project.id} 
                projectData={project} 
                delete={this.props.delete} 
            />;
        })
        return(
            <div className="container-fluid">
                <div className="row d-flex justify-content-between py-3 mx-2">
                    <h3 className="align-self-center">Projects by Me</h3>
                </div>
                { (this.state.userSession)
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
