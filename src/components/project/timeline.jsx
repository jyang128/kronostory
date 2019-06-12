import React from 'react';
import TimelineEntry from './timeline-entry';
import Modal from '../layout/modal';
import TimelineEntryForm from './timeline-entry-form';
import Slider from 'react-slick';
import axios from 'axios';
import './project.css';

export default class Timeline extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            swipeToSlide: true,
            responsive: [
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 3,
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
        };
        const timelineEntries = this.props.entries.map((entry, index) => <TimelineEntry key={entry.timeline_id} entryData={this.props.entries[index]} />)

        let addToTimelineButton;
        if(this.props.userSeshData.id === this.props.project.user_id){
            addToTimelineButton = <div className="plus my-2" onClick={this.props.toggleTimelineModal}><i className="fas fa-plus-circle"></i> Add to Timeline
            </div>
        } else {
            addToTimelineButton = null;
        }

        return (
            <React.Fragment>
            <div className="col-12 py-3 mb-4">
                <div className="mb-4 text-center">
                    <h3>Timeline</h3>
                    <p>{this.props.project.timeline_description}</p>
                        {addToTimelineButton}
                </div>
                <div className="px-5">
                    <Slider {...settings}>
                        {timelineEntries}
                    </Slider>
                </div>
            </div>
                <Modal 
                    isModalOpen={this.props.timelineModalOpened} 
                    toggleModal={this.props.toggleTimelineModal}
                >
                    <TimelineEntryForm 
                        createNewEntry={this.props.createNewEntry}
                        project={this.props.project}
                    />
                </Modal>
            </React.Fragment>
        )
    }
}