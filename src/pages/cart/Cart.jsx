import clsx from "clsx";
import HeaderAfterLogin from "../../components/Layouts/HeaderAfterLogin/HeaderAfterLogin";
import { useState,useEffect } from "react";
import {QuantityCart} from "~pages/book/Book.jsx"
import styles from "~pages/cart/Cart.module.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DisplayPrice from "~components/DisplayPrice/DisplayPrice.jsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../components/Layouts/DefaultLayout/Footer/Footer";
import MyButton from "../../components/Button/MyButton";

function Cart() {
    const token = localStorage.getItem("token")
    const [totalCart,setTotalCart] = useState(0)
    const [cart,setCart] = useState([])
    useEffect(() => {
            fetch("http://localhost:8080/api/books/cart/total",{
                method:"GET",
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => setTotalCart(data))
            .catch(error => console.log(error))
    },[])
    
    useEffect(() => {
        fetch(`http://localhost:8080/api/books/cart`,{
            method:'GET',
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => setCart(data))
        .catch(error => console.log(error))
    },[])
    
    const handleDeleteCart = (id,quantity) => {
        fetch(`http://localhost:8080/api/books/cart/delete?cartId=${id}`,{
            method:"POST",
            headers:{
                "Authorization" :`Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if(parseInt(data) > 0){
                setCart(prev => prev.filter((cur,index) => parseInt(cur.id) !== parseInt(id)))
                setTotalCart(prev => prev-quantity)
                alert("Xoa thanh cong")
            }
        })
        .catch(error => console.log(error))
    }

    const handleIncreaseBook = (id) => {
        console.log(id)
        fetch(`http://localhost:8080/api/books/cart/increase?cartId=${id}`,{
            method:"POST",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        .then( (response) => response.json())
        .then(data => {
            if(data.id){
                setCart(prev => prev.map((cur,index) => {
                    if(parseInt(cur.id) == parseInt(id)){
                        cur.quantity +=1;
                    }
                    return cur
                }))
                setTotalCart(prev => prev +1)
            }
            else{
                alert(data.message)
            }
        })
    }

    const handleSubtractBook = (cartId) => {
        fetch(`http://localhost:8080/api/books/cart/substract?cartId=${cartId}`,{
            method:"POST",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            
            setCart(prev => 
                prev
                  .map(cur =>
                      parseInt(cur.id) === parseInt(cartId)
                        ? { ...cur, quantity: cur.quantity - 1 }
                        : cur
                  )
                  .filter(cur => cur.quantity > 0) 
            );
            setTotalCart(prev => prev - 1);
            alert("Giam thanh cong")

        })
    }
    
    return ( <div>
        <QuantityCart.Provider value ={{totalCart,setTotalCart}}>
            <HeaderAfterLogin  />
        </QuantityCart.Provider>
        <div className={clsx(styles.content)}>
            <div className={styles.paper}>
            <TableContainer component={Paper}>

                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Book Name</TableCell>
                        {/* <TableCell align="right">Author</TableCell> */}
                        <TableCell align="right">Image</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Total Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Option</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {cart.length>0 && cart.map((cur) => (
                        <TableRow
                          key={cur.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {cur.book.bookName}
                            </TableCell>
                            {/* <TableCell align="right">{cur.book.author}</TableCell> */}
                            <TableCell align="right">
                                <img src={`http://localhost:8080/image/${cur.book.imageUrl}`} alt="" />
                            </TableCell>
                            
                            <TableCell align="right">
                                <DisplayPrice price ={cur.book.price} />
                            </TableCell>

                            <TableCell align="right">
                                <DisplayPrice price ={parseInt(cur.book.price) * parseInt(cur.quantity)} />
                            </TableCell>

                            <TableCell align="right" >
                                <div className={clsx(styles.quantity)}>

                                    <FontAwesomeIcon 
                                        className={clsx(styles.iconsub)}  
                                        icon="fa-solid fa-minus"
                                        onClick = {() => handleSubtractBook(cur.id)} 
                                        />
                                    {cur.quantity}
                                    <FontAwesomeIcon 
                                        className={clsx(styles.iconadd)} 
                                        icon="fa-solid fa-plus"
                                        onClick={() => handleIncreaseBook(cur.id)} 
                                    />
                                </div>
                            </TableCell>

                            <TableCell  align="right">
                                <FontAwesomeIcon className={clsx(styles.iconDelete)} 
                                                icon="fa-solid fa-trash-can" 
                                                onClick = {() => handleDeleteCart(cur.id,cur.quantity)}
                                                />
                            </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className={clsx(styles.checkout)}>
                <MyButton primary link to="/api/books/orders">
                    Checkout : <DisplayPrice price = {cart.reduce((acc,cur,index) => {
                           return acc+ cur.book.price * cur.quantity;
                    },0)} /> VND
                </MyButton>
            </div>

            </div>
            
        </div>
        <div className={clsx(styles.footer)}>
            <Footer />
        </div>
    </div> );
}

export default Cart;