import React from 'react';
import './project.css';

export default class ProjectItem extends React.Component {
    render() {
        return (
            <div className="col">
                <img src={this.props.image} className="img-thumbnail used-item-height" alt="product" />
                {this.props.product}
            </div>
        )
    }
} 