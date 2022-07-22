import React, { createContext, ReactNode, useEffect, useState } from "react";
import api from "../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage'

type AuthContextData = {
    userInfo: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: signInProps) => Promise<void>;
    signOut: () => Promise<void>;
    loading: boolean;
    loadingAuth: boolean;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type AuthProviderProps = {
    children: ReactNode
}

type signInProps = {
    email: string,
    password: string
}

export const AuthContext = createContext({} as AuthContextData)


export function AuthProvider({children}: AuthProviderProps){
    //an useState to insert data from user inside the object
    const [userInfo, setUserInfo] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    })

    const [loadingAuth, setLoadingAuth] = useState<boolean>(false)
    const [loading, setLoading] = useState(true)

    //if the userInfo has a name, the isAuthenticated is going to receive a boolean
    const isAuthenticated = !!userInfo.name;

    //verify user data to let them logged automatically
    useEffect(() => {
        async function LoginAutomatically() {
           const userInfo = await AsyncStorage.getItem('@sujeitopizzaria')
           let hasUser: UserProps = JSON.parse(userInfo || '{}')

           if(Object.keys(hasUser).length > 0) {
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser?.token}`

                setUserInfo({
                    id: hasUser.id,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token
                })
           }

           setLoading(false)
           
        }

        LoginAutomatically()
    }, [])

    //function to make sign in
    async function signIn({email, password}: signInProps){
        setLoadingAuth(true)

        try {
            const response = await api.post('/signin', {
                email,
                password
            })

            const {id, name, token} = response.data

            setUserInfo({id, name, email, token})

            const data = {...response.data}

            await AsyncStorage.setItem('@sujeitopizzaria', JSON.stringify(data))

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            
        } catch(err){
            console.log('erro ao acessar', err)
        }

        setLoadingAuth(false)        
    }

    async function signOut(){
        await AsyncStorage.clear().then(() => {
            setUserInfo({
                id: '',
                name: '',
                email: '',
                token: ''
            })
        })

    }

    return(
        <AuthContext.Provider value={{userInfo, isAuthenticated, signIn, signOut, loading, loadingAuth}}>
            {children}
        </AuthContext.Provider>
    )
}