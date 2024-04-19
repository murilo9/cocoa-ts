## Android Setup & Build

- Follow [Capacitor's](https://capacitorjs.com/docs/basics/workflow) instructions to add Android support. It will generate the android folder.
- Install JDK 17 and `chmod -R 777` it. Other versions may not work.
- Make sure the android/local.properties file has `sdk.dir=/usr/lib/android-sdk`. Create it if not exists.
- Run the NPM build:android command (make sure the `JAVA_HOME` env variable export points to the correct JDK folder)

If having issues with licenses:

- Go to android-sdk/tools/bin (or android-sdk/cmdline-tools/bin) and run `./sdkmanager --licenses`.
- If your Android SDK installation did not come with cmdline-tools, download it [here](https://developer.android.com/tools/sdkmanager) and extract it inside the Android SDK folder.

The .apk file will be generated at /android/app/build/outputs/apk.
