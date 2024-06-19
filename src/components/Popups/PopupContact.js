
function PopupContact({data}) {


 return (
  <div className="font-mainfont text-lg">
        <p className="capitalize">Dep: {data.department}</p>
      <p className="capitalize">First name: {data.firstname}</p>
      <p className="capitalize">Name: {data.name}</p>
      <p className="capitalize">Middle name: {data.middlename}</p>
      <p className="capitalize">Phone: {data.phone}</p>
      <p className="capitalize">Mobile: {data.mobile}</p>
      <p className="capitalize">E-mail: {data.email}</p>

  </div>
   )
 }
 export default PopupContact;
 