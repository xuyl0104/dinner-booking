import React, { Component } from 'react';
import './itemcard.css';

class ItemCard extends Component {
    render() {
        let info = this.props.item;
        return (
            <div className="itemCard">
                <div className="imageblock">
                    <img src={require("../../../images/CC.png")} alt=""></img>
                </div>
                <div className="itemInfo">
                    <span className="isSpecial">特色</span>
                    <label className="itemName">{this.props.item.name}</label>
                    <p className="itemContent">精选五花肉、白菜、干豆角、粉丝、木耳、油菜、米饭、汤</p>
                    <div className="itemPrice">¥{this.props.item.price}</div>
                </div>
                <div className="addToCart" onClick={this.onAddButtonClick.bind(this, this.props.item)}><span>+</span></div>
            </div>
        );
    }

    onAddButtonClick(index) {
        this.props.callBackParent(index);
        // console.log("add to cart" + index);
    }
  }
  
  export default ItemCard