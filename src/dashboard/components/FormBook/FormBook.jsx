import clsx from "clsx"
import MyForm from "../../components/Form/MyForm.jsx";
import MyButton from "~components/Button/MyButton.jsx"
import MyInput from "~components/Input/MyInput.jsx"


function FormBook({
        show,
        handleCloseForm,
        importBook,
        errors,
        typeBook,
        handChangeInput,
        children
    
    }) {
    return ( 
        <>
            {show && <MyForm closeForm={handleCloseForm}>
                    {                      
                    Object.keys(importBook).map((cur,index) => {
                        const props = {}
                        if(cur === "Import_Price" || cur === "Quantity" || cur ==="Selling_Price"){
                            props.type ="number"
                        }
                        if(cur === "Type_Book" || cur === "Language"){
                            props.type= "select"
                            cur === "Type_Book" ? props.select_value = typeBook.map((typeBook,index) => {
                                return {
                                    value:typeBook.id,
                                    name:typeBook.typeName
                                }
                            }) : props.select_value = [{value:"Vietnam",name:"Vietnam"},
                            {value:"English",name:"English"}]
                        }                      
                        if(cur === "Description"){
                            props.type = "textarea"
                        }
                        if(cur === "Image"){
                            props.type = "File"
                        }
                                             
                        return (
                            <div key={index}>
                                <MyInput 
                                name = {cur}
                                {...props}
                                value = { cur !== "Image" ? importBook[cur] : undefined}
                                onChange = {handChangeInput} />
                                <span>{errors[cur]}</span>
                            </div>
                        )
                    })}
                    <span>{errors.response_error}</span>
                   
                   {children}
                </MyForm> }
        </>
    )
}

export default FormBook;