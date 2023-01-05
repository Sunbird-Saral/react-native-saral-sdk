import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, PermissionsAndroid, Alert } from 'react-native';
import SaralSDK from '../SaralSDK'
import SaralSpecData from '../data/saral-physical-layout-representation-specs-example1.json'
import DropDownMenu from '../DropDownMenu';
import { guj_1s_12Q, guj_1s_34Q, guj_1s_5Q, Hindi_8s_13q_9D_omr, odisha_1s_20Q, up_20s_midday_meal, up_3s_30q_omr, up_4s_20q_omr, up_hindi_8s_13q_omr, up_multisubject_1s_10q, _1S30Q_non_academic ,Guj_1s_15Q} from '../RoisLayout';
import { useDispatch, useSelector } from "react-redux";
import { AllRoiData } from './redux/Reducers/RoidataReducer';
import { CELL_OMR, extractionMethod, multipleStudent, neglectData } from './component/CommonUtils';
export default function App({navigation}) {

  const [roiIndex, setRoiIndex] = useState(-1)
  const [selectedRoi, setSelectedRoi] = useState(-1)

  const [selectedRoiLayout, setSelectedRoiLayout] = useState()

  const dispatch = useDispatch();
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
        let totalPages = selectedRoiLayout&&selectedRoiLayout.layout.hasOwnProperty("pages") && selectedRoiLayout.layout.pages
        let pageNumber = totalPages || totalPages > 0 ? "1" : null
        let jsonRoiData = selectedRoiLayout
        if (roiIndex != -1) {
          SaralSDK.startCamera(JSON.stringify(jsonRoiData), pageNumber).then(res => {
            let roisData = JSON.parse(res);
            let cells = roisData.layout.cells;
            consolidatePrediction(cells, roisData)
          }).catch((code, message) => {
            console.log("message", message)
            console.log("message", code)
          })
        } else {
          Alert.alert("Please Select a roi")
        }
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const neglectData = ["ROLLNUMBER", "STUDENTID", "MARKS_OBTAINED", "MAX_MARKS", "ROLLID"];


  const consolidatePrediction=(cells, roisData) => {
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
        let rollNumber = roisData.layout.cells[i].format.name.replace(/[0-9]/g, '');
        let checkRoLLNumberExist = '';

        if (roisData.layout.hasOwnProperty("identifierPrefix")) {
            checkRoLLNumberExist = roisData.layout.identifierPrefix
        } else if (rollNumber == neglectData[0]) {
            checkRoLLNumberExist = rollNumber
        } else {
           checkRoLLNumberExist = multipleStudent[0]
        }

        if ((rollNumber === checkRoLLNumberExist && rollNumber.length == checkRoLLNumberExist.length)) {
            roisData.layout.cells[i].studentIdPrediction = marks
        } else if((rollNumber.trim() === checkRoLLNumberExist && rollNumber != 0)){
            roisData.layout.cells[i].studentIdPrediction = marks
        }
        else {
            roisData.layout.cells[i].predictedMarks = marks
        }
    }
    dispatch(AllRoiData(roisData))
      navigation.push('ScanDetailScreen')
}
  

  const roiDataList = ["Guj_1s_5Q", "Guj_1s_12Q", "Guj_1s_34Q", "Odisha_1s_20Q", "Up_4s_20q_omr", "Up_3s_30q_omr", "Up_multisubject_1s_10q", "Up_hindi_8s_13q_omr", "Up_20s_midday_meal","Non-Academic","Hindi_8s_13q_9D_omr","Guj_1s_15Q"]

  const onDropDownSelect = (idx, value) => {
    if (value == "Guj_1s_5Q") {
      setSelectedRoiLayout(guj_1s_5Q)
    }
    else if (value == "Guj_1s_15Q") {
      setSelectedRoiLayout(Guj_1s_15Q)
    }
    else if (value == "Guj_1s_12Q") {
      setSelectedRoiLayout(guj_1s_12Q)
    }
    else if (value == "Guj_1s_34Q") {
      setSelectedRoiLayout(guj_1s_34Q)
    }
    else if (value == "Odisha_1s_20Q") {
      setSelectedRoiLayout(odisha_1s_20Q)
    }
    else if (value == "Up_4s_20q_omr") {
      setSelectedRoiLayout(up_4s_20q_omr)
    }
    else if (value == "Up_3s_30q_omr") {
      setSelectedRoiLayout(up_3s_30q_omr)
    }
    else if (value == "Up_multisubject_1s_10q") {
      setSelectedRoiLayout(up_multisubject_1s_10q)
    }
    else if (value == "Up_hindi_8s_13q_omr") {
      setSelectedRoiLayout(up_hindi_8s_13q_omr)
    }
    else if (value == "Up_20s_midday_meal") {
      setSelectedRoiLayout(up_20s_midday_meal)
    }
    else if (value == "Non-Academic") {
      setSelectedRoiLayout(_1S30Q_non_academic)
    }
    else if (value == "Hindi_8s_13q_9D_omr") {
      setSelectedRoiLayout(Hindi_8s_13q_9D_omr)
    }

    setRoiIndex(idx)
    setSelectedRoi(value)
  }

  return (
    <View style={styles.container}>

      <View style={{marginBottom:20}}>
        <DropDownMenu
          options={roiDataList}
          onSelect={(idx, value) => onDropDownSelect(idx, value)}
          defaultData={"Select Roi"}
          defaultIndex={roiIndex}
          selectedData={selectedRoi}
        // icon={require('../../assets/images/arrow_down.png')}
        />
      </View>
      {

        <Button
          title="Click to invoke your native module!"
          color="#841584"
          onPress={requestCameraPermission }
          style={{ marginTop: 20 }}
        />
        

      }
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

