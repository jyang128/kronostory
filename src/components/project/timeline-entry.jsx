import React from 'react';
import './project.css';

export default class TimelineEntry extends React.Component {
    render() {
        let entryData = this.props.entryData;
        let primaryImg = entryData.timeline_primary_image;
        return (
            <div className="col">
                <img src={primaryImg ? primaryImg : "/images/placeholder-img.jpg"} className="img-fluid img-thumbnail mb-2" alt="timeline entry"/>
                <h5>{entryData.date}</h5>
                <h6>{entryData.timeline_entry_title}</h6>
                <p>{entryData.timeline_description}</p>
            </div>
        )
    }
}