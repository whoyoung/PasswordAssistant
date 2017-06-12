import React, { Component, } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';
import thunk from 'redux-thunk';

const RouterWithRedux = connect()(Router);
import reducers from './reducers';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

import Login from './components/login';
import Entrance from '../Entrance';

export default class app extends Component {
    constructor(props) {
        super(props);
        if (this.props.password) {
            
        }
    }
    
    render() {
        return (
            <Provider store={store}>
                <RouterWithRedux>
                    <Scene key="login" initial={true} title="登陆" component={Login} hideNavBar={true} hideTabBar={true} />
                    <Scene key="entrance" title="Entrance" component={Entrance} hideNavBar={true} hideTabBar={true} />
                </RouterWithRedux>
            </Provider>
        )
    }
}