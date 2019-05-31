import React from 'react';
import ProductsUsedItems from './products-used-items';

export default class ProductsUsed extends React.Component {
    constructor(props) {
        super(props);
        this.testArray = [
            {id: 1, img: 'https://bit.ly/2QxSRa4', product: 'Meat'},
            {id: 2, img: 'https://bit.ly/2K9Hx2O', product: 'Cheese'},
            {id: 3, img: 'https://bit.ly/2Z3Cbud', product: 'Cinnamon'},
            {id: 4, img: 'https://bit.ly/2QC2RiM', product: 'Hamster'}
        ]
    }
    render() {
        const usedItems = this.testArray.map(item => 
            <ProductsUsedItems key={item.id} image={item.img} product={item.product} />
        )

        return (
            <div className="col-4 bg-light">
                <h3>Products used:</h3>
                <div className="prod-sidebar">
                    <div className="row">
                        {usedItems}
                    </div>
                </div>
            </div>
        )
    }
}