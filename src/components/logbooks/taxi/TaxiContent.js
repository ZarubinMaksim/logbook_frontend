import calendarIcon from '../../../images/calendar.png'
import clockIcon from '../../../images/clock.png'
import arrivals from '../../../images/arrivals.png'
import departures from '../../../images/departures.png'

function TaxiContent ({ date, month, time, element}) {

  return (
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
      {<img className='w-4 h-4 ml-2' src={element.route === 'pickup' ? arrivals : departures}/>}
    </div>
  )
}

export default TaxiContent;