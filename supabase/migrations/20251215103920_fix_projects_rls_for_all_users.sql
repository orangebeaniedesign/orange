/*
  # Fix RLS Policy for Projects - Allow All Users
  
  1. Changes
    - Drop existing anon-only policy
    - Create new policy that allows both anon and authenticated users to read projects
  
  2. Security
    - Allows all users (authenticated and anonymous) to view projects
    - Required for portfolio to display correctly
*/

DROP POLICY IF EXISTS "Enable read access for all users" ON projects;

CREATE POLICY "Allow public read access to projects"
  ON projects
  FOR SELECT
  TO anon, authenticated
  USING (true);