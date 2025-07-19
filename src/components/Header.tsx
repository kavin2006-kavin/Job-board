import React, { useContext } from 'react';
import { Briefcase, User, LogIn, LogOut, PlusCircle, Search } from 'lucide-react';
import { NavigationContext } from '../App';
import { useAuth } from '../hooks/useAuth';

export function Header() {
  const { currentPage, setPage } = useContext(NavigationContext);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setPage('home');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setPage('home')}
          >
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-2 rounded-xl mr-3 shadow-lg">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">JobConnect</h1>
              <p className="text-xs text-gray-500">Your Career Journey Starts Here</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setPage('home')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'home' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1' 
                  : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setPage('jobs')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'jobs' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1' 
                  : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Find Jobs
            </button>
            {user?.role === 'employer' && (
              <button
                onClick={() => setPage('employer-dashboard')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'employer-dashboard' 
                    ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1' 
                    : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                Dashboard
              </button>
            )}
            {user?.role === 'candidate' && (
              <button
                onClick={() => setPage('candidate-dashboard')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'candidate-dashboard' 
                    ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1' 
                    : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                Dashboard
              </button>
            )}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm hidden sm:block">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setPage('auth')}
                className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <LogIn className="h-4 w-4" />
                <span className="text-sm font-medium">Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}