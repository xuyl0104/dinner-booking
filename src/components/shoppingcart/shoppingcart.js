import React, { Component } from 'react';
import './shoppingcart.css';

class ShoppingCart extends Component {
    render() {
        let show = this.props.show;//是否显示出购物车界面
        let selectedItemInfo = this.props.selectedItemInfo;//所有菜
        let selectedCCItemInfo = selectedItemInfo.filter((item) => item.type === "cc");//炒菜
        let selectedTCItemInfo = selectedItemInfo.filter((item) => item.type === "tc");//套餐
        let selectedCCItemDivs = selectedCCItemInfo.map((item, index) => {
            return (
                <div className="item" key={index}>
                    <div className="left">
                        <span>{item.name}</span>
                    </div>
                    <div className="right">
                        <span>￥{item.price}</span>
                        <div className="remove" onClick={this.removeOne.bind(this, item)}>-</div>
                        <span className="num">{item.num}</span>
                        <div className="add" onClick={this.addOne.bind(this, item)}>+</div>
                    </div>
                </div>
            );
        });

        let selectedTCItemDivs = selectedTCItemInfo.map((item, index) => {
            return (
                <div className="item" key={index}>
                    <div className="left">
                        <span>{item.name}</span>
                    </div>
                    <div className="right">
                        <span>￥{item.price}</span>
                        <div className="remove" onClick={this.removeOne.bind(this, item)}>-</div>
                        <span className="num">{item.num}</span>
                        <div className="add" onClick={this.addOne.bind(this, item)}>+</div>
                    </div>
                </div>
            );
        });


        return (
            <div className={`${show === true ? 'hiddenDiv' : 'visibleDiv'}`}>
                <div className="header">
                    <span>购物车</span>
                    <div className="clear" onClick={this.clearCart.bind(this)}>
                        <img src={require("../../images/trash-bin-symbol.png")} alt=""></img>
                        <span>清空</span>
                    </div>
                </div>

                <div className="category" display="none">
                    <p className="categoryName">炒菜</p>
                    {selectedCCItemDivs}
                </div>  
                <div className="category">
                    <p className="categoryName">套餐</p>
                    {selectedTCItemDivs}
                </div>               
            </div>
        );
    }
    
    clearCart() {
        this.props.callBackClearCart();
    }

    addOne(item) {
        console.log(item);
        this.props.callBackAdd(item);        
    }

    removeOne(item) {
        console.log(item);
        this.props.callBackRemove(item);                
    }

}
  
  export default ShoppingCart