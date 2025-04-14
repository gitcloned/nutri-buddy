import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Meals from './pages/Meals'
import Tracking from './pages/Tracking'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="meals" element={<Meals />} />
          <Route path="tracking" element={<Tracking />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
