import Button from "./logbooks_components/Button"
import deleteBtn from '../../images/delete.png'
import { useState } from "react"
import UndoButton from "./logbooks_components/UndoButton"
function Alert({handleSubmit, savedData, handleChange, handleDelete, isDeleted, handleUnDo, undoImg}) {
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
    <div className="flex flex-col w-full">
      <form className='flex' onSubmit={handleSubmit}>
      <input className="border text-xs border-border-grey w-1/3 px-1" name="room" placeholder="Room" onInput={handleChange}></input>
        <input className="border text-xs border-border-grey w-full px-1" name="alert" placeholder="Enter Alert" onInput={handleChange}></input>
        <Button type='submit' title='+' width='w-1/5'/>
      </form>

      <div className="flex flex-col justify-center items-center gap-2 p-2">
        {savedData ? (savedData.map((element) => {
          return(
            <div onClick={handleDelete} onMouseEnter={() => mouse(element.room)} onMouseLeave={mouse2} id={element.room} className="w-full h-12 flex items-center justify-center px-2 rounded bg-blue opacity-70 shadow-1-1-4 hover:shadow-1-1-4-inner hover:bg-red-200 cursor-pointer hover:opacity-100 transition">
            {content && idE === element.room ? (<img src={deleteBtn} className='w-4'/>) : (<p className='' id={element.room}>{element.room ? element.room : 'No Room'} - {element.alert}</p>) }
            
          </div>
          )

        })) : (null)}
        <UndoButton 
        isDeleted={isDeleted}
          handleUnDo={handleUnDo}/>
      </div>
    </div>
  )
}

export default Alert