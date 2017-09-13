import React, { Component } from 'react';
import './canteencard.css';

class CanteenCard extends Component {
    constructor(props) {
        super(props);
        this.state = this.props;
    }
    render() {
        return (
            <div className="canteenCard" onClick={this.goToCanteen.bind(this)}>
                <div><img className="imageblock" src={require("../../../images/canteen.png")} alt=""></img></div>
                <div className="canteenInfo">
                    <div className="canteenName">
                        <span>S06楼负一层茉莉餐厅</span>
                    </div>
                    <div className="category">
                        <span>套餐</span>
                    </div>
                </div>
            </div>
        );
    }

    goToCanteen() {
        this.props.onCardClick();
    }
  }
  
  export default CanteenCard