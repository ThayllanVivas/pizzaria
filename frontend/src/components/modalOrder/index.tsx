import Modal from 'react-modal';
import Styles from './styles.module.scss';

import { FiMinimize2, FiTrash, FiX } from 'react-icons/fi'

import { orderDataProps } from '../../pages/dashboard'
import { ChangeEvent, useState } from 'react';
import { setupAPIClient } from '../../services/api';

type productsDataProps = {
  id: string;
  name: string;
}

interface ModalOrderProps{
  isOpen: boolean;
  order: orderDataProps[];
  product: productsDataProps[];
  onRequestClose: () => void;
  onRequestToFinish: (order_id: string) => void;
  onRequestToAddProduct: (order_id, product_id, amount) => void;
}



export function ModalOrder({ isOpen, product, order, onRequestClose, onRequestToFinish, onRequestToAddProduct }: ModalOrderProps){

  const [formVisibility, setFormVisibility] = useState(false)
  const [products, setProducts] = useState(product)
  const [addRemoveItemTag, setAddRemoveItemTag] = useState('Adicionar item')
  const [productSelected, setProductSelected] = useState()
  const [amountSelected, setAmountSelected] = useState(0)
  const [orderInfo, setOrderInfo] = useState(order)
  const currentOrder = order[0].order_id

  // console.log('productlist: ', products)
  // console.log("ORDER: ", currentOrder)

  // async function handleGetCategories(){
  //   const api = setupAPIClient()
  //   const response = await api.get("/orders")

  //   setCategories(response.data)
  // }

  const customStyles = {
    content:{
      top: '50%',
      bottom: 'auto',
      left: '50%',
      right: 'auto',
      padding: '30px',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#1d1d2e'
    }
  };

  function toogleAddRemoveItemTag(){

    setFormVisibility(!formVisibility)
    
    if(formVisibility) {
      setAddRemoveItemTag('Adicionar item');
      return;
    }
    setAddRemoveItemTag('Fechar')
  }

  function setAmount(event) {
    let amount = parseInt(event.target.value)
    setAmountSelected(amount)
    
  }

  function setProduct(event) {
    setProductSelected(event.target.value)
    // console.log("PRODUCT: ", event.target.value)
  }


  async function updateOrderInfo(){
    const api = setupAPIClient()
    const response = await api.get("/order/detail", {
      params: {
        order_id: currentOrder
      }
    })

    setOrderInfo(response.data)
  }

  async function handleSendItem(event){
    event.preventDefault()

    console.log(typeof(amountSelected))

    const api = setupAPIClient()
    await api.post('/order/item', {
      product_id: productSelected,
      order_id: currentOrder,
      amount: amountSelected
    })

    updateOrderInfo()
  }
  
  async function handleRemoveItem(item_id: string, event){
      event.preventDefault()

      const api = setupAPIClient()
      const response = await api.delete("/order/item", {
        params: {
          item_id: item_id
        }
      })

      updateOrderInfo()
  }

  return(
   <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
   >

  
    <div className={Styles.container}>
      <div className={Styles.header}>
        <h2>Detalhes do pedido</h2>
        <button
            type="button"
            onClick={onRequestClose}
            className="react-modal-close"
            style={{ background: 'transparent', border:0 }}
          >
            <FiMinimize2 size={35} color="#f34748" />
          </button>
      </div>  

      <span className={Styles.tableNumber}>
        Mesa: <strong>{order[0].order.table}</strong>
      </span>

      {orderInfo.map( item => (
        <section key={item.id} className={Styles.containerItem}>
          <div id={Styles.itemTitle}>
            <span>{item.amount}x - <strong>{item.product.name}</strong></span>
            <button onClick={() => handleRemoveItem(item.id, event)}>
              <FiX />
            </button>
              
          </div>
            <span className={Styles.description}>{item.product.description}</span>
          
        </section>
      ))}
      <div className={Styles.buttons}>
        <button id={Styles.addProduct} onClick={toogleAddRemoveItemTag}>
         {addRemoveItemTag}
        </button>

        <button id={Styles.finishOrder} onClick={() => onRequestToFinish(order[0].order_id)}>
          Concluir pedido
        </button>
      </div>

      {formVisibility && (
        <form id={Styles.form} onSubmit={handleSendItem}>
          <select onChange={setProduct} defaultValue={"default"}>
            <option key="default" value="default">- Selecione um produto -</option>
            {
              products?.map((product, index) => {
                return (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                )
              })
            }
          </select>
          <input type="number" placeholder='- Quantidade do item -' onChange={setAmount} value={amountSelected}></input>
          
          <div>
            <button type='submit' id={Styles.submitButton}>
                Adicionar item
            </button>
          </div>
        </form>
      )}

    </div>

   </Modal>
  )
}
