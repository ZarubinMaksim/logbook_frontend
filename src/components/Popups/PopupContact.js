import { useEffect, useState } from "react"
import MainApi from "../../utils/MainApi"

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
      <>
      <p className="capitalize">Dep: {isUpdateSaved ? contact.department : data.department}</p>
      <p className="capitalize">First name: {isUpdateSaved ? contact.firstname : data.firstname}</p>
      <p className="capitalize">Name: {isUpdateSaved ? contact.name : data.name}</p>
      <p className="capitalize">Middle name: {isUpdateSaved ? contact.middlename : data.middlename}</p>
      <p className="capitalize">Phone: {isUpdateSaved ? contact.phone : data.phone}</p>
      <p className="capitalize">Mobile: {isUpdateSaved ? contact.mobile : data.mobile}</p>
      <p className="capitalize">E-mail: {isUpdateSaved ? contact.email : data.email}</p>
      </>
    )}


  </div>
   )
 }
 export default PopupContact;
 