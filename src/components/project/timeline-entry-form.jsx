import React from 'react';
import './project.css';

export default class TimelineEntryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: '',
            description: '',
            imageFile: null,
            fileAttached: false,
            mainProjectImageLimit: false,
            mainProjectImageType: false
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
        this.formSubmitHandler = this.formSubmitHandler.bind(this);
    }
    fileUploadHandler(event){
        console.log('timeline entry image file: ', event.target.files[0]);
        this.setState({mainProjectImageLimit: false, mainProjectImageType: false});
        if(event.target.files[0]){
            this.setState({
                imageFile: event.target.files[0],
                fileAttached: true
            },()=>{
                if(this.state.imageFile.name.length >= 100){
                    this.setState({mainProjectImageLimit: true});
                }
                let fileExtension = this.state.imageFile.name.substr(this.state.imageFile.name.length - 4);
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
            this.setState({
                imageFile: '',
                fileAttached: false
            })
        }
    }
    formSubmitHandler(event){
        event.preventDefault();
        if(!this.state.mainProjectImageType && !this.state.mainProjectImageLimit){
            let formData = new FormData(event.target);
            this.props.createNewEntry(formData);
        }
    }
    onChangeHandler(event){
        switch(event.target.id){
            case "inputTitle":
                this.setState({title: event.target.value});
                break;
            case "inputDate":
                this.setState({date: event.target.value});
                break;
            case "inputDescription":
                this.setState({description: event.target.value});
        }
    }
    render() {
        const mainProjectImageError = <div className="form-error">
                <p className="text-danger">Main project image has a 100 character limit. Currently, it has {this.state.imageFile ? this.state.imageFile.name.length : "" }</p>
            </div>;
        const mainProjectImageTypeError = <div className="form-error">
                <p className="text-danger">Main project image needs to be of type JPG/PNG/GIF</p>
            </div>;
        return (
            <div className="col-12 col-md-8 offset-md-2 align-self-center">
                <form className="my-4" onSubmit={this.formSubmitHandler}>
                <h2 className="text-center mb-4">New Timeline Entry</h2>
                <div className="form-group">
                    <label>Give it a short title</label>
                    <input
                        type="text"
                        id="inputTitle"
                        name="inputTitle"
                        value={this.state.title}
                        className="form-control"
                        placeholder="Enter Title"
                        onChange={this.onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="text"
                        id="inputDate"
                        name="inputDate"
                        value={this.state.date}
                        className="form-control"
                        placeholder="Enter Date"
                        onChange={this.onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        id="inputDescription"
                        name="inputDescription"
                        value={this.state.description}
                        className="form-control"
                        rows="5"
                        placeholder="Summary of the entry."
                        onChange={this.onChangeHandler}>
                    </textarea>
                </div>
                <div className="form-group">
                    <label>Choose an Image</label>
                    {this.state.mainProjectImageLimit ? mainProjectImageError : null}
                    {this.state.mainProjectImageType ? mainProjectImageTypeError : null}
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
