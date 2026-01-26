/*
  # Fix RLS Policies for Experience and Statistics Tables
  
  1. Changes
    - Drop existing policies that use 'public' role
    - Create new policies for 'anon' role to allow unauthenticated users to view data
  
  2. Security
    - Allows anonymous users to SELECT all experience entries
    - Allows anonymous users to SELECT all statistics
    - Required for the portfolio website to display on the public website
*/

-- Fix experience table policy
DROP POLICY IF EXISTS "Anyone can view experience" ON experience;

CREATE POLICY "Enable read access for all users"
  ON experience
  FOR SELECT
  TO anon
  USING (true);

-- Fix statistics table policy
DROP POLICY IF EXISTS "Anyone can view statistics" ON statistics;

CREATE POLICY "Enable read access for all users"
  ON statistics
  FOR SELECT
  TO anon
  USING (true);