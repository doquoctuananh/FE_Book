import clsx from "clsx";
import styles from "~dashboard/pagesdashboard/books/BookDashboard.module.scss"
import DefaultLayoutDashboard from "../../components/Layouts/DefaultLayoutDashboard/DefaultLayoutDashboard.jsx";

function BookDashboard() {
    return ( <div>
        <DefaultLayoutDashboard>
            <h1>Books</h1>
        </DefaultLayoutDashboard>
    </div> );
}

export default BookDashboard;