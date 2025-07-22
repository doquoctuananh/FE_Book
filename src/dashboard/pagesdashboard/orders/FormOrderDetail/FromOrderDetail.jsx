import clsx from "clsx";
import styles from "~dashboard/pagesdashboard/orders/FormOrderDetail/FormOrderDetail.module.scss"
import MyForm from "../../../components/Form/MyForm";
import MyInput from "../../../../components/Input/MyInput";
import DisplayPrice from "~components/DisplayPrice/DisplayPrice.jsx"
function FormOrderDetail({
    showOrderDetail,
    closeForm,
    orderDetail
}) 
{
    return (
        showOrderDetail && <MyForm closeForm = {closeForm}>
            {
                orderDetail.listOrderDetails.map((detail,index) => {
                    return <div className={clsx(styles.infor_detail)}>
                        <h3>Book Name: {detail.book.bookName}</h3>
                        <span>Quantity: {detail.quantity}</span>
                        <span>Price: <DisplayPrice price ={detail.price} /></span>
                        <span>Total Price Book  {detail.book.bookName} :  <DisplayPrice price ={detail.price * detail.quantity} />
                        </span>
                    </div>
                })
            }
        </MyForm>
    );
}

export default FormOrderDetail;