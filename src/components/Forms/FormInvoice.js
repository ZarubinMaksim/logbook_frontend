
function FormInvoice({handleChange, inputClass}) {


  return (
    <>
     <input type='text' name='room' placeholder='Room'  className={inputClass} onInput={handleChange}></input>
     <input type='text' name='company' placeholder='Company' className={inputClass} onInput={handleChange}></input>
     <input type='text' name='vat' placeholder='№ VAT' className={inputClass} onInput={handleChange}></input>
     <input type='text' name='details' placeholder='Details' className={inputClass} onInput={handleChange}></input>        
     <input type='text' name='email' placeholder='E-mail' className={inputClass} onInput={handleChange}></input>
    </>
    )

  }
  export default FormInvoice;
  