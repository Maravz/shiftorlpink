import React, { useState, useEffect } from 'react';
import { MapPin, Clock, DollarSign, ExternalLink, Filter, RefreshCw } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  postedDate: string;
  source: string;
}

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock job data - In production, this would come from your job scraping system
  const mockJobs: Job[] = [
    {
      id: '1',
      title: 'Senior Full Stack Developer',
      company: '',
      location: 'Orlando, FL',
      type: 'Full-time',
      salary: '$95,000 - $130,000',
      description: 'Senior Full Stack Developer position requiring expertise in React, Node.js, and cloud technologies. Remote work options available.',
      postedDate: '2025-09-28',
      source: 'Technical Roles'
    },
    {
      id: '2',
      title: 'Digital Marketing Specialist',
      company: '',
      location: 'Winter Park, FL',
      type: 'Full-time',
      salary: '$75,000 - $90,000',
      description: 'Digital marketing specialist role focusing on SEO, PPC, and social media campaigns. Analytics experience preferred.',
      postedDate: '2025-09-29',
      source: 'Marketing Roles'
    },
    {
      id: '3',
      title: 'Registered Nurse - Emergency Department',
      company: '',
      location: 'Orlando, FL',
      type: 'Full-time',
      salary: '$80,000 - $100,000',
      description: 'Emergency Department RN position. BSN required, ED experience preferred. Comprehensive benefits package included.',
      postedDate: '2025-09-30',
      source: 'Medical Roles'
    },
    {
      id: '4',
      title: 'Senior Financial Analyst',
      company: '',
      location: 'Lakeland, FL',
      type: 'Full-time',
      salary: '$70,000 - $85,000',
      description: 'Senior Financial Analyst role involving financial modeling and investment analysis. CFA or MBA preferred.',
      postedDate: '2025-10-01',
      source: 'Finance Roles'
    },
    {
      id: '5',
      title: 'Cloud DevOps Engineer',
      company: '',
      location: 'San Juan, PR',
      type: 'Full-time',
      salary: '$100,000 - $125,000',
      description: 'Cloud DevOps Engineer specializing in AWS, Docker, and Kubernetes. CI/CD pipeline experience essential.',
      postedDate: '2025-10-02',
      source: 'Technical Roles'
    },
    {
      id: '6',
      title: 'Content Marketing Manager',
      company: '',
      location: 'Remote',
      type: 'Full-time',
      salary: '$85,000 - $105,000',
      description: 'Content Marketing Manager role focusing on brand storytelling and content strategy. Remote position available.',
      postedDate: '2025-10-03',
      source: 'Marketing Roles'
    },
    {
      id: '7',
      title: 'Nurse Practitioner - Family Medicine',
      company: '',
      location: 'Winter Garden, FL',
      type: 'Full-time',
      salary: '$110,000 - $130,000',
      description: 'Family Medicine Nurse Practitioner position. MSN and certification required. Excellent work-life balance.',
      postedDate: '2025-10-04',
      source: 'Medical Roles'
    },
    {
      id: '8',
      title: 'Investment Advisor',
      company: '',
      location: 'Aguadilla, PR',
      type: 'Full-time',
      salary: '$90,000 - $140,000',
      description: 'Investment Advisor role serving high-net-worth clients. Series 7 and 66 licenses required.',
      postedDate: '2025-10-05',
      source: 'Finance Roles'
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = jobs;

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(job => job.source === categoryFilter);
    }

    setFilteredJobs(filtered);
  }, [jobs, categoryFilter]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const handleApplyClick = () => {
    window.open('https://forms.zohopublic.com/shiftorl1/form/Applicants/formperma/M0bN7_1Iob8RxJtCgI1E4lQ-xJgt30jyCO-cUVy9G1k', '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading job listings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Job Opportunities</h1>
          <p className="text-lg text-gray-600">
            Discover high-paying career opportunities ($60,000+ starting salary) in Central Florida, Puerto Rico, or remotely.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            <RefreshCw className="inline h-4 w-4 mr-1" />
            Updated every 3 weeks • {jobs.length} positions available
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Filter by Category</h2>
          </div>
          <div className="max-w-md">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Job Category
              </label>
              <select
                id="category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              >
                <option value="all">All Categories</option>
                <option value="Technical Roles">Technical Roles</option>
                <option value="Medical Roles">Medical Roles</option>
                <option value="Marketing Roles">Marketing Roles</option>
                <option value="Finance Roles">Finance Roles</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No jobs found matching your filters.</p>
              <p className="text-gray-400 mt-2">Try adjusting your search criteria.</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 sm:mb-0">{job.title}</h3>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                        {job.type}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {job.salary}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatDate(job.postedDate)}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 uppercase tracking-wider">
                        Category: {job.source}
                      </span>
                      <button
                        onClick={handleApplyClick}
                        className="bg-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-600 transition-colors duration-200 flex items-center"
                      >
                        Apply Now
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Job Categories Info */}
        <div className="mt-12 bg-pink-50 border border-pink-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-pink-900 mb-3">High-Paying Opportunities</h3>
          <p className="text-pink-800 mb-4">
            All positions listed have starting salaries of $60,000 or above across four key categories:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-pink-700">
            <div className="bg-white p-3 rounded border">
              <strong>Technical Roles</strong>
              <p className="text-xs mt-1">Software, DevOps, Data</p>
            </div>
            <div className="bg-white p-3 rounded border">
              <strong>Medical Roles</strong>
              <p className="text-xs mt-1">Nursing, PA, Healthcare</p>
            </div>
            <div className="bg-white p-3 rounded border">
              <strong>Marketing Roles</strong>
              <p className="text-xs mt-1">Digital, Strategy, Growth</p>
            </div>
            <div className="bg-white p-3 rounded border">
              <strong>Finance Roles</strong>
              <p className="text-xs mt-1">Analysis, Advisory, Planning</p>
            </div>
          </div>
          <p className="text-pink-700 mt-4 text-sm">
            <RefreshCw className="inline h-4 w-4 mr-1" />
            Job listings are automatically refreshed every 3 weeks to ensure fresh opportunities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Jobs;