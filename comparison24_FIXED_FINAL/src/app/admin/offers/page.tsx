'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    const res = await fetch('/api/admin/offers');
    const data = await res.json();
    setOffers(data);
    setLoading(false);
  };

  const deleteOffer = async (id: number) => {
    if (!confirm('Möchten Sie dieses Angebot wirklich löschen?')) return;
    
    const res = await fetch(`/api/admin/offers/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setOffers(offers.filter(o => o.id !== id));
    } else {
      alert('Fehler beim Löschen');
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-700" size={40} /></div>;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-bold text-lg">Angebote verwalten</h3>
        <Link 
          href="/admin/offers/create" 
          className="bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-800 transition-all flex items-center gap-2 shadow-lg shadow-blue-100"
        >
          <Plus size={18} /> Neues Angebot
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest">
            <tr>
              <th className="px-6 py-4">Bank</th>
              <th className="px-6 py-4">Typ</th>
              <th className="px-6 py-4">Zins p.a.</th>
              <th className="px-6 py-4">Laufzeit</th>
              <th className="px-6 py-4">Mindestanlage</th>
              <th className="px-6 py-4 text-right">Aktionen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {offers.map((offer) => (
              <tr key={offer.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-gray-900">{offer.provider.name}</div>
                  <div className="text-[10px] text-gray-400 uppercase">{offer.provider.country}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-extrabold uppercase ${
                    offer.type === 'festgeld' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'
                  }`}>
                    {offer.type}
                  </span>
                </td>
                <td className="px-6 py-4 font-extrabold text-blue-700 text-lg">{offer.interestRate.toString()}%</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600">
                  {offer.type === 'tagesgeld' ? 'Täglich' : `${offer.durationMonths} Mon.`}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600">
                  {offer.minInvestment.toString()} €
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-1">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => deleteOffer(offer.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
