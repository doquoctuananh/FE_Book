import { useContext } from "react"


const isRequired = (value) => {
    // if (value == null) {
    //     return 'Không được để trống';
    // }
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

export {isRequired,isEmail,isAddress,isPhone,isPassword,isGender}