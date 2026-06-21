export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Kontaktieren Sie uns</h1>
        <p className="text-xl text-gray-600 mb-12">
          Haben Sie Fragen zu unseren Vergleichen oder benötigen Sie Unterstützung? Unser Team ist für Sie da.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">E-Mail</h3>
              <a href="mailto:info@vergleichsrechner24.online" className="text-blue-700 hover:underline">info@vergleichsrechner24.online</a>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Adresse</h3>
              <p className="text-gray-600 leading-relaxed">
                Vergleichsrechner24 GmbH<br />
                Fasanenweg 27<br />
                91074 Herzogenaurach
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Support-Zeiten</h3>
              <p className="text-gray-600">Mo. - Fr.: 09:00 - 18:00 Uhr</p>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ihr Name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
              <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="ihre@email.de" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nachricht</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Wie können wir helfen?"></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-700 text-white py-4 rounded-xl font-bold hover:bg-blue-800 transition-colors">
              Nachricht senden
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
