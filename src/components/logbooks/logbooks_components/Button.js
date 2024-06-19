//checked 19.06
function Button({ showForm, title, type, width }) {

  return (
    <button 
      type={type} 
      onClick={showForm} 
      className={`border border-border-grey cursor-pointer hover:bg-blue transition text-s ${width ? width : 'w-full'}`}>
        {title}
    </button>
  )
}

export default Button;