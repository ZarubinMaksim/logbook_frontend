import Button from "./logbooks_components/Button"
import deleteBtn from '../../images/delete.png'
import homeIcon from '../../images/home.png'
import calendarIcon from '../../images/calendar.png'
import clockIcon from '../../images/clock.png'
import { useEffect, useState } from "react"
import UndoButton from "./logbooks_components/UndoButton"
import MainApi from "../../utils/MainApi"

function Alarm({ 
  handleSubmit,
  savedData, 
  handleChange, 
  handleDelete, 
  isDeleted, 
  handleUnDo, 
}) {

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
      savedData && savedData.forEach(element => { //tut mozhet bit' problema
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
      <input className="border text-xs border-border-grey w-1/3 px-1" name="room" placeholder="Room" onInput={handleChange} required maxLength='6'></input>
      <input type='datetime-local' className="border text-xs border-border-grey w-full px-1" name="time" placeholder="Enter Alert" onInput={handleChange} required></input>
        <Button type='submit' title='+' width='w-1/5'/>
      </form>

      <div className="flex flex-wrap justify-center items-center gap-2 p-2">
        {savedData ? (savedData.map((element) => {
          const alarmTime = new Date(element.time)
          const isToday = alarmTime.getDate() === currentTime.getDate() && alarmTime.getMonth() === currentTime.getMonth() && alarmTime.getFullYear() === currentTime.getFullYear()
          console.log('element', alarmTime.getMinutes(), currentTime)

          return(
            <div onClick={handleDelete} onMouseEnter={() => mouse(element.room)} onMouseLeave={mouse2} id={element.room} className={`w-22 h-22 flex items-center justify-center rounded ${isToday ? 'bg-red-200' : 'bg-blue' } opacity-70 shadow-1-1-4 hover:shadow-1-1-4-inner hover:bg-special-red cursor-pointer hover:opacity-100 transition`}>
            {content && idE === element.room ? 
              (<img src={deleteBtn} className='w-4'/>) : 
              (<div className='flex flex-col items-center gap-0.5' id={element.room}>
                <div className="flex gap-1">
                  <img src={homeIcon} className='w-4 h-4 mt-0.5'></img>
                  <p>{element.room}</p>  
                </div>

                <div className="flex gap-1">
                  <img src={calendarIcon} className='w-4 h-4 mt-0.5'></img>
                  <p>{isToday ? 'Today' : `${alarmTime.getDate().toString().padStart(2, '0')}/${alarmTime.getMonth().toString().padStart(2, '0')}`}</p> 
                </div>

                <div className="flex gap-1">
                  <img src={clockIcon} className='w-4 h-4 mt-0.5'></img>
                  <p>{alarmTime.getHours()}:{alarmTime.getMinutes().toString().padStart(2, '0')}</p>
                </div>

              </div>) }
            
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