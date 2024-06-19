import { useEffect, useRef, useState } from "react"
import Button from "./logbooks_components/Button"
import deleteBtn from '../../images/delete.png'
import homeIcon from '../../images/home.png'
import umbrellaIcon from '../../images/umbrella-blue.png'
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
        <input ref={dataRef} className="border text-xs border-border-grey w-1/3 px-1" name="room" onInput={handleChange} placeholder="Room" maxLength='6' required></input>
        <input ref={valueRef} className="border text-xs border-border-grey w-1/3 px-1" name="umbrella" onInput={handleChange} placeholder="Umbrellas" maxLength='2' required></input>
        <Button type='submit' title='+' width='w-1/3'/>
      </form>
      <div className="flex flex-wrap justify-center items-center gap-2 p-2">
        {savedData ? (savedData.map((room) => {
            return (
                <div onClick={handleDelete} onMouseEnter={() => mouse(room.room)} onMouseLeave={mouse2} id={room.room} className="w-32 h-7 flex items-center justify-center px-2 rounded bg-blue opacity-70 shadow-1-1-4 hover:shadow-1-1-4-inner hover:bg-red-200 cursor-pointer hover:opacity-100 transition">
                  {content && idE === room.room ? (<img src={deleteBtn} className='w-4'/>) : 
                  (
                  <div className="flex gap-2">

                    <div className="flex gap-1">
                      <img src={homeIcon} className='w-4 h-4 mt-0.5'></img>
                      <p className='' id={room.room}>{room.room}</p>
                    </div>
                    <div className="flex gap-1"> 
                      <img src={umbrellaIcon} className='w-4 h-4 mt-0.5'></img>
                      <p>{room.umbrella}</p>  
                    </div>

                  </div>
                  ) }
                  
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