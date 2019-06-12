import React from 'react';
import './forms.css';
import { Link } from 'react-router-dom';

export default class CreateProjectForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            mainFile: '',
            itemFile: '',
            mainImgHasUpload: false,
            projImgHasUpload: false,
            selectedCategory: ''
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onFileChangeItem = this.onFileChangeItem.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
    }
    onFileChange(e) {
        console.log("the target file: ", e.target.files[0]);
        if (e.target.files[0] !== undefined) {
            this.setState({ mainFile:e.target.files[0], mainImgHasUpload: true });
        } else {
            this.setState({mainFile:'', mainImgHasUpload: false });
        }
    }
    onFileChangeItem(e) {
        console.log("the target file: ", e.target.files[0]);
        if (e.target.files[0] !== undefined) {
            this.setState({ itemFile:e.target.files[0], projImgHasUpload: true });
        } else {
            this.setState({ itemFile:'', projImgHasUpload: false });
        }
    }
    onRadioChange(event) {
        console.log(event.target.id)
        this.setState({ selectedCategory: event.target.id.toString() });

    }
    handleFormSubmit(event) {
        if(this.state.selectedCategory === '') {
            this.setState({ selectedCategory: false })
        }
        console.log("handle form submit");
        event.preventDefault();
        if (this.state.selectedCategory) {
            let formData = new FormData(event.target);
            this.props.createNewProject(formData);
            document.getElementById("formSubmit").disabled = true;
        }
        
    }
    render(){
        let formError = <div className="form-error">
                            <p className="text-danger">Please choose a category</p>
                        </div>;
        return(
            <React.Fragment>
            <div className="form-container">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center mt-4">
                            <h2>Create Project</h2>
                            <p>Show off your latest project!</p>
                        </div>
                    </div>
                    <form className="create-project-form" onSubmit={this.handleFormSubmit}>
                        <div className="row mt-4">
                            <div className="col-12 col-md-8">
                                <h5 className="font-weight-bold">Describe your project</h5>
                                <div className="form-group" >
                                    <label htmlFor="proj-name">Project Name</label>
                                    <input id="proj-name" name="proj-name" type="text" className="form-control" placeholder="Enter Project Name" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="proj-desc">Main Description</label>
                                    <textarea id="proj-desc" name="proj-desc" className="form-control" placeholder="A short description that says it all." required></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="proj-timeline-desc">Describe your timeline</label>
                                    <textarea id="proj-timeline-desc" name="proj-timeline-desc" className="form-control" placeholder="A short description about your timeline."></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="proj-main-img">Main Project Image</label>
                                    <div className="custom-file">
                                        <label className="custom-file-label" htmlFor="proj-main-img">{this.state.mainFile ? this.state.mainFile.name : "Choose File"}</label>
                                        <input id="proj-main-img" type="file" className="form-control-file" name="proj-main-img" onChange={this.onFileChange}/>
                                        <input id="mainImgHasUpload" type="hidden" name="mainImgHasUpload" value={this.state.mainImgHasUpload} />
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div className="col-12 col-md-4">
                                <h5>Categories</h5>
                                <ul className={this.state.selectedCategory === false ? "list-group mb-4 border border-danger" : "list-group mb-4"}>
                                    <li className="list-group-item">
                                        <div className="radio-container">
                                            <input className="form-check-input" type="radio" id="art" name="proj-category" value="art" onChange={this.onRadioChange} /> 
                                            <label className="form-check-label" htmlFor="art">Art</label>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="radio-container">
                                            <input className="form-check-input" type="radio" id="gardening" name="proj-category" value="gardening" onChange={this.onRadioChange} /> 
                                            <label className="form-check-label" htmlFor="gardening">Gardening</label>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="radio-container">
                                            <input className="form-check-input" type="radio" id="technology" name="proj-category" value="technology" onChange={this.onRadioChange} /> <label className="form-check-label" htmlFor="technology">Technology</label>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="radio-container">
                                            <input className="form-check-input" type="radio" id="crafting" name="proj-category" value="crafting" onChange={this.onRadioChange} /> 
                                            <label className="form-check-label" htmlFor="crafting">Crafting</label>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="radio-container">
                                            <input className="form-check-input" type="radio" id="health" name="proj-category" value="health" onChange={this.onRadioChange} /> 
                                            <label className="form-check-label" htmlFor="health">Health</label>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="radio-container">
                                            <input className="form-check-input" type="radio" id="animal" name="proj-category" value="animal" onChange={this.onRadioChange} /> 
                                            <label className="form-check-label" htmlFor="animal">Animal</label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-12 col-md-8">
                                <div className="row">
                                    <input type="hidden" name="user-id" value={this.props.userId} />
                                    <input type="hidden" name="formHasUpload" value="true" />
                                    <input type="hidden" name="status" value="published" />
                                    <div className="form-group col-6"><button id="formSubmit" type="submit" className="btn btn-primary mr-2 btn-block">Create Project</button></div>
                                    <div className="form-group col-6">
                                        <Link to="/">
                                            <button className="btn btn-secondary btn-block">Cancel</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {this.state.selectedCategory === false ? formError : null}
                    </form>
                </div>
            </div>
            </React.Fragment>
        );
    }
}