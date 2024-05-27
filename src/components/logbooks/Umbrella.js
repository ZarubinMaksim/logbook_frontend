import { useEffect, useRef, useState } from "react"
import Button from "./logbooks_components/Button"
import deleteBtn from '../../images/delete.png'
import UndoButton from "./logbooks_components/UndoButton"

function Umbrella({ handleSubmit, dataRef, valueRef, handleChange, savedData, handleDelete, isDeleted, handleUnDo, undoImg}) {
    const [content, setContent] = useState(false)
    const [idE, setIde] = useState(null)
    const mouse = (id) => {
      setContent(true)
      setIde(id)
    }
    const mouse2 = () => {
      setContent(false)
    }
  return(
    <div className="flex flex-col">
      <form onSubmit={handleSubmit} className='flex'>
        <input ref={dataRef} className="border text-xs border-border-grey w-1/3 px-1" name="room" onInput={handleChange} placeholder="Room" maxLength={5} minLength={1}></input>
        <input ref={valueRef} className="border text-xs border-border-grey w-1/3 px-1" name="umbrella" onInput={handleChange} placeholder="Umbrellas" maxLength={2} minLength={1}></input>
        <Button type='submit' title='+' width='w-1/3'/>
      </form>
      <div className="flex flex-wrap justify-center items-center gap-2 p-2">
        {savedData ? (savedData.map((room) => {
            return (
                <div onClick={handleDelete} onMouseEnter={() => mouse(room.room)} onMouseLeave={mouse2} id={room.room} className="w-20 h-6 flex items-center justify-center px-2 rounded bg-blue opacity-70 shadow-1-1-4 hover:shadow-1-1-4-inner hover:bg-red-200 cursor-pointer hover:opacity-100 transition">
                  {content && idE === room.room ? (<img src={deleteBtn} className='w-4'/>) : (<p className='' id={room.room}>{room.room}-{room.umbrella}</p>) }
                  
                </div>
            )
          })) : (null)}
          <UndoButton isDeleted={isDeleted}
          handleUnDo={handleUnDo} />
      </div>
    </div>
  )
}

export default Umbrella