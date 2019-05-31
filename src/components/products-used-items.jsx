import React from 'react';

export default class ProductsUsedItems extends React.Component {
    render() {
        return (
            <div className="col">
                <img src={this.props.image} className="img-thumbnail used-item-height" alt="product" />
                {this.props.product}
            </div>
        )
    }
}