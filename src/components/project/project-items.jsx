import React from 'react';
import ProjectItem from './project-item';
import Slider from 'react-slick';
import './project.css';


export default class ProjectItems extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            swipeToSlide: true,
            variableWidth: false
        };

        const itemsUsed = this.props.items.map(item => 
            <ProjectItem key={item.project_item_id} image={item.project_item_image} product={item.project_item_title} />
        )

        return (
            <div className="col-12 py-3 mb-4">
                <h3 className="mb-4 text-center">
                    Items Used
                </h3>
                <div>
                <Slider {...settings}>
                    {itemsUsed}
                </Slider>
                </div>
            </div>
        )
    }
}