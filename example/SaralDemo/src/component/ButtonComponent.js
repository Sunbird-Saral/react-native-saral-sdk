import React from 'react';
import { TouchableOpacity, Text,View } from 'react-native'


const ButtonComponent = ({
    onPress,
    icon,
    customBtnStyle,
    disabled,
    activeOpacity,
    customBtnTextStyle,
    btnText,
    themeColor1
    
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.btnStyle,customBtnStyle]}
            disabled={disabled}
            activeOpacity={activeOpacity}
           
        >
            <Text
                style={[styles.btnTextStyle, customBtnTextStyle]}
            >
                {btnText}
            </Text>
        </TouchableOpacity>
    );
}
const styles = {
    btnStyle: {
     
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
         backgroundColor: '#841584',
       flexDirection:'row'
    },
    btnTextStyle: {
        width:'75%',
        textAlign: 'center',
        // fontSize: AppTheme.FONT_SIZE_LARGE,
        fontWeight: 'bold',
        letterSpacing: 1,
        // color: AppTheme.WHITE,
        // fontFamily : monospace_FF
    }
}
export default ButtonComponent;