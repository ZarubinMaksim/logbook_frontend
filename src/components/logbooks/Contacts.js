import { constants } from "buffer"
import { useEffect, useState } from "react"
import mail from '../../images/mail.png'

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
      <button type="button" onClick={handleShowForm} className="border border-border-grey cursor-pointer hover:shadow-1-1-4-inner hover:bg-light-purple w-full">Add a Contact</button>      
      {showForm ? (
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 h-fit items-center justify-center py-2'>
          <input type='text' name='department' placeholder='Department'  className="border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
          <input type='text' name='firstname' placeholder='First name' className="border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
          <input type='text' name='name' placeholder='Name' className="border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
          <input type='text' name='middlename' placeholder='Middle name' className="border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
          <input type='text' name='phone' placeholder='Phone' className="border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
          <input type='text' name='mobile' placeholder='Mobile phone' className="border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
          <input type='text' name='email' placeholder='E-mail' className="border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
          <button type="submit" className="border border-border-grey cursor-pointer hover:shadow-1-1-4-inner hover:bg-light-purple w-full">Add</button>
        </form>
      ) : (
      <div className="flex flex-col gap-1">

        <div className="flex flex-wrap gap-2 justify-center sticky top-0 bg-white">
          {departmentsList ? (
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
                <div className="flex items-center gap-1 w-4/5 m-auto">
                  <p className="bg-black h-0.5 grow"></p>
                  <p className="uppercase">{department}</p>
                  <p className="bg-black h-0.5 grow"></p>
                </div>
                {savedData ? (
                  savedData.map((contact) => {
                    if (contact.department.toLowerCase() === department.toLowerCase()) {
                      return (
                        <div className="flex gap-2 items-center cursor-pointer hover:bg-light-grey" onClick={() => handleShowInfo(contact)} >
                          {showInfo && contact.department + contact.name + contact.phone === hiddenInfoId ? (
                            <div className="flex flex-col bg-light-grey w-full text-s px-2">
                              <p className="capitalize">Dep: {contact.department}</p>
                              <p className="capitalize">First name: {contact.firstname}</p>
                              <p className="capitalize">Name: {contact.name}</p>
                              <p className="capitalize">Middle name: {contact.middlename}</p>
                              <p className="capitalize">Phone: {contact.phone}</p>
                              <p className="capitalize">Mobile: {contact.mobile}</p>
                              <p className="capitalize">E-mail: {contact.email}</p>
                            </div>
                          ) : (
                          <>
                            <p className="w-1/2 capitalize pointer-events-none">{`${contact.firstname} ${contact.name[0]}.`}</p>
                            <p className="w-1/2 pointer-events-none">{contact.phone}</p>
                            <a href={`mailto:${contact.email}`} className=''> 
                              <img src={mail} className=""></img>
                            </a>
                          </>
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