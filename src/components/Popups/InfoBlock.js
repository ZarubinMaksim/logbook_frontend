function InfoBlock ({ icon, title, isUpdateSaved, savedValue, uploadedValue }) {

  return (
    <div className="flex flex-col gap-1 p-2 rounded-lg bg-blue-active w-fit h-fit max-h-80  min-w-24">
      <div className="flex items-center gap-1">
        <img src={icon} className='w-4 h-4'></img>
        <p className="text-sm">{title}</p>
      </div>
      {isUpdateSaved ? (
        savedValue.map((elem) => {
          return (
            <p className="capitalize overflow-scroll break-all self-center">{elem}</p>
          )
        })
      ) : (
        uploadedValue.map((elem) => {
          return (
            <p className="capitalize overflow-scroll break-all self-center">{elem}</p>
          )})
      )}
    </div>
  )
}

export default InfoBlock;