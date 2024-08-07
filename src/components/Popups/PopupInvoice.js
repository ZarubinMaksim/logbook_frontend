import { useEffect, useState } from "react"
import MainApi from "../../utils/MainApi"
import homeIcon from '../../images/home.png'
import idIcon from '../../images/id.png'
import vatIcon from '../../images/vat.png'
import detaisIcon from '../../images/details.png'
import emailIcon from '../../images/mail.png'
import InfoBlock from "./InfoBlock"


function PopupInvoice({data, isDeleteClicked, isUpdatedFromPopup, setIsDeletedFromPopup, isDeletedFromPopup, handleClosePopup, setIsUpdateClicked, isUpdateClicked, setIsUpdatedFromPopup}) {
  
  const [invoice, setInvoice] = useState({
    room: data.room,
    company: data.company,
    vat: data.vat,
    details: data.details,
    email: data.email
  })
  const [isUpdateSaved, setIsUpdateSaved] = useState(false)

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

  const handleChange = (e) => {
    const {name, value} = e.target
    setInvoice({...invoice, [name]: value})
  }

  const handleSaveUpdate = (e) => {
    e.preventDefault()
    const { room, company, vat, details, email } = invoice
    MainApi.updateInvoice(data._id, room, company, vat, details, email)
    .then(() => {
      setIsUpdatedFromPopup(!isUpdatedFromPopup)
      setIsUpdateSaved(true)
      setIsUpdateClicked(!isUpdateClicked)
    })
  }

 return (
  <div className="font-mainfont text-lg overflow-scroll">
    {isUpdateClicked ? (
          <form className='flex flex-col' onSubmit={handleSaveUpdate}>
            <label for='room' className="text-black text-sm mt-2">New room</label>
            <input value={invoice.room} onChange={handleChange} className="border text-xs border-border-grey w-1/3 h-7 px-1" name="room" placeholder="Room" onInput={handleChange} maxLength='6' required></input>
            <label for='company' className="text-black text-sm mt-2">New company</label>
            <input value={invoice.company} onChange={handleChange} className="border text-xs border-border-grey w-1/3 h-7 px-1" name="company" placeholder="Company" onInput={handleChange} maxLength='6'></input>
            <label for='vat' className="text-black text-sm mt-2">New VAT</label>
            <input value={invoice.vat} onChange={handleChange} className="border text-xs border-border-grey w-1/3 h-7 px-1" name="vat" placeholder="VAT" onInput={handleChange} maxLength='6'></input>
            <label for='details' className="text-black text-sm mt-2">New details</label>
            <input value={invoice.details} onChange={handleChange} className="border text-xs border-border-grey w-1/3 h-7 px-1" name="details" placeholder="Details" onInput={handleChange} maxLength='6'></input>
            <label for='email' className="text-black text-sm mt-2">New email</label>
            <input value={invoice.email} onChange={handleChange} className="border text-xs border-border-grey w-1/3 h-7 px-1" name="email" placeholder="Email" onInput={handleChange} maxLength='6'></input>
            <button type='submit'>Save</button>
          </form>
    ) : (
      <div className="flex flex-col gap-2 max-w-96">
        <div className="flex gap-2">
          <InfoBlock 
            icon={homeIcon} 
            title={'Room'} 
            isUpdateSaved={isUpdateSaved} 
            savedValue={[invoice.room]} 
            uploadedValue={[data.room]}/>
          <InfoBlock 
            icon={idIcon} 
            title={'Company'} 
            isUpdateSaved={isUpdateSaved} 
            savedValue={[invoice.company]} 
            uploadedValue={[data.company]}/>
        </div>

        <div className="flex gap-2" > 
        <InfoBlock 
          icon={vatIcon} 
          title={'VAT'} 
          isUpdateSaved={isUpdateSaved} 
          savedValue={[invoice.vat]} 
          uploadedValue={[data.vat]}/>
        <InfoBlock 
          icon={emailIcon} 
          title={'Email'} 
          isUpdateSaved={isUpdateSaved} 
          savedValue={[invoice.email]} 
          uploadedValue={[data.email]}/>
      </div>
        <InfoBlock 
          icon={detaisIcon} 
          title={'Details'} 
          isUpdateSaved={isUpdateSaved} 
          savedValue={[invoice.details]} 
          uploadedValue={[data.details]}/>
      </div>
    )}

   </div>
   )
 }
 export default PopupInvoice;
 