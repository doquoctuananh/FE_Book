import clsx from "clsx";
import styles from "~dashboard/pagesdashboard/orders/OrderDashboard.module.scss"
import DefaultLayoutDashboard from "../../components/Layouts/DefaultLayoutDashboard/DefaultLayoutDashboard.jsx";
import DisplayDate from "~components/DisplayDate/DisplayDate.jsx"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useCallback, useEffect,useState } from "react";
import MyButton from "../../../components/Button/MyButton.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DisplayPrice from "~components/DisplayPrice/DisplayPrice.jsx"
import FormOrderDetail from "./FormOrderDetail/FromOrderDetail.jsx";
import ForwardPage from "~components/ForwardPage/ForwardPage.jsx"
function OrderDashboard() {
    const token = localStorage.getItem("token")
    const [orders,setOrders] = useState({})
    const[page,setPage] = useState(0)
    const [showOrderDetail,setShowOrderDetail] = useState(false)
    const [orderDetail,setOrderDetail] = useState({})
    useEffect(() => {
        const params = new URLSearchParams();
        params.append("page",page)
        let query = params.toString()
        fetch(`http://localhost:8080/api/dashboard/orders?${query}`,{
            method :"GET",
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => setOrders(data))
    },[page])

    const handleShowOrderDetail = useCallback((order) => {
        setShowOrderDetail(true)
        setOrderDetail(order)
    },[])

    const closeForm = useCallback(() => {
        setShowOrderDetail(false)
    },[])

    const handleConfirmSuccessOrder = (order) => {
        console.log(order);
        let confirmOrder = confirm("Xác nhận giao hàng");
        if(confirmOrder){
            const params = new URLSearchParams();
            params.append("orderId",order.id)
            let query = params.toString()
            fetch(`http://localhost:8080/api/dashboard/orders/confirm?${query}`,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                if(data.id > 0){
                    alert("Thành công")
                    setOrders(prev => ({
                        ...prev,
                        content:prev.content.map((cur,index) => {
                            return cur.id == data.id ? {...cur,deliverDate:data.deliverDate,orderStatus:data.orderStatus} : cur;
                        })
                    }))
                }
            })
        }
    }

    const handleConfirmRefuseOrder = (order) => {
        console.log(order);
        let confirmRefuse = confirm("Hủy đơn hàng")
        if(confirmRefuse){
            const params = new URLSearchParams();
            params.append("orderId",order.id);
            let query = params.toString()
            fetch(`http://localhost:8080/api/dashboard/orders/refuse?${query}`,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                if(data.id>0){
                    setOrders(prev => {
                        return {
                            ...prev,
                            content:prev.content.map((od,index) => {
                                return data.id == od.id ? {...od,orderStatus:data.orderStatus} : od
                            })
                        }
                    })
                }
            })
        }
    }
    
    return ( <div>

        <FormOrderDetail 
            showOrderDetail={showOrderDetail} 
            closeForm={closeForm} 
            orderDetail= {orderDetail}
        />

        <DefaultLayoutDashboard>
            <div className={clsx(styles.orders)}>
                <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Address</TableCell>
                            <TableCell align="right">Date Order</TableCell>
                            <TableCell align="right">Date Deliver</TableCell>
                            <TableCell align="right">Payment</TableCell>
                            <TableCell align="right">Total Price</TableCell>
                            <TableCell align="right">View Detail</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Confirm</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.keys(orders).length >0 && orders.content.map((od,index) => (
                            <TableRow
                              key={index}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {od.name}
                              </TableCell>
                              <TableCell align="right">{od.address}</TableCell>
                              <TableCell align="right">
                                <DisplayDate date = {od.orderDate} />
                              </TableCell>
                              <TableCell align="right">
                                {od.deliverDate != null ? <DisplayDate date = {od.deliverDate} /> : ""}
                              </TableCell>
                              <TableCell align="right">{od.paymentMethod}</TableCell>
                              <TableCell align="right">
                                <DisplayPrice price= {od.totalPrice} /> VND
                              </TableCell>
                              <TableCell align="right">
                                <FontAwesomeIcon 
                                    className={clsx(styles.view_detail)} 
                                    icon="fa-solid fa-eye" 
                                    onClick={() => handleShowOrderDetail(od)}
                                    />
                              </TableCell>
                              <TableCell align="right">
                                    {od.orderStatus}
                               </TableCell>
                              <TableCell align="right">
                                {od.orderStatus == "pending" ? 
                                    <div className={clsx(styles.confirm)}>
                                        <FontAwesomeIcon 
                                            className={clsx(styles.icon_success)} 
                                            icon="fa-solid fa-check" 
                                            onClick={() => handleConfirmSuccessOrder(od)}
                                            />
                                        <span>|</span>
                                        <FontAwesomeIcon
                                            className={clsx(styles.icon_refuse)} 
                                            icon="fa-solid fa-xmark"
                                            onClick={() => handleConfirmRefuseOrder(od)}
                                            />
                                    </div> :  ""}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <div className="">
                        <ForwardPage 
                            page={orders}
                            setPage = {setPage}
                        />
                    </div>
            </div>
        </DefaultLayoutDashboard>
    </div> );
}

export default OrderDashboard;