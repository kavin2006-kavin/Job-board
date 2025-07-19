import React, { useContext } from 'react';
import { Search, MapPin, Briefcase, Users, TrendingUp, Star } from 'lucide-react';
import { NavigationContext } from '../App';
import { FeaturedJobs } from '../components/FeaturedJobs';

export function HomePage() {
  const { setPage } = useContext(NavigationContext);

  const stats = [
    { label: 'Active Jobs', value: '2,847', icon: Briefcase, color: 'text-blue-600' },
    { label: 'Companies', value: '1,245', icon: Users, color: 'text-teal-600' },
    { label: 'Success Rate', value: '94%', icon: TrendingUp, color: 'text-green-600' },
    { label: 'User Rating', value: '4.9', icon: Star, color: 'text-yellow-600' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-300 opacity-20 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-300 opacity-15 rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400">
                Dream Job
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Connect with innovative companies and discover opportunities that align with your passion and expertise
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl p-2 shadow-2xl">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 flex items-center px-4 py-3">
                  <Search className="h-5 w-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    className="w-full text-gray-900 placeholder-gray-500 outline-none"
                  />
                </div>
                <div className="flex items-center px-4 py-3 border-t md:border-t-0 md:border-l border-gray-200">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full text-gray-900 placeholder-gray-500 outline-none"
                  />
                </div>
                <button 
                  onClick={() => setPage('jobs')}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Search Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <FeaturedJobs />

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How JobConnect Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to land your dream job or find the perfect candidate
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mb-6 shadow-lg">
                <Search className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Search & Discover</h3>
              <p className="text-gray-600">
                Browse thousands of job opportunities from top companies or search for the perfect candidate
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6 shadow-lg">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect & Apply</h3>
              <p className="text-gray-600">
                Apply with one click or connect directly with potential candidates through our platform
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl mb-6 shadow-lg">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Hired</h3>
              <p className="text-gray-600">
                Land your dream job or find the ideal team member with our streamlined hiring process
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto relative z-10">
            Join thousands of professionals who have found their perfect match on JobConnect
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <button 
              onClick={() => setPage('jobs')}
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Find Jobs Now
            </button>
            <button 
              onClick={() => setPage('auth')}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-indigo-600 transition-all transform hover:scale-105"
            >
              Post a Job
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}