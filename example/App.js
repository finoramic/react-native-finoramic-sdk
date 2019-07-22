import React, {Component} from 'react';
import { StyleSheet, View, Button, PermissionsAndroid, TextInput } from 'react-native';
import { FinoramicSignIn } from 'react-native-finoramic-signin';

const CLIENT_ID = '';
const CLIENT_USER_ID = '123dsa';
const ENVIRONMENT = 'sandbox';
const REDIRECT_URL = 'https://www.finoramic.com';
const FETCH_PROFILE = true;

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
    FinoramicSignIn.configure(CLIENT_ID, CLIENT_USER_ID, ENVIRONMENT);
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
          onPress={() => FinoramicSignIn.getGoogleSignIn(REDIRECT_URL, FETCH_PROFILE)}
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
