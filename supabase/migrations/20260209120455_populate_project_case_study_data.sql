/*
  # Populate Project Case Study Data

  1. Updated Tables
    - `projects` - populate year, client, content, and images for all existing projects

  2. Changes
    - Each project receives a year, client name, narrative content, and gallery images
    - Content is written as short poetic/editorial descriptions suitable for a case study page
    - Gallery images sourced from Pexels to complement each project's theme

  3. Notes
    - Uses UPDATE with matching titles to avoid hardcoding generated IDs
    - Content is kept brief and atmospheric to support visual-first storytelling
*/

UPDATE projects
SET
  year = '2024',
  client = 'Arvo Studio',
  content = 'A visual language built from restraint. We stripped the identity back to its core, letting negative space and deliberate typography carry the brand forward. Every touchpoint was considered, from business cards to environmental signage, creating a cohesive system that breathes.',
  images = '["https://images.pexels.com/photos/5711014/pexels-photo-5711014.jpeg?auto=compress&cs=tinysrgb&w=1260", "https://images.pexels.com/photos/6444267/pexels-photo-6444267.jpeg?auto=compress&cs=tinysrgb&w=1260", "https://images.pexels.com/photos/5816288/pexels-photo-5816288.jpeg?auto=compress&cs=tinysrgb&w=1260"]'::jsonb
WHERE title = 'Brand Identity Design';

UPDATE projects
SET
  year = '2023',
  client = 'Maison Noire',
  content = 'Light as medium. Shadow as narrative. This series explored the quiet tension between object and absence, capturing luxury goods not as products but as still lifes in their own right. Shot over three days in a converted warehouse, natural light only.',
  images = '["https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1260", "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1260", "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1260"]'::jsonb
WHERE title = 'Product Photography';

UPDATE projects
SET
  year = '2024',
  client = 'Volta Collective',
  content = 'Movement as identity. We developed a motion system that translates the brand across digital platforms, transforming static marks into living, breathing elements. Each animation was choreographed to reflect the brand''s rhythm, purposeful and unhurried.',
  images = '["https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg?auto=compress&cs=tinysrgb&w=1260", "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260", "https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=1260"]'::jsonb
WHERE title = 'Motion Graphics';

UPDATE projects
SET
  year = '2023',
  client = 'Kindred Health',
  content = 'An interface built on empathy. We designed a health companion app that prioritizes calm over urgency, guiding users through wellness routines with gentle transitions and a muted, warm palette. Every interaction was crafted to reduce cognitive load.',
  images = '["https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=1260", "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260", "https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg?auto=compress&cs=tinysrgb&w=1260"]'::jsonb
WHERE title = 'UI/UX Design';

UPDATE projects
SET
  year = '2024',
  client = 'Folio Press',
  content = 'Type as architecture. This editorial project reimagined a quarterly journal, treating each spread as a composition where whitespace holds equal weight to content. The result is a publication that invites slow reading and deliberate attention.',
  images = '["https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg?auto=compress&cs=tinysrgb&w=1260", "https://images.pexels.com/photos/5408684/pexels-photo-5408684.jpeg?auto=compress&cs=tinysrgb&w=1260", "https://images.pexels.com/photos/4792078/pexels-photo-4792078.jpeg?auto=compress&cs=tinysrgb&w=1260"]'::jsonb
WHERE title = 'Editorial Design';

UPDATE projects
SET
  year = '2023',
  client = 'Atelier Muse',
  content = 'Between pose and pause. This editorial fashion series sought the in-between moments, the gesture before the gesture. Shot on medium format with natural grain, each frame captures the quiet confidence of garments worn, not displayed.',
  images = '["https://images.pexels.com/photos/6069552/pexels-photo-6069552.jpeg?auto=compress&cs=tinysrgb&w=1260", "https://images.pexels.com/photos/4355345/pexels-photo-4355345.jpeg?auto=compress&cs=tinysrgb&w=1260", "https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=1260"]'::jsonb
WHERE title = 'Fashion Photography';
