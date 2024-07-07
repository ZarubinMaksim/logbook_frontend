import { useEffect, useState } from "react"
import MainApi from "../../utils/MainApi"
import homeIcon from '../../images/home.png'
import calendarIcon from '../../images/calendar.png'
import clockIcon from '../../images/clock.png'
import Button from "../logbooks/logbooks_components/Button"
import InfoBlock from "./InfoBlock"

function PopupAlarm({data, isDeleteClicked, setIsDeletedFromPopup, isDeletedFromPopup, handleClosePopup, setIsUpdateClicked, isUpdateClicked, setIsUpdatedFromPopup, isUpdatedFromPopup}) {
    const [alarm, setAlarm] = useState({
      room: data.room,
      date: data.date
    })
    const [isUpdateSaved, setIsUpdateSaved] = useState(false)
    const alarmTime = isUpdateSaved ? new Date(alarm.date) : new Date(data.date)

    const formatDate = (date) => {
      const formattedDate = new Date(date)
      const day = formattedDate.getDate().toString().padStart(2, '0')
      const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0')
      const hour = formattedDate.getHours()
      const minute = formattedDate.getMinutes().toString().padStart(2, '0')
      return `${day}/${month}  ${hour}:${minute}`
    }

    const savedDate = formatDate(alarm.date)
    const uploadedDate = formatDate(data.date)

    // const savedDate = new Date(alarm.date)
    // const savedDateToShow = `${savedDate.getDate().toString().padStart(2, '0')}/${(savedDate.getMonth()+1).toString().padStart(2, '0')}`
    // <p className="capitalize self-center">{alarmTime.getHours()}:{alarmTime.getMinutes().toString().padStart(2, '0')}</p>


    // const uploadedDate = new Date(data.date)
    // const uploadedDateToShow = `${uploadedDate.getDate().toString().padStart(2, '0')}/${(uploadedDate.getMonth()+1).toString().padStart(2, '0')}`

    useEffect(() => {
      if (isDeleteClicked) {
        MainApi.deleteAlarm(data._id)
        .then((response) => {
          if (response) {
            setIsDeletedFromPopup(!isDeletedFromPopup)
            handleClosePopup()
          }
        })
      }
    }, [isDeleteClicked])

    const handleChange = (e) => {
      const {name, value} = e.target
      setAlarm({...alarm, [name]: value})
    }

    const handleSaveUpdate = (e) => {
      e.preventDefault()
      const {room, date} = alarm

      MainApi.updateAlarm(data._id, room, date)
        .then(() => {
          setIsUpdatedFromPopup(!isUpdatedFromPopup)
          setIsUpdateSaved(true)
          setIsUpdateClicked(!isUpdateClicked)
        })
    }

  return (
   <div className="font-mainfont text-lg">
    {isUpdateClicked ? (
      <form className='flex flex-col' onSubmit={handleSaveUpdate}>
        <label for='room' className="text-black text-sm mt-2">New room</label>
        <input value={alarm.room} onChange={handleChange} className="border text-xs border-border-grey w-full h-7 px-1" name="room" placeholder="Room" onInput={handleChange} maxLength='6' required></input>
        <label for='date' className="text-black text-sm mt-2">New date</label>
        <input type='datetime-local' className="border text-xs border-border-grey w-full h-7 px-1 mb-4" name="date" onInput={handleChange} maxLength='' required></input>
        <button className="border border-dark-blue w-1/2 self-center" type="submit">Save</button>
      </form>
    ) : (
      <div className="flex gap-2">
        <InfoBlock 
          icon={homeIcon} 
          title={'Room'} 
          isUpdateSaved={isUpdateSaved} 
          savedValue={[alarm.room]} 
          uploadedValue={[data.room]}/>
        <InfoBlock 
          icon={calendarIcon} 
          title={'Date'} 
          isUpdateSaved={isUpdateSaved} 
          savedValue={[savedDate]} 
          uploadedValue={[uploadedDate]}/>
      </div>
    )}

   </div>
    )
  }
  export default PopupAlarm;
  