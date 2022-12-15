import React from 'react';
import { View, TextInput,Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')
const MarksHeaderTable = ({
    customRowStyle,
    rowTitle,
    editable,
    onChangeText,
    rowBorderColor,
    keyboardType,
    maxLength,
    onBlur,
    isBlur=false
}) => {
     return (
        <View style={[styles.container, customRowStyle, { borderColor: rowBorderColor }]}>

                <TextInput
                    style={styles.titleTextStyle}
                    value={rowTitle}
                    multiline={true}
                    editable={editable}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    onBlur={onBlur}
                    blurOnSubmit={isBlur}
                />
          
        </View>
    );
}

const styles = {
    container: {
        height: 60,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleTextStyle: {
        width: '100%',
         color: '#000',
        fontWeight: 'bold',
        height:height/12,
        textAlign: 'center'
    }
}

export default MarksHeaderTable;