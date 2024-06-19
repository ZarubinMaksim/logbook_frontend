// checked 19.06
function FormInvoice({ onChange, inputClass }) {

  return (
    <>
      <input type='text' name='room' placeholder='Room'  className={inputClass} onInput={onChange} required maxLength='6'></input>
      <input type='text' name='company' placeholder='Company' className={inputClass} onInput={onChange}></input>
      <input type='text' name='vat' placeholder='№ VAT' className={inputClass} onInput={onChange}></input>
      <input type='text' name='details' placeholder='Details' className={inputClass} onInput={onChange}></input>        
      <input type='text' name='email' placeholder='E-mail' className={inputClass} onInput={onChange}></input>
    </>
  )
}

export default FormInvoice;
  