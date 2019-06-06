import React from 'react';
import TimelineEntry from './timeline-entry';
import TimelineEntryForm from './timeline-entry-form';
import Slider from 'react-slick';
import './project.css';

export default class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleOpen(){
        this.setState(prevState => ({
            modal: !prevState.modal
          }));
        // this.setState({
        //     opened: !this.state.opened
        // });
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
                    <div className="plus my-2" onClick={this.handleOpen}><i className="fas fa-plus-circle"></i> Add to Timeline
                    </div>
                </div>
                <div className="px-5">
                    <Slider {...settings}>
                        {timelineEntries}
                    </Slider>
                </div>
            </div>
            <TimelineEntryForm toggle={this.handleOpen} modal={this.state.modal}/>
            </React.Fragment>
        )
    }
}