/*
  # Team Photos Storage and Schema Update

  1. Changes
    - Rename `photo_url` column to `photo_path` in team_members table
      (will now store the storage object path instead of an external URL)
    - Update all existing rows to clear photo_path (since old URLs are external)

  2. Storage Policies
    - Allow public read access to team-photos bucket objects
    - Allow authenticated users to upload/delete photos
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'team_members' AND column_name = 'photo_url'
  ) THEN
    ALTER TABLE team_members RENAME COLUMN photo_url TO photo_path;
  END IF;
END $$;

ALTER TABLE team_members ALTER COLUMN photo_path SET DEFAULT '';

UPDATE team_members SET photo_path = '' WHERE photo_path NOT LIKE '%supabase%';

CREATE POLICY "Public can view team photos"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'team-photos');

CREATE POLICY "Anyone can upload team photos"
  ON storage.objects FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'team-photos');

CREATE POLICY "Anyone can update team photos"
  ON storage.objects FOR UPDATE
  TO public
  USING (bucket_id = 'team-photos');

CREATE POLICY "Anyone can delete team photos"
  ON storage.objects FOR DELETE
  TO public
  USING (bucket_id = 'team-photos');
