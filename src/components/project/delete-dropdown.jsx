import React from 'react';

export default class ProjectCard extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showDelete: false
		}
		this.handleDelete = this.handleDelete.bind(this);
		this.toggleDeleteButton = this.toggleDeleteButton.bind(this);
		this.closeDropdown = this.closeDropdown.bind(this);
	}
	componentDidMount(){
		document.addEventListener('click', this.closeDropdown)
	}
	componentWillUnmount(){
		document.removeEventListener('click', this.closeDropdown)
	}
	closeDropdown(event){
		if(event.target.className !== 'dots' && event.target.className !== 'dots-relative'){
			this.setState({showDelete: false})
		}
	}
	toggleDeleteButton(){
		this.setState({showDelete: !this.state.showDelete})
	}
	handleDelete(){
		this.toggleDeleteButton();
        if(this.props.itemId){
            this.props.delete(this.props.itemId);
        }
        else{
            this.props.delete(this.props.projectData.id);
        }
	}
    render(){
        let deleteButtonClass;

		if(this.state.showDelete){
			deleteButtonClass = 'delete-button';
		} else {
			deleteButtonClass = 'delete-button d-none';
		}
        return (
        <div>
            <div className={this.props.absolute ? "dots" : "dots-relative"} onClick={this.toggleDeleteButton} >
                ...
                <div className={deleteButtonClass} onClick={this.handleDelete} >
                    delete
                </div>
            </div>
        </div>
        );
    }
}
