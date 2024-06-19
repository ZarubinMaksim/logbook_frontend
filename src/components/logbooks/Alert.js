import Button from "./logbooks_components/Button"
import deleteBtn from '../../images/delete.png'
import homeIcon from '../../images/home.png'
import alertIcon from '../../images/alertIcon.png'
import { useState } from "react"
import UndoButton from "./logbooks_components/UndoButton"
function Alert({handleSubmit, title,  savedData, handleChange, handleDelete, isDeleted, handleUnDo, undoImg, setIsPopupOpened, setPopupData, setPopupTitle}) {
  const [content, setContent] = useState(false)
  const [idE, setIde] = useState(null)


  const mouse = (id) => {
    setContent(true)
    setIde(id)
  }
  const mouse2 = () => {
    setContent(false)
  }

  const handleAlert = (e, isTooLong, data) => {
    if (isTooLong) {
      setIsPopupOpened(true)
      setPopupData(data)
      setPopupTitle(title)
    } else {
      handleDelete(e)
    }
  }

  return(
    <div className="flex flex-col w-full">
      <form className='flex' onSubmit={handleSubmit}>
        <input className="border text-xs border-border-grey w-1/3 px-1" name="room" placeholder="Room" onInput={handleChange} maxLength='6' required></input>
        <input className="border text-xs border-border-grey w-full px-1" name="alert" placeholder="Enter Alert" onInput={handleChange} maxLength='' required></input>
        <Button type='submit' title='+' width='w-1/5'/>
      </form>

      <div className="flex flex-col justify-center items-center gap-2 p-2">
        {savedData ? (savedData.map((element) => {

          const isTooLong = element.alert.length > 12

          return(
            <div onClick={(e) => {handleAlert(e, isTooLong, element)}} onMouseEnter={() => mouse(element.room)} onMouseLeave={mouse2} id={element.room} className="w-full min-h-12 h-14 p-2 flex items-center justify-center px-2 rounded bg-blue opacity-70 shadow-1-1-4 hover:shadow-1-1-4-inner hover:bg-red-200 cursor-pointer hover:opacity-100 transition">
            {content && idE === element.room ? 
            (isTooLong ? <p>Open popup</p> : <img src={deleteBtn} className='w-4'/> ) : 
            (
              <div className='flex flex-col items-center gap-0.5' id={element.room}>
                <div className="flex gap-2">
                  <img src={homeIcon} className='w-4 h-4 mt-0.5'></img>
                  <p className='' id={element.room}>{element.room}</p> 
                </div>

                <div className="flex gap-2">
                  <img src={alertIcon} className='w-4 h-4 mt-0.5'></img>
                  <p>{isTooLong ? `${element.alert.slice(0,14)}...` : element.alert}</p>
                </div>

              </div>

            ) }
            
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