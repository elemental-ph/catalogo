import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, apellido, email, asunto, mensaje } = body;

    const data = await resend.emails.send({
      from: 'Contacto Web <onboarding@resend.dev>', // Cambia esto por tu dominio verificado
      to: ['ph@elementalchile.cl'], // Donde quieres recibir los correos
      subject: `Nuevo mensaje: ${asunto}`,
      replyTo: email,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>De:</strong> ${nombre} ${apellido} (${email})</p>
        <p><strong>Asunto:</strong> ${asunto}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}