import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import clsx from "clsx";
import styles from "~dashboard/components/Layouts/DefaultLayoutDashboard/HeaderDashboard/HeaderDashboard.module.scss"
import MyButton from "../../../../../components/Button/MyButton";
import assets from "~/assets/img/index.jsx";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
function HeaderDashboard() {
    const navigate = useNavigate();
    const handleLogout = useCallback((e) => {
        localStorage.removeItem("token")
        navigate("/login")
    },[])

    return ( <div className={clsx(styles.heading)}>
        <h1>Welcome Home</h1>
        <div className={clsx(styles.img)}>
            <img src={assets.book} />
            <img src={assets.book} />
            <img src={assets.book} />
        </div>
        <div className={styles.logout}>
            <MyButton primary onClick = {handleLogout}>
                <FontAwesomeIcon icon="fa-arrow-right-from-bracket" />
                Logout
            </MyButton>
        </div>
    </div> );
}

export default HeaderDashboard;