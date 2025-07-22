import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import styles from "~pages/order/Order.module.scss"
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import DisplayDate from "~components/DisplayDate/DisplayDate.jsx"
import DisplayPrice from "~components/DisplayPrice/DisplayPrice.jsx"
import ForwardPage from "~components/ForwardPage/ForwardPage.jsx"
import MyInput from "~components/Input/MyInput.jsx"
import MyButton from "~components/Button/MyButton.jsx"
import SearchDashboard from "~dashboard/components/Search/SearchDashboard.jsx"

function Order() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const[orders,setOrders] = useState({})
    const[page,setPage] = useState(0)

    useEffect(() => {
        const params = new URLSearchParams();
        params.append("page",page);
        let query = params.toString();

        fetch(`http://localhost:8080/api/books/orders?${query}`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => setOrders(data))
        .catch(error => console.log(error))
    },[page])

    console.log(orders)
    return ( <div className={clsx(styles.page_order)}>
        <div className={clsx(styles.order)}>
            <div className={clsx(styles.header)}>
                <FontAwesomeIcon 
                    className={clsx(styles.icon)} 
                    icon="fa-solid fa-arrow-left" 
                    onClick = {() =>  navigate("/api/books")}
                    />
                <h3>Back Home</h3>
            </div>
            
            
            <div className={clsx(styles.content)}>
                {
                    Object.keys(orders).length>0&& orders.content.map((oder,index) => {
                        return <div className={clsx(styles.order_list)}>
                            {oder.listOrderDetails.map((orderdetail,i) => {
                                return <div className={clsx(styles.order_item)}>
                                    <img src={`http://localhost:8080/image/${orderdetail.book.imageUrl}`}></img>

                                    
                                        <div className={clsx(styles.order_content_left)}>
                                            <div className="">
                                                <span>Book Name:</span>
                                                <span>{orderdetail.book.bookName}</span>
                                            </div>
                                            <div className="">
                                                <span>Address: </span>
                                                <span>{oder.address}</span>
                                            </div>
                                            <div className="">
                                                <span>Quantity: </span>
                                                <span>{orderdetail.quantity}</span>
                                            </div>
                                        </div>

                                        <div className={clsx(styles.order_content_right)}>
                                            <div className="">
                                                <span>Date: </span>
                                                <span>
                                                    <DisplayDate date = {oder.orderDate} />
                                                </span>
                                                
                                            </div>
                                            <div className="">
                                                <span>Payment: </span>
                                                <span>{oder.paymentMethod}</span>
                                            </div>
                                            <div className="">
                                                <span>Price: </span>
                                                <span>
                                                    <DisplayPrice price = {orderdetail.price} />
                                                </span>
                                            </div>
                                        </div>
                                    
                                </div>
                            })}
                        </div>
                    })
                }
                <div className={clsx(styles.order_page)}>
                    <ForwardPage 
                        page ={orders}
                        setPage ={setPage}
                    />
                </div>
            </div>
        </div>
    </div> );
}

export default Order;