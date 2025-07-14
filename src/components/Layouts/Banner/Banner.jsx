import assets from "../../../assets/img";
import Slider from "react-slick"
import styles from "../Banner/Banner.module.scss"
import clsx from "clsx";

function Banner({
        banner = false,
        type = false
}) {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 5000,
        autoplaySpeed: 3000,
        cssEase: "linear"
      };
      let props = {}
      let Comp = 'div';
      if(type == "img"){
        Comp = "img"
        
      }
    return ( <>
        <Slider {...settings} className={clsx(styles.slider)}>
            
            {banner !== false && banner.map((cur,index) => {
                return (
                   <div key={index}>
                        {type == "img" ? <Comp src={cur} alt="" />
                         : <Comp>Banner</Comp>}
                    </div> 
                )
            })}              
        </Slider>
    </> );
}

export default Banner;