import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import * as allActions from '../actions/actions';
import { connect } from 'react-redux';

import Setting from '../components/setting';

class Container extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <Setting  {...this.props}
        />
    );
  }
}

export default connect(state => ({
    state:state.settingReducer,
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(Container);