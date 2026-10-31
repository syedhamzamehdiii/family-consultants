import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SiteShell } from './components/SiteShell'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import ServicePage from './pages/ServicePage'
import StudyUkPage from './pages/StudyUkPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteShell />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="study-in-uk" element={<StudyUkPage />} />
        <Route path="services/:slug" element={<ServicePage />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
