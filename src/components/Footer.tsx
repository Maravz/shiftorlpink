import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, ChevronRight, Mail, Phone, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const handleEmailSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribing(true);
    setSubscribeMessage('');

    try {
      const { error } = await supabase
        .from('email_subscriptions')
        .insert([{ email }]);

      if (error) throw error;

      setSubscribeMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error: any) {
      if (error.code === '23505') {
        setSubscribeMessage('You are already subscribed!');
      } else {
        setSubscribeMessage('Something went wrong. Please try again.');
      }
    } finally {
      setSubscribing(false);
      setTimeout(() => setSubscribeMessage(''), 5000);
    }
  };
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                <ChevronRight className="h-6 w-6 text-pink-500" />
                <ChevronRight className="h-6 w-6 text-pink-500 -ml-2" />
              </div>
              <span className="text-xl font-bold">ShiftORL <span className="text-pink-500">US-First Careers</span></span>
            </div>
            <p className="text-gray-400 mb-2 max-w-md font-semibold">
              Skills, Not Biases. Talent First.
            </p>
            <p className="text-gray-400 mb-6 max-w-md text-sm">
              Rooted in Orlando, Driven by Talent. Connecting exceptional professionals across Central Florida, Puerto Rico, and remote opportunities.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/shiftorl/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors duration-200"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/108946421/admin/dashboard/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors duration-200"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61581244086260"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors duration-200"
              >
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Job Listings
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Thrive Blog
                </Link>
              </li>
              <li>
                <Link to="/apply" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Apply Now
                </Link>
              </li>
              <li>
                <Link to="/hire" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Hire Talent
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400 text-sm">
              <div className="flex items-start">
                <Mail className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p>General: info@shiftorl.site</p>
                  <p>Applications: apply@shiftorl.site</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <p>407-949-0718</p>
              </div>
              <div className="flex items-start">
                <Clock className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <p>Mon-Thu: 9am-3pm EST</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Get Job Updates</h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe to receive the latest high-paying job opportunities in your inbox.</p>
            <form onSubmit={handleEmailSubscription} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="bg-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {subscribing ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {subscribeMessage && (
              <p className={`mt-2 text-sm ${subscribeMessage.includes('Thank you') ? 'text-green-400' : 'text-yellow-400'}`}>
                {subscribeMessage}
              </p>
            )}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 ShiftORL US-First Careers. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;