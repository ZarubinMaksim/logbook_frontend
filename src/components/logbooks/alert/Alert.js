import { useEffect, useState } from "react";
import MainApi from "../../../utils/MainApi";
import AlertForm from "./AlertForm";
import AlertList from "./AlertList";

function Alert({
  handleShowPopup, 
  handleChange,
  isDeletedFromPopup, 
  isUpdatedFromPopup
}) {

  const [alert, setAlert] = useState();
  const [alertsList, setAlertsList] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [elementId, setElementId] = useState(null);

// ------------*** START Component Content updaters ***------------
  useEffect(() => {
    const cachedAlerts = JSON.parse(localStorage.getItem('alerts'));
    if (cachedAlerts) {
      setAlertsList(cachedAlerts);
    }

    updateAlerts();
  }, []);

  useEffect(() => {
    updateAlerts();
  }, [isUpdatedFromPopup]);

  useEffect(() => {
    updateAlerts();
  }, [isDeletedFromPopup]);
// ------------*** END Component Content updaters ***------------

// ------------*** START Component API's ***------------
  const handleSubmit = (e) => {
    e.preventDefault();
    const {room, alertText} = alert;
    MainApi.setAlert(room, alertText)
    .then((response) => {
      const newAlert = response.data;
      setAlertsList([...alertsList, newAlert]);
    });
  };

  const handleDelete = (element) => {
    MainApi.deleteAlert(element._id)
    const updatedAlertsList = alertsList.filter((elem) => elem._id !== element._id);
    setAlertsList(updatedAlertsList);
    localStorage.setItem('alerts', JSON.stringify(updatedAlertsList));
  }

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
// ------------*** END Component API's ***------------

// ------------*** START EventListeners ***------------

  const mouseEnter = (currentElementId) => {
    setShowOptions(true)
    setElementId(currentElementId)
  }

  const mouseLeave = () => {
    setShowOptions(false)
  }

// ------------*** END EventListeners ***------------ 

  return(
    <div className="flex flex-col w-full">
      <AlertForm 
        elementList={setAlert} 
        element={alert} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit}/>
      <AlertList 
        elementList={alertsList} 
        mouseEnter={mouseEnter} 
        mouseLeave={mouseLeave} 
        showOptions={showOptions} 
        elementId={elementId} 
        handleDelete={handleDelete} 
        handleShowPopup={handleShowPopup}/>
    </div>
  )
}

export default Alert