import Button from "../logbooks_components/Button";

function ContactsForm ({ elementList, element, handleSubmit, handleChange }) {

  return( 
    <form onSubmit={handleSubmit} className='flex flex-col gap-1.5 h-fit items-center justify-center py-2'>
      <input type='text' name='department' placeholder='Department'  className='w-4/5 border text-sm placeholder:text-xs border-border-grey px-1 cursor-text' onInput={(e) => handleChange(e, elementList, element)} required maxLength='5'></input>
      <input type='text' name='firstname' placeholder='First name' className='w-4/5 border text-sm placeholder:text-xs border-border-grey px-1 cursor-text' onInput={(e) => handleChange(e, elementList, element)} required></input>
      <input type='text' name='name' placeholder='Name' className='w-4/5 border text-sm placeholder:text-xs border-border-grey px-1 cursor-text' onInput={(e) => handleChange(e, elementList, element)} required></input>
      <input type='text' name='middlename' placeholder='Middle name' className='w-4/5 border text-sm placeholder:text-xs border-border-grey px-1 cursor-text' onInput={(e) => handleChange(e, elementList, element)}></input>
      <input type='text' name='phone' placeholder='Phone' className='w-4/5 border text-sm placeholder:text-xs border-border-grey px-1 cursor-text' onInput={(e) => handleChange(e, elementList, element)} ></input>
      <input type='text' name='mobile' placeholder='Mobile phone' className='w-4/5 border text-sm placeholder:text-xs border-border-grey px-1 cursor-text' onInput={(e) => handleChange(e, elementList, element)}></input>
      <input type='text' name='email' placeholder='E-mail' className='w-4/5 border text-sm placeholder:text-xs border-border-grey px-1 cursor-text' onInput={(e) => handleChange(e, elementList, element)}></input>
      <Button type='submit' title='Save' width='w-4/5'/>
    </form>
  )
}

export default ContactsForm;