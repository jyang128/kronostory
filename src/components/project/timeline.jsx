import React from 'react';
import TimelineEntry from './timeline-entry';
import TimelineEntryForm from './timeline-entry-form';
import Slider from 'react-slick';
import './project.css';

export default class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.testCarousel = [
            {id: 1, img: 'https://bit.ly/2QC2RiM', product: 'Hamster'},
            {id: 2, img: 'https://bit.ly/2QC2RiM', product: 'Hamster'},
            {id: 3, img: 'https://bit.ly/2QC2RiM', product: 'Hamster'},
            {id: 4, img: 'https://bit.ly/2QC2RiM', product: 'Hamster'},
            {id: 5, img: 'https://bit.ly/2QC2RiM', product: 'Hamster'},
            {id: 6, img: 'https://bit.ly/2QC2RiM', product: 'Hamster'}
        ];
        this.state = {
            opened: false
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleOpen(){
        this.setState({
            opened: !this.state.opened
        });
        console.log('handling open');
    }
    handleClose(){
        if (event.target.className === 'overlay is-applied') {
            this.setState({
            opened: !this.state.opened
            });
        }
    }
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            swipeToSlide: true
        };

        const timelineEntries = this.testCarousel.map(step => <TimelineEntry key={step.id} image={step.img} product={step.product} />)

        let modalContent = null;
        let overlayStatus = null;
        if (!this.state.opened) {
            modalContent = 'modal-form';
            overlayStatus = 'overlay';
        } else {
        modalContent = 'modal-form is-open align-self-center';
        overlayStatus = 'overlay is-applied';
        }

        return (
            <React.Fragment>
            <div className="col-12 py-3 mb-4 text-center">
                <div className="mb-4">
                    <h3>Timeline</h3>
                    <div className="plus my-2" onClick={this.handleOpen}><i className="fas fa-plus-circle"></i> Add to Timeline
                    </div>
                </div>
                <div className="px-5">
                    <Slider {...settings}>
                        {timelineEntries}
                    </Slider>
                </div>
            </div>
            <div className={overlayStatus} onClick={this.handleClose}>
            <div className={modalContent}>
                <TimelineEntryForm/>
            </div>
            </div>
            </React.Fragment>
            
        )
    }
}