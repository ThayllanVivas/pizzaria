import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, {useContext, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../../context/AuthContext'
import { StackParamsList } from '../../routes/authenticated.routes'
import api from '../../services/api'

export default function Dashboard(){
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    const [table, setTable] = useState('')

    const { signOut } = useContext(AuthContext)

    async function handleOpenTable(){
        if(table === ''){
            return;
        }

        const response = await api.post('/order', {
            table: Number(table)
        })
        
        navigation.navigate('Order', {table: table, order_id: response.data.id})

        setTable('')
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Novo Pedido</Text>

            <TextInput 
                style={styles.input}
                onChangeText={setTable}
                placeholder='Numero da mesa'
                placeholderTextColor='#CCC'
                keyboardType='numeric'
                value={table}
            />

            <TouchableOpacity style={styles.button} onPress={handleOpenTable}>
                <Text style={styles.buttonText}>Abrir mesa</Text>
            </TouchableOpacity>

            <Button title="Sair do app" onPress={signOut}/>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1D1D2E'
    },
    title: {
        fontSize: 30,
        color: '#FFF',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 4,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        backgroundColor: '#101026',
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 22,
    },
    button: {
        width: '80%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3FFFA3',
    },
    buttonText: {
        fontWeight: 'bold',
    }
})