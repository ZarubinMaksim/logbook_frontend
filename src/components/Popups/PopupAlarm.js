import { useEffect, useState } from "react"
import MainApi from "../../utils/MainApi"

function PopupAlarm({data, isDeleteClicked, setIsDeletedFromPopup, isDeletedFromPopup, handleClosePopup, setIsUpdateClicked, isUpdateClicked, setIsUpdatedFromPopup, isUpdatedFromPopup}) {
    const [alarm, setAlarm] = useState({
      room: data.room,
      date: data.date
    })
    const [isUpdateSaved, setIsUpdateSaved] = useState(false)



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
        <input value={alarm.room} onChange={handleChange} className="border text-xs border-border-grey w-1/3 h-7 px-1" name="room" placeholder="Room" onInput={handleChange} maxLength='6' required></input>
        <label for='date' className="text-black text-sm mt-2">New date</label>
        <input type='datetime-local' className="border text-xs border-border-grey w-full h-7 px-1" name="alertText" placeholder="Enter Alert" onInput={handleChange} maxLength='' required></input>
        <button type='submit'>Save</button>
      </form>
    ) : (
      <>
      <p className="capitalize">{isUpdateSaved ? alarm.room : data.room}</p>
      <p className="capitalize">{isUpdateSaved ? alarm.date : data.date}</p>
      </>
    )}

   </div>
    )
  }
  export default PopupAlarm;
  