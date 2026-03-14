import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Gamification from './pages/Gamification'
import About from './pages/About'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout><Outlet /></MainLayout>}>
          <Route index element={<Navigate to="/gamification" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/gamification" element={<Gamification />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
