import { useState } from 'react'
import './App.css'
import AuthenticateApp from './AuthenticateApp.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <AuthenticateApp/>
    </>
  )
}

export default App
