import { NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/components";
import AdminNotificationEmail from "@/emails/AdminNotificationEmail";
import UserConfirmationEmail from "@/emails/UserConfirmationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactBodyRaw {
  fullName?: unknown;
  phone?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  [k: string]: unknown;
}

function validate(body: ContactBodyRaw) {
  const issues: Record<string, string[]> = {};
  const add = (field: string, msg: string) => {
    if (!issues[field]) issues[field] = [];
    issues[field].push(msg);
  };

  if (!body || typeof body !== "object")
    return { ok: false, issues: { _form: ["Cuerpo inválido"] } } as const;

  const { fullName, phone, email, subject, message } = body;

  if (!fullName || typeof fullName !== "string" || fullName.trim().length < 3)
    add("fullName", "Nombre muy corto");
  if (
    !phone ||
    typeof phone !== "string" ||
    phone.replace(/[^0-9+]/g, "").length < 7
  )
    add("phone", "Teléfono inválido");
  if (
    !email ||
    typeof email !== "string" ||
    !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
  )
    add("email", "Email inválido");
  if (!subject || typeof subject !== "string" || subject.trim().length < 3)
    add("subject", "Asunto requerido");
  if (!message || typeof message !== "string" || message.trim().length < 1)
    add("message", "Mensaje muy corto");

  if (Object.keys(issues).length) return { ok: false, issues } as const;
  return {
    ok: true,
    data: {
      fullName: fullName as string,
      phone: phone as string,
      email: email as string,
      subject: subject as string,
      message: message as string,
    },
  } as const;
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const validated = validate(json);
    if (!validated.ok) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR", issues: validated.issues },
        { status: 400 }
      );
    }

    const { fullName, phone, email, subject, message } = validated.data;

    const receivedAt = new Date().toLocaleString("es-CO", { hour12: false });
    const adminReact = AdminNotificationEmail({
      fullName,
      phone,
      email,
      subject,
      message,
      receivedAt,
    });

    const adminHtml = await render(adminReact);
    const adminText = `Nuevo mensaje de contacto\n\nNombre: ${fullName}\nTeléfono: ${phone}\nEmail: ${email}\nAsunto: ${subject}\n\nMensaje:\n${message}`;

    // Render user confirmation
    const userReact = UserConfirmationEmail({ fullName, subject });
    const userHtml = await render(userReact);
    const userText = `Hola ${fullName},\n\nTu solicitud (${subject}) ha sido recibida. Pronto un asesor se pondrá en contacto contigo.\n\nEquipo AR Company`;

    const fromEmail = process.env.RESEND_FROM_EMAIL as string;
    const from = `AR Company <${fromEmail}>`;
    const to = process.env.RESEND_TO_EMAIL as string;

    const adminResult = await resend.emails.send({
      from,
      to: to,
      replyTo: email,
      subject: `Contacto AR Company: ${subject}`,
      html: adminHtml,
      text: adminText,
    });

    if (adminResult.error) {
      console.error("RESEND_ERROR_ADMIN", adminResult.error);
      return NextResponse.json(
        { ok: false, error: "SEND_ERROR_ADMIN" },
        { status: 502 }
      );
    }

    if (email) {
      resend.emails
        .send({
          from,
          to: email,
          replyTo: "administracion@arcompanyjuridicos.com",
          subject: `Hemos recibido tu solicitud: ${subject}`,
          html: userHtml,
          text: userText,
        })
        .catch((e) => console.error("RESEND_ERROR_USER", e));
    }

    return NextResponse.json({ ok: true, id: adminResult.data?.id });
  } catch (err) {
    console.error("CONTACT_API_ERROR", err);
    return NextResponse.json(
      { ok: false, error: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}
