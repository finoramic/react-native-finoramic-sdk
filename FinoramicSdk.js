import { NativeModules } from 'react-native';

const { FinoramicSignIn: FinSignIn } = NativeModules;

class FinoramicSignIn {
  configPromise;

  constructor() {
    if (__DEV__ && !FinSignIn) {
      console.error('RN Finoramic SignIn native module is not linked correctly.');
    }
  }

  /**
   * Sign In Function
   * @param {String} googleClientId The web client Id of the backend server
   * @param {String[]} extraScopes The array of extra scopes to be added as and when required by client
   */
  getGoogleSignIn(redirectUrl, fetchProfile = false) {
    return this.configPromise.then(() => FinSignIn.getGoogleSignIn(redirectUrl, fetchProfile));
  }

  /**
   * Initializes the SDK
   * @param {String} clientId The Finoramic Client ID given by Finoramic
   */
  configure(clientId, clientUserId, environment) {
    if (!clientId) {
      throw new Error('FinoramicSignIn: ClientID is required');
    }

    this.configPromise = FinSignIn.configure(clientId, clientUserId, environment);
  }

  /**
   * For sending SMS in bulk
   */
  sendSMS() {
    return FinSignIn.sendSMS();
  }

  /**
   * For updating client user id
   * @param {String} clientUserId The user id with which the client identifies a user
   * @returns If successful, returns "OK". Otherwise promise gets rejected
   */
  updateClientUserId(clientUserId) {
    return FinSignIn.updateClientUserId(clientUserId);
  }

  /**
   * For getting the user id with which Finoramic identifies its user
   */
  getFinoramicUserId() {
    return FinSignIn.getFinoramicUserId();
  }
}

export const FinoramicSignInSingleton = new FinoramicSignIn();
