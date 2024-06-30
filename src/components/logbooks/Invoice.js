import { useEffect, useState } from "react"
import Form from "../Forms/Form";
import homeIcon from '../../images/home.png'
import deleteBtn from '../../images/delete.png'
import popupBtn from '../../images/popup.png'
import Button from "./logbooks_components/Button";
import UndoButton from "./logbooks_components/UndoButton";
import MainApi from "../../utils/MainApi";

function Invoice({title, setIsPopupOpened, setPopupTitle, setPopupData, handleUnDo, isDeleted, isDeletedFromPopup, isUpdatedFromPopup}) {
  const [showForm, setShowForm] = useState(false)
  const [hiddenRoom, setHiddenRoom] = useState(null)
  const [showNestedInfo, setShowNestedInfo] = useState(false);
  const [showInfo, setShowInfo] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [elementId, setElementId] = useState(null)

//---------------------
  const [invoice, setInvoice] = useState()
  const [invoicesList, setInvoicesList] = useState([])

  const handleChange = (e) => {
    const {name, value} = e.target
    setInvoice({...invoice, [name]: value})
  }

  const handleSubmit = (e) => {
    console.log('invoice succsesful in alert.js')
    e.preventDefault()
    console.log('43434', invoice)
    const {room, company, vat, details, email} = invoice
    MainApi.setInvoice(room, company, vat, details, email)
    .then((response) => {
      const newInvoice = response.data
      setInvoicesList([...invoicesList, newInvoice])
    })
    setShowForm(!showForm)
  }

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
    console.log('this is delete')
    MainApi.deleteInvoice(element._id)
    const updatedInvoicesList = invoicesList.filter((elem) => elem._id !== element._id)
    setInvoicesList(updatedInvoicesList)
    localStorage.setItem('invoices', JSON.stringify(updatedInvoicesList))
  }

  useEffect(() => {
    updateInvoices()
  }, [isDeletedFromPopup])
  
//---------------------


  const handleShowForm = () => {
    setShowForm(!showForm)
  }

  const mouseHover = (id) => {
    setShowContent(true)
    setElementId(id)
  }

  const handleShowInfo = (rd) => {
    console.log('hui')
    setPopupTitle(title)
    setIsPopupOpened(true)
    setPopupData(rd)
  }

  // const handleSubmitForm = (event) => {
  //   handleSubmit(event)
  //   setShowForm(!showForm)
  // }

  return(
    <div className="flex flex-col gap-2 w-full">
      <Button type='button' title='Add an Invoice' showForm={handleShowForm}/>      
      {showForm ? (
        <Form onSubmit={handleSubmit} onChange={handleChange} title={title}/>
      ) : (
        <div className="flex flex-wrap justify-center items-center gap-2 p-2">
          {invoicesList && (
            invoicesList.map((invoice) => {
              return (
              <div 
                // onClick={() => handleShowInfo(invoice)}
                onMouseEnter={() => mouseHover(invoice._id)}
                onMouseLeave={() => setShowContent(false)}
                className={`w-22 h-8 flex items-center justify-center rounded bg-blue opacity-70 shadow-1-1-4 hover:shadow-1-1-4-inner cursor-pointer hover:opacity-100 transition`}>
                {showContent && elementId === invoice._id ? 
                  (
                    <div className="flex justify-between w-full h-full">
                    <div className="flex items-center justify-center hover:bg-green-200 w-1/2" onClick={() => handleShowInfo(invoice)}>
                      <img src={popupBtn} className='w-4'/>
                    </div>
                    <div className="flex items-center justify-center hover:bg-red-200 w-1/2" onClick={() => handleDelete(invoice)}>
                      <img src={deleteBtn} className='w-4'/>
                    </div>              
                  </div>
                  ) : (
                    <div className="flex gap-1">
                    <img src={homeIcon} className='w-4 h-4 mt-0.5'></img>
                    <p className={` pointer-events-none ${showInfo && hiddenRoom === invoice.room ? 'hidden' : 'flex flex-wrap'} items-center`}>
                      {invoice.room}
                    </p>
                  </div>
                  )}


              </div>
              
              )
            })
          )}
                    <UndoButton 
            isDeleted={isDeleted}
            isDeletedFromPopup={isDeletedFromPopup}
            handleUnDo={handleUnDo} />
        </div>
      )}
    </div>
  )
}

export default Invoice