//checked 19.06
import Button from "../logbooks/logbooks_components/Button";
import { formsList, formsClassNames } from "../../utils/constants";

function Form({ onSubmit, onChange, title }) {
  
  //forms CSS in ../../utils/constants
  const {formClass, inputClass} = formsClassNames;

  //create CurrentForm based on clicked component(title)
  const CurrentForm = formsList[title]

  return (
    <form onSubmit={onSubmit} className={formClass}>
      <CurrentForm onChange={onChange} inputClass={inputClass}/>
      <Button type='submit' title='Save' width='w-4/5'/>
    </form>
    )
 }
 export default Form;
 