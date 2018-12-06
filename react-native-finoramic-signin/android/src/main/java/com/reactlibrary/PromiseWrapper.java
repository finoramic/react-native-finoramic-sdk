package com.reactlibrary;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import static com.reactlibrary.RNFinoramicSigninModule.TAG;

public class PromiseWrapper {
	private Promise promise;
	private String nameOfCallInProgress;

	boolean setPromiseWithInProgressCheck(Promise promise, String fromCallsite) {
		boolean success = false;
		if (this.promise == null) {
			this.promise = promise;
			this.nameOfCallInProgress = fromCallsite;
			success = true;
		}
		return success;
	}

	void resolve(Object value) {
		if (this.promise == null) {
			Log.d(TAG, "Cannot resolve; Null promise");
			return;
		}

		promise.resolve(value);
		resetMembers();
	}

	void reject(String code, String message) {
		if (promise == null) {
			Log.d(TAG, "Cannot reject; Null promise");
			return;
		}

		promise.reject(code, message);
		resetMembers();
	}

	public String getNameOfCallInProgress(){
		return nameOfCallInProgress;
	}

	private void resetMembers() {
		this.promise = null;
		this.nameOfCallInProgress = null;
	}
}
