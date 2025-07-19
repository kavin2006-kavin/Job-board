import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Users, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { JobPostForm } from '../components/JobPostForm';
import { useAuth } from '../hooks/useAuth';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  status: 'active' | 'draft' | 'closed';
  applicants: number;
  posted: string;
  views: number;
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time',
    status: 'active',
    applicants: 47,
    posted: '2024-01-15',
    views: 234
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Product',
    location: 'Remote',
    type: 'Full-time',
    status: 'active',
    applicants: 23,
    posted: '2024-01-10',
    views: 156
  },
  {
    id: '3',
    title: 'UX Designer',
    department: 'Design',
    location: 'New York, NY',
    type: 'Contract',
    status: 'draft',
    applicants: 0,
    posted: '2024-01-20',
    views: 12
  }
];

const stats = [
  { label: 'Active Jobs', icon: TrendingUp, color: 'text-indigo-600' },
  { label: 'Total Applications', icon: Users, color: 'text-emerald-600' },
  { label: 'Draft Jobs', icon: Calendar, color: 'text-purple-600' },
  { label: 'Total Views', icon: DollarSign, color: 'text-orange-600' }
];

export function EmployerDashboard() {
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const { user } = useAuth();

  // Calculate real statistics based on actual data
  const activeJobs = jobs.filter(job => job.status === 'active').length;
  const totalApplications = jobs.reduce((sum, job) => sum + job.applicants, 0);
  const draftJobs = jobs.filter(job => job.status === 'draft').length;
  const totalViews = jobs.reduce((sum, job) => sum + job.views, 0);

  const statsData = [
    { ...stats[0], value: activeJobs.toString() },
    { ...stats[1], value: totalApplications.toString() },
    { ...stats[2], value: draftJobs.toString() },
    { ...stats[3], value: totalViews.toString() }
  ];

  const handleCreateJob = () => {
    setEditingJob(null);
    setShowJobForm(true);
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setShowJobForm(true);
  };

  const handleDeleteJob = (jobId: string) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      setJobs(jobs.filter(job => job.id !== jobId));
    }
  };

  const handleJobSubmit = (jobData: any) => {
    if (editingJob) {
      // Update existing job
      setJobs(jobs.map(job => 
        job.id === editingJob.id 
          ? { ...job, ...jobData }
          : job
      ));
    } else {
      // Create new job
      const newJob: Job = {
        id: String(Date.now()),
        ...jobData,
        applicants: 0,
        posted: new Date().toISOString().split('T')[0],
        views: 0,
        status: 'active'
      };
      setJobs([newJob, ...jobs]);
    }
    setShowJobForm(false);
    setEditingJob(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (showJobForm) {
    return (
      <JobPostForm
        job={editingJob}
        onSubmit={handleJobSubmit}
        onCancel={() => {
          setShowJobForm(false);
          setEditingJob(null);
        }}
      />
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name || 'Employer'}!</h1>
            <p className="text-gray-600">Manage your job postings and applications at {user?.company || 'your company'}</p>
          </div>
          <button
            onClick={handleCreateJob}
            className="mt-4 sm:mt-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="h-5 w-5" />
            <span>Post New Job</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Your Job Postings</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applications
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{job.title}</div>
                        <div className="text-sm text-gray-500">{job.location} • {job.type}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {job.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {job.applicants}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {job.views}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(job.posted).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="View Applications"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleEditJob(job)}
                          className="text-gray-600 hover:text-gray-900 p-1"
                          title="Edit Job"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteJob(job.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete Job"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {jobs.length === 0 && (
            <div className="text-center py-12">
              <Plus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No job postings yet</h3>
              <p className="text-gray-600 mb-6">Create your first job posting to start attracting candidates</p>
              <button
                onClick={handleCreateJob}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Post Your First Job
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}