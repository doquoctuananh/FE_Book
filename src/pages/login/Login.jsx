import styles from '~pages/login/Login.module.scss'
import clsx from 'clsx';
import MyInput from '../../components/Input/MyInput';
import MyButton from '../../components/Button/MyButton';
function Login() {
    return ( 
        <div className={clsx(styles.login)}>
            <div className={clsx(styles.form_login)}> 
                <h2>Đăng Nhập</h2>
                <form className={clsx(styles.form)}>
                    <MyInput  name = "UserName"/>
                    <MyInput  name = "Password"/>
                </form>
                <div className={clsx(styles.form_footer)}>
                    <MyButton to="/" link primary>Đăng Nhập</MyButton>
                </div>
            </div>
        </div>
    );
}

export default Login;