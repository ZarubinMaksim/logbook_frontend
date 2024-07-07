import { useEffect, useState } from "react"
import MainApi from "../../utils/MainApi"
import routeIcon from '../../images/location.png'
import homeIcon from '../../images/home.png'
import calendarIcon from '../../images/calendar.png'
import clockIcon from '../../images/clock.png'
import flightIcon from '../../images/airplane.png'
import paxIcon from '../../images/team.png'
import phoneIcon from '../../images/phone.png'
import InfoBlock from "./InfoBlock"


function PopupTaxi({data, isDeleteClicked, setIsDeletedFromPopup, isDeletedFromPopup, handleClosePopup, isUpdateClicked, setIsUpdatedFromPopup, setIsUpdateClicked, isUpdatedFromPopup}) {

  const [taxi, setTaxi] = useState({
    room: data.room,
    date: data.date,
    pax: data.pax,
    flight: data.flight,
    phone: data.phone
  })

  const [isUpdateSaved, setIsUpdateSaved] = useState(false)

  useEffect(() => {
    if (isDeleteClicked) {
      MainApi.deleteTaxi(data._id)
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
    setTaxi({...taxi, [name]: value})
  }

  const handleSaveUpdate = (e) => {
    e.preventDefault()
    const { route, room, date, pax, flight, phone } = taxi
    MainApi.updateTaxi(data._id, route, room, date, pax, flight, phone)
    .then(() => {
      setIsUpdatedFromPopup(!isUpdatedFromPopup)
      setIsUpdateSaved(true)
      setIsUpdateClicked(!isUpdateClicked)
    })
  }

   const dateTime = isUpdateSaved ? taxi.date.split('T') : data.date.split('T')
   const fullDate = dateTime[0].split('-')
   const time = dateTime[1]

  return (
    <div className="font-mainfont text-lg">
      {isUpdateClicked ? (
      <form className='flex flex-col' onSubmit={handleSaveUpdate}>
      <div className='flex w-4/5 justify-around'>
        <label className='flex flex-col gap-1 cursor-pointer'>
          <input type='radio' name='route' value='pickup' className="border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
          <p className='text-xs'>Pickup</p>
        </label>
        <label className='flex flex-col gap-1 cursor-pointer'>
          <input type='radio' name='route' value='transfer' className="border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
          <p className='text-xs'>Transfer</p>
        </label>
      </div>
        <label for='room' className="text-black text-sm mt-2">New room</label>
        <input value={taxi.room} onChange={handleChange} className="border text-xs border-border-grey w-1/3 h-7 px-1" name="room" placeholder="Room" onInput={handleChange} maxLength='6' required></input>
        <label for='date' className="text-black text-sm mt-2">New date</label>
        <input type='datetime-local' value={taxi.date} onChange={handleChange} className="border text-xs border-border-grey w-1/3 h-7 px-1" name="date" placeholder="Date" onInput={handleChange}></input>
        <label for='pax' className="text-black text-sm mt-2">New pax</label>
        <input value={taxi.pax} onChange={handleChange} className="border text-xs border-border-grey w-1/3 h-7 px-1" name="pax" placeholder="Pax" onInput={handleChange} maxLength='6'></input>
        <label for='flight' className="text-black text-sm mt-2">New flight</label>
        <input value={taxi.flight} onChange={handleChange} className="border text-xs border-border-grey w-1/3 h-7 px-1" name="flight" placeholder="Flight" onInput={handleChange} maxLength='6'></input>
        <label for='phone' className="text-black text-sm mt-2">New phone</label>
        <input value={taxi.phone} onChange={handleChange} className="border text-xs border-border-grey w-1/3 h-7 px-1" name="phone" placeholder="Phone" onInput={handleChange} maxLength='6'></input>
        <button type='submit'>Save</button>
      </form>
      ) : (
        <div className="flex flex-col gap-2">

          <div className="flex gap-2">
            <InfoBlock 
              icon={routeIcon} 
              title={'Route'} isUpdateSaved={isUpdateSaved} savedValue={[taxi.route]} uploadedValue={[data.route]}/>
            <InfoBlock icon={calendarIcon} title={'Date'} isUpdateSaved={isUpdateSaved} savedValue={[fullDate.join('-')]} uploadedValue={[time]}/>
          </div>
          <div className="flex gap-2">
            <InfoBlock icon={homeIcon} title={'Room'} isUpdateSaved={isUpdateSaved} savedValue={[taxi.room]} uploadedValue={[data.room]}/>
            <InfoBlock icon={flightIcon} title={'Flight'} isUpdateSaved={isUpdateSaved} savedValue={[taxi.flight]} uploadedValue={[data.flight]}/>
          </div>

          <div className="flex gap-2">
          <InfoBlock icon={paxIcon} title={'Pax'} isUpdateSaved={isUpdateSaved} savedValue={[taxi.pax]} uploadedValue={[data.pax]}/>
            <InfoBlock icon={phoneIcon} title={'Phone'} isUpdateSaved={isUpdateSaved} savedValue={[taxi.phone]} uploadedValue={[data.phone]}/>
          </div>
        </div>

      )}

    </div>
    )
  }
  export default PopupTaxi;
  