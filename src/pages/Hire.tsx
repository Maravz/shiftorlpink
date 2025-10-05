import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Users, Clock, Target } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  industry: string;
  companySize: string;
  positionTitle: string;
  positionLevel: string;
  timeline: string;
  budget: string;
  requirements: string;
  benefits: string;
  message: string;
  delegation1: string;
  delegation2: string;
  delegation3: string;
}

const Hire: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    industry: '',
    companySize: '',
    positionTitle: '',
    positionLevel: '',
    timeline: '',
    budget: '',
    requirements: '',
    benefits: '',
    message: '',
    delegation1: '',
    delegation2: '',
    delegation3: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Validate required fields
    if (!formData.companyName || !formData.contactName || !formData.email || !formData.phone ||
        !formData.delegation1 || !formData.delegation2 || !formData.delegation3) {
      setErrorMessage('Please fill in all required fields including the three delegation responsibilities');
      setIsSubmitting(false);
      return;
    }

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-hire-inquiry`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: formData.companyName,
          contactName: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          industry: formData.industry,
          companySize: formData.companySize,
          positionTitle: formData.positionTitle,
          positionLevel: formData.positionLevel,
          timeline: formData.timeline,
          budget: formData.budget,
          requirements: formData.requirements,
          benefits: formData.benefits,
          message: formData.message,
          delegation1: formData.delegation1,
          delegation2: formData.delegation2,
          delegation3: formData.delegation3
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit inquiry');
      }

      setSubmitStatus('success');
      setShowPopup(true);
      setShowThankYou(true);
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        industry: '',
        companySize: '',
        positionTitle: '',
        positionLevel: '',
        timeline: '',
        budget: '',
        requirements: '',
        benefits: '',
        message: '',
        delegation1: '',
        delegation2: '',
        delegation3: ''
      });

      setTimeout(() => {
        setShowPopup(false);
        setShowThankYou(false);
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit inquiry. Please try again or email us directly at hire@shiftorl.site');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Thank You Popup */}
        {showThankYou && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md mx-4 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
              <p className="text-gray-700 mb-6">
                Thank you for your time! We'll get back to you within 3 business days.
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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Hire Top Talent</h1>
            <p className="text-lg text-gray-600">
              Let us help you find the perfect candidates for your team. Tell us about your hiring needs.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
            <div className="text-center">
              <Users className="h-8 w-8 text-pink-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Quality Candidates</h3>
              <p className="text-sm text-gray-600">Pre-screened professionals ready to contribute</p>
            </div>
            <div className="text-center">
              <Clock className="h-8 w-8 text-pink-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Fast Turnaround</h3>
              <p className="text-sm text-gray-600">Quick placement process to meet your timeline</p>
            </div>
            <div className="text-center">
              <Target className="h-8 w-8 text-pink-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Perfect Match</h3>
              <p className="text-sm text-gray-600">Candidates that fit your culture and requirements</p>
            </div>
          </div>

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
            {/* Company Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Company Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                  >
                    <option value="">Select industry</option>
                    <option value="technology">Technology</option>
                    <option value="marketing">Marketing</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Size
                  </label>
                  <select
                    id="companySize"
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                  >
                    <option value="">Select company size</option>
                    <option value="startup">Startup (1-10 employees)</option>
                    <option value="small">Small (11-50 employees)</option>
                    <option value="medium">Medium (51-200 employees)</option>
                    <option value="large">Large (201-1000 employees)</option>
                    <option value="enterprise">Enterprise (1000+ employees)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    required
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                  />
                </div>

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
            </div>

            {/* Position Details */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Position Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="positionTitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Position Title
                  </label>
                  <input
                    type="text"
                    id="positionTitle"
                    name="positionTitle"
                    value={formData.positionTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="positionLevel" className="block text-sm font-medium text-gray-700 mb-2">
                    Position Level
                  </label>
                  <select
                    id="positionLevel"
                    name="positionLevel"
                    value={formData.positionLevel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                  >
                    <option value="">Select position level</option>
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid Level</option>
                    <option value="senior">Senior Level</option>
                    <option value="lead">Lead/Manager</option>
                    <option value="director">Director</option>
                    <option value="executive">Executive</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                    Hiring Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                  >
                    <option value="">Select timeline</option>
                    <option value="immediate">Immediate (within 2 weeks)</option>
                    <option value="month">Within 1 month</option>
                    <option value="quarter">Within 3 months</option>
                    <option value="flexible">Flexible timeline</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                  >
                    <option value="">Select budget range</option>
                    <option value="30k-50k">$30,000 - $50,000</option>
                    <option value="50k-75k">$50,000 - $75,000</option>
                    <option value="75k-100k">$75,000 - $100,000</option>
                    <option value="100k-150k">$100,000 - $150,000</option>
                    <option value="150k+">$150,000+</option>
                    <option value="discuss">Prefer to discuss</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">
                Key Requirements & Skills
              </label>
              <textarea
                id="requirements"
                name="requirements"
                rows={4}
                value={formData.requirements}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors resize-vertical"
                placeholder="List the key skills, experience, and qualifications you're looking for..."
              />
            </div>

            <div>
              <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 mb-2">
                Benefits & Perks
              </label>
              <textarea
                id="benefits"
                name="benefits"
                rows={3}
                value={formData.benefits}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors resize-vertical"
                placeholder="Describe the benefits, perks, and company culture..."
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Information
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors resize-vertical"
                placeholder="Any additional details about the role, team, or specific requirements..."
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Top 3 Responsibilities to Delegate *</h3>
              <p className="text-sm text-gray-600 mb-4">Tell us the top 3 responsibilities you want to delegate to the ideal candidate. This helps us understand the type of professional you need.</p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="delegation1" className="block text-sm font-medium text-gray-700 mb-2">
                    Responsibility 1 *
                  </label>
                  <input
                    type="text"
                    id="delegation1"
                    name="delegation1"
                    required
                    value={formData.delegation1}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                    placeholder="e.g., Social media management, Data entry, Customer service"
                  />
                </div>
                <div>
                  <label htmlFor="delegation2" className="block text-sm font-medium text-gray-700 mb-2">
                    Responsibility 2 *
                  </label>
                  <input
                    type="text"
                    id="delegation2"
                    name="delegation2"
                    required
                    value={formData.delegation2}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                    placeholder="e.g., Administrative tasks, Content creation, Research"
                  />
                </div>
                <div>
                  <label htmlFor="delegation3" className="block text-sm font-medium text-gray-700 mb-2">
                    Responsibility 3 *
                  </label>
                  <input
                    type="text"
                    id="delegation3"
                    name="delegation3"
                    required
                    value={formData.delegation3}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                    placeholder="e.g., Email management, Scheduling, Report generation"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-pink-500 text-white py-4 px-6 rounded-lg font-semibold hover:bg-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isSubmitting ? 'Submitting Inquiry...' : 'Submit Hiring Inquiry'}
            </button>
          </form>
        </div>

        {/* Payment Information Section - Separate from Form */}
        <div className="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-300 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Payment & Placement Information</h2>
          
          <div className="space-y-6 text-gray-800">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Standard Placement Fee: 20%</h3>
              <p className="text-gray-700 mb-6">Our placement fee is 20% of the candidate's annual salary, split into two convenient payments:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">First Half Payment (10%)</h4>
                  <p className="text-sm text-gray-600 mb-4">Due upon candidate placement and start date</p>
                  <a
                    href="https://buy.stripe.com/cN201KeE3c2ZdRmfZ0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors shadow-md"
                  >
                    Pay First Half via Stripe
                  </a>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Second Half Payment (10%)</h4>
                  <p className="text-sm text-gray-600 mb-4">Due after 30-day placement period</p>
                  <a
                    href="https://buy.stripe.com/aEUdSA67xgjf5kQaEF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors shadow-md"
                  >
                    Pay Second Half via Stripe
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Replacement Policy</h3>
              <p className="text-gray-700">
                We stand behind our placements. If any discrepancies arise between the employer and candidate 
                within <strong>45 days from the initial contact date</strong>, we will provide a replacement 
                candidate at no additional cost. This policy ensures quality matches and client satisfaction.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Stripe Invoicing</h3>
              <p className="text-gray-700">
                We use Stripe for secure payment processing and invoicing. You'll receive professional 
                invoices for both the initial placement fee and the 30-day completion payment. All 
                transactions are secure and include detailed receipts for your records.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hire;