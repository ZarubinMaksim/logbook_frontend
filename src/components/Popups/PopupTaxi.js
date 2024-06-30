import { useEffect } from "react"
import MainApi from "../../utils/MainApi"

function PopupTaxi({data, isDeleteClicked, setIsDeletedFromPopup, isDeletedFromPopup, handleClosePopup}) {

  useEffect(() => {
    if (isDeleteClicked) {
      MainApi.deleteTaxi(data._id)
      .then((response) => {
        if (response) {
          setIsDeletedFromPopup(!isDeletedFromPopup)
          handleClosePopup()
        }
      })
    }
  }, [isDeleteClicked])

   const dateTime = data.date.split('T')
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
  