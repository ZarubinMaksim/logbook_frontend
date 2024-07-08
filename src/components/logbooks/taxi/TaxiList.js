import ElementHoverOptions from '../logbooks_components/ElementHoverOptions'
import TaxiContent from './TaxiContent'

function TaxiList ({ 
  elementList, 
  mouseEnter, 
  mouseLeave, 
  showOptions, 
  elementId, 
  handleShowPopup, 
  handleDelete
  }) {

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 p-2">
      {elementList && elementList.map((room) => {
        const dateTime = room.date.split('T')
        const fullDate = dateTime[0].split('-')
        const time = dateTime[1]
        const [year, month, date] = fullDate
        const isElementHovered = showOptions && elementId === room._id
        return (
          <div onMouseEnter={() => mouseEnter(room._id)} onMouseLeave={mouseLeave} id={room.room} className={` w-48 h-8 flex items-center justify-center rounded bg-blue opacity-70 shadow-1-1-4 hover:shadow-1-1-4-inner cursor-pointer hover:opacity-100 transition`}>
            {isElementHovered ? (
              <ElementHoverOptions handleShowPopup={handleShowPopup} handleDelete={handleDelete} element={room}/>
              ) : (
              <TaxiContent date={date} month={month} time={time} element={room}/>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default TaxiList