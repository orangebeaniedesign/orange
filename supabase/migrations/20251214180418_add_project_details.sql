/*
  # Add Project Detail Fields

  1. Changes
    - Add `content` column to projects table for full project description (rich text/markdown)
    - Add `images` column for additional project images (JSON array)
    - Add `technologies` column for tools/technologies used (JSON array)
    - Add `project_date` column for when the project was completed
    - Add `project_url` column for live project link
    - Add `year` column for project year

  2. Notes
    - These fields are optional and can be populated as needed
    - Existing projects will have NULL values for new fields
*/

-- Add new columns to projects table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'content'
  ) THEN
    ALTER TABLE projects ADD COLUMN content text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'images'
  ) THEN
    ALTER TABLE projects ADD COLUMN images jsonb DEFAULT '[]'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'technologies'
  ) THEN
    ALTER TABLE projects ADD COLUMN technologies jsonb DEFAULT '[]'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'project_date'
  ) THEN
    ALTER TABLE projects ADD COLUMN project_date text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'project_url'
  ) THEN
    ALTER TABLE projects ADD COLUMN project_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'year'
  ) THEN
    ALTER TABLE projects ADD COLUMN year text;
  END IF;
END $$;
