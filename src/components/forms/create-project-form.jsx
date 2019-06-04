import React from 'react';
import axios from 'axios';

export default class CreateProjectForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            file: null
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }
    // handleSubmitPress(event) {
    //     event.preventDefault();
    //     this.props.setView('projectDetails', {});
    // }
    // handleCancel(event) {
    //     event.preventDefault();
    //     this.props.setView('dashboard', {});
    // }
    onFileChange(e) {
        this.setState({file:e.target.files[0]}, ()=>console.log(this.state.file));
    }
    handleFormSubmit(event) {
        console.log("handle form submit");
        event.preventDefault();
        let formData = new FormData(event.target);
        axios.post('/api/uploads/create-project.php', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then(function (response) {
            console.log(response);
            })
            .catch(function (error) {
            console.log(error);
            });
    }
    render(){
        return(
            <React.Fragment>
                    <div className="row">
                        <div className="col-12">
                            <h2 className="text-center">Create a new project</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 offset-3">
                            <form className="my-4" onSubmit={this.handleFormSubmit}>
                                <div className="form-group" >
                                    <label htmlFor="proj-name">Give it a short title</label>
                                    <input id="proj-name" name="proj-name" type="text" className="form-control" placeholder="Enter Title"/>
                                    <small className="form-text text-muted">Make it sound cool! Maximum 60 characters.</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="proj-desc">Summary</label>
                                    <textarea id="proj-desc" name="proj-desc" className="form-control" placeholder="Summary of the project."></textarea>
                                    <small className="form-text text-muted">A short description that says it all. Maximum 140 characters.</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="main-proj-img">Main Image</label>
                                    <input id="main-proj-img" type="file" className="form-control-file" name="main-proj-img" onChange={this.onFileChange}/>
                                </div>
                                <hr />
                                <div className="form-row">
                                    <div className="form-group col-12">
                                        <label htmlFor="proj-item-title">Add items used in project</label>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <input id="proj-item-title" type="text" className="form-control mb-2" placeholder="Item Name"/>
                                        <input id="proj-item-img" name="proj-item-img" type="file" className="form-control-file"/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <button className="btn btn-primary"><i className="fas fa-plus"></i> Add another item</button>
                                    </div>
                                </div>
                                <hr />
                                <input type="hidden" name="hasUpload" value="true" />
                                <input type="hidden" name="user-id" value={this.props.userId} />
                                <button type="submit" className="btn btn-primary mr-2" >Submit</button>
                                <button className="btn btn-primary" onClick={event => this.handleCancel(event)}>Cancel</button>
                            </form>
                        </div>
                    </div>
            </React.Fragment>
        );
    }
}