import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import logoImg from '../../../public/logo.svg'
import styles from '../../../styles/home.module.scss'
import { Input } from '../../components/ui/input/index'
import { Button } from '../../components/ui/button'
import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'

export default function SignUp() {

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState<boolean>(false)

  const {signUp} = useContext(AuthContext)

  async function handleSignUp(event: FormEvent){  
    event.preventDefault();

    if(name === '' || email === '' || password === '') {
      toast.warning("Preencha os campos")
      return;
    }

    setLoading(true)

    let data = {
      name, email, password
    }

    await signUp(data)

    setLoading(false)

  }

  return (
    <>
      <Head>
        <div className={styles.container}>
          <title>Projeto Pizza - Faça seu cadastro</title>
        </div>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

        <div className={styles.login}>
            <h1>Criando sua conta</h1>

            <form onSubmit={handleSignUp}>
            <Input 
                placeholder="Digite seu nome"
                type="text"
                value={name}
                onChange={ (e) => setName(e.target.value) }
            />

            <Input 
                placeholder="Digite seu email"
                type="text"
                value={email}
                onChange={ (e) => setEmail(e.target.value) }
            />
            <Input 
                placeholder="Digite sua senha"
                type="password"
                value={password}
                onChange={ (e) => setPassword(e.target.value) }
            />

            <Button
                type="submit"
                loading={loading}
                >
                Cadastrar
            </Button>
            </form>
            <Link href="/">
            <a className={styles.text}>Já possui uma conta? Faça login</a>
            </Link>
        </div>
      </div>
    </>
  )
}
