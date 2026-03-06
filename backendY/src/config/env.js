import "dotenv/config";

const provider = process.env.MAIL_PROVIDER;

export const env = {
  PORT: Number(process.env.PORT) || 5000,

  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,

  JWT_SECRET: process.env.JWT_SECRET,

  SMTP_HOST:
    provider === "resend"
      ? process.env.SMTP_HOST
      : process.env.BREVO_SMTP_HOST,

  SMTP_USER:
    provider === "resend"
      ? process.env.SMTP_USER
      : process.env.BREVO_SMTP_USER,

  SMTP_PASS:
    provider === "resend"
      ? process.env.SMTP_PASS
      : process.env.BREVO_SMTP_PASS,

  SMTP_PORT:
    provider === "resend"
      ? process.env.SMTP_PORT
      : process.env.BREVO_SMTP_PORT,

  SMTP_SENDER:
    provider === "resend"
      ? process.env.SMTP_SENDER
      : process.env.BREVO_SMTP_SENDER,

  CLIENT_URL: process.env.CLIENT_URL,
};