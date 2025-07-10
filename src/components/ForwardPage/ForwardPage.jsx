
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import styles from "~components/ForwardPage/ForwardPage.module.scss"
function ForwardPage({
    page,
    setPage,

}) {
     const handleForwardPage = (direction) => {
        switch(direction){
            case "right" : {
                console.log("right");
                setPage(page.number+1)
                break;
            }
            case "left" : {
                console.log("left");
                setPage(page.number-1)
                break;
            }
            case "start" : {
                console.log("start")
                setPage(0)
                break;
            }
            case "end" : {
                console.log("end");
                setPage(page.totalPages -1)
                break;
            }
        }
    }
    return ( 
        <div className={clsx(styles.pageable)}>
            <span 
                onClick={() => handleForwardPage("start")}
            >
                {page.number > 0 && "Start"}
            </span>
            
            {
                (page.number + 1 != 1) && <FontAwesomeIcon 
                onClick={() => handleForwardPage("left")} 
                className={clsx(styles.leftPageIcon)} icon="fa-angles-left" 
            />  }              
               {(page.number+1) + "/" + parseInt(page.totalPages)}
            { 
                (page.number+1 < page.totalPages) && <FontAwesomeIcon 
                onClick={() => handleForwardPage("right")} 
                className={clsx(styles.rightPageIcon)} icon="fa-angles-right" 
            />}

            <span 
                onClick={() => handleForwardPage("end")}
            >
                {(page.number !== page.totalPages - 1) && "End"}
             </span>
        </div>
     );
}

export default ForwardPage;
