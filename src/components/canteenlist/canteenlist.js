import React, { Component } from 'react';
import Header from '../common-components/header/header';
import Listview from '../common-components/listview/listview';
import './canteenlist.css';

class CanteenList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: [{pid:0, pname: "浪潮科技园区"}, {pid:1, pname: "孙村产业园区"}, {pid:2, pname: "北京园区"}],
            canteenList: [
                {positionId: 0, canteens: [{id: 0, name: "S05-1"}, {id: 1, name: "S05-2"}, {id: 2, name: "S06"}]}, 
                {positionId: 1, canteens: [{id: 3, name: "S01-1"}, {id: 4, name: "S01-2"}, {id: 5, name: "S02"}]},
                {positionId: 2, canteens: [{id: 6, name: "S03-1"}, {id: 7, name: "S03-2"}, {id: 8, name: "S04"}]},
            ],
            selectedCanteenInfo: window.sessionStorage.getItem("selectedCanteenInfo") || {}
        };
    }
    render() {
        let canteenDivs;
        if(this.state.canteenList.length === 0){
            canteenDivs = <div>无餐厅可选。</div>
        }else{
            canteenDivs = this.state.position.map((item, pindex) => {
                let pid = item.pid;
                let pname = item.pname;
                let canteensInThisPosition = this.getCanteensInThisPosition(pid);
                let canteensInThisPositionDivs;
                canteensInThisPositionDivs = canteensInThisPosition.map((canteen, cindex) => {
                return (<Listview name={canteen.name} key={cindex} onClick={this.getSelectedCanteen.bind(this, canteen)}/>);
                });
                return (
                    <div className="positionDiv" key={pindex}>
                        <div className="noStyle">{pname}</div>
                        <div className="subList">{canteensInThisPositionDivs}</div>
                    </div>
                );
            });
        }

        return (
            <div>
                <Header name={"餐厅列表"} onLeftArrowClick={() => this.backToApp()}/>
                <div className="listGroup">{canteenDivs}</div>
            </div>
        );
    }

    /**
     * 点击header返回按钮返回到App页（首页）
     */
    backToApp() {
        this.props.history.goBack();
    }

    /**
     * 根据地点pid，得到该地的食堂列表(可以改进一下，或许用map)
     * @param {*} pid 
     */
    getCanteensInThisPosition(pid) {
        let position = this.state.position;
        let canteenList = this.state.canteenList;
        for(let i = 0; i < position.length; i++) {
            if(canteenList[i].positionId === pid) {
                return canteenList[i].canteens;
            }
        }
        return null;
    }

    /**
     * Step1.得到哪个子组件canteenCard被点击，该子组件对应的信息为选中餐厅的信息
     * Step2.前往对应餐厅，查看菜单
     */
    getSelectedCanteen(canteenInfo) {
        this.setState({
            selectedCanteenInfo: canteenInfo
        });
        this.goToCanteen(canteenInfo);
    }

    /***
     * 根据选中的餐厅信息，前往餐厅查看菜单
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

export default CanteenList;
