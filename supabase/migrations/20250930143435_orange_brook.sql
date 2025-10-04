/*
  # Create client_inquiries table

  1. New Tables
    - `client_inquiries`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `message` (text, required)
      - `created_at` (timestamp with timezone, default now())

  2. Security
    - Enable RLS on `client_inquiries` table
    - Add policy for authenticated users to insert their own data
    - Add policy for service role to read all data
*/

CREATE TABLE IF NOT EXISTS client_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE client_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert inquiries (for contact form submissions)
CREATE POLICY "Anyone can insert inquiries"
  ON client_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow service role to read all inquiries (for admin access)
CREATE POLICY "Service role can read all inquiries"
  ON client_inquiries
  FOR SELECT
  TO service_role
  USING (true);