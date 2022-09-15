import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
       
    fetch('http://example.com/movies.json')
      .then(response => response.json())
      .then(data => console.log(data))  

  )
}

export default App
