import React from 'react';

export default class CreateProjectForm extends React.Component {
    constructor(props){
        super(props);
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
                                    <label for="exampleFormControlFile1">Main Image</label>
                                    <input type="file" className="form-control-file"/>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label for="exampleFormControlFile1">Add Item</label>
                                        <input type="text" className="form-control mb-2" placeholder="Item Name"/>
                                        <input type="file" className="form-control-file"/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label for="exampleFormControlFile1">Add Item</label>
                                        <input type="text" className="form-control mb-2" placeholder="Item Name"/>
                                        <input type="file" className="form-control-file"/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label for="exampleFormControlFile1">Add Item</label>
                                        <input type="text" className="form-control mb-2" placeholder="Item Name"/>
                                        <input type="file" className="form-control-file"/>
                                    </div>
                                </div>
                                <div>
                                    <button className="btn btn-primary mb-2">+ Add Another</button>   
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
            </React.Fragment>
        );
    }
}