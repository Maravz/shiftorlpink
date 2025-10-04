import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialData {
  company: string;
  initials: string;
  quote: string;
  subtitle: string;
  location: string;
}

const testimonials: TestimonialData[] = [
  {
    company: 'Mariner Finance',
    initials: 'MF',
    quote: 'ShiftORL helped us find exceptional finance professionals who understood both our business needs and the local market. Their commitment to matching skills with opportunities is unmatched.',
    subtitle: 'Financial Services Leader',
    location: 'Central Florida'
  },
  {
    company: 'Andor Health',
    initials: 'AH',
    quote: 'The healthcare talent ShiftORL provided exceeded our expectations. They truly understand the unique requirements of medical staffing and deliver candidates who are both qualified and culturally aligned.',
    subtitle: 'Healthcare Technology',
    location: 'Orlando, FL'
  },
  {
    company: 'Career Source',
    initials: 'CS',
    quote: 'As a workforce development organization, we appreciate ShiftORL\'s dedication to skills-first hiring. They share our values and consistently connect talented individuals with meaningful opportunities.',
    subtitle: 'Workforce Development Partner',
    location: 'Florida Statewide'
  },
  {
    company: 'Lemonade Inc',
    initials: 'LI',
    quote: 'ShiftORL understands the fast-paced startup environment. They helped us build our marketing team with creative, driven professionals who hit the ground running.',
    subtitle: 'Marketing & Creative Agency',
    location: 'Winter Park, FL'
  },
  {
    company: 'Happy Co',
    initials: 'HC',
    quote: 'Finding tech talent in Puerto Rico was challenging until we partnered with ShiftORL. Their regional expertise and commitment to quality placements made all the difference.',
    subtitle: 'Technology Startup',
    location: 'San Juan, PR'
  },
  {
    company: 'PH3',
    initials: 'PH',
    quote: 'ShiftORL helped us scale from 3 to 15 talented professionals in just 12 weeks. Their understanding of startups and ability to find culture-fit candidates has been exceptional.',
    subtitle: 'Marketing Growth Partner',
    location: 'Orlando, FL'
  }
];

const Testimonial: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 bg-gradient-to-r from-gray-100 to-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Leading Companies
          </h2>
          <p className="text-xl text-gray-600">
            Hear from companies we've partnered with across Florida and Puerto Rico
          </p>
        </div>

        <div className="relative">
          <div className="text-center">
            <Quote className="h-12 w-12 text-pink-500 mx-auto mb-6" />
            <blockquote className="text-xl md:text-2xl font-medium text-gray-900 mb-8 min-h-[150px] flex items-center justify-center">
              "{currentTestimonial.quote}"
            </blockquote>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <span className="text-white font-bold text-lg">{currentTestimonial.initials}</span>
              </div>
              <cite className="text-lg font-semibold text-gray-900">{currentTestimonial.company}</cite>
              <p className="text-gray-600 mt-1">{currentTestimonial.subtitle}</p>
              <p className="text-sm text-pink-500 mt-1">{currentTestimonial.location}</p>
            </div>
          </div>

          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex ? 'bg-pink-500 w-8' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;