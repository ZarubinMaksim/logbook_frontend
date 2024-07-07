import { useEffect, useState } from "react"
import MainApi from "../../utils/MainApi"
import homeIcon from '../../images/home.png'
import alertIcon from '../../images/alertIcon.png'
import InfoBlock from "./InfoBlock"

function PopupAlert({data, isDeleteClicked, setIsDeletedFromPopup, isDeletedFromPopup, handleClosePopup, setIsUpdateClicked, isUpdateClicked, setIsUpdatedFromPopup, isUpdatedFromPopup}) {
    const [alert, setAlert] = useState({
      room: data.room,
      alertText: data.alertText
    })
    const [isUpdateSaved, setIsUpdateSaved] = useState(false)



    useEffect(() => {
      if (isDeleteClicked) {
        MainApi.deleteAlert(data._id)
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
      setAlert({...alert, [name]: value})
    }

    const handleSaveUpdate = (e) => {
      e.preventDefault()
      const {room, alertText} = alert
      console.log(room, alertText, data)
      MainApi.updateAlert(data._id, room, alertText)
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
        <input value={alert.room} onChange={handleChange} className="border text-xs border-border-grey w-full h-7 px-1" name="room" placeholder="Room" onInput={handleChange} maxLength='6' required></input>
        <label for='alertText' className="text-black text-sm mt-2">New Alert</label>
        <input value={alert.alertText} onChange={handleChange} className="border text-xs border-border-grey w-full h-7 px-1 mb-4" name="alertText" placeholder="Enter Alert" onInput={handleChange} maxLength='' required></input>
        <button className="border border-dark-blue w-1/2 self-center" type="submit">Save</button>
      </form>
    ) : (
      <div className="flex gap-2">
        <InfoBlock 
          icon={homeIcon} 
          title={'Room'} 
          isUpdateSaved={isUpdateSaved} 
          savedValue={[alert.room]} 
          uploadedValue={[data.room]}/>
        <InfoBlock 
          icon={alertIcon} 
          title={'Alert'} 
          isUpdateSaved={isUpdateSaved} 
          savedValue={[alert.alertText]} 
          uploadedValue={[data.alertText]}/>
      </div>
    )}

   </div>
    )
  }
  export default PopupAlert;
  