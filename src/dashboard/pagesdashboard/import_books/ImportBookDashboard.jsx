import clsx from "clsx";
import styles from "~dashboard/pagesdashboard/import_books/ImportBookDashboard.module.scss"
import DefaultLayoutDashboard from "../../components/Layouts/DefaultLayoutDashboard/DefaultLayoutDashboard.jsx";
import MyButton from "~components/Button/MyButton.jsx"
import MyInput from "~components/Input/MyInput.jsx"
import MyForm from "../../components/Form/MyForm.jsx";
import { validateImportBook } from "../../../pages/register/Validate.jsx";
import { useCallback, useState,useEffect } from "react";
import DisplayDate from "~components/DisplayDate/DisplayDate.jsx"
import DisplayPrice from "~components/DisplayPrice/DisplayPrice.jsx"
import ForwardPage from "~components/ForwardPage/ForwardPage.jsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchDashboard from "~dashboard/components/Search/SearchDashboard.jsx"
import { data } from "react-router-dom";
function ImportBookDashboard() {
    const [typeBook,setTypeBook] = useState([])
    const [importTable, setImportTable] = useState({})
    const [page,setPage] = useState(0)
    const [search,setSearch] = useState({
        Name:"",
        Date :""
    })
    const [isSearch,setIsSearch] = useState(0);
    
    const [importBook,setImportBook] = useState({
        NameBook:'', Import_Price:'',
        Quantity:'', Author:'',
        Type_Book:'', Language:'',
        Description:'', Image:null
    })
    const [errors,setErrors] = useState({
        NameBook:'', Import_Price:'',
        Quantity:'', Author:'',
        Type_Book:'', Language:'',
        Description:'', Image:null
    }) 
    const [show,setShow] = useState(false)
    const token = localStorage.getItem("token")
    const handleShow = useCallback((e) => {
        setShow(true)
    },[])

    const handleCloseForm = useCallback((e) => {
        setShow(false)
        setErrors({
        NameBook:'', Import_Price:'',
        Quantity:'', Author:'',
        Type_Book:'', Language:'',
        Description:'', Image:null
    })  
        setImportBook({
        NameBook:'',
        Import_Price:'',
        Quantity:'',
        Author:'',
        Type_Book:'',
        Language:'',
        Description:'',
        Image:''
    })

    },[])

    useEffect(() => {
        fetch("http://localhost:8080/api/dashboard/type",{
            method :"GET",
            headers : {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setTypeBook(data)
        })
        .catch(errors => console.log(errors))
    },[])
    

    const handChangeInput = (e) => {
        setErrors(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.name == "Image" ? null : ""
            }
        })
        setImportBook(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.name == "Image" ? e.target.files[0] : e.target.value
            }
        })
    }

    const handleSunmitImport = (e) => {
        let checkError = validateImportBook(importBook)
        if(Object.keys(checkError).length !== 0){
            setErrors(prev => {
                return {
                    ...prev,
                    ...checkError
                }
            })
        }
        else{
            
            const formData = new FormData();
            
            formData.append("bookName",importBook.NameBook)
            formData.append("description",importBook.Description)
            formData.append("priceImport",importBook.Import_Price)
            formData.append("quantity",importBook.Quantity)
            formData.append("author",importBook.Author)
            formData.append("language",importBook.Language)
            formData.append("typeId",importBook.Type_Book)
            formData.append("imageUrl",importBook.Image)

            fetch(`http://localhost:8080/api/dashboard/importbooks/create`,{
                method:"POST",
                headers: {
                    "Authorization" :`Bearer ${token}`
                },
                body:formData
            })
            .then(async response => {
                if(response.status === 409){
                    let err = await response.json();
                    let message = err.message;
                    setErrors(prev => {
                        return {
                            ...prev,
                            ["response_error"] : message
                        }
                    })
                    return;
                }
                return response.json()
            })
            .then(data => {
                if(data){
                    setShow(false)
                    setImportBook({
                        NameBook:'', Import_Price:'',
                        Quantity:'', Author:'',
                        Type_Book:'', Language:'',
                        Description:'', Image:null
                    })
                    setPage(0)
                }
            })
        }
    }

    useEffect(() => {
        const param = new URLSearchParams();
        param.append("page",page);

        if(isSearch){
            Object.keys(search).forEach((cur,index) => {
            param.append(cur,search[cur])
            })
            let queryParam = param.toString();

            fetch(`http://localhost:8080/api/dashboard/importbooks/search?${queryParam}`,{
                method:"GET",
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                setImportTable(data)
        })
        }
        else{
            const queryParam = param.toString();
            fetch(`http://localhost:8080/api/dashboard/importbooks?${queryParam}`,{
            method:"GET",
            headers:{
                "Authorization": `Bearer ${token}`
            }
            })
            .then(response => response.json())
            .then(data => 
                setImportTable(data)
            )
        }
        
    },[page,isSearch])

    
    const handeSearchInput = useCallback((e) => {
        setSearch(prev => {
            return {
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    },[])

    const handleSearch = () => {
        if(search.Name !== "" || search.Date !== ""){
            setIsSearch(prev => {
                if(prev<0) return 0
                return prev +1;
            });
            setPage(0)
        }
        
    }
   
    return ( <div>
        <DefaultLayoutDashboard>    
            {
                show && <MyForm closeForm={handleCloseForm}>
                    {                      
                    Object.keys(importBook).map((cur,index) => {
                        const props = {}
                        if(cur === "Import_Price" || cur === "Quantity"){
                            props.type ="number"
                        }
                        if(cur === "Type_Book" || cur === "Language"){
                            props.type= "select"
                            cur === "Type_Book" ? props.select_value = typeBook.map((typeBook,index) => {
                                return {
                                    value:typeBook.id,
                                    name:typeBook.typeName
                                }
                            }) : props.select_value = [{value:"Vietnam",name:"Vietnam"},
                            {value:"English",name:"English"}]
                        }                      
                        if(cur === "Description"){
                            props.type = "textarea"
                        }
                        if(cur === "Image"){
                            props.type = "File"
                        }
                                             
                        return (
                            <div key={index}>
                                <MyInput 
                                // key ={index}
                                name = {cur}
                                {...props}
                                value = { cur !== "Image" ? importBook[cur] : undefined}
                                onChange = {handChangeInput} />
                                <span>{errors[cur]}</span>
                            </div>
                        )
                    })}
                    <span>{errors.response_error}</span>
                    <MyButton 
                        primary onClick={handleSunmitImport} 
                    >
                        Import
                   </MyButton>
                </MyForm>
            }
            
            <div className={clsx(styles.app)}>
                <div className={clsx(styles.heading)}>
                    <MyButton primary onClick ={handleShow} >+ Nhập kho</MyButton>
                    <SearchDashboard handleSearch = {handleSearch}>
                        <MyInput value= {search.Name} onChange={handeSearchInput} margin_lr name="Name"/>
                        <MyInput value={search.Date} onChange={handeSearchInput} margin_lr type="date" name="Date"/>
                    </SearchDashboard>
                </div>
                <div className={clsx(styles.content)}>
                   <h2>Table Import Book</h2>
                        <table>
                          <thead>
                            <tr>
                                <th>Name</th>
                                <th>Date Import</th>
                                <th>Price Import</th>
                                <th>Quantity</th>
                                <th>Type Book</th>
                                <th>Image</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.keys(importTable).length > 0 && importTable.content.map((cur,index) => {
                                return(
                                    <tr key={index}>
                                       <td>{cur.name}</td>
                                       <td>
                                            <DisplayDate date = {cur.importDate} />
                                       </td>
                                       <td>
                                            <DisplayPrice price ={cur.importPrice} /> VND
                                        </td>
                                       <td>{cur.importQuantity}</td>
                                       <td>{cur.importBook.type.typeName}</td>

                                       <td>
                                        <img src={`http://localhost:8080/image/${cur.importBook.imageUrl}`} alt="Girl in a jacket" width="80" height="80"/>
                                       </td>
                                      
                                    </tr>
                                )
                            })}
                          </tbody>  
                          
                        </table>

                    <>
                        <ForwardPage 
                            page = {importTable}
                            setPage = {setPage}
                        />
                    </>
                </div>
            </div>

        </DefaultLayoutDashboard>
    </div> );
}

export default ImportBookDashboard;