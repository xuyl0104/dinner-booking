import React, { Component } from 'react';

import Header from '../common-components/header/header';
import OrderListView from '../common-components/orderlistview/orderlistview';
import './orderlist.css';

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        // Buttons
        // let swipeoutBtns = [{text: 'Button'}];
        let orderId = "20182729";
        
        return (
            <div>
                <Header name={"我的订单"} onLeftArrowClick={() => this.backToApp()}/>
                <div className="orderList">
                    <OrderListView orderId={orderId} status={"success"} callBackOrderClick={this.goToInformation.bind(this, orderId)}/>
                    <OrderListView orderId={orderId} status={"success"} callBackOrderClick={this.goToInformation.bind(this)}/>
                    <OrderListView orderId={orderId} status={"making"} callBackOrderClick={this.goToInformation.bind(this)}/>
                    <OrderListView orderId={orderId} status={"making"} callBackOrderClick={this.goToInformation.bind(this)}/>
                    <OrderListView orderId={orderId} status={"tobevalidated"} callBackOrderClick={this.goToInformation.bind(this)}/>
                    <OrderListView orderId={orderId} status={"tobevalidated"} callBackOrderClick={this.goToInformation.bind(this)}/>
                    <OrderListView orderId={orderId} status={"fail"} callBackOrderClick={this.goToInformation.bind(this)}/>
                    <OrderListView orderId={orderId} status={"fail"} callBackOrderClick={this.goToInformation.bind(this)}/>
                    <OrderListView orderId={orderId} status={"making"} callBackOrderClick={this.goToInformation.bind(this)}/>
                </div>
            </div>
        );
    }

    /**
     * 点击header返回按钮返回到App页（首页）
     */
    backToApp() {
        this.props.history.push({
            pathname: '/app',
        });
    }

    goToInformation(orderId) {
        console.log("Go to see this order");
        this.props.history.push({
            pathname: '/orderInformation',
            state: {
                selectedOrderId: orderId
            }
        });
    }
}

export default OrderList;
