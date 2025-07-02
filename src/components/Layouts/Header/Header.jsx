import  styles from '../Header/Header.module.scss'
import clsx from 'clsx';
import assets from '~/assets/index.jsx'
function Header() {
    return ( <div className= {clsx(styles.heading)}>
        
        <div className={clsx(styles.heading_content)}>
            <div className={clsx(styles.content_img)}>
                <img className={clsx(styles.img_logo)} src={assets.logo} />
            </div>
            <div className={clsx(styles.content_category)}>
                <ul className={clsx(styles.category_list)}>
                    <li className={clsx(styles.category_item)}>Trang chu</li>
                    <li className={clsx(styles.category_item)}>Gioi thieu</li>
                    <li className={clsx(styles.category_item)}>Tin tuc</li>
                    <li className={clsx(styles.category_item)}>Lien he</li>
                </ul>
            </div>

            <div className={clsx(styles.content_search)}>

            </div>

            <div className={clsx(styles.content_footer)}>
                <button>Đăng kí</button>
                <button>Đăng nhập</button>
            </div>
            

        </div>
    </div> );
}

export default Header;