
export interface EmailData {
  type: 'BOOKING' | 'TALENT' | 'PAYMENT' | 'FORM' | 'REGISTRATION';
  metadata?: {
    ip?: string;
    userAgent?: string;
    timestamp?: string;
  };
  [key: string]: any;
}

export const getEmailTemplate = (data: EmailData) => {
  const { type, metadata, ...fields } = data;
  const timestamp = metadata?.timestamp || new Date().toLocaleString();
  const ip = metadata?.ip || 'Unknown';
  const device = metadata?.userAgent || 'Unknown';

  const titleMap = {
    BOOKING: 'New Booking Received — ATLAS',
    TALENT: 'New Talent Registration — ATLAS',
    PAYMENT: 'New Payment Confirmation — ATLAS',
    FORM: 'New Form Submission — ATLAS',
    REGISTRATION: 'New User Registration — ATLAS',
  };

  const subject = titleMap[type] || 'New Notification — ATLAS';

  const rows = Object.entries(fields)
    .filter(([key]) => !['type', 'metadata'].includes(key))
    .map(([key, value]) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid rgba(201,168,76,0.1); color: rgba(229,228,226,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 40%;">${key.replace(/_/g, ' ')}</td>
        <td style="padding: 12px 0; border-bottom: 1px solid rgba(201,168,76,0.1); color: #ffffff; font-size: 14px; font-weight: 500;">${value || 'N/A'}</td>
      </tr>
    `).join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background-color: #050505; color: #ffffff; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: #0A0A0A; border: 1px solid #C9A84C; border-radius: 24px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #0D1B2A 0%, #050505 100%); padding: 40px 20px; text-align: center; border-bottom: 1px solid rgba(201,168,76,0.2); }
        .logo { font-size: 24px; font-weight: 900; letter-spacing: 8px; color: #C9A84C; text-transform: uppercase; margin-bottom: 8px; }
        .badge { display: inline-block; padding: 4px 12px; border: 1px solid #C9A84C; border-radius: 100px; font-size: 10px; color: #C9A84C; text-transform: uppercase; letter-spacing: 2px; }
        .content { padding: 40px; }
        .title { font-size: 22px; font-weight: 700; color: #ffffff; margin-bottom: 24px; }
        .table { width: 100%; border-collapse: collapse; }
        .footer { background: #050505; padding: 24px; text-align: center; font-size: 11px; color: rgba(229,228,226,0.3); border-top: 1px solid rgba(201,168,76,0.1); }
        .metadata { margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(201,168,76,0.1); font-size: 10px; color: rgba(229,228,226,0.3); text-align: left; }
        .gold-text { color: #C9A84C; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">ATLAS</div>
          <div class="badge">Internal Notification</div>
        </div>
        <div class="content">
          <div class="title">${subject}</div>
          <table class="table">
            ${rows}
          </table>
          
          <div class="metadata">
            <p><strong>TIMESTAMP:</strong> ${timestamp}</p>
            <p><strong>USER IP:</strong> ${ip}</p>
            <p><strong>DEVICE:</strong> ${device}</p>
          </div>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} ATLAS. All rights reserved.<br>
          CONFIDENTIAL — FOR INTERNAL USE ONLY
        </div>
      </div>
    </body>
    </html>
  `;

  return { subject, html };
};
