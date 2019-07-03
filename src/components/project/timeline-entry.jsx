import React from 'react';
import DeleteDropdown from './delete-dropdown'
import './project.css';

export default class TimelineEntry extends React.Component {
    render() {
        let entryData = this.props.entryData;
        let primaryImg = entryData.timeline_primary_image;
        let deleteButton;

		if(this.props.userStatus) {
			if(this.props.userStatus.id === this.props.project.user_id){
                    deleteButton = (<DeleteDropdown 
                        delete={this.props.deleteItem} 
                        itemId={this.props.itemId} 
                        styleOption={2} 
                        delete={this.props.deleteEntry} 
                        entryId={this.props.entryId}
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
            <div className="timeline-entry p-2">
                <div style={imgStyle} className="timeline-entry-img" onClick={()=>this.props.toggleImageModal(entryData)}>
                </div>
                <h5 onClick={()=>this.props.toggleImageModal(entryData)}>{entryData.date}</h5>
                <h6 onClick={()=>this.props.toggleImageModal(entryData)}>{entryData.timeline_entry_title}</h6>
                <p onClick={()=>this.props.toggleImageModal(entryData)}>{entryData.timeline_description.length > 100 ? entryData.timeline_description.substring(0,100) + '...' : entryData.timeline_description}</p>
                {deleteButton}
            </div>
        )
    }
}
