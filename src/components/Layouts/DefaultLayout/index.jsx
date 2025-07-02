import Header from "~components/Layouts/Header/Header.jsx";
import SideBar from "~components/Layouts/DefaultLayout/SideBar/SideBar.jsx";
import styles from '~components/Layouts/DefaultLayout/index.module.scss'
import clsx from "clsx";
function DefaultLayout({children}) {
    return ( 
        <div className={clsx("app")}>
            <Header />
            <div className= {clsx(styles.container)}>
                <SideBar />
                <div>
                    {children}
                </div>
            </div>
        </div>
     );
}

export default DefaultLayout;