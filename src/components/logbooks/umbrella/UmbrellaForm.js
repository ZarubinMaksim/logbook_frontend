import Button from "../logbooks_components/Button"

function UmbrellaForm ({elementList, element, handleSubmit, handleChange }) {

  return (
    <form onSubmit={handleSubmit} className='flex'>
      <input  className="border text-xs border-border-grey w-1/3 px-1" name="room" onInput={(e) => handleChange(e, elementList, element)} placeholder="Room" maxLength='6' required></input>
      <input  className="border text-xs border-border-grey w-1/3 px-1" name="umbrellas" onInput={(e) => handleChange(e, elementList, element)} placeholder="Umbrellas" maxLength='2' required></input>
      <Button type='submit' title='+' width='w-1/3'/>
    </form>
  )
}

export default UmbrellaForm