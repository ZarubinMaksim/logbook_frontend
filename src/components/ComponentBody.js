import { lazy, Suspense, useEffect, useRef, useState } from "react"
import undoImg from '../images/undo.png'
import help from '../images/help.png'

// 

function ComponentBody ({title, isUnlocked, setPopupTitle, setIsPopupOpened, setPopupData, deletedFromPopupData}) {
  const DynamicComponent = lazy(() => import(`./logbooks/${title.charAt(0).toUpperCase()}${title.slice(1)}.js`))
  const [room, setRoom] = useState()
  const [roomsList, setRoomsList] = useState(JSON.parse(localStorage.getItem(`${title}`)));
  const savedData = JSON.parse(localStorage.getItem(`${title}`))
  const [isDeleted, setIsDeleted] = useState(false)
  const [isDeletedFromPopup, setIsDeletedFromPopup] = useState(false)
  const dataRef = useRef()
  const valueRef = useRef()
  const valueRef_2 = useRef()

  const handleChange = (e) => {
    const {name, value} = e.target
    setRoom({...room, [name]: value})
  }

  useEffect(() => {
    JSON.parse(localStorage.getItem(`${title}`))
  }, [roomsList])

  useEffect(() => {
    if (deletedFromPopupData !== null) {
      handleDeleteFromPopup(deletedFromPopupData)
    }
  }, [deletedFromPopupData])

  // const resetInputs = () => {
  //   dataRef.current.value = ''
  //   valueRef.current.value = ''
  // }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const existingRoomsList = roomsList || [];
    const updatedList = [...existingRoomsList, room]
    setRoomsList(updatedList)
    console.log('11', room)
    localStorage.setItem(`${title}`, JSON.stringify(updatedList))
    e.target.reset()
    // resetInputs()
  }

  const handleDelete = (e) => {
    console.log(e)
    setIsDeleted(true)
    const updatedList = savedData.filter(item => item.room !== e.target.id)
    const deletedElement = savedData.find(item => item.room === e.target.id)
    setRoomsList(updatedList)
    localStorage.setItem(`${title}`, JSON.stringify(updatedList))
    localStorage.setItem(`${title}-last-deleted`, JSON.stringify(deletedElement))
  }

  const handleDeleteFromPopup = (data) => {
    // setIsDeleted(true)
    setIsDeletedFromPopup(true)
    const updatedList = savedData && savedData.filter(item => item.room !== data.room)
    const deletedElement = savedData && savedData.find(item => item.room === data.room)
    setRoomsList(updatedList)
    localStorage.setItem(`${title}`, JSON.stringify(updatedList))
    localStorage.setItem(`${title}-last-deleted`, JSON.stringify(deletedElement))
  }

  const handleUnDo = () => {
    setIsDeleted(false)
    setIsDeletedFromPopup(false)
    const lastDeletedElement = JSON.parse(localStorage.getItem(`${title}-last-deleted`))
    const existingRoomsList = roomsList || [];
    const updatedList = [...existingRoomsList, lastDeletedElement]
    setRoomsList(updatedList)
    localStorage.setItem(`${title}`, JSON.stringify(updatedList))
  }

  const [showTooltip, setShowTooltip] = useState(false);

  const logbookDescription = {
    alarm: 'This is alarmThis is alarmThis is alarmThis is alarmThis is alarmThis is alarm',
    alert: 'This is alertThis is alertThis is alertThis is alertThis is alertThis is alert',
    invoice: 'This is invoiceThis is invoiceThis is invoiceThis is invoiceThis is invoice',
    contacts: 'This is contactsThis is contactsThis is contactsThis is contactsThis is contacts',
    taxi: 'This is taxiThis is taxiThis is taxiThis is taxiThis is taxiThis is taxiThis is taxi',
    umbrella: 'This is umbrellaThis is umbrellaThis is umbrellaThis is umbrellaThis is umbrella',
    note: 'This is noteThis is noteThis is noteThis is noteThis is noteThis is noteThis is note'
  }

  return (
    <div className='border border-border-grey bg-white h-full flex flex-col'>
      <div className='flex items-center justify-between bg-dark-blue p-1'>
        <h2 className="capitalize font-mainfont text-header-focus">{title}</h2>
        <div className="relative inline-block cursor-help" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
          <img className="w-4 h-4 opacity-60 hover:opacity-100 transition" src={help} alt='test' />
        </div>
      </div>

      <div className={isUnlocked ? ("flex h-full overflow-scroll opacity-20 pointer-events-none transition-opacity px-3") : ("text-main-black font-mainfont flex h-full overflow-scroll m-2")} >
            {showTooltip ? (
              <div className="flex items-center justify-center w-full bg-gray-800 text-textcolor py-1 px-2 rounded-md">
                <p>{logbookDescription[title]}</p>
              </div>
            ) : (
              <Suspense fallback={<div>Loading...</div>}>
              <DynamicComponent 
                title={title}
                handleSubmit = {handleSubmit}
                dataRef = {dataRef}
                valueRef = {valueRef}
                valueRef_2 = {valueRef_2}
                handleChange = {handleChange}
                setIsPopupOpened = {setIsPopupOpened}
                setPopupData = {setPopupData}
                setPopupTitle = {setPopupTitle}
                savedData = {savedData}
                handleDelete = {handleDelete}
                isDeletedFromPopup = {isDeletedFromPopup}
                isDeleted = {isDeleted}
                handleUnDo = {handleUnDo}
                undoImg = {undoImg}
              />
            </Suspense>
            )}

      </div>
    </div>
  )
}

export default ComponentBody