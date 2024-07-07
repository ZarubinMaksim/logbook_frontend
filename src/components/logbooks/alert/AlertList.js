import deleteBtn from '../../../images/delete.png'
import popupBtn from '../../../images/popup.png'
import ElementHoverOptions from '../logbooks_components/ElementHoverOptions'
import AlertContent from './AlertContent'

function AlertList ({ elementList, mouseEnter, mouseLeave, showOptions, elementId, handleDelete, handleShowPopup }) {

  return(

    <div className="flex flex-col justify-center items-center gap-2 p-2">
        {elementList ? (elementList.map((element) => {

          // const isTooLong = element.alertText.length > 12

          return(
            <div 
              onMouseEnter={() => mouseEnter(element._id)} 
              onMouseLeave={mouseLeave} 
              id={element.room} 
              className="w-full min-h-12 h-14 flex items-center justify-center rounded bg-blue  shadow-1-1-4 hover:shadow-1-1-4-inner cursor-pointer hover:opacity-100 transition">
            {showOptions && elementId === element._id ? 
            (
              <ElementHoverOptions handleShowPopup={handleShowPopup} handleDelete={handleDelete} element={element}/>
              // <div className="flex justify-between w-full h-full">
              //   <div className="flex items-center justify-center hover:bg-green-200 w-1/2" onClick={() => handleShowPopup(element)}>
              //     <img src={popupBtn} className='w-4'/>
              //   </div>
              //   <div className="flex items-center justify-center hover:bg-red-200 w-1/2" onClick={() => handleDelete(element)}>
              //     <img src={deleteBtn} className='w-4'/>
              //   </div>              
              // </div>
            ) : 
            (
              <AlertContent element={element}/>
              // <div className='flex flex-col items-center gap-0.5' id={element.room}>
              //   <div className="flex gap-2">
              //     <img src={homeIcon} className='w-4 h-4 mt-0.5'></img>
              //     <p className='' id={element.room}>{element.room}</p> 
              //   </div>

              //   <div className="flex gap-2">
              //     <img src={alertIcon} className='w-4 h-4 mt-0.5'></img>
              //     <p>{isTooLong ? `${element.alertText.slice(0,14)}...` : element.alertText}</p>
              //   </div>

              // </div>

            ) }
            
          </div>
          )

        })) : (null)}
        {/* <UndoButton 
          isDeleted={isDeleted}
          handleUnDo={handleUnDo}/> */}
      </div>
  )
}

export default AlertList