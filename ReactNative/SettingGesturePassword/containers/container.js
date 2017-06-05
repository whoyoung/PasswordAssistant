import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import * as allActions from '../actions/actions';
import { connect } from 'react-redux';

import SettingGesturePassword from '../components/settingGesturePassword';

class Container extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <SettingGesturePassword  {...this.props}
        />
    );
  }
}

export default connect(state => ({
    state:state.settingGesturePasswordReducer,
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(Container);