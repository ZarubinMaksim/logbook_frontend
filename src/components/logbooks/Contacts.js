import { constants } from "buffer"
import { useEffect, useState } from "react"
import mail from '../../images/mail.png'
import Button from "./logbooks_components/Button"

function Contacts({ handleChange, handleSubmit, savedData}) {
  const [showForm, setShowForm] = useState(false)
  const [currentDepFilter, setCurrentDepFilter] = useState(null)
  const [isFilterButtonActive, setIsFilterButtonActive] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [hiddenInfoId, setHiddenInfoId] = useState(null)

  const handleShowForm = () => {
    setShowForm(!showForm)
  }


  const [departmentsList, setDepartmentsList] = useState([])
  // const [auto, setAuto] = useState(null)

  useEffect(() => {
    getDepartments()
  },[savedData])

  // const handleAuto = (e) => {
  //   setAuto(e.target.textContent)
  // }

  const getDepartments = () => {
    const newList = []
    if (savedData) {
      savedData.map((contact) => {
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

  const handleShowInfo = (contact) => {
    setHiddenInfoId(contact.department + contact.name + contact.phone)
    if (hiddenInfoId === contact.department + contact.name + contact.phone) {
      setShowInfo(false)
      setHiddenInfoId(null)
    } else {
      setShowInfo(true)
    }
    
  }

  return(
    <div className="flex flex-col gap-2 w-full">
      <Button showForm={handleShowForm} title='Add a contact' type='button'/>
      {showForm ? (
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 h-fit items-center justify-center py-2'>
          <input type='text' name='department' placeholder='Department'  className="w-full border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
          <input type='text' name='firstname' placeholder='First name' className="w-full border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
          <input type='text' name='name' placeholder='Name' className="w-full border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
          <input type='text' name='middlename' placeholder='Middle name' className="w-full border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
          <input type='text' name='phone' placeholder='Phone' className="w-full border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
          <input type='text' name='mobile' placeholder='Mobile phone' className="w-full border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
          <input type='text' name='email' placeholder='E-mail' className="w-full border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
          <Button type='submit' title='Add'/>
        </form>
      ) : (
      <div className="flex flex-col">

        <div className="flex flex-wrap gap-2 justify-center sticky top-0 bg-white pb-2">
          {departmentsList.length >= 3 ? (
            departmentsList.map((deps) => {
              return (
                <button onClick={handleFilterClick} className={`${currentDepFilter && currentDepFilter.includes(deps) ? 'bg-light-purple' : 'bg-light-grey'} text-xs px-1 uppercase hover:bg-grey`}>{deps}</button>
              )
            })
          ) : (null)}
        </div>

        {departmentsList ? (
          (currentDepFilter ? currentDepFilter : departmentsList).map((department) => {
            return (
              <div>
                <div className="flex items-center gap-1 w-4/5 m-auto opacity-30">
                  <p className="bg-black h-0.5 grow"></p>
                  <p className="uppercase">{department}</p>
                  <p className="bg-black h-0.5 grow"></p>
                </div>
                {savedData ? (
                  savedData.map((contact) => {
                    if (contact.department.toLowerCase() === department.toLowerCase()) {
                      return (
                        <div className="flex gap-2 items-center cursor-pointer hover:bg-blue transition px-1" onClick={() => handleShowInfo(contact)} >
                          {showInfo && contact.department + contact.name + contact.phone === hiddenInfoId ? (
                            <div className="flex flex-col bg-blue w-full text-s px-2">
                              <p className="capitalize">Dep: {contact.department}</p>
                              <p className="capitalize">First name: {contact.firstname}</p>
                              <p className="capitalize">Name: {contact.name}</p>
                              <p className="capitalize">Middle name: {contact.middlename}</p>
                              <p className="capitalize">Phone: {contact.phone}</p>
                              <p className="capitalize">Mobile: {contact.mobile}</p>
                              <p className="capitalize">E-mail: {contact.email}</p>
                            </div>
                          ) : (
                          <div className="w-full flex justify-between items-center">
                            <p className=" capitalize pointer-events-none">{`${contact.firstname} ${contact.name[0]}.`}</p>
                            <p className=" pointer-events-none">{contact.phone}</p>
                            <a href={`mailto:${contact.email}`} className=''> 
                              <img src={mail} className=""></img>
                            </a>
                          </div>
                          )}
                          

                        </div>
                      )
                      
                    }
                  })
                ) : (null)}
              </div>
            )
          })
        ) : (null)}
      </div>
      )}
    </div>

  )
}

export default Contacts