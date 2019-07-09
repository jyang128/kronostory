import React from 'react';
import axios from 'axios';
import ProjectItems from './project-items';
import Timeline from './timeline';
import Modal from '../layout/modal';
import EditProjectForm from '../forms/edit-project-form';
import './project.css';
import { Link } from 'react-router-dom';

export default class ProjectDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            timelineModalOpened: false,
            itemsUsedModalOpened: false,
            projEditModalOpened: false,
            project: {},
            items: [],
            timelineentries: [],
            userSeshData: {
                id: null,
                username: ''
            },
            loading: false
        }
        this.toggleItemsUsedModal = this.toggleItemsUsedModal.bind(this);
        this.toggleTimelineModal = this.toggleTimelineModal.bind(this);
        this.createNewEntry = this.createNewEntry.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.deleteEntry = this.deleteEntry.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.toggleEditModal = this.toggleEditModal.bind(this);
        this.editProject = this.editProject.bind(this);
    }
    componentDidMount() {
        this.getProjectDetails(this.props.match.params.id);
    }
    getProjectDetails(id) {
        this.setState({loading: true}, ()=> {
            axios.get(`/api/project-details.php?id=${id}`)
            .then(response => {
                this.setState({
                    userSeshData: response.data[0],
                    project: response.data[1],
                    items: response.data[1]['items_used'],
                    timelineentries: response.data[1]['timeline_entry']
                });
            })
            .catch(error => console.error(error))
            .finally(()=>{
                this.setState({loading: false});
            })
        })
    }
    createNewItemsUsed(formData){
        axios.post('/api/uploads/create-items-used-entry.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            this.setState({
                items: [...this.state.items, response['data'][0]],
                itemsUsedModalOpened: false
            })
        })
        .catch(error => console.error(error))
    }
    createNewEntry(formData){
        axios.post('/api/uploads/create-timeline-entry.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            this.setState({
                timelineentries: [...this.state.timelineentries, response['data'][0]],
                timelineModalOpened: false
            })
        })
        .catch( error => console.error(error))
    }
    deleteEntry(id){
        axios.delete('/api/delete-entry.php',{params:{"id":id}})
            .then( () => {
                    let newEntries = this.state.timelineentries.slice(0);
                    for(let i = 0; i < newEntries.length; i++){
                        if(newEntries[i].timeline_id === id){
                            newEntries.splice(i,1);
                            break;
                        }
                    }
                    this.setState({timelineentries:newEntries});
                }
            )
            .catch(error => console.error(error));
    }
    deleteItem(id){
        axios.delete('/api/delete-item.php',{params:{"id":id}})
            .then( () => {
                    let newItems = this.state.items.slice(0);
                    for(let i = 0; i < newItems.length; i++){
                        if(newItems[i].project_item_id === id){
                            newItems.splice(i,1);
                            break;
                        }
                    }
                    this.setState({items:newItems});
                }
            )
            .catch(error => console.error(error))
    }
    editProject(data) {
        axios.post('/api/edit/edit-project.php', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            this.setState({
                projEditModalOpened: false,
                project: response.data[0]
            });
        })
        .catch(error => console.error(error))
    }
    toggleEditModal(event){
        if(!this.state.projEditModalOpened) {
            this.setState({
                projEditModalOpened: true
            });
        } else if (event.target.id === 'cancel-btn' || event.target.className === 'fas fa-times') {
            this.setState({
                projEditModalOpened: false
            });
        }
    }
    toggleItemsUsedModal(event){
        if(!this.state.itemsUsedModalOpened) {
            this.setState({
                itemsUsedModalOpened: true
            });
        } else if (event.target.className === 'overlay' || event.target.className === 'fas fa-times') {
            this.setState({
                itemsUsedModalOpened: false
            });
        }
    }
    toggleTimelineModal(event){
        if(!this.state.timelineModalOpened){
            this.setState({
                timelineModalOpened: true
            });
        } else if (event.target.className === 'overlay' || event.target.className === 'fas fa-times') {
            this.setState({
                timelineModalOpened: false
            });
        }
    }
    toggleEditMode() {
        this.setState({projEditModalOpened: true});
    }
    render() {
        let primaryImg = this.state.project.primary_image;
        let editIcon = null;
        let loader = null;

        if (this.state.loading) {
            loader = <div className="loader"><img className="loading-icon" src="/images/loader.svg" /></div>
        }

        if(this.state.userSeshData.id === this.state.project.user_id) {
            editIcon = (
                <div
                    className="edit-icon"
                    onClick={this.toggleEditMode}
                >
                    <i className="fas fa-pencil-alt"></i> Edit
                </div>
            )
        }
        return (
            <React.Fragment>
                <div className="row bg-light p-2 p-md-4">
                    <div className="col-12 col-md-5">
                        <img src={primaryImg ? primaryImg : "/images/placeholder-img.jpg"} className="img-fluid img-w-border proj-detail-main-img" alt="Project Image" />
                    </div>
                    <div className="col-12 col-md-7 mt-4 mt-md-0 position-relative" data-type="proj-desc">
                        {editIcon}
                        <h3>{this.state.project.project_title}</h3>
                        <h6 className="mt-3 user-link">
                            By:{' '}
                            <Link to={`/${this.state.project.username}`}>
                                {this.state.project.username}
                            </Link>
                        </h6>
                        <div className=" mt-4">{this.state.project.project_description}</div>
                    </div>
                </div>
                <div className="row">
                    <ProjectItems
                        createNewItemsUsed={formData => this.createNewItemsUsed(formData)}
                        itemsUsedModalOpened={this.state.itemsUsedModalOpened}
                        toggleItemsUsedModal={this.toggleItemsUsedModal}
                        items={this.state.items}
                        project={this.state.project}
                        userSeshData={this.state.userSeshData}
                        projectData={this.state.project}
                        deleteItem={this.deleteItem}
                    />
                </div>
                <div className="row bg-light">
                    <Timeline
                        createNewEntry={this.createNewEntry}
                        timelineModalOpened={this.state.timelineModalOpened}
                        toggleTimelineModal={this.toggleTimelineModal}
                        entries={this.state.timelineentries}
                        project={this.state.project}
                        userSeshData={this.state.userSeshData}
                        deleteEntry={this.deleteEntry}
                    />
                </div>
                {loader}

                <Modal
                    isModalOpen={this.state.projEditModalOpened}
                    toggleModal={this.toggleEditModal}
                >
                    <EditProjectForm editProject={this.editProject} projectInfo={this.state.project} />
                </Modal>
            </React.Fragment>
        )
    }
}
