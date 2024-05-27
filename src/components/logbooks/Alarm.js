import Button from "./logbooks_components/Button"
import deleteBtn from '../../images/delete.png'
import { useEffect, useState } from "react"
import UndoButton from "./logbooks_components/UndoButton"
function Alarm({handleSubmit, savedData, handleChange, handleDelete, isDeleted, handleUnDo, undoImg}) {
  const [content, setContent] = useState(false)
  const [idE, setIde] = useState(null)

  const currentTime = new Date()
  const mouse = (id) => {
    setContent(true)
    setIde(id)
  }
  const mouse2 = () => {
    setContent(false)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date()
      savedData.forEach(element => {
        const alarmTime = new Date(element.time);
        if (
        alarmTime.getDate() === currentTime.getDate() &&
        alarmTime.getMonth() === currentTime.getMonth() &&
        alarmTime.getFullYear() === currentTime.getFullYear() &&
        alarmTime.getHours() === currentTime.getHours() &&
        alarmTime.getMinutes() === currentTime.getMinutes()) {
          console.log('hui')
          alert(`Alert for room: ${element.room}`);
        } else {
          console.log('nihuya')
        }
      });
    }, 30000); // Проверка каждую минуту

    return () => clearInterval(intervalId); // Очищаем интервал при размонтировании компонента
  }, [currentTime]);

  return(
    <div className="flex flex-col w-full">
      <form className='flex' onSubmit={handleSubmit}>
      <input className="border text-xs border-border-grey w-1/3 px-1" name="room" placeholder="Room" onInput={handleChange}></input>
      <input type='datetime-local' className="border text-xs border-border-grey w-full px-1" name="time" placeholder="Enter Alert" onInput={handleChange}></input>
        <Button type='submit' title='+' width='w-1/5'/>
      </form>

      <div className="flex flex-wrap justify-center items-center gap-2 p-2">
        {savedData ? (savedData.map((element) => {
          const alarmTime = new Date(element.time)
          const isToday = alarmTime.getDate() === currentTime.getDate() && alarmTime.getMonth() === currentTime.getMonth() && alarmTime.getFullYear() === currentTime.getFullYear()
          console.log('element', alarmTime.getMinutes(), currentTime)

          return(
            <div onClick={handleDelete} onMouseEnter={() => mouse(element.room)} onMouseLeave={mouse2} id={element.room} className={`w-16 h-20 flex items-center justify-center px-2 rounded ${isToday ? 'bg-red-200' : 'bg-blue' } opacity-70 shadow-1-1-4 hover:shadow-1-1-4-inner hover:bg-special-red cursor-pointer hover:opacity-100 transition`}>
            {content && idE === element.room ? (<img src={deleteBtn} className='w-4'/>) : (<div className='flex flex-col items-center' id={element.room}><p>{element.room ? element.room : 'No Room'}</p>  <p>{isToday ? 'TODAY' : `${alarmTime.getDate().toString().padStart(2, '0')}/${alarmTime.getMonth().toString().padStart(2, '0')}`}</p> <p>{alarmTime.getHours()}:{alarmTime.getMinutes().toString().padStart(2, '0')}</p></div>) }
            
          </div>
          )

        })) : (null)}
        <UndoButton 
          isDeleted={isDeleted}
          handleUnDo={handleUnDo} />
      </div>
    </div>
  )
}

export default Alarm