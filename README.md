## Android Setup & Build

- Follow [Capacitor's](https://capacitorjs.com/docs/basics/workflow) instructions to add Android support. It will generate the android folder.
- Install JDK 17 and `chmod -R 777` it. Other versions may not work.
- Make sure the android/local.properties file has `sdk.dir=/usr/lib/android-sdk`. Create it if not exists.
- Run the NPM build:android command (make sure the `JAVA_HOME` env variable export points to the correct JDK folder)

If having issues with licenses:

- Go to android-sdk/tools/bin (or android-sdk/cmdline-tools/bin) and run `./sdkmanager --licenses`.
- If your Android SDK installation did not come with cmdline-tools, download it [here](https://developer.android.com/tools/sdkmanager) and extract it inside the Android SDK folder.

The .apk file will be generated at /android/app/build/outputs/apk.

## Electron Steup

- Make sure the project is builded. Test the application with the `start:electron` script.
- Import the makers with `npx electron-forge import`, if they are not yet imported.
- Run the `build:electron` script to generate the distributables (they are defined at forge.config.js). It will be at 'out' folder.

## Engine Flow

### Initialization

The game has an init method, called on React app's start, and a exit method, called on React app's unmount.
The game's init method calls the Game's setup method passing the game's initial room, spritesets, game config, UI component and debug settings as parameters.
The Game's setup method initializes some classes (input, UI, etc), creates and configurates the canvas HTML element and does some extra minor stuff (like setting the window resize event listener).
The Game's start method sets a interval that calls the Game's cylce method every 16 ms.

### Cycle & Exiting

The Game's cycle method executes all entities' beforeRun methods, resolves their movements, sprites then collisions, executes their onRun methods then finally their afterRun methods.
The Game's exit method clears the Game's cycle interval, sets current room to null and removes the canvas HTML element.
