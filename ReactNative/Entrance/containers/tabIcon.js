import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions
} from 'react-native';
let {width} = Dimensions.get('window');
const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
};

class TabIcon extends Component {
  componentWillMount() {
    this.image = null;
    switch (this.props.imageName) {
      case 'passwordList':
        this.image = (<Image source={require('../../Common/images/passwordList.png')} resizeMode='contain' style={{ width: 23, height: 23 }} />)
        break;
      case 'addPassword':
        this.image = (<Image source={require('../../Common/images/addPassword.png')} resizeMode='contain' style={{ width: 23, height: 23 }} />)
        break;
      case 'setting':
        this.image = (<Image source={require('../../Common/images/setting.png')} resizeMode='contain' style={{ width: 23, height: 23 }} />)
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <View>
        <View style={{width:width/3.0,height:1,backgroundColor:'#d4d4d7'}} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#f5f5f7' }} >
        {this.image}
        <Text style={{ color: this.props.selected ? '#00ca47' : '#a3a3a3', marginTop: 5 }} >
          {this.props.title}
        </Text>
      </View>
      </View>
      
    )
  }
}

TabIcon.propTypes = propTypes;

export default TabIcon;
