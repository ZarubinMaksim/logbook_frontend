import ContactsContent from "./ContactsContent"

function ContactsList ({ departmentsList, currentDepFilter, contactsList, handleShowPopup }) {

  return (
<>
{departmentsList ? (
          (currentDepFilter ? currentDepFilter : departmentsList).map((department) => {
            return (
              <div>
                <div className="flex items-center gap-1 w-4/5 m-auto opacity-40 z-10">
                  <p className="bg-black h-0.5 grow"></p>
                  <p className="uppercase">{department}</p>
                  <p className="bg-black h-0.5 grow"></p>
                </div>
                {contactsList ? (
                  contactsList.map((contact) => {
                    if (contact.department.toLowerCase() === department.toLowerCase()) {
                      return (
                        <ContactsContent element={contact} handleShowPopup={handleShowPopup}/>
                        // <div className="border-2 border-red-300 flex gap-2 items-center cursor-pointer transition px-1"  >
                          // <div className="w-full flex flex-wrap gap-1 justify-between items-center hover:bg-blue-active transition pl-2 pr-1" onClick={() => handleShowInfo(contact)}>
                          //   <p className="capitalize pointer-events-none">{`${contact.firstname} ${contact.name[0]}.`}</p>
                          //   <p className=" pointer-events-none">{contact.phone}</p>
                          //   <a href={`mailto:${contact.email}`} className=''> 
                          //     <img src={mail} className=""></img>
                          //   </a>
                          // </div>
                    
                        // </div>
                      )
                      
                    }
                  })
                ) : (null)}
              </div>
            )
          })
        ) : (null)}
</>
  )
}

export default ContactsList