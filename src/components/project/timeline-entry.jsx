import React from 'react';
import './project.css';

export default class TimelineEntry extends React.Component {
    render() {
        return (
            <div className="col">
                <img src={this.props.image} className="img-fluid img-thumbnail" alt=""/>
                {this.props.product}
            </div>
        )
    }
}