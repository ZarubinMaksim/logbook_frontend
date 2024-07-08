import Button from "../logbooks_components/Button";

function  AlertForm ({ elementList, element, handleChange, handleSubmit }) {

  return (
  <form className='flex' onSubmit={handleSubmit}>
    <input className="border text-xs border-border-grey w-1/3 px-1" name="room" placeholder="Room" onInput={(e) => handleChange(e, elementList, element)} maxLength='6' required></input>
    <input className="border text-xs border-border-grey w-full px-1" name="alertText" placeholder="Enter Alert" onInput={(e) => handleChange(e, elementList, element)} maxLength='' required></input>
    <Button type='submit' title='+' width='w-1/5'/>
  </form>

  )
}
export default AlertForm