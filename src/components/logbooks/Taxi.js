
import { useEffect, useState } from 'react'
import arrivals from '../../images/arrivals.png'
import departures from '../../images/departures.png'
import setting from '../../images/settings.png'
import Form from '../Forms/Form'
import Popup from '../Popups/Popup'
import Button from './logbooks_components/Button'
import UndoButton from './logbooks_components/UndoButton'
import calendarIcon from '../../images/calendar.png'
import clockIcon from '../../images/clock.png'
import MainApi from '../../utils/MainApi'

function Taxi({ dataRef, valueRef, valueRef_2, title, handleDelete, isDeleted, handleUnDo, undoImg, setPopupTitle, setIsPopupOpened, setPopupData, isDeletedFromPopup}) {
  const [showForm, setShowForm] = useState(false)
  // const [isTransferClicked, setIsTransferClicked] = useState(false)
  const [hiddenRoom, setHiddenRoom] = useState(null)
  const [showInfo, setShowInfo] = useState(false)
  const [showNestedInfo, setShowNestedInfo] = useState(false);
  const handleShowForm = () => {
    setShowForm(!showForm)
  }

  //---------------------
  const [taxi, setTaxi] = useState()
  const [taxiesList, setTaxiesList] = useState([])

  const handleChange = (e) => {
    const {name, value} = e.target
    setTaxi({...taxi, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { route, room, date, flight, pax, phone } = taxi
    MainApi.setTaxi(route, room, date, flight, pax, phone)
    .then((response) => {
      const newTaxi = response.data
      setTaxiesList([...taxiesList, newTaxi])
    })
    setShowForm(!showForm)
  }

  useEffect(() => {
    const cachedTaxies = JSON.parse(localStorage.getItem('taxies'))
    if (cachedTaxies) {
      setTaxiesList(cachedTaxies)
    }

    updateTaxies()
  }, [])

  const updateTaxies = () => {
    MainApi.getTaxies()
    .then((taxies) => {
      setTaxiesList(taxies.data)
      localStorage.setItem('taxies', JSON.stringify(taxies.data))
    
    })
    .catch((err) => {
      console.log('Error fetching alarms:', err)
    })
  }

  useEffect(() => {
    updateTaxies()
  }, [isDeletedFromPopup])

//---------------------


  // const handleTransferClick = () => {
  //   setIsTransferClicked(true)
  // }

  // const handlePickUpClick = () => {
  //   setIsTransferClicked(false)
  // }

  const handleShowInfo = (rd) => {
    console.log('555', rd)
    // setShowNestedInfo(false)
    // setHiddenRoom(roomID)
    // setShowInfo(true)
    // setTimeout(() => {
    //   setShowNestedInfo(true)
    // }, 700)
    // if (hiddenRoom === roomID) {
    //   setShowInfo(!showInfo)
    // }
    
    setIsPopupOpened(true)
    setPopupData(rd)
    setPopupTitle(title)
  }

  // const handleSubmitForm = (event) => {
  //   handleSubmit(event)
  //   setShowForm(!showForm)
  // }
  
//h-6 w-fit flex flex-col items-center justify-center px-2 rounded bg-light-purple opacity-70 shadow-1-1-4 cursor-pointer hover:shadow-1-1-4-inner hover:bg-red-200  hover:line-through hove:opacity-100

//  const clas2 = 'h-48'
  return(
    <div className="flex flex-col w-full">
      <Button type='button' title='Add a ride' showForm={handleShowForm}/>
      {showForm ? (
        <Form onSubmit={handleSubmit} onChange={handleChange} title={title}/>
        // <form onSubmit={handleSubmit} className='flex flex-col gap-2 h-fit items-center justify-center py-2'>
        //   <div className='flex w-4/5 justify-around'>
        //     <label className='flex flex-col gap-1 cursor-pointer'>
        //       <input type='radio' name='route' value='pickup' className="border text-s border-border-grey px-1 cursor-pointer" onClick={handlePickUpClick} onInput={handleChange}></input>
        //       <p className='text-xs'>Pickup</p>
        //     </label>
        //     <label className='flex flex-col gap-1 cursor-pointer'>
        //       <input type='radio' name='route' value='transfer' className="border text-s border-border-grey px-1 cursor-pointer" onClick={handleTransferClick} onInput={handleChange}></input>
        //       <p className='text-xs'>Transfer</p>
        //     </label>
        //   </div>
        //   {isTransferClicked ? (
        //     <>
        //       <input type='text' name='room' ref={dataRef} className="border text-xs border-border-grey w-4/5 p-1" placeholder='Room' onInput={handleChange}></input>
        //       <input type='date' name="time" ref={valueRef} className="border text-xs border-border-grey w-4/5 p-1"  placeholder='Time' onInput={handleChange}></input> 
        //       <input type='text' name='pax' ref={dataRef} className="border text-xs border-border-grey w-4/5 p-1" placeholder='Pax' onInput={handleChange}></input>
        //     </>
        //   ) : (
        //     <>
        //       <input type='text' name='room' ref={dataRef} className="border text-xs border-border-grey w-4/5 p-1" placeholder='Room' onInput={handleChange}></input>
        //       <input type='datetime-local' name="time" ref={valueRef} className="border text-xs border-border-grey w-4/5 p-1"  placeholder='Time' onInput={handleChange}></input> 
        //       <input type='text' name='flight' ref={dataRef} className="border text-xs border-border-grey w-4/5 p-1" placeholder='Flight number' onInput={handleChange}></input>
        //       <input type='text' name='pax' ref={dataRef} className="border text-xs border-border-grey w-4/5 p-1" placeholder='Pax' onInput={handleChange}></input>
        //       <input type='tel' name='tel' ref={dataRef} className="border text-xs border-border-grey w-4/5 p-1" placeholder='Phone number' onInput={handleChange}></input>
        //     </>
        //   )}
        //   <Button type='submit' title='Add' width='w-4/5'/>
        // </form>
      ) : (
        <div className="flex flex-wrap justify-center items-center gap-2 p-2">
        {taxiesList ? (taxiesList.map((room) => {
          const dateTime = room.date.split('T')
          const fullDate = dateTime[0].split('-')
          const time = dateTime[1]
          const [year, month, date] = fullDate
            return (
              // {route: 'transfer', room: '7898', flight: 'su778', time: '12:23', pax: '1'} 
                <div onClick={() => handleShowInfo(room)} id={room.room} className={`h-7 w-fit flex items-center justify-center px-2 rounded bg-blue opacity-70 shadow-1-1-4 cursor-pointer transition-height duration-700 overflow-scroll hover:bg-blue-active hover:opacity-100`}>
                  <div className='flex items-center gap-2'>

                <div className="flex gap-1">
                  <img src={calendarIcon} className='w-4 h-4 mt-0.5'></img>
                  <p className={`pointer-events-none flex flex-wrap items-center`}>{`${date}.${month}`}</p>
                </div>

                {time && 
                  <div className="flex gap-1">
                  <img src={clockIcon} className='w-4 h-4 mt-0.5'></img>
                  <p> {time} </p>
                </div>
                }


                {<img className='w-4 h-4 ml-2' src={room.route === 'pickup' ? arrivals : departures}/>}

              </div>
                
                </div>
            )
          })) : (null)}
          <UndoButton 
            isDeleted={isDeleted}
            isDeletedFromPopup={isDeletedFromPopup}
            handleUnDo={handleUnDo} />
          
      </div>
      )}
      
    </div>
  )
}

export default Taxi