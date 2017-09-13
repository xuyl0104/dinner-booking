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
            <div className="orderCardInList">
                <div className="leftBlock">
                    <div className="orderInfo">
                        <label>订单编号:</label><span>S06201709081234</span>
                    </div>
                    <div className="orderInfo">
                        <span>2017-09-08 12:00 | 3桌</span>
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

    /**
     * 点击header返回按钮返回到App页（首页）
     */
    backToApp() {
        // this.props.history.push({
        //     pathname: '/app',
        // });
    }
}

export default OrderList;
