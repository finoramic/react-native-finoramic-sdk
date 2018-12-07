import React, {Component} from 'react';
import { StyleSheet, View, Button, PermissionsAndroid, TextInput } from 'react-native';
import { FinoramicSignIn } from 'react-native-finoramic-signin';

const WEB_CLIENT_ID = '695617984308-fl04vs5sb8cd3298prk5vimr7jupjivl.apps.googleusercontent.com';
const FINORAMIC_CLIENT_ID = 'com.i2i';

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
    FinoramicSignIn.configure(FINORAMIC_CLIENT_ID);
    this.state = {
      clientUserId: '',
    };
  }

  handleSendSMS = () => {
    return PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ]).then((results) => {
      if (results[PermissionsAndroid.PERMISSIONS.READ_SMS] === PermissionsAndroid.RESULTS.GRANTED
        && results[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED) {
          return FinoramicSignIn.sendSMS();
      }
    });
  };

  handleUCUIDPress = () => {
    return FinoramicSignIn.getFinoramicUserId()
      .then((result) => console.log(result));
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => FinoramicSignIn.signIn(WEB_CLIENT_ID)}
          title="SignIn"
          color="#841584"
        />
        <View style={{ marginTop: 10 }}>
          <Button
            onPress={this.handleSendSMS}
            title="Send SMS"
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <TextInput
            placeholder="New Client User Id"
            onChangeText={(text) => this.setState({ clientUserId: text })}
          />
          <Button
            onPress={this.handleUCUIDPress}
            title="Update Client User Id"
          />
        </View>
      </View>
    );
  }
}
