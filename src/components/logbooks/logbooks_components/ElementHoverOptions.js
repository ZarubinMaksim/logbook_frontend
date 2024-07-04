import deleteBtn from '../../../images/delete.png'
import popupBtn from '../../../images/popup.png'

function ElementHoverOptions ({ handleShowPopup, handleDelete, element}) {

  return (
    <div className="flex justify-between w-full h-full">
    <div className="flex items-center justify-center hover:bg-green-200 w-1/2 transition" onClick={() => handleShowPopup(element)}>
      <img src={popupBtn} className='w-4'/>
    </div>
    <div className="flex items-center justify-center hover:bg-red-200 w-1/2 transition" onClick={() => handleDelete(element)}>
      <img src={deleteBtn} className='w-4'/>
    </div>              
  </div>
  )
}

export default ElementHoverOptions;