/*
  # Fix RLS Policies for Contact and Newsletter Tables

  1. Changes
    - Drop existing overly permissive RLS policies
    - Add new policies with proper data validation checks
    - Ensure email format validation
    - Ensure required fields are not empty

  2. Security
    - contact_submissions: Validates name, email, subject, and message are non-empty
    - contact_submissions: Validates email contains @ symbol (basic format check)
    - newsletter_subscriptions: Validates email is non-empty and contains @ symbol

  3. Notes
    - These tables intentionally allow public inserts for contact forms and newsletter signups
    - Validation is enforced at the policy level to prevent spam/abuse
    - No authentication required as these are public-facing features
*/

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Anyone can submit contact form" ON contact_submissions;
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON newsletter_subscriptions;

-- Create new policy for contact_submissions with validation
CREATE POLICY "Public can submit valid contact form"
  ON contact_submissions FOR INSERT
  WITH CHECK (
    length(trim(name)) > 0 AND
    length(trim(email)) > 0 AND
    position('@' in email) > 1 AND
    length(trim(subject)) > 0 AND
    length(trim(message)) > 0
  );

-- Create new policy for newsletter_subscriptions with validation
CREATE POLICY "Public can subscribe with valid email"
  ON newsletter_subscriptions FOR INSERT
  WITH CHECK (
    length(trim(email)) > 0 AND
    position('@' in email) > 1
  );
