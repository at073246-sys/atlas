import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const createTransporter = () => nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.ATLAS_EMAIL,
    pass: process.env.ATLAS_GMAIL_PASS,
  },
})

const getIP = (req: Request): string => {
  return req.headers.get('x-forwarded-for') ||
    req.headers.get('x-real-ip') || 'Unknown'
}

const getTimestamp = (): string => {
  return new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'long',
  })
}

const emailStyle = `
  font-family: 'Segoe UI', Arial, sans-serif;
  max-width: 640px;
  margin: 0 auto;
  background: #0A0A0A;
  color: #E5E4E2;
  border-radius: 16px;
  border: 1px solid rgba(201,168,76,0.3);
  overflow: hidden;
`

const headerStyle = (title: string, subtitle: string) => `
  <div style="background: linear-gradient(135deg, #0D1B2A, #0A0A0A); padding: 32px; border-bottom: 1px solid rgba(201,168,76,0.3); text-align: center;">
    <h1 style="color: #C9A84C; font-size: 28px; margin: 0 0 8px; letter-spacing: 0.1em;">${title}</h1>
    <p style="color: rgba(229,228,226,0.5); margin: 0; font-size: 14px;">${subtitle}</p>
  </div>
`

const row = (label: string, value: string, highlight = false) => `
  <tr>
    <td style="padding: 10px 0; color: rgba(229,228,226,0.5); font-size: 13px; width: 180px; vertical-align: top;">${label}</td>
    <td style="padding: 10px 0; color: ${highlight ? '#C9A84C' : 'white'}; font-size: 13px; font-weight: ${highlight ? '700' : '400'}; vertical-align: top;">${value || '—'}</td>
  </tr>
`

const section = (title: string, rows: string) => `
  <div style="padding: 24px 32px; border-bottom: 1px solid rgba(201,168,76,0.1);">
    <h3 style="color: #C9A84C; font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase; margin: 0 0 16px;">${title}</h3>
    <table style="width: 100%; border-collapse: collapse;">${rows}</table>
  </div>
`

const footer = `
  <div style="padding: 24px 32px; text-align: center; background: rgba(201,168,76,0.04);">
    <p style="color: #C9A84C; font-size: 16px; font-weight: 700; margin: 0 0 4px; letter-spacing: 0.1em;">ATLAS</p>
    <p style="color: rgba(229,228,226,0.3); font-size: 12px; margin: 0; letter-spacing: 0.15em;">YOUR WORLD, OUR PROMISE.</p>
    <p style="color: rgba(229,228,226,0.2); font-size: 11px; margin: 12px 0 0;">This is an automated notification. Do not reply to this email.</p>
  </div>
`

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { type } = body
    const ip = getIP(req)
    const timestamp = getTimestamp()
    const userAgent = req.headers.get('user-agent') || 'Unknown'

    let subject = ''
    let html = ''

    // ========== BOOKING ==========
    if (type === 'BOOKING') {
      subject = `🔔 New Booking Received — ${body.service_name} — ATLAS`

      html = `<div style="${emailStyle}">
        ${headerStyle('🔔 New Booking Received!', 'ATLAS — Your World, Our Promise.')}

        ${section('Client Details',
          row('👤 Full Name', body.client_name, true) +
          row('📧 Email', body.client_email) +
          row('📱 Phone', body.client_phone)
        )}

        ${section('Booking Details',
          row('🛠 Service', body.service_name, true) +
          row('⏳ Duration', body.duration) +
          row('💰 Amount', body.amount, true) +
          row('💳 Payment Method', body.payment_method) +
          row('🔖 Transaction ID', body.transaction_id, true)
        )}

        ${section('System Info',
          row('🕐 Timestamp', timestamp) +
          row('🌐 IP Address', ip) +
          row('📱 Device', userAgent.substring(0, 80))
        )}

        <div style="padding: 20px 32px; background: rgba(201,168,76,0.06); border-left: 3px solid #C9A84C; margin: 0 32px 24px;">
          <p style="color: #C9A84C; margin: 0 0 6px; font-weight: 700; font-size: 13px;">⚠️ Action Required</p>
          <p style="color: rgba(229,228,226,0.7); margin: 0; font-size: 13px; line-height: 1.6;">
            Please verify Transaction ID <strong style="color: white;">${body.transaction_id}</strong> in your payment app and confirm the booking with the client within 2 hours.
          </p>
        </div>

        ${footer}
      </div>`
    }

    // ========== TALENT REGISTRATION ==========
    else if (type === 'TALENT') {
      subject = `🌟 New Talent Registration — ${body.category} — ATLAS`

      html = `<div style="${emailStyle}">
        ${headerStyle('🌟 New Talent Registration!', 'ATLAS — Your World, Our Promise.')}

        ${section('Personal Information',
          row('👤 Full Name', body.name, true) +
          row('📧 Email', body.email) +
          row('📱 Phone', body.phone)
        )}

        ${section('Professional Details',
          row('🎯 Category', body.category, true) +
          row('⏳ Experience', body.experience) +
          row('💰 Expected Rate', body.rate + '/day', true) +
          row('🔗 Portfolio', body.portfolio || 'Not provided')
        )}

        ${section('About & Qualifications',
          row('📝 Bio', body.bio) +
          row('🎓 Certifications', body.certification)
        )}

        ${section('System Info',
          row('🕐 Submitted At', timestamp) +
          row('🌐 IP Address', ip) +
          row('📱 Device', userAgent.substring(0, 80))
        )}

        <div style="padding: 20px 32px; background: rgba(201,168,76,0.06); border-left: 3px solid #C9A84C; margin: 0 32px 24px;">
          <p style="color: #C9A84C; margin: 0 0 6px; font-weight: 700; font-size: 13px;">📋 Next Steps</p>
          <p style="color: rgba(229,228,226,0.7); margin: 0; font-size: 13px; line-height: 1.6;">
            Review this application and contact <strong style="color: white;">${body.name}</strong> at <strong style="color: white;">${body.email}</strong> within 48 hours to complete verification.
          </p>
        </div>

        ${footer}
      </div>`
    }

    else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    const transporter = createTransporter()

    await transporter.sendMail({
      from: `"ATLAS Notifications" <${process.env.ATLAS_EMAIL}>`,
      to: process.env.ATLAS_EMAIL,
      subject,
      html,
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json({ error: 'Email failed' }, { status: 500 })
  }
}