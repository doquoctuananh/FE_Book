import clsx from 'clsx';
import styles from '~components/Input/MyInput.module.scss'

function MyInput({
    name,
    type,
    onClick,
    onChange}) {

    const props= {
        name,
        type,
        onClick,
        onChange
    }

    return ( <div className={clsx(styles.input_item)}>
        <label htmlFor = {name}>{name}: </label>
        {name === "Gender" ? <div className={clsx(styles.gender)}>
            {/* <b>Nam: </b>
            <input value="1" name = "gender" type="radio"  className={clsx(styles.input_gender)}/>
            <b>Nu: </b>
            <input value="0" name = "gender" type="radio" className={clsx(styles.input_gender)} /> */}
            <select {...props} name={name} id={name}>
                <option value="">Chọn giới tính</option>
                <option value="1">Nam</option>
                <option value="0">Nữ</option>
            </select>
        </div>: <input {...props} id={name} placeholder= "Nhap Thong tin" />}
    </div> );
}

export default MyInput;