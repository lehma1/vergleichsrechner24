'use client';

import { useState } from 'react';
import { Offer, Provider } from '@prisma/client';
import { Shield, ArrowRight, Check, Info } from 'lucide-react';
import RequestModal from './request-modal';

interface ComparisonCardProps {
  offer: Offer & { provider: Provider };
}

export default function ComparisonCard({ offer }: ComparisonCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 transition-all hover:border-blue-300 hover:shadow-sm">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-40 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
          <div className="text-xl font-bold text-gray-900 mb-1">{offer.provider.name}</div>
          <div className="flex items-center gap-1 text-[10px] text-gray-500 font-medium uppercase">
            <Shield size={10} className="text-green-500" />
            EU-Protected
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center md:items-start">
          <div className="text-sm text-gray-500 mb-1">Interest Rate p.a.</div>
          <div className="text-3xl font-extrabold text-blue-700">{offer.interestRate.toString()}%</div>
        </div>

        <div className="flex-1 flex flex-col items-center md:items-start">
          <div className="text-sm text-gray-500 mb-1">Duration</div>
          <div className="font-bold text-gray-900">
            {offer.type === 'tagesgeld' ? 'Instant Access' : `${offer.durationMonths} Months`}
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center md:items-start">
          <div className="text-sm text-gray-500 mb-1">Min. Investment</div>
          <div className="font-bold text-gray-900">{offer.minInvestment.toString()} €</div>
        </div>

        <div className="w-full md:w-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto bg-blue-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
          >
            Apply Now <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <RequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        offer={offer}
      />
    </div>
  );
}
