import React, { Component } from 'react';
import moment from 'moment';
import * as Datetime from 'react-datetime';
import DatePicker from 'react-mobile-datepicker';
import Time from 'react-time';
import Picker from 'react-mobile-picker';
import Header from '../common-components/header/header';
import OrderCard from '../common-components/ordercard/ordercard';
import OrderFooter from '../common-components/orderfooter/orderfooter';
import './order.css';

class Order extends Component {
    constructor(props) {
        super(props);
        let selectedCanteenInfo = JSON.parse(window.sessionStorage.getItem("selectedCanteenInfo"));
        let selectedItemInfo = JSON.parse(window.sessionStorage.getItem("selectedItemInfo"));
        let orderTime = JSON.parse(window.sessionStorage.getItem("orderTime"));
        // console.log(selectedItemInfo);
        // console.log(selectedCanteenInfo);
        this.state = {
            //页面控制状态
            isDataPickerOpen: false,
            warningInfo: "",

            selectedCanteenInfo: selectedCanteenInfo,//餐厅信息
            selectedItemInfo: selectedItemInfo,//菜信息
            planMealTime: "",//计划就餐时间
            bookPersonTel: "",
            payType: 0,
            paymentPerson: "",
            totalPrice: 0,
            orderTime: ""
        };
        this.handleTelChange = this.handleTelChange.bind(this);
    }

    /**
     * 订餐人联系电话检测，保证只能输入数字
     * @param {*} event 
     */
    handleTelChange(event) {
        let val = event.target.value;
        if(isNaN(val)){
            this.setState((prevState) => ({
                warningInfo: "只能输入数字!",
                bookPersonTel: prevState.bookPersonTel
            }));
            setTimeout(function(){
                this.setState({warningInfo: ""});
            }.bind(this),1000);
        }else{
            this.setState({bookPersonTel: val}); 
        }
    }

    /**
     * 必填项校验
     */
    validation() {
        let state = this.state;
        if(!state.bookPersonTel || state.bookPersonTel.trim() === "") {
            alert("请输入联系电话！");
            return false;
        }
        return true;
    }

    render() {

        let itemsCCInThisOrder = [];
        let itemsTCInThisOrder = [];
        itemsCCInThisOrder = this.state.selectedItemInfo.filter((item) => item.type === "cc");
        itemsTCInThisOrder = this.state.selectedItemInfo.filter((item) => item.type === "tc");
        let CCItemDivs = itemsCCInThisOrder.map((item, index) => {
            return (<OrderCard item={item} key={index}/>);
        });

        let TCItemDivs = itemsTCInThisOrder.map((item, index) => {
            return (<OrderCard item={item} key={index}/>);
        });

        /**
         * TODO：表单内的有效性检验尚未添加
         */
        return (
            <div>
                <Header name={"下单"} onLeftArrowClick={() => this.backToMenu()}/>
                <div className="orderPage">
                    <div className="form-group">
                        <label>就餐时间</label>
                        <div><span className="orderInfo-right" id="planMealTime">{moment().format('YYYY-MM-DD HH:mm:ss')}</span></div>
                    </div>
                    <div className="form-group">
                        <label>联系电话</label><label style={{'color': 'red'}}>{this.state.warningInfo}</label>
                        <label><input id="bookPersonTel" className="orderInfo-right text-right" onChange={this.handleTelChange}
                            required="required" pattern="[0-9]" value={this.state.bookPersonTel}></input></label>
                    </div>

                    <div className="payment">
                        <p>支付方式</p>
                        <div className="radioGroup">
                            <div className="radios">
                                <input type='radio' name='payment' value='0' defaultChecked/>签单
                                <input className="billname" type='text' name='1' placeholder='请输入签单人信息' />
                                <input type='radio' name='payment' value='cash' />现金        
                            </div>
                        </div>
                    </div>
                    
                    <div className="orderInformation">
                        <p className="infoLeft">订单详情</p>
                        <label className="basicInfo">{this.state.selectedCanteenInfo.name}</label> &nbsp;&nbsp;&nbsp;&nbsp;
                        {/* 这个时间无意义 */}
                        <label className="basicInfo">{moment().format('YYYY-MM-DD HH:mm:ss')}</label>
                        <label className="basicInfo pull-right">合计：{this.getSumOfItems(this.state.selectedItemInfo)}元</label>


                        <div className="itemsInThisOrder">
                            <div style={{'display': `${itemsCCInThisOrder.length===0 ? 'none': ''}`}}>
                                <p className="categoryName">炒菜</p>
                                <div className="itemInThisOrder">
                                    {CCItemDivs}
                                </div>
                            </div>
                            
                            <div style={{'display': `${itemsTCInThisOrder.length===0 ? 'none': ''}`}}>
                                <p className="categoryName">套餐</p>
                                <div className="itemInThisOrder">
                                    {TCItemDivs}
                                </div>
                            </div>
                        </div>
                    </div> 

                    <OrderFooter callBackSubmitOrder={this.submitOrder.bind(this)}/>                       
                </div>
            </div>
        );
    }

    /**
     * 点击底栏的提交订单按钮，将订单信息提交到数据库
     * 确认成功后，删除本地购物车信息
     * 须要try catch
     */
    submitOrder() {
        let validationStatus = this.validation();
        if (!validationStatus) {
            return;
        } else {
            let orderTime = this.dateFtt("yyyy-MM-dd hh:mm:ss", new Date());
            //打包订单信息
            //上传成功后，删除购物车信息（在此暂时保留）->
            //window.sessionStorage.removeItem("selectedItemInfo"); ->
            //转到订单列表界面 ->
            //setState异步执行，是个坑，不知这样是否合适
            this.setState({orderTime: orderTime}, ()=>{
                window.localStorage.setItem("orders", JSON.stringify(this.state));
                this.goToOrderList();
                window.sessionStorage.clear("selectedItemInfo");
            });
        }
    }

    goToOrderList() {
        this.props.history.push({
            pathname: '/orderList',
            state: this.state.selectedItemInfo
        });
        console.log("Going to order list...");
    }

    /**
     * 根据传入的购物车信息，计算共有多少件商品，用于在购物车图标上显示红色小圆圈
     * 可以改写为reduce方式
     * @param {*} selectedItemInfo
     */
    getNumOfItems(selectedItemInfo) {
        let numOfItems = 0;
        for(let i = 0; i < selectedItemInfo.length; i++) {
            numOfItems = numOfItems + selectedItemInfo[i].num;
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
            sumOfItems = sumOfItems + selectedItemInfo[i].num * selectedItemInfo[i].price;
        }
        return sumOfItems;
    }

    backToMenu() {
        this.props.history.goBack();        
    }

    /**
     * 时间格式化处理
     */
    dateFtt(fmt,date) { 
        var o = {   
            "M+" : date.getMonth()+1,                 //月份   
            "d+" : date.getDate(),                    //日   
            "h+" : date.getHours(),                   //小时   
            "m+" : date.getMinutes(),                 //分   
            "s+" : date.getSeconds(),                 //秒   
            "q+" : Math.floor((date.getMonth()+3)/3), //季度   
            "S"  : date.getMilliseconds()             //毫秒   
        };   
        if(/(y+)/.test(fmt))   
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
        for(var k in o)   
            if(new RegExp("("+ k +")").test(fmt))   
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
        return fmt;   
    }
    
  }
  
  export default Order