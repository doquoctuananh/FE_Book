import { createContext, useEffect, useState } from 'react';

import styles from '~pages/register/Register.module.scss'
import clsx from 'clsx';
import MyInput from '../../components/Input/MyInput.jsx';
import MyButton from '~components/Button/MyButton.jsx';
import { validateForm} from './Validate.jsx';
import { data, useNavigate } from 'react-router-dom';


function Register() {
    const navigator = useNavigate();
    const [register,setRegister]  = useState({
        username:'',
        email:'',
        address:'',
        phone: '',
        gender:'',
        password:''
    })
    
    const [error,setError] = useState({})
    
    const handleChange = (e) => {
        setRegister(prev => {return {
            ...prev,
            [e.target.name.toLowerCase()]:e.target.value
        }})
        setError(prev => {
            return {
                ...prev,
                [e.target.name.toLowerCase()] :''
            }
        })
    }

    const handleSubmitRegister = (e) => {
        e.preventDefault();
        let newError = validateForm(register);
        setError(newError)

        if(Object.keys(newError).length ===0) {
            let newRegister = {...register,gender: parseInt(register.gender)}
            fetch("http://localhost:8080/api/auth/register",{
                method:"POST",
                headers:{
                   "Content-Type":"application/json"
                },
                body :JSON.stringify(newRegister)
            })
            .then(async (response) =>  {
                if(response.status == 409){
                    let responseError = await(response.json())
                    setError(prev => {
                        return {
                            ...prev,
                            ...responseError
                        }
                    })
                    return;
                }
                return response.json()
                
            })
            .then(data => {
                if(data.id >0 && data ){
                    console.log("Đăng kí thành công")
                    navigator("/login")
                }
            })
            .catch(error => {
                console.log(error)
            }) 
        }
    }

    return ( 
        <div className={clsx(styles.register)}>
                <div className={clsx(styles.register_form)}>
                    <h2>Đăng kí</h2>
                    <form method='POST' onSubmit={handleSubmitRegister} className={clsx(styles.form)}>
                        <MyInput 
                            value={register.username} 
                            name = "Username" 
                            onChange={handleChange}
                        />
                        <span>{error.username}</span>

                        <MyInput 
                            value ={register.email}
                            name = "Email" 
                            onChange={handleChange}
                        />
                        <span>{error.email}</span>
                        

                        <MyInput 
                            value ={register.address}
                            name = "Address" 
                            onChange={handleChange}
                        />
                        <span>{error.address}</span>

                        <MyInput 
                            value = {register.phone}
                            name = "Phone"  
                            onChange={handleChange}
                        />
                        <span>{error.phone}</span>

                        <MyInput 
                            value ={register.gender}
                            name = "Gender"
                            onChange={handleChange}
                        />
                        <span>{error.gender}</span>

                        <MyInput 
                            value= {register.password}
                            name = "Password"
                            type ="password"
                            onChange={handleChange}
                        />
                        <span>{error.password}</span>

                        <div className={clsx(styles.form_footer)}>
                            <MyButton type="submit"  primary>Đăng Kí</MyButton>
                            <MyButton link to= "/login" >Đăng Nhập</MyButton>
                        </div>
                    </form>
                    
                    
                </div>
        </div>
     );
}
export default Register;