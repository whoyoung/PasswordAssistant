import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';

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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
        {this.image}
        <Text style={{ color: this.props.selected ? 'red' : 'black', marginTop: 5 }} >
          {this.props.title}
        </Text>
      </View>
    )
  }
}

TabIcon.propTypes = propTypes;

export default TabIcon;
