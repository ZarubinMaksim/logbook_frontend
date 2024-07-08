import ElementHoverOptions from '../logbooks_components/ElementHoverOptions'
import InvoiceContent from './InvoiceContent'

function InvoiceList ({ 
  elementList, 
  mouseEnter, 
  mouseLeave, 
  showOptions, 
  elementId, 
  handleDelete, 
  handleShowPopup,  
}) {

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 p-2">
      {elementList && elementList.map((invoice) => {
        const isElementHovered = showOptions && elementId === invoice._id
          return (
            <div 
              onMouseEnter={() => mouseEnter(invoice._id)}
              onMouseLeave={mouseLeave}
              className={`w-22 h-8 flex items-center justify-center rounded bg-blue opacity-70 shadow-1-1-4 hover:shadow-1-1-4-inner cursor-pointer hover:opacity-100 transition`}
              >
              {isElementHovered ? (
                <ElementHoverOptions handleShowPopup={handleShowPopup} handleDelete={handleDelete} element={invoice}/>
              ) : (
                <InvoiceContent element={invoice} />
              )}
            </div>
          )
        })
      }
    </div>
  )
}

export default InvoiceList