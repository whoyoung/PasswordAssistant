import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import * as allActions from '../actions/actions';
import { connect } from 'react-redux';

import ChoosePasswordType from '../components/choosePasswordType';

class Container extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <ChoosePasswordType  {...this.props}
        />
    );
  }
}

export default connect(state => ({
    state:state.chooseReducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(Container);