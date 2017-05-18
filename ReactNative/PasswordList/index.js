import React,{Component} from 'react';
import {
  View,
  Text,
} from 'react-native';
import {Actions} from 'react-native-router-flux'
class PasswordList extends Component{
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
          <Text style ={{fontSize:18}} >i am PasswordList</Text>
      </View>
    )
  }
}

export default PasswordList;
