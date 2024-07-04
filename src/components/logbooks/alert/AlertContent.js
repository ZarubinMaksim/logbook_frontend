import homeIcon from '../../../images/home.png'
import alertIcon from '../../../images/alertIcon.png'

function AlertContent ({ element }) {

  const isTooLong = element.alertText.length > 12

  return(
    <div className='flex flex-col items-center gap-0.5' id={element.room}>
    <div className="flex gap-2">
      <img src={homeIcon} className='w-4 h-4 mt-0.5'></img>
      <p className='' id={element.room}>{element.room}</p> 
    </div>

    <div className="flex gap-2">
      <img src={alertIcon} className='w-4 h-4 mt-0.5'></img>
      <p>{isTooLong ? `${element.alertText.slice(0,14)}...` : element.alertText}</p>
    </div>

  </div>
  )
}

export default AlertContent