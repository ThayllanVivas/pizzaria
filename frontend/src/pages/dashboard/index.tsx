import Head from 'next/head'
import Modal from 'react-modal'
import Styles from './dashboard.module.scss'
import { Header } from "../../components/header"
import { useEffect, useState } from "react"
import { canSSRAuth } from "../../utils/canSSRAuth"
import { ModalOrder } from "../../components/modalOrder"
import { FiRefreshCcw } from "react-icons/fi"
import { setupAPIClient } from "../../services/api"

type ItemProductTypes = {
    id: string;
    name: string;
}

type ordersList = {
    id: string,
    table: number,
    status: boolean,
    draft: boolean,
    created_at: string,
    updated_at: string,
}

interface dashboardProps {
    orders: ordersList[];
    products: ItemProductTypes[];
}

export type orderDataProps = {
    id: string,
    amount: number,
    created_at: string,
    updated_at: string,
    order_id: string,
    product_id: string,
    product: {
        id: string,
        name: string,
        price: string,
        description: string,
        banner: string,
        category_id: string,
        created_at: string,
        updated_at: string
    },
    order: {
        id: string,
        table: number,
        status: boolean,
        draft: boolean,
        name: string,
        created_at: string,
        updated_at: string
    }
}

export default function Dashboard({products, orders}: dashboardProps){

    const [ordersList, setOrdersList] = useState(orders || [])
    const [modalVisibility, setModalVisibility] = useState(false)
    const [modalData, setModalData] = useState([])

    //function to GET all orders updated 
    async function APIFunction (value: string, id = ''){
        let response
        const api = setupAPIClient();

        if(value === "getallorders"){
            response = await api.get('/orders');
        }
        if(value === "finishOrder"){
            response = await api.put('/order/finish', {
                order_id: id
            })
        }
        if(value === "openModalView"){
            response = await api.get('/order/detail', {
                params: {
                    order_id: id
                }
            })
        }

        return response
    }

    async function handleAddProduct(order_id: string, product_id: string, amount: number) {
        const api = setupAPIClient();

        let response = await api.post('/order/item', {
                order_id: order_id,
                product_id: product_id,
                amount: amount
            })
        }

    //function to REFRESH the dashboard page
    async function handleRefresh(){
        let ordersUpdated = await APIFunction("getallorders")
        setOrdersList(ordersUpdated.data)
    }

    //function to FINISH the order
    async function handleFinishOrder(order_id: string){
        let response  = await APIFunction("finishOrder", order_id)

        setModalVisibility(false)
        handleRefresh()
    }

    //function to CLOSE the modal
    function handleClosenModalView(){
        setModalVisibility(false)
    }

    //function to OPEN the modal
    async function handleOpenModalView(id: string){
        let response  = await APIFunction("openModalView", id)

        setModalData(response.data)

        setModalVisibility(true)
    }

    Modal.setAppElement('#__next');

    return (
        <>
            <Head>
                <div>
                    <title>Projeto Pizza - Faça seu login</title>
                </div>
            </Head>
            <div>
                <Header categoryStatus="" productStatus="" />

                <main id={Styles.container}>
                    <div id={Styles.containerHeader}>
                        <h1>Últimos pedidos</h1>
                        <button id={Styles.refreshButton} onClick={handleRefresh}>
                            <FiRefreshCcw />
                        </button>
                    </div>

                    <article id={Styles.ordersSection}>
                        {ordersList.length === 0 && (
                            <p id={Styles.noOrderMessage}>Nenhum pedido a ser exibido</p>
                        )}

                        {
                            ordersList.map((order) => (
                                <section key={order.id} id={Styles.orderList}>
                                    <button className={Styles.orderItem} onClick={() => handleOpenModalView(order.id)}>
                                        <div className={Styles.tag}></div>
                                        <span>Mesa {order.table}</span>
                                    </button>
                                </section>
                            ))
                        }
                    </article>
                </main>

                {modalVisibility && (
                    <ModalOrder 
                        isOpen={modalVisibility}
                        product={products}
                        order={modalData}
                        onRequestClose={handleClosenModalView}
                        onRequestToFinish={handleFinishOrder}
                        onRequestToAddProduct={handleAddProduct}
                    />
                )}
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    const api = setupAPIClient(ctx)
    const orders = await api.get("/orders")
    const products = await api.get("/product")

    return {
      props: {
          orders: orders.data,
          products: products.data
      }
    }
  })