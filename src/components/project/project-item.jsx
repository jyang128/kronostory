import React from 'react';
import DeleteDropdown from './delete-dropdown'
import './project.css';

export default class ProjectItem extends React.Component {
    componentDidMount(){
      console.log("project data:",this.props.projectData);
    }
    render() {
        let primaryImg = this.props.image;
        let deleteButton;

		if(this.props.userStatus) {
			if(this.props.userStatus.id === this.props.projectData.user_id){
					deleteButton = <DeleteDropdown delete={this.props.deleteItem} itemId={this.props.itemId}/>;
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
                        <div className="col-9 text-right">{this.props.product}</div>
                        <div className="col-3">{deleteButton}</div>
                    </div>
                </div>
            </div>
        )
    }
}
