import homeIcon from '../../../images/home.png'
function InvoiceContent ({ element }) {

  return (
    <div className="flex gap-1">
    <img src={homeIcon} className='w-4 h-4 mt-0.5'></img>
    <p className='pointer-events-none  items-center'>
      {element.room}
    </p>
  </div>
  )
}

export default InvoiceContent