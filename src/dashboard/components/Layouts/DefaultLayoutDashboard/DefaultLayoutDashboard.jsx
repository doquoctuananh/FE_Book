
import clsx from "clsx";
import styles from "~dashboard/components/Layouts/DefaultLayoutDashboard/DefaultLayoutDashboard.module.scss"

import SidebarDashboard from "~dashboard/components/Layouts/DefaultLayoutDashboard/SidebarDashboard/SidebarDashboard.jsx"
import HeaderDashboard from "./HeaderDashboard/HeaderDashboard";
function DefaultLayoutDashboard({children}) {
    return ( 
        <div className={clsx(styles.app)}>
            
            <SidebarDashboard /> 
               
            <div className={clsx(styles.content)}>
                <HeaderDashboard />
                {children}
            </div>
        </div>
     );
}

export default DefaultLayoutDashboard;