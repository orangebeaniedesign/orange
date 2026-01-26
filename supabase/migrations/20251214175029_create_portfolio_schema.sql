/*
  # Portfolio Website Database Schema

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `category` (text) - branding, motion, photography, uiux
      - `image_url` (text)
      - `client` (text, optional)
      - `featured` (boolean)
      - `order_index` (integer)
      - `created_at` (timestamp)
    
    - `experience`
      - `id` (uuid, primary key)
      - `company` (text)
      - `role` (text)
      - `start_date` (text)
      - `end_date` (text)
      - `logo_url` (text, optional)
      - `order_index` (integer)
      - `created_at` (timestamp)
    
    - `statistics`
      - `id` (uuid, primary key)
      - `label` (text)
      - `percentage` (integer)
      - `order_index` (integer)
      - `created_at` (timestamp)
    
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `subject` (text)
      - `message` (text)
      - `created_at` (timestamp)
    
    - `newsletter_subscriptions`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `subscribed_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access on projects, experience, and statistics
    - Add policies for authenticated insert on contact_submissions and newsletter_subscriptions
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL CHECK (category IN ('all', 'branding', 'motion', 'photography', 'uiux')),
  image_url text NOT NULL,
  client text,
  featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create experience table
CREATE TABLE IF NOT EXISTS experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  role text NOT NULL,
  start_date text NOT NULL,
  end_date text NOT NULL,
  logo_url text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create statistics table
CREATE TABLE IF NOT EXISTS statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  percentage integer NOT NULL CHECK (percentage >= 0 AND percentage <= 100),
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create newsletter subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Projects policies (public read)
CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  USING (true);

-- Experience policies (public read)
CREATE POLICY "Anyone can view experience"
  ON experience FOR SELECT
  USING (true);

-- Statistics policies (public read)
CREATE POLICY "Anyone can view statistics"
  ON statistics FOR SELECT
  USING (true);

-- Contact submissions policies (anyone can insert)
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- Newsletter subscriptions policies (anyone can subscribe)
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscriptions FOR INSERT
  WITH CHECK (true);

-- Insert sample data for projects
INSERT INTO projects (title, description, category, image_url, featured, order_index) VALUES
('Brand Identity Design', 'Complete brand identity for modern tech startup', 'branding', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=800', true, 1),
('Product Photography', 'High-end product photography campaign', 'photography', 'https://images.pexels.com/photos/1667071/pexels-photo-1667071.jpeg?auto=compress&cs=tinysrgb&w=800', false, 2),
('Motion Graphics', 'Animated brand storytelling for social media', 'motion', 'https://images.pexels.com/photos/1714340/pexels-photo-1714340.jpeg?auto=compress&cs=tinysrgb&w=800', true, 3),
('UI/UX Design', 'Mobile app interface design and prototyping', 'uiux', 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=800', false, 4),
('Editorial Design', 'Magazine layout and typography design', 'branding', 'https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg?auto=compress&cs=tinysrgb&w=800', true, 5),
('Fashion Photography', 'Creative fashion editorial shoot', 'photography', 'https://images.pexels.com/photos/3585089/pexels-photo-3585089.jpeg?auto=compress&cs=tinysrgb&w=800', false, 6);

-- Insert sample data for experience
INSERT INTO experience (company, role, start_date, end_date, order_index) VALUES
('Freelancer', 'Freelance Designer at Websites.com', 'Jan 11 Today', '', 1),
('Nike', 'Creative Director at Nike', 'Jan 2018 - Feb 2019', '', 2),
('Mailchimp', 'Marketing Designer at Mailchimp', 'Feb 2018 - Mar 2019', '', 3),
('Envato', 'Web Designer at Envato', 'Apr 2017 - Jul 2018', '', 4),
('Optinoby', 'Head of Sales at Optinoby', 'Jan 2016 - Feb 2019', '', 5);

-- Insert sample data for statistics
INSERT INTO statistics (label, percentage, order_index) VALUES
('Customer Satisfaction', 94, 1),
('Project Completion', 80, 2),
('Client Retention', 70, 3),
('Quality Score', 80, 4);