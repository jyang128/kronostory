import React from 'react';
import ChooseFile from './choose-file';

export default class CreateProjectForm extends React.Component {
    constructor(props){
        super(props);
    }
    handleSubmitPress(event) {
        event.preventDefault();
        this.props.setView('projectDetails', {});
    }
    handleCancel(event) {
        event.preventDefault();
        this.props.setView('dashboard', {});
    }
    render(){
        return(
            <React.Fragment>
                    <div className="row">
                        <div className="col-12">
                            <h2 className="text-center">Create Project</h2>
                            <p>Show off your latest projects! Bacon ipsum dolor amet pork belly bacon cupim biltong fatback, hamburger drumstick t-bone. Sausage flank venison, tri-tip pancetta sirloin tongue beef ribs ham hock rump. </p>
                        </div>
                    </div>
                    <div className="row">
                      <div className="col-9">
                        <div className="container">
                          <div className="row">
                            <div className="col-6 offset-3">
                              <h3>Describe your project</h3>
                                <form className="my-4">
                                    <div className="form-group row">
                                        <label className="project-label">Title</label>
                                        <input type="text" className="form-control wide-text" placeholder="Enter Title"/>
                                        <small className="form-text text-muted">Make it sound cool! Maximum 60 characters.</small>
                                    </div>
                                    <div className="form-group row">
                                        <label className="project-label">Summary</label>
                                        <textarea className="form-control wide-text" placeholder="Summary of the project."></textarea>
                                        <small className="form-text text-muted">A short description that says it all. Maximum 140 characters.</small>
                                    </div>
                                    <div className="form-group row">
                                        <label className="project-label">Main Image</label>
                                        <ChooseFile dimensions="wide"/>
                                        <small className="form-text text-muted">Add a main image for this project</small>
                                    </div>
                                    <hr />
                                    <div className="form-row">
                                        <div className="form-group row">
                                          <div className="col-9">
                                            <label className="project-label">Add Item</label>
                                              <input type="text" className="form-control mb-2" placeholder="Item Name"/>
                                          </div>
                                          <div className="col-3">
                                              <ChooseFile dimensions="narrow"/>
                                          </div>
                                        </div>
                                        <div className="form-group row">
                                          <div className="col-9">
                                            <label className="project-label">Add Item</label>
                                              <input type="text" className="form-control mb-2" placeholder="Item Name"/>
                                          </div>
                                          <div className="col-3">
                                              <ChooseFile dimensions="narrow"/>
                                          </div>
                                        </div>
                                        <div className="form-group row">
                                          <div className="col-9">
                                            <label className="project-label">Add Item</label>
                                              <input type="text" className="form-control mb-2" placeholder="Item Name"/>
                                          </div>
                                          <div className="col-3">
                                              <ChooseFile dimensions="narrow"/>
                                          </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="btn btn-primary mb-2">+ Add Another</button>  
                                    </div>
                                    <hr />
                                  <button type="submit" className="btn btn-primary mr-2" onClick={event => this.handleSubmitPress(event)}>Create Project</button>
                                  <button type="submit" className="btn btn-primary" onClick={event => this.handleCancel(event)}>Cancel</button>
                                </form>
                              </div>
                            </div>
                        </div>
                      </div>
                      <div className="col-3">
                        <h3>Categories</h3>
                        <div className="container">
                          <div className="row">
                            <div className="col-12 white">
                              <input type="checkbox" class="form-check-input" id="Check1" />
                              <p>Art</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 white">
                              <input type="checkbox" class="form-check-input" id="Check2" />
                              <p>Gardening</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 white">
                              <input type="checkbox" class="form-check-input" id="Check3" />
                              <p>Technology</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 white">
                              <input type="checkbox" class="form-check-input" id="Check4" />
                              <p>Architecture</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 white">
                              <input type="checkbox" class="form-check-input" id="Check5" />
                              <p>Pets</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
            </React.Fragment>
        );
    }
}