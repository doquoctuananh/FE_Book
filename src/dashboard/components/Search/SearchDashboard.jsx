import MyButton from "../../../components/Button/MyButton";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import styles from "~dashboard/components/Search/SearchDashboard.module.scss"
function SearchDashboard({children,
        handleSearch,
        reset
    }) {
     
       
    return ( 
        <div className={clsx(styles.search)}>
            {children}
            <MyButton primary onClick ={handleSearch}>Search</MyButton>
            <MyButton  onClick = {reset}>Reset</MyButton>
        </div>
    );
}

export default SearchDashboard;