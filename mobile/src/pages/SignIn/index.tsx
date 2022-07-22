import React, { useContext } from 'react'
import { useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../../context/AuthContext'

export default function SignIn(){
    const {signIn, loadingAuth} = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSignIn(){
        if(email === '' || password === ''){
            return;
        }

        await signIn({email, password})

    }

    return(
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/logo.png')} />

            <TextInput 
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder='Digite seu email'
                placeholderTextColor='#CCC'
            />

            <TextInput 
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder='Password'
                placeholderTextColor='#CCC'
                keyboardType='numeric'
                secureTextEntry={true}
            />

            <TouchableOpacity 
                style={styles.button}
                onPress={handleSignIn}
            >
                {loadingAuth ? 
                    <ActivityIndicator size={25} color="#FFF"/> :
                    <Text style={styles.text}>Acessar</Text>
                }
            </TouchableOpacity>
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
    logo : {
        marginBottom: 40,
    },
    input: {
        width: '80%',
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 4,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        backgroundColor: '#101026',
        color: '#FFF',
        fontWeight: 'bold',
    },
    button: {
        width: '80%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3FFFA3',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    }
})