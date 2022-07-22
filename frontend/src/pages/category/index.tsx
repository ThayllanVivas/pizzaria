import Head from "next/head";
import { Header } from "../../components/header";
import styles from './category.module.scss'
import { useState, FormEvent } from 'react'
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import { canSSRAuth } from "../../utils/canSSRAuth";


export default function Category() {
    const [name, setName] = useState('')

    async function handleCreateCategory(event: FormEvent){
        event.preventDefault()

        if(name === ''){
            return;
        }

        const api = setupAPIClient()
        const response = await api.post('/category', {
            name: name
        })         
        
        if(response.data === "Category already exists!!!"){
            toast.error(response.data)
            return;
        }

        toast.success("Categoria cadastrada com sucesso")

        setName("")
    }

    
    
    return (
        <>
        <Head>
            <title>Nova categoria - Sujeito Pizza</title>
        </Head>
        <Header categoryStatus="active" productStatus=""/>

        <main className={styles.container}>
            <h1>Nova categoria</h1>

            <form className={styles.form} onSubmit={handleCreateCategory}>
                <input 
                    type="text"
                    placeholder="Digite o nome da categoria"
                    className={styles.input}
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                />

                <button className={styles.buttonAdd} type="submit">
                    Cadastrar
                </button>
            </form>
        </main>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props :{}
    }
})