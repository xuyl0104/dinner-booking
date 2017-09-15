import React, { Component } from 'react';
import './orderfooter.css';

class OrderFooter extends Component {
    render() {
        return (
            <div>
                <div className="footer">
                <span className="footer-brand text-center"
                onClick={this.onButtonClick.bind(this)}>{this.props.buttonName}</span>
                </div>
            </div>
        );
    }

    onButtonClick() {
        this.props.callBackSubmitOrder(); 
    }
    
}
  
  export default OrderFooter