package com.reactlibrary;

import android.support.annotation.NonNull;

import com.facebook.react.bridge.ReadableArray;

class Util {
	@NonNull
	static String[] createScopesStringArray(ReadableArray scopes) {
		int size = scopes.size();
		String[] _scopes = new String[size];

		for (int i = 0; i < size; i++) {
			_scopes[i] = scopes.getString(i);
		}
		return _scopes;
	}
}
