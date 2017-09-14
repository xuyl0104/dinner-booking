import React, { Component } from 'react';
import Header from '../common-components/header/header';
import Tabs from '../common-components/tabs/tabs';
import ItemCard from '../common-components/itemcard/itemcard';
import Footer from '../common-components/footer/footer';
import ShoppingCart from '../shoppingcart/shoppingcart';
import './menu.css';
/**
 * 餐厅点餐系统的首页面，用户可以选择餐厅就餐以及查看、处理订单
 */
class Menu extends Component {
    constructor(props) {
        super(props);
        let canteenInfo = JSON.parse(window.sessionStorage.getItem("selectedCanteenInfo"));//这个方法不好,没使用
        let selectedItemInfo = JSON.parse(window.sessionStorage.getItem("selectedItemInfo")) || [];
        this.state = {
            queryState: window.sessionStorage.getItem("cp_queryState")||'炒菜', //菜品选择：选择炒菜（cc）还是套餐（tc），默认为套餐，用于Tab页展示
            canteenInfo: canteenInfo,
            // 正式开发中，从数据库找到编号为canteenInfo的餐厅所提供的套餐和炒菜
            // 数据获取放在componentDidMount()中！！！！！！
            menuItemsCC: [
                {canteenid: 0, id: 0, name: "鱼", price: 5, type: 'cc'},
                {canteenid: 0, id: 1, name: "牛肉面", price: 10, type: 'cc'}, 
                {canteenid: 0, id: 2, name: "炒饭", price: 8, type: 'cc'}, 
                {canteenid: 0, id: 3, name: "铁板烧", price: 10, type: 'cc'}, 
                {canteenid: 0, id: 4, name: "炒丝瓜", price: 12, type: 'cc'}, 
                {canteenid: 0, id: 5, name: "水饺", price: 8, type: 'cc'}, 
                {canteenid: 0, id: 6, name: "串串1", price: 5, type: 'cc'},
                {canteenid: 0, id: 7, name: "串串2", price: 5, type: 'cc'},
                {canteenid: 0, id: 8, name: "串串3", price: 5, type: 'cc'},
                {canteenid: 1, id: 9, name: "串串2", price: 5, type: 'cc'},
                {canteenid: 1, id: 10, name: "串串3", price: 5, type: 'cc'},
                {canteenid: 1, id: 11, name: "炒饭", price: 8, type: 'cc'}, 
                {canteenid: 1, id: 12, name: "萝卜", price: 10, type: 'cc'}, 
                {canteenid: 1, id: 13, name: "豆芽", price: 12, type: 'cc'}, 
                {canteenid: 2, id: 14, name: "炒菜", price: 5, type: 'cc'},
                {canteenid: 2, id: 15, name: "土豆片", price: 5, type: 'cc'},
                {canteenid: 2, id: 16, name: "茄子", price: 5, type: 'cc'},
                {canteenid: 2, id: 17, name: "黄瓜", price: 5, type: 'cc'},
                {canteenid: 2, id: 18, name: "白菜", price: 5, type: 'cc'},
                {canteenid: 2, id: 19, name: "鱼", price: 5, type: 'cc'},
            ],
            menuItemsTC: [
                {canteenid:0, id: 20, name: "豪华晚餐0", price: 10, type: 'tc'},
                {canteenid:0, id: 21, name: "豪华晚餐1", price: 10, type: 'tc'}, 
                {canteenid:0, id: 22, name: "豪华晚餐2", price: 15, type: 'tc'}, 
                {canteenid:0, id: 23, name: "豪华晚餐3", price: 20, type: 'tc'},
                {canteenid:1, id: 20, name: "豪华晚餐0", price: 10, type: 'tc'},
                {canteenid:1, id: 21, name: "豪华晚餐1", price: 10, type: 'tc'}, 
                {canteenid:1, id: 22, name: "豪华晚餐2", price: 15, type: 'tc'}, 
                {canteenid:1, id: 23, name: "豪华晚餐3", price: 20, type: 'tc'}, 
                {canteenid:2, id: 20, name: "豪华晚餐0", price: 10, type: 'tc'},
                {canteenid:2, id: 21, name: "豪华晚餐1", price: 10, type: 'tc'}, 
                {canteenid:2, id: 22, name: "豪华晚餐2", price: 15, type: 'tc'}, 
                {canteenid:2, id: 23, name: "豪华晚餐3", price: 20, type: 'tc'}, 
                {canteenid:3, id: 20, name: "豪华晚餐0", price: 10, type: 'tc'},
                {canteenid:3, id: 21, name: "豪华晚餐1", price: 10, type: 'tc'}, 
                {canteenid:3, id: 22, name: "豪华晚餐2", price: 15, type: 'tc'}, 
                {canteenid:3, id: 23, name: "豪华晚餐3", price: 20, type: 'tc'}, 
            ],
            
            //加载Menu页时，查询该用户在该餐厅的购物车信息，若信息为空，初始化为[]
            //返回到餐厅页面时，该属性需要写入数据库（这样设计我认为不合理，可以讨论...）
            //暂时用session替代
            selectedItemInfo: selectedItemInfo,

            //是否弹出购物车界面，控制弹出界面是否隐藏
            showCart: false,
        };  
        this.clickCart = this.clickCart.bind(this);
    }

    render() {
        let itemsCCInThisCanteen = [];
        let itemsTCInThisCanteen = [];
        itemsCCInThisCanteen = this.getItemsCC(this.state.canteenInfo.id);
        itemsTCInThisCanteen = this.getItemsTC(this.state.canteenInfo.id);
        let selectedItemInfo = [];//购物车信息
        let itemDivs;
        if(itemsCCInThisCanteen.length === 0 && itemsTCInThisCanteen === 0){
            itemDivs = <div className="itemList">饿肚子吧你。</div>
        }else{
            if(this.state.queryState === '炒菜'){//选择炒菜
                itemDivs = itemsCCInThisCanteen.map((item, index) => {
                    // console.log(item);
                    return(
                        <ItemCard item={item} key={index} callBackParent={this.addToCart.bind(this)}/>
                    );
                });
            }else{//选择套餐
                itemDivs = itemsTCInThisCanteen.map((item, index) => {
                    return(
                        <ItemCard item={item} key={index} callBackParent={this.addToCart.bind(this)}/>
                    );
                });
            }
        }

        return (
            <div>
                <Header name={"餐厅详情"} onLeftArrowClick={() => this.backToCanteenList()}/>
                <Tabs tabs={['炒菜', '套餐']} queryState={this.state.queryState} callBackParent={this.changeTab.bind(this)}/>
                <div className="itemList">
                    {itemDivs}
                </div>
                <ShoppingCart callBackAdd={this.addToCart.bind(this)} 
                    callBackRemove={this.removeOneFromCart.bind(this)}
                    callBackClearCart={this.clearCart.bind(this)} 
                    selectedItemInfo={this.state.selectedItemInfo} 
                    show={this.state.showCart} />
                <Footer selectedItemInfo={this.state.selectedItemInfo} 
                    callBackClickCart={this.clickCart.bind(this)}
                    callBackOrder={this.clickOrder.bind(this)}
                    orderButtonAvailable={this.state.selectedItemInfo.length > 0 ? true : false}/>
            </div>
        );
    }


    /**
     * 点击header左箭头返回餐厅选择界面
     * 需要将该用户在该餐厅的购物车存入数据库
     */
    backToCanteenList() {
        window.sessionStorage.setItem("selectedItemInfo", JSON.stringify(this.state.selectedItemInfo));        
        this.props.history.goBack();
    }

    /**s
     * 切换tab
     * @param state: 保存当前选的Tab项
     */
    changeTab(state) {
        let tabState = state;
        this.setState({queryState: tabState}, () => {
            console.log(this.state.queryState)});      
        window.sessionStorage.setItem("cp_queryState", state);
    }

    /**
     * 得到餐厅号为canteenId的餐厅的菜单，分别得到炒菜和套餐的详细信息
     * @param {*} canteenId 
     */
    getItemsCC(canteenId) {
        return this.state.menuItemsCC.filter((item) => item.canteenid === canteenId);
    }
    getItemsTC(canteenId) {
        return this.state.menuItemsTC.filter((item) => item.canteenid === canteenId);
    }

    /**
     * 点击每个itemCard后的红色加号圆圈
     * @param {*} item 
     */
    addToCart(item) {
        // console.log(item);
        let currentSelectedItemInfo = this.state.selectedItemInfo;//当前购物车
        let itemAlreadySelected = currentSelectedItemInfo.filter((i) => i.id === item.id);//新添加的这个在购物车里是否存在
        // console.log("找到:");
        // console.log(itemAlreadySelected);
        let newselectedItemInfo;
        if(itemAlreadySelected.length != 0){//当前购物车里有
            // console.log("已经存在"+itemAlreadySelected[0].num+"个"+itemAlreadySelected[0].id);
            let newNumOfThisItem = itemAlreadySelected[0].num + 1;
            // console.log("更新后有"+newNumOfThisItem+"个");
            // 先把它删了，再添加新的,注意顺序不要改变，否则购物车里点击添加会位置跳跃
            let itemInfo = {id: item.id, name: item.name, num: newNumOfThisItem, price: item.price, type: item.type};             
            currentSelectedItemInfo.splice(this.getIndexOfIt(currentSelectedItemInfo, itemAlreadySelected[0]), 1, itemInfo);//该函数可以直接替换
            newselectedItemInfo = currentSelectedItemInfo;
        }else{
            let itemInfo = {id: item.id, name: item.name, num: 1, price: item.price, type: item.type};            
            newselectedItemInfo = [...this.state.selectedItemInfo, itemInfo];
        }
        this.setState((prevState) => ({
            selectedItemInfo: newselectedItemInfo,
            numOfItems: prevState.numOfItems + 1
        }), () => {console.log(this.state.selectedItemInfo)});
    }

    /**
     * 点击购物车列表后的白色减号圆圈
     * @param {*} item 
     */
    removeOneFromCart(item) {
        // console.log("正在删除:");
        // console.log(item);
        let currentSelectedItemInfo = this.state.selectedItemInfo;//当前购物车        
        let itemAlreadySelected = currentSelectedItemInfo.filter((i) => i.id === item.id);//找到待减一的商品
        let newNumOfThisItem = itemAlreadySelected[0].num - 1; //该商品的数量减一
        let newselectedItemInfo;        
        if(newNumOfThisItem > 0) {//减一后数量大于1，继续在购物车中显示
            let itemInfo = {id: item.id, name: item.name, num: newNumOfThisItem, price: item.price, type: item.type};             
            currentSelectedItemInfo.splice(this.getIndexOfIt(currentSelectedItemInfo, itemAlreadySelected[0]), 1, itemInfo);//该函数可以直接替换
            newselectedItemInfo = currentSelectedItemInfo;
        }else {//减一后，数量为0，不再显示在购物车中
            currentSelectedItemInfo.splice(this.getIndexOfIt(currentSelectedItemInfo, itemAlreadySelected[0]), 1);//该函数可以直接替换 
            newselectedItemInfo = currentSelectedItemInfo;           
        }
        this.setState((prevState) => ({
            selectedItemInfo: newselectedItemInfo,
            numOfItems: prevState.numOfItems - 1
        }), () => {console.log(this.state.selectedItemInfo)});
    }

    getIndexOfIt(currentSelectedItemInfo, it) {
        for(let i = 0; i < currentSelectedItemInfo.length; i++) {
            if(currentSelectedItemInfo[i].id === it.id) {
                return i;
            }
        }
    }

    /**
     * 点击购物车图标，显示购物车中的内容
     * 预期实现方法：点击购物车图标，底部的隐藏页面显示出来，覆盖住原始Menu页面；再次点击
     * 购物车图标，该页面隐藏
     */
    clickCart() {
        this.setState((prevState) => ({
            showCart: !prevState.showCart
        }));
    }


    /**
     * 点击下单按钮，前往下单界面
     * 将购物车信息暂存，以便下单中途返回时可以继续编辑购物车
     * 下单完成后，立即删除sessionStorage中的该购物车信息，数据库中也须删除，以便再次进入该餐厅时，购物车为空
     * session中的购物车在退出程序时，同步数据库，自动删除
     */
    clickOrder() {
        window.sessionStorage.setItem("selectedItemInfo", JSON.stringify(this.state.selectedItemInfo));
        this.props.history.push({
            pathname: '/order',
            state: this.state.selectedItemInfo
        });
    }

    /**
     * 在购物车弹出界面点击“清空”按钮，购物车信息清空
     */
    clearCart() {
        // console.log("Clearing cart info");
        this.setState({
            selectedItemInfo: []
        });
    }

}

export default Menu;