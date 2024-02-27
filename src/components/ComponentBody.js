
function ComponentBody ({title, onDelete}) {
  const imageUrl = require(`../images/${title}.png`)

  return (
    <div className='border border-border-grey bg-white h-full p-2'>
      <div className='border-b border-border-grey  pb-1 flex gap-2 items-center '>
        <img className="w-4 h-4" src={imageUrl}></img>
        <h2 className="capitalize">{title}</h2>
      </div>

      <div className="border-2 bordr-red-200">
        <p>content</p>
      </div>
    </div>



    // <div className='p-0.5 rounded-sm box-border bg-pantone-black h-full flex flex-col shadow-xl' key="3">
    //   <div className='p-0.5 box-border flex flex-row gap-2 justify-start items-center'>
    //     <img  className='w-5 h-5' src={deleteButton}/>
    //     <p className='text-pantone-light'>{title}</p>
    //     <div className='ml-auto' id={title}>
    //   </div>

    //   </div>

    //   <div className='bg-pantone-light h-full p-0.5 box-border rounded-b-sm text-pantone-black'>
    //     <p>TUT BUDILNIK</p>
    //     <input></input>
    //   </div>
    // </div>
  )
}

export default ComponentBody