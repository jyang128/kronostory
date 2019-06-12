import React from 'react';
import TimelineEntry from './timeline-entry';
import Modal from '../layout/modal';
import TimelineEntryForm from './timeline-entry-form';
import Slider from 'react-slick';
import './project.css';

export default class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpened: false,
            imageClicked: ''
        }
        this.toggleImageModal = this.toggleImageModal.bind(this);
    }
    toggleImageModal(event){
        if(!this.state.modalOpened) {
            this.setState({
                modalOpened: true,
                imageClicked: `${event.target.getAttribute('src')}`
            });
        } else if (event.target.className === 'overlay' || event.target.className === 'fas fa-times') {
            this.setState({
                modalOpened: false,
                imageClicked: ''
            });
        }
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
        const timelineEntries = this.props.entries.map((entry, index) => 
            <TimelineEntry 
                key={entry.timeline_id} 
                entryData={this.props.entries[index]} 
                toggleImageModal={this.toggleImageModal}
            />)

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
                <Modal
                    isModalOpen={this.state.modalOpened} 
                    toggleModal={this.toggleImageModal}
                    children={
                        <div className="col-12 col-lg-10 offset-lg-1">
                            <img src={`${this.state.imageClicked}`} className="modal-image"/>
                        </div>
                    }
                />

            </React.Fragment>
        )
    }
}