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
    }
    handleSubmitPress(event){
        event.preventDefault();
        console.log('submitting entry', this.state);
    }
    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} size="lg">
            <ModalHeader toggle={this.props.toggle}></ModalHeader>
            <ModalBody>
            <Col xs={{size: 8, offset: 2}} className="text-center align-self-center">
                <h2>New Timeline Entry</h2>
                <Form className="my-4" onSubmit={event => this.handleSubmitPress(event)}>
                    <FormGroup>
                        <Label>Give it a short title</Label>
                        <Input 
                            type="text" 
                            className="form-control" 
                            placeholder="Enter Title"
                        />
                        <small className="form-text text-muted">Make it sound cool! Maximum 60 characters.</small>
                    </FormGroup>
                    <FormGroup>
                        <Label>Summary</Label>
                        <Input 
                            type="textarea" 
                            className="form-control" 
                            placeholder="Summary of the project."
                        />
                        <small className="form-text text-muted">A short description that says it all. Maximum 140 characters.</small>
                    </FormGroup>
                    <FormGroup>
                        <Label>Main Image</Label>
                        <Input 
                            type="file" 
                            className="form-control-file"
                        />
                    </FormGroup>
                    <Button type="submit" color="primary" className="mr-2" >Submit</Button>
                </Form>
            </Col>
            </ModalBody>
            </Modal>
        );
    }
}
