import { useState, useRef } from 'react';
import lock from '../images/padlock.png'
import unlock from '../images/unlock.png'


function ComponentsBar({ onClickAdd, onClickDelete, defaultList, savedList, isLocked }) {
  const elements = ['alarm', 'alert', 'invoice', 'contacts', 'taxi', 'umbrella', 'note'];
  const [isBlocked, setIsBlocked] = useState(true);
  const lockElementRef = useRef(null);
  const lockElementTextRef = useRef(null);
console.log('testSL', savedList)

  const handleElementClick = (e) => {
    if (isBlocked) {
      lockElementRef.current.classList.add('animate-bounce');
      setTimeout(() => {
        lockElementRef.current.classList.remove('animate-bounce');
      }, 500);
      
    } else {
      console.log(e.target.id, savedList)
      if (savedList && savedList.includes(e.target.id) ) {
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
        // return { blockClass: 'border-2 border-red-500', imageClass: 'w-5 h-5 pointer-events-none', imageName: `${element}` }; //если есть
        return { 
          navSquaredBlock: 'pt-2 flex flex-col items-center gap-4 w-20 cursor-pointer bg-dark-blue transition-all duration-200', 
          navCircledBlock: ' w-9 h-9  rounded-full absolute flex items-center justify-center top-9 bg-dark-blue pointer-events-none transition-all duration-500', 
          navImageStyle: 'w-4 h-4 pointer-events-none',
          navImageName: `${element}`, 
          navTextStyle: 'capitalize font-mainfont pointer-events-none text-sm text-textcolor' }; //если есть
      } else {
        return { 
          navSquaredBlock: 'pt-2 flex flex-col items-center gap-4 w-20 cursor-pointer bg-none transition-all duration-700 hover:bg-blue-active', 
          navCircledBlock: 'w-9 h-9  rounded-full absolute flex items-center justify-center top-6 bg-none pointer-events-none transition-all duration-200', 
          navImageStyle: 'w-4 h-4 pointer-events-none',
          navImageName: `${element}-blue`, 
          navTextStyle: 'capitalize font-mainfont text-sm' }; //если net
        // return { blockClass: 'bg-light-grey w-8 h-8 shadow-1-1-4 flex justify-center items-center rounded-full cursor-pointer transition-shadow', imageClass: 'w-5 h-5 opacity-50', imageName: `${element}-bw` }; //если нет
      }
    } else {
      if (isInDefaultList) {
        return { 
          navSquaredBlock: 'pt-2 flex flex-col items-center gap-4 w-20 cursor-pointer bg-dark-blue transition-all', 
          navCircledBlock: ' w-9 h-9  rounded-full absolute flex items-center justify-center top-9 bg-dark-blue pointer-events-none transition-all duration-500',
          navImageStyle: 'w-4 h-4 pointer-events-none', 
          navTextStyle: 'capitalize font-mainfont pointer-events-none text-sm' }; //если есть
      } else {
        return { 
          navSquaredBlock: 'pt-2 flex flex-col items-center gap-4 w-20 cursor-pointer bg-none transition-all',
          navCircledBlock: 'w-9 h-9  rounded-full absolute flex items-center justify-center top-6 bg-none pointer-events-none transition-all duration-500', 
          navTextStyle: 'capitalize font-mainfont text-sm' }; //если net
      }
    }
  };

  return (
    <header className="flex justify-between bg-blue h-16 mb-1">

        <div className="flex">
          {elements.map((element, key) => {
            console.log(element)
            const { navSquaredBlock, navCircledBlock, navImageStyle, navImageName, navTextStyle } = handleClassName(element);
            return (
              <div key={key} onClick={handleElementClick} id={element} className={navSquaredBlock}>
                <p className={navTextStyle} id={element}>{element}</p>
                <div  className={navCircledBlock}>
                  <img className={navImageStyle} src={require(`../images/${navImageName}.png`)} alt={element} />
                </div>
              </div>
          );
        })}
      </div>





      <div className="flex h-full items-center justify-self-end gap-4 mr-4">
        

      <img id='test' onClick={handleBlockContent} className='w-5 h-5 opacity-50 hover:opacity-100 cursor-pointer transition-opacity' src={isBlocked ? lock : unlock} alt={isBlocked ? "Locked" : "Unlocked"} ref={lockElementRef}></img>


            <div className='w-5 h-5 opacity-50 bg-[url("./images/settings-bw.png")] hover:bg-[url("./images/settings.png")] bg-contain outline-0 border-0 hover:opacity-100 cursor-pointer transition-all'></div>
          
        
        

            <div className='w-5 h-5 opacity-50 bg-[url("./images/logout-bw.png")] hover:bg-[url("./images/logout.png")] bg-contain outline-0 border-0 hover:opacity-100 cursor-pointer transition-all' src={lock}></div>
      </div>
    </header>
  );
}

export default ComponentsBar;
