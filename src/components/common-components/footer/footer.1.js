import React, { Component } from 'react';
import './footer.css';

/**
 * 备份用的，不用关心
 */
class Footer extends Component {
    render() {
        let selectedItemInfo = this.props.selectedItemInfo;
        //商品件数
        let numOfItems = this.getNumOfItems(selectedItemInfo);
        //商品总金额
        let sumOfItems = this.getSumOfItems(selectedItemInfo);
        return (
            <footer className="footer">
                <div className="cartImage">
                    <img src={require("../../../images/avatar-large.png")} onClick={this.onCartClicked.bind(this)} alt=""></img>
                </div>
                <div className="sum">¥{sumOfItems}</div>
                <div className="order"><span>下单</span></div>
            </footer>
        );
    }

    onCartClicked() {
        this.props.callBackClickCart();
    }

    /**
     * 根据传入的购物车信息，计算共有多少件商品，用于在购物车图标上显示红色小圆圈
     * @param {*} selectedItemInfo 
     */
    getNumOfItems(selectedItemInfo) {
        let numOfItems = 0;
        for(let i = 0; i < selectedItemInfo.length; i++) {
            numOfItems = numOfItems + selectedItemInfo[i].cnum;
        }
        return numOfItems;
    }

    /**
     * 根据传入的购物车信息，计算总金额
     * @param {*} selectedItemInfo 
     */
    getSumOfItems(selectedItemInfo) {
        let sumOfItems = 0;
        for(let i = 0; i < selectedItemInfo.length; i++) {
            sumOfItems = sumOfItems + selectedItemInfo[i].cnum * selectedItemInfo[i].price;
        }
        return sumOfItems;
    }

    
  }
  
  export default Footer