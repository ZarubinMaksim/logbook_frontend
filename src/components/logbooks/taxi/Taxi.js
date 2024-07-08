import { useEffect, useState } from 'react'
import Button from '../logbooks_components/Button'
import MainApi from '../../../utils/MainApi'
import TaxiList from './TaxiList'
import TaxiForm from './TaxiForm'

function Taxi({ 
  handleChange,
  handleShowPopup, 
  isDeletedFromPopup, 
  isUpdatedFromPopup
  }) {
  const [taxi, setTaxi] = useState()
  const [taxiesList, setTaxiesList] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [elementId, setElementId] = useState(null)
  
  // ------------*** START Component Content updaters ***------------
  useEffect(() => {
    const cachedTaxies = JSON.parse(localStorage.getItem('taxies'))
    if (cachedTaxies) {
      setTaxiesList(cachedTaxies)
    }
    updateTaxies()
  }, [])

  useEffect(() => {
    updateTaxies()
  }, [isUpdatedFromPopup])

  useEffect(() => {
    updateTaxies()
  }, [isDeletedFromPopup])
  // ------------*** END Component Content updaters ***------------

  // ------------*** START Component API's ***------------
  const handleSubmit = (e) => {
    e.preventDefault()
    const { route, room, date, flight, pax, phone } = taxi
    MainApi.setTaxi(route, room, date, flight, pax, phone)
    .then((response) => {
      const newTaxi = response.data
      setTaxiesList([...taxiesList, newTaxi])
    })
    setShowForm(!showForm)
  }

  const handleDelete = (element) => {
    MainApi.deleteTaxi(element._id)
    const updatedTaxiesList = taxiesList.filter((elem) => elem._id !== element._id)
    setTaxiesList(updatedTaxiesList)
    localStorage.setItem('taxies', JSON.stringify(updatedTaxiesList))
  }

  const updateTaxies = () => {
    MainApi.getTaxies()
    .then((taxies) => {
      setTaxiesList(taxies.data)
      localStorage.setItem('taxies', JSON.stringify(taxies.data))
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

// ------------*** OTHER ***------------
  
  const handleShowForm = () => {
    setShowForm(!showForm)
  }

  return(
    <div className="flex flex-col w-full">
      <Button type='button' title='Add a ride' showForm={handleShowForm}/>
      {showForm ? (
        <TaxiForm elementList={setTaxi} element={taxi} handleChange={handleChange} handleSubmit={handleSubmit}/>
      ) : (
        <TaxiList elementList={taxiesList} mouseEnter={mouseEnter} mouseLeave={mouseLeave} showOptions={showOptions} elementId={elementId} handleDelete={handleDelete} handleShowPopup={handleShowPopup}/>
      )}
    </div>
  )
}

export default Taxi