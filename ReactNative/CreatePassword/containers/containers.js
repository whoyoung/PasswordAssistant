import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import * as allActions from '../actions/actions';
import { connect } from 'react-redux';

import NewForm from '../components/newForm';

class Container extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <NewForm  {...this.props}
        />
    );
  }
}

export default connect(state => ({
    state:state.createReducer,
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(Container);