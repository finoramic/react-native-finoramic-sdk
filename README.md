# reactnative-finoramic-sdk

## Installation

1. Download sdk module

```
> npm install finoramic/react-native-finoramic-sdk --save
```

2. Link the module

```
react-native link
```

3. Update android/build.gradle with

```
buildscript {
  ext {
    buildToolsVersion = “27.0.3”
    minSdkVersion = 26
    compileSdkVersion = 27
    targetSdkVersion = 26
    supportLibVersion = “26.0.1”
  }
}

...

  dependencies {
    classpath 'com.android.tools.build:gradle:3.2.1' // <--- use this version or newer
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

4. Update android/app/build.gradle with
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

5. Check that react-native link linked the native module correctly
    - In android/settings.gradle, you should have

    ```
    ...

    include ‘:react-native-finoramic-signin’
    project(‘:react-native-finoramic-signin’).projectDir = new File(rootProject.projectDir, ‘../node_modules/react-native-finoramic-signin/android’)
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

6. Initialize the Finoramic SDK by calling the configure method in the constructor of the root component of your app and pass the Finoramic Client ID in the function’s parameters.

```
import { FinoramicSignIn } from ‘react-native-finoramic-signin’; // <-- way to import

...

export default App extends React.Component {

  ...

  constructor() {
    super();
    FinoramicSignIn.configure(<CLIENT_ID>, <CLIENT_USER_ID>);
  }

  ...

}
```

7. Call the getGoogleSignIn method onclick sign in button.

|param|required|value|comments|
|---|---|---|---|
|**redirect_url**|required|string|URL to redirect to after login|
|fetch_profile|optional|boolean|If set to true, Finoramic will send user’s Google profile details along with redirect|

```
...

import { FinoramicSignIn } from ‘react-native-finoramic-signin’;

...

signIn() {
  return FinoramicSignIn.getGoogleSignIn(<REDIRECT_URL>, <FETCH_PROFILE>)
    .then((data) => {
      // Handle sign-in
    })
}

render() {

  ...

  return (

    ...

    <Button
      onPress={() => signIn()}
      title=”LOGIN”
    />

    ...

  );
}
```

Upon successful login, google profile will be sent in the success method of callback context (if fetch_profile is set to true).

The format of data is a JSONString

|param|value|comments|
|---|---|---|
|clientInput|JSON|Contains client input in encoded JSON format |
|finoramicOutput|JSON|Contains users google profile info in encoded JSON format|

When parsed, response will look like

```
{
  clientInput: {
    "clientUserId": "abc123"
  },
  finoramicOutput: {
    "googleUserId": "10746794874287731198",
    "email": "ravi.verma1337@gmail.com",
    "response": {
      "id": "10746794874287731198",
      "name": "Ravi Verma",
      "displayName": "Ravi Verma",
      "familyName": "Verma",
      "givenName": "Ravi",
      "displayNameLastFirst": "Verma, Ravi",
      "email": "ravi.verma1337@gmail.com",
      "dob": {
        "year": 1990,
        "month": 2,
        "day": 15
      }
    }
  }
}
```

For error cases, response will look like
```
finoramicOutput: {
  "googleUserId": "10746794874287731198",
  "email": "ravi.verma1337@gmail.com",
  "login": "error",
  "code": 500,
  "message": "Internal Server Error"
}
```

8. For SMS, it is necessary that you have requested Android Permissions for READ_SMS and ACCESS_FINE_LOCATION from the user.

```
import { FinoramicSignIn } from ‘react-native-finoramic-signin’;

...

<Button
  onPress={() => {
    this.requestPermissions() // <-- implement this function
      .then(() => FinoramicSignIn.sendSMS()); // <-- ensure permissions are given before calling
  }

  ...

/>
```

## Example

```
constructor() {
    super();
    FinoramicSignIn.configure(CLIENT_ID, CLIENT_USER_ID);
  }

  handleSendSMS = () => {
    // Check permissions here and call sendSMS() only if permission is granted
    return FinoramicSignIn.sendSMS();
  };

  signIn() {
    return FinoramicSignIn.getGoogleSignIn(<REDIRECT_URL>, <FETCH_PROFILE>)
      .then((data) => {
        // Handle sign-in
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => signIn()}
          title="SignIn"
        />
    );
  }
```

## DISCLAIMER

The information contained within this document is confidential and proprietary to Varignon Technologies Private Limited. Recipients may not disclose, duplicate, distribute or otherwise disseminate this information without the express, written authorization or permission for the future Calls. Recipients are expected to accept these conditions without exceptions unless this organization is notified to the contrary.  Recipients are expected to communicate this information to their employees, or anyone else having access to this document. This information shall be safeguarded with the same degree of protection the recipient would afford its own proprietary data.
