import React, { Component } from 'react';
import Header from '../common-components/header/header';
import OrderCard from '../common-components/ordercard/ordercard';
import OrderFooter from '../common-components/orderfooter/orderfooter';
import './orderinformation.css';

class OrderInformation extends Component {
    constructor(props) {
        super(props);
        let selectedOrderId = this.props.location.state;
        this.state = {
            selectedOrderId: selectedOrderId
        };
    }

    render() {
        let orderInfo = {
            ordrId: "201413318",
            canteenId: "01",
            bookPersonTel: "15965779750",
            planMealTime: "2017-11-11",
            totalPrice: 130,
            payType: "签单",
            billname: "浪潮国际 平台与技术部 孙立新",
            status: "制作中"
        };
        console.log(this.state.selectedOrderId);
        let CCItemDivs;
        let TCItemDivs;
        //根据selectedOrderId去数据库查询订单数据，进行展示。
        return (
            <div>
                <Header name={"我的订单"} onLeftArrowClick={() => this.backToApp()}/>
                
                <div className="inforPage">
                    <div className="inforSection1">
                        <label id="status" className="making">{orderInfo.status}</label>
                        <p>
                            <label className="tag">订单编号: </label>
                            <label>{orderInfo.ordrId}</label>
                        </p>
                        <p>
                            <label className="tag">联系方式: </label>
                            <label>{orderInfo.bookPersonTel}</label>
                        </p>
                        <p>
                            <label className="tag">就餐时间: </label>
                            <label>{orderInfo.planMealTime}</label>
                        </p>
                        <p>
                            <label className="tag">共计金额: </label>
                            <label>{orderInfo.totalPrice}</label>
                        </p>
                    </div>

                    <div className="paymentSection">
                        <p>支付方式</p>
                        <label className="tag">{orderInfo.payType}: </label>
                        <label>{orderInfo.billname}</label>
                    </div>

                    <div className="arrangementSection">
                        <div className="orderInformation">
                            <div>
                                <label className="inforLeft">订单详情</label>
                                <label className="inforRight">{"惠佳餐厅"}</label> 
                            </div>
                            <div className="itemsInThisOrder">
                                <div>
                                    <p className="categoryName">炒菜</p>
                                    <div className="itemInThisOrder">
                                        {""}
                                    </div>
                                </div>
                                
                                <div>
                                    <p className="categoryName">套餐</p>
                                    <div className="itemInThisOrder">
                                        {""}
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <OrderFooter buttonName={"取消订单"}/>                       
                </div>
            </div>
        );
    }

    /**
     * 点击header返回按钮返回到App页（首页）
     */
    backToApp() {
        this.props.history.push({
            pathname: '/orderList',
        });
    }
}

export default OrderInformation;
