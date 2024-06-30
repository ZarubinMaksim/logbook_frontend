import { useEffect, useRef, useState } from "react"
import Button from "./logbooks_components/Button"
import deleteBtn from '../../images/delete.png'
import homeIcon from '../../images/home.png'
import umbrellaIcon from '../../images/umbrella-blue.png'
import UndoButton from "./logbooks_components/UndoButton"
import MainApi from "../../utils/MainApi"

function Umbrella({ dataRef, valueRef, isDeleted, handleUnDo, undoImg}) {
    const [content, setContent] = useState(false)
    const [idE, setIde] = useState(null)

 //---------------------
 const [umbrella, setUmbrella] = useState()
 const [umbrellasList, setUmbrellasList] = useState([])

 const handleChange = (e) => {
   const {name, value} = e.target
   setUmbrella({...umbrella, [name]: value})
 }

 const handleSubmit = (e) => {
   console.log('ubrella succsesful in umbrella.js')
   e.preventDefault()
   console.log('43434', umbrella)
   const { room, umbrellas } = umbrella
   MainApi.setUmbrella(room, umbrellas)
   .then((response) => {
    const newUmbrella = response.data
    setUmbrellasList([...umbrellasList, newUmbrella])
  })
 }

 useEffect(() => {
   const cachedUmbrellas = JSON.parse(localStorage.getItem('umbrellas'))
   if (cachedUmbrellas) {
     setUmbrellasList(cachedUmbrellas)
   }

   updateUmbrellas()
 }, [])

 const updateUmbrellas = () => {
   MainApi.getUmbrellas()
   .then((umbrellas) => {
     setUmbrellasList(umbrellas.data)
     localStorage.setItem('umbrellas', JSON.stringify(umbrellas.data))
   
   })
   .catch((err) => {
     console.log('Error fetching alarms:', err)
   })
 }

 const handleDelete = (element) => {
  MainApi.deleteUmbrella(element._id)
  const updatedUmbrellaList = umbrellasList.filter((elem) => elem._id !== element._id)
  setUmbrellasList(updatedUmbrellaList)
  localStorage.setItem('umbrellas', JSON.stringify(updatedUmbrellaList))
}

//---------------------

    const mouse = (id) => {
      setContent(true)
      setIde(id)
    }
    const mouse2 = () => {
      setContent(false)
    }
  return(
    <div className="flex flex-col">
      <form onSubmit={handleSubmit} className='flex'>
        <input ref={dataRef} className="border text-xs border-border-grey w-1/3 px-1" name="room" onInput={handleChange} placeholder="Room" maxLength='6' required></input>
        <input ref={valueRef} className="border text-xs border-border-grey w-1/3 px-1" name="umbrellas" onInput={handleChange} placeholder="Umbrellas" maxLength='2' required></input>
        <Button type='submit' title='+' width='w-1/3'/>
      </form>
      <div className="flex flex-wrap justify-center items-center gap-2 p-2">
        {umbrellasList ? (umbrellasList.map((room) => {
            return (
                <div onClick={() => handleDelete(room)} onMouseEnter={() => mouse(room.room)} onMouseLeave={mouse2} id={room.room} className="w-32 h-7 flex items-center justify-center px-2 rounded bg-blue opacity-70 shadow-1-1-4 hover:shadow-1-1-4-inner hover:bg-red-200 cursor-pointer hover:opacity-100 transition">
                  {content && idE === room.room ? (<img src={deleteBtn} className='w-4'/>) : 
                  (
                  <div className="flex gap-2">

                    <div className="flex gap-1">
                      <img src={homeIcon} className='w-4 h-4 mt-0.5'></img>
                      <p className='' id={room.room}>{room.room}</p>
                    </div>
                    <div className="flex gap-1"> 
                      <img src={umbrellaIcon} className='w-4 h-4 mt-0.5'></img>
                      <p>{room.umbrellas}</p>  
                    </div>

                  </div>
                  ) }
                  
                </div>
            )
          })) : (null)}
          <UndoButton isDeleted={isDeleted}
          handleUnDo={handleUnDo} />
      </div>
    </div>
  )
}

export default Umbrella