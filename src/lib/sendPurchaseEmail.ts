import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

interface Ebook {
  title: string;
  download_url: string;
}

function generateEmailLayout(content: string): string {
  return `
    <div style="font-family: Inter, Arial, sans-serif; background: #f8fafc; padding: 24px; border-radius: 8px; max-width: 600px; margin: 20px auto; border: 1px solid #e0e7ef; color: #334155;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom: 20px;">
        <tr>
          <td align="center">
            <img src="https://res.cloudinary.com/dm9r1xrdg/image/upload/v1748044277/LogoCursumi_ui3dg1.png" alt="Cursumi Logo" style="height: 48px;" />
          </td>
        </tr>
      </table>
      ${content}
      <p style="text-align: center; color: #64748b; font-size: 14px; margin-top: 20px;">
        If you have any questions, contact us at 
        <a href="mailto:support@cursumi.com" style="color: #7c3aed;">support@cursumi.com</a>.
      </p>
      <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 30px;">
        Cursumi — Empowering readers through digital knowledge.
      </p>
    </div>
  `;
}

export async function sendPurchaseEmail(email: string, ebooks: Ebook[], name?: string) {
  const greeting = name ? `Hi ${name},` : "Hi,";
  const subject = "Your Cursumi Ebook Purchase";

  const ebookList = ebooks
    .map(
      (ebook) => `
        <li style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #eee;">
          <strong>${ebook.title}</strong><br/>
          <a href="${ebook.download_url}" style="color: #7c3aed; text-decoration: underline;">Download here</a>
        </li>`
    )
    .join("");

  const bodyContent = `
    <h2 style="color: #1e293b; text-align: center; margin-bottom: 20px;">Thank you for your purchase!</h2>
    <p style="text-align: center; margin-bottom: 16px;">${greeting}</p>
    <p style="text-align: center; margin-bottom: 20px;">Your payment was successful. Here are your ebooks:</p>
    <ul style="list-style: none; padding: 0; margin: 24px 0;">
      ${ebookList}
    </ul>
  `;

  return resend.emails.send({
    from: "Cursumi <no-reply@cursumi.com>",
    to: email,
    subject,
    html: generateEmailLayout(bodyContent),
  });
}

export async function sendContactFormEmail(name: string, email: string, message: string) {
  const subject = `Nuevo mensaje del formulario de contacto de Cursumi: ${name}`;
  const toEmail = process.env.CONTACT_EMAIL_RECIPIENT;

  if (!toEmail) {
    console.error("CONTACT_EMAIL_RECIPIENT environment variable not set.");
    throw new Error("Contact email recipient is not configured.");
  }

  const bodyContent = `
    <h2 style="color: #1e293b; text-align: center; margin-bottom: 20px;">Mensaje del formulario de contacto</h2>
    <p><strong>Nombre:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Mensaje:</strong></p>
    <p style="white-space: pre-wrap;">${message}</p>
  `;

  return resend.emails.send({
    from: "Cursumi Contact <contact@cursumi.com>",
    to: toEmail,
    subject,
    html: generateEmailLayout(bodyContent),
    replyTo: email,
  });
}
