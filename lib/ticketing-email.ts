import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// ============================================
// EMAIL TEMPLATE
// ============================================

function getTicketingNotificationEmail(data: {
  fullName: string;
  email?: string;
  phone: string;
  tripType: string;
  from: string;
  to: string;
  departure: string;
  returnDate?: string;
  passengers: string;
  classType: string;
  inquiryId: string;
}) {
  const returnRow = data.returnDate
    ? `<div class="field"><div class="label">Return Date</div><div class="value">${data.returnDate}</div></div>`
    : '';

  const emailRow = data.email
    ? `<div class="field"><div class="label">Email</div><div class="value"><a href="mailto:${data.email}" style="color: #0d9488;">${data.email}</a></div></div>`
    : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); }
        .header { background-color: #0d9488; color: white; padding: 20px; border-radius: 12px 12px 0 0; text-align: center; margin: -40px -40px 30px -40px; }
        .header h1 { margin: 0; font-size: 24px; }
        .field { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #e5e7eb; }
        .field:last-child { border-bottom: none; }
        .label { font-size: 12px; font-weight: bold; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
        .value { font-size: 16px; color: #1f2937; line-height: 1.6; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
        .badge { display: inline-block; background-color: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .pill { display: inline-block; background-color: #e0f2fe; padding: 4px 12px; border-radius: 20px; color: #1f2937; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"><h1>New Flight Inquiry</h1></div>
        <div style="text-align: center; margin-bottom: 25px;">
          <span class="badge">New</span>
          <span style="color: #6b7280; font-size: 14px; margin-left: 10px;">${new Date().toLocaleString()}</span>
        </div>

        <div class="field"><div class="label">Trip Type</div><div class="value"><span class="pill">${data.tripType}</span></div></div>
        <div class="field"><div class="label">From</div><div class="value">${data.from}</div></div>
        <div class="field"><div class="label">To</div><div class="value">${data.to}</div></div>
        <div class="field"><div class="label">Departure Date</div><div class="value">${data.departure}</div></div>
        ${returnRow}
        <div class="field"><div class="label">Passengers</div><div class="value">${data.passengers}</div></div>
        <div class="field"><div class="label">Class</div><div class="value">${data.classType}</div></div>
        <div class="field"><div class="label">Full Name</div><div class="value">${data.fullName}</div></div>
        ${emailRow}
        <div class="field"><div class="label">Phone / WhatsApp</div><div class="value"><a href="tel:${data.phone}" style="color: #0d9488;">${data.phone}</a></div></div>

        <div class="footer"><p>Inquiry ID: ${data.inquiryId}</p></div>
      </div>
    </body>
    </html>
  `;
}

// ============================================
// SEND FUNCTION
// ============================================

async function sendEmail(to: string, subject: string, html: string, replyTo?: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'AY Travels & Tour <noreply@aytravels.com>',
      to: [to],
      subject,
      html,
      replyTo: replyTo,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
}

// ============================================
// EXPORTED FUNCTION
// ============================================

export async function sendTicketingNotificationEmail(data: {
  fullName: string;
  email?: string;
  phone: string;
  tripType: string;
  from: string;
  to: string;
  departure: string;
  returnDate?: string;
  passengers: string;
  classType: string;
  inquiryId: string;
}) {
  const adminEmail = 'abdullahyamnahajjumrah@gmail.com';

  return sendEmail(
    adminEmail,
    `New Flight Inquiry: ${data.from} to ${data.to} (${data.tripType})`,
    getTicketingNotificationEmail(data),
    data.email || undefined
  );
}