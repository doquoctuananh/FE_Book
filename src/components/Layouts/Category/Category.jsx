import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MyInput from '../../Input/MyInput';
import clsx from 'clsx';
import styles from "~components/Layouts/Category/Category.module.scss"
import { useState } from 'react';
function Category({
  name,
  list,
  checkValue,
  onChooseChange,
  onChangeValue
}) {

    const handleChangeChecked = (e) => {
      onChooseChange(e.target.name,e.target.value)

      let nameChoose = list.find((cur,index) => {
        return cur.id == parseInt(e.target.value)
      })
      onChangeValue(e.target.name,nameChoose.name)
    }

    return ( <div className={clsx(styles.app)}>
        <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">
              <h3>{name}</h3>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
              <div className= {clsx(styles.accordion)}>
                    <input 
                      name= {name} 
                      type="checkbox"
                      value=""
                      checked = {checkValue == "" ? true : false}
                      onChange={handleChangeChecked}
                    /> 
                    <span>All</span>
                  </div>
              {list.map((cur,index) => {
                return (                 
                  <div key={index} className= {clsx(styles.accordion)}>
                    <input 
                      name= {name} 
                      type="checkbox"
                      value={cur.id}
                      checked = {parseInt(checkValue) == cur.id ? true : false}
                      onChange={handleChangeChecked}
                    /> 
                    <span>{cur.name}</span>
                  </div>
                  
                )
              })}
        </AccordionDetails>
      </Accordion>
      
    </div> );
}

export default Category;