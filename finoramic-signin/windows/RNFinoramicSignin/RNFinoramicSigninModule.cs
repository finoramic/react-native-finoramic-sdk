using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Finoramic.Signin.RNFinoramicSignin
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNFinoramicSigninModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNFinoramicSigninModule"/>.
        /// </summary>
        internal RNFinoramicSigninModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNFinoramicSignin";
            }
        }
    }
}
