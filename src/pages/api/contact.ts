import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, company, service, message } = body;

    const apiKey = import.meta.env.RESEND_API_KEY;
    const contactEmail = import.meta.env.CONTACT_EMAIL || 'info@agency.lt';

    if (!apiKey) {
      // Fallback: log to console if no API key
      console.log('Contact form submission:', { name, company, service, message });
      return new Response(JSON.stringify({ ok: true, fallback: true }), { status: 200 });
    }

    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: 'Agency <noreply@youragency.lt>',
      to: contactEmail,
      subject: `Nauja užklausa: ${service}`,
      html: `
        <h2>Nauja užklausa</h2>
        <p><strong>Vardas:</strong> ${name}</p>
        <p><strong>Įmonė:</strong> ${company || '—'}</p>
        <p><strong>Paslauga:</strong> ${service}</p>
        <p><strong>Žinutė:</strong></p>
        <p>${message}</p>
      `,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ error: 'Failed to send' }), { status: 500 });
  }
};
