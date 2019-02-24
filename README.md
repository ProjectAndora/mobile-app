# Project Andora mobile app for iOS [![Build Status](https://app.bitrise.io/app/0c81bf9ad1708a47/status.svg?token=P9_svjWems1P03RDhb1Dog&branch=master)](https://app.bitrise.io/app/0c81bf9ad1708a47) and Android [![Build Status](https://app.bitrise.io/app/13d5f1a7b9c80f01/status.svg?token=nv4q_XvjmXuWbmzFaJ-9yA&branch=master)](https://app.bitrise.io/app/13d5f1a7b9c80f01)

## Dependencies

* Node.js LTS and npm
* For native iOS development: XCode 10 and Cocoapods
* For native Android development: Android studio and JDK 8
* For development using Expo client: nothing else

## Environments

Project supports development using both native projects and Expo client. `files` and `scripts/set-env.js` contain environment-related files and scripts. To keep stuff working follow these rules:
* Keep shared dependencies in `files/package.json`
* Keep environment-specific files and dependencies in corresponding folder inside `files`, keep `scripts/set-env.js` updated
* Keep in mind that symlinks and file write restrictions are used to prevent improper changes
* Use `npm run env-clean` before switching to environment
* Use `npm run env-expo` to switch to Expo client environment
* Use `npm run env-native` to switch to native projects environment

## Installation

1. Copy `package.default.json` to `package.json`
2. Set up environment using `npm run env-...`
3. For iOS (native environment): get a [prebuilt React Native framework](https://github.com/ProjectAndora/react-native-prebuild) and move it to `ios/ProjectAndora/External`
3. For iOS (native environment): `cd ios && pods install`

## Run

For expo environment:
1. `npm start`
2. Follow instructions (get Expo client on your device, scan QR code, etc)

For native environment:
1. `npm start` on host machine
2. For iOS: specify host's address in `jsCodeLocation` in `AppDelegate.m` and run XCode project from `ios` folder
3. For Android: do `adb reverse tcp:8081 tcp:8081` if using a device and run Android studio project from `android` folder

## Build

Only native environment can provide APK and IPA builds
1. Just build app as a regular XCode and Android studio project