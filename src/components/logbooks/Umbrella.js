import { useEffect, useRef, useState } from "react"

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
        <input ref={dataRef} className="border text-xs border-border-grey w-1/3 px-1" name="room" onInput={handleChange} placeholder="Room"></input>
        <input ref={valueRef} className="border text-xs border-border-grey w-1/3 px-1" name="umbrella" onInput={handleChange} placeholder="Umbrellas"></input>
        <button type="submit" className="border border-border-grey cursor-pointer hover:shadow-1-1-4-inner hover:bg-light-purple w-1/3">+</button>
      </form>
      <div className="flex flex-wrap justify-center items-center gap-2 p-2">
        {savedData ? (savedData.map((room) => {
            return (
                <div onClick={handleDelete} onMouseEnter={() => mouse(room.room)} onMouseLeave={mouse2} id={room.room} className="w-fit flex items-center justify-center px-2 rounded bg-light-purple opacity-70 shadow-1-1-4 hover:shadow-1-1-4-inner hover:bg-red-200 cursor-pointer hover:opacity-100 transition">
                  {content && idE === room.room ? (<p>Delete</p>) : (<p className='' id={room.room}>{room.room}-{room.umbrella}</p>) }
                  
                </div>
            )
          })) : (null)}
          {isDeleted ? (
            <div className="cursor-pointer opacity-50 hover:opacity-100 transition-opacity" onClick={handleUnDo}>
              <img className="w-5 h-5 cursor-pointer" src={undoImg}  />
            </div>
            ) : (null)}
      </div>
    </div>
  )
}

export default Umbrella