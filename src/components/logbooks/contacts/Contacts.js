import { useEffect, useState } from "react"
import MainApi from "../../../utils/MainApi"
import Button from "../logbooks_components/Button"
import ContactsFilter from "./ContactsFilter"
import ContactsForm from "./ContactsForm"
import ContactsList from "./ContactsList"

function Contacts({ 
  handleChange, 
  handleShowPopup,  
  isDeletedFromPopup, 
  isUpdatedFromPopup
}) {

  const [showForm, setShowForm] = useState(false)
  const [currentDepFilter, setCurrentDepFilter] = useState(null)
  const [contact, setContact] = useState()
  const [contactsList, setContactsList] = useState([])
  const [showOptions, setShowOptions] = useState(false)
  const [elementId, setElementId] = useState(null)
  const [departmentsList, setDepartmentsList] = useState([])


// ------------*** START Component Content updaters ***------------
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

  useEffect(() => {
    updateContacts()
  }, [isDeletedFromPopup])

  useEffect(() => {
    updateContacts()
  }, [isUpdatedFromPopup])
// ------------*** END Component Content updaters ***------------

// ------------*** START Component API's ***------------
  const handleSubmit = (e) => {
    e.preventDefault()
    const { department, firstname, name, middlename, phone, mobile, email } = contact
    MainApi.setContact(department, firstname, name, middlename, phone, mobile, email)
    .then((response) => {
      const newContact = response.data
      setContactsList([...contactsList, newContact])
    })
    setShowForm(!showForm)
  }

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
// ------------*** END Component API's ***------------

// ------------*** OTHER ***------------
  const handleShowForm = () => {
    setShowForm(!showForm)
  }

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
    } else {
      setCurrentDepFilter([e.target.textContent])
    }
  }

  return(
    <div className="flex flex-col gap-2 w-full">
      <Button showForm={handleShowForm} title='Add a contact' type='button'/>
      {showForm ? (
        <ContactsForm elementList={setContact} element={contact} handleChange={handleChange} handleSubmit={handleSubmit}/>
      ) : (
      <div className="flex flex-col">
        <ContactsFilter departmentsList={departmentsList} handleFilterClick={handleFilterClick} currentDepFilter={currentDepFilter}/>
        <ContactsList departmentsList={departmentsList} currentDepFilter={currentDepFilter} contactsList={contactsList} handleShowPopup={handleShowPopup}/> 
      </div>
      )}
    </div>

  )
}

export default Contacts