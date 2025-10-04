/*
  # Create blog posts table for Thrive blog section

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `slug` (text, unique, required)
      - `excerpt` (text, required)
      - `content` (text, required)
      - `author` (text, required)
      - `featured_image` (text, optional)
      - `tags` (text array, optional)
      - `meta_title` (text, for SEO)
      - `meta_description` (text, for SEO)
      - `published` (boolean, default false)
      - `published_at` (timestamp with timezone)
      - `created_at` (timestamp with timezone, default now())
      - `updated_at` (timestamp with timezone, default now())

  2. Security
    - Enable RLS on `blog_posts` table
    - Add policy for public read access to published posts
    - Add policy for authenticated users to manage posts
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  author text NOT NULL DEFAULT 'ShiftORL Team',
  featured_image text,
  tags text[] DEFAULT '{}',
  meta_title text,
  meta_description text,
  published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN(tags);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published posts
CREATE POLICY "Anyone can read published posts"
  ON blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- Allow authenticated users to manage all posts
CREATE POLICY "Authenticated users can manage posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, author, tags, meta_title, meta_description, published, published_at) VALUES
(
  'Mastering Remote Work: 5 Essential Skills for Success',
  'mastering-remote-work-essential-skills',
  'Discover the key skills that will help you thrive in a remote work environment and advance your career from anywhere.',
  '<h2>The Remote Work Revolution</h2>
  <p>Remote work has transformed from a rare perk to a standard expectation in today''s job market. As more companies embrace flexible work arrangements, professionals who master remote work skills gain a significant competitive advantage.</p>
  
  <h3>1. Self-Discipline and Time Management</h3>
  <p>Working from home requires exceptional self-discipline. Create a structured daily routine, set clear boundaries between work and personal time, and use productivity techniques like the Pomodoro Technique to maintain focus.</p>
  
  <h3>2. Digital Communication Excellence</h3>
  <p>Master various communication tools including Slack, Zoom, Microsoft Teams, and project management platforms. Learn to communicate clearly and concisely in writing, and know when to switch from text to video calls for complex discussions.</p>
  
  <h3>3. Tech Savviness</h3>
  <p>Develop proficiency with cloud-based tools, file sharing systems, and collaboration platforms. Troubleshoot basic technical issues independently and maintain a reliable home office setup.</p>
  
  <h3>4. Proactive Collaboration</h3>
  <p>Take initiative in team projects, regularly update colleagues on your progress, and actively participate in virtual meetings. Build strong relationships with remote teammates through intentional communication.</p>
  
  <h3>5. Adaptability and Continuous Learning</h3>
  <p>Stay current with industry trends, embrace new technologies, and continuously develop your skills through online courses and virtual networking events.</p>
  
  <h2>Your Remote Career Awaits</h2>
  <p>By developing these essential remote work skills, you''ll position yourself as a valuable asset to any organization embracing the future of work. Start building these competencies today and unlock new career opportunities in the remote job market.</p>',
  'ShiftORL Career Team',
  ARRAY['remote work', 'career development', 'productivity', 'skills'],
  'Master Remote Work: 5 Essential Skills for Career Success | ShiftORL Thrive',
  'Learn the 5 essential skills for remote work success. Master time management, digital communication, and collaboration to advance your career from anywhere.',
  true,
  now() - interval '2 days'
),
(
  'Salary Negotiation Strategies That Actually Work',
  'salary-negotiation-strategies-that-work',
  'Learn proven techniques to negotiate better compensation packages and advance your earning potential in today''s competitive job market.',
  '<h2>The Art of Salary Negotiation</h2>
  <p>Salary negotiation is one of the most impactful skills you can develop for your career. Yet many professionals leave money on the table because they''re uncomfortable with the process or lack effective strategies.</p>
  
  <h3>Research is Your Foundation</h3>
  <p>Before any negotiation, research market rates for your role using sites like Glassdoor, PayScale, and industry reports. Consider factors like location, company size, and your specific experience level. Knowledge is power in negotiations.</p>
  
  <h3>Timing Matters</h3>
  <p>The best time to negotiate is after receiving a job offer but before accepting it. For current roles, time your request around performance reviews, after completing major projects, or when taking on additional responsibilities.</p>
  
  <h3>Present Your Value Proposition</h3>
  <p>Prepare a compelling case that highlights your achievements, skills, and the value you bring to the organization. Use specific examples and quantifiable results whenever possible. Focus on what you''ve accomplished, not what you need.</p>
  
  <h3>Consider the Total Package</h3>
  <p>Salary is just one component of compensation. Consider negotiating:</p>
  <ul>
    <li>Flexible work arrangements</li>
    <li>Additional vacation time</li>
    <li>Professional development budget</li>
    <li>Stock options or bonuses</li>
    <li>Health and wellness benefits</li>
  </ul>
  
  <h3>Practice Your Pitch</h3>
  <p>Rehearse your negotiation conversation with friends or mentors. Practice staying calm, confident, and professional even if the initial response isn''t what you hoped for.</p>
  
  <h2>Negotiation Best Practices</h2>
  <ul>
    <li>Always negotiate in person or via video call when possible</li>
    <li>Be prepared to justify your request with data and examples</li>
    <li>Listen actively and be willing to find creative solutions</li>
    <li>Maintain a positive, collaborative tone throughout</li>
    <li>Get any agreements in writing</li>
  </ul>
  
  <p>Remember, the worst they can say is no – and often, they''ll say yes or offer a compromise that still improves your situation.</p>',
  'ShiftORL Career Team',
  ARRAY['salary negotiation', 'career advancement', 'compensation', 'professional development'],
  'Salary Negotiation Strategies That Work | ShiftORL Career Advice',
  'Master salary negotiation with proven strategies. Learn how to research, present your value, and negotiate better compensation packages effectively.',
  true,
  now() - interval '5 days'
),
(
  'Building Your Personal Brand in the Digital Age',
  'building-personal-brand-digital-age',
  'Discover how to create and maintain a strong personal brand that opens doors to new career opportunities and professional growth.',
  '<h2>Your Personal Brand is Your Career Asset</h2>
  <p>In today''s digital-first world, your personal brand is often the first impression you make on potential employers, clients, and collaborators. A strong personal brand can differentiate you from the competition and create opportunities you never imagined.</p>
  
  <h3>Define Your Unique Value Proposition</h3>
  <p>Start by identifying what makes you unique. What combination of skills, experiences, and perspectives do you bring to your field? Your personal brand should reflect your authentic self while highlighting your professional strengths.</p>
  
  <h3>Optimize Your LinkedIn Profile</h3>
  <p>LinkedIn is your professional home base. Ensure your profile includes:</p>
  <ul>
    <li>A professional headshot that reflects your industry</li>
    <li>A compelling headline that goes beyond your job title</li>
    <li>A summary that tells your professional story</li>
    <li>Detailed experience sections with quantifiable achievements</li>
    <li>Regular posts and articles that demonstrate your expertise</li>
  </ul>
  
  <h3>Create Valuable Content</h3>
  <p>Share insights, industry trends, and lessons learned through blog posts, social media updates, and professional articles. Consistency is key – aim to share valuable content regularly rather than sporadically.</p>
  
  <h3>Network Authentically</h3>
  <p>Build genuine relationships within your industry. Attend virtual events, participate in online discussions, and offer help to others without expecting immediate returns. Authentic networking builds lasting professional relationships.</p>
  
  <h3>Monitor Your Digital Footprint</h3>
  <p>Regularly Google yourself to see what appears in search results. Ensure your social media profiles present a professional image, and consider creating a personal website to control your online narrative.</p>
  
  <h2>Consistency Across Platforms</h2>
  <p>Maintain consistent messaging, visual elements, and tone across all your professional platforms. This creates a cohesive brand experience that''s memorable and trustworthy.</p>
  
  <h3>Measure Your Impact</h3>
  <p>Track metrics like LinkedIn profile views, article engagement, and networking connections to understand how your personal brand is performing and where you can improve.</p>
  
  <p>Building a strong personal brand takes time and consistent effort, but the career opportunities it creates make the investment worthwhile. Start today by defining your unique value and sharing it with the world.</p>',
  'ShiftORL Marketing Team',
  ARRAY['personal branding', 'linkedin', 'networking', 'career development', 'digital presence'],
  'Build Your Personal Brand in the Digital Age | ShiftORL Career Growth',
  'Learn how to build a powerful personal brand that opens career opportunities. Master LinkedIn optimization, content creation, and authentic networking.',
  true,
  now() - interval '1 week'
);