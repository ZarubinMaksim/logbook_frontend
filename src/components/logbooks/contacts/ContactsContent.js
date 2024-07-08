import mail from '../../../images/mail.png'

function ContactsContent ({ element, handleShowPopup }) {

  return (
    <div className="w-full flex flex-wrap gap-1 justify-between items-center hover:bg-blue-active transition pl-2 pr-1" onClick={() => handleShowPopup(element)}>
      <p className="capitalize pointer-events-none">{`${element.firstname} ${element.name[0]}.`}</p>
      <p className=" pointer-events-none">{element.phone}</p>
      <a href={`mailto:${element.email}`}> 
        <img src={mail} ></img>
      </a>
    </div>
  )
}

export default ContactsContent