import styles from './header.module.scss'
import Link from 'next/link'
import { FiLogOut} from 'react-icons/fi'
import { signOut } from '../../contexts/AuthContext'
import { FaFacebook } from 'react-icons/fa'

export function Header({categoryStatus, productStatus}){

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}> 
                <Link href="/dashboard">
                    <img className={styles.logo} src="./logo.svg" width={190} height={60}/>
                </Link>
                
                <nav className={styles.menuNav}>
                    <Link href="/category">
                        <a className={categoryStatus === "active" ? styles.categoryActive : styles.categoryNotActive}>Categoria</a>
                    </Link>

                    <Link href="/product">
                        <a className={productStatus == "active" ? styles.productActive : styles.productNotActive}>Produto</a>
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut />
                    </button>
                </nav>
            </div>
        </header>
    )
}