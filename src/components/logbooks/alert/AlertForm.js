import Button from "../logbooks_components/Button";

function  AlertForm ({ handleChange, handleSubmit }) {

  return (
  <form className='flex' onSubmit={handleSubmit}>
    <input className="border text-xs border-border-grey w-1/3 px-1" name="room" placeholder="Room" onInput={handleChange} maxLength='6' required></input>
    <input className="border text-xs border-border-grey w-full px-1" name="alertText" placeholder="Enter Alert" onInput={handleChange} maxLength='' required></input>
    <Button type='submit' title='+' width='w-1/5'/>
  </form>

  )
}
export default AlertForm