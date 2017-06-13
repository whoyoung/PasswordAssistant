import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import * as allActions from '../actions/actions';
import { connect } from 'react-redux';

import Login from '../components/login';

class Container extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <Login  {...this.props} />
    );
  }
}

export default connect(state => ({
    state:state.loginReducer,
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(Container);