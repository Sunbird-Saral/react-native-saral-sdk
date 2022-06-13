import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';


const DropDownMenu = ({
    options,
    onSelect,
    selectedData,
    icon,
    defaultIndex,
    defaultData,
    disabled,
    customDropContainer,
    customDropDownStyle
}) => {    
    const dropDownHeight = options.length < 5 ? (46 + StyleSheet.hairlineWidth) * options.length : (33 + StyleSheet.hairlineWidth) * 5
    return(
        
            <ModalDropdown 
                style={[styles.dropDownContainerStyle, customDropContainer]}
                dropdownStyle={[styles.dropDownStyle, { height: dropDownHeight }, customDropDownStyle]}
                dropdownTextStyle={styles.dropDownTextStyle}
                dropdownTextHighlightStyle={styles.dropDownSelectedTextStyle}
                options={options}
                disabled={disabled}
                onSelect={onSelect}
                defaultIndex={defaultIndex}
                showsVerticalScrollIndicator={false}
            
            >
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <Text style={[styles.dropDownTextLabelStyle, {color: defaultIndex == -1 ? 'rgba(0,0,0, .3)': '#000000'}]}>
                        {defaultIndex == -1 ? defaultData: selectedData}
                    </Text>
                    {icon &&
                    <Image 
                        style={{width: 10, height: 10}}
                        source={icon}
                        resizeMode='contain'
                    />}
              </View>
            </ModalDropdown>
    )
}

const styles = {
    dropDownContainerStyle: {
        borderWidth: 1, 
        borderRadius: 4, 
        borderColor: '#DDDDDD', 
        paddingVertical: '3%', 
        paddingHorizontal: '3%',
    },
    dropDownStyle: {
        width: '75%',
        elevation: 5
    },
    dropDownTextStyle: {
        fontSize: 13,
        color: '#DDDDDD',
        lineHeight: 25
    },
    dropDownSelectedTextStyle: {
        fontSize: 15,
        color:'#000000',
        fontWeight: 'bold',
        paddingVertical: '4%'
    },
    dropDownTextLabelStyle: {
        fontSize: 20,
        fontWeight: '600'
    },
}
export default DropDownMenu;