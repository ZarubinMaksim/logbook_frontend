//checked 19.06

function FormTaxi({ onChange, inputClass }) {

  return (
    <>
      {/* block below - TRANSFER or PICKUP */}
      <div className='flex w-4/5 justify-around'>
        <label className='flex flex-col gap-1 cursor-pointer'>
          <input type='radio' name='route' value='pickup' className="border text-s border-border-grey px-1 cursor-pointer" onInput={onChange}></input>
          <p className='text-xs'>Pickup</p>
        </label>
        <label className='flex flex-col gap-1 cursor-pointer'>
          <input type='radio' name='route' value='transfer' className="border text-s border-border-grey px-1 cursor-pointer" onInput={onChange}></input>
          <p className='text-xs'>Transfer</p>
        </label>
      </div>
      {/* block below - inputs */}
        <>
          <input type='text' name='room'  className={inputClass} placeholder='Room' onInput={onChange} required maxLength='6' ></input>
          <input type='datetime-local' name="date"  className={inputClass}  placeholder='Time' onInput={onChange}></input> 
          <input type='text' name='flight'  className={inputClass} placeholder='Flight number' onInput={onChange} maxLength='7'></input>
          <input type='text' name='pax'  className={inputClass} placeholder='Pax' onInput={onChange} maxLength='2'></input>
          <input type='tel' name='phone'  className={inputClass} placeholder='Phone number' onInput={onChange} maxLength='20'></input>
        </>
    </>
  )
}

export default FormTaxi;
  