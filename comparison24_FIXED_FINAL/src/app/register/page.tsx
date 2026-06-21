'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { Loader2, Mail, Lock, User, Phone, MapPin, Calendar, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    birthDate: '',
    street: '',
    zipCode: '',
    city: '',
    acceptAgb: false,
    acceptNewsletter: false,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to a "Verify Email" info page or dashboard
        setStep(3); // Success / Verification Step
      } else {
        setError(data.message || 'Registrierung fehlgeschlagen.');
      }
    } catch (err) {
      setError('Ein unerwarteter Fehler ist aufgetreten.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100">
        
        {step < 3 && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl text-blue-700 mb-4">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Konto erstellen</h2>
            <p className="mt-2 text-sm text-gray-500">
              Schritt {step} von 2: {step === 1 ? 'Basis-Informationen' : 'Persönliche Details'}
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        {step === 1 && (
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Vorname</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Max"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Nachname</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Mustermann"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">E-Mail Adresse</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="pl-12 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="name@beispiel.de"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Passwort</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="pl-12 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-4 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-100 mt-4"
            >
              Weiter zu Schritt 2
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Telefonnummer</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 text-gray-400" size={18} />
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                    className="pl-12 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="+49 123 456789"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Geburtsdatum</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-3.5 text-gray-400" size={18} />
                  <input
                    type="date"
                    required
                    value={formData.birthDate}
                    onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                    className="pl-12 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Straße & Hausnummer</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input
                  type="text"
                  required
                  value={formData.street}
                  onChange={(e) => setFormData({...formData, street: e.target.value})}
                  className="pl-12 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Musterstraße 1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Postleitzahl</label>
                <input
                  type="text"
                  required
                  value={formData.zipCode}
                  onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="12345"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Stadt</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Musterstadt"
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  required
                  checked={formData.acceptAgb}
                  onChange={(e) => setFormData({...formData, acceptAgb: e.target.checked})}
                  className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300" 
                />
                <span className="text-sm text-gray-600">Ich akzeptiere die <Link href="/agb" className="text-blue-700 underline font-medium">AGB</Link> und die <Link href="/datenschutz" className="text-blue-700 underline font-medium">Datenschutzerklärung</Link>.</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.acceptNewsletter}
                  onChange={(e) => setFormData({...formData, acceptNewsletter: e.target.checked})}
                  className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300" 
                />
                <span className="text-sm text-gray-600">Ich möchte über neue Top-Zinsen informiert werden (Newsletter).</span>
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all"
              >
                Zurück
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-[2] bg-blue-700 text-white py-4 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-100 flex items-center justify-center"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Registrierung abschließen'}
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="text-center py-8">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto mb-8">
              <Mail size={48} />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">E-Mail bestätigen</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Wir haben eine Bestätigungs-E-Mail an <span className="font-bold text-gray-900">{formData.email}</span> gesendet. 
              Bitte klicken Sie auf den Link in der Mail, um Ihr Konto zu aktivieren.
            </p>
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl mb-8">
              <p className="text-blue-800 font-medium text-sm">
                Hinweis: Im MVP erfolgt die Verifizierung automatisch nach dem Klick auf "Weiter".
              </p>
            </div>
            <button
              onClick={() => router.push('/login')}
              className="w-full bg-blue-700 text-white py-4 rounded-xl font-bold hover:bg-blue-800 transition-all"
            >
              Weiter zum Login
            </button>
          </div>
        )}

        {step < 3 && (
          <p className="text-center text-sm text-gray-500 mt-8">
            Bereits ein Konto?{' '}
            <Link href="/login" className="font-bold text-blue-700 hover:text-blue-800 underline">
              Hier einloggen
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
