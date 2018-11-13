package com.reactnativesdk;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.List;

public class FinoramicSdkPackage implements ReactPackage {

	@Override
	public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
		return Arrays.<NativeModule>asList(new FinoramicSdkModule(reactContext));
	}

	@Override
	public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
		return null;
	}
}
