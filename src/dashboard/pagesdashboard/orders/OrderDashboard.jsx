import clsx from "clsx";
import styles from "~dashboard/pagesdashboard/orders/OrderDashboard.module.scss"
import DefaultLayoutDashboard from "../../components/Layouts/DefaultLayoutDashboard/DefaultLayoutDashboard.jsx";

function OrderDashboard() {
    return ( <div>
        <DefaultLayoutDashboard>
            <h1>Orders</h1>
        </DefaultLayoutDashboard>
    </div> );
}

export default OrderDashboard;