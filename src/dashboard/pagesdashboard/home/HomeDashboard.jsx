import styles from "~dashboard/pagesdashboard/home/HomeDashboard.module.scss"
import clsx from "clsx";
import DefaultLayoutDashboard from "../../components/Layouts/DefaultLayoutDashboard/DefaultLayoutDashboard.jsx";
import ContentDashboard from "~dashboard/components/Layouts/Content/ContentDashboard.jsx"

function HomeDashboard() {
    return ( <div>
        <DefaultLayoutDashboard >
           <ContentDashboard />
        </DefaultLayoutDashboard>
    </div> );
}

export default HomeDashboard;