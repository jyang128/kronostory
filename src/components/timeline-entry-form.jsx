import React from 'react';

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
        console.log('submitting entry');
    }
    render() {
        return (
            <React.Fragment>
            <div className="col-8 offset-2 text-center align-self-center">
                <h2>New Timeline Entry</h2>
                <form className="my-4" onSubmit={event => this.handleSubmitPress(event)}>
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
                        <input type="file" className="form-control-file"/>
                    </div>
                    <button type="submit" className="btn btn-primary mr-2" >Submit</button>
                </form>
            </div>
            </React.Fragment>
        );
    }
}
