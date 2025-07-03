import { useState } from 'react';
import { Link } from 'react-router-dom';
import  styles from '../Header/Header.module.scss'
import clsx from 'clsx';
import assets from '~/assets/index.jsx';

import MyButton from '../../Button/MyButton.jsx';

function Header() {

    const [search,setSearch] = useState("")

    return ( <div className= {clsx(styles.heading)}>
        
        <div className={clsx(styles.heading_content)}>
            <div className={clsx(styles.content_img)}>
                <img className={clsx(styles.img_logo)} src={assets.logo} />
            </div>
            <div className={clsx(styles.content_category)}>
                <ul className={clsx(styles.category_list)}>
                    <Link to = "/" className={clsx(styles.category_item)}>Trang chu</Link>
                    <Link to="/infor" className={clsx(styles.category_item)}>Gioi thieu</Link>
                    <Link to="/news" className={clsx(styles.category_item)}>Tin tuc</Link>
                    <Link to="/contact" className={clsx(styles.category_item)}>Lien he</Link>
                </ul>
            </div>

            <div className={clsx(styles.content_search)}>
                <input 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search' 
                />
                <MyButton 
                    onClick = {(e) => {
                    console.log(search)
                    setSearch('')   
                    
                }
                }
                >
                    Search
                </MyButton>
            </div>

            <div className={clsx(styles.content_footer)}>
                <MyButton primary link to="/register">Đăng kí</MyButton>
                <MyButton primary link to="/login">Đăng nhập</MyButton>
            </div>
            
        </div>
    </div> );
}

export default Header;