import React from 'react';
import './project.css';

export default class ProjectItem extends React.Component {
    render() {
        let primaryImg = this.props.image;

        const imgStyle = {
			backgroundImage: 'url(' + (primaryImg ? primaryImg : "/images/placeholder-img.jpg") + ')'
        };
        return (
            <div className="px-2 text-center">
                <div className="project-item-img" style={imgStyle}></div>
                {this.props.product}
            </div>
        )
    }
}