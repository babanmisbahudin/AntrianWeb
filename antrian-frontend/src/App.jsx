import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Kasir from './pages/Kasir.jsx'
import Penaksir from './pages/Penaksir'
import Satpam from './pages/Satpam'
import Admin from './pages/Admin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/kasir" element={<Kasir />} />
        <Route path="/penaksir" element={<Penaksir />} />
        <Route path="/satpam" element={<Satpam />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
