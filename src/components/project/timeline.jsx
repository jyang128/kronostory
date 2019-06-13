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
    toggleImageModal(entryData){
        console.log("modal thing", entryData);
        if(!this.state.modalOpened) {
            this.setState({
                modalOpened: true,
                imageClicked: entryData
            }, ()=> console.log(this.state.imageClicked));
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

        var element = document.getElementById("body");
        this.state.modalOpened ? element.classList.add("overflow-hidden") : element.classList.remove("overflow-hidden");

        return (
            <React.Fragment>
            <div className="col-12 py-3 mb-4">
                <div className="mb-4 text-center">
                    <h3>Timeline</h3>
                    <p>{this.props.project.timeline_description}</p>
                        {addToTimelineButton}
                </div>
                <div className="px-3">
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
                            <h5 className="text-center">{this.state.imageClicked.date}</h5>
                            <img src={`${this.state.imageClicked.timeline_primary_image}`} className="modal-image"/>
                            <div className="timeline-modal-info">
                                <h4>{this.state.imageClicked.timeline_entry_title}</h4>
                                <p>{this.state.imageClicked.timeline_description}</p>
                            </div>
                        </div>
                    }
                />

            </React.Fragment>
        )
    }
}