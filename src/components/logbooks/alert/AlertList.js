import ElementHoverOptions from '../logbooks_components/ElementHoverOptions'
import AlertContent from './AlertContent'

function AlertList ({ 
  elementList, 
  mouseEnter, 
  mouseLeave, 
  showOptions, 
  elementId, 
  handleDelete, 
  handleShowPopup 
}) {

  return(
    <div className="flex flex-col justify-center items-center gap-2 p-2">
      {elementList && elementList.map((element) => {
        const isElementHovered = showOptions && elementId === element._id
        return(
          <div 
            onMouseEnter={() => mouseEnter(element._id)} 
            onMouseLeave={mouseLeave}  
            className="w-full min-h-12 h-14 flex items-center justify-center rounded bg-blue  shadow-1-1-4 hover:shadow-1-1-4-inner cursor-pointer hover:opacity-100 transition">
            {isElementHovered ? (
              <ElementHoverOptions handleShowPopup={handleShowPopup} handleDelete={handleDelete} element={element}/>
            ) : (
              <AlertContent element={element}/>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default AlertList