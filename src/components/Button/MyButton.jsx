import styles from'~components/Button/MyButton.module.scss'
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';
function MyButton ({link =false,
    to =false,
    primary =false,
    onClick = false,
    disable = false,
    children}){
    let Comp = 'button';
    const props= {};

    if(to){
        props.to= to;
    }
    if(onClick && !disable){
        props.onClick = onClick;  
        props.disable = false      
    }else {
        props.disable= true
    }
    

    if(link){
        Comp = Link;
    }
    
    let cx = clsx(
        styles.button,
        {[styles.primary]: primary},
        {[styles.disable] :disable}
    )
    

    return(
        <Comp {...props} className = {cx} >
            {children}
        </Comp>
    )
}

export default MyButton