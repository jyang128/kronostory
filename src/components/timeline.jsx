import React from 'react';
import TimelineEntry from './timeline-entry';
import Slider from 'react-slick';

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
        ]
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

        return (
            <React.Fragment>
            <div className="col-12 py-3 mb-4">
                <div className="mb-4 text-center">
                    <h3>Timeline</h3>
                    <div className="plus my-2"><i className="fas fa-plus-circle"></i> Add to Timeline</div>
                </div>
                <div className="px-5">
                    <Slider {...settings}>
                        {timelineEntries}
                    </Slider>
                </div>
            </div>
            </React.Fragment>
            
        )
    }
}