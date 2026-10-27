-- ================================================================
-- AudioMetrics Clinical Audiometry - Supabase Database & Storage Setup
-- Run this script in your Supabase Project: Dashboard -> SQL Editor -> New Query
-- ================================================================

-- 1. Create Patients Table
CREATE TABLE IF NOT EXISTS public.patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    age INTEGER NOT NULL,
    mobile TEXT UNIQUE,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Create Hearing Tests Table
CREATE TABLE IF NOT EXISTS public.hearing_tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    patient_email TEXT,
    test_date TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    test_mode TEXT DEFAULT 'Air Conduction — Headphones',
    ear TEXT DEFAULT 'Dual-Ear (Left & Right)',
    thresholds JSONB NOT NULL,
    pta_left NUMERIC,
    pta_right NUMERIC,
    pta_score NUMERIC,
    diagnosis TEXT,
    clinician_notes TEXT,
    graph_url TEXT,
    report_url TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hearing_tests ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies (Permit read/write for clinical app)
DROP POLICY IF EXISTS "Allow public read on patients" ON public.patients;
CREATE POLICY "Allow public read on patients" 
    ON public.patients FOR SELECT 
    USING (true);

DROP POLICY IF EXISTS "Allow public insert on patients" ON public.patients;
CREATE POLICY "Allow public insert on patients" 
    ON public.patients FOR INSERT 
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update on patients" ON public.patients;
CREATE POLICY "Allow public update on patients" 
    ON public.patients FOR UPDATE 
    USING (true);

DROP POLICY IF EXISTS "Allow public read on hearing_tests" ON public.hearing_tests;
CREATE POLICY "Allow public read on hearing_tests" 
    ON public.hearing_tests FOR SELECT 
    USING (true);

DROP POLICY IF EXISTS "Allow public insert on hearing_tests" ON public.hearing_tests;
CREATE POLICY "Allow public insert on hearing_tests" 
    ON public.hearing_tests FOR INSERT 
    WITH CHECK (true);

-- 5. Create Storage Bucket for Audiogram Graphs and PDF Reports
INSERT INTO storage.buckets (id, name, public) 
VALUES ('audiogram-files', 'audiogram-files', true)
ON CONFLICT (id) DO NOTHING;

-- 6. Storage Bucket Security Policies (Allow upload and read)
DROP POLICY IF EXISTS "Public Access to Audiogram Files" ON storage.objects;
CREATE POLICY "Public Access to Audiogram Files"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'audiogram-files');

DROP POLICY IF EXISTS "Allow Upload to Audiogram Files" ON storage.objects;
CREATE POLICY "Allow Upload to Audiogram Files"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'audiogram-files');

DROP POLICY IF EXISTS "Allow Update to Audiogram Files" ON storage.objects;
CREATE POLICY "Allow Update to Audiogram Files"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'audiogram-files');

-- 7. Automatic Sync Trigger: When a user signs up in Supabase Auth (auth.users),
--    automatically insert or update their row in public.patients
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.patients (id, first_name, last_name, age, mobile, email, created_at)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'first_name', 'Patient'),
        COALESCE(new.raw_user_meta_data->>'last_name', ''),
        COALESCE((new.raw_user_meta_data->>'age')::int, 30),
        COALESCE(new.raw_user_meta_data->>'mobile', ''),
        new.email,
        NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        age = EXCLUDED.age,
        mobile = EXCLUDED.mobile;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_auth_user();

