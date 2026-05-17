import nodemailer from "nodemailer";

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

function getTransport() {
  const host = process.env.SMTP_HOST;
  if (!host) return null;

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_PORT === "465",
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
  });
}

export async function sendContactEmail(payload: ContactPayload) {
  const transport = getTransport();
  const to = process.env.MAIL_TO ?? process.env.ADMIN_EMAIL;
  const from = process.env.MAIL_FROM ?? "WEBO.by <noreply@webo.by>";

  if (!transport || !to) {
    console.info("[mail] SMTP not configured, contact saved only:", payload.email);
    return { sent: false };
  }

  await transport.sendMail({
    from,
    to,
    replyTo: payload.email,
    subject: `WEBO.by — заявка от ${payload.name}`,
    text: [
      `Имя: ${payload.name}`,
      `Email: ${payload.email}`,
      payload.phone ? `Телефон: ${payload.phone}` : null,
      "",
      payload.message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  return { sent: true };
}
