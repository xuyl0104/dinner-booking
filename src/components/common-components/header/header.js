import React, { Component } from 'react';
import './header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = this.props;
    }
    render() {
      return (
        <header className="navbar text-center">
            <img id="quitOut" src={require("../../../images/arrowback-large.png")} alt="" className="pull-left arrowback"
            onClick={this.props.onLeftArrowClick}></img>
            <span className="navbar-brand header-title-center">{this.props.name}</span>
        </header>
      );
    }
  }
  
  export default Header