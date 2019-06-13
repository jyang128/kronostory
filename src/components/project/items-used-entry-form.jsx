import React from 'react';
import './project.css';

export default class ItemUsedEntryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            imageFile: null,
            fileAttached: false
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
        this.formSubmitHandler = this.formSubmitHandler.bind(this);
    }
    fileUploadHandler(event){
        if(event.target.files[0]){
            this.setState({
                imageFile: event.target.files[0],
                fileAttached: true
            }) 
        } else {
            this.setState({
                imageFile: '',
                fileAttached: false
            })
        }
    }
    formSubmitHandler(event){
        event.preventDefault();
        let formData = new FormData(event.target);
        this.props.createNewItemEntry(formData);
    }
    onChangeHandler(event){
        this.setState({title: event.target.value});
    }
    render() {
        return (
            <div className="col-12 col-md-8 offset-md-2 align-self-center">
                <form className="my-4" onSubmit={this.formSubmitHandler}>
                <h2 className="text-center mb-4">New Item Used</h2>
                <div className="form-group">
                    <label>Item Name</label>
                    <input 
                        type="text" 
                        id="inputTitle"
                        name="inputTitle"
                        value={this.state.title}
                        className="form-control" 
                        placeholder="Enter Item Name"
                        onChange={this.onChangeHandler}
                    />
                </div>

                <div className="form-group">
                    <label>Choose an Image</label>
                    <div className="custom-file">
                        <input 
                            type="file" 
                            className="form-control-file" 
                            id="entry-img"
                            name="entry-img"
                            onChange={this.fileUploadHandler}
                        />
                        <label className="custom-file-label" htmlFor="entry-img">{this.state.imageFile ? this.state.imageFile.name : "Choose file up to 4MB"}</label>
                        <input 
                            id="imgAttached" type="hidden" name="imgAttached" value={this.state.fileAttached} 
                        />
                        <small className="text-muted">Recommended: Square size images</small>
                    </div>
                </div>
                <input type="hidden" name="project-id" value={this.props.project.id} />
                <input type="hidden" name="user-id" value={this.props.project.user_id} />
                <button type="submit" className="btn btn-primary mr-2" >Submit</button>
                </form>
            </div>
        );
    }
}
