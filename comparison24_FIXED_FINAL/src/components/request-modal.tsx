'use client';

import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { X, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Offer, Provider } from '@prisma/client';

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: Offer & { provider: Provider };
}

export default function RequestModal({ isOpen, onClose, offer }: RequestModalProps) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: offer.minInvestment.toString(),
    duration: offer.durationMonths?.toString() || '12',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          offerId: offer.id,
          investmentAmount: formData.amount,
          durationMonths: formData.duration,
          notes: formData.notes,
        }),
      });

      if (response.ok) {
        setStep(2);
      } else {
        alert('Error submitting request.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full transition-all">
          <X size={20} />
        </button>

        {!user ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-700 mx-auto mb-6">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Login required</h3>
            <p className="text-gray-600 mb-8">To request this offer, please log in or create a new account first.</p>
            <div className="flex flex-col gap-3">
              <Link href="/login" className="w-full bg-blue-700 text-white py-3 rounded-xl font-bold hover:bg-blue-800 transition-colors">Login</Link>
              <Link href="/register" className="w-full bg-white text-gray-900 border border-gray-200 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors">Create Account</Link>
            </div>
          </div>
        ) : step === 1 ? (
          <form onSubmit={handleSubmit} className="p-8">
            <h3 className="text-2xl font-bold mb-2">Request Offer</h3>
            <p className="text-gray-500 mb-8 text-sm">You are requesting the offer from <span className="font-bold text-gray-900">{offer.provider.name}</span> at <span className="font-bold text-gray-900">{offer.interestRate.toString()}% p.a.</span></p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Desired Amount (€)</label>
                <input type="number" min={offer.minInvestment.toString()} value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none" required />
              </div>
              {offer.type === 'festgeld' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Months)</label>
                  <select value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none">
                    <option value="12">12 Months</option>
                    <option value="24">24 Months</option>
                  </select>
                </div>
              )}
            </div>

            <button type="submit" disabled={loading} className="w-full mt-8 bg-blue-700 text-white py-4 rounded-xl font-bold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2">
              {loading ? <Loader2 className="animate-spin" /> : 'Submit Request'}
            </button>
          </form>
        ) : (
          <div className="p-10 text-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
              <ShieldCheck size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Request Successful!</h3>
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl mb-8">
              <p className="text-blue-800 font-medium text-sm leading-relaxed">
                For security reasons, your identity will be verified via a SEPA transaction. You will receive an email shortly.
              </p>
            </div>
            <button onClick={onClose} className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold">Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
