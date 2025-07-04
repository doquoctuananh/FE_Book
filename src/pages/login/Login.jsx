import styles from '~pages/login/Login.module.scss'
import clsx from 'clsx';
import MyInput from '../../components/Input/MyInput';
import MyButton from '../../components/Button/MyButton';
import { useCallback, useState } from 'react';
import { validateFormLogin } from '../register/Validate';
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState({})
    
    const handleChangeUsername = useCallback((e) => {
        setUsername(e.target.value)
        setError(prev => {
            return {
                ...prev,
                [e.target.name]: ''
            }
        })
    },[])

    const handleChangePassword = useCallback((e) => {
        setPassword(e.target.value)
        setError(prev => {
            return {
                ...prev,
                [e.target.name]: ''
            }
        })  
    },[])

    const handleLogin = (e) => {
        e.preventDefault()
        const informationLogin = {
            username,
            password
        }
        const errors = validateFormLogin(informationLogin)
        
        if(Object.keys(errors).length == 0){
            fetch("http://localhost:8080/api/auth/login",{
                method:"POST",
                headers :{
                    "Content-Type": "application/json"
                },
                
                body : JSON.stringify(informationLogin)
            })
            .then(async response => {
                if(!response.ok){
                    let errMessage = "Đăng nhập thất bại";
                    const err = await response.json();
                    errMessage = err.message || errMessage;
                    setError({server: errMessage})
                    return;
                }
                return response.json()
            }
            )
            .then( data =>{
                if(data && data.token){
                    localStorage.setItem("token",data.token)
                    navigate("/api/books")
                }
            })
            .catch(error => console.log(error))
        }
        else{
            console.log("Có lỗi")
            console.log(errors)

            setError(errors)
        }
    }

    return ( 
        <div className={clsx(styles.login)}>
            <div className={clsx(styles.form_login)}> 
                <h2>Đăng Nhập</h2>
                <form className={clsx(styles.form)}>
                    <MyInput value = {username} onChange={handleChangeUsername}  name = "username"/>
                    <span>{error.username}</span>
                    <MyInput value= {password} onChange={handleChangePassword} type="password"  name = "password"/>
                    <span>{error.password}</span>
                    <span>{error.server}</span>
                </form>
                
                <div className={clsx(styles.form_footer)}>
                    <MyButton  primary onClick = {handleLogin}>Đăng Nhập</MyButton>
                    <MyButton to="/register" link >Đăng Kí</MyButton>
                </div>
            </div>
        </div>
    );
}

export default Login;