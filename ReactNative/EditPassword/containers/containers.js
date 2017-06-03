import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import * as allActions from '../actions/actions';
import { connect } from 'react-redux';

import EditForm from '../components/editForm';

class Container extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <EditForm  {...this.props}
        />
    );
  }
}

export default connect(state => ({
    state:state.editReducer,
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(Container);