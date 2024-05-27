import Button from "../logbooks/logbooks_components/Button";
import FormContacts from "./FormContacts";
import FormInvoice from "./FormInvoice";
import FormTaxi from "./FormTaxi";

function Form({onSubmit, onChange, title}) {

  const forms = {
    invoice: FormInvoice,
    taxi: FormTaxi,
    contacts: FormContacts
  }

  const classNames = {
    formClass: 'flex flex-col gap-1.5 h-fit items-center justify-center py-2',
    inputClass: 'w-4/5 border text-sm placeholder:text-xs border-border-grey px-1 cursor-text',
  }

  const {formClass, inputClass} = classNames;

  const CurrentForm = forms[title]

 return (
  <form onSubmit={onSubmit} className={formClass}>
    <CurrentForm onChange={onChange} inputClass={inputClass}/>
    <Button type='submit' title='Save' width='w-4/5'/>
  </form>
   )
 }
 export default Form;
 