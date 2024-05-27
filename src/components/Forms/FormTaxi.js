import { useState } from "react"

function FormTaxi({handleChange, inputClass}) {
  const [isTransferClicked, setIsTransferClicked] = useState(false)

  const handleTransferClick = () => {
    setIsTransferClicked(true)
  }

  const handlePickUpClick = () => {
    setIsTransferClicked(false)
  }

  return (
    <>
    <div className='flex w-4/5 justify-around'>
      <label className='flex flex-col gap-1 cursor-pointer'>
        <input type='radio' name='route' value='pickup' className="border text-s border-border-grey px-1 cursor-pointer" onClick={handlePickUpClick} onInput={handleChange}></input>
        <p className='text-xs'>Pickup</p>
      </label>
      <label className='flex flex-col gap-1 cursor-pointer'>
        <input type='radio' name='route' value='transfer' className="border text-s border-border-grey px-1 cursor-pointer" onClick={handleTransferClick} onInput={handleChange}></input>
        <p className='text-xs'>Transfer</p>
      </label>
    </div>
    {isTransferClicked ? (
      <>
        <input type='text' name='room'  className={inputClass} placeholder='Room' onInput={handleChange}></input>
        <input type='date' name="time"  className={inputClass}  placeholder='Time' onInput={handleChange}></input> 
        <input type='text' name='pax'  className={inputClass} placeholder='Pax' onInput={handleChange}></input>
      </>
    ) : (
      <>
        <input type='text' name='room'  className={inputClass} placeholder='Room' onInput={handleChange}></input>
        <input type='datetime-local' name="time"  className={inputClass}  placeholder='Time' onInput={handleChange}></input> 
        <input type='text' name='flight'  className={inputClass} placeholder='Flight number' onInput={handleChange}></input>
        <input type='text' name='pax'  className={inputClass} placeholder='Pax' onInput={handleChange}></input>
        <input type='tel' name='tel'  className={inputClass} placeholder='Phone number' onInput={handleChange}></input>
      </>
    )}
    </>
    )

  }
  export default FormTaxi;
  