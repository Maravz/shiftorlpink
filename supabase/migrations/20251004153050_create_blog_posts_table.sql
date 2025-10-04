/*
  # Create blog posts table for career shifting content

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `slug` (text, unique, required)
      - `excerpt` (text, required)
      - `content` (text, required)
      - `author` (text, required)
      - `published` (boolean, default false)
      - `published_at` (timestamp)
      - `created_at` (timestamp, default now())

  2. Security
    - Enable RLS
    - Allow public read access to published posts
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  author text NOT NULL DEFAULT 'ShiftORL Team',
  tags text[] DEFAULT '{}',
  meta_title text,
  meta_description text,
  published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, published_at DESC);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published posts"
  ON blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

INSERT INTO blog_posts (title, slug, excerpt, content, author, tags, meta_title, meta_description, published, published_at) VALUES
(
  'Making the Leap: How to Successfully Shift Your Career Path',
  'making-the-leap-successfully-shift-career',
  'Considering a career change? Learn the essential steps to successfully transition to a new field while leveraging your existing skills.',
  '<h2>When It is Time for a Career Shift</h2><p>Career changes are more common than ever. The key is approaching it strategically.</p>',
  'ShiftORL Career Team',
  ARRAY['career change', 'career shift', 'professional development'],
  'Successfully Shift Your Career | ShiftORL',
  'Learn how to make a successful career shift.',
  true,
  now()
),
(
  'From Finance to Tech: Real Stories of Career Pivots',
  'finance-to-tech-career-pivots',
  'Discover inspiring stories of professionals who successfully transitioned from finance to technology careers.',
  '<h2>Real Transitions, Real Success</h2><p>Career shifts happen every day.</p>',
  'ShiftORL Career Team',
  ARRAY['career pivot', 'finance to tech', 'career stories'],
  'Finance to Tech Career Pivots | ShiftORL',
  'Read inspiring stories of professionals who shifted from finance to tech.',
  true,
  now()
),
(
  '5 Signs It is Time to Shift Your Career',
  'five-signs-time-to-shift-career',
  'Not sure if you should make a career change? Discover five clear signs that indicate it is time for a shift.',
  '<h2>Is It Time for a Change?</h2><p>Here are five clear signs.</p>',
  'ShiftORL Career Team',
  ARRAY['career change', 'career signs', 'job satisfaction'],
  '5 Signs to Shift Your Career | ShiftORL',
  'Discover 5 clear signs it is time for a career shift.',
  true,
  now()
);