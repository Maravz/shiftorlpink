/*
  # Create job applications, hire inquiries, and email subscriptions tables

  1. New Tables
    - `job_applications`
      - `id` (uuid, primary key)
      - `full_name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `position` (text, required)
      - `top_skill_1` (text, required)
      - `top_skill_2` (text, required)
      - `top_skill_3` (text, required)
      - `resume_url` (text, optional)
      - `cover_letter_url` (text, optional)
      - `additional_documents_url` (text, optional)
      - `created_at` (timestamptz, default now())
    
    - `hire_inquiries`
      - `id` (uuid, primary key)
      - `company_name` (text, required)
      - `contact_name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `position_title` (text, required)
      - `department` (text, optional)
      - `responsibility_1` (text, required)
      - `responsibility_2` (text, required)
      - `responsibility_3` (text, required)
      - `salary_range` (text, optional)
      - `additional_info` (text, optional)
      - `created_at` (timestamptz, default now())
    
    - `email_subscriptions`
      - `id` (uuid, primary key)
      - `email` (text, unique, required)
      - `subscribed` (boolean, default true)
      - `created_at` (timestamptz, default now())
      - `unsubscribed_at` (timestamptz, optional)

  2. Security
    - Enable RLS on all tables
    - Allow anonymous users to insert data
    - Service role can read all data
*/

CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  position text NOT NULL,
  top_skill_1 text NOT NULL,
  top_skill_2 text NOT NULL,
  top_skill_3 text NOT NULL,
  resume_url text,
  cover_letter_url text,
  additional_documents_url text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS hire_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  position_title text NOT NULL,
  department text,
  responsibility_1 text NOT NULL,
  responsibility_2 text NOT NULL,
  responsibility_3 text NOT NULL,
  salary_range text,
  additional_info text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS email_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  unsubscribed_at timestamptz
);

ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE hire_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert applications"
  ON job_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Service role can read all applications"
  ON job_applications
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Anyone can insert hire inquiries"
  ON hire_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Service role can read all hire inquiries"
  ON hire_inquiries
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Anyone can insert email subscriptions"
  ON email_subscriptions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Service role can read all subscriptions"
  ON email_subscriptions
  FOR SELECT
  TO service_role
  USING (true);