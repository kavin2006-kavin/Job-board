import React, { useContext } from 'react';
import { MapPin, Clock, DollarSign, Briefcase } from 'lucide-react';
import { NavigationContext } from '../App';

const featuredJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    description: 'We are looking for a skilled Frontend Developer to join our team...',
    logo: 'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    tags: ['React', 'TypeScript', 'Remote'],
    postedDate: '2 days ago',
    category: 'Technology'
  },
  {
    id: '2',
    title: 'Marketing Manager',
    company: 'Growth Labs',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$80,000 - $100,000',
    description: 'Looking for an experienced Marketing Manager to lead our campaigns...',
    logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    tags: ['Digital Marketing', 'SEO', 'Analytics'],
    postedDate: '1 day ago',
    category: 'Marketing'
  },
  {
    id: '3',
    title: 'Data Scientist',
    company: 'DataFlow Analytics',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$110,000 - $140,000',
    description: 'Join our data science team to work on cutting-edge AI projects...',
    logo: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    tags: ['Python', 'Machine Learning', 'SQL'],
    postedDate: '3 days ago',
    category: 'Data Science'
  }
];

const categoryColors = {
  'Technology': 'bg-indigo-100 text-indigo-800',
  'Marketing': 'bg-emerald-100 text-emerald-800',
  'Data Science': 'bg-purple-100 text-purple-800',
  'Design': 'bg-rose-100 text-rose-800',
  'Sales': 'bg-orange-100 text-orange-800'
};

export function FeaturedJobs() {
  const { setPage, setSelectedJobId } = useContext(NavigationContext);

  const handleJobClick = (jobId: string) => {
    setSelectedJobId(jobId);
    setPage('job-detail');
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Job Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover hand-picked opportunities from top companies looking for talented professionals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredJobs.map((job) => (
            <div 
              key={job.id}
              onClick={() => handleJobClick(job.id)}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img 
                    src={job.logo} 
                    alt={job.company}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {job.company}
                    </h3>
                    <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium ${categoryColors[job.category] || 'bg-gray-100 text-gray-800'}`}>
                      {job.category}
                    </span>
                  </div>
                </div>
                <span className="text-sm text-gray-500 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {job.postedDate}
                </span>
              </div>

              <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {job.title}
              </h4>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Briefcase className="h-4 w-4 mr-2" />
                  {job.type}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <DollarSign className="h-4 w-4 mr-2" />
                  {job.salary}
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-xs rounded-lg font-medium border border-indigo-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => setPage('jobs')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            View All Jobs
          </button>
        </div>
      </div>
    </section>
  );
}