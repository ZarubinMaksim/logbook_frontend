import PopupContact from "./PopupContact";
import PopupInvoice from "./PopupInvoice";
import PopupTaxi from "./PopupTaxi";
import closeButton from '../../images/close.png'
import editButton from '../../images/edit.png'
import deleteButton from '../../images/delete-32.png'
import { useEffect, useState } from "react";
import PopupAlert from "./PopupAlert";
import MainApi from "../../utils/MainApi";
import PopupAlarm from "./PopupAlarm";
import PopupUmbrella from "./PopupUmbrella";

function Popup({isPopupOpened, popupTitle, setIsPopupOpened, popupData, setDeletedFromPopupData, isDeletedFromPopup, setIsDeletedFromPopup, isUpdatedFromPopup, setIsUpdatedFromPopup}) {
  const popups = {
    taxi: PopupTaxi,
    invoice: PopupInvoice,
    contacts: PopupContact,
    alert: PopupAlert,
    alarm: PopupAlarm,
    umbrella: PopupUmbrella 
  }
  const CurrentPopup = popups[popupTitle]
  const [isVisible, setIsVisible] = useState('opacity-0')
  const [isDeleteClicked, setIsDeleteClicked] = useState(false)
  const [isUpdateClicked, setIsUpdateClicked] = useState(false)

  
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
 
  // const deleteFromPopup = () => {
  //   setDeletedFromPopupData(popupData)
  //   handleClosePopup()
  // }

  // const handleDelete = () => {
  //   console.log(popupTitle)
  //   if (popupTitle === 'contacts') {
  //     MainApi.deleteContact(popupData._id)
  //     .then((response) => {
  //       if (response) {
  //         setIsDeletedFromPopup(!isDeletedFromPopup)
  //         handleClosePopup()
  //       }
  //     })
  //   } 
  //   if (popupTitle === 'invoice') {
  //     MainApi.deleteInvoice(popupData._id)
  //     .then((response) => {
  //       if (response) {
  //         setIsDeletedFromPopup(!isDeletedFromPopup)
  //         handleClosePopup()
  //       }
  //     })
  //   }
  //   if (popupTitle === 'taxi') {
  //     MainApi.deleteTaxi(popupData._id)
  //     .then((response) => {
  //       if (response) {
  //         setIsDeletedFromPopup(!isDeletedFromPopup)
  //         handleClosePopup()
  //       }
  //     })
  //   }
  //   if (popupTitle === 'alert') {
  //     MainApi.deleteAlert(popupData._id)
  //     .then((response) => {
  //       if (response) {
  //         setIsDeletedFromPopup(!isDeletedFromPopup)
  //         handleClosePopup()
  //       }
  //     })
  //   }
  // }

  const handleDelete = () => {
    setIsDeleteClicked(true)
  }

  const handleUpdate = () => {
    setIsUpdateClicked(!isUpdateClicked)
  }


  

  return (
    <div className={`${isVisible} w-screen h-screen absolute top-0 flex items-center justify-center transition-all duration-300`}>
      <div className="absolute inset-0 bg-black opacity-60"></div> 
      <div className="w-fit h-fit max-w-96 max-h-96 flex flex-col bg-blue rounded shadow-popup relative p-5 gap-2">
        <div className="flex gap-2 self-end">
          <img className={`w-4 h-4 cursor-pointer opacity-40 hover:opacity-100 transition-opacity`} src={editButton} onClick={handleUpdate}/>
          <img className={`w-4 h-4 cursor-pointer opacity-40 hover:opacity-100 transition-opacity`} src={deleteButton} onClick={handleDelete}/>
          <img className={`w-4 h-4 cursor-pointer opacity-40 hover:opacity-100 transition-opacity`} src={closeButton} onClick={handleClosePopup}/>
        </div>
        <CurrentPopup 
          data={popupData} 
          isDeleteClicked={isDeleteClicked} 
          setIsDeletedFromPopup={setIsDeletedFromPopup} 
          isDeletedFromPopup={isDeletedFromPopup} 
          handleClosePopup={handleClosePopup}
          setIsUpdateClicked={setIsUpdateClicked}
          isUpdateClicked={isUpdateClicked}
          setIsUpdatedFromPopup={setIsUpdatedFromPopup}
          isUpdatedFromPopup={isUpdatedFromPopup}/>
      </div>
    </div>
  )
}
export default Popup;
