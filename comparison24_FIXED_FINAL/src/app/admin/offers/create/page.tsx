'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function NewOfferPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    type: 'festgeld',
    providerId: '',
    interestRate: '',
    minInvestment: '5000',
    durationMonths: '12',
    description: '',
    conditions: '',
  });

  useEffect(() => {
    fetch('/api/admin/providers')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProviders(data);
          if (data.length > 0) setFormData(prev => ({ ...prev, providerId: data[0].id.toString() }));
        }
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/offers');
        router.refresh();
      } else {
        alert('Fehler beim Speichern');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/admin/offers" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft size={20} /> Zurück zur Liste
        </Link>
        <h1 className="text-2xl font-bold">Neues Angebot erstellen</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Produkttyp</label>
            <select 
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="festgeld">Festgeld</option>
              <option value="tagesgeld">Tagesgeld</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Bank / Anbieter</label>
            <select 
              value={formData.providerId}
              onChange={(e) => setFormData({...formData, providerId: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {providers.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Zinssatz (% p.a.)</label>
            <input 
              type="number" step="0.01" required
              value={formData.interestRate}
              onChange={(e) => setFormData({...formData, interestRate: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="z.B. 4.05"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Mindestanlage (€)</label>
            <input 
              type="number" required
              value={formData.minInvestment}
              onChange={(e) => setFormData({...formData, minInvestment: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {formData.type === 'festgeld' && (
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Laufzeit (Monate)</label>
            <input 
              type="number" required
              value={formData.durationMonths}
              onChange={(e) => setFormData({...formData, durationMonths: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Beschreibung</label>
          <textarea 
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Kurze Beschreibung des Produkts"
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-700 text-white py-4 rounded-xl font-bold hover:bg-blue-800 transition-all flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Angebot veröffentlichen</>}
        </button>
      </form>
    </div>
  );
}
