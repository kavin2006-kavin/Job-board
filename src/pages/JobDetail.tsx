import React, { useContext } from 'react';
import { MapPin, Clock, DollarSign, Briefcase, Users, Building, Heart, Share, ArrowLeft } from 'lucide-react';
import { NavigationContext } from '../App';
import { useAuth } from '../hooks/useAuth';

interface JobDetailProps {
  jobId: string | null;
}

const jobData = {
  '1': {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    description: 'We are looking for a skilled Frontend Developer to join our team and work on cutting-edge web applications. You will be responsible for developing user-facing features, optimizing applications for speed and scalability, and collaborating with cross-functional teams.',
    logo: 'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    tags: ['React', 'TypeScript', 'Remote'],
    postedDate: '2 days ago',
    category: 'Technology',
    experience: 'Senior Level',
    applicants: 47,
    companySize: '100-500 employees',
    industry: 'Technology',
    benefits: ['Health Insurance', 'Dental Insurance', '401k Match', 'Remote Work', 'Flexible Hours', 'Stock Options'],
    requirements: [
      '5+ years of experience in Frontend Development',
      'Expert knowledge of React and TypeScript',
      'Experience with modern build tools and workflows',
      'Strong understanding of responsive design principles',
      'Experience with state management libraries (Redux, Zustand)',
      'Knowledge of testing frameworks (Jest, React Testing Library)',
      'Excellent problem-solving and communication skills'
    ],
    responsibilities: [
      'Develop and maintain user-facing features using React and TypeScript',
      'Collaborate with designers to implement pixel-perfect UI components',
      'Optimize applications for maximum speed and scalability',
      'Write clean, maintainable, and well-documented code',
      'Participate in code reviews and mentor junior developers',
      'Work closely with backend developers to integrate APIs',
      'Stay up-to-date with the latest frontend technologies and best practices'
    ],
    companyDescription: 'TechCorp Inc. is a leading technology company focused on building innovative solutions that transform how businesses operate. We pride ourselves on our collaborative culture, cutting-edge technology stack, and commitment to professional growth.'
  }
};

export function JobDetail({ jobId }: JobDetailProps) {
  const { setPage, setSelectedJobId } = useContext(NavigationContext);
  const { user } = useAuth();

  if (!jobId || !jobData[jobId as keyof typeof jobData]) {
    return (
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => setPage('jobs')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  const job = jobData[jobId as keyof typeof jobData];

  const handleApply = () => {
    if (!user) {
      setPage('auth');
      return;
    }
    setSelectedJobId(jobId);
    setPage('apply');
  };

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button 
          onClick={() => setPage('jobs')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Jobs</span>
        </button>

        {/* Job Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-6">
            <div className="flex items-start space-x-6 mb-6 lg:mb-0">
              <img 
                src={job.logo} 
                alt={job.company}
                className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <h2 className="text-xl text-gray-700 font-semibold mb-4">{job.company}</h2>
                
                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2" />
                    {job.type}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    {job.salary}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    {job.postedDate}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {job.applicants} applicants
                  </div>
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-1" />
                    {job.companySize}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row lg:flex-col items-center space-x-3 lg:space-x-0 lg:space-y-3">
              <button className="p-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              <button className="p-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                <Share className="h-5 w-5" />
              </button>
              <button 
                onClick={handleApply}
                className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all font-semibold"
              >
                Apply Now
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-lg font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h3>
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Responsibilities</h3>
              <ul className="space-y-3">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h3>
              <ul className="space-y-3">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About {job.company}</h3>
              <p className="text-gray-700 mb-4">{job.companyDescription}</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Industry:</span>
                  <span className="font-medium">{job.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Company Size:</span>
                  <span className="font-medium">{job.companySize}</span>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits</h3>
              <div className="grid grid-cols-2 gap-3">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply Section */}
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Ready to Apply?</h3>
              <p className="text-gray-700 text-sm mb-4">
                Join our team and be part of something amazing. We can't wait to hear from you!
              </p>
              <button 
                onClick={handleApply}
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all font-semibold"
              >
                Apply for this Position
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}