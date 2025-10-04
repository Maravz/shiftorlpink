import React from 'react';
import { FileText, Scale, Users, Shield } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <FileText className="h-12 w-12 text-pink-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
            <p className="text-gray-600">Last updated: January 2025</p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to ShiftORL US-First Careers</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms of Service govern your use of our recruitment services and website. By accessing
                or using our services, you agree to be bound by these terms and all applicable laws and regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Scale className="h-6 w-6 mr-2 text-pink-500" />
                Equal Opportunity and Non-Discrimination Policy
              </h2>
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-6 mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Skills, Not Biases. Talent First.</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  ShiftORL US-First Careers is committed to providing equal employment opportunities and
                  maintaining a discrimination-free recruitment process. We comply with all applicable federal,
                  state, and local employment laws.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Federal Employment Laws</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We strictly adhere to all federal employment laws, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Title VII of the Civil Rights Act of 1964:</strong> Prohibits discrimination based on race, color, religion, sex, or national origin</li>
                <li><strong>Age Discrimination in Employment Act (ADEA):</strong> Protects individuals 40+ from age discrimination</li>
                <li><strong>Americans with Disabilities Act (ADA):</strong> Prohibits discrimination against qualified individuals with disabilities</li>
                <li><strong>Genetic Information Nondiscrimination Act (GINA):</strong> Prohibits discrimination based on genetic information</li>
                <li><strong>Equal Pay Act:</strong> Requires equal pay for equal work regardless of sex</li>
                <li><strong>Pregnancy Discrimination Act:</strong> Prohibits discrimination based on pregnancy</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Florida Employment Laws</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Florida Civil Rights Act (FCRA):</strong> Prohibits discrimination based on race, color, religion, sex, pregnancy, national origin, age, handicap, or marital status</li>
                <li><strong>Minimum Wage:</strong> Compliance with Florida minimum wage requirements</li>
                <li><strong>Whistleblower Protection:</strong> FL Statute 448.102 protects employees who report violations</li>
                <li><strong>Workers Compensation:</strong> All placements comply with FL workers comp requirements</li>
                <li><strong>E-Verify:</strong> Compliance with E-Verify requirements for applicable employers</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Puerto Rico Employment Laws</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Law 100:</strong> Protections against unjust dismissal</li>
                <li><strong>Law 80:</strong> Severance pay requirements</li>
                <li><strong>Law 379:</strong> Christmas bonus requirements</li>
                <li><strong>Law 148:</strong> Vacation and sick leave requirements</li>
                <li><strong>Equal Employment Opportunity:</strong> PR Law 100 of 1959 prohibits employment discrimination</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Remote Work Compliance</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                For remote positions, we ensure compliance with:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Employment laws in both employer and employee states</li>
                <li>State tax withholding and unemployment insurance requirements</li>
                <li>Workers compensation coverage for remote employees</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Users className="h-6 w-6 mr-2 text-pink-500" />
                Our Commitment to Fair Hiring
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                <div>
                  <p className="font-semibold text-gray-900">Skills-Based Evaluation</p>
                  <p className="text-gray-700 text-sm ml-4">Candidates evaluated solely on qualifications, skills, and experience</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Reasonable Accommodations</p>
                  <p className="text-gray-700 text-sm ml-4">We work with employers to ensure accommodations for qualified individuals with disabilities</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Salary Transparency</p>
                  <p className="text-gray-700 text-sm ml-4">Focus on positions with competitive salaries and transparent compensation</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Terms</h2>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">For Job Seekers</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6">
                <li>Recruitment services provided at no cost to candidates</li>
                <li>You authorize us to share your information with potential employers</li>
                <li>You are responsible for accuracy of information provided</li>
                <li>We respond to inquiries within 3 business days (excluding US holidays)</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">For Employers</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Placement fee: 20% of annual salary, paid in two installments</li>
                <li>First payment (10%): Due upon candidate placement and start date</li>
                <li>Second payment (10%): Due after 30-day placement period</li>
                <li>15-day evaluation period with free replacement within 45 days</li>
              </ul>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="h-6 w-6 mr-2 text-pink-500" />
                Contact Information
              </h2>
              <div className="space-y-2 text-gray-700">
                <p><strong>General:</strong> info@shiftorl.site</p>
                <p><strong>Phone:</strong> 407-949-0718</p>
                <p><strong>Hours:</strong> Mon-Thu, 9am-3pm EST</p>
              </div>
            </section>

            <section className="bg-pink-50 border border-pink-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Equal Employment Opportunity Statement</h3>
              <p className="text-gray-700 leading-relaxed">
                ShiftORL US-First Careers is an Equal Opportunity Employer committed to creating a diverse
                and inclusive environment. All qualified candidates receive consideration without regard to
                race, color, religion, sex, sexual orientation, gender identity, national origin, disability,
                veteran status, or any characteristic protected by applicable law.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                <strong>Skills, Not Biases. Talent First.</strong>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
