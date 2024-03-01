import { useState, useRef } from 'react';
import lock from '../images/lock.png'
import unlock from '../images/unlock.png'
import settings from '../images/settings.png'



function ComponentsBar({ onClickAdd, onClickDelete, defaultList, savedList, isLocked }) {
  const elements = ['alarm', 'alert', 'invoice', 'contacts', 'taxi', 'umbrella', 'note'];
  const [isBlocked, setIsBlocked] = useState(true);
  const lockElementRef = useRef(null);
  const lockElementTextRef = useRef(null);

  const handleElementClick = (e) => {
    if (isBlocked) {
      lockElementRef.current.classList.add('animate-bounce');
      setTimeout(() => {
        lockElementRef.current.classList.remove('animate-bounce');
      }, 500);
      
    } else {
      console.log(e.target)
      if (e.target.localName === 'div') {
        onClickDelete(e);
      } else {
        onClickAdd(e);
      }
    }
  };

  const handleBlockContent = () => {
    setIsBlocked(!isBlocked);
    isLocked(isBlocked);
  };

  const handleClassName = (element) => {
    const isInSavedList = savedList && savedList.includes(element);
    const isInDefaultList = defaultList && defaultList.includes(element);
    
    if (savedList) {
      if (isInSavedList) {
        return { blockClass: 'bg-light-purple w-8 h-8 shadow-1-1-4-inner flex justify-center items-center rounded-full cursor-pointer transition-shadow', imageClass: 'w-5 h-5 pointer-events-none', imageName: `${element}` }; //если есть
      } else {
        return { blockClass: 'bg-light-grey w-8 h-8 shadow-1-1-4 flex justify-center items-center rounded-full cursor-pointer transition-shadow', imageClass: 'w-5 h-5 opacity-50', imageName: `${element}-bw` }; //если нет
      }
    } else {
      if (isInDefaultList) {

        return { blockClass: 'bg-light-purple w-8 h-8 shadow-1-1-4-inner flex justify-center items-center rounded-full cursor-pointer transition-shadow', imageClass: 'w-5 h-5 pointer-events-none', imageName: `${element}` }; //если есть
      } else {
        return { blockClass: 'bg-light-grey w-8 h-8 shadow-1-1-4 flex justify-center items-center rounded-full cursor-pointer transition-shadow', imageClass: 'w-5 h-5 opacity-50', imageName: `${element}-bw` }; //если нет
      }
    }
  };

  return (
    <header className="flex justify-between px-5 py-1 items-center h-16 bg-white shadow-md rounded-full">
      <div className='flex py-1.5 px-4 border border-light-grey items-center gap-3 bg-color rounded-full shadow-inner'>
          {/* <div className='w-8 h-8 bg-light-grey rounded-full flex justify-center items-center'> */}
            <img id='test' onClick={handleBlockContent} className='w-5 h-5 opacity-50 hover:opacity-100 cursor-pointer transition-opacity' src={isBlocked ? lock : unlock} alt={isBlocked ? "Locked" : "Unlocked"} ref={lockElementRef}></img>
          {/* </div> */}
          <p className='opacity-40'> | </p>

        <div className="flex gap-3">
        {elements.map((element, key) => {
          const { blockClass, imageClass, imageName } = handleClassName(element);
          return (
            <div key={key} onClick={handleElementClick} id={element} className={blockClass}>
              <img id={element} className={imageClass} src={require(`../images/${imageName}.png`)} alt={element}></img>
            </div>
          );
        })}
      </div>
      </div>





      <div className="flex h-full items-center justify-center gap-4">
        

            <div className='w-5 h-5 opacity-50 bg-[url("./images/settings-bw.png")] hover:bg-[url("./images/settings.png")] bg-contain outline-0 border-0 hover:opacity-100 cursor-pointer transition-opacity'></div>
          
        
        

            <div className='w-5 h-5 opacity-50 bg-[url("./images/logout-bw.png")] hover:bg-[url("./images/logout.png")] bg-contain outline-0 border-0 hover:opacity-100 cursor-pointer transition-opacity' src={lock}></div>
      </div>
    </header>
  );
}

export default ComponentsBar;
