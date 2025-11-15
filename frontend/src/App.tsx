import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ListingsPage from './pages/listings'

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                  <h1 className="text-2xl font-semibold mb-2 text-purple-600">Home</h1>
                <p className="text-sm text-gray-600">
                  This is the home page. Use the navbar to go to listings.
                </p>
              </div>
            }
          />
          <Route path="/listings" element={<ListingsPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
