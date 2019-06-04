import React from 'react';

export default class ChooseFile extends React.Component{
  constructor(props){
    super(props);
    this.fileInputRef = React.createRef();
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }
  handleButtonClick(event) {
    event.preventDefault();
    this.fileInputRef.current.click();
  }
  render(){
    return(
      <div className={this.props.dimensions === "wide" ? "col-7" : "col-6"}>
        <button className={"btn-primary "+this.props.dimensions} onClick={this.handleButtonClick}>Choose File</button>
        <input
          ref={this.fileInputRef}
          style={{ display: "none" }}
          type="file"
          name="image"
        />
      </div>
    );
  }
}