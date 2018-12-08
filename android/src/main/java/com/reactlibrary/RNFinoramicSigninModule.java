package com.reactlibrary;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.UiThreadUtil;
import com.figg.sdk.android.FinoramicSdk;

import static com.reactlibrary.Util.createScopesStringArray;

public class RNFinoramicSigninModule extends ReactContextBaseJavaModule implements ActivityEventListener {

	static final String TAG = "finoramic-sdk";
	private static final int RC_SIGN_IN = 10001;
	private static final String MODULE_NAME = "FinoramicSignIn";
	private ReactApplicationContext reactContext = null;

	private PromiseWrapper promiseWrapper;

	public RNFinoramicSigninModule(final ReactApplicationContext reactContext) {
		super(reactContext);
		this.reactContext = reactContext;
		promiseWrapper = new PromiseWrapper();
		reactContext.addActivityEventListener(this);
	}

	@Override
	public void onNewIntent(Intent intent) { }

	@Override
	public String getName() {
		return MODULE_NAME;
	}

	@ReactMethod
	public void configure(final String clientID, final Promise promise) {
		FinoramicSdk.init(this.reactContext, clientID);
		promise.resolve(true);
	}

	@ReactMethod
	public void signIn(String googleClientId, ReadableArray extraScopes, Promise promise) {
		Log.d(TAG, "Came in signin react method. GCI:" + googleClientId);
		final Activity activity = getCurrentActivity();

		if (activity == null) {
			promise.reject(MODULE_NAME, "Activity is null");
			return;
		}

		String methodName = "signIn";
		boolean wasPromiseSet = this.promiseWrapper.setPromiseWithInProgressCheck(promise, methodName);
		if (!wasPromiseSet) {
			promise.reject(MODULE_NAME, "Promise was not set");
			return;
		}

		String[] extraScopesAsStringArray = createScopesStringArray(extraScopes);
		final Intent signInIntent = FinoramicSdk.getSignInIntent(this.reactContext, googleClientId, extraScopesAsStringArray);
		UiThreadUtil.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				activity.startActivityForResult(signInIntent, RC_SIGN_IN);
			}
		});
	}

	@Override
	public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
		if (requestCode == RC_SIGN_IN) {
			if (resultCode == Activity.RESULT_OK) {
				String gAccount = data.getStringExtra("account");
				this.handleSignInResult(gAccount);
			}
		}
	}

	private void handleSignInResult(String gAccount) {
		if (gAccount != null) {
			Log.d(TAG, "CLIENT RECEIVED GOOGLE ACCOUNT : " + gAccount);
			this.promiseWrapper.resolve(gAccount);
		} else {
			this.promiseWrapper.reject(MODULE_NAME, "Google account not received successfully");
		}
	}

	@ReactMethod
	public void sendSMS(Promise promise) {
		FinoramicSdk.sendSMS(this.reactContext);
		promise.resolve(true);
	}

	@ReactMethod
	public void updateClientUserId(String newClientUserId, Promise promise) {
		String result = FinoramicSdk.updateClientUserId(newClientUserId);
		if (result != null) {
			promise.resolve(result);
		} else {
			promise.reject(MODULE_NAME, "Client User ID was not updated successfully. Check ADB Logs");
		}
	}

	@ReactMethod
	public void getFinoramicUserId(Promise promise) {
		String userId = FinoramicSdk.getFinoramicUserId(this.reactContext);
		if (userId != null) {
			promise.resolve(userId);
		} else {
			promise.reject(MODULE_NAME, "Could not get Finoramic User Id. Check ADB Logs");
		}
	}
}
