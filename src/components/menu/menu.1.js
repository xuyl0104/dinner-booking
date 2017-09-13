import React, { Component } from 'react';
import Header from '../common-components/header/header';
import Tabs from '../common-components/tabs/tabs';
import ItemCard from '../common-components/itemCard/itemCard';
import Footer from '../common-components/footer/footer';

/**
 * 
 * 备份用的，不用关心
 * 餐厅点餐系统的首页面，用户可以选择餐厅就餐以及查看、处理订单
 */
class Menu extends Component {
    constructor(props) {
        super(props);
        let canteenInfo = this.props.location.state;//这个方法读取属性有问题，很苦恼，待解决...
        let menuSelectedInfo = JSON.parse(window.sessionStorage.getItem("menuSelectedInfo")) || {};
        // console.log(menuSelectedInfo);
        this.state = {
            // queryState: window.sessionStorage.getItem("cp_queryState")||"炒菜", //菜品选择：选择炒菜（cc）还是套餐（tc），默认为套餐，用于Tab页展示
            canteenInfo: JSON.parse(window.sessionStorage.getItem("selectedCanteenInfo")),
            // 正式开发中，从数据库找到编号为canteenInfo的餐厅所提供的套餐和炒菜
            // 数据获取放在componentDidMount()中！！！！！！
            menuItemsCC: [
                {cid: 0, id: 0, name: "鱼", price: 5, type: 'cc'},
                {cid: 0, id: 1, name: "牛肉面", price: 10, type: 'cc'}, 
                {cid: 0, id: 2, name: "炒饭", price: 8, type: 'cc'}, 
                {cid: 0, id: 3, name: "铁板烧", price: 10, type: 'cc'}, 
                {cid: 0, id: 4, name: "炒丝瓜", price: 12, type: 'cc'}, 
                {cid: 0, id: 5, name: "水饺", price: 8, type: 'cc'}, 
                {cid: 0, id: 6, name: "串串1", price: 5, type: 'cc'},
                {cid: 0, id: 7, name: "串串2", price: 5, type: 'cc'},
                {cid: 0, id: 8, name: "串串3", price: 5, type: 'cc'},
                {cid: 1, id: 9, name: "串串2", price: 5, type: 'cc'},
                {cid: 1, id: 10, name: "串串3", price: 5, type: 'cc'},
                {cid: 1, id: 11, name: "炒饭", price: 8, type: 'cc'}, 
                {cid: 1, id: 12, name: "萝卜", price: 10, type: 'cc'}, 
                {cid: 1, id: 13, name: "豆芽", price: 12, type: 'cc'}, 
                {cid: 2, id: 14, name: "炒菜", price: 5, type: 'cc'},
                {cid: 2, id: 15, name: "土豆片", price: 5, type: 'cc'},
                {cid: 2, id: 16, name: "茄子", price: 5, type: 'cc'},
                {cid: 2, id: 17, name: "黄瓜", price: 5, type: 'cc'},
                {cid: 2, id: 18, name: "白菜", price: 5, type: 'cc'},
                {cid: 2, id: 19, name: "鱼", price: 5, type: 'cc'},
            ],
            menuItemsTC: [
                {cid:0, id: 20, name: "豪华晚餐0", price: 10, type: 'tc'},
                {cid:0, id: 21, name: "豪华晚餐1", price: 10, type: 'tc'}, 
                {cid:0, id: 22, name: "豪华晚餐2", price: 15, type: 'tc'}, 
                {cid:0, id: 23, name: "豪华晚餐3", price: 20, type: 'tc'},
                {cid:1, id: 20, name: "豪华晚餐0", price: 10, type: 'tc'},
                {cid:1, id: 21, name: "豪华晚餐1", price: 10, type: 'tc'}, 
                {cid:1, id: 22, name: "豪华晚餐2", price: 15, type: 'tc'}, 
                {cid:1, id: 23, name: "豪华晚餐3", price: 20, type: 'tc'}, 
                {cid:2, id: 20, name: "豪华晚餐0", price: 10, type: 'tc'},
                {cid:2, id: 21, name: "豪华晚餐1", price: 10, type: 'tc'}, 
                {cid:2, id: 22, name: "豪华晚餐2", price: 15, type: 'tc'}, 
                {cid:2, id: 23, name: "豪华晚餐3", price: 20, type: 'tc'}, 
                {cid:3, id: 20, name: "豪华晚餐0", price: 10, type: 'tc'},
                {cid:3, id: 21, name: "豪华晚餐1", price: 10, type: 'tc'}, 
                {cid:3, id: 22, name: "豪华晚餐2", price: 15, type: 'tc'}, 
                {cid:3, id: 23, name: "豪华晚餐3", price: 20, type: 'tc'}, 
            ],
            
            //加载Menu页时，查询该用户在该餐厅的购物车信息，若信息为空，初始化为[]
            //返回到餐厅页面时，该属性需要写入数据库（这样设计我认为不合理，可以讨论...）
            selectedItemInfo: [],

            //购物车中菜的数量，每个菜的件数累加
            // numOfItems: this.getNumOfItems() || 0
            // totalExpense: 0,//总金额
            // numOfSelected: menuSelectedInfo.numOfSelected || 0//总份数（炒菜+套餐）
        };  
    }

    render() {
        let itemsCCInThisCanteen = [];
        let itemsTCInThisCanteen = [];
        itemsCCInThisCanteen = this.getItemsCC(this.state.canteenInfo.id);
        itemsTCInThisCanteen = this.getItemsTC(this.state.canteenInfo.id);
        let selectedItemInfo = [];//购物车信息
        // console.log(itemsCCInThisCanteen);
        // console.log(itemsTCInThisCanteen);
        let itemDivs;
        if(this.state.menuItemsCC.length === 0 && this.state.menuItemsTC.length === 0){
            itemDivs = <div>饿肚子吧你。</div>
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
                <Tabs tabs={["炒菜", "套餐"]} callBackParent={this.changeTab.bind(this)}/>
                <div className="itemList">
                    {itemDivs}
                </div>
                <Footer selectedItemInfo={this.state.selectedItemInfo} callBackClickCart={this.showCart.bind(this)}/>
            </div>
        );
    }


    /**
     * 点击header左箭头返回餐厅选择界面
     * 需要将该用户在该餐厅的购物车存入数据库
     */
    backToCanteenList() {
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
        return this.state.menuItemsCC.filter((item) => item.cid === canteenId);
    }
    getItemsTC(canteenId) {
        return this.state.menuItemsTC.filter((item) => item.cid === canteenId);
    }

    addToCart(item) {
        let itemInfo = {cid: item.id, cnum: 1, price: item.price}; 
        console.log("-------" + itemInfo.cid + "--" + itemInfo.cnum);
        let currentSelectedItemInfo = this.state.selectedItemInfo;//当前购物车
        console.log("current cart:"+currentSelectedItemInfo);
        let itemAlreadySelected = currentSelectedItemInfo.filter((i) => i.cid === item.id);//新添加的这个在购物车里是否存在
        console.log("已经存在"+itemAlreadySelected[0]);
        let newselectedItemInfo;
        if(itemAlreadySelected.length != 0){//当前购物车里有
            let newNumOfThisItem = itemAlreadySelected[0].cnum + 1;
            console.log("更新后有"+newNumOfThisItem+"个");
            currentSelectedItemInfo.pop();//先把它删了，再添加新的
            let itemInfo = {cid: item.id, cnum: newNumOfThisItem, price: item.price};             
            newselectedItemInfo = [...currentSelectedItemInfo, itemInfo];
        }else{
            let itemInfo = {cid: item.id, cnum: 1, price: item.price};            
            newselectedItemInfo = [...this.state.selectedItemInfo, itemInfo];
        }
        this.setState((prevState) => ({
            selectedItemInfo: newselectedItemInfo,
            numOfItems: prevState.numOfItems + 1
        }), () => {console.log(this.state.selectedItemInfo)});
    }

    /**
     * 点击购物车图标，显示购物车中的内容
     * 预期实现方法：点击购物车图标，底部的隐藏页面显示出来，覆盖住原始Menu页面；再次点击
     * 购物车图标，该页面隐藏
     */
    showCart() {
        console.log("Show items in shopping cart...");
    }

}

export default Menu;





// import React, { Component } from 'react';
// import Header from '../common-components/header/header';
// import Tabs from '../common-components/tabs/tabs';
// import ItemCard from '../common-components/itemCard/itemCard';
// import Footer from '../common-components/footer/footer';

// /**
//  * 餐厅点餐系统的首页面，用户可以选择餐厅就餐以及查看、处理订单
//  */
// class Menu extends Component {
//     constructor(props) {
//         super(props);
//         let canteenInfo = this.props.location.state;//这个方法读取属性有问题，很苦恼，待解决...
//         let menuSelectedInfo = JSON.parse(window.sessionStorage.getItem("menuSelectedInfo")) || {};
//         // console.log(menuSelectedInfo);
//         this.state = {
//             // queryState: window.sessionStorage.getItem("cp_queryState")||"炒菜", //菜品选择：选择炒菜（cc）还是套餐（tc），默认为套餐，用于Tab页展示
//             canteenInfo: JSON.parse(window.sessionStorage.getItem("selectedCanteenInfo")),
//             // 正式开发中，从数据库找到编号为canteenInfo的餐厅所提供的套餐和炒菜
//             // 数据获取放在componentDidMount()中！！！！！！
//             menuItemsCC: [
//                 {cid: 0, id: 0, name: "鱼", price: 5, type: 'cc'},
//                 {cid: 0, id: 1, name: "牛肉面", price: 10, type: 'cc'}, 
//                 {cid: 0, id: 2, name: "炒饭", price: 8, type: 'cc'}, 
//                 {cid: 0, id: 3, name: "铁板烧", price: 10, type: 'cc'}, 
//                 {cid: 0, id: 4, name: "炒丝瓜", price: 12, type: 'cc'}, 
//                 {cid: 0, id: 5, name: "水饺", price: 8, type: 'cc'}, 
//                 {cid: 0, id: 6, name: "串串1", price: 5, type: 'cc'},
//                 {cid: 0, id: 7, name: "串串2", price: 5, type: 'cc'},
//                 {cid: 0, id: 8, name: "串串3", price: 5, type: 'cc'},
//                 {cid: 1, id: 9, name: "串串2", price: 5, type: 'cc'},
//                 {cid: 1, id: 10, name: "串串3", price: 5, type: 'cc'},
//                 {cid: 1, id: 11, name: "炒饭", price: 8, type: 'cc'}, 
//                 {cid: 1, id: 12, name: "萝卜", price: 10, type: 'cc'}, 
//                 {cid: 1, id: 13, name: "豆芽", price: 12, type: 'cc'}, 
//                 {cid: 2, id: 14, name: "炒菜", price: 5, type: 'cc'},
//                 {cid: 2, id: 15, name: "土豆片", price: 5, type: 'cc'},
//                 {cid: 2, id: 16, name: "茄子", price: 5, type: 'cc'},
//                 {cid: 2, id: 17, name: "黄瓜", price: 5, type: 'cc'},
//                 {cid: 2, id: 18, name: "白菜", price: 5, type: 'cc'},
//                 {cid: 2, id: 19, name: "鱼", price: 5, type: 'cc'},
//             ],
//             menuItemsTC: [
//                 {cid:0, id: 20, name: "豪华晚餐0", price: 10, type: 'tc'},
//                 {cid:0, id: 21, name: "豪华晚餐1", price: 10, type: 'tc'}, 
//                 {cid:0, id: 22, name: "豪华晚餐2", price: 15, type: 'tc'}, 
//                 {cid:0, id: 23, name: "豪华晚餐3", price: 20, type: 'tc'},
//                 {cid:1, id: 20, name: "豪华晚餐0", price: 10, type: 'tc'},
//                 {cid:1, id: 21, name: "豪华晚餐1", price: 10, type: 'tc'}, 
//                 {cid:1, id: 22, name: "豪华晚餐2", price: 15, type: 'tc'}, 
//                 {cid:1, id: 23, name: "豪华晚餐3", price: 20, type: 'tc'}, 
//                 {cid:2, id: 20, name: "豪华晚餐0", price: 10, type: 'tc'},
//                 {cid:2, id: 21, name: "豪华晚餐1", price: 10, type: 'tc'}, 
//                 {cid:2, id: 22, name: "豪华晚餐2", price: 15, type: 'tc'}, 
//                 {cid:2, id: 23, name: "豪华晚餐3", price: 20, type: 'tc'}, 
//                 {cid:3, id: 20, name: "豪华晚餐0", price: 10, type: 'tc'},
//                 {cid:3, id: 21, name: "豪华晚餐1", price: 10, type: 'tc'}, 
//                 {cid:3, id: 22, name: "豪华晚餐2", price: 15, type: 'tc'}, 
//                 {cid:3, id: 23, name: "豪华晚餐3", price: 20, type: 'tc'}, 
//             ],
            
//             //加载Menu页时，查询该用户在该餐厅的购物车信息，若信息为空，初始化为[]
//             //返回到餐厅页面时，该属性需要写入数据库（这样设计我认为不合理，可以讨论...）
//             selectedItemInfo: [],

//             //购物车中菜的数量，每个菜的件数累加
//             // numOfItems: this.getNumOfItems() || 0
//             // totalExpense: 0,//总金额
//             // numOfSelected: menuSelectedInfo.numOfSelected || 0//总份数（炒菜+套餐）
//         };  
//     }

//     render() {
//         let itemsCCInThisCanteen = [];
//         let itemsTCInThisCanteen = [];
//         itemsCCInThisCanteen = this.getItemsCC(this.state.canteenInfo.id);
//         itemsTCInThisCanteen = this.getItemsTC(this.state.canteenInfo.id);
//         let selectedItemInfo = [];//购物车信息
//         // console.log(itemsCCInThisCanteen);
//         // console.log(itemsTCInThisCanteen);
//         let itemDivs;
//         if(this.state.menuItemsCC.length === 0 && this.state.menuItemsTC.length === 0){
//             itemDivs = <div>饿肚子吧你。</div>
//         }else{
//             if(this.state.queryState === '炒菜'){//选择炒菜
//                 itemDivs = itemsCCInThisCanteen.map((item, index) => {
//                     // console.log(item);
//                     return(
//                         <ItemCard item={item} key={index} callBackParent={this.addToCart.bind(this)}/>
//                     );
//                 });
//             }else{//选择套餐
//                 itemDivs = itemsTCInThisCanteen.map((item, index) => {
//                     return(
//                         <ItemCard item={item} key={index} callBackParent={this.addToCart.bind(this)}/>
//                     );
//                 });
//             }
//         }

//         return (
//             <div>
//                 <Header name={"餐厅详情"} onLeftArrowClick={() => this.backToCanteenList()}/>
//                 <Tabs tabs={["炒菜", "套餐"]} callBackParent={this.changeTab.bind(this)}/>
//                 <div className="itemList">
//                     {itemDivs}
//                 </div>
//                 <Footer selectedItemInfo={this.state.selectedItemInfo} callBackClickCart={this.showCart.bind(this)}/>
//             </div>
//         );
//     }


//     /**
//      * 点击header左箭头返回餐厅选择界面
//      * 需要将该用户在该餐厅的购物车存入数据库
//      */
//     backToCanteenList() {
//         this.props.history.goBack();
//     }

//     /**s
//      * 切换tab
//      * @param state: 保存当前选的Tab项
//      */
//     changeTab(state) {
//         let tabState = state;
//         this.setState({queryState: tabState}, () => {
//             console.log(this.state.queryState)});      
//         window.sessionStorage.setItem("cp_queryState", state);
//     }

//     /**
//      * 得到餐厅号为canteenId的餐厅的菜单，分别得到炒菜和套餐的详细信息
//      * @param {*} canteenId 
//      */
//     getItemsCC(canteenId) {
//         return this.state.menuItemsCC.filter((item) => item.cid === canteenId);
//     }
//     getItemsTC(canteenId) {
//         return this.state.menuItemsTC.filter((item) => item.cid === canteenId);
//     }

//     addToCart(item) {
//         let itemInfo = {cid: item.id, cnum: 1, price: item.price}; 
//         let currentSelectedItemInfo = this.state.selectedItemInfo;//当前购物车
//         console.log("current cart:"+currentSelectedItemInfo);
//         let itemAlreadySelected = currentSelectedItemInfo.filter((i) => i.cid === item.id);//新添加的这个在购物车里是否存在
//         console.log("已经存在的"+itemAlreadySelected[0]);
//         let newselectedItemInfo;
//         if(itemAlreadySelected.length != 0){//当前购物车里有
//             let newNumOfThisItem = itemAlreadySelected[0].cnum + 1;
//             console.log("更新后有"+newNumOfThisItem+"个");
//             currentSelectedItemInfo.pop();//先把它删了，再添加新的
//             let itemInfo = {cid: item.id, cnum: newNumOfThisItem, price: item.price};             
//             newselectedItemInfo = [...currentSelectedItemInfo, itemInfo];
//         }else{
//             let itemInfo = {cid: item.id, cnum: 1, price: item.price};            
//             newselectedItemInfo = [...this.state.selectedItemInfo, itemInfo];
//         }
//         this.setState((prevState) => ({
//             selectedItemInfo: newselectedItemInfo,
//             numOfItems: prevState.numOfItems + 1
//         }), () => {console.log(this.state.selectedItemInfo)});
//     }

//     /**
//      * 点击购物车图标，显示购物车中的内容
//      * 预期实现方法：点击购物车图标，底部的隐藏页面显示出来，覆盖住原始Menu页面；再次点击
//      * 购物车图标，该页面隐藏
//      */
//     showCart() {
//         console.log("Show items in shopping cart...");
//     }

// }

// export default Menu;