
-- Roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- has_role security-definer function
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- Inquiries table
CREATE TABLE public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT,
  service TEXT,
  contact_method TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.inquiries TO authenticated;
GRANT INSERT ON public.inquiries TO anon;
GRANT ALL ON public.inquiries TO service_role;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone (including anon) can submit a new inquiry
CREATE POLICY "Anyone can submit inquiries"
ON public.inquiries FOR INSERT TO anon, authenticated
WITH CHECK (true);

-- Only admins can read
CREATE POLICY "Admins can read inquiries"
ON public.inquiries FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update
CREATE POLICY "Admins can update inquiries"
ON public.inquiries FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete
CREATE POLICY "Admins can delete inquiries"
ON public.inquiries FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER inquiries_set_updated_at
BEFORE UPDATE ON public.inquiries
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX inquiries_created_at_idx ON public.inquiries (created_at DESC);
CREATE INDEX inquiries_status_idx ON public.inquiries (status);
