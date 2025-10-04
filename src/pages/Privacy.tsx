import React from 'react';
import { Lock, Eye, Database, Shield } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Lock className="h-12 w-12 text-pink-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: January 2025</p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Eye className="h-6 w-6 mr-2 text-pink-500" />
                Information We Collect
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect information to provide better services to all our users. The types of information 
                we collect include:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Name, email address, phone number</li>
                    <li>Resume and career information</li>
                    <li>Employment history and preferences</li>
                    <li>Educational background</li>
                    <li>Professional skills and certifications</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Company Information (for Employers)</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Company name and contact details</li>
                    <li>Job descriptions and requirements</li>
                    <li>Industry and company size</li>
                    <li>Hiring preferences and budget information</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Technical Information</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>IP address and browser information</li>
                    <li>Website usage patterns and analytics</li>
                    <li>Device information and operating system</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Database className="h-6 w-6 mr-2 text-pink-500" />
                How We Use Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Matching job seekers with appropriate employment opportunities</li>
                <li>Facilitating communication between candidates and employers</li>
                <li>Providing personalized job recommendations and career advice</li>
                <li>Improving our services and website functionality</li>
                <li>Sending relevant job alerts and service updates</li>
                <li>Compliance with legal obligations and dispute resolution</li>
                <li>Marketing our services (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing and Disclosure</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may share your information in the following circumstances:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">With Prospective Employers</h3>
                  <p className="text-gray-700 ml-4">
                    We share candidate information with potential employers to facilitate job matching. 
                    This includes resumes, contact information, and relevant professional details.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">With Service Providers</h3>
                  <p className="text-gray-700 ml-4">
                    We may share information with trusted third-party service providers who assist us in 
                    operating our website, conducting business, or servicing you.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Legal Requirements</h3>
                  <p className="text-gray-700 ml-4">
                    We may disclose information when required by law, court order, or government request, 
                    or to protect our rights, property, or safety.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement appropriate technical and organizational measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Limited access to personal information on a need-to-know basis</li>
                <li>Employee training on data protection and privacy</li>
                <li>Secure data centers and backup systems</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Recruitment Best Practices</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At ShiftORL US-First Careers, we are committed to ethical recruiting practices that prioritize
                Skills, Not Biases. We adhere to the following principles:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Skills-First Approach:</strong> We evaluate candidates based solely on their qualifications, skills, and experience</li>
                <li><strong>Transparent Communication:</strong> We maintain open, honest dialogue with both candidates and clients throughout the recruitment process</li>
                <li><strong>Confidentiality:</strong> All candidate and client information is treated with strict confidentiality</li>
                <li><strong>Quality Matching:</strong> We use comprehensive questionnaires and interviews to ensure the right fit between candidates and employers</li>
                <li><strong>Fair Treatment:</strong> All candidates receive equal consideration regardless of protected characteristics</li>
                <li><strong>Professional Standards:</strong> We maintain high ethical standards in all recruiting activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Placement Guarantee</h2>
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-6 mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">15-Day Placement Guarantee with Free Replacement</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We stand behind the quality of our placements. Our guarantee ensures peace of mind for both employers and candidates:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li><strong>15-Day Evaluation Period:</strong> All placements include a 15-day evaluation period from the start date</li>
                  <li><strong>45-Day Window:</strong> If any discrepancies arise between the employer and candidate within 45 days from the initial request date, we provide one free replacement</li>
                  <li><strong>Quality Assurance:</strong> This guarantee reflects our confidence in our matching process and commitment to client satisfaction</li>
                  <li><strong>No Hidden Fees:</strong> The replacement guarantee is included at no additional cost</li>
                  <li><strong>Fair Resolution:</strong> We work with both parties to understand any issues and find appropriate solutions</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Commission Structure</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For transparency, here is our standard commission structure for employer clients:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  <strong>Total Placement Fee:</strong> 20% of the candidate's annual salary
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900">First Payment (10%):</p>
                    <p className="text-gray-700 ml-4">Due upon candidate handover and confirmed start date</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Second Payment (10%):</p>
                    <p className="text-gray-700 ml-4">Due after successful 30-day placement period</p>
                  </div>
                </div>
                <p className="text-gray-600 mt-4 text-sm">
                  All payments are processed securely through Stripe. Detailed invoices are provided for each transaction.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your personal information for as long as necessary to provide our services and 
                fulfill the purposes outlined in this privacy policy. Generally, we retain:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-4">
                <li>Active candidate profiles for the duration of our relationship</li>
                <li>Inactive profiles for up to 2 years for reactivation purposes</li>
                <li>Communication records for 3 years for service improvement</li>
                <li>Legal and compliance records as required by applicable law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights and Choices</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have several rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Access:</strong> Request copies of your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Restriction:</strong> Request limitation of processing your information</li>
                <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar technologies to enhance your experience on our website. 
                These technologies help us:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and user behavior</li>
                <li>Provide personalized content and recommendations</li>
                <li>Improve website performance and functionality</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                You can control cookie settings through your browser preferences, though this may affect 
                website functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Links</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website may contain links to third-party websites, including job boards and employer 
                websites. We are not responsible for the privacy practices of these external sites. 
                We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices 
                or applicable laws. We will notify users of significant changes by email or through a 
                prominent notice on our website. Your continued use of our services after any changes 
                indicates your acceptance of the updated policy.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="h-6 w-6 mr-2 text-pink-500" />
                Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our 
                data practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Privacy Officer:</strong> privacy@shiftorl.site</p>
                <p><strong>General Inquiries:</strong> info@shiftorl.site</p>
                <p><strong>Data Requests:</strong> data@shiftorl.site</p>
                <p><strong>Phone:</strong> Available upon request</p>
              </div>
              <p className="text-gray-600 mt-4 text-sm">
                We will respond to your inquiry within 30 days of receipt.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;