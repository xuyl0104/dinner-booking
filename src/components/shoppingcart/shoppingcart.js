import React, { Component } from 'react';
import './shoppingcart.css';

class ShoppingCart extends Component {
    constructor(props){
        super(props);
        let tableNum = this.props.tableNum;
        // let tableNum = JSON.parse(window.sessionStorage.getItem("tableNum")) || 1;        
        this.state = {
            warningInfo: "",
            numOfTables: tableNum
        };
        this.handleMultiply = this.handleMultiply.bind(this);
    }
    render() {
        let show = this.props.show;//是否显示出购物车界面
        let selectedItemInfo = this.props.selectedItemInfo;//所有菜
        let selectedCCItemInfo = selectedItemInfo.filter((item) => item.type === "cc");//炒菜
        let selectedTCItemInfo = selectedItemInfo.filter((item) => item.type === "tc");//套餐
        let selectedCCItemDivs = selectedCCItemInfo.map((item, index) => {
            return (
                <div className="item" key={index}>
                    <div className="left">
                        <span>{item.name}</span>
                    </div>
                    <div className="right">
                        <span>￥{item.price}</span>
                        <div className="remove" onClick={this.removeOne.bind(this, item)}>-</div>
                        <span className="num">{item.num}</span>
                        <div className="add" onClick={this.addOne.bind(this, item)}>+</div>
                    </div>
                </div>
            );
        });

        let selectedTCItemDivs = selectedTCItemInfo.map((item, index) => {
            return (
                <div className="item" key={index}>
                    <div className="left">
                        <span>{item.name}</span>
                    </div>
                    <div className="right">
                        <span>￥{item.price}</span>
                        <span id="removeButton"><div className="remove" onClick={this.removeOne.bind(this, item)}>-</div></span>
                        <span className="num">{item.num}</span>
                        <span id="addButton"><div className="add" onClick={this.addOne.bind(this, item)}>+</div></span>
                    </div>
                </div>
            );
        });


        return (
            <div className={`${show === true ? 'hiddenDiv' : 'visibleDiv'}`}>
                <div className="header">
                    <span>购物车</span>
                    <div className="clear" onClick={this.clearCart.bind(this)}>
                        <img src={require("../../images/trash-bin-symbol.png")} alt=""></img>
                        <span>清空</span>
                    </div>
                </div>

                <div className="category" display="none">
                    <div className="categoryName" style={{'display': `${(selectedCCItemInfo.length===0) ? 'none': ''}`}}>
                        <label>炒菜</label>
                        <input id="numOfTablesInput" type="text" placeholder="默认为1"
                            onChange={this.handleMultiply.bind(this)}
                            value={this.state.numOfTables}></input>
                        <label id="numOfTables">桌数</label>
                        <label id="warningInfo">{this.state.warningInfo}</label>

                    </div>
                    {selectedCCItemDivs}
                </div>  
                <div className="category" style={{'display': `${(selectedTCItemInfo.length===0)? 'none': ''}`}}>
                    <div className="categoryName">
                        <label >套餐</label>
                    </div>
                    {selectedTCItemDivs}
                </div>               
            </div>
        );
    }

    handleMultiply(event) {
        let numOfTables = event.target.value;
        if(numOfTables.trim === '') {
            this.setState({numOfTables: 0}, ()=>{this.props.callBackMultiply(numOfTables);});
        }
        if(isNaN(numOfTables)){
            this.setState((prevState) => ({
                warningInfo: "只能输入数字!",
                numOfTables: prevState.numOfTables
            }), ()=>{this.props.callBackMultiply(numOfTables);});
            setTimeout(function(){
                this.setState({warningInfo: ""});
            }.bind(this),1000);
        }else{
            this.setState({numOfTables: numOfTables}, ()=>{this.props.callBackMultiply(numOfTables);}); 
        }
        // this.props.callBackMultiply(numOfTables);
    }
    
    clearCart() {
        this.setState({
            numOfTables: 1
        });
        this.props.callBackClearCart();
    }

    addOne(item) {
        console.log(item);
        this.props.callBackAdd(item);        
    }

    removeOne(item) {
        console.log(item);
        this.props.callBackRemove(item);                
    }

}
  
  export default ShoppingCart