/*
  # Create team members table

  1. New Tables
    - `team_members`
      - `id` (uuid, primary key)
      - `name_pt` (text, Portuguese name)
      - `name_en` (text, English name)
      - `name_fr` (text, French name)
      - `position_pt` (text, Portuguese position/role)
      - `position_en` (text, English position/role)
      - `position_fr` (text, French position/role)
      - `bio_pt` (text, Portuguese biography/curriculum)
      - `bio_en` (text, English biography/curriculum)
      - `bio_fr` (text, French biography/curriculum)
      - `photo_url` (text, URL to team member photo)
      - `order` (int, display order)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `team_members` table
    - Add policy for public SELECT access to team members
*/

CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_pt text NOT NULL,
  name_en text NOT NULL,
  name_fr text NOT NULL,
  position_pt text NOT NULL,
  position_en text NOT NULL,
  position_fr text NOT NULL,
  bio_pt text NOT NULL DEFAULT '',
  bio_en text NOT NULL DEFAULT '',
  bio_fr text NOT NULL DEFAULT '',
  photo_url text NOT NULL,
  "order" int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to team members"
  ON team_members
  FOR SELECT
  TO public
  USING (true);
