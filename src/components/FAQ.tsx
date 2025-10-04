import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'What areas do you serve?',
    answer: 'We serve Central Florida (with a focus on the Orlando region), Puerto Rico, and remote opportunities across the United States. Our expertise lies in connecting talent within these markets to exceptional career opportunities.'
  },
  {
    question: 'What types of positions do you focus on?',
    answer: 'We specialize in high-paying positions ($60,000+ starting salary) in four key sectors: Technology, Healthcare, Finance, and Marketing. All our placements are based on skills and talent, not biases.'
  },
  {
    question: 'How does your placement process work?',
    answer: 'We match candidates based on a comprehensive questionnaire and interview process to ensure the right fit for both our community and our clients. This approach ensures we understand your skills, expertise, and career goals to find the perfect match.'
  },
  {
    question: 'What is your placement guarantee?',
    answer: 'We offer a 15-day placement guarantee with a free one-time replacement if any discrepancies occur between either party. This guarantee applies within a 45-day window from the request date, ensuring peace of mind for both candidates and clients.'
  },
  {
    question: 'How much do your services cost?',
    answer: 'For candidates, our services are completely free. For employers, we work on a commission basis of 20% split into two payments: half after the candidate is handed over, and the remaining half after successful placement.'
  },
  {
    question: 'How quickly can I expect a response to my inquiry?',
    answer: 'We respond to all inquiries within 3 business days, excluding U.S. holidays. Our office hours are Monday through Thursday, 9am to 3pm EST. For urgent matters, please call us at 407-949-0718.'
  },
  {
    question: 'Do you help with resume writing and interview preparation?',
    answer: 'Yes! As part of our candidate support services, we provide guidance on resume optimization and interview preparation to help you present your best self to potential employers.'
  },
  {
    question: 'What makes ShiftORL different from other recruiting agencies?',
    answer: 'We focus on skills, not biases. Our approach is rooted in Orlando and driven by talent, with deep community connections in Central Florida and Puerto Rico. We take the time to understand both our candidates and clients to create lasting, successful placements.'
  },
  {
    question: 'How often are new job listings updated?',
    answer: 'Our job listings are refreshed every 3 weeks to ensure you have access to the latest high-paying opportunities in your field. Subscribe to our email updates to be notified when new positions become available.'
  },
  {
    question: 'Can I apply for multiple positions?',
    answer: 'Absolutely! We encourage you to apply for any positions that match your skills and career goals. Our team will work with you to identify the best opportunities based on your qualifications and preferences.'
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about ShiftORL US-First Careers
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden hover:border-pink-500 transition-colors duration-200"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center"
              >
                <span className="font-semibold text-gray-900 pr-8">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-pink-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@shiftorl.site"
              className="bg-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors duration-200"
            >
              Email Us
            </a>
            <a
              href="tel:4079490718"
              className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-pink-500 hover:text-pink-500 transition-colors duration-200"
            >
              Call 407-949-0718
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
