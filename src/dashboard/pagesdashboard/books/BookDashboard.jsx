import clsx from "clsx";
import styles from "~dashboard/pagesdashboard/books/BookDashboard.module.scss"
import stylesCard from "~components/Card/Card.module.scss"
import DefaultLayoutDashboard from "../../components/Layouts/DefaultLayoutDashboard/DefaultLayoutDashboard.jsx";
import MyButton from "~components/Button/MyButton.jsx"
import Card from "~components/Card/Card.jsx"
import ForwardPage from "../../../components/ForwardPage/ForwardPage.jsx";
import SearchDashboard from "~dashboard/components/Search/SearchDashboard.jsx"
import MyInput from "~components/Input/MyInput.jsx"
import FormBook from "../../components/FormBook/FormBook.jsx";
import { useCallback, useEffect, useState } from "react";
import {validateImportMore} from "~pages/register/Validate.jsx"
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
    const [showImportMore,setShowImportMore] = useState(false);
    const [importMore,setImportMore] = useState({
        "Import_Price":"",
        "Quantity":"",
    })
    const [errorImportMore,setErrorImportMore] = useState({
        "Import_Price":"",
        "Quantity":"",
    })
    const [bookId,setBookId] = useState(0)

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
    const handleCloseFormImportMore = useCallback(() => {
        setShowImportMore(false)
        setErrorImportMore({
            "Import_Price":"",
            "Quantity":""
        })
        setImportMore({
            "Import_Price":"",
            "Quantity":""
        })
    },[])

    const handleImportMore = useCallback((e) => {
        const bookId = e.target.closest(`.${stylesCard.card}`).getAttribute("data_id")
        setBookId(bookId)
        setShowImportMore(true)
    },[])

    const handleImport = (e) => {
        let errors = validateImportMore(importMore);
        if(Object.keys(errors).length > 0){
            setErrorImportMore(errors)
        }
        else{
            let params = new URLSearchParams();
            params.append("bookId",bookId);
            params.append("quantity",importMore.Quantity);
            params.append("importPrice",importMore.Import_Price)
            let query = params.toString();
            fetch(`http://localhost:8080/api/dashboard/importbooks/importmore?${query}`,{
                method: "POST",
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                setTimeout(() => {
                    data.message
                },300)
                setShowImportMore(false)
                setIsSearch(prev => prev+1)
            })
        }
    }

    const handChangeInput =useCallback((e) => {
        setImportMore(prev => {
            return {
                ...prev,
                [e.target.name]:e.target.value
            }
        })
        setErrorImportMore(prev => {
            return {
                ...prev,
                [e.target.name]: ""
            }
        })
    },[])

   
    return ( <div>
        <FormBook 
                    show = {showImportMore}
                    handleCloseForm= {handleCloseFormImportMore}
                    importBook = {importMore}
                    handChangeInput= {handChangeInput}
                    errors ={errorImportMore}
                >
                    <MyButton  primary onClick ={handleImport}>+Import</MyButton>
        </FormBook>

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
                                data_id={cur.id}
                                key = {index}  
                                img = {cur.imageUrl}
                                name={cur.bookName}
                                quantity = {cur.quantity}
                                price = {cur.price}
                                language = {cur.language}
                                author = {cur.author}
                                >
                                    <MyButton primary onClick = {handleImportMore}>Import More Product</MyButton>
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