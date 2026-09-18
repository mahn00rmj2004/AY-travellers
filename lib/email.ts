import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'AY Travels & Tour <noreply@aytravels.com>',
      to: [to],
      subject,
      html,
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

export async function sendPasswordResetEmail(email: string, firstName: string, resetLink: string) {
  const safeFirstName = firstName?.trim() || 'there';
  
  return sendEmail({
    to: email,
    subject: 'Reset Your Password',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 500px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 40px 30px;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          .title {
            font-size: 24px;
            font-weight: bold;
            color: #333333;
            margin-bottom: 20px;
            letter-spacing: 1px;
          }
          .message {
            font-size: 16px;
            color: #555555;
            line-height: 1.6;
            margin-bottom: 30px;
          }
          .footer {
            font-size: 14px;
            color: #999999;
            line-height: 1.6;
          }
          .footer a {
            color: #0d9488;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="title">Reset Password</div>
          
          <div class="message">
            Hi ${safeFirstName}, we received a request to reset your password.
          </div>

          <!-- SIMPLE BUTTON - No CSS classes, just inline styles -->
          <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 30px auto;">
            <tr>
              <td style="background-color: #0d9488; border-radius: 12px; padding: 0;">
                <a href="${resetLink}" 
                   style="display: inline-block; 
                          background-color: #0d9488; 
                          color: #ffffff; 
                          padding: 14px 40px; 
                          border-radius: 12px; 
                          font-size: 16px; 
                          font-weight: 600; 
                          text-decoration: none; 
                          font-family: Arial, sans-serif;
                          border: none;">
                  Reset your password
                </a>
              </td>
            </tr>
          </table>

          <div class="footer">
            This link will expire in 24 hours.<br>
            If you did not request a new password, please disregard this message.
            <br><br>
            Questions? Contact <a href="mailto:support@aytravels.com">support@aytravels.com</a>
          </div>
        </div>
      </body>
      </html>
    `
  });
}

export async function sendWelcomeEmail(email: string, username: string) {
  return sendEmail({
    to: email,
    subject: 'Welcome to Our App!',
    html: `
      <h2>Welcome ${username}!</h2>
      <p>Thank you for joining our app.</p>
    `
  });
}