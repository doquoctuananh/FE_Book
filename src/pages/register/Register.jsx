import styles from '~pages/register/Register.module.scss'
import clsx from 'clsx';
import MyInput from '../../components/Input/MyInput.jsx';
import MyButton from '~components/Button/MyButton.jsx';
function Register() {
    return ( 
        <div className={clsx(styles.register)}>
            
            <div className={clsx(styles.register_form)}>
                <h2>Đăng kí</h2>
                <form className={clsx(styles.form)}>
                    <MyInput name = "Name"/>
                    <MyInput name = "Email"/>
                    <MyInput name = "Address"/>
                    <MyInput name = "Phone"/>
                    <MyInput name = "Gender"/>
                    <MyInput name = "Password"/>
                </form>
                
                <div className={clsx(styles.form_footer)}>
                    <MyButton primary>Đăng kí</MyButton>
                </div>
            </div>
        </div>
     );
}

export default Register;