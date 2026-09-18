import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json(); 

    const data = await resend.emails.send({
      from: 'AY Travels <noreply@aytravels.com>',
      to: "mahn00rmj2004@gmail.com",
      subject: 'Reset Password Verification',
      html: '<p>Click here to reset your password</p>',
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}