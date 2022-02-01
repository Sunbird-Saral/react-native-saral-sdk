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
        SaralSDK.startCamera(JSON.stringify(SaralSpecData),"1").then(res => {
          let roisData = JSON.parse(res);
          let cells = roisData.layout.cells;
          consolidatePrediction(cells, roisData)
          // console.log("res",res);
        }).catch((code, message) => {
          console.log("message",message)
          console.log("message",code)
        })
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const neglectData = ["ROLLNUMBER", "STUDENTID", "MARKS_OBTAINED", "MAX_MARKS", "ROLLID"];

 const consolidatePrediction = (cells, roisData)=> {
    var marks = "";
    var predictionConfidenceArray = []
    var studentIdPrediction = ""
    for (let i = 0; i < cells.length; i++) {
        marks = ""
        predictionConfidenceArray = []
        for (let j = 0; j < cells[i].rois.length; j++) {
            if (cells[i].rois[j].hasOwnProperty("result")) {
                marks = marks + cells[i].rois[j].result.prediction,
                    predictionConfidenceArray.push(cells[i].rois[j].result.confidence)
                // roisData.layout.cells[i].predictionConfidence = cells[i].rois[j].result.confidence
            } else {
                let resultProperty = {
                        "prediction": "0",
                        "confidence": 0
                    }
                
                roisData.layout.cells[i].rois[j].result = resultProperty
            }

        }
        roisData.layout.cells[i].consolidatedPrediction = marks
        roisData.layout.cells[i].predictionConfidence = predictionConfidenceArray
        if (roisData.layout.cells[i].format.value === neglectData[0] || roisData.layout.cells[i].format.name.length-3 == neglectData[0].length) {
            roisData.layout.cells[i].studentIdPrediction = marks
        } else {
            roisData.layout.cells[i].predictedMarks = marks
        }


    }
    console.log("RoisData",roisData);
}

  
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

