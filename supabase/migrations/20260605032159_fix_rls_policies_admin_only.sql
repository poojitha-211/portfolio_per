
-- Drop all overly-permissive write policies and replace them with
-- admin-only checks using app_metadata claim from the JWT.
-- The admin flag is set via Supabase dashboard > Auth > Users > app_metadata: {"is_admin": true}

-- ============================================================
-- PROJECTS
-- ============================================================
DROP POLICY IF EXISTS "Authenticated users can insert projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can update projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can delete projects" ON projects;

CREATE POLICY "Admin can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true);

CREATE POLICY "Admin can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true)
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true);

CREATE POLICY "Admin can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true);

-- ============================================================
-- CERTIFICATES
-- ============================================================
DROP POLICY IF EXISTS "Authenticated users can insert certificates" ON certificates;
DROP POLICY IF EXISTS "Authenticated users can update certificates" ON certificates;
DROP POLICY IF EXISTS "Authenticated users can delete certificates" ON certificates;

CREATE POLICY "Admin can insert certificates"
  ON certificates FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true);

CREATE POLICY "Admin can update certificates"
  ON certificates FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true)
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true);

CREATE POLICY "Admin can delete certificates"
  ON certificates FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true);

-- ============================================================
-- CONTACT MESSAGES
-- ============================================================
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can update messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can delete messages" ON contact_messages;

-- Public INSERT: restrict to non-empty, reasonably sized fields only
CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(name))    BETWEEN 1 AND 100 AND
    length(trim(email))   BETWEEN 5 AND 254 AND
    length(trim(subject)) BETWEEN 1 AND 200 AND
    length(trim(message)) BETWEEN 1 AND 5000
  );

CREATE POLICY "Admin can update messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true)
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true);

CREATE POLICY "Admin can delete messages"
  ON contact_messages FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true);

-- ============================================================
-- EXPERIENCES
-- ============================================================
DROP POLICY IF EXISTS "Authenticated users can insert experiences" ON experiences;
DROP POLICY IF EXISTS "Authenticated users can update experiences" ON experiences;
DROP POLICY IF EXISTS "Authenticated users can delete experiences" ON experiences;

CREATE POLICY "Admin can insert experiences"
  ON experiences FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true);

CREATE POLICY "Admin can update experiences"
  ON experiences FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true)
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true);

CREATE POLICY "Admin can delete experiences"
  ON experiences FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true);
