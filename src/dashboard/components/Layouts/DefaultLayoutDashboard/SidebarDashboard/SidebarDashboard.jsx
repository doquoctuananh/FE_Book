import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "~dashboard/components/Layouts/DefaultLayoutDashboard/SidebarDashboard/SidebarDashboard.module.scss"
import clsx from "clsx";
import MyButton from "~components/Button/MyButton.jsx"


function SidebarDefault() {
    return ( <div className={clsx(styles.sidebar)}>
        <div className={clsx(styles.heading)}>
            <h1>Dashboard</h1>
        </div>
        <div className={clsx(styles.content)}>
            <MyButton margin_top link to="/api/dashboard">
                <FontAwesomeIcon icon="fa-chart-line" />
                Dashboard
            </MyButton>
            <MyButton margin_top link to="/api/dashboard/users">
                <FontAwesomeIcon icon="fa-users-gear" />
                Users
            </MyButton>
            <MyButton margin_top link to="/api/dashboard/typebooks">
                <FontAwesomeIcon icon="fa-solid fa-swatchbook" />
                Type Books
            </MyButton>
            <MyButton margin_top link to="/api/dashboard/books">
                <FontAwesomeIcon icon="fa-book-open" />
                Books
            </MyButton>
            <MyButton margin_top link to="/api/dashboard/orders">
                <FontAwesomeIcon icon="fa-truck" />
                Orders
            </MyButton>
            <MyButton margin_top link to="/api/dashboard/importbooks">
                <FontAwesomeIcon icon="fa-upload" />
                Import Books
            </MyButton>

        </div>
    </div> );
}

export default SidebarDefault;