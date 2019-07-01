import React from 'react';
import './forms.css';
import { Link } from 'react-router-dom';
import auth from '../../hoc/auth';

class CreateProjectForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            projName: '',
            projDesc: '',
            projTimelineDesc: '',
            mainFile: '',
            mainImgHasUpload: false,
            projImgHasUpload: false,
            selectedCategory: '',
            projNameLimit: false,
            timelineDescLimit: false,
            mainProjectImageLimit: false,
            mainProjectImageType: false
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }
    onTextChange(event) {
        event.preventDefault();
        const value = event.currentTarget.value;
        const fieldName = event.currentTarget.attributes[3].nodeValue;
        if(fieldName === 'projTimelineDesc' && value.length > 140) {
            this.setState({ [fieldName]: value, timelineDescLimit: true});
        } else if (fieldName === 'projName' && value.length > 45) {
            this.setState({ [fieldName]: value, projNameLimit: true});
        } else if (fieldName === 'projName' && value.length <= 45) {
            this.setState({ [fieldName]: value, projNameLimit: false});
        } else if (fieldName === 'projTimelineDesc' && value.length <= 140) {
            this.setState({ [fieldName]: value, timelineDescLimit: false});
        } else {
            this.setState({[fieldName]: value});
        }
    }
    onFileChange(e) {
        this.setState({mainProjectImageLimit: false, mainProjectImageType: false});
        if (e.target.files[0] !== undefined) {
            this.setState({ mainFile:e.target.files[0], mainImgHasUpload: true },()=>{
                if(this.state.mainFile.name.length >= 100){
                    this.setState({mainProjectImageLimit: true});
                }
                let fileExtension = this.state.mainFile.name.substr(this.state.mainFile.name.length - 4);
                switch(fileExtension){
                    case ".jpg":
                    case ".png":
                    case ".gif":
                    case "jpeg":
                        break;
                    default:
                        this.setState({mainProjectImageType: true});
                }
            });
        } else {
            this.setState({mainFile:'', mainImgHasUpload: false });
        }
    }
    onRadioChange(event) {
        this.setState({ selectedCategory: event.target.id.toString() });

    }
    handleFormSubmit(event) {
        if(this.state.selectedCategory === '') {
            this.setState({ selectedCategory: false })
        }
        event.preventDefault();
        if (this.state.selectedCategory && !this.state.timelineDescLimit && !this.state.mainProjectImageLimit && !this.state.mainProjectImageType && !this.state.projNameLimit) {
            let formData = new FormData(event.target);
            this.props.createNewProject(formData);
            document.getElementById("formSubmit").disabled = true;
        }

    }
    render(){
        let formError = <div className="form-error">
                <p className="text-danger">Please choose a category</p>
            </div>;
        const timelineDescError = <div className="form-error">
                <p className="text-danger">Timeline description has a 140 character limit. Currently, it is {this.state.projTimelineDesc.length}</p>
            </div>;
        const projNameError = <div className="form-error">
                <p className="text-danger">Project name has a 45 character limit. Currently, it is {this.state.projName.length}</p>
            </div>;
        const mainProjectImageError = <div className="form-error">
                <p className="text-danger">Main project image has a 100 character limit. Currently, it has {this.state.mainFile.name ? this.state.mainFile.name.length : "" }</p>
            </div>;
        const mainProjectImageTypeError = <div className="form-error">
                <p className="text-danger">Main project image needs to be of type JPG/PNG/GIF</p>
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
                                    {this.state.projNameLimit ? projNameError : null}
                                    <input
                                        id="proj-name"
                                        name="proj-name"
                                        type="text"
                                        field="projName"
                                        className="form-control"
                                        placeholder="Enter Project Name"
                                        onChange={this.onTextChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="proj-desc">Main Description</label>
                                    <textarea
                                        id="proj-desc"
                                        name="proj-desc"
                                        className="form-control"
                                        field="projDesc"
                                        placeholder="Summary of your project."
                                        onChange={this.onTextChange}
                                        required
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="proj-timeline-desc">Describe your timeline</label>
                                    {this.state.timelineDescLimit ? timelineDescError : null}
                                    <textarea
                                        id="proj-timeline-desc"
                                        name="proj-timeline-desc"
                                        className="form-control"
                                        field="projTimelineDesc"
                                        placeholder="A short description about your timeline."
                                        onChange={this.onTextChange}
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="proj-main-img">Main Project Image</label>
                                    {this.state.mainProjectImageLimit ? mainProjectImageError : null}
                                    {this.state.mainProjectImageType ? mainProjectImageTypeError : null}
                                    <div className="custom-file">
                                        <label className="custom-file-label" htmlFor="proj-main-img">{this.state.mainFile ? this.state.mainFile.name : "Choose JPG/PNG/GIF file up to 4MB"}</label>
                                        <input id="proj-main-img" type="file" className="form-control-file" name="proj-main-img" onChange={this.onFileChange}/>
                                        <input id="mainImgHasUpload" type="hidden" name="mainImgHasUpload" value={this.state.mainImgHasUpload} />
                                    </div>
                                    <p className={this.state.emailEmpty ? "text-danger" : "text-danger d-none"}>{this.state.emailEmpty}</p>
                                </div>
                                <hr />
                            </div>
                            <div className="col-12 col-md-4">
                                <h5>Categories</h5>
                                <h6 className="font-weight-light">Select one category.</h6>
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
                                {this.state.selectedCategory === false ? formError : null}
                            </div>
                            <div className="col-12 col-md-8">
                                <div className="row">
                                    <input type="hidden" name="user-id" value={this.props.userId} />
                                    <input type="hidden" name="formHasUpload" value="true" />
                                    <input type="hidden" name="status" value="published" />
                                    <div className="form-group col-6">
                                        <button id="formSubmit" type="submit" className="btn btn-primary mr-2 btn-block">Create Project</button>
                                    </div>
                                    <div className="form-group col-6">
                                        <Link to="/">
                                            <button className="btn btn-secondary btn-block">Cancel</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

export default auth(CreateProjectForm);
