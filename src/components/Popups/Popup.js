import PopupContact from "./PopupContact";
import PopupInvoice from "./PopupInvoice";
import PopupTaxi from "./PopupTaxi";
import closeButton from '../../images/close.png'
import { useEffect, useState } from "react";

function Popup({isPopupOpened, popupTitle, setIsPopupOpened, popupData}) {

// const [isCloseClicked,setIsCloseClicked] = useState(false)

const handleClosePopup = () => {
  // setIsCloseClicked(true)

  if (isVisible === 'opacity-100') {
    setIsVisible('opacity-0')
  } 

  setTimeout(() => {
    setIsPopupOpened(false)
  }, 200)
  
  
} 

const popups = {
  taxi: PopupTaxi,
  invoice: PopupInvoice,
  contacts: PopupContact
}

const CurrentPopup = popups[popupTitle]

const [isVisible, setIsVisible] = useState('opacity-0')

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
 
return (
<div className={`${isVisible} w-screen h-screen absolute top-0 flex items-center justify-center transition-all duration-300`}>
  <div className="absolute inset-0 bg-black opacity-40"></div> 
    <div className="w-1/3 h-fit flex flex-col bg-blue rounded-3xl shadow-popup relative p-5">
      <img className={`w-5 h-5 self-end cursor-pointer`} src={closeButton} onClick={handleClosePopup}/>
      <CurrentPopup data={popupData}/>
    </div>
  </div>
  )
}
export default Popup;
