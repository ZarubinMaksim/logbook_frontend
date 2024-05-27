
function PopupInvoice({data}) {
  console.log('invoice', data)
 return (
  <div className="font-mainfont text-lg">
    <p>Room: {data.room}</p>
    <p>Company: {data.company}</p>
    <p>VAT: {data.vat}</p>
    <p>Details: {data.details}</p>
    <p>Email: {data.email}</p>
   </div>
   )
 }
 export default PopupInvoice;
 