import React, { useState } from 'react'
import {TouchableOpacity, Text, StyleSheet, Dimensions, View, ScrollView} from 'react-native'

type OptionsProp = {
    id: string, 
    name: string
}

interface ModalPickerProp {
    handleCloseModal: () => void;
    options: OptionsProp[];
    selectedItem: (item: OptionsProp) => void;
}

const { width: WIDTH, height: HEIGHT}= Dimensions.get('window')

export function ModalPicker({handleCloseModal, options, selectedItem}: ModalPickerProp){

    function onPress(item: OptionsProp){
        selectedItem(item)
        handleCloseModal()
    }

    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        options.map((item, index) => {
                            return(
                                <TouchableOpacity key={index} style={styles.option} onPress={() => onPress(item)}>
                                    <Text style={styles.item}>
                                        {item?.name}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: WIDTH - 20,
        height: HEIGHT / 2,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#8a8a8a',
        borderRadius: 4
    },
    option: {
        alignItems: 'flex-start',
        borderTopWidth: 0.8,
        borderTopColor: '#8a8a8a'
    },
    item: {
        margin: 18,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#101026'
    }
})