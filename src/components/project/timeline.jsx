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
            modalOpened: false
        }
        this.toggleModal = this.toggleModal.bind(this);
    }
    toggleModal(event){
        if(!this.state.modalOpened){
            this.setState({
                modalOpened: true
            });
        } else if (event.target.className === 'overlay' || event.target.className === 'fas fa-times') {
            this.setState({
                modalOpened: false
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
            swipeToSlide: true
        };
        const timelineEntries = this.props.entries.map((entry, index) => <TimelineEntry key={entry.timeline_id} entryData={this.props.entries[index]} />)

        return (
            <React.Fragment>
            <div className="col-12 py-3 mb-4">
                <div className="mb-4 text-center">
                    <h3>Timeline</h3>
                    <div className="plus my-2" onClick={this.toggleModal}><i className="fas fa-plus-circle"></i> Add to Timeline
                    </div>
                </div>
                <div className="px-5">
                    <Slider {...settings}>
                        {timelineEntries}
                    </Slider>
                </div>
            </div>
            <Modal isModalOpen={this.state.modalOpened} toggleModal={this.toggleModal}>
                <TimelineEntryForm />
            </Modal>
            </React.Fragment>
        )
    }
}