import ElementHoverOptions from '../logbooks_components/ElementHoverOptions'
import TaxiContent from './TaxiContent'

function TaxiList ({ elementList, mouseEnter, mouseLeave, showOptions, elementId, handleShowPopup, handleDelete,  }) {

  return (

    <div className="flex flex-wrap justify-center items-center gap-2 p-2">
    {elementList ? (elementList.map((room) => {
    const dateTime = room.date.split('T')
    const fullDate = dateTime[0].split('-')
    const time = dateTime[1]
    const [year, month, date] = fullDate
      return (
        // {route: 'transfer', room: '7898', flight: 'su778', time: '12:23', pax: '1'} 
          <div onMouseEnter={() => mouseEnter(room._id)} onMouseLeave={mouseLeave} id={room.room} className={` w-48 h-8 flex items-center justify-center rounded bg-blue opacity-70 shadow-1-1-4 hover:shadow-1-1-4-inner cursor-pointer hover:opacity-100 transition`}>
            {showOptions && elementId === room._id ? (
              <ElementHoverOptions handleShowPopup={handleShowPopup} handleDelete={handleDelete} element={room}/>
              
              // <div className="flex justify-between w-full h-full">
              //   <div className="flex items-center justify-center hover:bg-green-200 w-1/2" onClick={() => handleShowInfo(room)}>
              //     <img src={popupBtn} className='w-4'/>
              //   </div>
              //   <div className="flex items-center justify-center hover:bg-red-200 w-1/2" onClick={() => handleDelete(room)}>
              //     <img src={deleteBtn} className='w-4'/>
              //   </div>              
              // </div>
            ) : (
              <TaxiContent date={date} month={month} time={time} element={room}/>
          //   <div className='flex items-center gap-2'>
          //     <div className="flex gap-1">
          //       <img src={calendarIcon} className='w-4 h-4 mt-0.5'></img>
          //       <p className={`pointer-events-none flex flex-wrap items-center`}>{`${date}.${month}`}</p>
          //     </div>

          //   {time && 
          //     <div className="flex gap-1">
          //       <img src={clockIcon} className='w-4 h-4 mt-0.5'></img>
          //       <p> {time} </p>
          //     </div>
          //   }
          //   {<img className='w-4 h-4 ml-2' src={room.route === 'pickup' ? arrivals : departures}/>}
          // </div>
              )}

          </div>
      )
    })) : (null)}
    {/* <UndoButton 
      isDeleted={isDeleted}
      isDeletedFromPopup={isDeletedFromPopup}
      handleUnDo={handleUnDo} /> */}
    
</div>
  )
}

export default TaxiList