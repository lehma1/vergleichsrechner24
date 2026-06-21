'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { FileText, Clock, CheckCircle, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function UserDashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/requests')
      .then(res => res.json())
      .then(data => {
        setRequests(data);
        setLoading(false);
      });
  }, []);

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'verified':
        return <span className="text-green-600 flex items-center gap-1"><CheckCircle size={16} /> Verifiziert</span>;
      case 'pending':
        return <span className="text-yellow-600 flex items-center gap-1"><Clock size={16} /> In Prüfung</span>;
      default:
        return <span className="text-gray-400 flex items-center gap-1"><Shield size={16} /> Unverifiziert</span>;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Header className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Willkommen, {user?.firstName}!</h1>
          <p className="text-gray-600">Hier haben Sie alle Ihre Zinsanfragen im Überblick.</p>
        </Header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <FileText size={20} className="text-blue-700" />
              Ihre Anfragen
            </h2>
            
            {loading ? (
              <div className="bg-white p-12 rounded-2xl text-center border border-gray-100">Lade Anfragen...</div>
            ) : requests.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl text-center border border-gray-100 shadow-sm">
                <p className="text-gray-500 mb-6">Sie haben bisher noch keine Angebote angefragt.</p>
                <Link href="/festgeld" className="inline-flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg font-bold">
                  Jetzt Zinsen vergleichen <ArrowRight size={18} />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map((req) => (
                  <div key={req.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="font-bold text-lg">{req.offer.provider.name}</div>
                      <div className="text-sm text-gray-500">{req.offer.type} · {req.offer.interestRate.toString()}% p.a.</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{req.investmentAmount.toString()} €</div>
                      <div className="text-xs text-gray-500">{new Date(req.createdAt).toLocaleDateString('de-DE')}</div>
                    </div>
                    <div className="text-sm font-bold">
                      {getStatusDisplay(req.verificationStatus)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-blue-700 text-white p-8 rounded-2xl shadow-xl shadow-blue-200">
              <h3 className="text-xl font-bold mb-4">SEPA Verifizierung</h3>
              <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                Um Ihre Identität und Ihr Konto sicher zu bestätigen, führen wir eine SEPA-Testüberweisung durch. 
                Dies dient dem Schutz vor Geldwäsche und Identitätsdiebstahl.
              </p>
              <div className="bg-blue-600/50 p-4 rounded-xl border border-blue-400/30">
                <div className="text-xs font-bold uppercase tracking-wider mb-2 text-blue-200">Nächster Schritt</div>
                <div className="text-sm">Bitte prüfen Sie Ihr E-Mail Postfach für die Verifizierungsdetails.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
