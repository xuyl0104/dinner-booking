import React, { Component } from 'react';
import './orderlistview.css';

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    render() {
        let statusArray = ["制作中", "交易成功", "待确认", "交易失败"];
        let status;
        switch(this.props.status){
            case "making": 
                status = statusArray[0];break;
            case "success": 
                status = statusArray[1];break;
            case "tobevalidated": 
                status = statusArray[2];break;
            case "fail": 
                status = statusArray[3];break;
        }
        return (
            <div className="orderCardInList" onClick={this.goToOrderInformation.bind(this)}>
                <div className="leftBlock">
                    <div className="orderInfo">
                        <label>订单编号:</label><span>{this.props.orderid}</span>
                    </div>
                    <div className="orderInfo">
                        <span>2017-09-08 12:00 | 惠佳餐厅</span>
                    </div>
                    <div className="orderInfo">
                        <span>合计：126元</span>
                    </div>
                </div>
                <div className="rightBlock">
                    {/* <label className="orderStatus making">制作中</label> */}
                    <label className={`orderStatus ${this.props.status}`}>{status}</label>
                </div>
            </div>
        );
    }

    goToOrderInformation() {
        this.props.callBackOrderClick();
    }
}

export default OrderList;
