import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

interface Ebook {
  title: string;
  download_url: string;
}

function generateEmailLayout(content: string): string {
  return `
  <div style="font-family: 'Inter', Arial, sans-serif; background-color: #f9fafb; padding: 40px 24px; border-radius: 12px; max-width: 600px; margin: 40px auto; border: 1px solid #e2e8f0; color: #1e293b;">
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
      <tr>
        <td align="center">
          <img src="https://res.cloudinary.com/dm9r1xrdg/image/upload/v1748044277/LogoCursumi_ui3dg1.png" alt="Cursumi Logo" style="height: 56px;" />
        </td>
      </tr>
    </table>
    ${content}
    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
    <p style="text-align: center; font-size: 14px; color: #64748b; margin: 0;">
      If you have any questions, contact us at
      <a href="mailto:support@cursumi.com" style="color: #7c3aed; text-decoration: none;">support@cursumi.com</a>.
    </p>
    <p style="text-align: center; font-size: 12px; color: #94a3b8; margin-top: 12px;">
      Cursumi — Empowering readers through digital knowledge.
    </p>
  </div>`;
}

export async function sendPurchaseEmail(
  email: string,
  ebooks: Ebook[],
  name?: string
) {
  const greeting = name ? `Hi ${name},` : "Hi,";
  const subject = "Your Cursumi Ebook Purchase";

  const ebookList = ebooks
    .map(
      (ebook) => `
    <li style="margin-bottom: 16px; padding: 16px; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px;">
      <strong style="display: block; color: #111827; margin-bottom: 6px;">${ebook.title}</strong>
      <a href="${ebook.download_url}" style="color: #7c3aed; text-decoration: underline; font-size: 14px;">Download here</a>
    </li>`
    )
    .join("");

  const bodyContent = `
  <h2 style="text-align: center; color: #1e293b; font-size: 24px; margin-bottom: 12px;">🎉 Thank you for your purchase!</h2>
  <p style="text-align: center; margin-bottom: 16px;">${greeting}</p>
  <p style="text-align: center; color: #334155; font-size: 16px; margin-bottom: 24px;">
    Your payment was successful. Below you'll find your ebook(s):
  </p>
  <ul style="list-style: none; padding: 0;">
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

export async function sendContactFormEmail(
  name: string,
  email: string,
  message: string
) {
  const subject = `Nuevo mensaje del formulario de contacto de Cursumi: ${name}`;
  const toEmail = process.env.CONTACT_EMAIL_RECIPIENT;

  if (!toEmail) {
    console.error("CONTACT_EMAIL_RECIPIENT environment variable not set.");
    throw new Error("Contact email recipient is not configured.");
  }

  const bodyContent = `
  <h2 style="text-align: center; color: #1e293b; font-size: 24px; margin-bottom: 24px;">📩 Mensaje del formulario de contacto</h2>

  <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
    <p style="margin: 0 0 12px;"><strong style="color: #1e293b;">Nombre:</strong> <span style="color: #334155;">${name}</span></p>
    <p style="margin: 0 0 12px;"><strong style="color: #1e293b;">Email:</strong> 
      <a href="mailto:${email}" style="color: #7c3aed; text-decoration: none;">${email}</a>
    </p>
    <p style="margin: 0 0 8px;"><strong style="color: #1e293b;">Mensaje:</strong></p>
    <div style="background: #f8fafc; padding: 16px; border-radius: 6px; border: 1px solid #e2e8f0; white-space: pre-wrap; color: #334155;">
      ${message}
    </div>
  </div>
`;

  return resend.emails.send({
    from: "Cursumi Contact <contact@cursumi.com>",
    to: toEmail,
    subject,
    html: generateEmailLayout(bodyContent),
    replyTo: email,
  });
}
