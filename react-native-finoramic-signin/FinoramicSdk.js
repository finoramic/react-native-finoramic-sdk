import { NativeModules } from 'react-native';

const { FinoramicSignIn: FinSignIn } = NativeModules;

class FinoramicSignIn {
  configPromise;

  constructor() {
    if (__DEV__ && !FinSignIn) {
      console.error('RN Finoramic SignIn native module is not linked correctly.');
    }
  }

  signIn() {
    return this.configPromise.then(() => FinSignIn.signIn());
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
