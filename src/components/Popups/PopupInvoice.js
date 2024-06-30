import { useEffect } from "react"
import MainApi from "../../utils/MainApi"

function PopupInvoice({data, isDeleteClicked, setIsDeletedFromPopup, isDeletedFromPopup, handleClosePopup}) {
  
  useEffect(() => {
    if (isDeleteClicked) {
      MainApi.deleteInvoice(data._id)
      .then((response) => {
        if (response) {
          setIsDeletedFromPopup(!isDeletedFromPopup)
          handleClosePopup()
        }
      })
    }
  }, [isDeleteClicked])

 return (
  <div className="font-mainfont text-lg">
    <p>Room: {data.room}</p>
    <p>Company: {data.company}</p>
    <p>VAT: {data.vat}</p>
    <p>Details: {data.details}</p>
    <p>Email: {data.email}</p>
   </div>
   )
 }
 export default PopupInvoice;
 