import { useEffect, useState } from "react"
import MainApi from "../../../utils/MainApi"
import UmbrellaForm from "./UmbrellaForm"
import UmbrellaList from "./UmbrellaList"

function Umbrella({ 
  handleChange,
  handleShowPopup, 
  isUpdatedFromPopup,
  isDeletedFromPopup
  }) {

  const [showOptions, setShowOptions] = useState(false)
  const [elementId, setElementId] = useState(null)
  const [umbrella, setUmbrella] = useState()
  const [umbrellasList, setUmbrellasList] = useState([])

  // ------------*** START Component Content updaters ***------------
  useEffect(() => {
    const cachedUmbrellas = JSON.parse(localStorage.getItem('umbrellas'))
    if (cachedUmbrellas) {
      setUmbrellasList(cachedUmbrellas)
    }
    updateUmbrellas()
  }, [])

  useEffect(() => {
    updateUmbrellas()
  }, [isUpdatedFromPopup])

  useEffect(() => {
    updateUmbrellas()
  }, [isDeletedFromPopup])
  // ------------*** END Component Content updaters ***------------


  // ------------*** START Component API's ***------------
  const handleSubmit = (e) => {
    e.preventDefault()
    const { room, umbrellas } = umbrella
    MainApi.setUmbrella(room, umbrellas)
    .then((response) => {
      const newUmbrella = response.data
      setUmbrellasList([...umbrellasList, newUmbrella])
    })
  }

  const updateUmbrellas = () => {
    MainApi.getUmbrellas()
    .then((umbrellas) => {
      setUmbrellasList(umbrellas.data)
      localStorage.setItem('umbrellas', JSON.stringify(umbrellas.data))
    })
    .catch((err) => {
      console.log('Error fetching alarms:', err)
    })
  }

  const handleDelete = (element) => {
    MainApi.deleteUmbrella(element._id)
    const updatedUmbrellaList = umbrellasList.filter((elem) => elem._id !== element._id)
    setUmbrellasList(updatedUmbrellaList)
    localStorage.setItem('umbrellas', JSON.stringify(updatedUmbrellaList))
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
    <div className="flex flex-col">
      <UmbrellaForm 
        elementList={setUmbrella} 
        element={umbrella} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit}
      /> 
      <UmbrellaList 
        elementList={umbrellasList} 
        mouseEnter={mouseEnter} 
        mouseLeave={mouseLeave} 
        showOptions={showOptions} 
        elementId={elementId} 
        handleDelete={handleDelete} 
        handleShowPopup={handleShowPopup}
      />
    </div>
  )
}

export default Umbrella