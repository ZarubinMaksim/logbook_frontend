function ContactsFilter ({ departmentsList, handleFilterClick, currentDepFilter }) {

  return (
    <div className="flex flex-wrap gap-2 justify-center sticky top-0 bg-white pb-2 z-20">
      {departmentsList.length >= 3 ? (
        departmentsList.map((deps) => {
          return (
            <button onClick={handleFilterClick} className={`${currentDepFilter && currentDepFilter.includes(deps) ? 'bg-dark-blue text-textcolor hover:text-black' : 'bg-blue'} text-xs px-1 uppercase hover:bg-blue-active`}>{deps}</button>
          )
        })
      ) : (null)}
    </div>
  )
}

export default ContactsFilter;