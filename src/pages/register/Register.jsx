import { createContext, useEffect, useState } from 'react';

import styles from '~pages/register/Register.module.scss'
import clsx from 'clsx';
import MyInput from '../../components/Input/MyInput.jsx';
import MyButton from '~components/Button/MyButton.jsx';
import { isRequired,isEmail,isPhone ,isAddress,isPassword,isGender} from './Validate.jsx';
import { useNavigate } from 'react-router-dom';


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
    console.log(register)
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
        let newError= {}
        if(isRequired(register.username) !== true){
            newError.username = isRequired(register.username);
        }
        if(isEmail(register.email) !== true ){
            newError.email = isEmail(register.email)
        }

        if(isAddress(register.address) !== true){
            newError.address = isAddress(register.address)
        }
        if(isPhone(register.phone) !== true){
            newError.phone = isPhone(register.phone)
        }

        if(isPassword(register.password) !== true){
            newError.password = isPassword(register.password)
        }
        if(isGender(register.gender) !== true){
            newError.gender = isGender(register.gender)
        }

        setError(newError)

        if(Object.keys(newError).length ===0) {
            console.log("Gui du lieu thanh cong chuyen huowng")
            navigator("/login")
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
                        </div>
                    </form>
                    
                    
                </div>
        </div>
     );
}
export default Register;