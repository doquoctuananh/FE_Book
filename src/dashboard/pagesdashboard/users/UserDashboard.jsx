import clsx from "clsx";
import styles from "~dashboard/pagesdashboard/users/UserDashboard.module.scss"
import DefaultLayoutDashboard from "../../components/Layouts/DefaultLayoutDashboard/DefaultLayoutDashboard.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState,useEffect, useCallback } from "react";
import ForwardPage from "~components/ForwardPage/ForwardPage.jsx"
import MyButton from "../../../components/Button/MyButton.jsx";
import CardDashboard from "~dashboard/components/CardDashboard/CardDashboard.jsx"
import DisplayPrice from "~components/DisplayPrice/DisplayPrice.jsx"
import SearchDashboard from "~dashboard/components/Search/SearchDashboard.jsx"
import MyInput from "~components/Input/MyInput.jsx"
function UserDashboard() {
    const [users,setUsers] = useState({})
    const [page,setPage]  = useState(0)
    const [statiscal,setStatiscal] = useState(0)
    const [loading,setLoading] = useState(1)
    const token = localStorage.getItem("token")
    
    const [search,setSearch] = useState({
        Username:"",
        Phone:"",
        Email:""
    })

    useEffect(() => {
        const params = new URLSearchParams();
        params.append("page",page)

        if(loading){
            search.Username !== "" ? params.append("username",search.Username) : 1
            search.Phone !== "" ? params.append("phone",search.Phone) :1
            search.Email !== "" ?params.append("email",search.Email):1
            let query = params.toString()
            fetch(`http://localhost:8080/api/dashboard/users/search?${query}`,{
                    method:"POST",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then(response => response.json())
                .then(data => {
                    setUsers(data)
                })
        }

        else{
                let query = params.toString()
                fetch(`http://localhost:8080/api/dashboard/users?${query}`,{
                    method:"GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then(response => response.json())
                .then(data => {
                    setUsers(data)
                })
            }
        
    },[page,loading])

    useEffect (() => {
        fetch(`http://localhost:8080/api/dashboard/users/statiscal`,{
                    method:"GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then(response => response.json())
                .then(data => {
                    setStatiscal(data)
                })
    },[])

    const handleChangeInput= useCallback((e) => {
        setSearch(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    },[])

    const handleSearch = () => {
        const isSearch = Object.keys(search).some(cur => cur !== "")
        if(isSearch){
            setLoading(prev => prev+1)
            setPage(0)
        }
    }
    const handleReset = useCallback(() => {
        setSearch({
            Username:"",
            Phone:"",
            Email:""
        })
        setPage(0)
        setLoading(0)
    },[])
    console.log(search)
    return ( <div>
        <DefaultLayoutDashboard>
            <div className = {clsx(styles.app)}>
                <div className={clsx(styles.user)}>
                <div className="">
                    <SearchDashboard 
                        handleSearch = {handleSearch} 
                        reset = {handleReset}
                    >
                        {
                            Object.keys(search).map((cur,index) => {
                                return (
                                    <MyInput 
                                        key={index}
                                        name = {cur} 
                                        value ={search[cur]}
                                        onChange = {handleChangeInput}
                                        margin_lr/>
                                )
                            })
                        }
                       
                    </SearchDashboard>
                </div>
                
                <table>
                    <thead>
                      <tr>
                        <th>
                            <FontAwesomeIcon icon="fa-user" />
                        </th>
                        <th>
                            <FontAwesomeIcon icon="fa-phone-volume" />
                        </th>
                        <th>
                            <FontAwesomeIcon icon="fa-envelope" />
                        </th>
                        <th>
                            <FontAwesomeIcon icon="fa-map-location-dot" />
                        </th>
                        <th>
                            <FontAwesomeIcon icon="fa-solid fa-venus-double" />
                        </th>
                        <th>
                            <FontAwesomeIcon icon="fa-solid fa-battery-full" />
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {Object.keys(users).length > 0 && users.content.map((cur,index) => {
                        return (
                            <tr key={index}>
                                <td>{cur.username}</td>
                                <td>{cur.phone}</td>
                                <td>{cur.email}</td>
                                <td>{cur.address}</td>
                                <td>{cur.gender == true ? "Male":"Female"}</td>
                                <td>
                                    <MyButton primary ={cur.status =="active" ? true : false} >
                                        {cur.status}
                                    </MyButton>
                                </td>
                            </tr>     
                        )
                      })}  
                                        
                    </tbody>                     
                    </table>
                    <div className={clsx(styles.footer_table)}>
                        <ForwardPage 
                            page = {users}
                            setPage ={setPage}
                        />
                    </div>
                </div>

                <div className={clsx(styles.footer)}>
                      <CardDashboard 
                        title = "Total Person"
                        icon = {<FontAwesomeIcon icon="fa-solid fa-users" />}
                        weight
                        number ={statiscal.totalPerson}
                      />
                      <CardDashboard
                        title = "Percen Male %"
                        icon = {<FontAwesomeIcon icon="fa-solid fa-user-tie" />}
                        primary
                        number = {<DisplayPrice  price =  {statiscal.personMale || 0} />}
                      />
                      <CardDashboard 
                        title = "Percen Active %"
                        icon ={<FontAwesomeIcon icon="fa-solid fa-signal" />}
                        light
                        number =  {<DisplayPrice  price =  {statiscal.personAccountActive || 0} />}
                      />
                </div>
            </div>
        </DefaultLayoutDashboard>
    </div> );
}

export default UserDashboard;