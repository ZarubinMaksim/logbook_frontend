import homeIcon from '../../../images/home.png'
import umbrellaIcon from '../../../images/umbrella-blue.png'

function UmbrellaContent ({ element }) {
  return (
    <div className="flex gap-2">
      <div className="flex gap-1">
        <img src={homeIcon} className='w-4 h-4 mt-0.5'></img>
        <p className='' id={element.room}>{element.room}</p>
      </div>
      <div className="flex gap-1"> 
        <img src={umbrellaIcon} className='w-4 h-4 mt-0.5'></img>
        <p>{element.umbrella}</p>  
      </div>
    </div>
  )
}

export default UmbrellaContent