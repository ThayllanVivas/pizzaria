import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import api from '../../services/api'

interface ListItemProps {
    item: ItemProps;
    handleRemoveItem: (item_id: string) => Promise<void>;
}

type ItemProps = {
    item_id: string;
    product_id: string;
    product_name: string;
    amount: string | number;
}

export function ListItem({item, handleRemoveItem}: ListItemProps){

    return(
        <View style={styles.itemSection}>
            <Text style={styles.itemDetail}>{item.amount}x - {item.product_name}</Text>
            <TouchableOpacity onPress={() => handleRemoveItem(item.item_id)}>
                    <Feather name="trash-2" style={styles.trashButton}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    trashButton: {
        color: 'red',
        fontSize: 25,
        marginLeft: 15
    },
    itemSection: {
        height: 40,
        color: '#FFF',
        width: '100%',
        borderRadius: 4,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#101026',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
    },
    itemDetail: {
        color: '#FFF'
    }
})