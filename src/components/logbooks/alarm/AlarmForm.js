import Button from "../logbooks_components/Button";

function AlarmForm ({ handleSubmit, handleChange}) {

  return (
    <form className='flex' onSubmit={handleSubmit}>
    <input className="border text-xs border-border-grey w-1/3 px-1" name="room" placeholder="Room" onInput={handleChange} required maxLength='6'></input>
    <input type='datetime-local' className="border text-xs border-border-grey w-full px-1" name="date" placeholder="Enter Alert" onInput={handleChange} required></input>
      <Button type='submit' title='+' width='w-1/5'/>
    </form>
  )
}

export default AlarmForm;