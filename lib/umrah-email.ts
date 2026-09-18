import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// ============================================
// EMAIL TEMPLATES (Andar hi)
// ============================================

function getUmrahNotificationEmail(data: {
  travelDates: string;
  transport: string;
  hotelCity: string;
  hotel: string;
  airline: string;
  email: string;
  phoneNumber: string;
  city: string;
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
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
        .badge { display: inline-block; background-color: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .pill { display: inline-block; background-color: #e0f2fe; padding: 4px 12px; border-radius: 20px; color: #1f2937; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"><h1> New Umrah Customization Request</h1></div>
        <div style="text-align: center; margin-bottom: 25px;">
          <span class="badge">New</span>
          <span style="color: #6b7280; font-size: 14px; margin-left: 10px;">${new Date().toLocaleString()}</span>
        </div>

        <div class="field"><div class="label">Travel Dates</div><div class="value"><span class="pill">${data.travelDates}</span></div></div>
        <div class="field"><div class="label">Transport</div><div class="value">${data.transport}</div></div>
        <div class="field"><div class="label">Hotel City</div><div class="value">${data.hotelCity}</div></div>
        <div class="field"><div class="label">Hotel</div><div class="value">${data.hotel}</div></div>
        <div class="field"><div class="label">Airline</div><div class="value">${data.airline}</div></div>
        <div class="field"><div class="label">Client Email</div><div class="value"><a href="mailto:${data.email}" style="color: #0d9488;">${data.email}</a></div></div>
        <div class="field"><div class="label">Phone Number</div><div class="value"><a href="tel:${data.phoneNumber}" style="color: #0d9488;">${data.phoneNumber}</a></div></div>
        <div class="field"><div class="label">Client City</div><div class="value">${data.city}</div></div>

        <div class="footer"><p>Request ID: ${data.inquiryId}</p></div>
      </div>
    </body>
    </html>
  `;
}

function getUmrahConfirmationEmail(data: {
  hotelCity: string;
  hotel: string;
  travelDates: string;
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
        .box { background-color: #f0fdf4; padding: 15px; border-radius: 8px; border-left: 4px solid #0d9488; text-align: left; margin: 20px 0; }
        .box div { margin: 6px 0; color: #1f2937; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"></div>
        <h1>JazakAllah Khair!</h1>
        <p>We've received your Umrah customization request. Our specialists will contact you within 24 hours with a tailored quote.</p>
        <div class="box">
          <div><strong>Travel Dates:</strong> ${data.travelDates}</div>
          <div><strong>Hotel City:</strong> ${data.hotelCity}</div>
          <div><strong>Hotel:</strong> ${data.hotel}</div>
        </div>
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

export async function sendUmrahNotificationEmail(data: {
  travelDates: string;
  transport: string;
  hotelCity: string;
  hotel: string;
  airline: string;
  email: string;
  phoneNumber: string;
  city: string;
  inquiryId: string;
}) {
  const adminEmail = 'abdullahyamnahajjumrah@gmail.com';

  return sendEmail(
    adminEmail,
    ` New Umrah Request: ${data.hotelCity} · ${data.travelDates}`,
    getUmrahNotificationEmail(data),
    data.email
  );
}

export async function sendUmrahConfirmationEmail(data: {
  email: string;
  hotelCity: string;
  hotel: string;
  travelDates: string;
}) {
  return sendEmail(
    data.email,
    " We've Received Your Umrah Request — AY Travels",
    getUmrahConfirmationEmail(data)
  );
}