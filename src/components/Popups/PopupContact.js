import { useEffect, useState } from "react"
import MainApi from "../../utils/MainApi"
import phoneIcon from '../../images/phone.png'
import departmentIcon from '../../images/department.png'
import idIcon from '../../images/id.png'
import emailIco from '../../images/mail.png'
import InfoBlock from "./InfoBlock"

function PopupContact({data, isDeleteClicked, isUpdatedFromPopup, setIsUpdatedFromPopup, setIsDeletedFromPopup, isDeletedFromPopup, handleClosePopup, isUpdateClicked, setIsUpdateClicked}) {

  const [contact, setContact] = useState({
    department: data.department,
    firstname: data.firstname,
    name: data.name,
    middlename: data.middlename,
    phone: data.phone,
    mobile: data.mobile,
    email: data.email
  })

  const [isUpdateSaved, setIsUpdateSaved] = useState(false)

  const savedContactName = [contact.firstname, contact.middlename, contact.name ]
  const uploadedContactName = [data.firstname, data.middlename, data.name ]

  const savedContacts = [contact.phone, contact.mobile, contact.email]
  const uploadedContacts =[data.phone, data.mobile, data.email]


  useEffect(() => {
    if (isDeleteClicked) {
      MainApi.deleteContact(data._id)
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
    setContact({...contact, [name]: value})
  }

  const handleSaveUpdate = (e) => {
    e.preventDefault()
    const { department, firstname, name, middlename, phone, mobile, email } = contact
    MainApi.updateContact(data._id, department, firstname, name, middlename, phone, mobile, email)
    .then(() => {
      setIsUpdatedFromPopup(!isUpdatedFromPopup)
      setIsUpdateSaved(true)
      setIsUpdateClicked(!isUpdateClicked)
    })
  }
  
 return (
  <div className="font-mainfont text-lg">
    {isUpdateClicked ? (
        <form className='flex flex-col' onSubmit={handleSaveUpdate}>
          <label for='department' className="text-black text-sm mt-2">New department</label>
          <input value={contact.department} onChange={handleChange} className="border text-xs border-border-grey w-1/3 h-7 px-1" name="department" placeholder="Department" onInput={handleChange} maxLength='6' required></input>
          <label for='firstname' className="text-black text-sm mt-2">New First Name</label>
          <input value={contact.firstname} onChange={handleChange} className="border text-xs border-border-grey w-1/3 h-7 px-1" name="firstname" placeholder="First name" onInput={handleChange} maxLength='6'></input>
          <label for='name' className="text-black text-sm mt-2">New Name</label>
          <input value={contact.name} onChange={handleChange} className="border text-xs border-border-grey w-1/3 h-7 px-1" name="name" placeholder="Name" onInput={handleChange} maxLength='6'></input>
          <label for='middlename' className="text-black text-sm mt-2">New Middle Name</label>
          <input value={contact.middlename} onChange={handleChange} className="border text-xs border-border-grey w-1/3 h-7 px-1" name="middlename" placeholder="Middle name" onInput={handleChange} maxLength='6'></input>
          <label for='phone' className="text-black text-sm mt-2">New phone</label>
          <input value={contact.phone} onChange={handleChange} className="border text-xs border-border-grey w-1/3 h-7 px-1" name="phone" placeholder="Phone" onInput={handleChange} maxLength='6'></input>
          <label for='mobile' className="text-black text-sm mt-2">New mobile phone</label>
          <input value={contact.mobile} onChange={handleChange} className="border text-xs border-border-grey w-1/3 h-7 px-1" name="mobile" placeholder="Mobile phone" onInput={handleChange} maxLength='6'></input>
          <label for='email' className="text-black text-sm mt-2">New email</label>
          <input value={contact.email} onChange={handleChange} className="border text-xs border-border-grey w-1/3 h-7 px-1" name="email" placeholder="Email" onInput={handleChange} maxLength='6'></input>
        <button type='submit'>Save</button>
      </form>
      ) : (
        <div className="flex flex-col gap-2 max-w-96">

        <div className="flex gap-2">
          <InfoBlock 
            icon={departmentIcon} 
            title={'Department'} 
            isUpdateSaved={isUpdateSaved} 
            savedValue={[contact.department]} 
            uploadedValue={[data.department]}/>
          <InfoBlock 
            icon={idIcon} 
            title={'Name'} 
            isUpdateSaved={isUpdateSaved} 
            savedValue={savedContactName} 
            uploadedValue={uploadedContactName}/>
        </div>
          <InfoBlock 
            icon={phoneIcon} 
            title={'Contacts'} 
            isUpdateSaved={isUpdateSaved} 
            savedValue={savedContacts} 
            uploadedValue={uploadedContacts}/>
        </div>
    )}


  </div>
   )
 }
 export default PopupContact;
 