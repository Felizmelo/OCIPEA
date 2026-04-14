/*
  # Create News Table

  ## Summary
  Creates a table for daily publications from the OCIPEA observatory.

  ## New Tables
  - `news`
    - `id` (uuid, primary key)
    - `title` (text) - Article title
    - `summary` (text) - Short summary/teaser
    - `content` (text) - Full article content
    - `category` (text) - Category tag (e.g., Investigação, Eventos, Publicações)
    - `image_url` (text) - Optional cover image URL
    - `author` (text) - Author name
    - `published_at` (timestamptz) - Publication date
    - `created_at` (timestamptz) - Record creation timestamp
    - `is_published` (boolean) - Draft vs published state

  ## Security
  - RLS enabled
  - Public can read published articles
  - Authenticated users can insert, update, delete (admin)
*/

CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  summary text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'Geral',
  image_url text DEFAULT '',
  author text NOT NULL DEFAULT '',
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  is_published boolean DEFAULT false
);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published news"
  ON news FOR SELECT
  USING (is_published = true);

CREATE POLICY "Authenticated users can insert news"
  ON news FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update news"
  ON news FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete news"
  ON news FOR DELETE
  TO authenticated
  USING (true);
