
# react-native-finoramic-signin

## Getting started

`$ npm install finoramic/react-native-finoramic-sdk --save`

## Android SDK Requirements


## Google Project Configuration
* Follow [this](https://github.com/react-native-community/react-native-google-signin/blob/master/docs/get-config-file.md) guide to get the configuration file
* Place the generated configuration file (google-services.json) into <YOUR_PROJECT_ROOT>/android/app

## Installation
Please note that this package requires android gradle plugin of version >= 3, which in turn requires at least gradle 4.1. Android studio should be able to do the upgrade for you.

1. run `react-native link`
2. Update `android/build.gradle` with
```
buildscript {
  ext {
  buildToolsVersion = “27.0.3”
  minSdkVersion = 16
  compileSdkVersion = 27
  targetSdkVersion = 26
  supportLibVersion = “26.0.1”
  }
}
... 
dependencies {
  classpath 'com.android.tools.build:gradle:3.1.4' // <--- use this version or newer
  classpath 'com.google.gms:google-services:4.0.1' // <--- use this version or newer
}
... 
allprojects {
  repositories {
    google() <-- make sure this is included
    mavenLocal()
    jcenter()
    maven {
      // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
      url "$rootDir/../node_modules/react-native/android"
    }
  }
}
```
3. Update `android/app/build.gradle` with
```
... 
dependencies {
  implementation project(':react-native-finoramic-signin')
  implementation fileTree(dir: "libs", include: ["*.jar"])
  implementation 'com.google.android.gms:play-services-location:16.0.0'
  implementation 'com.google.android.gms:play-services-auth:16.0.1'
  implementation "com.android.support:appcompat-v7:26.1.0"
  implementation "com.facebook.react:react-native:+"  // From node_modules
  implementation 'com.google.firebase:firebase-core:16.0.6
}

apply plugin: 'com.google.gms.google-services' // <--- this should be the last line
```
4. Check that `react-native link` linked the native module correctly.
  - In `android/settings.gradle`, you should have
  ```
  ... 
  include ‘:react-native-finoramic-signin’
  project(‘:react-native-finoramic-signin’).projectDir = new File(rootProject.projectDir, ‘../node_modules/react-native- finoramic-signin/android’)
  ```
  - In MainApplication.java, you should have
  ```
  import com.finoramic.RNFinoramicSignInPackage; // <-- import

  public class MainApplication extends Application implements ReactApplication {
    ... 
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new RNFinoramicSigninPackage() // <-- this needs to be in the list
      );
    }
    ...
    }
  ```
## Public API
### 1. Installation
You must first initialize the Finoramic SDK by calling the `configure()` function in the constructor of the root component of your app and pass the Finoramic Client ID given by us in the function’s parameters. It is necessary that it be declared right at the starting of the app.
#### API
**configure(finoramicClientId)**
* `finoramicClientId` being the client ID that you obtained from Finoramic.
#### Example
```
import { FinoramicSignIn } from ‘react-native-finoramic-signin’; // <-- way to import
... 

const FINORAMIC_CLIENT_ID = ‘’; // <-- replace it with your clientId

export default App extends React.Component {
  ... 
  constructor() {
    super();
    FinoramicSignIn.configure(FINORAMIC_CLIENT_ID);
  }
  ... 
}
```
### 2. Finoramic Sign In
It is mandatory to have called the `configure()` function before calling the `signIn()` function. This function prompts a modal to let the user sign in to your application. Resolved promise returns a `GoogleSignInAccount` object.
#### API
**signIn(webClientId, extraScopes)**
* `webClientId` is the client ID of type WEB for your server (needed for offline access)
* `extraScopes` is an array of Strings containing any extra [`Scopes`](https://developers.google.com/android/reference/com/google/android/gms/common/api/Scope) that your application requires access to
#### Example
```
... 
import { FinoramicSignIn } from ‘react-native-finoramic-signin’;
... 
render() {
  ...
  return (
    ... 
    <Button
      onPress={() => FinoramicSignIn.signIn(WEB_CLIENT_ID)}
      title=”LOGIN”
    />
    ... 
  );
}
```
### 3. SMS
For SMS, it is necessary that you have requested Android Permissions for READ_SMS and ACCESS_FINE_LOCATION from the user. To know how to request permissions in React Native, follow this [example](https://facebook.github.io/react-native/docs/permissionsandroid#example).
#### API
**sendSMS()**
#### Example
```
import { FinoramicSignIn } from ‘react-native-finoramic-signin’;
	... 
	<Button
	  onPress={() => {
      		this.requestPermissions() // <-- implement this function by following above example link
       		.then(() => FinoramicSignIn.sendSMS()); // <-- ensure permissions are given before calling
	  	}
	  }
	  ...
	/>
```
### 4. Other Utility functions
#### API
**updateClientUserId(clientUserId)**
* `clientUserId` being the ID with which you as our client, identify your users
#### Example
```
import { FinoramicSignIn } from ‘react-native-finoramic-signin’;
	... 
	<Button
	  onPress={() => FinoramicSignIn.updateClientUserId(CLIENT_USER_ID)}
	  ... 
	/>
```

#### API
**getFinoramicUserId()**
#### Example
```
import { FinoramicSignIn } from ‘react-native-finoramic-signin’;
	...  
	FinoramicSignIn.getFinoramicUserId().then((finoramicUserId) => {
		// do stuff with finoramic user id
  });
```
