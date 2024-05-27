import { lazy, Suspense, useEffect, useRef, useState } from "react"
import undoImg from '../images/undo.png'

function ComponentBody ({title, isUnlocked, setPopupTitle, setIsPopupOpened, setPopupData}) {
  const imageUrl = require(`../images/${title}.png`)
  const DynamicComponent = lazy(() => import(`./logbooks/${title.charAt(0).toUpperCase()}${title.slice(1)}.js`))
  const [room, setRoom] = useState()
  const [roomsList, setRoomsList] = useState(JSON.parse(localStorage.getItem(`${title}`)));
  const savedData = JSON.parse(localStorage.getItem(`${title}`))
  const [isDeleted, setIsDeleted] = useState(false)
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

  const resetInputs = () => {
    dataRef.current.value = ''
    valueRef.current.value = ''
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const existingRoomsList = roomsList || [];
    const updatedList = [...existingRoomsList, room]
    setRoomsList(updatedList)
    localStorage.setItem(`${title}`, JSON.stringify(updatedList))
    // resetInputs()
  }

  const handleDelete = (e, key) => {
    setIsDeleted(true)
    console.log('23', e.target.id, key)
    const updatedList = savedData.filter(item => item.room !== e.target.id)
    const deletedElement = savedData.find(item => item.room === e.target.id)
    setRoomsList(updatedList)
    localStorage.setItem(`${title}`, JSON.stringify(updatedList))
    localStorage.setItem(`${title}-last-deleted`, JSON.stringify(deletedElement))
  }

  const handleUnDo = () => {
    setIsDeleted(false)
    const lastDeletedElement = JSON.parse(localStorage.getItem(`${title}-last-deleted`))
    const existingRoomsList = roomsList || [];
    const updatedList = [...existingRoomsList, lastDeletedElement]
    setRoomsList(updatedList)
    localStorage.setItem(`${title}`, JSON.stringify(updatedList))
  }

  return (
    <div className='border border-border-grey bg-white h-full flex flex-col'>
      <div className='bg-dark-blue p-1 mb-2'>
        {/* <img className="w-4 h-4" src={imageUrl}></img> */}
        <h2 className="capitalize font-mainfont text-header-focus">{title}</h2>
      </div>

      <div className={isUnlocked ? ("flex h-full overflow-scroll opacity-20 pointer-events-none transition-opacity px-3") : ("text-main-black font-mainfont flex h-full overflow-scroll px-3")} >
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
            isDeleted = {isDeleted}
            handleUnDo = {handleUnDo}
            undoImg = {undoImg}
          />
        </Suspense>
      </div>
    </div>



    // <div className='p-0.5 rounded-sm box-border bg-pantone-black h-full flex flex-col shadow-xl' key="3">
    //   <div className='p-0.5 box-border flex flex-row gap-2 justify-start items-center'>
    //     <img  className='w-5 h-5' src={deleteButton}/>
    //     <p className='text-pantone-light'>{title}</p>
    //     <div className='ml-auto' id={title}>
    //   </div>

    //   </div>

    //   <div className='bg-pantone-light h-full p-0.5 box-border rounded-b-sm text-pantone-black'>
    //     <p>TUT BUDILNIK</p>
    //     <input></input>
    //   </div>
    // </div>
  )
}

export default ComponentBody