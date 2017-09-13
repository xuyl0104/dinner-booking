import React, { Component } from 'react';
import './listview.css';

class Listview extends Component {
    constructor(props) {
        super(props);
        this.state = this.props;
    }
    render() {
      return (
        <div className="form-group" onClick={this.props.onClick}>
            <label>{this.props.name}</label>
                <span className="pull-right" >
                    <img className="arrowImage" src={require("../../../images/arrowright-large.png")} alt=""
                    ></img>
                </span>
        </div>
      );
    }
}
  
  export default Listview