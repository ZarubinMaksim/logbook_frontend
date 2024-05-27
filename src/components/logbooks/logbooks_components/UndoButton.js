import undoImg from '../../../images/undo.png'

function UndoButton({isDeleted, handleUnDo}) {
  
  return (
    <>
      {isDeleted ? (
        <div className="cursor-pointer opacity-50 hover:opacity-100 transition-opacity" onClick={handleUnDo}>
          <img className="w-5 h-5 cursor-pointer" src={undoImg}  />
        </div>
      ) : (null)}
    </>
  )
}

export default UndoButton