import Home from '~pages/home/Home.jsx'
import Cart from '~pages/cart/Cart.jsx'
import BookDetail from '~pages/bookdetail/BookDetail.jsx'
import Payment from '~pages/payment/Payment.jsx'

const publicRoute = [
    {path: "/",component: Home},
    {path: "/book/cart",component: Cart},
    {path: "/book/bookdetail",component: BookDetail},
    {path: "/book/payment",component: Payment}
    
]

const privateRoute = []

export {publicRoute,privateRoute}