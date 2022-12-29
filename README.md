# OVERVIEW
Saral mobile application attempts to create a connection between the information that exists in the physical world and ties it to digital structured information. Saral literally means simplicity, conceptualized to enable its user to create structured digital information using mobile devices. The process is also called Saralify or Phygitization. 

Saral should be viewed as an OCR-plus application that is capable of doing OCR and can also understand the structure of the physical input.

## Introduction
This repository provides a ReactNative interface for Android environment. Creating a NPM based package that can be readily and easily packaged for a RN application is currently work in progress. Till that happens please use following instructions to get up and running.
# Steps
## Create a RN application
Start creating a boilerplate starter code by following instructions present [here](https://reactnative.dev/docs/environment-setup#creating-a-new-application).
```
npx react-native init SaralDemo
```
This should give you a functional starter application. You can try running the android application by simple command
```
npm run android
```

## Wiring the SaralSDK
Start with cloning this repository, we have provided a functional application too that should run as expected. Following are the important files and directories that are required

| Name | Description |
| ----------- | ----------- |
| **SaralSDK.js** | Interface for RN application |
| **android/saralsdk** | Layer leveraging OpenCV capabilities and also adding specific models and method for data extraction |
| **android/openCVLibrary343** | [OpenCV android SDK](https://sourceforge.net/projects/opencvlibrary/files/opencv-android/) |


The file and directory needs to be copied at following location.

1. Manually copy "SaralSDK.js" at RN project root. In this case "./SaralDemo"
2. Manually copy "android/saralsdk" and "android/openCVLibrary343" directories inside android folder of the RN project. In this case "./SaralDemo/android"

## Update gradle
Start by importing "./SaralDemo/android" into AndroidStudio. Make sure you have again followed ReactNative and Android environment setup directions properly. Handy link is [here](https://reactnative.dev/docs/environment-setup).

1. Make following changes in `settings.gradle`, this application aware of availability of modules
```
// SaralSDK: Include both as modules
include ':saralsdk'
include ':openCVLibrary343'
```

2. Open project *build.gradle* and add following lines 
```
classpath("com.google.gms:google-services:4.3.3")
```
in `dependencies` section as shown below

```
dependencies {
        classpath("com.android.tools.build:gradle:4.2.1")
        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files

        // SaralSDK uses Firebase for handling model prediction
        classpath("com.google.gms:google-services:4.3.3")
    }
```

3. Make changes in *build.gradle* of project module. For example in this case *Module: SaralDemo.app*. Add entry of "saralsdk" in `dependencies` section
```
    // SaralSDK use OpenCV and SaralSDK code, make them as dependencies here
    implementation project(path: ':saralsdk')
```
and

```
// SaralSDK uses Firebase libraray to load and make model prediction
apply plugin: 'com.google.gms.google-services'
```
at the appropriate place, see example

At this point the project should build fine.

## Update application manifest
SaraSDK launches an activity hence an entry has to be made the appropriate position to make this entry is in `<application>` tag, use following snippet.

```
<!--
    Make an activity entry here as SaralSDK launch an activity internally.
-->
<activity android:name="org.ekstep.saral.saralsdk.SaralSDKOpenCVScannerActivity" />
```
Apart for this additional permission should be provided, use following to start with.

```
<uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

    <uses-feature android:name="android.hardware.camera" android:required="false"/>
    <uses-feature android:name="android.hardware.camera.autofocus" android:required="false"/>
    <uses-feature android:name="android.hardware.camera.front" android:required="false"/>
    <uses-feature android:name="android.hardware.camera.front.autofocus" android:required="false"/>
```

## Make module entry
In `MainApplication.java` file present in `android/app/src/main/java/com/saraldemo/` folder add following lines in function `protected List<ReactPackage> getPackages()`
```
packages.add(new SaralSDKPackage());
```
to load the `SaralSDK`. Please include appropriate import to resolve any error.
```
import org.ekstep.saral.saralsdk.SaralSDKPackage;
```

## Add google-services.json
Lastly, SaralSDK uses Firebase api to load the inferencing model as well has capability to download updated from Firebase console. Hence, a valid `google-services.json` should be added into your project. In this example, we have added a dummy file for demonstration purpose. You can copy this file at `android/app/` of your RN project.

## Changes in RN application
Use following snippet in `App.js` and run appropriate command to get start your RN application.

```
import React from 'react';
import { StyleSheet, Text, View, Button, PermissionsAndroid } from 'react-native';
import SaralSDK from './SaralSDK'

export default function App() {

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "SaralSDK Demo App Camera Permission",
          message:
            "SaralSDK Demo application require camera to perform scanning operation ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission granted, launching now ..");
        SaralSDK.startCamera("{}")
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button
        title="Click to invoke your native module!"
        color="#841584"
        onPress={requestCameraPermission}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

```

**With this your RN application is ready to launch and start layout scanning.**

## After scanning, the scan result screen will open, in which the information according to the layout type will be visible.

![Screenshot_2022-12-28-12-58-12-00_cb652d2d4f4e6c9174df1f4305cd99c2](https://user-images.githubusercontent.com/91952702/209901827-5061ecfc-64ce-4dbe-8652-33f255592239.jpg)
![Screenshot_2022-12-28-12-58-33-63_cb652d2d4f4e6c9174df1f4305cd99c2](https://user-images.githubusercontent.com/91952702/209901840-d48f6b03-cb11-40c0-b7fd-5a9ec9087526.jpg)

