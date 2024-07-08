import ElementHoverOptions from "../logbooks_components/ElementHoverOptions"
import UmbrellaContent from "./UmbrellaContent"

function UmbrellaList ({ 
  elementList, 
  mouseEnter, 
  mouseLeave, 
  showOptions, 
  elementId, 
  handleDelete, 
  handleShowPopup 
  }) {

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 p-2">
      {elementList && elementList.map((room) => {
        const isElementHovered = showOptions && elementId === room._id
        return (
          <div onMouseEnter={() => mouseEnter(room._id)} onMouseLeave={mouseLeave} id={room.room} className="w-32 h-7 flex items-center justify-center rounded bg-blue opacity-70 shadow-1-1-4 hover:shadow-1-1-4-inner cursor-pointer hover:opacity-100 transition">
            {isElementHovered ? (
              <ElementHoverOptions handleShowPopup={handleShowPopup} handleDelete={handleDelete} element={room}/>
              ) : (
              <UmbrellaContent element={room}/>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default UmbrellaList