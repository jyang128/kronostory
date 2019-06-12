import React from 'react';
import './project.css';

export default class ProjectItem extends React.Component {
    render() {
        let primaryImg = this.props.image;
        return (
            <div className="text-center">
                <img src={primaryImg ? primaryImg : "/images/placeholder-img.jpg"} className="used-item-height" alt="product" />
                {this.props.product}
            </div>
        )
    }
} 