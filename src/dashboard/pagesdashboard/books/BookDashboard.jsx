import clsx from "clsx";
import styles from "~dashboard/pagesdashboard/books/BookDashboard.module.scss"
import DefaultLayoutDashboard from "../../components/Layouts/DefaultLayoutDashboard/DefaultLayoutDashboard.jsx";
import MyButton from "~components/Button/MyButton.jsx"
import Card from "~components/Card/Card.jsx"
import ForwardPage from "../../../components/ForwardPage/ForwardPage.jsx";
import SearchDashboard from "~dashboard/components/Search/SearchDashboard.jsx"
import MyInput from "~components/Input/MyInput.jsx"
import { useCallback, useEffect, useState } from "react";
function BookDashboard() {
    const [books,setBooks] = useState({});
    const [typeBook,setTypeBook] = useState([]);
    const [page,setPage] = useState(0)
    const [isSearch,setIsSearch] = useState(0);
    const [paramSearch,setParamSearch] = useState({
        Author:"",
        Book:"",
        Type : ""
    })

    let token = localStorage.getItem("token")
    useEffect(() => {
        const param = new URLSearchParams();
        param.append("page",page)
        let url = ""
        if(isSearch){
            paramSearch.Author !== "" ? param.append("author",paramSearch.Author) : 1;
            paramSearch.Book !== "" ? param.append("bookName",paramSearch.Book):1;
            paramSearch.Type !== "" && paramSearch.Type!== null ? param.append("type",parseInt(paramSearch.Type)) : 1;
            
            let query = param.toString()
            console.log(query)
            url = `http://localhost:8080/api/dashboard/books/search?${query}`
        }
        else{
            let query = param.toString()
            url = `http://localhost:8080/api/dashboard/books?${query}`;
        }
        fetch(url,{
            method:"GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => setBooks(data))
    },[page,isSearch])

    useEffect(() => {
        
        fetch("http://localhost:8080/api/dashboard/type",{
            method:"GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => setTypeBook(data))
    },[])

    const handleSearchInput = (e) => {
        setParamSearch(prev => {
            return {
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }

    const handleSearch = () => {
        if(paramSearch.Author !== "" || paramSearch.Book !== "" || paramSearch.Type !== ""){
            setPage(0)
            setIsSearch(prev => {                
                    return prev+1;               
            })
        }
    }
    const handleReset = useCallback(() => {
        setIsSearch(0)
    })

    console.log(paramSearch)

    console.log(books)
    return ( <div>
        <DefaultLayoutDashboard>
            <div className={clsx(styles.app)}>
                <div className={clsx(styles.heading)}>
                    <SearchDashboard 
                        handleSearch ={handleSearch} 
                        reset = {handleReset}
                    >
                        {
                            Object.keys(paramSearch).map((cur,index) => {
                                const props = {};
                                if(cur == "Type"){
                                    props.type="select"
                                    props.select_value= typeBook.map((cur,index) => {
                                        return {
                                            value: cur.id,
                                            name:cur.typeName
                                        }
                                    })
                            }
                                return (
                                    <MyInput 
                                        key={index}
                                        {...props}
                                        value ={paramSearch[cur]} 
                                        name= {cur} 
                                        margin_lr
                                        onChange = {handleSearchInput}
                                    />
                                )
                            })
                        }
                       
                    </SearchDashboard>
                </div>
                <div className={clsx(styles.content)}>
                    {Object.keys(books).length > 0 && books.content.map((cur,index) => {
                        return <Card 
                                key = {index}  
                                img = {cur.imageUrl}
                                name={cur.bookName}
                                quantity = {cur.quantity}
                                price = {cur.price}
                                language = {cur.language}
                                author = {cur.author}
                                >
                                    <MyButton primary>Import More Product</MyButton>
                                </Card>
                    })}


                </div>
                <div className={clsx(styles.page)}>

                    <ForwardPage 
                        page = {books}
                        setPage = {setPage}
                    />
                </div>
            </div>
        </DefaultLayoutDashboard>
    </div> );
}

export default BookDashboard;