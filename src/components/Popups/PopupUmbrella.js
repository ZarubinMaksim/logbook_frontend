import { useEffect, useState } from "react"
import MainApi from "../../utils/MainApi"
import homeIcon from '../../images/home.png'
import umbrellaIcon from '../../images/umbrella-blue.png'
import InfoBlock from "./InfoBlock"

function PopupUmbrella({data, isDeleteClicked, setIsDeletedFromPopup, isDeletedFromPopup, handleClosePopup, isUpdateClicked, setIsUpdatedFromPopup, setIsUpdateClicked, isUpdatedFromPopup}) {

  const [umbrella, setUmbrella] = useState({
    room: data.room,
    umbrella: data.umbrella
  })

  const [isUpdateSaved, setIsUpdateSaved] = useState(false)

  useEffect(() => {
    if (isDeleteClicked) {
      MainApi.deleteUmbrella(data._id)
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
    setUmbrella({...umbrella, [name]: value})
  }

  const handleSaveUpdate = (e) => {
    e.preventDefault()
    const { room, umbrellas } = umbrella
    MainApi.updateUmbrella(data._id, room, umbrellas)
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
        <input value={umbrella.room} onChange={handleChange} className="border text-xs border-border-grey w-1/3 h-7 px-1" name="room" placeholder="Room" onInput={handleChange} maxLength='6' required></input>
        <label for='umbrella' className="text-black text-sm mt-2">New umbrellas</label>
        <input value={umbrella.date} onChange={handleChange} className="border text-xs border-border-grey w-1/3 h-7 px-1" name="umbrellas" placeholder="Date" onInput={handleChange}></input>
        <button type='submit'>Save</button>
      </form>
      ) : (
      <div className="flex gap-2">
        <InfoBlock icon={homeIcon} title={'Room'} isUpdateSaved={isUpdateSaved} savedValue={[umbrella.room]} uploadedValue={[data.room]}/>
        <InfoBlock icon={umbrellaIcon} title={'Umbrellas'} isUpdateSaved={isUpdateSaved} savedValue={[umbrella.umbrellas]} uploadedValue={[data.umbrella]}/>
      </div>
      )}

    </div>
    )
  }
  export default PopupUmbrella;
  