/*
  # Portfolio Schema Setup

  ## New Tables

  ### 1. `projects`
  - `id` (uuid, PK)
  - `title` (text) - project name
  - `description` (text) - project description
  - `image_url` (text) - project thumbnail
  - `tech_stack` (text[]) - array of technologies used
  - `github_url` (text) - GitHub repository link
  - `live_url` (text) - live demo link
  - `featured` (boolean) - whether to feature on home page
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. `certificates`
  - `id` (uuid, PK)
  - `title` (text) - certificate name
  - `issuer` (text) - issuing organization
  - `issue_date` (date) - date issued
  - `credential_url` (text) - verification link
  - `image_url` (text) - certificate image
  - `created_at` (timestamptz)

  ### 3. `contact_messages`
  - `id` (uuid, PK)
  - `name` (text) - sender name
  - `email` (text) - sender email
  - `subject` (text) - message subject
  - `message` (text) - message body
  - `read` (boolean) - whether admin has read it
  - `created_at` (timestamptz)

  ### 4. `experiences`
  - `id` (uuid, PK)
  - `company` (text) - company name
  - `role` (text) - job title
  - `description` (text) - role description
  - `start_date` (date)
  - `end_date` (date, nullable)
  - `is_current` (boolean)
  - `type` (text) - 'internship' | 'full-time' | 'part-time'
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public can SELECT projects, certificates, experiences
  - Public can INSERT contact_messages
  - Only authenticated users (admin) can do full CRUD
*/

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  image_url text DEFAULT '',
  tech_stack text[] DEFAULT '{}',
  github_url text DEFAULT '',
  live_url text DEFAULT '',
  featured boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- Certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  issuer text NOT NULL DEFAULT '',
  issue_date date,
  credential_url text DEFAULT '',
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view certificates"
  ON certificates FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert certificates"
  ON certificates FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update certificates"
  ON certificates FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete certificates"
  ON certificates FOR DELETE
  TO authenticated
  USING (true);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  subject text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete messages"
  ON contact_messages FOR DELETE
  TO authenticated
  USING (true);

-- Experiences table
CREATE TABLE IF NOT EXISTS experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  start_date date NOT NULL,
  end_date date,
  is_current boolean DEFAULT false,
  type text DEFAULT 'internship',
  location text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view experiences"
  ON experiences FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert experiences"
  ON experiences FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update experiences"
  ON experiences FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete experiences"
  ON experiences FOR DELETE
  TO authenticated
  USING (true);
