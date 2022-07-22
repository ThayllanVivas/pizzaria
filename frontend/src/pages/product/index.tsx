import Head from "next/head";
import { Header } from "../../components/header";
import styles from './product.module.scss'
import { useState, FormEvent, useEffect, ChangeEvent } from 'react'
// import { setupAPIClient } from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { FiTrash2, FiUpload } from "react-icons/fi";
import { setupAPIClient } from "../../services/api";

type ItemCategoryTypes = {
    id: string;
    name: string;
}

type ItemProductTypes = {
    name: string;
}

interface ListKind {
    categoryList: ItemCategoryTypes[];
    productList: ItemProductTypes[];
}


export default function product({categoryList, productList}: ListKind) {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [productImage, setProductImage] = useState(null)
    const [productImageURL, setProductImageURL] = useState('')
    const [categories, setCategories] = useState(categoryList)
    const [categorySelected, setCategorySelected] = useState(0)

    function hadleChangeCategory(event){
        setCategorySelected(event.target.value)
    }

    async function handleCreateProduct(event: FormEvent){
        event.preventDefault()

        let selectCategory = (document.getElementById("selectCategory") as HTMLInputElement).value

        if(name === "" || price === "" || description === "" ||  productImage === null || selectCategory === "--Selecione uma categoria--"){
            toast.error("Preencher os campos")
            return;
        }



        let resultOfName = '' //to insert a data to tell when a product with the same name was found

        productList.map((product) => { //will look inside the array for search a product already existed
            if (product.name == name){
                resultOfName = "YES"; //inset "YES" inside the variable to not go ahead in the IF ELSE
            }
        })

        if(resultOfName === "YES"){
            toast.error("Produto com mesmo nome encontrado na base de dados!") // show a toast notif with an error
            return; //return ("do not ahead")
        }

        try {
            const data = new FormData()

            data.append("name", name)
            data.append("price", price)
            data.append("description", description)
            data.append("banner", productImage)
            data.append("category_id", categories[categorySelected].id)

            const api = setupAPIClient()
            await api.post("/product", data)

            toast.success("Produto cadastrado com sucesso")
        } catch (err) {
            toast.error("Erro ao cadastrar")
        }

        setName("")
        setPrice("")
        setDescription("")
        setProductImage(null)
        setProductImageURL("")
        setCategorySelected(0)
    }

    function handleRemove(){
            setProductImage(null);
            setProductImageURL('empty')
    }
    

    function handleUpload(e: ChangeEvent<HTMLInputElement>){
        if(!e.target.files){
            return;
        }

        const image = e.target.files[0];

        if(!image){
            return;
        }

        if(image.type === "image/png" || image.type === "image/jpeg") {
            setProductImage(image);
            setProductImageURL(URL.createObjectURL(image))
        } 
    }

    // --- RETURN ---
    return (
        <>
        <Head>
            <title>Nova categoria - Sujeito Pizza</title>
        </Head>
        <Header categoryStatus="" productStatus="active"/>

        <main className={styles.container}>
            <h1>Novo produto</h1>

            <form className={styles.form} onSubmit={handleCreateProduct}>
                <label className={styles.productUpload}>
                    <span>
                        <FiUpload />
                    </span>
                    {productImage ? (
                        <img 
                            className={styles.productImage}
                            src={productImageURL}
                            alt="Foto do produto"
                        />) : (<></>)}   
                </label>

                <div className={styles.icons}>
                    <label className={styles.uploadProductPicture}>
                        <span>
                            <FiUpload />
                        </span>
                        <input onChange={handleUpload} type="file" accept="image/png, image/jpeg"/>
                    </label>
                    <label className={styles.removeProductPicture}>
                        <span onClick={handleRemove}>
                            <FiTrash2 />
                        </span>
                    </label>
                </div>

                <select id="selectCategory" defaultValue={"default"} onChange={hadleChangeCategory}  className={styles.select} >
                    <option key="default" value="--Selecione uma categoria--">
                      --Selecione uma categoria--
                    </option>
                    {categories.map( (item, index) => { 
                        return (
                            <option key={item.id} value={index}>
                                {item.name}
                            </option>
                        )
                    })}

                </select>

                <input 
                    type="text"
                    placeholder="Digite o nome do produto"
                    className={styles.input}
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value) 
                    }}
                />

                <input 
                    type="text"
                    placeholder="Digite o preço do produto"
                    className={styles.input}
                    value={price}
                    onChange={(e)=> {
                        setPrice(e.target.value)

                    }}
                />

                <textarea 
                    className={styles.textarea} 
                    placeholder="Descreva o produto"
                    value={description}
                    onChange={(e)=> {
                        setDescription(e.target.value)
                    }}
                />

                <button className={styles.buttonAdd} type="submit">
                    Cadastrar
                </button>
            </form>
        </main>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async(ctx) => {
    const api = setupAPIClient(ctx)

    const categoryList = await api.get("/category")
    const productList = await api.get("/product")

    return {
        props: {
            categoryList: categoryList.data,
            productList: productList.data
        }
    }
})