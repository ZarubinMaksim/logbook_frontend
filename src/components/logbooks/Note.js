function Note() {

  const handleInputText = (e) => {
    localStorage.setItem('note-text', JSON.stringify(e.target.value))
  }

  const getText = () => {
    const savedText = JSON.parse(localStorage.getItem('note-text'))
    if (savedText) {
      return savedText
    } else {
      return null
    }
  }

  return(
    <div className="h-full w-full">
      <textarea onInput={handleInputText} defaultValue={getText()} placeholder="Write something here.." className="shadow-1-1-4-inner p-1 w-full h-full resize-none "></textarea>
    </div>
  )
}

export default Note