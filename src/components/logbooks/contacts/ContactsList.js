import ContactsContent from "./ContactsContent"

function ContactsList ({ departmentsList, currentDepFilter, contactsList, handleShowPopup }) {

  return (
    <>
      {departmentsList && (currentDepFilter ? currentDepFilter : departmentsList).map((department) => {
        return (
          <div>
            <div className="flex items-center gap-1 w-4/5 m-auto opacity-40 z-10">
              <p className="bg-black h-0.5 grow"></p>
              <p className="uppercase">{department}</p>
              <p className="bg-black h-0.5 grow"></p>
            </div>
            {contactsList && contactsList.map((contact) => {
              if (contact.department.toLowerCase() === department.toLowerCase()) {
                return (
                  <ContactsContent element={contact} handleShowPopup={handleShowPopup}/>
                )
              }
            })}
          </div>
        )
      })}
    </>
  )
}

export default ContactsList