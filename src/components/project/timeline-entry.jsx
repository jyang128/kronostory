import React from 'react';
import './project.css';

export default class TimelineEntry extends React.Component {
    render() {
        let entryData = this.props.entryData;
        let primaryImg = entryData.timeline_primary_image;

        const imgStyle = {
			backgroundImage: 'url(' + (primaryImg ? primaryImg : "/images/placeholder-img.jpg") + ')'
        };
        
        return (
            <div className="timeline-entry p-2" onClick={()=>this.props.toggleImageModal(entryData)}>
                <div style={imgStyle} className="timeline-entry-img"></div>
                <h5>{entryData.date}</h5>
                <h6>{entryData.timeline_entry_title}</h6>
                <p>{entryData.timeline_description.length > 100 ? entryData.timeline_description.substring(0,100) + '...' : entryData.timeline_description}</p>
            </div>
        )
    }
}