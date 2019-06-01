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
    handleSubmitPress(event) {
        event.preventDefault();
        this.handleFormSubmit();
        this.props.setView('projectDetails', {});
    }
    handleCancel(event) {
        event.preventDefault();
        this.props.setView('dashboard', {});
    }
    onFileChange(e) {
        this.setState({file:e.target.files[0]}, ()=>console.log(this.state.file));
    }
    handleFormSubmit() {
        console.log("handle form submit");
        axios.post('/api/uploads/create-project.php', this.state.file, {
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
                            <form className="my-4">
                                <div className="form-group">
                                    <label>Give it a short title</label>
                                    <input type="text" className="form-control" placeholder="Enter Title"/>
                                    <small className="form-text text-muted">Make it sound cool! Maximum 60 characters.</small>
                                </div>
                                <div className="form-group">
                                    <label>Summary</label>
                                    <textarea className="form-control" placeholder="Summary of the project."></textarea>
                                    <small className="form-text text-muted">A short description that says it all. Maximum 140 characters.</small>
                                </div>
                                <div className="form-group">
                                    <label>Main Image</label>
                                    <input type="file" className="form-control-file" onChange={this.onFileChange}/>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Add Item</label>
                                        <input type="text" className="form-control mb-2" placeholder="Item Name"/>
                                        <input type="hidden" name="hasUpload" value="true" />
                                        <input type="file" name="imageToUpload"  className="form-control-file"/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Add Item</label>
                                        <input type="text" className="form-control mb-2" placeholder="Item Name"/>
                                        <input type="file" className="form-control-file"/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Add Item</label>
                                        <input type="text" className="form-control mb-2" placeholder="Item Name"/>
                                        <input type="file" className="form-control-file"/>
                                    </div>
                                </div>
                                <div>
                                    <button className="btn btn-primary mb-2">+ Add Another</button>   
                                </div>
                                <button type="submit" className="btn btn-primary mr-2" onClick={event => this.handleSubmitPress(event)}>Submit</button>
                                <button type="submit" className="btn btn-primary" onClick={event => this.handleCancel(event)}>Cancel</button>
                            </form>
                        </div>
                    </div>
            </React.Fragment>
        );
    }
}