import Button from "../logbooks_components/Button"

function TaxiForm ({ elementList, element, handleSubmit, handleChange }) {

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-1.5 h-fit items-center justify-center py-2'>
      <>
        {/* block below - TRANSFER or PICKUP */}
        <div className='flex w-4/5 justify-around'>
          <label className='flex flex-col gap-1 cursor-pointer'>
            <input type='radio' name='route' value='pickup' className="border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
            <p className='text-xs'>Pickup</p>
          </label>
          <label className='flex flex-col gap-1 cursor-pointer'>
            <input type='radio' name='route' value='transfer' className="border text-s border-border-grey px-1 cursor-pointer" onInput={handleChange}></input>
            <p className='text-xs'>Transfer</p>
          </label>
        </div>
        {/* block below - inputs */}
        <>
          <input type='text' name='room'  className='w-4/5 border text-sm placeholder:text-xs border-border-grey px-1 cursor-text' placeholder='Room' onInput={(e) => handleChange(e, elementList, element)} required maxLength='6' ></input>
          <input type='datetime-local' name="date"  className='w-4/5 border text-sm placeholder:text-xs border-border-grey px-1 cursor-text'  placeholder='Time' onInput={(e) => handleChange(e, elementList, element)}></input> 
          <input type='text' name='flight'  className='w-4/5 border text-sm placeholder:text-xs border-border-grey px-1 cursor-text' placeholder='Flight number' onInput={(e) => handleChange(e, elementList, element)} maxLength='7'></input>
          <input type='text' name='pax'  className='w-4/5 border text-sm placeholder:text-xs border-border-grey px-1 cursor-text' placeholder='Pax' onInput={(e) => handleChange(e, elementList, element)} maxLength='2'></input>
          <input type='tel' name='phone'  className='w-4/5 border text-sm placeholder:text-xs border-border-grey px-1 cursor-text' placeholder='Phone number' onInput={(e) => handleChange(e, elementList, element)} maxLength='20'></input>
        </>
      </>
      <Button type='submit' title='Save' width='w-4/5'/>
    </form>
  )
}

export default TaxiForm