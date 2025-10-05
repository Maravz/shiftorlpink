import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, Mail, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  location: string;
  message: string;
  skill1: string;
  skill2: string;
  skill3: string;
}

const Apply: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    location: '',
    message: '',
    skill1: '',
    skill2: '',
    skill3: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setErrorMessage('');
      } else {
        setErrorMessage('Please upload a PDF, DOC, or DOCX file');
        e.target.value = '';
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setErrorMessage('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-application`;

      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('position', formData.position);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('skill1', formData.skill1);
      formDataToSend.append('skill2', formData.skill2);
      formDataToSend.append('skill3', formData.skill3);

      if (file) {
        formDataToSend.append('resume', file);
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: formDataToSend
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit application');
      }

      setSubmitStatus('success');
      setShowThankYou(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        location: '',
        message: '',
        skill1: '',
        skill2: '',
        skill3: ''
      });
      setFile(null);
      const fileInput = document.getElementById('resume') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      setTimeout(() => {
        setShowThankYou(false);
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit application. Please try again or email your resume directly to apply@shiftorl.site');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Thank You Popup */}
        {showThankYou && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md mx-4 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
              <p className="text-gray-700 mb-6">
                Thank you for applying! We'll get back to you within 3 business days.
              </p>
              <button
                onClick={() => setShowThankYou(false)}
                className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Apply for Opportunities</h1>
            <p className="text-lg text-gray-600 mb-4">
              Take the first step towards your next career move. Fill out the form below.
            </p>
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
              <p className="text-pink-800 text-sm mb-2">
                <strong>Prefer a streamlined application?</strong>
              </p>
              <a
                href="https://forms.zohopublic.com/shiftorl1/form/Applicants/formperma/M0bN7_1Iob8RxJtCgI1E4lQ-xJgt30jyCO-cUVy9G1k"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-pink-600 font-semibold hover:text-pink-700 transition-colors"
              >
                Apply via Zoho Forms
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>

          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-green-800 font-semibold">Application Submitted Successfully!</h3>
                <p className="text-green-700 mt-1">
                  Thank you for your application. We'll review your information and get back to you soon.
                </p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-red-800 font-semibold">Submission Failed</h3>
                <p className="text-red-700 mt-1">{errorMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                  Position of Interest
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                >
                  <option value="">Select experience level</option>
                  <option value="entry">Entry Level (0-2 years)</option>
                  <option value="mid">Mid Level (3-5 years)</option>
                  <option value="senior">Senior Level (6-10 years)</option>
                  <option value="executive">Executive (10+ years)</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Location
              </label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
              >
                <option value="">Select preferred location</option>
                <option value="orlando">Orlando, FL</option>
                <option value="winter-park">Winter Park, FL</option>
                <option value="winter-garden">Winter Garden, FL</option>
                <option value="lakeland">Lakeland, FL</option>
                <option value="winter-haven">Winter Haven, FL</option>
                <option value="apopka">Apopka, FL</option>
                <option value="sanford">Sanford, FL</option>
                <option value="deland">DeLand, FL</option>
                <option value="deltona">Deltona, FL</option>
                <option value="daytona-beach">Daytona Beach, FL</option>
                <option value="new-smyrna-beach">New Smyrna Beach, FL</option>
                <option value="san-juan">San Juan, PR</option>
                <option value="aguadilla">Aguadilla, PR</option>
                <option value="isabela">Isabela, PR</option>
                <option value="guaynabo">Guaynabo, PR</option>
                <option value="ponce">Ponce, PR</option>
                <option value="remote">Remote</option>
              </select>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Top 3 Skills for This Position *</h3>
              <p className="text-sm text-gray-600 mb-4">Tell us about your top 3 skills relevant to the position you're applying for.</p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="skill1" className="block text-sm font-medium text-gray-700 mb-2">
                    Skill 1
                  </label>
                  <input
                    type="text"
                    id="skill1"
                    name="skill1"
                    value={formData.skill1}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                    placeholder="e.g., JavaScript, Project Management, Data Analysis"
                  />
                </div>
                <div>
                  <label htmlFor="skill2" className="block text-sm font-medium text-gray-700 mb-2">
                    Skill 2
                  </label>
                  <input
                    type="text"
                    id="skill2"
                    name="skill2"
                    value={formData.skill2}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                    placeholder="e.g., React, Leadership, Financial Modeling"
                  />
                </div>
                <div>
                  <label htmlFor="skill3" className="block text-sm font-medium text-gray-700 mb-2">
                    Skill 3
                  </label>
                  <input
                    type="text"
                    id="skill3"
                    name="skill3"
                    value={formData.skill3}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                    placeholder="e.g., SQL, Team Building, Market Research"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                Resume Upload (PDF, DOC, DOCX)
              </label>
              <div className="flex items-center justify-center w-full">
                <label htmlFor="resume" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF, DOC, or DOCX (MAX. 10MB)</p>
                    {file && (
                      <p className="mt-2 text-sm text-green-600 font-medium">{file.name}</p>
                    )}
                  </div>
                  <input
                    id="resume"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors resize-vertical"
                placeholder="Tell us about your career goals, interests, or any additional information you'd like us to know..."
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-blue-800 font-semibold text-sm">Alternative Submission Method</h3>
                  <p className="text-blue-700 text-sm mt-1">
                    If you experience any issues with the form, you can email your resume directly to{' '}
                    <a href="mailto:apply@shiftorl.site" className="font-semibold underline">
                      apply@shiftorl.site
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-pink-500 text-white py-4 px-6 rounded-lg font-semibold hover:bg-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Apply;