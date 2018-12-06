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
  signIn(googleClientId, extraScopes = []) {
    return this.configPromise.then(() => FinSignIn.signIn(googleClientId, extraScopes));
  }

  configure(options = {}) {
    if (options.offlineAccess && !options.webClientId) {
      throw new Error('RNFinoramicSignIn: offline use requires web ClientID');
    }

    this.configPromise = FinSignIn.configure(options);
  }

  signOut() {
    return FinSignIn.signOut();
  }

  
}

export const FinoramicSignInSingleton = new FinoramicSignIn();
