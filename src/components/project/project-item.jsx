import React from 'react';
import DeleteDropdown from './delete-dropdown'
import './project.css';

export default class ProjectItem extends React.Component {
    render() {
        let primaryImg = this.props.image;
        let deleteButton;

		if(this.props.userStatus) {
			if(this.props.userStatus.id === this.props.projectData.user_id){
                    deleteButton = (<DeleteDropdown 
                        delete={this.props.deleteItem} 
                        itemId={this.props.itemId} 
                        styleOption={0}
                        icon={String.fromCharCode(215)}
                    />);
			}
		} else {
			deleteButton = null;
		}

        const imgStyle = {
			backgroundImage: 'url(' + (primaryImg ? primaryImg : "/images/placeholder-img.jpg") + ')'
        };
        return (
            <div className="item-container px-2 text-center">
                <div className="project-item-img" style={imgStyle}></div>
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">{this.props.product}</div>
                        {deleteButton}
                    </div>
                </div>
            </div>
        )
    }
}
