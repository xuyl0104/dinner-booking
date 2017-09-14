import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import App from './containers/App';
import CanteenList from './components/canteenlist/canteenlist';
import Menu from './components/menu/menu';
import Order from './components/order/order';
import OrderList from './components/orderlist/orderlist';

import './css/basic.css';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route exact path="/App" component={App} />
            <Route path="/canteenList" component={CanteenList} />
            <Route path="/menu" component={Menu} />
            <Route path="/order" component={Order} />
            <Route path="/orderList" component={OrderList} />
        </div>
    </Router>,
    document.getElementById('root')
);
