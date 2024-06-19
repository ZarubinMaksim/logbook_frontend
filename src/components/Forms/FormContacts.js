// checked 19.06
function FormContacts({ onChange, inputClass }) {

  return (
    <>
      <input type='text' name='department' placeholder='Department'  className={inputClass} onInput={onChange} required maxLength='5'></input>
      <input type='text' name='firstname' placeholder='First name' className={inputClass} onInput={onChange} required></input>
      <input type='text' name='name' placeholder='Name' className={inputClass} onInput={onChange} required></input>
      <input type='text' name='middlename' placeholder='Middle name' className={inputClass} onInput={onChange}></input>
      <input type='text' name='phone' placeholder='Phone' className={inputClass} onInput={onChange} ></input>
      <input type='text' name='mobile' placeholder='Mobile phone' className={inputClass} onInput={onChange}></input>
      <input type='text' name='email' placeholder='E-mail' className={inputClass} onInput={onChange}></input>
    </>
  )
}

export default FormContacts;
  