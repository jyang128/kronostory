import React from 'react';

export default class Modal extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        if(this.props.isModalOpen){
            let modalBody = this.props.children;
            return(
                <div className="overlay" onClick={this.props.toggleModal}>
                    <div className="modal-body align-self-center col-10 col-md-6">
                        {modalBody}
                        <div className="close-modal" onClick={this.props.toggleModal}><i class="fas fa-times"></i></div>
                    </div>
                </div>
            );    
        } else {
            return null;
        }
    }
}