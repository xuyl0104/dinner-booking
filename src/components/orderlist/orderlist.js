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
        let swipeoutBtns = [{text: 'Button'}];
        return (
            <div>
                <Header name={"我的订单"} onLeftArrowClick={() => this.backToApp()}/>
                <div className="orderList">
                    <OrderListView status={"success"}/>
                    <OrderListView status={"success"}/>
                    <OrderListView status={"making"}/>
                    <OrderListView status={"making"}/>
                    <OrderListView status={"tobevalidated"}/>
                    <OrderListView status={"tobevalidated"}/>
                    <OrderListView status={"fail"}/>
                    <OrderListView status={"fail"}/>
                    <OrderListView status={"making"}/>
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
}

export default OrderList;
