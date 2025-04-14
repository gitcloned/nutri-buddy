import { Link, Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-gray-800">NutriBuddy</span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/" className="inline-flex items-center px-1 pt-1 text-gray-900">
                  Dashboard
                </Link>
                <Link to="/meals" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900">
                  Meals
                </Link>
                <Link to="/tracking" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900">
                  Tracking
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout