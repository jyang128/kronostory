import React from 'react';
import './layout.css';

export default class Footer extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="footer container">
              <div className="row">
                <div className="col-6">
                  <p>Copyright &copy; TitleHere 2019</p>
                </div>
                <div className="col-6">
                  <p>
                    <a href="#" className="mr-3" onClick={()=>{this.props.setView('catalog', {});}}>Home</a>
                    <a href="#" className="mr-3">About</a>
                    <a href="#" className="mr-3">Contact</a>
                    <a href="#" className="mr-3" onClick={()=>{this.props.setView('dashboard', {});}}>Account</a>
                  </p>
                </div>
              </div>
            </div>
            
        );
    }
}