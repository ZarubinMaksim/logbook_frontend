import { useEffect, useState } from "react"
import Button from "../logbooks_components/Button";
import MainApi from "../../../utils/MainApi";
import InvoiceList from "./InvoiceList";
import InvoiceForm from "./InvoiceForm";

function Invoice({
  handleShowPopup, 
  handleChange,
  isDeletedFromPopup, 
  isUpdatedFromPopup
  }) {

  const [invoice, setInvoice] = useState()
  const [invoicesList, setInvoicesList] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [elementId, setElementId] = useState(null)

// ------------*** START Component Content updaters ***------------
  useEffect(() => {
    const cachedInvoices = JSON.parse(localStorage.getItem('invoices'))
    if (cachedInvoices) {
      setInvoicesList(cachedInvoices)
    }

    updateInvoices()
  }, [])

  useEffect(() => {
    updateInvoices()
  }, [isUpdatedFromPopup])

  useEffect(() => {
    updateInvoices()
  }, [isDeletedFromPopup])
// ------------*** END Component Content updaters ***------------

// ------------*** START Component API's ***------------

  const handleSubmit = (e) => {
    e.preventDefault()
    const {room, company, vat, details, email} = invoice
    MainApi.setInvoice(room, company, vat, details, email)
    .then((response) => {
      const newInvoice = response.data
      setInvoicesList([...invoicesList, newInvoice])
    })
    setShowForm(!showForm)
  }

  const updateInvoices = () => {
    MainApi.getInvoices()
    .then((invoices) => {
      setInvoicesList(invoices.data)
      localStorage.setItem('invoices', JSON.stringify(invoices.data))
    })
    .catch((err) => {
      console.log('Error fetching alarms:', err)
    })
  }

  const handleDelete = (element) => {
    MainApi.deleteInvoice(element._id)
    const updatedInvoicesList = invoicesList.filter((elem) => elem._id !== element._id)
    setInvoicesList(updatedInvoicesList)
    localStorage.setItem('invoices', JSON.stringify(updatedInvoicesList))
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
    <div className="flex flex-col gap-2 w-full">
      <Button type='button' title='Add an Invoice' showForm={handleShowForm}/>      
      {showForm ? (
        <InvoiceForm elementList={setInvoice} element={invoice} handleSubmit={handleSubmit} handleChange={handleChange}/>
      ) : (
        <InvoiceList elementList={invoicesList} mouseEnter={mouseEnter} mouseLeave={mouseLeave} showOptions={showOptions} elementId={elementId} handleDelete={handleDelete} handleShowPopup={handleShowPopup}/>
      )}
    </div>
  )
}

export default Invoice