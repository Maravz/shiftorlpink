import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Briefcase, MapPin } from 'lucide-react';
import TrustedCompanies from '../components/TrustedCompanies';
import Testimonial from '../components/Testimonial';
import FAQ from '../components/FAQ';

const Home: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 via-pink-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Skills, Not Biases.
              <span className="text-pink-500"> Talent First.</span>
            </h1>
            <p className="text-2xl font-semibold text-pink-500 mb-4">
              Rooted in Orlando, Driven by Talent.
            </p>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              ShiftORL US-First Careers connects exceptional professionals with high-paying opportunities across Central Florida, Puerto Rico, and remote positions. Your next career shift starts here.
            </p>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-4xl mx-auto border border-pink-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Where We Serve</h3>
              <p className="text-lg text-gray-700 mb-4">
                <strong className="text-pink-500">Central Florida:</strong> Located in the heart of Orlando, we serve the entire Central Florida region. From Lake Nona's innovation district to Winter Park's thriving business community, we bring the current possibilities of today to the future of tomorrow.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                <strong className="text-pink-500">Puerto Rico:</strong> We're proud to connect talent across Puerto Rico, from San Juan to Aguadilla, helping build stronger communities through meaningful career opportunities.
              </p>
              <p className="text-lg text-gray-700">
                <strong className="text-pink-500">Remote Opportunities:</strong> Access high-paying remote positions that let you work from anywhere while maintaining work-life balance.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/jobs"
                className="bg-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-600 transition-colors duration-200 flex items-center justify-center group"
              >
                Browse Jobs
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/blog"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-pink-500 hover:text-pink-500 transition-colors duration-200"
              >
                Career Insights
              </Link>
              <Link
                to="/hire"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-pink-500 hover:text-pink-500 transition-colors duration-200"
              >
                Hire Talent
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Active Job Listings</p>
            </div>
            <div className="p-6">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1,000+</h3>
              <p className="text-gray-600">Successful Placements</p>
            </div>
            <div className="p-6">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">2</h3>
              <p className="text-gray-600">Key Markets</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ShiftORL?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're dedicated to making your career transition as smooth and successful as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CheckCircle className="h-12 w-12 text-pink-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Curated Opportunities
              </h3>
              <p className="text-gray-600">
                Hand-picked job listings from trusted companies across Central Florida and Puerto Rico.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <Users className="h-12 w-12 text-pink-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Personal Support
              </h3>
              <p className="text-gray-600">
                Dedicated recruitment specialists to guide you through every step of your job search.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <MapPin className="h-12 w-12 text-pink-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Local Expertise
              </h3>
              <p className="text-gray-600">
                Deep knowledge of local markets and industry connections in your area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Companies Section */}
      <TrustedCompanies />

      {/* Testimonial Section */}
      <Testimonial />

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Make Your Next Move?
          </h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have found their perfect opportunity with ShiftORL.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/apply"
              className="bg-white text-pink-500 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center group"
            >
              Apply Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/jobs"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-pink-500 transition-colors duration-200"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;