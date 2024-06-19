import { useState } from "react"
import Form from "../Forms/Form";
import homeIcon from '../../images/home.png'
import Button from "./logbooks_components/Button";
import UndoButton from "./logbooks_components/UndoButton";

function Invoice({title, handleSubmit, handleChange, handleDelete, savedData, setIsPopupOpened, setPopupTitle, setPopupData, handleUnDo, isDeleted, isDeletedFromPopup}) {
  const [showForm, setShowForm] = useState(false)
  const [hiddenRoom, setHiddenRoom] = useState(null)
  const [showNestedInfo, setShowNestedInfo] = useState(false);
  const [showInfo, setShowInfo] = useState(false)


  const handleShowForm = () => {
    setShowForm(!showForm)
  }

  const handleShowInfo = (rd) => {
    setPopupTitle(title)
    setIsPopupOpened(true)
    setPopupData(rd)
  }

  const handleSubmitForm = (event) => {
    handleSubmit(event)
    setShowForm(!showForm)
  }

  return(
    <div className="flex flex-col gap-2 w-full">
      <Button type='button' title='Add an Invoice' showForm={handleShowForm}/>      
      {showForm ? (
        <Form onSubmit={(event) => handleSubmitForm(event)} onChange={handleChange} title={title}/>
      ) : (
        <div className="flex flex-wrap justify-center items-center gap-2 p-2">
          {savedData && (
            savedData.map((invoice) => {
              return (
              <div onClick={() => handleShowInfo(invoice)} className={`h-7 flex w-fit items-center justify-center px-2 rounded bg-blue opacity-70 shadow-1-1-4 cursor-pointer transition-height duration-700 overflow-scroll hover:bg-blue-active hover:opacity-100`}>
                <div className="flex gap-1">
                  <img src={homeIcon} className='w-4 h-4 mt-0.5'></img>
                  <p className={` pointer-events-none ${showInfo && hiddenRoom === invoice.room ? 'hidden' : 'flex flex-wrap'} items-center`}>
                    {invoice.room}
                  </p>
                                  </div>

              </div>
              
              )
            })
          )}
                    <UndoButton 
            isDeleted={isDeleted}
            isDeletedFromPopup={isDeletedFromPopup}
            handleUnDo={handleUnDo} />
        </div>
      )}
    </div>
  )
}

export default Invoice