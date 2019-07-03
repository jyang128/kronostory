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
		if(event.target.className !== 'project-remove' && event.target.className !== 'item-remove' && event.target.className !== 'entry-remove'){
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
		else if(this.props.entryId){
			this.props.delete(this.props.entryId);
		}
        else{
            this.props.delete(this.props.projectData.id);
        }
	}
    render(){
        let deleteButtonStyle;
		let iconStyle = ["item-remove","project-remove","entry-remove"];

		if(this.state.showDelete){
			deleteButtonStyle = 'delete-button';
		} else {
			deleteButtonStyle = 'delete-button d-none';
		}
        return (
            <div className={iconStyle[this.props.styleOption]} onClick={this.toggleDeleteButton} >
                {this.props.icon}
                <div className={deleteButtonStyle} onClick={this.handleDelete} >
                    delete
                </div>
            </div>
        );
    }
}
