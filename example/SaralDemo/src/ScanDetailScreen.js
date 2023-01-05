import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, Dimensions, StyleSheet, TextInput } from "react-native";
import MarksHeaderTable from './component/MarkHeaderTable';
import { CELL_OMR, extractionMethod, multipleStudent, neglectData, student_ID,getStudentsExamData } from './component/CommonUtils';
import ButtonComponent from './component/ButtonComponent';
import { useDispatch, useSelector } from "react-redux";
import SaralSDK from '../SaralSDK';
import { AllRoiData,MultiPageActions } from './redux/Reducers/RoidataReducer';

const { width, height } = Dimensions.get('window')
const ScanDetailScreen = ({ route, navigation }) => {
     //Hookes
     const [summary, setSummary] = useState(false)
     const [newArrayValue, setNewArrayValue] = useState([])
     const [btnName, setBtnName] = useState('Cancel')
     const [obtainedMarks, setObtainedMarks] = useState(0)
     const [isLoading, setIsLoading] = useState(false)
     const [studentId, setStudentID] = useState();
     const [stdErr, setStdErr] = useState("");
     const [edit, setEditValue] = useState(true)
     const [studentValid, setStudentValid] = useState()
     const [studentData, setStudentDATA] = useState([])
     const [maxMarksTotal, setMaxMarksTotal] = useState(0)
     const [sumOfObtainedMarks, setSummOfObtainedMarks] = useState(0)
     const [totalMarkSecured, setTotalMarkSecured] = useState()
     const [obtnmarkErr, setObtnMarkErr] = useState(false)
     const [maxmarkErr, setMaxMarkErr] = useState(false)
     const [disable, setDisabled] = useState(false)
     const [isMultipleStudent, setIsmultipleStudent] = useState(false)
 
     const [stdRollArray, setStdRollArray] = useState([])
     const [structureList, setStructureList] = useState([])
     const [currentIndex, setCurrentIndex] = useState(0)
     const [valid, setValid] = useState(false);
     const [isStudentValid, setIsStudentValid] = useState(false);
     const [multiPageStdId, setMultipageStdId] = useState();
 
     const [nextBtn, setNextBtn] = useState('CLOSE')
     const [checkStdRollDuplicate, setCheckStdRollDuplicate] = useState([])
     const [stdAddRollData, setStdAddRollData] = useState([])
     const [toggleCheckBox, setToggleCheckBox] = useState(false)
     const [logmessage, setLogmessage] = useState()
     const [multiPage, setMultiPage] = useState(0)
     const [isModalVisible ,setIsModalVisible] = useState(false)
     const [tagData ,setTagData] = useState([])
     const [questionIdData ,setQuestionIdData] = useState()
     const [omrResultErr, setOmrResult] = useState()
     const [isOmrOptions, setOmrOptions] = useState(false)
     const [isAlphaNumeric, setIsAlphaNumeric] = useState(false)
     const [filterData, setFilterData] = useState({data: [], len: 0})
     const dispatch = useDispatch()
     const roisData = useSelector(state => state.RoiSliceData.roiData)
     
     useEffect(() => {
         let checkRoLLNumberExist = roisData.layout.hasOwnProperty("identifierPrefix") ? roisData.layout.identifierPrefix : roisData.layout.cells[0].format.name.replace(/[0-9]/g, '') == multipleStudent[0] ? multipleStudent[0] : neglectData[0]
         let checkIsStudentMultipleSingle = roisData.layout.cells.filter((e) => {
             let withNoDigits = e.format.name.replace(/[0-9]/g, '');
             let wordLen = withNoDigits.length;
             let multiple = 0
             if (wordLen === checkRoLLNumberExist.length && withNoDigits === checkRoLLNumberExist) {
                 multiple = multiple + 1
             }
             return multiple
         })
 
         let filterWithZeroStudentData = roisData.layout.cells.filter((e) => {
             let withNoDigits = e.format.name.replace(/[0-9]/g, '');
             let wordLen = withNoDigits.length;
             let multiple = 0
             if (wordLen === checkRoLLNumberExist.length && withNoDigits === checkRoLLNumberExist) {
                 multiple = multiple + 1
             }
             return multiple
         })
 
 
         if(roisData.layout.cells[1].rois[0].extractionMethod == "BLOCK_ALPHANUMERIC_CLASSIFICATION"){
             setIsAlphaNumeric(true)
         }
        
      
         if (roisData.layout.hasOwnProperty("pages") && roisData.layout.pages > 0) {
             setMultiPage(roisData.layout.pages)
             setNextBtn("SCAN PAGE #2")
         }
 
         if (checkIsStudentMultipleSingle.length > 1) {
             let findNonZeroRollStd = roisData.layout.cells.filter((e) => {
                 let withNoDigits = e.format.name.replace(/[0-9]/g, '');
                 let wordLen = withNoDigits.length;
                 let multiple = 0
                 if (wordLen === checkRoLLNumberExist.length && withNoDigits === checkRoLLNumberExist && (e.consolidatedPrediction) != 0) {
                     multiple = multiple + 1
                 }
                 return multiple
             })
 
             setNextBtn("NEXT")
             setStdRollArray(findNonZeroRollStd)
             setIsmultipleStudent(true)
             callMultipleStudentSheetData(filterWithZeroStudentData)
         } else {
             let checkIsOmrOption = roisData.layout.cells[1].hasOwnProperty("omrOptions") ? true : false
             setOmrOptions(checkIsOmrOption)
             callSingleStudentSheetData()
         }
     }, []);
 
     const callMultipleStudentSheetData = (checkIsStudentMultipleSingle) => {
        let marTemp = []
        let dummy = []

        let len = roisData.layout.cells.length;

        roisData.layout.cells.forEach((element, index) => {
            checkIsStudentMultipleSingle.forEach((e, i) => {
                if (element.format.name === e.format.name) {
                    dummy.push(index)
                }
            });
        });
        dummy.push(len)

        dummy.forEach((el, index) => {
            if (dummy.length > index + 1) {
                let data = roisData.layout.cells.slice(dummy[index], dummy[index + 1])
                    marTemp.push({
                        RollNo: data[0].consolidatedPrediction,
                        data: data.slice(1, data.length)
                    })
            }
        });

       let removeZeroRollStd = marTemp.filter((data, i) => { 
            if ((data.RollNo) != 0) {
                return true
            }
        })

        if (removeZeroRollStd.length != 0) {
            setStudentID(removeZeroRollStd[0].RollNo)
            setNewArrayValue(removeZeroRollStd[0].data)
            setStructureList(removeZeroRollStd)
        } else {
            goToMyScanScreen()
        }



    }

    const callSingleStudentSheetData = () => {
        let data = ''
        let elements = neglectData;
        let indexArray = [];

        let checkRoLLNumberExist = roisData.layout.hasOwnProperty("identifierPrefix") ? roisData.layout.identifierPrefix : roisData.layout.cells[0].format.name.replace(/[0-9]/g, '') == multipleStudent[0] ? multipleStudent[0] : neglectData[0]
        let checkIsStudentMultipleSingle = roisData.layout.cells.filter((e) => {
            let withNoDigits = e.format.name.replace(/[0-9]/g, '');
            let wordLen = withNoDigits.length;
            let multiple = 0
            if (wordLen === checkRoLLNumberExist.length && withNoDigits === checkRoLLNumberExist) {
                multiple = multiple + 1
            }
            return multiple
        });

        if (checkIsStudentMultipleSingle.length == 1) {
            data = roisData.layout.cells.filter((element) => {
                if (element.format.name.replace(/[0-9]/g, '') == checkRoLLNumberExist || element.format.name == elements[1] || element.format.name == elements[4] || element.page && element.page != 1) {
                    return false
                } else {
                if (element.page > 0) {
                    setCurrentIndex(currentIndex + 1)
                }
                return true
            }
        })
        } else {
            var hasNonZeroStdId = false;
            roisData.layout.cells.forEach((element, index) => {
                checkIsStudentMultipleSingle.forEach((e, i) => {
                    if (element.format.name === e.format.name) {
                        if (e.consolidatedPrediction != 0) {
                            hasNonZeroStdId = true
                            indexArray.push(index + 1)
                        } else if (hasNonZeroStdId) {
                            indexArray.push(index)
                            hasNonZeroStdId = false
                        }
                    }
                });
            });
            data = roisData.layout.cells.slice(indexArray[0], indexArray[1])
            setFilterData({ data: data, len: checkIsStudentMultipleSingle.length })
        }

        //check value marksObtained and maxMarks is present in array or not
        let marksObtained = data.some(item => item.format.name === elements[2])
        let maxMarks = data.some(item => item.format.name === elements[3])

        let len = data.length;

        if (maxMarks && marksObtained) {
            //get maxMark and Obtained marks to validate
            let extract_MAX_OBTAINED_MARKS = data.filter((e) => {
                if (e.format.name == elements[2]) {
                    setTotalMarkSecured(e.consolidatedPrediction)
                    return
                }
                if (e.format.name == elements[3]) {
                    setMaxMarksTotal(e.consolidatedPrediction)
                    return
                }
                else {
                    return true
                }
            })
            //extract_MAX_OBTAINED_MARKS return all question data except max marks and obtained marks

            //DO summ of all result from extract_MAX_OBTAINED_MARKS except max marks and obtained marks
            let maximum = 0;
            let sum = extract_MAX_OBTAINED_MARKS.forEach((e) => {
                maximum = parseInt(maximum) + parseInt(e.consolidatedPrediction)
                return maximum
            });
            setNewArrayValue(data)
            setSummOfObtainedMarks(maximum)
        } else {
            //set Data of Other sheet except of marksObtained and maxMarks wala
            setNewArrayValue(data)
        }

        //get student Id
        for (const element of roisData.layout.cells) {
            if (element.format.name.replace(/[0-9]/g, '') == checkRoLLNumberExist && element.consolidatedPrediction != 0) {
                setStudentID(element.consolidatedPrediction)
                setMultipageStdId(element.consolidatedPrediction)
                break
            }
        }
    }


    const goNextFrame = () => {  
            if (currentIndex + 1 <= stdRollArray.length - 1) {
                dispatch(AllRoiData(JSON.parse(JSON.stringify(roisData))))
                setNewArrayValue(structureList[currentIndex + 1].data)
                setStudentID(structureList[currentIndex + 1].RollNo)
                setCurrentIndex(currentIndex + 1)
                setBtnName('Back')
                if (currentIndex + 1 == stdRollArray.length - 1) {
                    setNextBtn("Close")
                }
            } else {  
                    dispatch(AllRoiData(JSON.parse(JSON.stringify(roisData))))
                    goToMyScanScreen()

            }

    }

    
     const goBackFrame = () => {
        if (currentIndex - 1 >= 0) {
            setNewArrayValue(structureList[currentIndex - 1].data)
            setStudentID(structureList[currentIndex - 1].RollNo)
            setCurrentIndex(currentIndex - 1)
            if (currentIndex == 1) {
                setBtnName('cancel')
            }
            setNextBtn("Next")
        }
        else {
            onBackButtonClick()
        }
    }


     const renderSRNo = (element, index) => {
             return `${index + 1}`
     }
 
 
     const onBackButtonClick = () => {
        navigation.navigate('App')
    }
 
 
     const onSubmitClick = async () => {
                 //without MAX & OBTAINED MARKS
                 if (multiPage > 0) {
                     let isAbleToGoNextPage = currentIndex + 1 <= multiPage;
                     if (isAbleToGoNextPage) {
                         openCameraActivity();
                     } else {
                        goToMyScanScreen()
                     }
                 } else if (currentIndex + 1 == multiPage) {
                     setNextBtn("CLOSE")
                 }
                 else {
                     goToMyScanScreen()
                 }
             
         
     }

   
 
     const goNextPage = () => {
         onSubmitClick()
     }
 
     const scanNextSheet = (roisData) => {
         const elements = neglectData;
         
         let filterDataAccordingPage = roisData.layout.cells.filter((element) => {
            let checkIdentifierExist = roisData.layout.hasOwnProperty("identifierPrefix") ? roisData.layout.identifierPrefix : roisData.layout.cells[0].format.name.replace(/[0-9]/g, '') == multipleStudent[0] ? multipleStudent[0] : neglectData[0]
            if (element.format.name == checkIdentifierExist || element.format.name == elements[1] || element.format.name == elements[4] || element.page != currentIndex + 1) {
                return false
            }
            else {
                return true
            }
        })
        if (filterDataAccordingPage.length > 0 ) {
            setNextBtn(`Scan Page#${currentIndex + 2}`)
            setCurrentIndex(currentIndex + 1)
            setBtnName('Back')
            // setNextBtn('CLOSE')
            setNewArrayValue(filterDataAccordingPage)
            if(currentIndex + 1  == multiPage) {
                setNextBtn('CLOSE')
            }
        }
     }
 

     const goBackPage = () => {
        if (currentIndex - 1 >= 1) {
            if (!studentValid && !toggleCheckBox) {
                // showErrorMessage(Strings.please_correct_student_id)
            }
            else if (isStudentValid){
                // showErrorMessage(Strings.student_id_should_be_same)
            } else {
                setNextBtn(`Scan Page#${currentIndex}`)
                const elements = neglectData;
                let checkIdentifierExist = roisData.layout.hasOwnProperty("identifierPrefix") ? roisData.layout.identifierPrefix : roisData.layout.cells[0].format.name.replace(/[0-9]/g, '') == multipleStudent[0] ? multipleStudent[0] : neglectData[0]
                let filterDataAccordingPage = roisData.layout.cells.filter((element) => {
                    if (element.format.name == checkIdentifierExist || element.format.name == elements[1] || element.format.name == elements[4] || element.page != currentIndex - 1) {
                        return false
                    }
                    else {
                        return true
                    }
                })
                setNewArrayValue(filterDataAccordingPage)
                setCurrentIndex(currentIndex - 1)
                if (currentIndex - 1 == 1) {
                    setBtnName('Cancel')
                }
            }
        } else {
            onBackButtonClick()
        }
    }


 
     const goToMyScanScreen = () => {
        navigation.navigate("App")
         return true
     }
 
     const openCameraActivity = async () => {
         try {
 
             SaralSDK.startCamera(JSON.stringify(roisData), (currentIndex + 1).toString()).then(res => {
                 let roisData = JSON.parse(res);
                 let cells = roisData.layout.cells;
                 consolidatePrediction(cells, roisData)
 
             }).catch((code, message) => {
             })
         } catch (err) {
         }
     };
 
     const consolidatePrediction = (cells, roisData) => {
         let rollNumber = roisData.layout.cells[0].consolidatedPrediction
         if (rollNumber != studentId) {
             setStudentID(rollNumber);
             scanNextSheet(roisData);
             setIsStudentValid(true);
         }else {
             setStudentID(rollNumber)
             setStdErr("");
             scanNextSheet(roisData);
             setIsStudentValid(false);
         }
     }
 
    return (
        <View style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}
                bounces={false}
                keyboardShouldPersistTaps={'handled'}>

                <View style={styles.deatilsViewContainer}>
                    <View style={styles.detailsSubContainerStyle}>
                        <View style={styles.headerLabelViewStyle}>
                            <Text style={styles.labelTextStyle}>{"ID : "}</Text>
                        </View>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(text) => {
                                setStudentID(text)
                                if (currentIndex == 1 && multiPage > 0) {
                                    setMultipageStdId(text)
                                }
                            }}
                            value={studentId}
                            editable={false}

                        />
                    </View>
                    {
                        isMultipleStudent
                            ?
                            <Text style={styles.nameTextStyle}>{'Record No' + ': ' + (currentIndex + 1)}</Text>
                            :
                            roisData.layout.pages > 0
                                ?
                                <Text style={styles.nameTextStyle}>{'Record No' + ': ' + (currentIndex)}</Text>
                                :
                                null
                    }


                </View>
                <View style={{ flexDirection: 'row', width: width, justifyContent: 'center' }}>
                    <MarksHeaderTable
                        customRowStyle={{ width: width / 3.2 }}
                        rowTitle={'Sr No'}
                        editable={false}
                    />
                    <MarksHeaderTable
                        customRowStyle={{ width: width / 3.2 }}
                        rowTitle={'Question'}
                        editable={false}
                    />
                    <MarksHeaderTable
                        customRowStyle={{ width: width / 3.2 }}
                        rowTitle={'Marks'}
                        editable={false}
                    />
                </View>
                {
                    newArrayValue.map((element, index) => {
                        return (
                            <View element={element} key={index} style={{ flexDirection: 'row', width: width, justifyContent: 'center' }}>

                                <MarksHeaderTable
                                    customRowStyle={{ width: width / 3.2 }}
                                    rowTitle={renderSRNo(element, index)}
                                    editable={false}
                                    keyboardType={'number-pad'}
                                />
                                <MarksHeaderTable
                                    customRowStyle={{ width: width / 3.2 }}
                                    rowTitle={element.format.value}
                                    editable={false}
                                    keyboardType={'number-pad'}
                                />
                                <MarksHeaderTable
                                    customRowStyle={{ width: width / 3.2 }}
                                    rowTitle={element.consolidatedPrediction}
                                    editable={false}
                                    keyboardType={element.hasOwnProperty("omrOptions") ? 'name' : 'name'}
                                />


                            </View>
                        )
                        // }
                    })
                }
                <View style={[styles.viewnxtBtnStyle1, { paddingTop: '7%' }]}>
                    <ButtonComponent
                        customBtnStyle={[styles.nxtBtnStyle1, { marginTop: '5%' }]}
                        btnText={btnName.toUpperCase()}
                        onPress={() => isMultipleStudent ? goBackFrame() : multiPage > 0 ? goBackPage() : onBackButtonClick()}
                    />
                    <ButtonComponent
                        customBtnStyle={[styles.nxtBtnStyle1, { marginTop: '5%' }]}
                        btnText={nextBtn.toUpperCase()}
                        onPress={() => isMultipleStudent ? goNextFrame() : multiPage > 0 ? goNextPage() : onSubmitClick()}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    viewnxtBtnStyle1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    nxtBtnStyle1: {
        width: '45%',
        marginHorizontal: 5,
        marginBottom: 20,
        borderRadius: 10
    },
    nameTextStyle: {
        lineHeight: 25,
        fontSize: 18,
        fontWeight: '500',
        color: '#000',
        letterSpacing: 1,
        marginLeft: 10
    },
    inputStyle: {
        padding: 0,
        color: "#000",
    },
    headerLabelViewStyle: {
        justifyContent: 'flex-start',
    },
    labelTextStyle: {
        fontSize: 18,
        color: "#111",
        fontWeight: '700',
        letterSpacing: 1,
        lineHeight: 35,
    },
    detailsSubContainerStyle: {
        flexDirection: 'row',
        marginHorizontal: 10
    }
})
export default ScanDetailScreen