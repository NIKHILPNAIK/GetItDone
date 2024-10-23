import { useState } from 'react'
import './App.css'
import ToDoList from './ToDoList.jsx'
import { createContext } from 'react'
import ReactSwitch from 'react-switch'


const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light")

  const toggleTheme = () =>{
    setTheme((curr) => (curr ==="light"? "dark":"light"))
  }

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
    <div className='App' id={theme}>
      <ToDoList />
      <div className='switch'>
      <label>{theme==="light"?"🔆":"🌙"}</label>
      <ReactSwitch 
            onChange={toggleTheme} 
            checked={theme === "dark"} 
            uncheckedIcon={false} 
            checkedIcon={false}
            offColor="#74ebd5"
            onColor="#172c88"
          />
      </div>
    </div>
    </ThemeContext.Provider>
  )
}

export default App
