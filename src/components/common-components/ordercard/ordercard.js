import React, { Component } from 'react';
import './ordercard.css';

class OrderCard extends Component {
    render() {
        let item = this.props.item;
        return (
            <div className="orderCard">
                <div className="orderImageblock">
                    <img src={require("../../../images/TC.png")} alt=""></img>
                </div>
                <div className="itemInfo">
                    <label className="itemName">{item.name}</label>
                    <p className="itemContent">精选五花肉、白菜、干豆角、粉丝、木耳、油菜、米饭、汤</p>
                    <div className="itemPrice">¥{item.price}</div>
                </div>
                <div className="addToCart"><span>&times;{item.num}</span></div>
            </div>
        );
    }
  }
  
  export default OrderCard