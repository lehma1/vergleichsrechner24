# 🚀 Vergleichsrechner24.online
### Modernes Finanzvergleichsportal für Festgeld & Tagesgeld

Willkommen bei **Vergleichsrechner24**, einem professionellen Fintech-Portal für den deutschen Markt. Die Plattform ermöglicht es Nutzern, Zinskonditionen unabhängig zu vergleichen und Angebote direkt über ein sicheres System anzufordern.

---

## 🛠 Tech Stack
- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Prisma ORM
- **Datenbank:** PostgreSQL (Optimiert für Supabase oder Neon)
- **Authentifizierung:** JWT (JSON Web Tokens) & Bcrypt Hashing
- **E-Mail:** Nodemailer mit SMTP-Integration (SSL/TLS)
- **Design:** Modernes Fintech-UI mit "Plus Jakarta Sans" Typografie

---

## 🌟 Hauptfunktionen
- **Vergleichsrechner:** Echtzeit-Filterung für Festgeld und Tagesgeld.
- **Benutzersystem:** KYC-konforme Registrierung (Adresse, Telefon, Geburtsdatum).
- **E-Mail-Verifizierung:** Automatischer Versand von Bestätigungsmails über `info@vergleichsrechner24.online`.
- **Anfrage-Workflow:** Sicherheits-Hinweis auf SEPA-Identitätsprüfung bei jeder Anfrage.
- **Admin Dashboard:**
    - Verwaltung von Banken (Anbieter) und Zinsen.
    - Echtzeit-Statistiken zu Klicks und Anfragen.
    - Manuelle Freigabe/Verifizierung von Kunden (SEPA-Status).

---

## 🚀 Deployment (Online stellen)

### 1. Datenbank (Supabase)
Das Portal benötigt eine PostgreSQL Datenbank. 
1. Erstelle ein Projekt auf [Supabase.com](https://supabase.com).
2. Kopiere den `Connection String`.
3. Trage diesen in der `.env` Datei als `DATABASE_URL` ein.

### 2. E-Mail Konfiguration
Die E-Mail Zugangsdaten sind bereits für `info@vergleichsrechner24.online` vorkonfiguriert. Das Passwort im System lautet: `genial1234@`.

### 3. Netlify Deployment (Empfohlen)
1. Erstelle ein Konto bei [Netlify](https://netlify.com).
2. Lade den Projektordner per **Drag & Drop** im Bereich "Sites" hoch.
3. Füge unter **Site Configuration > Environment Variables** alle Werte aus der `.env` Datei hinzu.

### 4. Domain (Namecheap)
Ändere bei Namecheap die Nameserver auf die von Netlify bereitgestellten Adressen, damit `www.vergleichsrechner24.online` aktiv wird.

---

## 🔐 Admin Zugang
- **URL:** `www.vergleichsrechner24.online/admin`
- **Benutzer:** `admin@vergleichsrechner.de`
- **Passwort:** `password` (Bitte nach dem ersten Login im Dashboard ändern!)

---

## 📁 Projektstruktur
- `/src/app`: Hauptseiten und API-Endpunkte.
- `/src/components`: UI-Elemente (Karten, Modale, Header/Footer).
- `/src/lib`: Zentrale Funktionen für E-Mail, Datenbank und Sicherheit.
- `/prisma`: Datenbank-Schema und Testdaten (Seed).

---

## ⚖️ Rechtliches
Dieses Portal wurde nach deutschen Standards (Impressum, Datenschutz, Cookie-Banner) entwickelt. 
**Hinweis:** Die SEPA-Verifizierung ist im System als Status-Workflow implementiert, erfordert aber die manuelle Prüfung durch den Administrator im Dashboard.

---
© 2026 Vergleichsrechner24 GmbH
