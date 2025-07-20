import Header from "~components/Layouts/Header/Header.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AvatarInfo from '~components/Avatar/AvatarInfo.jsx';
import clsx from "clsx";
import styles from "~components/Layouts/HeaderAfterLogin/HeaderAfterLogin.module.scss"
import Cart from "~components/Layouts/HeaderAfterLogin/Cart/Cart.jsx"
import { Link } from "react-router-dom";
import { useContext } from "react";
import {QuantityCart} from "~pages/book/Book.jsx"
function HeaderAfterLogin() {
    const {totalCart} = useContext(QuantityCart)
    return ( <>
        <Header >
            <div className={clsx(styles.cart)}>
                {/* <FontAwesomeIcon className={clsx(styles.cart_item)} icon="fa-cart-plus" /> */}
                <Link to="/api/books/cart">              
                    <Cart cart = {totalCart} />
                </Link>
                <div>
                      <AvatarInfo />
                </div>          
            </div>
        </Header>
    </> );
}

export default HeaderAfterLogin;