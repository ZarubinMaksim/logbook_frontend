import ElementHoverOptions from '../logbooks_components/ElementHoverOptions';
import AlarmContent from './AlarmContent';

function AlarmList ({ 
  elementList, 
  mouseEnter, 
  mouseLeave, 
  showOptions, 
  elementId, 
  handleShowPopup, 
  handleDelete }) {

  const currentTime = new Date()

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 p-2">
      {elementList && elementList.map((element) => {
        const alarmTime = new Date(element.date)
        const isToday = alarmTime.getDate() === currentTime.getDate() && alarmTime.getMonth() === currentTime.getMonth() && alarmTime.getFullYear() === currentTime.getFullYear()
        const isElementHovered = showOptions && elementId === element._id;

        return(
          <div 
            onMouseEnter={() => mouseEnter(element._id)} 
            onMouseLeave={mouseLeave} 
            className={`w-22 h-22 flex items-center justify-center rounded ${isToday ? 'bg-red-200' : 'bg-blue' } shadow-1-1-4 hover:shadow-1-1-4-inner cursor-pointer hover:opacity-100 transition`}
            >
            {isElementHovered ? (
              <ElementHoverOptions element={element} handleShowPopup={handleShowPopup} handleDelete={handleDelete} />
            ) : (
              <AlarmContent element={element} isToday={isToday} alarmTime={alarmTime} />
            )}
          </div>
        );
      })}
    </div>
  )
}

export default AlarmList;