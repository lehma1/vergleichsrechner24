import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST || 'mail.vergleichsrechner24.online',
  port: parseInt(process.env.EMAIL_SERVER_PORT || '465'),
  secure: true, // true für Port 465, false für andere Ports
  auth: {
    user: process.env.EMAIL_SERVER_USER || 'info@vergleichsrechner24.online',
    pass: process.env.EMAIL_SERVER_PASSWORD || '', // Passwort wird über .env geladen
  },
});

export async function sendVerificationEmail(to: string, firstName: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vergleichsrechner24.online';
  
  const mailOptions = {
    from: '"Vergleichsrechner24" <info@vergleichsrechner24.online>',
    to,
    subject: 'Willkommen! Bitte bestätigen Sie Ihre E-Mail Adresse',
    html: `
      <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; color: #0f172a; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 24px;">
        <div style="margin-bottom: 32px; text-align: center;">
          <div style="background-color: #2563eb; color: #ffffff; width: 48px; height: 48px; line-height: 48px; border-radius: 12px; font-weight: 800; font-size: 24px; display: inline-block;">V</div>
          <h1 style="font-size: 24px; font-weight: 800; margin-top: 16px; letter-spacing: -0.02em;">Vergleichsrechner24</h1>
        </div>
        
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 16px;">Willkommen an Bord, ${firstName}!</h2>
        <p style="font-size: 16px; line-height: 1.6; color: #475569; margin-bottom: 24px;">
          Vielen Dank für Ihr Vertrauen. Sie haben den ersten Schritt zu besseren Zinsen gemacht. 
          Um Ihr Konto zu aktivieren und Angebote verbindlich anfordern zu können, bestätigen Sie bitte kurz Ihre E-Mail-Adresse.
        </p>
        
        <div style="text-align: center; margin: 40px 0;">
          <a href="${siteUrl}/login?verified=true" 
             style="background-color: #2563eb; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 14px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 14px 0 rgba(37, 99, 235, 0.39);">
            E-Mail Adresse bestätigen
          </a>
        </div>
        
        <p style="font-size: 14px; color: #94a3b8; line-height: 1.5;">
          Falls der Button nicht funktioniert, kopieren Sie diesen Link in Ihren Browser:<br>
          <span style="color: #2563eb;">${siteUrl}/login?verified=true</span>
        </p>
        
        <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
          © 2026 Vergleichsrechner24 GmbH · Fasanenweg 27 · 91074 Herzogenaurach<br>
          Diese E-Mail wurde automatisch versendet.
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verifizierungs-Email an ${to} versendet.`);
    return true;
  } catch (error) {
    console.error('SMTP Fehler:', error);
    return false;
  }
}
