import { constants } from "buffer"
import { useEffect, useState } from "react"
import mail from '../../../images/mail.png'
import MainApi from "../../../utils/MainApi"
import Form from "../../Forms/Form"
import FormContacts from "../../Forms/FormContacts"
import Button from "../logbooks_components/Button"
import ContactsContent from "./ContactsContent"
import ContactsFilter from "./ContactsFilter"
import ContactsForm from "./ContactsForm"
import ContactsList from "./ContactsList"

function Contacts({  savedData, setPopupTitle, setIsPopupOpened, setPopupData, title, isDeletedFromPopup, isUpdatedFromPopup}) {
  const [showForm, setShowForm] = useState(false)
  const [currentDepFilter, setCurrentDepFilter] = useState(null)
  const [isFilterButtonActive, setIsFilterButtonActive] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [hiddenInfoId, setHiddenInfoId] = useState(null)

//---------------------
const [contact, setContact] = useState()
const [contactsList, setContactsList] = useState([])

const handleChange = (e) => {
  const {name, value} = e.target
  setContact({...contact, [name]: value})
  console.log(contact)
}

const handleSubmit = (e) => {
  console.log('contact succsesful in alert.js')
  e.preventDefault()
  console.log('43434')
  const { department, firstname, name, middlename, phone, mobile, email } = contact
  MainApi.setContact(department, firstname, name, middlename, phone, mobile, email)
  .then((response) => {
    const newContact = response.data
    setContactsList([...contactsList, newContact])
  })
  setShowForm(!showForm)
}

useEffect(() => {
  const cachedContacts = JSON.parse(localStorage.getItem('contacts'))
  if (cachedContacts) {
    setContactsList(cachedContacts)
  }

  updateContacts()
}, [])

useEffect(() => {
  getDepartments()
}, [contactsList])

const updateContacts = () => {
  MainApi.getContacts()
  .then((contacts) => {
    setContactsList(contacts.data)
    localStorage.setItem('contacts', JSON.stringify(contacts.data))
  })
  .catch((err) => {
    console.log('Error fetching alarms:', err)
  })
}

useEffect(() => {
  updateContacts()
}, [isDeletedFromPopup])

useEffect(() => {
  updateContacts()
}, [isUpdatedFromPopup])
//---------------------


  const handleShowForm = () => {
    setShowForm(!showForm)
  }


  const [departmentsList, setDepartmentsList] = useState([])
  // const [auto, setAuto] = useState(null)

  // useEffect(() => {
  //   getDepartments()
  // },[savedData])

  // const handleAuto = (e) => {
  //   setAuto(e.target.textContent)
  // }

  const getDepartments = () => {
    const newList = []

    if (contactsList) {
      contactsList.map((contact) => {

        if (newList.includes(contact.department.toLowerCase())) {

          return
        } else {

          newList.push(contact.department)
        }
      })
    }
    setDepartmentsList(newList)

  }

  const handleFilterClick = (e) => {
    if (currentDepFilter && currentDepFilter.includes(e.target.textContent)) {
      setCurrentDepFilter(null)
      setIsFilterButtonActive(false)
    } else {
      setCurrentDepFilter([e.target.textContent])
      setIsFilterButtonActive(true)
    }
  }

  const handleShowPopup = (dm) => {
    // setHiddenInfoId(contact.department + contact.name + contact.phone)
    // if (hiddenInfoId === contact.department + contact.name + contact.phone) {
    //   setShowInfo(false)
    //   setHiddenInfoId(null)
    // } else {
    //   setShowInfo(true)
    // }
    setIsPopupOpened(true)
    setPopupData(dm)
    setPopupTitle(title)
  }

  const handleSubmitForm = (event) => {
    handleSubmit(event)
    setShowForm(!showForm)
  }

  return(
    <div className="flex flex-col gap-2 w-full">
      <Button showForm={handleShowForm} title='Add a contact' type='button'/>
      {showForm ? (
        <ContactsForm handleChange={handleChange} handleSubmit={handleSubmit}/>
        // <Form onSubmit={(event) => handleSubmitForm(event)} onChange={handleChange} title={title}/>
        // <form onSubmit={handleSubmit} className='flex flex-col gap-2 h-fit items-center justify-center py-2'>
        //   <input type='text' name='department' placeholder='Department'  className="w-full border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
        //   <input type='text' name='firstname' placeholder='First name' className="w-full border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
        //   <input type='text' name='name' placeholder='Name' className="w-full border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
        //   <input type='text' name='middlename' placeholder='Middle name' className="w-full border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
        //   <input type='text' name='phone' placeholder='Phone' className="w-full border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
        //   <input type='text' name='mobile' placeholder='Mobile phone' className="w-full border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
        //   <input type='text' name='email' placeholder='E-mail' className="w-full border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
        //   <Button type='submit' title='Add'/>
        // </form>
      ) : (
      <div className="flex flex-col">
        <ContactsFilter departmentsList={departmentsList} handleFilterClick={handleFilterClick} currentDepFilter={currentDepFilter}/>
        <ContactsList departmentsList={departmentsList} currentDepFilter={currentDepFilter} contactsList={contactsList} handleShowPopup={handleShowPopup}/> 
        {/* <div className="flex flex-wrap gap-2 justify-center sticky top-0 bg-white pb-2 z-20">
          {departmentsList.length >= 3 ? (
            departmentsList.map((deps) => {
              return (
                <button onClick={handleFilterClick} className={`${currentDepFilter && currentDepFilter.includes(deps) ? 'bg-dark-blue text-textcolor hover:text-black' : 'bg-blue'} text-xs px-1 uppercase hover:bg-blue-active`}>{deps}</button>
              )
            })
          ) : (null)}
        </div> */}

        {/* {departmentsList ? (
          (currentDepFilter ? currentDepFilter : departmentsList).map((department) => {
            return (
              <div>
                <div className="flex items-center gap-1 w-4/5 m-auto opacity-40 z-10">
                  <p className="bg-black h-0.5 grow"></p>
                  <p className="uppercase">{department}</p>
                  <p className="bg-black h-0.5 grow"></p>
                </div>
                {contactsList ? (
                  contactsList.map((contact) => {
                    if (contact.department.toLowerCase() === department.toLowerCase()) {
                      return (
                        <ContactsContent element={contact} handleShowPopup={handleShowPopup}/>
                        // <div className="border-2 border-red-300 flex gap-2 items-center cursor-pointer transition px-1"  >
                          // <div className="w-full flex flex-wrap gap-1 justify-between items-center hover:bg-blue-active transition pl-2 pr-1" onClick={() => handleShowInfo(contact)}>
                          //   <p className="capitalize pointer-events-none">{`${contact.firstname} ${contact.name[0]}.`}</p>
                          //   <p className=" pointer-events-none">{contact.phone}</p>
                          //   <a href={`mailto:${contact.email}`} className=''> 
                          //     <img src={mail} className=""></img>
                          //   </a>
                          // </div>
                    
                        // </div>
                      )
                      
                    }
                  })
                ) : (null)}
              </div>
            )
          })
        ) : (null)} */}
      </div>
      )}
    </div>

  )
}

export default Contacts