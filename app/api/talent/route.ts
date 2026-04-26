import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder_key')
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'
)

const OWNER_EMAIL = 'atlasofficial2090@gmail.com'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      name, email, phone, category, experience,
      bio, portfolio, certification, rate
    } = body

    // 1. Save to Database
    const { error: dbError } = await supabase.from('talent_registrations').insert({
      name, email, phone, category, experience,
      bio, portfolio: portfolio || 'Not provided',
      certification, rate, status: 'pending'
    })

    if (dbError) throw dbError

    // 2. Send Email Notification
    await resend.emails.send({
      from: 'ATLAS Talent <onboarding@resend.dev>',
      to: OWNER_EMAIL,
      subject: `🌟 NEW TALENT: ${category} - ${name}`,
      html: `
        <h1>New Talent Registration</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>Expected Rate:</strong> ${rate}</p>
        <p><strong>Portfolio:</strong> ${portfolio || 'None'}</p>
        <p><strong>Certifications:</strong> ${certification}</p>
        <p><strong>Bio:</strong> ${bio}</p>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Talent Registration Error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
