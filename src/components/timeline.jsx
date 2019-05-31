import React from 'react';
import Slider from 'react-slick';

export default class Timeline extends React.Component {
    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
          };

        return (
            <div className="timeline-background w-100">
                <div className="title text-center text-white">
                    <h1 className="mt-3">Timeline</h1>
                    <div>text here...</div>
                </div>
                <div className="px-5">
                <Slider {...settings}>
                    <div>
                    <img src="https://bit.ly/2QC2RiM" className="img-fluid" alt=""/>
                    Hamster
                    </div>
                    <div>
                    <img src="https://bit.ly/2QC2RiM" className="img-fluid" alt=""/>
                    Hamster
                    </div>
                    <div>
                    <img src="https://bit.ly/2QC2RiM" className="img-fluid" alt=""/>
                    </div>
                    <div>
                    <img src="https://bit.ly/2QC2RiM" className="img-fluid" alt=""/>
                    </div>
                    <div>
                    <img src="https://bit.ly/2QC2RiM" className="img-fluid" alt=""/>
                    </div>
                    <div>
                    <img src="https://bit.ly/2QC2RiM" className="img-fluid" alt=""/>
                    </div>
                </Slider>
                </div>
            </div>
        )
    }
}