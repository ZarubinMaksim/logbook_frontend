import { useEffect, useState } from "react"
import MainApi from "../../../utils/MainApi"

function Note() {
  const [note, setNote] = useState()
  const [noteText, setNoteText] = useState()

  // ------------*** START Component Content updaters ***------------
  useEffect(() => {
    const cachedNote = JSON.parse(localStorage.getItem('note'))
    if (cachedNote) {
      setNoteText(cachedNote)
    }
    updateNote()
  }, [])
  // ------------*** END Component Content updaters ***------------

  // ------------*** START Component API's ***------------
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

  const handleBlur = (e) => {
    if (note.data[0]) {
      MainApi.updateNote(note.data[0]._id, e.target.value)
    } else {
      MainApi.setNote(e.target.value)
    }
  }
  // ------------*** END Component API's ***------------

  // ------------*** OTHER ***------------
 const handleChange = (e) => {
   const {value} = e.target
   setNoteText(value)
 }

  return(
    <div className="h-full w-full">
      <textarea 
        onInput={handleChange} 
        onBlur={handleBlur} 
        defaultValue={noteText} 
        placeholder="Write something here.." 
        className="shadow-1-1-4-inner p-1 w-full h-full resize-none "
      />
    </div>
  )
}

export default Note;