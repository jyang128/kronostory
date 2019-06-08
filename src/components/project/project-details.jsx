import React from 'react';
import axios from 'axios';
import ProjectItems from './project-items';
import Timeline from './timeline';
import './project.css';

export default class ProjectDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            project: {},
            items: [],
            timelineentries: [],
            userSeshData: {
                id: null,
                username: ''
            }
        }
    }
    handleUsernameClick(event) {
        event.preventDefault();
        this.props.history.push({
            pathname: '/dashboard',
            search: `?user=${this.state.project.user_id}`,
            state: {userId: this.state.project.user_id,
                username: this.state.project.username
            }
        });
    }
    getProjectDetails(id) {
        axios.get(`/api/project-details.php?id=${id}`)
            .then(response => {
                this.setState({
                    userSeshData: response.data[0],
                    project: response.data[1],
                    items: response.data[1]['items_used'],
                    timelineentries: response.data[1]['timeline_entry']
                }); 
                console.log('Project Details Component')
                console.table({
                    userLoggedIn: this.state.userSeshData.id, 
                    userName: this.state.project.username,
                    projectId: this.state.project.id
                })
            })
            .catch(function (error) {
                console.error(error);
            })
    }
    componentDidMount() {
        this.getProjectDetails(this.props.match.params.id);
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row bg-light p-4">
                    <div className="col-12 col-md-5">
                        <img src={this.state.project.primary_image} className="img-fluid" alt="Project Image" />
                    </div>
                    <div className="col-12 col-md-7 mt-4 mt-md-0">
                        <h3>{this.state.project.project_title}</h3>
                        <div 
                            className="font-weight-light mt-3" 
                            onClick={event => this.handleUsernameClick(event)}
                        >
                            <div>By: {this.state.project.username}</div>
                        </div>
                        <div className=" mt-4">{this.state.project.project_description}</div>
                    </div>
                </div>
                <div className="row">
                    <ProjectItems items={this.state.items}/>
                </div>
                <div className="row bg-light">
                    <Timeline entries={this.state.timelineentries}/>
                </div>
            </div>
        )
    }
}