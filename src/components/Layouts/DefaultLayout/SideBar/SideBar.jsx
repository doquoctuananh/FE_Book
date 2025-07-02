import styles from '../SideBar/SideBar.module.scss'
import clsx from 'clsx';

function SideBar() {
    return ( 
        <div className={clsx(styles.sidebar)}>
            <h1>SideBar</h1>
        </div>
     );
}

export default SideBar;