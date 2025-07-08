import clsx from "clsx";
import styles from "~dashboard/pagesdashboard/type_books/TypeBookDashboard.module.scss"
import DefaultLayoutDashboard from "../../components/Layouts/DefaultLayoutDashboard/DefaultLayoutDashboard.jsx";
import MyButton from "~components/Button/MyButton.jsx"
import MyInput from "~components/Input/MyInput.jsx"
import MyForm from "../../components/Form/MyForm.jsx";
import {isRequired} from "~pages/register/Validate.jsx"
import { createContext, useCallback, useEffect, useState } from "react";

function TypeBookDashboard() {
    const [data,setData] = useState([]);
    const [show,setShow] = useState(false);
    const [type,setType] = useState('');
    const [edit,setEdit] = useState(false)
    const [old,setOld] = useState('')
    const [editId,setEditId] = useState(null)
    const [error,setError] = useState({
        typeName:''
    });
    const token = localStorage.getItem("token")
    
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
            setData(data)
        })
        .catch(errors => console.log(errors))
    },[])

    const handleDeteteType = (e) => {
        let comfirm = confirm("Ban co muon xoa khong");
        if(comfirm){
            let id = e.target.closest("tr").getAttribute("data_id");
            let new_data = data.filter((cur,index) => parseInt(cur.id) !== parseInt(id));
            let token = localStorage.getItem("token")
            fetch("http://localhost:8080/api/dashboard/type/delete/" + id,{
                method: "DELETE",
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(async response => {
                if(response.status === 404){
                    console.log("khong tim thay");
                    return;
                }
                return response.json();
            })
            .then(data => {
                if(data){
                    setData(new_data);
                    console.log(data)
                    setTimeout(() => {
                        alert("Xoa thanh cong")
                    },500)
                }
            })
            
        }
    }

    const showCreateType = useCallback((e) => {
        setShow(true)
        setError({
        typeName:''
    })  
        setType('')
    },[])

    const handleCloseForm = useCallback((e) => {
        setShow(false)
        setEdit(false)
    },[])

    const handleType = useCallback((e) => {
        setType(e.target.value)
         setError({
        typeName:''
    })  
    },[])

    const handleEditType = useCallback((e) =>{
        console.log(data)
        let id = parseInt(e.target.closest("tr").getAttribute("data_id"));
        setEditId(id)
        const nameOld = data.find((cur,index) => parseInt(cur.id) === parseInt(id)).typeName;
        console.log(nameOld)
        setOld(nameOld)
        setShow(true);
        setEdit(true);
        setType("")
        setError(prev => {
            return {
                typeName:''
            }
        })
    },[data])
    
    const handleCreateType = (e) => {
        let required = isRequired(type);
        if(required !== true){
            setError(prev => {
                return {
                    ...prev,
                    typeName: isRequired(type)
                }
            })
        }
        else{
            let createType = {
                typeName : type
            }
            if(e.target.textContent === "Create"){
                fetch("http://localhost:8080/api/dashboard/type/create",{
                    method: "POST",
                    headers : {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body : JSON.stringify(createType)
                })
                .then(response => {
                    if(response.status !== 201 ){
                        console.log("them moi that bai")
                        return;
                    }
                    return response.json()
                })
                .then(data =>{
                    if(data){
                        console.log("them moi thanh cong")
                        setData(prev => [...prev,data])
                        setShow(false)
                    }
                })
            }

            else if(e.target.textContent =="Edit"){
                console.log(editId,createType)
                fetch("http://localhost:8080/api/dashboard/type/edit/" + editId,{
                    method:"PATCH",
                    headers:{
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify(createType)
                })
                .then(response => {
                    if(response.status !==200){
                        console.log("khong tim thay Id")
                        return;
                    }
                    return response.json();
                }
                )
                .then(responseData => {
                    if(responseData){
                        data.map((cur,index) => {

                            if(parseInt(cur.id) === editId){
                                cur.typeName=createType.typeName;
                            }
                        }
                        )
                        setData(prev => [...prev])
                        setEdit(false)
                        setEditId(null)
                        setShow(false)
                        setOld("")
                        setType("")
                        setTimeout(() => {
                            alert("Edit thanh cong")
                        },500)
                    }
                }
                )
            }
        }
    }

    return ( <div>
        <DefaultLayoutDashboard>
            
            <div className={clsx(styles.app)}>
                {show  && <MyForm  closeForm ={handleCloseForm}>
                    <h2>{edit && "Edit Name" || show && "Create"}</h2>
                    {edit && <MyInput value ={old} onChange= {() => 123} disabled  name = "Name Old" /> }

                    <MyInput value ={type} onChange= {handleType} name = "name" />
                    <span>{error && error.typeName}</span>
                    <MyButton onClick={handleCreateType} primary>
                        {edit && "Edit" ||show && "Create" }
                    </MyButton>
                    
                </MyForm>}

                <div className={clsx(styles.heading)}>
                    <MyButton primary onClick = {showCreateType}>
                        + Create Type Book
                    </MyButton>
                </div>
                <div className={clsx(styles.context)}>
                    <div className={clsx(styles.table)}>

                        <table>
                            <thead>
                              <tr>
                                <th>Name Type Book</th>
                                <th>Option</th>
                                <th>Option</th>
                              </tr>
                            </thead>
                            
                            <tbody>
                              {data.map((data,index) => {
                                   return (
                                    <tr key={index} data_id={clsx(data.id)}>
                                        <td>{data.typeName}</td>
                                        <td>
                                            <MyButton onClick={handleEditType} warning>Edit</MyButton>
                                        </td>
                                        <td>
                                            <MyButton onClick = {handleDeteteType} danger>Delete</MyButton>
                                        </td>
                                    </tr>
                                   )
                              })}
                            </tbody>
                              
                        </table>
                    </div>
                </div>
            </div>
        </DefaultLayoutDashboard>
    </div> );
}

export default TypeBookDashboard;

