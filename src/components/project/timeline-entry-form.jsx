import React from 'react';
import './project.css';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Col } from 'reactstrap';

export default class TimelineEntryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            image: null
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }
    handleSubmitPress(event){
        event.preventDefault();
        console.log('submitting entry', this.state);
    }
    onChangeHandler(event){
        switch(event.target.id){
            case "inputTitle":
                this.setState({title: event.target.value});
                break;
            case "inputDescription":
                this.setState({description: event.target.value});
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="col-8 offset-2 text-center align-self-center">
                    <form className="my-4" onSubmit={event => this.handleSubmitPress(event)}>
                    <h2>New Timeline Entry</h2>
                    <div className="form-group">
                        <label>Give it a short title</label>
                        <input type="text" 
                        id="inputTitle"
                        value={this.state.title}className="form-control" placeholder="Enter Title"
                        onChange={this.onChangeHandler}
                    />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                        id="inputDescription"
                        value={this.state.description}
                        className="form-control" placeholder="Summary of the project."
                        onChange={this.onChangeHandler}></textarea>
                    </div>
                    <div className="form-group">
                        <label>Main Image</label>
                        <input 
                            type="file" 
                            className="form-control-file"/>
                    </div>
                    <button type="submit" className="btn btn-primary mr-2" >Submit</button>
                    </form>
            </div>
            </React.Fragment>
        );
    }
}
