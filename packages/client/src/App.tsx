import { useEffect } from 'react'
import './App.css'
import { AuthPage } from './pages/AuthPage'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  // return <div className="App">Вот тут будет жить ваше приложение :)</div>
  return <AuthPage />
}

export default App
