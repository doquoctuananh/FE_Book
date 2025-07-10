import styles from "~dashboard/components/Form/MyForm.module.scss"
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function MyForm({
    closeForm=false,
    onSubmit,
    children,
    ...collectProps}) {

    const props = {
        onSubmit
    };

    

    return ( 
        <div className={clsx(styles.app)}>
            <div className={clsx(styles.form)} >
                <div className={clsx(styles.close)}>
                    <FontAwesomeIcon onClick={closeForm} className={clsx(styles.close_icon)} icon="fa-xmark" />
                </div>
                <div className={clsx(styles.form_content)}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default MyForm;