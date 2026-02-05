import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Recipes from './pages/Recipes'
import MealPlan from './pages/MealPlan'
import ShoppingList from './pages/ShoppingList'
import Settings from './pages/Settings'

import { MealProvider } from './context/MealContext'

function App() {
  return (
    <Router>
      <MealProvider>
        <div className="app-container">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/meal-plan" element={<MealPlan />} />
              <Route path="/shopping-list" element={<ShoppingList />} />
              <Route path="/settings" element={<Settings />} />
              {/* Fallback to home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
        </div>
      </MealProvider>
    </Router>
  )
}

export default App
