import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, service } = await req.json();

  const { error } = await resend.emails.send({
    from: "SAM-AI <contacto@samdev-ai.com>",
    to: email,
    subject: "Recibimos tu consulta — SAM-AI",
    html: `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#030712;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#030712;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#0d1117;border:1px solid #1f2937;border-radius:16px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:#0d1117;padding:32px 40px 24px;border-bottom:1px solid #1f2937;">
            <p style="margin:0;font-size:24px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">
              SAM-<span style="color:#C6FF00;">AI</span>
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 8px;font-size:13px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#C6FF00;">
              Confirmación de consulta
            </p>
            <h1 style="margin:0 0 20px;font-size:26px;font-weight:700;color:#ffffff;line-height:1.3;">
              Hola ${name}, recibimos tu mensaje
            </h1>
            <p style="margin:0 0 24px;font-size:15px;color:#9ca3af;line-height:1.7;">
              Gracias por contactarnos. Tu consulta sobre <strong style="color:#ffffff;">${service}</strong> fue recibida correctamente.
              Nos vamos a comunicar con vos en menos de <strong style="color:#ffffff;">24 horas hábiles</strong>.
            </p>

            <!-- Info box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a1a00;border:1px solid #C6FF0030;border-radius:12px;margin-bottom:28px;">
              <tr>
                <td style="padding:20px 24px;">
                  <p style="margin:0 0 10px;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#C6FF00;">
                    ¿Qué sigue?
                  </p>
                  <ul style="margin:0;padding-left:18px;color:#9ca3af;font-size:14px;line-height:2;">
                    <li>Revisamos tu consulta en detalle</li>
                    <li>Te contactamos por email o WhatsApp</li>
                    <li>Agendamos una llamada sin costo</li>
                  </ul>
                </td>
              </tr>
            </table>

            <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.6;">
              Si tenés alguna duda urgente, podés escribirnos directamente a
              <a href="mailto:contacto@samdev-ai.com" style="color:#C6FF00;text-decoration:none;">contacto@samdev-ai.com</a>.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #1f2937;background:#080d14;">
            <p style="margin:0;font-size:12px;color:#4b5563;text-align:center;">
              © 2025 SAM-AI · <a href="https://samdev-ai.com" style="color:#4b5563;">samdev-ai.com</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
    `,
  });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
