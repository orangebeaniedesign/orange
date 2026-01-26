/*
  # Fix RLS Policy for Projects Table
  
  1. Changes
    - Drop existing policy that uses 'public' role
    - Create new policy for 'anon' role to allow unauthenticated users to view projects
  
  2. Security
    - Allows anonymous users to SELECT all projects
    - Required for the portfolio to display on the public website
*/

DROP POLICY IF EXISTS "Anyone can view projects" ON projects;

CREATE POLICY "Enable read access for all users"
  ON projects
  FOR SELECT
  TO anon
  USING (true);