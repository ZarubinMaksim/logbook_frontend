import { useEffect, useState } from "react"
import MainApi from "../../../utils/MainApi"

function Note() {

   //---------------------
 const [note, setNote] = useState()
 const [noteText, setNoteText] = useState()
//  const [umbrellasList, setUmbrellasList] = useState([])

 const handleChange = (e) => {
   const {value} = e.target
   setNoteText(value)
 }

//  const handleSubmit = (e) => {
//    console.log('ubrella succsesful in umbrella.js')
//    e.preventDefault()
//    console.log('43434', umbrella)
//    const { room, umbrellas } = umbrella
//    MainApi.setUmbrella(room, umbrellas)
//    setUmbrellasList([...umbrellasList, umbrella])
//  }

 useEffect(() => {
   const cachedNote = JSON.parse(localStorage.getItem('note'))
   if (cachedNote) {
     setNoteText(cachedNote)
   }

   updateNote()
 }, [])

 const updateNote = () => {
   MainApi.getNote()
   .then((note) => {
    setNote(note)
     const noteText = note.data[0].note
     setNoteText(noteText)
     localStorage.setItem('note', JSON.stringify(noteText))
   
   })
   .catch((err) => {
     console.log('Error fetching alarms:', err)
   })
 }

//---------------------

const handleBlur = (e) => {
  if (note.data[0]) {
    console.log(note.data[0])
    MainApi.updateNote(note.data[0]._id, e.target.value)
   
  } else {
    MainApi.setNote(e.target.value)
  }

}

  const handleInputText = (e) => {
    localStorage.setItem('note-text', JSON.stringify(e.target.value))
  }

  // const getText = () => {
  //   const savedText = JSON.parse(localStorage.getItem('note-text'))
  //   if (savedText) {
  //     return savedText
  //   } else {
  //     return null
  //   }
  // }


  return(
    <div className="h-full w-full">
      <textarea onInput={handleChange} onBlur={handleBlur} defaultValue={noteText} placeholder="Write something here.." className="shadow-1-1-4-inner p-1 w-full h-full resize-none "></textarea>
    </div>
  )
}

export default Note;