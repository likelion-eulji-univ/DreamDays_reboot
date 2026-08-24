import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CheckInfoPage from './pages/CheckInfoPage'
import LoadingPage from './pages/LoadingPage'
import ResultPage from './pages/ResultPage'
import InformationPage from './pages/InformationPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/check" element={<CheckInfoPage />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/register" element={<InformationPage />} />
    </Routes>
  )
}

export default App
