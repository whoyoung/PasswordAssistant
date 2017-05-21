import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import * as allActions from '../actions/actions';
import { connect } from 'react-redux';

import PasswordList from '../components/passwordList';

class Container extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <PasswordList  {...this.props}
        />
    );
  }
}

export default connect(state => ({
    state:state.listReducer,
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(Container);