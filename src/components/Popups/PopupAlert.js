
function PopupAlert({data}) {


  return (
   <div className="font-mainfont text-lg">
    <p className="capitalize">{data.room}</p>
         <p className="capitalize">{data.alert}</p>
   </div>
    )
  }
  export default PopupAlert;
  