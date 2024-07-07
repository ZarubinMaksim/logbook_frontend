import Button from "../logbooks_components/Button"

function InvoiceForm ({ handleChange, handleSubmit }) {

  return(
    <form onSubmit={handleSubmit} className='flex flex-col gap-1.5 h-fit items-center justify-center py-2'>
      <input type='text' name='room' placeholder='Room'  className='w-4/5 border text-sm placeholder:text-xs border-border-grey px-1 cursor-text' onInput={handleChange} required maxLength='6'></input>
      <input type='text' name='company' placeholder='Company' className='w-4/5 border text-sm placeholder:text-xs border-border-grey px-1 cursor-text' onInput={handleChange} maxLength='30'></input>
      <input type='text' name='vat' placeholder='№ VAT' className='w-4/5 border text-sm placeholder:text-xs border-border-grey px-1 cursor-text' onInput={handleChange} maxLength='30'></input>
      <input type='text' name='details' placeholder='Details' className='w-4/5 border text-sm placeholder:text-xs border-border-grey px-1 cursor-text' onInput={handleChange}></input>        
      <input type='text' name='email' placeholder='E-mail' className='w-4/5 border text-sm placeholder:text-xs border-border-grey px-1 cursor-text' onInput={handleChange} ></input>
      <Button type='submit' title='Save' width='w-1/5'/>
    </form>
  )
}

export default InvoiceForm

