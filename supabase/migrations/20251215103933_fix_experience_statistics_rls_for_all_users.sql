/*
  # Fix RLS Policies for Experience and Statistics - Allow All Users
  
  1. Changes
    - Drop existing anon-only policies
    - Create new policies that allow both anon and authenticated users
  
  2. Security
    - Allows all users to view experience and statistics
*/

DROP POLICY IF EXISTS "Enable read access for all users" ON experience;
DROP POLICY IF EXISTS "Enable read access for all users" ON statistics;

CREATE POLICY "Allow public read access to experience"
  ON experience
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access to statistics"
  ON statistics
  FOR SELECT
  TO anon, authenticated
  USING (true);