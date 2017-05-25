'use strict'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import tForm from 'tcomb-form-native';
let RealForm = tForm.form.Form;
RealForm.i18n.optional = ' (选填)';
RealForm.i18n.required = ' (必填)';
// let Person = tForm.struct({
//   name: tForm.String,
//   surname: tForm.maybe(tForm.String),
//   age: tForm.Number,
//   rememberMe: tForm.Boolean
// });

// const defaultState = {
//   options: {
//     fields: {
//       name: {}
//     }
//   },
//   value: {
//     name: 'hu',
//     surname: 'yang'
//   }
// }
const Name = tForm.enums({
  'formalName': 'yanghu',
  'nickname': 'whoyoung'
}, 'Name');
export default class TcombFormNativeDemo extends Component {
  constructor(props) {
    super();
    this.state = {
      value: {},
      type: this.getFormType(),
      options: {
        fields: {
          birthday: {
            config: {
              animationConfig: {
                duration: 500
              },
              format: (date)=>{
                return date.toLocaleString()
                }
            },

          },
          name: {
            label: '姓名'
          }
        }
      }
    };
  }
  getFormType(name) {
    if (name == 'formalName') {
      return tForm.struct({
        name: Name,
        age: tForm.maybe(tForm.Number)
      });
    } else if (name == 'nickname') {
      return tForm.struct({
        name: Name,
        birthday: tForm.Date
      });
    } else {
      return tForm.struct({
        name: Name
      });
    }
  }
  componentWillMount() {
  }
  componentDidMount() {
    // this.refs.form.getComponent('age').refs.input.focus();
  }
  // onChange(value, path) {
  // if (path.indexOf('rememberMe') >= 0) {
  //   let options = tForm.update(this.state.options, {
  //     fields: {
  //       name: {
  //         editable: { '$set': !value.rememberMe }
  //       }
  //     }
  //   })
  //   this.setState({ options: options, value: value });
  // } else {
  //   this.setState({ value: value });
  // }
  // }
  onChange(value, path) {
    if (path.indexOf('name') >= 0 && value.name !== this.state.value.name) {
      let formType = this.getFormType(value.name);
      this.setState({ value, type: formType });
    } else {
      this.setState({ value });
    }
  }
  onPress() {
    let value = this.refs.form.getValue();
    if (value) {
      console.log(value);
      this.clearForm();
    }
  }
  clearForm() {
    // this.setState({ ...defaultState });
  }
  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <RealForm ref='form' type={this.state.type} options={this.state.options} value={this.state.value} onChange={(value, path) => this.onChange(value, path)} />
        <TouchableHighlight style={styles.button} onPress={() => this.onPress()} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 64,
    padding: 15,
    backgroundColor: '#F5FCFF',
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
});