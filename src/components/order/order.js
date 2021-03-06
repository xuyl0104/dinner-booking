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
        let tableNum = JSON.parse(window.sessionStorage.getItem("tableNum"));
        let orderTime = JSON.parse(window.sessionStorage.getItem("orderTime"));

        this.state = {
            //页面控制状态
            isDataPickerOpen: false,
            warningInfo: "",
            time: new Date(),
            isOpen: false,
            tableNum: tableNum,
            selectedCanteenInfo: selectedCanteenInfo,//餐厅信息
            selectedItemInfo: selectedItemInfo,//菜信息
            planMealTime: "",//计划就餐时间
            actualMealTime: "",
            bookPersonTel: "",
            payType: 0,
            paymentPerson: "",
            totalPrice: 0,
            status: "tobevalidated",
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
        let time = this.state.time;
        let minTime = new Date();
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
                        <div>
                            <div id="planMealTime" onClick={this.handleClick}>{this.getDateString(time)}</div>
                        </div>
                    </div>

                    <div>
                        <DatePicker
                            value={this.state.time}
                            isOpen={this.state.isOpen}
                            onSelect={this.handleSelect}
                            onCancel={this.handleCancel}
                            dateFormat={['MM', 'DD', 'hh', 'mm']}
                            showFormat={'YYYY-MM-DD hh:mm'}
                            theme={'android'} 
                            />
                    </div>

                    <div className="form-group">
                        <label>联系电话</label><label style={{'color': 'red'}}>{this.state.warningInfo}</label>
                        <label><input id="bookPersonTel" onChange={this.handleTelChange}
                             value={this.state.bookPersonTel} placeholder="联系电话"></input></label>
                    </div>

                    <div className="payment">
                        <p>支付方式</p>
                        <div className="radioGroup">
                            <div className="radios">
                                <input type='radio' name='payment' value='0' defaultChecked/>签单
                                <input id="billname" type='text' name='1' placeholder='请输入签单人信息' />
                                <input type='radio' name='payment' value='1' />现金        
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
                            <div style={{'display': `${(itemsCCInThisOrder.length===0 || this.state.tableNum ===0) ? 'none': ''}`}}>
                                <div className="inOneLine">
                                    <label className="categoryName">炒菜</label>
                                    <label id="tableNum">{this.state.tableNum}桌</label>
                                </div>
                                <div className="itemInThisOrder">
                                    {CCItemDivs}
                                </div>
                            </div>
                            
                            <div style={{'display': `${(itemsTCInThisOrder.length===0)? 'none': ''}`}}>
                                <div className="inOneLine">
                                    <label className="categoryName">套餐</label>
                                </div>
                                <div className="itemInThisOrder">
                                    {TCItemDivs}
                                </div>
                            </div>
                        </div>
                    </div> 

                    <OrderFooter buttonName={"提交订单"} callBackSubmitOrder={this.submitOrder.bind(this)}/>                       
                </div>
            </div>
        );
    }

    /**
     * 时间选择器相关函数
     */

    handleClick = () => {
        this.setState({ isOpen: true });
    }
    handleCancel = () => {
        this.setState({ isOpen: false });
    }
    handleSelect = (time) => {
        this.setState({ time, isOpen: false });
    }
    getDateString(time) {
        let year = time.getFullYear();
        let month = time.getMonth() < 9 ? ("0"+(time.getMonth()+1)) : (time.getMonth()+1); //0-11，0代表1月，坑...
        let day = time.getDate() < 10 ? ("0"+time.getDate()) : time.getDate();
        let hour = time.getHours() < 10 ? ("0"+time.getHours()) : time.getHours();
        let minute = time.getMinutes() < 10 ? ("0"+time.getMinutes()) : time.getMinutes();
        // let second = time.getSeconds();
        let dateString = year + "-" + month + "-" +day + " " + hour + ":" + minute;
        return (dateString);
    }

    /**
     * 由于带有一个桌数输入框，在统计选中的菜的ID及每个菜的num时，比较麻烦
     * 当桌数为0，每个炒菜都为0，此时selectedItemInfo即为itemsTCInThisOrder
     * 当桌数不为0时，每个炒菜的个数为num*tablNum
     */
    getRealSelectedItemInfo() {
        let tableNum = this.state.tableNum;
        let realSelectedItemInfo;
        if(tableNum == 0) {
            let itemsTCInThisOrder = this.state.selectedItemInfo.filter((item) => item.type === "tc");
            realSelectedItemInfo = itemsTCInThisOrder.map((item, index) => {
                return {CourseID: item.id, CourseNum: item.num}
            });
        } else {
            realSelectedItemInfo = this.state.selectedItemInfo.map((item, index) => {
                if(item.type === 'cc'){
                    return {CourseID: item.id, CourseNum: item.num*tableNum};
                }else{
                    return {CourseID: item.id, CourseNum: item.num};                    
                }
            });
        }
        return realSelectedItemInfo;
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
            //打包订单信息
            let orderTime = this.dateFtt("yyyy-MM-dd hh:mm:ss", new Date());//订单提交时间，意义不大
            let CanteenID = this.state.selectedCanteenInfo.id;//所在餐厅ID
            let BookPersonID = '';//订餐人ID
            let BookPersonName = '';//订餐人姓名
            let BookPersonTel = this.state.bookPersonTel;//订餐人联系电话
            let PayType = this.state.payType;//结算方式，0-签单，1-现金
            let PaymentPerson = this.state.paymentPerson;
            let PlanMealTime = this.state.planMealTime;
            let ActualMealTime = this.state.actualMealTime;
            let TableNum = this.state.tableNum;
            let TotalPrice = this.getSumOfItems(this.state.selectedItemInfo);
            let Status = this.state.status;
            let realSelectedItemInfo = this.getRealSelectedItemInfo();
            console.log(realSelectedItemInfo);
            //上传成功后，删除购物车信息（在此暂时保留）->try catch err throw...
            //window.sessionStorage.removeItem("selectedItemInfo"); ->
            //转到订单列表界面 ->
            //setState异步执行，是个坑，不知这样是否合适,目测不需要
            this.setState({orderTime: orderTime}, ()=>{
                window.localStorage.setItem("orders", JSON.stringify(this.state));
                console.log(this.state);
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
     * (未用到)
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
    // getSumOfItems(selectedItemInfo) {
    //     let sumOfItems = 0;
    //     for(let i = 0; i < selectedItemInfo.length; i++) {
    //         sumOfItems = sumOfItems + selectedItemInfo[i].num * selectedItemInfo[i].price;
    //     }
    //     return sumOfItems;
    // }
    getSumOfItems(selectedItemInfo) {
        let tableNum = this.state.tableNum;
        
        let sumOfItems = 0;
        for(let i = 0; i < selectedItemInfo.length; i++) {
            sumOfItems = sumOfItems + selectedItemInfo[i].num * selectedItemInfo[i].price * (selectedItemInfo[i].type === 'cc' ? tableNum : 1);
        }
        return sumOfItems;
    }

    

    backToMenu() {
        this.props.history.goBack();        
    }

    /**
     * 
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