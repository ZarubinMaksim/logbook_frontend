import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ComponentBody from './components/ComponentBody';
import defaultLayouts from './defaultLayout';
import ComponentsBar from './components/ComponentsBar';

const ResponsiveGridLayout = WidthProvider(Responsive);

function App() {
  const [list, setList] = useState(['alarm', 'invoice', 'taxi'])
  const savedList = JSON.parse(localStorage.getItem('list-of-layouts'))
  const [breakpoint, setBreakpoint] = useState('')
  const [layouts, setLayouts] = useState(() => getLayouts());
  const [draggable, setIsDraggable] = useState(false)

  function handleCurrentBreakpoint() {
    const width = window.innerWidth;
    let newBreakpoint = '';
    if(width > 1200) {
      newBreakpoint = 'lg';
    } else if (996 < width && width < 1201) {
      newBreakpoint = 'md';
    } else if (768 < width && width < 996) {
      newBreakpoint = 'sm';
    } else if (480 < width && width < 768) {
      newBreakpoint = 'xs';
    } else {
      newBreakpoint = 'xxs';
    }
    setBreakpoint(newBreakpoint);
  }

  useEffect(() => {
    handleCurrentBreakpoint();
    window.addEventListener('resize', handleCurrentBreakpoint);
    return () => {
      window.removeEventListener('resize', handleCurrentBreakpoint);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('layout', JSON.stringify(layouts));
  }, [layouts]);

  function getLayouts() {
    const savedLayouts = localStorage.getItem('layout');
    return savedLayouts ? JSON.parse(savedLayouts) : defaultLayouts;
  }

  const handleLayoutChange = (layout, layouts) => {
    setLayouts(layouts);
  };

  const handlePlusElement = (e) => {
    const newElementName = e.target.id;
    const listOfLayouts = JSON.parse(localStorage.getItem('list-of-layouts'))

    // Получаем размеры нового элемента из defaultLayouts
    const elementData = defaultLayouts[breakpoint].find(element => element.i === newElementName)
    // Получаем сохраненные лейауты
    const savedLayouts = JSON.parse(localStorage.getItem('layout'))
    // добавляем к ним новый и сохраняем его
    savedLayouts[breakpoint].push(elementData)
    setLayouts(savedLayouts)
    
    // если listOfLayouts пустой, значит отрисовываем дефолтный список
    if (listOfLayouts) {
      listOfLayouts.push(newElementName)
      localStorage.setItem('list-of-layouts', JSON.stringify(listOfLayouts));
    } else {
      setList(prevList => {
        const updatedList = [...prevList, newElementName];
        localStorage.setItem('list-of-layouts', JSON.stringify(updatedList));
      });
    }
  };

  const handleDeleteElement = (e) => {
    const elementTodelete = e.target.id;
    const listOfLayouts = JSON.parse(localStorage.getItem('list-of-layouts'))
    const savedLayouts = JSON.parse(localStorage.getItem('layout'))
    // Получаем размеры нового элемента из defaultLayouts
    const elementToDeleteData = savedLayouts[breakpoint].find(element => element.i === elementTodelete)
    // Получаем сохраненные лейауты

    // добавляем к ним новый и сохраняем его
    savedLayouts[breakpoint].filter(item => item.i !== elementTodelete)
    setLayouts(savedLayouts)
    
    // если listOfLayouts пустой, значит отрисовываем дефолтный список
    if (listOfLayouts) {
      setList(prevList => {
        const updatedList = listOfLayouts.filter(item => item !== elementTodelete);
        localStorage.setItem('list-of-layouts', JSON.stringify(updatedList));
      });
    } else {
      setList(prevList => {
        const updatedList = prevList.filter(item => item !== elementTodelete);
        localStorage.setItem('list-of-layouts', JSON.stringify(updatedList));
      });
    }
  
    // const elementToDelete = e.target.id
    // const listOfLayouts = JSON.parse(localStorage.getItem('list-of-layouts'))
    // const savedLayouts = JSON.parse(localStorage.getItem('layout'))
    // let newListAfterDelete


    // // если listOfLayouts пустой то удаляем из дефолтного списка
    // if (listOfLayouts) {
    //   newListAfterDelete = listOfLayouts.filter(item => item != elementToDelete)
    //   localStorage.setItem('list-of-layouts', JSON.stringify(newListAfterDelete));
    // } else {
    //   newListAfterDelete = list.filter(item => item != elementToDelete)
    //   localStorage.setItem('list-of-layouts', JSON.stringify(newListAfterDelete));
    // }
    // console.log('to delete', e.target.id, listOfLayouts, savedLayouts, newListAfterDelete)
  }
  console.log(savedList)
  return (
    <div className='bg-color h-screen p-4'> 
      <ComponentsBar 
        onClickAdd={handlePlusElement}
        onClickDelete={handleDeleteElement}
        savedList={savedList}
        defaultList={list}
        isLocked={setIsDraggable}
      />
      <ResponsiveGridLayout
        className=""
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 50, md: 40, sm: 30, xs: 20, xxs: 1 }}
        rowHeight={1}
        width={1200}
        onLayoutChange={handleLayoutChange}
        isDraggable={draggable}
        isResizable={draggable}
      >

      {savedList ? (
        savedList.map((element, key) => (
          <div key={element}>
            <ComponentBody 
              title={element}     
              isUnlocked={draggable}          
              />
          </div>
          ))
      ) : (
        list.map((element, key) => (
          <div key={element}>
            <ComponentBody title={element}
            isUnlocked={draggable}
            />
          </div>
        ))
      )

      }


        
      </ResponsiveGridLayout>      
    </div>
  );
}

export default App;
