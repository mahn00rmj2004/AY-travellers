import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// ============================================
// EMAIL TEMPLATES (Andar hi)
// ============================================

function getInquiryNotificationEmail(data: {
  fullName: string;
  email: string;
  phoneNumber: string;
  service: string;
  message: string;
  inquiryId: string;
}) {
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
        .message-box { background-color: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #0d9488; margin-top: 5px; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
        .badge { display: inline-block; background-color: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"><h1>📩 New Inquiry Received</h1></div>
        <div style="text-align: center; margin-bottom: 25px;">
          <span class="badge">New</span>
          <span style="color: #6b7280; font-size: 14px; margin-left: 10px;">${new Date().toLocaleString()}</span>
        </div>
        <div class="field"><div class="label"> Full Name</div><div class="value">${data.fullName}</div></div>
        <div class="field"><div class="label"> Email</div><div class="value"><a href="mailto:${data.email}" style="color: #0d9488;">${data.email}</a></div></div>
        <div class="field"><div class="label"> Phone Number</div><div class="value"><a href="tel:${data.phoneNumber}" style="color: #0d9488;">${data.phoneNumber}</a></div></div>
        <div class="field"><div class="label"> Service Interested In</div><div class="value"><span style="background-color: #e0f2fe; padding: 4px 12px; border-radius: 20px;">${data.service}</span></div></div>
        <div class="field"><div class="label"> Message</div><div class="message-box"><div class="value" style="white-space: pre-line;">${data.message}</div></div></div>
        <div class="footer"><p>Inquiry ID: ${data.inquiryId}</p></div>
      </div>
    </body>
    </html>
  `;
}

function getInquiryConfirmationEmail(data: {
  fullName: string;
  service: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 500px; margin: 40px auto; background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); text-align: center; }
        .header { font-size: 48px; margin-bottom: 20px; }
        h1 { color: #0d9488; font-size: 24px; margin-bottom: 10px; }
        p { color: #4b5563; line-height: 1.6; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
        .box { background-color: #f0fdf4; padding: 15px; border-radius: 8px; border-left: 4px solid #0d9488; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"></div>
        <h1>We've Received Your Inquiry!</h1>
        <p>Dear ${data.fullName},</p>
        <p>Thank you for reaching out to us regarding <strong>${data.service}</strong>. Our travel experts will get back to you within a few hours.</p>
        <div class="box">💡 Call us directly: <strong>0339-5531092</strong></div>
        <div class="footer">© ${new Date().getFullYear()} AY Travels & Tour</div>
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
// EXPORTED FUNCTIONS
// ============================================

// Admin ko notification (Fixed email)
export async function sendInquiryNotificationEmail(data: {
  fullName: string;
  email: string;
  phoneNumber: string;
  service: string;
  message: string;
  inquiryId: string;
}) {
  // FIXED ADMIN EMAIL - Directly likh do
  const adminEmail = 'abdullahyamnahajjumrah@gmail.com'; // Ya jo bhi tumhara admin email hai
  
  return sendEmail(
    adminEmail,
    `📩 New Inquiry: ${data.service} from ${data.fullName}`,
    getInquiryNotificationEmail(data),
    data.email // Reply-to user ka email
  );
}

// User ko confirmation
export async function sendInquiryConfirmationEmail(data: {
  email: string;
  fullName: string;
  service: string;
}) {
  return sendEmail(
    data.email,
    ' We\'ve Received Your Inquiry - AY Travels',
    getInquiryConfirmationEmail(data)
  );
}