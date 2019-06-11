import React from 'react';
import ProjectItem from './project-item';
import Slider from 'react-slick';
import ItemUsedEntryForm from './items-used-entry-form';
import Modal from '../layout/modal';
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
        let addToItemsUsedButton;
        if(this.props.userSeshData.id === this.props.project.user_id) {
            addToItemsUsedButton = (
                <div 
                    className="plus my-2" 
                    onClick={this.props.toggleItemsUsedModal}
                >
                    <i className="fas fa-plus-circle mx-1"></i>
                    Add to Items Used
                </div>
            )
        } else {
            addToItemsUsedButton = null;
        }

        return (
            <div className="col-12 py-3 mb-4">
                <div className="mb-4 text-center">
                    <h3>
                        Items Used
                    </h3>
                    {addToItemsUsedButton}
                </div>
                <div>
                    <Slider {...settings}>
                        {itemsUsed}
                    </Slider>
                </div>
                <Modal 
                    isModalOpen={this.props.itemsUsedModalOpened} 
                    toggleModal={this.props.toggleItemsUsedModal}
                >
                    <ItemUsedEntryForm
                        createNewItemEntry={this.props.createNewItemsUsed}
                        project={this.props.project}
                    />
                </Modal>
            </div>
        )
    }
}