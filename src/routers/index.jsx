import Home from '~pages/home/Home.jsx'
import News from '~pages/news/News.jsx'
import Infor from '~pages/infor/Infor.jsx'
import Contact from '~pages/contact/Contact.jsx'
import Login from '~pages/login/Login.jsx'
import Register from '~pages/register/Register'

//user
import Book from "~pages/book/Book.jsx"

//admin
import HomeDashboard from '~dashboard/pagesdashboard/home/HomeDashboard.jsx'
import BookDashboard from '~dashboard/pagesdashboard/books/BookDashboard.jsx'
import OrderDashboard from '~dashboard/pagesdashboard/orders/OrderDashboard.jsx'
import TypeBookDashboard from '~dashboard/pagesdashboard/type_books/TypeBookDashboard.jsx'
import ImportBookDashboard from '~dashboard/pagesdashboard/import_books/ImportBookDashboard.jsx'
import UserDashboard from '~dashboard/pagesdashboard/users/UserDashboard.jsx'

const publicRoute = [
    {path: "/",component: Home},
    {path: "/news",component: News},
    {path: "/infor",component: Infor},
    {path: "/contact",component: Contact},
    {path: "/login",component: Login},
    {path: "/register",component: Register}
    
]

// user 
const privateRoute = [
    {path:"/api/books",component : Book}
]

//admin

const privateRouteDashboard = [
    {path : "/api/dashboard", component : HomeDashboard},
    {path : "/api/dashboard/books", component : BookDashboard},
    {path : "/api/dashboard/orders", component : OrderDashboard},
    {path : "/api/dashboard/typebooks", component : TypeBookDashboard},
    {path : "/api/dashboard/importbooks", component : ImportBookDashboard},
    {path : "/api/dashboard/users", component : UserDashboard}
]

export {publicRoute,privateRoute,privateRouteDashboard}