import React from 'react';
import { StyleSheet, Text, View, Button, PermissionsAndroid } from 'react-native';
import SaralSDK from './SaralSDK'
import SaralSpecData from './data/saral-physical-layout-representation-specs-example1.json'

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
        SaralSDK.startCamera(JSON.stringify(SaralSpecData)).then(res => {
          console.log(res);
        }).catch((code, message) => {
          console.log(message)
        })
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

