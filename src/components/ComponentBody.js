import { lazy, Suspense, useEffect, useRef, useState } from "react"
import undoImg from '../images/undo.png'

function ComponentBody ({title, isUnlocked}) {
  const imageUrl = require(`../images/${title}.png`)
  const DynamicComponent = lazy(() => import(`./logbooks/${title.charAt(0).toUpperCase()}${title.slice(1)}.js`))
  const [room, setRoom] = useState()
  const [roomsList, setRoomsList] = useState(JSON.parse(localStorage.getItem(`${title}`)));
  const savedData = JSON.parse(localStorage.getItem(`${title}`))
  const [isDeleted, setIsDeleted] = useState(false)
  const dataRef = useRef()
  const valueRef = useRef()
  const valueRef_2 = useRef()

  console.log('345', roomsList)


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

  const handleDelete = (e) => {
    setIsDeleted(true)
    console.log('23', savedData)
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
    <div className='border border-border-grey bg-white h-full p-2 flex flex-col'>
      <div className='pb-1 flex gap-2 items-center'>
        <img className="w-4 h-4" src={imageUrl}></img>
        <h2 className="capitalize">{title}</h2>
      </div>

      <div className={isUnlocked ? ("flex h-full overflow-scroll opacity-20 pointer-events-none transition-opacity") : ("flex h-full overflow-scroll")} >
        <Suspense fallback={<div>Loading...</div>}>
          <DynamicComponent 
            handleSubmit = {handleSubmit}
            dataRef = {dataRef}
            valueRef = {valueRef}
            valueRef_2 = {valueRef_2}
            handleChange = {handleChange}
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