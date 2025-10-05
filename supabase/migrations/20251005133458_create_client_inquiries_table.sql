/*
  # Create client_inquiries table

  1. New Tables
    - `client_inquiries`
      - `id` (uuid, primary key) - Unique identifier for each inquiry
      - `name` (text) - Client's full name
      - `email` (text) - Client's email address
      - `message` (text) - Inquiry message content
      - `created_at` (timestamptz) - Timestamp when inquiry was created
  
  2. Security
    - Enable RLS on `client_inquiries` table
    - Add policy for service role to insert inquiries (used by edge functions)
    - Add policy for authenticated admins to read inquiries
*/

CREATE TABLE IF NOT EXISTS client_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE client_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can insert inquiries"
  ON client_inquiries
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read inquiries"
  ON client_inquiries
  FOR SELECT
  TO authenticated
  USING (true);