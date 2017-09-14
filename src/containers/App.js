import React, { Component } from 'react';
import DatePicker from 'react-mobile-datepicker';

import './App.css';
import CanteenList from '../components/canteenlist/canteenlist';
import Menu from '../components/menu/menu';
import Header from '../components/common-components/header/header';
import Listview from '../components/common-components/listview/listview';
import CanteenCard from '../components/common-components/canteencard/canteencard';

/**canteencard
 * 餐厅点餐系统的首页面，用户可以选择餐厅就餐以及查看、处理订单
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
      isOpen: false   
    };
  }
  
  render() {
    //临时测试数据，点击餐厅卡片进入相应餐厅界面
    let testObject = {id: 2, name: "S06"};
    return (
      <div>
        <Header name={"浪潮餐厅"} onLeftArrowClick={() => this.quitApp()}/>
        <div className="listGroup">
          <Listview name={"餐厅选择"} onClick={() => this.selectCanteen()}/>
          <Listview name={"我的订单"} onClick={() => this.goToOrderList()}/>
          <div className="noStyle"><label>最近选择</label></div>
          <CanteenCard imgSrc={'../images/canteen.png'} onCardClick={this.goToCanteen.bind(this, testObject)}/>
          <CanteenCard imgSrc={'../images/canteen.png'} onCardClick={this.goToCanteen.bind(this, testObject)}/>
        </div>
      </div>
    );
  }

  /**
   * 点击header返回按钮退出程序
   */
  quitApp() {
    console.log("App closed.");
    //清空缓存
    window.sessionStorage.removeItem("selectedCanteenInfo");
    window.sessionStorage.removeItem("cp_queryState");
    window.sessionStorage.removeItem("selectedItemInfo");
  }

  /**
   * 选择餐厅，进入餐厅列表
   */
  selectCanteen() {
    this.props.history.push({
        pathname: '/canteenList',
        state: {}
    });
  }

  /**
   * 点击我的订单按钮，查看订单列表
   */
  goToOrderList() {
    this.props.history.push({
      pathname: '/orderList',
      state: {}
    });
  }

  /**
   * 点击餐厅卡片，进入对应餐厅
   * @param {*} canteenInfo 
   */
  goToCanteen(canteenInfo) {
    window.sessionStorage.setItem("selectedCanteenInfo", JSON.stringify(canteenInfo));
    this.props.history.push({
        pathname: '/menu',
        state: {
            selectedCanteenInfo: canteenInfo
        }
    });
  }
}

export default App;
