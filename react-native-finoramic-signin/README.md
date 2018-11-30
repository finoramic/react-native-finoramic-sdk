
# react-native-finoramic-signin

## Getting started

`$ npm install react-native-finoramic-signin --save`

### Mostly automatic installation

`$ react-native link react-native-finoramic-signin`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-finoramic-signin` and add `RNFinoramicSignin.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNFinoramicSignin.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNFinoramicSigninPackage;` to the imports at the top of the file
  - Add `new RNFinoramicSigninPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-finoramic-signin'
  	project(':react-native-finoramic-signin').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-finoramic-signin/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-finoramic-signin')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNFinoramicSignin.sln` in `node_modules/react-native-finoramic-signin/windows/RNFinoramicSignin.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Finoramic.Signin.RNFinoramicSignin;` to the usings at the top of the file
  - Add `new RNFinoramicSigninPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNFinoramicSignin from 'react-native-finoramic-signin';

// TODO: What to do with the module?
RNFinoramicSignin;
```
  