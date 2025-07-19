import React, { useState, useContext } from 'react';
import { Search, MapPin, Filter, Briefcase, Clock, DollarSign, Heart } from 'lucide-react';
import { NavigationContext } from '../App';

const jobCategories = ['All', 'Technology', 'Marketing', 'Design', 'Data Science', 'Sales', 'Finance', 'HR'];
const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract', 'Remote'];
const experienceLevels = ['All', 'Entry Level', 'Mid Level', 'Senior Level', 'Executive'];

const allJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    description: 'We are looking for a skilled Frontend Developer to join our team and work on cutting-edge web applications...',
    logo: 'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    tags: ['React', 'TypeScript', 'Remote'],
    postedDate: '2 days ago',
    category: 'Technology',
    experience: 'Senior Level',
    featured: true
  },
  {
    id: '2',
    title: 'Marketing Manager',
    company: 'Growth Labs',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$80,000 - $100,000',
    description: 'Looking for an experienced Marketing Manager to lead our digital marketing campaigns and drive growth...',
    logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    tags: ['Digital Marketing', 'SEO', 'Analytics'],
    postedDate: '1 day ago',
    category: 'Marketing',
    experience: 'Mid Level',
    featured: false
  },
  {
    id: '3',
    title: 'Data Scientist',
    company: 'DataFlow Analytics',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$110,000 - $140,000',
    description: 'Join our data science team to work on cutting-edge AI projects and help shape the future of analytics...',
    logo: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    tags: ['Python', 'Machine Learning', 'SQL'],
    postedDate: '3 days ago',
    category: 'Data Science',
    experience: 'Senior Level',
    featured: true
  },
  {
    id: '4',
    title: 'UX Designer',
    company: 'Design Studio',
    location: 'Los Angeles, CA',
    type: 'Contract',
    salary: '$70 - $90/hour',
    description: 'We need a creative UX Designer to help us create amazing user experiences for our mobile applications...',
    logo: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    tags: ['Figma', 'Prototyping', 'User Research'],
    postedDate: '4 days ago',
    category: 'Design',
    experience: 'Mid Level',
    featured: false
  }
];

const categoryColors = {
  'Technology': 'bg-indigo-100 text-indigo-800',
  'Marketing': 'bg-emerald-100 text-emerald-800',
  'Data Science': 'bg-purple-100 text-purple-800',
  'Design': 'bg-rose-100 text-rose-800',
  'Sales': 'bg-orange-100 text-orange-800',
  'Finance': 'bg-amber-100 text-amber-800',
  'HR': 'bg-red-100 text-red-800'
};

export function JobListings() {
  const { setPage, setSelectedJobId } = useContext(NavigationContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());

  const handleJobClick = (jobId: string) => {
    setSelectedJobId(jobId);
    setPage('job-detail');
  };

  const toggleSaveJob = (jobId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSavedJobs = new Set(savedJobs);
    if (savedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
    } else {
      newSavedJobs.add(jobId);
    }
    setSavedJobs(newSavedJobs);
  };

  const filteredJobs = allJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = location === '' || job.location.toLowerCase().includes(location.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
    const matchesType = selectedType === 'All' || job.type === selectedType;
    const matchesExperience = selectedExperience === 'All' || job.experience === selectedExperience;

    return matchesSearch && matchesLocation && matchesCategory && matchesType && matchesExperience;
  });

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Next Opportunity</h1>
          <p className="text-gray-600">Discover {allJobs.length} amazing job opportunities waiting for you</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full lg:w-64 pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {jobCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {jobTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                <select
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {experienceLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {filteredJobs.length} of {allJobs.length} jobs
          </p>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Most Recent</option>
            <option>Salary: High to Low</option>
            <option>Salary: Low to High</option>
            <option>Company A-Z</option>
          </select>
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div 
              key={job.id}
              onClick={() => handleJobClick(job.id)}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 group relative"
            >
              {job.featured && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Featured
                </div>
              )}

              <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                  <img 
                    src={job.logo} 
                    alt={job.company}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${categoryColors[job.category] || 'bg-gray-100 text-gray-800'}`}>
                        {job.category}
                      </span>
                    </div>
                    <p className="text-lg text-gray-700 font-medium mb-2">{job.company}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {job.type}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {job.salary}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.postedDate}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-sm rounded-lg font-medium border border-indigo-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col items-center space-x-3 lg:space-x-0 lg:space-y-3">
                  <button
                    onClick={(e) => toggleSaveJob(job.id, e)}
                    className={`p-2 rounded-lg transition-colors ${
                      savedJobs.has(job.id) 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${savedJobs.has(job.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedJobId(job.id);
                      setPage('apply');
                    }}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setLocation('');
                setSelectedCategory('All');
                setSelectedType('All');
                setSelectedExperience('All');
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}