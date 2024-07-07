import { useEffect, useState } from "react"
import MainApi from "../../../utils/MainApi"
import AlertForm from "./AlertForm"
import AlertList from "./AlertList"

function Alert({title, setIsPopupOpened, setPopupData, setPopupTitle, isDeletedFromPopup, isUpdatedFromPopup}) {
  const [showOptions, setShowOptions] = useState(false)
  const [elementId, setElementId] = useState(null)

  const [alert, setAlert] = useState()
  const [alertsList, setAlertsList] = useState([])

  const handleChange = (e) => {
    const {name, value} = e.target
    setAlert({...alert, [name]: value})
  }

  const handleSubmit = (e) => {
    console.log('alert succsesful in alert.js')
    e.preventDefault()
    console.log('43434', alert)
    const {room, alertText} = alert
    MainApi.setAlert(room, alertText)
    .then((response) => {
      const newAlert = response.data
      setAlertsList([...alertsList, newAlert])
    })
  }

  const handleDelete = (element) => {
    MainApi.deleteAlert(element._id)
    const updatedAlertsList = alertsList.filter((elem) => elem._id !== element._id)
    setAlertsList(updatedAlertsList)
    localStorage.setItem('alerts', JSON.stringify(updatedAlertsList))
  }

  useEffect(() => {
    const cachedAlerts = JSON.parse(localStorage.getItem('alerts'))
    if (cachedAlerts) {
      setAlertsList(cachedAlerts)
    }

    updateAlerts()
  }, [])

  useEffect(() => {
    updateAlerts()
  }, [isUpdatedFromPopup])

  const updateAlerts = () => {
    MainApi.getAlerts()
    .then((alerts) => {
      setAlertsList(alerts.data)
      localStorage.setItem('alerts', JSON.stringify(alerts.data))
    })
    .catch((err) => {
      console.log('Error fetching alarms:', err)
    })
  }

  useEffect(() => {
    updateAlerts()
  }, [isDeletedFromPopup])

  const mouseEnter = (currentElementId) => {
    setShowOptions(true)
    setElementId(currentElementId)
  }

  const mouseLeave = () => {
    setShowOptions(false)
  }

  const handleShowPopup = (data) => {
      setIsPopupOpened(true)
      setPopupData(data)
      setPopupTitle(title)
  }

  return(
    <div className="flex flex-col w-full">
      <AlertForm handleChange={handleChange} handleSubmit={handleSubmit}/>
      <AlertList elementList={alertsList} mouseEnter={mouseEnter} mouseLeave={mouseLeave} showOptions={showOptions} elementId={elementId} handleDelete={handleDelete} handleShowPopup={handleShowPopup}/>
      {/* <form className='flex' onSubmit={handleSubmit}>
        <input className="border text-xs border-border-grey w-1/3 px-1" name="room" placeholder="Room" onInput={handleChange} maxLength='6' required></input>
        <input className="border text-xs border-border-grey w-full px-1" name="alertText" placeholder="Enter Alert" onInput={handleChange} maxLength='' required></input>
        <Button type='submit' title='+' width='w-1/5'/>
      </form> */}

      {/* <div className="flex flex-col justify-center items-center gap-2 p-2">
        {alertsList ? (alertsList.map((element) => {

          // const isTooLong = element.alertText.length > 12


          return(
            <div 
              onMouseEnter={() => mouse(element.room)} 
              onMouseLeave={mouse2} 
              id={element.room} 
              className="w-full min-h-12 h-14 flex items-center justify-center rounded bg-blue opacity-70 shadow-1-1-4 hover:shadow-1-1-4-inner cursor-pointer hover:opacity-100 transition">
            {content && idE === element.room ? 
            (
              <div className="flex justify-between w-full h-full">
                <div className="flex items-center justify-center hover:bg-green-200 w-1/2" onClick={() => handleAlert(element)}>
                  <img src={popupBtn} className='w-4'/>
                </div>
                <div className="flex items-center justify-center hover:bg-red-200 w-1/2" onClick={() => handleDelete(element)}>
                  <img src={deleteBtn} className='w-4'/>
                </div>              
              </div>
            ) : 
            (
              <AlertContent element={element}/>
              // <div className='flex flex-col items-center gap-0.5' id={element.room}>
              //   <div className="flex gap-2">
              //     <img src={homeIcon} className='w-4 h-4 mt-0.5'></img>
              //     <p className='' id={element.room}>{element.room}</p> 
              //   </div>

              //   <div className="flex gap-2">
              //     <img src={alertIcon} className='w-4 h-4 mt-0.5'></img>
              //     <p>{isTooLong ? `${element.alertText.slice(0,14)}...` : element.alertText}</p>
              //   </div>

              // </div>

            ) }
            
          </div>
          )

        })) : (null)}
        <UndoButton 
          isDeleted={isDeleted}
          handleUnDo={handleUnDo}/>
      </div> */}
    </div>
  )
}

export default Alert