import Modal from 'react-modal';
import Styles from './styles.module.scss';

import { FiX } from 'react-icons/fi'

import { orderDataProps } from '../../pages/dashboard'

interface ModalOrderProps{
  isOpen: boolean;
  onRequestClose: () => void;
  order: orderDataProps[];
}

export function ModalOrder({ isOpen, onRequestClose, order }: ModalOrderProps){

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

  return(
   <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
   >

  
    <div className={Styles.container}>
      <div className={Styles.title}>
        <h2>Detalhes do pedido</h2>
        <button
            type="button"
            onClick={onRequestClose}
            className="react-modal-close"
            style={{ background: 'transparent', border:0 }}
          >
            <FiX size={35} color="#f34748" />
          </button>
      </div>  

      <span className={Styles.tableNumber}>
        Mesa: <strong>{order[0].order.table}</strong>
      </span>

      {order.map( item => (
        <section key={item.id} className={Styles.containerItem}>
          <span>{item.amount}x - <strong>{item.product.name}</strong></span>
          <span className={Styles.description}>{item.product.description}</span>
        </section>
      ))}

      <button id={Styles.finishOrder} onClick={() => <></>}>
        Concluir pedido
      </button>


    </div>

   </Modal>
  )
}