import { useState } from "react"
import Form from "../Forms/Form";
import Button from "./logbooks_components/Button";

function Invoice({title, handleSubmit, handleChange, handleDelete, savedData, setIsPopupOpened, setPopupTitle, setPopupData}) {
  const [showForm, setShowForm] = useState(false)
  const [hiddenRoom, setHiddenRoom] = useState(null)
  const [showNestedInfo, setShowNestedInfo] = useState(false);
  const [showInfo, setShowInfo] = useState(false)


  const handleShowForm = () => {
    setShowForm(!showForm)
  }

  const handleShowInfo = (rd) => {
    // setShowNestedInfo(false)
    // setHiddenRoom(roomID)
    // setShowInfo(true)
    // setTimeout(() => {
    //   setShowNestedInfo(true)
    // }, 700)
    // if (hiddenRoom === roomID) {
    //   setShowInfo(!showInfo)
    // }
    setPopupTitle(title)
    setIsPopupOpened(true)
    setPopupData(rd)
  }

  return(
    <div className="flex flex-col gap-2 w-full">
      <Button type='button' title='Add an Invoice' showForm={handleShowForm}/>      
      {showForm ? (
        <Form onSubmit={handleSubmit} onChange={handleChange} title={title}/>
      //   <form onSubmit={handleSubmit} className='flex flex-col gap-2 h-fit items-center justify-center py-2'>
      //   <input type='text' name='room' placeholder='Room'  className="border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
      //   <input type='text' name='company' placeholder='Company' className="border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
      //   <input type='text' name='vat' placeholder='№ VAT' className="border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
      //   <input type='text' name='details' placeholder='Details' className="border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>        
      //   <input type='text' name='email' placeholder='E-mail' className="border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
      //   <button type="submit" className="border border-border-grey cursor-pointer hover:shadow-1-1-4-inner hover:bg-light-purple w-full">Add</button>
      // </form>
      ) : (
        <div className="flex gap-2 flex-wrap">
          {savedData && (
            savedData.map((invoice) => {
              return (
              <div onClick={() => handleShowInfo(invoice)} className={`${showInfo && hiddenRoom === invoice.room ? 'h-44' : 'h-6'} w-fit items-center justify-center px-2 rounded bg-blue opacity-70 shadow-1-1-4 cursor-pointer transition-height duration-700 overflow-scroll hover:bg-blue-active hover:opacity-100`}>
                  <p className={` pointer-events-none ${showInfo && hiddenRoom === invoice.room ? 'hidden' : 'flex flex-wrap'} items-center`}>
                    {invoice.room}
                  </p>
                {/* {showInfo && hiddenRoom === invoice.room && (
                    <div className={`${showNestedInfo ? 'opacity-100' : 'opacity-0'} flex flex-col transition-opacity`}>
                      <div className='flex gap-2 self-end mt-2' >
                        <div onClick={handleDelete} id={invoice.room}>
                          <img className='w-4 h-4' ></img>
                        </div>
                        <div onClick={handleDelete} id={invoice.room}>
                          <img className='w-4 h-4' ></img>  
                        </div>
                      </div>
                      <p>Room: {invoice.room}</p>
                      <p>Company: {invoice.company}</p>
                      <p>VAT: {invoice.vat}</p>
                      <p>Details: {invoice.details}</p>
                      <p>Email: {invoice.email}</p>
                    </div>
                  )} */}
              </div>
              
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

export default Invoice