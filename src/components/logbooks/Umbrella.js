import { useEffect, useState } from "react"
import undo from '../../images/undo.png'

function Umbrella() {
  const [room, setRoom] = useState()
  const [roomsList, setRoomsList] = useState(JSON.parse(localStorage.getItem('umbrellas')));
  const savedUmbrellas = JSON.parse(localStorage.getItem('umbrellas'))
  const [isDeleted, setIsDeleted] = useState(false)
  
  const handleChange = (e) => {
    const {name, value} = e.target
    setRoom({...room, [name]: value})
  }

  useEffect(() => {
    JSON.parse(localStorage.getItem('umbrellas'))
  }, [roomsList])

  const handleSubmit = (e) => {
    e.preventDefault()
    const existingRoomsList = roomsList || [];
    const updatedList = [...existingRoomsList, room]
    setRoomsList(updatedList)
    localStorage.setItem('umbrellas', JSON.stringify(updatedList))
  }

  const handleDelete = (e) => {
    setIsDeleted(true)
    const updatedList = savedUmbrellas.filter(item => item.room !== e.target.id)
    const deletedElement = savedUmbrellas.find(item => item.room === e.target.id)
    setRoomsList(updatedList)
    localStorage.setItem('umbrellas', JSON.stringify(updatedList))
    localStorage.setItem('umbrellas-last-deleted', JSON.stringify(deletedElement))
  }

  const handleUnDo = () => {
    setIsDeleted(false)
    const lastDeletedElement = JSON.parse(localStorage.getItem('umbrellas-last-deleted'))
    const existingRoomsList = roomsList || [];
    const updatedList = [...existingRoomsList, lastDeletedElement]
    setRoomsList(updatedList)
    localStorage.setItem('umbrellas', JSON.stringify(updatedList))
  }

  return(
    <div className="flex flex-col">
      <form onSubmit={handleSubmit} className='flex'>
        <input className="border text-xs border-border-grey w-1/3 px-1" name="room" onInput={handleChange} placeholder="Room"></input>
        <input className="border text-xs border-border-grey w-1/3 px-1" name="umbrella" onInput={handleChange} placeholder="Umbrellas"></input>
        <button type="submit" className="border border-border-grey cursor-pointer hover:shadow-1-1-4-inner hover:bg-light-purple w-1/3">+</button>
      </form>
      <div className="flex flex-wrap justify-center items-center gap-2 p-2">
        {savedUmbrellas ? (savedUmbrellas.map((room) => {
            return (
                <div onClick={handleDelete} id={room.room} className="w-fit flex items-center justify-center px-2 rounded bg-light-purple opacity-70 shadow-1-1-4 hover:shadow-1-1-4-inner hover:bg-red-200 cursor-pointer hover:line-through hover:opacity-100 transition">
                  <p className="pointer-events-none">{room.room}-{room.umbrella}</p>
                </div>
            )
          })) : (null)}
          {isDeleted ? (
            <div className="cursor-pointer opacity-50 hover:opacity-100 transition-opacity" onClick={handleUnDo}>
              <img className="w-5 h-5 cursor-pointer" src={undo}  />
            </div>
            ) : (null)}
      </div>
    </div>
  )
}

export default Umbrella