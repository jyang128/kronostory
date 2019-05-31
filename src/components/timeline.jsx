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
            <div className="bg-light mt-4 py-3">
                <div className="title text-center">
                    <h1 className="mt-3">Timeline</h1>
                    <div>text here...</div>
                </div>
                <div className="px-5">
                    <Slider {...settings}>
                        {/* <div className="col">
                            <img src="https://bit.ly/2QC2RiM" className="img-fluid img-thumbnail" alt=""/>
                            Hamster
                        </div>
                        <div className='col'>
                            <img src="https://bit.ly/2QC2RiM" className="img-fluid img-thumbnail" alt=""/>
                            Hamster
                        </div>
                        <div className='col'>
                            <img src="https://bit.ly/2QC2RiM" className="img-fluid img-thumbnail" alt=""/>
                        </div>
                        <div className='col'>
                        <img src="https://bit.ly/2QC2RiM" className="img-fluid img-thumbnail" alt=""/>
                        </div>
                        <div className='col'>
                        <img src="https://bit.ly/2QC2RiM" className="img-fluid img-thumbnail" alt=""/>
                        </div>
                        <div className='col'>
                        <img src="https://bit.ly/2QC2RiM" className="img-fluid img-thumbnail" alt=""/>
                        </div> */}
                        {timelineEntries}
                    </Slider>
                </div>
            </div>
        )
    }
}