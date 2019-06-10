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
            selectedCategory: false
        }
        this.projectInputField = 1;
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onFileChangeItem = this.onFileChangeItem.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.addAnotherProjectItem = this.addAnotherProjectItem.bind(this);
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
    onRadioChange() {
        this.setState({ selectedCategory: true });
    }
    addAnotherProjectItem() {
        
        if (this.projectInputField < 5) {

            let newInput = <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="proj-item-name">Project Item</label>
                                    <input id="proj-item-name" type="text" className="form-control mb-2" name="proj-item-name" placeholder="Item Name"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="proj-item-title">Item Image</label>
                                    <div className="custom-file">
                                        <label className="custom-file-label" htmlFor="proj-item-img">{this.state.itemFile ? this.state.itemFile.name : "Choose File"}</label>
                                        <input id="proj-item-img" name="proj-item-img" type="file" className="form-control-file" onChange={this.onFileChangeItem}/>
                                        <input id="projImgHasUpload" type="hidden" name="projImgHasUpload" value={this.state.projImgHasUpload} />
                                    </div>
                                </div>
                            </div>;
            var z = document.createElement('p');
            document.querySelector(".project-item-field").appendChild(newInput);

            this.projectInputField++;
        }
        
    }
    handleFormSubmit(event) {
        // need to check that inputs are all there & disable the button to extra submissions
        console.log("handle form submit");
        event.preventDefault();
        if (this.state.selectedCategory) {
            let formData = new FormData(event.target);
            this.props.createNewProject(formData);
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

                                <ul className={this.state.selectedCategory ? "list-group mb-4" : "list-group mb-4 border border-danger"}>
                                    <li className="list-group-item">
                                        <div className="radio-container">
                                            <input className="form-check-input" type="radio" id="art" name="proj-category" value="art" onChange={this.onRadioChange} /> <label className="form-check-label" htmlFor="art">Art</label>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="radio-container">
                                            <input className="form-check-input" type="radio" id="gardening" name="proj-category" value="gardening" onChange={this.onRadioChange} /> <label className="form-check-label" htmlFor="gardening">Gardening</label>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="radio-container">
                                            <input className="form-check-input" type="radio" id="technology" name="proj-category" value="technology" onChange={this.onRadioChange} /> <label className="form-check-label" htmlFor="technology">Technology</label>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="radio-container">
                                            <input className="form-check-input" type="radio" id="architecture" name="proj-category" value="architecture" onChange={this.onRadioChange} /> <label className="form-check-label" htmlFor="architecture">Architecture</label>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="radio-container">
                                            <input className="form-check-input" type="radio" id="animal" name="proj-category" value="animal" onChange={this.onRadioChange} /> <label className="form-check-label" htmlFor="animal">Animal</label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-12 col-md-8">
                                <div className="row">
                                    <input type="hidden" name="user-id" value={this.props.userId} />
                                    <input type="hidden" name="formHasUpload" value="true" />
                                    <input type="hidden" name="status" value="published" />
                                    <div className="form-group col-6"><button type="submit" className="btn btn-primary mr-2 btn-block">Create Project</button></div>
                                    <div className="form-group col-6">
                                        <Link to="/">
                                            <button className="btn btn-secondary btn-block">Cancel</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {this.state.selectedCategory ? null : formError}
                    </form>
                </div>
            </div>
            </React.Fragment>
        );
    }
}