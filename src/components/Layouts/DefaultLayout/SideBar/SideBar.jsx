import styles from '../SideBar/SideBar.module.scss'
import clsx from 'clsx';
import Category from '../../Category/Category';
import { useState,useEffect,useCallback,useMemo,useContext } from 'react';
import MyButton from "~components/Button/MyButton.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HomeContext } from '../../../../pages/home/Home';

function SideBar() {
    const [typeBook,setTypeBook] = useState([]);
    const token = localStorage.getItem("token")
    const [choose,setChoose] = useState({
        TypeBook:"",
        Price:"",
        Language:""
    })
    
    const [chooseValue,setChooseValue] = useState({
        TypeBook:"",
        Price:"",
        Language:""
    })

    const {setCard,setPage,page} = useContext(HomeContext)

    const languageList = useMemo(() => {
        return [{id:1,name:"Vietnam"},{id:2,name:"English"}]
    },[])
    const priceList = useMemo(() => {
        return [{id:1,name:"Dưới 90 VND",value:[0,90000]},
                    {id:2,name:"Từ 90 - 100 VND",value:[90000,100000]},
                    {id:3,name:"Từ 100 - 120 VND",value:[100000,120000]},
                    {id:4,name:"Từ 120 - 300 VND",value:[120000,300000]}
                ]
    },[])
    useEffect(() => {
        fetch("http://localhost:8080/api/home/category",{
            methods:"GET",
            
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const newData = data.map((cur,index) => {
                return {
                    id:cur.id,
                    name:cur.typeName
                }
            })
            setTypeBook(newData)
        })
        .catch(error => {
            console.log(error)
        })
    },[token])

    const handleChooseChange = useCallback((name,value) => {
        setChoose(prev => {
            return {
                ...prev,
                [name]:value
            }
        })
        setPage(0)  
    },[])

    const handleChangeValue = useCallback((name,value) => {
        chooseValue[name] = value
    },[])

    const handleDeleteChoose = (cur) => {
        chooseValue[cur]="",
        setChoose(prev => {
            return {
                ...prev,
                [cur]:""
            }
        })
    }



    console.log(chooseValue)
    console.log(choose)
    useEffect(() => {
        const params = new URLSearchParams();
        params.append("page",page);
        choose.TypeBook !== "" ? params.append("typeId",choose.TypeBook): undefined;
        choose.Language != "" ? params.append("language",chooseValue.Language): undefined;
        if(choose.Price !== ""){

            const price = priceList.find((cur,index) => {
                return parseInt(choose.Price) == cur.id;
            })

            console.log(price)
            params.append("minPrice",price.value[0])
            params.append("maxPrice",price.value[1])
        }
        let query = params.toString()
        console.log(query)
        fetch(`http://localhost:8080/api/home/books/filter?${query}`,{
            method :"GET"
        })
        .then(response => response.json())
        .then(data => setCard(data))
        .catch(error => console.log(error))
    },[choose])

    return ( 
        <div className={clsx(styles.sidebar)}>
            <h1>Filter</h1>
            <div className={clsx(styles.choose)}>
                {
                    Object.keys(chooseValue).map((cur,index) => {
                        return  choose[cur] !== "" ? <span key={index}>
                            <MyButton primary>
                                {chooseValue[cur]}
                                <FontAwesomeIcon 
                                    className={clsx(styles.icon)} 
                                    icon="fa-solid fa-xmark"
                                    onClick={() => handleDeleteChoose(cur)}
                                />
                            </MyButton> 
                        </span>
                        : ""
                        
                    }) 
                }
            </div>

            <Category 
                name = "TypeBook"
                list = {typeBook}
                checkValue={choose.TypeBook}
                onChooseChange={handleChooseChange}
                onChangeValue ={handleChangeValue}
            />

            <Category 
                name = "Language"
                list = {languageList}
                checkValue={choose.Language}
                onChooseChange={handleChooseChange}
                onChangeValue ={handleChangeValue}

            />  

            <Category 
                name = "Price"
                list = {priceList}
                checkValue={choose.Price}
                onChooseChange={handleChooseChange}
                onChangeValue ={handleChangeValue}
                
            />       
        </div>
     );
}

export default SideBar;