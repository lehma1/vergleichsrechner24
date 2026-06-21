import Link from 'next/link';

export default function Footer() {
  return (
    <Footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-xl font-bold text-blue-700 flex items-center gap-2 mb-6">
              <span className="bg-blue-700 text-white p-1 rounded">C</span>
              <span>Comparison24</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Germany's independent comparison portal for festgeld deposits and tagesgeld accounts. Daily updated conditions from over 50 banks.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Compare</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link href="/fixed-term" className="hover:text-blue-700">Fixed-term Comparison</Link></li>
              <li><Link href="/savings" className="hover:text-blue-700">Savings Comparison</Link></li>
              <li><Link href="/banks" className="hover:text-blue-700">Bank Overview</Link></li>
              <li><Link href="/guide" className="hover:text-blue-700">Guide & FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link href="/contact" className="hover:text-blue-700">Contact</Link></li>
              <li><Link href="/legal" className="hover:text-blue-700">Legal Notice</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-700">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-700">Terms & Conditions</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Contact</h4>
            <p className="text-sm text-gray-600 mb-2">Fasanenweg 27</p>
            <p className="text-sm text-gray-600 mb-4">91074 Herzogenaurach</p>
            <a href="mailto:info@vergleichsrechner24.online" className="text-sm text-blue-700 font-medium">info@vergleichsrechner24.online</a>
            <div className="mt-6 flex items-center gap-2 text-green-600 text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
              SSL Encrypted
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © 2026 Comparison24 GmbH · All rights reserved.
          </p>
        </div>
      </div>
    </Footer>
  );
}
