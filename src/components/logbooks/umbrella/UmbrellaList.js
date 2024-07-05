import ElementHoverOptions from "../logbooks_components/ElementHoverOptions"
import UmbrellaContent from "./UmbrellaContent"

function UmbrellaList ({ elementList, mouseEnter, mouseLeave, showOptions, elementId, handleDelete, handleShowPopup }) {

  return (

    <div className="flex flex-wrap justify-center items-center gap-2 p-2">
        {elementList ? (elementList.map((room) => {
            return (
                <div onMouseEnter={() => mouseEnter(room._id)} onMouseLeave={mouseLeave} id={room.room} className="w-32 h-7 flex items-center justify-center rounded bg-blue opacity-70 shadow-1-1-4 hover:shadow-1-1-4-inner cursor-pointer hover:opacity-100 transition">
                  {showOptions && elementId === room._id ? (
                  <ElementHoverOptions handleShowPopup={handleShowPopup} handleDelete={handleDelete} element={room}/>
                //   <div className="flex justify-between w-full h-full">
                //   <div className="flex items-center justify-center hover:bg-green-200 w-1/2 transition" onClick={() => handleShowInfo(room)}>
                //     <img src={popupBtn} className='w-4'/>
                //   </div>
                //   <div className="flex items-center justify-center hover:bg-red-200 w-1/2" onClick={() => handleDelete(room)}>
                //     <img src={deleteBtn} className='w-4'/>
                //   </div>              
                // </div>
                  
                  ) : 
                  (
                    <UmbrellaContent element={room}/>
                  // <div className="flex gap-2">

                  //   <div className="flex gap-1">
                  //     <img src={homeIcon} className='w-4 h-4 mt-0.5'></img>
                  //     <p className='' id={room.room}>{room.room}</p>
                  //   </div>
                  //   <div className="flex gap-1"> 
                  //     <img src={umbrellaIcon} className='w-4 h-4 mt-0.5'></img>
                  //     <p>{room.umbrella}</p>  
                  //   </div>

                  // </div>
                  ) }
                  
                </div>
            )
          })) : (null)}
          {/* <UndoButton isDeleted={isDeleted}
          handleUnDo={handleUnDo} /> */}
      </div>
  )
}

export default UmbrellaList