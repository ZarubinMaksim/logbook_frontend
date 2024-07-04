import deleteBtn from '../../../images/delete.png'
import popupBtn from '../../../images/popup.png'
import ElementHoverOptions from '../logbooks_components/ElementHoverOptions'
import InvoiceContent from './InvoiceContent'

function InvoiceList ({ elementList, mouseEnter, mouseLeave, showOptions, elementId, handleDelete, handleShowPopup,  }) {

  return (

    <div className="flex flex-wrap justify-center items-center gap-2 p-2">
    {elementList && (
      elementList.map((invoice) => {
        return (
        <div 
          // onClick={() => handleShowInfo(invoice)}
          onMouseEnter={() => mouseEnter(invoice._id)}
          onMouseLeave={mouseLeave}
          className={`w-22 h-8 flex items-center justify-center rounded bg-blue opacity-70 shadow-1-1-4 hover:shadow-1-1-4-inner cursor-pointer hover:opacity-100 transition`}>
          {showOptions && elementId === invoice._id ? 
            (
              <ElementHoverOptions handleShowPopup={handleShowPopup} handleDelete={handleDelete} element={invoice}/>
            //   <div className="flex justify-between w-full h-full">
            //   <div className="flex items-center justify-center hover:bg-green-200 w-1/2" onClick={() => handleShowInfo(invoice)}>
            //     <img src={popupBtn} className='w-4'/>
            //   </div>
            //   <div className="flex items-center justify-center hover:bg-red-200 w-1/2" onClick={() => handleDelete(invoice)}>
            //     <img src={deleteBtn} className='w-4'/>
            //   </div>              
            // </div>
            ) : (
              <InvoiceContent element={invoice} />
            //   <div className="flex gap-1">
            //   <img src={homeIcon} className='w-4 h-4 mt-0.5'></img>
            //   <p className={` pointer-events-none ${showInfo && hiddenRoom === invoice.room ? 'hidden' : 'flex flex-wrap'} items-center`}>
            //     {invoice.room}
            //   </p>
            // </div>
            )}


        </div>
        
        )
      })
    )}
              {/* <UndoButton 
      isDeleted={isDeleted}
      isDeletedFromPopup={isDeletedFromPopup}
      handleUnDo={handleUnDo} /> */}
  </div>
  )
}

export default InvoiceList