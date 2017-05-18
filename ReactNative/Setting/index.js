import React,{Component} from 'react';
import {
  View,
  Text,
} from 'react-native';
import {Actions} from 'react-native-router-flux'
class Setting extends Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
  }

  componentDidMount(){
  }

  componentWillUpdate(){
  }

  componentDidUpdate(){
  }

  componentWillUnmount(){
  }

  render(){
    return(
      <View style ={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <Text style ={{fontSize:18}} >i am Setting</Text>
      </View>
    )
  }
}

export default Setting;
