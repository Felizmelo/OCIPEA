/*
  # Add write policies to team_members table

  1. Changes
    - Add INSERT policy for public access (admin panel is public)
    - Add UPDATE policy for public access
    - Add DELETE policy for public access

  This allows the admin panel to create, update and delete team members
  without requiring authentication.
*/

CREATE POLICY "Allow public insert team members"
  ON team_members
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update team members"
  ON team_members
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete team members"
  ON team_members
  FOR DELETE
  TO public
  USING (true);
