
function FormContacts({handleChange, inputClass}) {


  return (
    <>
          <input type='text' name='department' placeholder='Department'  className={inputClass} onInput={handleChange}></input>
          <input type='text' name='firstname' placeholder='First name' className={inputClass} onInput={handleChange}></input>
          <input type='text' name='name' placeholder='Name' className={inputClass} onInput={handleChange}></input>
          <input type='text' name='middlename' placeholder='Middle name' className={inputClass} onInput={handleChange}></input>
          <input type='text' name='phone' placeholder='Phone' className={inputClass} onInput={handleChange}></input>
          <input type='text' name='mobile' placeholder='Mobile phone' className={inputClass} onInput={handleChange}></input>
          <input type='text' name='email' placeholder='E-mail' className={inputClass} onInput={handleChange}></input>
    </>
    )

  }
  export default FormContacts;
  