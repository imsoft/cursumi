import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

interface Ebook {
  title: string;
  download_url: string;
}

export async function sendPurchaseEmail(email: string, ebooks: Ebook[], name?: string) {
  const subject = "Your Cursumi Ebook Purchase";
  const greeting = name ? `Hi ${name},` : "Hi,";

  const ebookList = ebooks
    .map(
      (ebook) =>
        `<li style='margin-bottom: 12px;'><strong>${ebook.title}</strong><br/><a href='${ebook.download_url}' style='color: #7c3aed; text-decoration: underline;'>Download here</a></li>`
    )
    .join("");

  const html = `
    <div style="font-family: Inter, Arial, sans-serif; background: #f8fafc; padding: 32px; border-radius: 12px; max-width: 520px; margin: 0 auto; border: 1px solid #e0e7ef;">
      <img src="https://cursumi.com/cursumi-logo.svg" alt="Cursumi Logo" style="height: 48px; margin-bottom: 24px; display: block; margin-left: auto; margin-right: auto;" />
      <h2 style="color: #7c3aed; text-align: center;">Thank you for your purchase!</h2>
      <p style="text-align: center; color: #334155;">${greeting}</p>
      <p style="text-align: center; color: #334155;">Your payment was successful. Here are your ebooks:</p>
      <ul style="list-style: none; padding: 0; margin: 24px 0;">
        ${ebookList}
      </ul>
      <p style="text-align: center; color: #64748b; font-size: 14px;">If you have any questions, reply to this email or contact us at <a href="mailto:support@cursumi.com" style="color: #7c3aed;">support@cursumi.com</a>.</p>
      <p style="text-align: center; color: #64748b; font-size: 12px; margin-top: 32px;">Cursumi - Empowering readers through digital knowledge</p>
    </div>
  `;

  return resend.emails.send({
    from: "Cursumi <no-reply@cursumi.com>",
    to: email,
    subject,
    html,
  });
} 