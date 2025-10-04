# ShiftORL Recruiting Platform

A modern recruiting website built with React, TypeScript, and Supabase.

## Features

- **Contact Form**: Collects inquiries and stores them in Supabase
- **Job Applications**: Resume upload and application processing
- **Client Inquiries**: Hiring request forms with delegation tracking
- **Job Listings**: Categorized job opportunities with filtering
- **Email Notifications**: Automated email sending via Resend API

## Setup Instructions

### 1. Supabase Configuration

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL migration to create the `client_inquiries` table:

```sql
-- Run this in your Supabase SQL editor
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
```

### 2. Environment Variables

Create a `.env` file with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Email Service Configuration (for Edge Functions)
RESEND_API_KEY=your_resend_api_key
```

### 3. Deploy Edge Functions

Deploy the Supabase Edge Functions:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Deploy the functions
supabase functions deploy process-contact-form
supabase functions deploy submit-application
supabase functions deploy submit-hire-inquiry
```

### 4. Configure Environment Variables in Supabase

In your Supabase dashboard:
1. Go to Edge Functions
2. Select each function
3. Add the `RESEND_API_KEY` environment variable

### 5. Email Service Setup

1. Create a Resend account at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Add the API key to your Supabase Edge Functions environment variables

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Database Schema

### client_inquiries Table

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key (auto-generated) |
| name | text | Contact's full name |
| email | text | Contact's email address |
| message | text | Inquiry message |
| created_at | timestamptz | Timestamp (auto-generated) |

## API Endpoints

- `POST /functions/v1/process-contact-form` - Process contact form submissions
- `POST /functions/v1/submit-application` - Process job applications
- `POST /functions/v1/submit-hire-inquiry` - Process client hiring inquiries

## Email Notifications

All form submissions trigger email notifications sent to:
- Contact forms → `hire@shiftorl.site`
- Job applications → `apply@shiftorl.site`
- Client inquiries → `hire@shiftorl.site`

## Troubleshooting

### Common Issues

1. **Form submission fails**: Check that Supabase environment variables are set correctly
2. **Email not sending**: Verify RESEND_API_KEY is configured in Edge Functions
3. **Database errors**: Ensure RLS policies are properly configured

### Checking Logs

View Edge Function logs in your Supabase dashboard under Edge Functions → Logs.