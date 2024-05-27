
function PopupTaxi({data}) {
   console.log('taxi', data)

   const dateTime = data.time.split('T')
   const fullDate = dateTime[0].split('-')
   const time = dateTime[1]

  return (
    <div className="font-mainfont text-lg">
      <p>Route: {data.route}</p>
        <p>Date: {fullDate.join('-')}</p>
        <p>Time: {time}</p>
        <p>Room: {data.room}</p>  
        <p>Flight: {data.flight}</p>
        <p>Pax: {data.pax}</p>  
        <p>Phone: {data.tel}</p>
    </div>
    )
  }
  export default PopupTaxi;
  