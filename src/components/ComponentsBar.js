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
      // lockElementTextRef.current.classList.remove('hidden');
      lockElementTextRef.current.classList.add('opacity-100');

      setTimeout(() => {
        lockElementRef.current.classList.remove('animate-bounce');
        lockElementTextRef.current.classList.remove('opacity-100');
        // lockElementTextRef.current.classList.add('hidden');
      }, 1500);
      
    } else {
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
        return { blockClass: 'bg-light-purple w-9 h-9 shadow-1-1-4-inner flex justify-center items-center rounded-lg cursor-pointer transition-shadow', imageClass: 'w-7 h-7 pointer-events-none', imageName: `${element}` }; //если есть
      } else {
        return { blockClass: 'bg-light-grey w-9 h-9 shadow-1-1-4 flex justify-center items-center rounded-lg cursor-pointer transition-shadow', imageClass: 'w-7 h-7 opacity-50', imageName: `${element}-bw` }; //если нет
      }
    } else {
      if (isInDefaultList) {

        return { blockClass: 'bg-light-purple w-9 h-9 shadow-1-1-4-inner flex justify-center items-center rounded-lg cursor-pointer transition-shadow', imageClass: 'w-7 h-7 pointer-events-none', imageName: `${element}` }; //если есть
      } else {
        return { blockClass: 'bg-light-grey w-9 h-9 shadow-1-1-4 flex justify-center items-center rounded-lg cursor-pointer transition-shadow', imageClass: 'w-7 h-7 opacity-50', imageName: `${element}-bw` }; //если нет
      }
    }
  };

  return (
    <header className="flex justify-between px-5 py-1 items-center h-16 bg-white shadow-md">
      <div className="flex gap-4">
        {elements.map((element, key) => {
          const { blockClass, imageClass, imageName } = handleClassName(element);
          return (
            <div key={key} onClick={handleElementClick} id={element} className={blockClass}>
              <img id={element} className={imageClass} src={require(`../images/${imageName}.png`)} alt={element}></img>
            </div>
          );
        })}
      </div>

      <div className="flex h-full">

        <div className='flex flex-col min-w-14'>
          <div className='h-full flex items-end justify-center'>
            <img id='test' onClick={handleBlockContent} className='w-5 h-5 opacity-50 hover:opacity-100 cursor-pointer transition-opacity' src={isBlocked ? lock : unlock} alt={isBlocked ? "Locked" : "Unlocked"} ref={lockElementRef}></img>
          </div>
          <p id='test-text' className='opacity-0 px-1 transition-opacity text-xs bg-red-200 rounded w-auto text-center' ref={lockElementTextRef}>Blocked</p>
        </div>
        <div className='flex flex-col min-w-14'>
          <div className='h-full flex items-end justify-center'>
            <div className='w-5 h-5 opacity-50 bg-[url("./images/settings-bw.png")] hover:bg-[url("./images/settings.png")] bg-contain outline-0 border-0 hover:opacity-100 cursor-pointer transition-opacity'></div>
          </div>
          <p  className='opacity-0 px-1 transition-opacity text-xs bg-red-200 rounded w-auto text-center'>Settings</p>
        </div>
        <div className='flex flex-col min-w-14'>
          <div className='h-full flex items-end justify-center'>
            <div className='w-5 h-5 opacity-50 bg-[url("./images/logout-bw.png")] hover:bg-[url("./images/logout.png")] bg-contain outline-0 border-0 hover:opacity-100 cursor-pointer transition-opacity' src={lock}></div>
          </div>
          <p  className='opacity-0 px-1 transition-opacity text-xs bg-red-200 rounded w-auto text-center'>Exit</p>
        </div>


      </div>
    </header>
  );
}

export default ComponentsBar;
