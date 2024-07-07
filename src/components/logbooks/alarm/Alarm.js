import { useEffect, useState } from "react"
import MainApi from "../../../utils/MainApi"
import AlarmForm from "./AlarmForm"
import AlarmList from "./AlarmList"

function Alarm({ 
  setPopupData,
  setIsPopupOpened,
  setPopupTitle,
  isUpdatedFromPopup,
  title,
}) {

  const [alarm, setAlarm] = useState()
  const [alarmsList, setAlarmsList] = useState()
  const [showOptions, setShowOptions] = useState(false)
  const [elementId, setElementId] = useState(null)

  const currentTime = new Date()

  // ------------*** START Mouse enter handlers ***------------
  const mouseEnter = (currentElementId) => {
    setShowOptions(true)
    setElementId(currentElementId)
  }

  const mouseLeave = () => {
    setShowOptions(false)
  }
  // ------------*** END Mouse enter handlers ***------------

  // ----------NEED to CHECK AND REWIEW----------
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date()
      alarmsList && alarmsList.forEach(element => { //tut mozhet bit' problema
        const alarmTime = new Date(element.time);
        if (
        alarmTime.getDate() === currentTime.getDate() &&
        alarmTime.getMonth() === currentTime.getMonth() &&
        alarmTime.getFullYear() === currentTime.getFullYear() &&
        alarmTime.getHours() === currentTime.getHours() &&
        alarmTime.getMinutes() === currentTime.getMinutes()) {

          alert(`Alert for room: ${element.room}`);
        } else {
          
        }
      });
    }, 30000); // Проверка каждую минуту

    return () => clearInterval(intervalId); // Очищаем интервал при размонтировании компонента
  }, [currentTime]);
// ___________________________________NEED TO CHECK UP CODE



// ------------*** START Component Content updaters ***------------
  // Update on initialization
  useEffect(() => {
    const cachedAlarms = JSON.parse(localStorage.getItem('alarms'))
    if (cachedAlarms) {
      setAlarmsList(cachedAlarms)
    }

    updateAlarms()
  }, [])

  // update after popup options
  useEffect(() => {
    updateAlarms()
  }, [isUpdatedFromPopup])

// ------------*** END Component Content updaters ***------------



// ------------*** START Component API's ***------------
  
// update API
  const updateAlarms = () => {
    MainApi.getAlarms()
    .then((alarms) => {
      setAlarmsList(alarms.data)
      localStorage.setItem('alarms', JSON.stringify(alarms.data))
    })
    .catch((err) => {
      console.log('Error fetching alarms:', err)
    })
  }

  // delete API
  const handleDelete = (element) => {
    MainApi.deleteAlarm(element._id)
    const updatedAlarmsList = alarmsList.filter((elem) => elem._id !== element._id)
    setAlarmsList(updatedAlarmsList)
    localStorage.setItem('alarms', JSON.stringify(updatedAlarmsList))
  }

  // create API
  const handleSubmit = (e) => {
    e.preventDefault()
    const {room, date} = alarm
    MainApi.setAlarm(room, date)
    .then((response) => {
      const newAlarm = response.data
      setAlarmsList([...alarmsList, newAlarm])
    })
  }

// ------------*** END Component API's ***------------

  

// ------------*** START Other functions ***------------
  
  // update inputs
  const handleChange = (e) => {
    const {name, value} = e.target
    setAlarm({...alarm, [name]: value})
  }

  const handleShowPopup = (data) => {
    setIsPopupOpened(true)
    setPopupData(data)
    setPopupTitle(title)
  }

// ------------*** END Other functions ***------------

  return(
    <div className="flex flex-col w-full">
      <AlarmForm handleChange={handleChange} handleSubmit={handleSubmit}/>
      <AlarmList 
        elementList={alarmsList} 
        mouseEnter={mouseEnter} 
        mouseLeave={mouseLeave} 
        showOptions={showOptions} 
        elementId={elementId} 
        handleShowPopup={handleShowPopup} 
        handleDelete={handleDelete}/>
    </div>
  )
}

export default Alarm