import { useContext } from "react"


const isRequired = (value) => {
    
    return value === '' ? 'Không được để trống' : value.length >= 6 ? true :'Độ dài lớn hơn 6' ;
}

const isEmail = (value) => {
    const validateEmailRegex = /^\S+@\S+\.\S+$/;
    return value == '' ? "Không được để trống" : validateEmailRegex.test(value) === true ? true : "Nhập sai định dạng email"
}

const isAddress= (value) => {
    return value !== '' ? true : "Không được để trống";
}
const isPhone = (value) => {
    const validatePhoneRegex = /^0[0-9]{9}$/;
    return value === '' ? "Không được để trống":validatePhoneRegex.test(value) === true ? true : "Nhập sai định dạng phone"
}

const isPassword = (value) => {
    return value === ''? "Không được để trống" : value.length >= 6 ? true : "Phải lớn hơn 6 kí tự"
}

const isGender = (value) => {
    return value == '' ? "Không được để trống" : true;
}

const validateForm = (register) => {
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

    return newError;
}

const isRequiredLoginUsename = (value) => {
    return value == '' ? "Không được để trống" : true;
}

const isRequiredLoginPassword = (value) => {
    return value == '' ? "Không được để trống" : true;
}

const validateFormLogin = (value) => {
    const errors = {}
    if(isRequiredLoginUsename(value.userName) !== true){
        errors.userName = isRequiredLoginUsename(value.userName)
    }
    if(isRequiredLoginPassword(value.passWord) !== true){
        errors.passWord = isRequiredLoginPassword(value.passWord)
    }
    return errors;
}

export {validateForm,validateFormLogin}