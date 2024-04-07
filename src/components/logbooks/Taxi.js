
import { useState } from 'react'
import arrivals from '../../images/arrivals.png'
import departures from '../../images/departures.png'
import setting from '../../images/settings.png'

function Taxi({ handleSubmit, dataRef, valueRef, valueRef_2, handleChange, savedData, handleDelete, isDeleted, handleUnDo, undoImg}) {
  const [showForm, setShowForm] = useState(false)
  const [isTransferClicked, setIsTransferClicked] = useState(false)
  const [hiddenRoom, setHiddenRoom] = useState(null)
  const [showInfo, setShowInfo] = useState(false)
  const [showNestedInfo, setShowNestedInfo] = useState(false);
  const handleShowForm = () => {
    setShowForm(!showForm)
  }

  const handleTransferClick = () => {
    setIsTransferClicked(true)
  }

  const handlePickUpClick = () => {
    setIsTransferClicked(false)
  }

  const handleShowInfo = (roomID) => {
    setShowNestedInfo(false)
    setHiddenRoom(roomID)
    setShowInfo(true)
    setTimeout(() => {
      setShowNestedInfo(true)
    }, 700)
    if (hiddenRoom === roomID) {
      setShowInfo(!showInfo)
    }
  }
//h-6 w-fit flex flex-col items-center justify-center px-2 rounded bg-light-purple opacity-70 shadow-1-1-4 cursor-pointer hover:shadow-1-1-4-inner hover:bg-red-200  hover:line-through hove:opacity-100

 const clas2 = 'h-48'
  return(
    <div className="flex flex-col w-full">
      <button type="button" onClick={handleShowForm} className="border border-border-grey cursor-pointer hover:shadow-1-1-4-inner hover:bg-light-purple w-full">Add a ride</button>
      {/* <div className={`border-2 border-red-500 h-10 ${showInfo ? clas2 : null}`}>
        <p>hui</p> 
      </div> */}
      {showForm ? (
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 h-fit items-center justify-center py-2'>
          <div className='flex w-4/5 justify-around'>
            <label className='flex flex-col gap-1 cursor-pointer'>
              <input type='radio' name='route' value='pickup' className="border text-s border-border-grey px-1 cursor-pointer" onClick={handlePickUpClick} onInput={handleChange}></input>
              <p className='text-xs'>Pickup</p>
            </label>
            <label className='flex flex-col gap-1 cursor-pointer'>
              <input type='radio' name='route' value='transfer' className="border text-s border-border-grey px-1 cursor-pointer" onClick={handleTransferClick} onInput={handleChange}></input>
              <p className='text-xs'>Transfer</p>
            </label>
          </div>
          {isTransferClicked ? (
            <>
              <input type='text' name='room' ref={dataRef} className="border text-xs border-border-grey w-4/5 p-1" placeholder='Room' onInput={handleChange}></input>
              <input type='date' name="time" ref={valueRef} className="border text-xs border-border-grey w-4/5 p-1"  placeholder='Time' onInput={handleChange}></input> 
              <input type='text' name='pax' ref={dataRef} className="border text-xs border-border-grey w-4/5 p-1" placeholder='Pax' onInput={handleChange}></input>
            </>
          ) : (
            <>
              <input type='text' name='room' ref={dataRef} className="border text-xs border-border-grey w-4/5 p-1" placeholder='Room' onInput={handleChange}></input>
              <input type='datetime-local' name="time" ref={valueRef} className="border text-xs border-border-grey w-4/5 p-1"  placeholder='Time' onInput={handleChange}></input> 
              <input type='text' name='flight' ref={dataRef} className="border text-xs border-border-grey w-4/5 p-1" placeholder='Flight number' onInput={handleChange}></input>
              <input type='text' name='pax' ref={dataRef} className="border text-xs border-border-grey w-4/5 p-1" placeholder='Pax' onInput={handleChange}></input>
              <input type='tel' name='tel' ref={dataRef} className="border text-xs border-border-grey w-4/5 p-1" placeholder='Phone number' onInput={handleChange}></input>
            </>
          )}
          <button type="submit" className="border border-border-grey cursor-pointer hover:shadow-1-1-4-inner hover:bg-light-purple w-4/5">Save</button>
        </form>
      ) : (
        <div className="flex flex-wrap justify-center items-center gap-2 p-2">
        {savedData ? (savedData.map((room) => {
          const dateTime = room.time.split('T')
          const fullDate = dateTime[0].split('-')
          const time = dateTime[1]
          const [year, month, date] = fullDate
            return (
              // {route: 'transfer', room: '7898', flight: 'su778', time: '12:23', pax: '1'} 
                <div onClick={() => handleShowInfo(room.room)} id={room.room} className={`${showInfo && hiddenRoom === room.room ? clas2 : 'h-6'} w-fit items-center justify-center px-2 rounded bg-light-purple opacity-70 shadow-1-1-4 cursor-pointer transition-height duration-700 overflow-scroll hover:shadow-1-1-4-inner hover:opacity-100`}>
                  <p className={` pointer-events-none ${showInfo && hiddenRoom === room.room ? 'hidden' : 'flex flex-wrap'} items-center`}>
                    {`${date}.${month}`} {time} {<img className='w-5 h-5 ml-2' src={room.route === 'pickup' ? arrivals : departures}/>}
                  </p>
                  {showInfo && hiddenRoom === room.room && (
                    <div className={`${showNestedInfo ? 'opacity-100' : 'opacity-0'} flex flex-col transition-opacity`}>
                      <div className='flex gap-2 self-end mt-2' >
                        <div onClick={handleDelete} id={room.room}>
                          <img className='w-4 h-4' src={setting} ></img>
                        </div>
                        <div onClick={handleDelete} id={room.room}>
                          <img className='w-4 h-4' src={setting} ></img>  
                        </div>
                      </div>
                      <p>Route: {room.route}</p>
                      <p>Date: {fullDate.join('-')}</p>
                      <p>Time: {time}</p>
                      <p>Room: {room.room}</p>  
                      <p>Flight: {room.flight}</p>
                      <p>Pax: {room.pax}</p>  
                      <p>Ph: {room.tel}</p>
                    </div>
                  )}
                </div>
            )
          })) : (null)}
          {isDeleted ? (
            <div className="cursor-pointer opacity-50 hover:opacity-100 transition-opacity" onClick={handleUnDo}>
              <img className="w-5 h-5 cursor-pointer" src={undoImg}  />
            </div>
            ) : (null)}
      </div>
      )}
    </div>
  )
}

export default Taxi