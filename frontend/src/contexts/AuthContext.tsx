import Router from 'next/router';
import { api } from '../services/apiClient';
import { toast } from 'react-toastify';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, ReactNode, useEffect, useState } from 'react'

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignInProps) => Promise<void>;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export function signOut(){
    try {
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    } catch {
        console.log("Erro ao deslogar")
    }
}

const delay = (amount = 2000) => new Promise(resolve => setTimeout(resolve, amount)) //usar para tornar alguma funcionalidae mais lenta ao olho

async function toastMessage (type: string, msg: string){
    if(type == "sucess"){
        toast.success(msg)
    } else {
        toast.error(msg)
    }

    await delay(0)
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;

    useEffect(() => {
        const {'@nextauth.token': token} = parseCookies();

        if(token) {
            api.get('/me').then((response) => {
                const {id, name, email} = response.data;

                setUser({id, name, email});
            })
            .catch (() => {
                //caso não haja token nos cookies necessario deslogar usuario
                signOut()
            })
        }
    }, [])

    async function signIn({email, password}: SignInProps){
        try {
            const response = await api.post('/signin', {
                email, 
                password
            })

            // console.log(response)

            const {id, name, token} = response.data

            setCookie(undefined, "@nextauth.token", token, {
                maxAge: 60 * 60 * 24 * 30, //30
                path: "/"
            })

            setUser ({id, name, email})

            // Passar para próximas requisições o token do usuário
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            // Exibir mensagem de sucesso
            await toastMessage("sucess", "Login realizado com sucesso")

            // Redirecionar o user para a página de dashboard
            // Router.push("/dashboard")
            Router.push('/dashboard')
        } catch (err){
            toast.error("Erro ao realizar login!")
            console.log("Erro ao acessar " , err)
        }
    }

    async function signUp({name, email, password}: SignUpProps){
        
        try {
            const response = await api.post('/signup', {
                name, email, password
            })

            // Exibir mensagem de sucesso
            toast.success("Conta criada com sucesso")

            Router.push('/')
        } catch (err) {
            toast.error("Erro ao criar conta!")
            console.log('ERRO AO CADASTRAR')
        }   
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut, signUp}}>
            {children}
        </AuthContext.Provider>
    )
}