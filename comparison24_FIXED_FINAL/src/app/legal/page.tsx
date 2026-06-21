export default function ImpressumPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-3xl bg-white p-12 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold mb-8">Impressum</h1>
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Angaben gemäß § 5 TMG</h2>
            <p>Vergleichsrechner24 GmbH</p>
            <p>Fasanenweg 27</p>
            <p>91074 Herzogenaurach</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Handelsregister</h2>
            <p>Registergericht: Amtsgericht Fürth</p>
            <p>Registernummer: HRB 20992</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Kontakt</h2>
            <p>Telefon: +49 (0) 9132 123456</p>
            <p>E-Mail: info@vergleichsrechner24.online</p>
          </section>
        </div>
      </div>
    </div>
  );
}
