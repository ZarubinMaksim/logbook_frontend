import homeIcon from '../../../images/home.png';
import calendarIcon from '../../../images/calendar.png';
import clockIcon from '../../../images/clock.png';

function AlarmContent ({ 
  element, 
  isToday, 
  alarmTime
  }) {

  return (
    <div className='flex flex-col items-center gap-0.5'>
      <div className="flex gap-1">
        <img src={homeIcon} className='w-4 h-4 mt-0.5'></img>
        <p>{element.room}</p>  
      </div>

      <div className="flex gap-1">
        <img src={calendarIcon} className='w-4 h-4 mt-0.5'></img>
        <p>{isToday ? 'Today' : `${alarmTime.getDate().toString().padStart(2, '0')}/${alarmTime.getMonth().toString().padStart(2, '0')}`}</p> 
      </div>

      <div className="flex gap-1">
        <img src={clockIcon} className='w-4 h-4 mt-0.5'></img>
        <p>{alarmTime.getHours()}:{alarmTime.getMinutes().toString().padStart(2, '0')}</p>
      </div>
    </div>
  )
}

export default AlarmContent;