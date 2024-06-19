import PopupContact from "./PopupContact";
import PopupInvoice from "./PopupInvoice";
import PopupTaxi from "./PopupTaxi";
import closeButton from '../../images/close.png'
import editButton from '../../images/edit.png'
import deleteButton from '../../images/delete-32.png'
import { useEffect, useState } from "react";
import PopupAlert from "./PopupAlert";

function Popup({isPopupOpened, popupTitle, setIsPopupOpened, popupData, setDeletedFromPopupData}) {
  const popups = {
    taxi: PopupTaxi,
    invoice: PopupInvoice,
    contacts: PopupContact,
    alert: PopupAlert
  }
  const CurrentPopup = popups[popupTitle]
  const [isVisible, setIsVisible] = useState('opacity-0')
  
  const handleClosePopup = () => {
    if (isVisible === 'opacity-100') {
      setIsVisible('opacity-0')
    } 
    setTimeout(() => {
      setIsPopupOpened(false)
    }, 200)  
  } 



  const handleVisible = () => {
        if (isVisible === 'opacity-100') {
        setIsVisible('opacity-0')
      } else (
        setIsVisible('opacity-100')
      )
  }

  useEffect(() => {
    handleVisible()
  },[isPopupOpened]) 
 
  const deleteFromPopup = () => {
    setDeletedFromPopupData(popupData)
    handleClosePopup()
  }

  return (
    <div className={`${isVisible} w-screen h-screen absolute top-0 flex items-center justify-center transition-all duration-300`}>
      <div className="absolute inset-0 bg-black opacity-60"></div> 
      <div className="w-1/3 h-fit flex flex-col bg-blue rounded-xl shadow-popup relative p-5">
        <div className="flex gap-2 self-end">
          <img className={`w-5 h-5 cursor-pointer opacity-40 hover:opacity-100 transition-opacity`} src={editButton}/>
          <img className={`w-5 h-5 cursor-pointer opacity-40 hover:opacity-100 transition-opacity`} src={deleteButton} onClick={deleteFromPopup}/>
          <img className={`w-5 h-5 cursor-pointer opacity-40 hover:opacity-100 transition-opacity`} src={closeButton} onClick={handleClosePopup}/>
        </div>
        <CurrentPopup data={popupData}/>
      </div>
    </div>
  )
}
export default Popup;
