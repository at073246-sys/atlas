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
      client_name, client_phone, client_email, service_name,
      duration, amount, payment_method, transaction_id
    } = body

    // 1. Save to Database
    const { error: dbError } = await supabase.from('bookings').insert({
      client_name, client_phone, client_email, service_name,
      duration, amount, payment_method, transaction_id,
      status: 'confirmed'
    })

    if (dbError) throw dbError

    // 2. Send Email Notification
    await resend.emails.send({
      from: 'ATLAS Bookings <onboarding@resend.dev>',
      to: OWNER_EMAIL,
      subject: `✅ NEW BOOKING: ${service_name} - ${client_name}`,
      html: `
        <h1>New Booking Confirmed</h1>
        <p><strong>Service:</strong> ${service_name}</p>
        <p><strong>Client:</strong> ${client_name}</p>
        <p><strong>Phone:</strong> ${client_phone}</p>
        <p><strong>Email:</strong> ${client_email}</p>
        <p><strong>Duration:</strong> ${duration}</p>
        <p><strong>Amount:</strong> ${amount}</p>
        <p><strong>Payment:</strong> ${payment_method}</p>
        <p><strong>Transaction ID:</strong> ${transaction_id}</p>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Booking Error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
