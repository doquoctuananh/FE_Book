import { useNavigate } from 'react-router-dom';
import { React,useCallback,useState,useEffect } from 'react';
import styles from '~pages/book/Book.module.scss'
import clsx from 'clsx';
import HeaderAfterLogin from "~components/Layouts/HeaderAfterLogin/HeaderAfterLogin.jsx"
import MyButton from "~components/Button/MyButton.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Banner from "~components/Layouts/Banner/Banner.jsx"
import assets from '../../assets/img';
import SideBar from "~components/Layouts/DefaultLayout/SideBar/SideBar.jsx"
import ForwardPage from "~components/ForwardPage/ForwardPage.jsx"
import Card from "~components/Card/Card.jsx"
import { HomeContext } from '../home/Home';
import Footer from '../../components/Layouts/DefaultLayout/Footer/Footer';
import { createContext } from 'react';
const QuantityCart = createContext()
function Book() {
    const token = localStorage.getItem("token")
    let banner = [assets.luffy,
    assets.kakashi,
    assets.naruto,assets.pikachu,
    assets.songoku];

    const [card,setCard] = useState({})
    const [page,setPage] = useState(0)
    const [totalCart,setTotalCart] = useState(0)
    useEffect(() => {
        let params = new URLSearchParams();
        params.append("page",page)
        let query = params.toString()
        fetch(`http://localhost:8080/api/home/books?${query}`,{
            method:"GET"
        })
        .then(response => response.json())
        .then(data => setCard(data))
        .catch(error => console.log(error))
    },[page])

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

    const addBookInCart = (id) => {
        const params = new URLSearchParams();
        params.append("idBook",id);
        params.append("quantity",1);
        let query = params.toString();
        fetch(`http://localhost:8080/api/books/cart/add?${query}`,{
            method:"POST",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.id >0){

                fetch("http://localhost:8080/api/books/cart/total",{
                    method:"GET",
                    headers:{
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then(response => response.json())
                .then(data => setTotalCart(data))
                .catch(error => console.log(error))

                alert("Thêm vào giỏ hàng thành công")
            }
            
        })
        .catch(error => console.log(error))

    }
    return ( <div className={clsx(styles.app)}>
        <QuantityCart.Provider value ={{totalCart}}>
            <HeaderAfterLogin />
        </QuantityCart.Provider>
        <div className={clsx(styles.banner)}>
            <div className={clsx(styles.banner_content)}>
                <Banner banner = {banner} type = "img" />
            </div>
        </div>
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.content)}>
                <HomeContext.Provider value={{setCard,setPage,page}}>
                    <SideBar />
                    <div className={clsx(styles.list_card)}>
                        <div className={clsx(styles.card)}>
                            {
                                card.content && card.content.map((cur,index) => {
                                    return (
                                        <Card 
                                            key={index}
                                            img = {cur.imageUrl}
                                            name ={cur.bookName}
                                            quantity ={cur.quantity}
                                            price ={cur.price}
                                            language ={cur.language}
                                            author ={cur.author}
                                        >
                                            <MyButton primary
                                                onClick={() => addBookInCart(cur.id)}
                                            >
                                                Add Card
                                            </MyButton>
                                        </Card>
                                    )
                                })
                            }
                        </div>
                        
                            <div className={clsx(styles.page)}>
                                <ForwardPage 
                                    page = {card}
                                    setPage = {setPage}
                                />
                            </div>
                    </div>
                </HomeContext.Provider>
            </div>
        </div>

        <div className="">
            <Footer />
        </div>
    </div> );
}
export {QuantityCart}
export default Book;