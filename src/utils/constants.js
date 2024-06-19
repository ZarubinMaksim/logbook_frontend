//FORMS CONSTANTS

import FormContacts from "../components/Forms/FormContacts";
import FormInvoice from "../components/Forms/FormInvoice";
import FormTaxi from "../components/Forms/FormTaxi";

//Forms list. Add here new form 
export const formsList = {
  invoice: FormInvoice,
  taxi: FormTaxi,
  contacts: FormContacts
}

export const formsClassNames = {
  formClass: 'flex flex-col gap-1.5 h-fit items-center justify-center py-2',
  inputClass: 'w-4/5 border text-sm placeholder:text-xs border-border-grey px-1 cursor-text',
}
