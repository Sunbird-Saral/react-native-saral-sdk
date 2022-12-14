import React from 'react'
import { Text, View, StyleSheet, Pressable, ScrollView,Modal } from 'react-native';

const ModalPopup = ({
    visible,
    onPress,
    onRequestClose,
    btnText,
    themeColor1,
    data,
    borderCutomStyle
})=> {
    
  return (
    <View>
    <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose= {
        //   Alert.alert("Modal has been closed.");
          onRequestClose
        //   setModalVisible(!modalVisible);
        }
      >
       <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
          <View style={borderCutomStyle}>
            <Text style={[styles.modalText]}>{data}</Text>
            </View>
            <Pressable
              style={styles.nxtBtnStyle}
              onPress={onPress}
              activeOpacity={0.8}    
            >
              <Text style={styles.btnTextStyle}>{btnText}</Text>
            </Pressable>
          </ScrollView>
        </View>
      </Modal>
      </View>
  )
}
const styles = StyleSheet.create({
centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },

  btnTextStyle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#111',
},
  modalText: {
   padding:10
  },
  nxtBtnStyle:{marginHorizontal:20, borderRadius: 10,padding:15 },
  modelView:{
    margin:10,
    borderWidth:5
  }
});
export default ModalPopup