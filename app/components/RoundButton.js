import React from 'react';

import {
  StyleSheet,
  TextInput
} from 'react-native';

export default class RoundTextInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <TextInput
      {...this.props}
      style={styles.container}
      underlineColorAndroid='transparent'
      ref={component => this.props.getRef ? this.props.getRef(component) : null}
    />
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#d6d7da',
    padding: 5,
    paddingLeft: 20
  }
});
