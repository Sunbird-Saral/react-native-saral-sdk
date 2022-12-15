import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, Dimensions, StyleSheet, TextInput } from "react-native";
import MarksHeaderTable from './component/MarkHeaderTable';
import { CELL_OMR, extractionMethod, multipleStudent, neglectData } from './component/CommonUtils';
import ButtonComponent from './component/ButtonComponent';
import { useDispatch, useSelector } from "react-redux";

const { width, height } = Dimensions.get('window')
const ScanDetailScreen = ({ route, navigation }) => {
    const [newArrayValue, setNewArrayValue] = useState([])
    const [btnName, setBtnName] = useState('Cancel')
    const [studentId, setStudentID] = useState();
    const [maxMarksTotal, setMaxMarksTotal] = useState(0)
    const [sumOfObtainedMarks, setSummOfObtainedMarks] = useState(0)
    const [totalMarkSecured, setTotalMarkSecured] = useState()
    const [isMultipleStudent, setIsmultipleStudent] = useState(false)
    const [stdRollArray, setStdRollArray] = useState([])
    const [structureList, setStructureList] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [multiPageStdId, setMultipageStdId] = useState();
    const [nextBtn, setNextBtn] = useState('Close')
    const [multiPage, setMultiPage] = useState(0)
    const [isOmrOptions, setOmrOptions] = useState(false)
    const [isAlphaNumeric, setIsAlphaNumeric] = useState(false)
    const [filterData, setFilterData] = useState({ data: [], len: 0 })

    //  const roisData = route.params.roisData
    const roisData = useSelector(state => state.RoiSliceData.roiData)
    console.log('roisData>>>', studentId);
    useEffect(() => {
        // console.log('roisData>>>',roisData.layout);
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


        if (roisData.layout.cells[1].rois[0].extractionMethod == "BLOCK_ALPHANUMERIC_CLASSIFICATION") {
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
            // goToMyScanScreen()
        } else {
            let checkIsOmrOption = roisData.layout.cells[1].hasOwnProperty("omrOptions") ? true : false
            setOmrOptions(checkIsOmrOption)
            callSingleStudentSheetData()
        }
    }, []);

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

    const goToMyScanScreen = () => {
        navigation.navigate("App")
    }

    const renderSRNo = (element, index) => {
        return `${index + 1}`
    }


    const goBackFrame = () => {
        if (currentIndex - 1 >= 0) {
            let std = structureList[currentIndex - 1].RollNo
            let toggle = structureList[currentIndex - 1].isNotAbleToSave

            setNewArrayValue(structureList[currentIndex - 1].data)
            setStudentID(structureList[currentIndex - 1].RollNo)
            setCurrentIndex(currentIndex - 1)
            if (currentIndex == 1) {
                setBtnName('cancel')
            }
            setNextBtn('Next')
        }
        else {
            onBackButtonClick()
        }
    }

    const goBackPage = () => {

    }
    const onBackButtonClick = () => {
        navigation.navigate("App")
    }

    const goNextFrame = () => {
        if (currentIndex + 1 <= stdRollArray.length - 1) {
            setNewArrayValue(structureList[currentIndex + 1].data)
            setStudentID(structureList[currentIndex + 1].RollNo)
            setCurrentIndex(currentIndex + 1)
            setBtnName('Back')
            if (currentIndex + 1 === stdRollArray.length - 1) {
                setNextBtn('Close')
            }
        } else {
            goToMyScanScreen()
        }

    }


    const onSubmitClick = async () => {
        goToMyScanScreen()
    }

    const goNextPage = () => {
        onSubmitClick()
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
                                <Text style={styles.nameTextStyle}>{'Record' + ': ' + (currentIndex + 1)}</Text>
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