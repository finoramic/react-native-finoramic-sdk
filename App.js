import React, {Component} from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { FinoramicSignIn } from 'react-native-finoramic-signin';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default class App extends Component {
  constructor() {
    super();
    FinoramicSignIn.configure({
      webClientId: '695617984308-fl04vs5sb8cd3298prk5vimr7jupjivl.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => FinoramicSignIn.signIn()}
          title="SignIn"
          color="#841584"
        />
      </View>
    );
  }
}
