import React from 'react';

export default class ProductsUsedItems extends React.Component {
    render() {
        return (
            <div className="col-5">
                <img src={this.props.image} className="img-thumbnail" alt="product" />
                {this.props.product}
            </div>
        )
    }
}