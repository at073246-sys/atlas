# Setup Guide: Notifications & Database

To ensure you receive Email and WhatsApp notifications for every booking and talent registration, follow these steps:

## 1. Email Notifications (Resend)
We use **Resend** to send emails.
1. Go to [resend.com](https://resend.com) and create a free account.
2. Generate an **API Key**.
3. Add it to your `.env.local` (or Vercel environment variables):
   `RESEND_API_KEY=re_your_api_key_here`

## 2. Database (Supabase)
Ensure your Supabase tables are ready.
1. In your Supabase Dashboard, run these SQL queries in the SQL Editor:

```sql
-- Create bookings table
CREATE TABLE bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  client_name TEXT,
  client_phone TEXT,
  client_email TEXT,
  service_name TEXT,
  duration TEXT,
  amount TEXT,
  payment_method TEXT,
  transaction_id TEXT,
  status TEXT DEFAULT 'confirmed'
);

-- Create talent_registrations table
CREATE TABLE talent_registrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT,
  email TEXT,
  phone TEXT,
  category TEXT,
  experience TEXT,
  bio TEXT,
  portfolio TEXT,
  certification TEXT,
  rate TEXT,
  status TEXT DEFAULT 'pending'
);
```

2. Get your **Service Role Key** (found in Project Settings > API) and add it to `.env.local`:
   `SUPABASE_SERVICE_ROLE_KEY=your_service_role_key`
   *Note: This key is for server-side use only.*

## 3. WhatsApp
The system currently opens a WhatsApp chat pre-filled with the booking/registration details on the owner's number (+91 7550124573).

## 4. Summary of Environment Variables
Make sure your `.env.local` contains:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=re_your_api_key
```
