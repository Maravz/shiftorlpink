import React from 'react';

const TrustedCompanies: React.FC = () => {
  const companies = [
    'PH3',
    'Happy Co',
    'Lemonade Inc',
    'Mariner Finance',
    'Andor Health',
    'Career Source',
    'Local Startups',
    'Tech Companies'
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Leading Companies
          </h2>
          <p className="text-xl text-gray-600">
            We partner with top employers to bring you the best opportunities
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {companies.map((company) => (
            <div
              key={company}
              className="bg-white p-6 rounded-lg text-center hover:bg-gray-50 transition-colors duration-200 border border-gray-200 shadow-sm hover:shadow-md"
            >
              <p className="text-gray-700 font-semibold text-sm">{company}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;