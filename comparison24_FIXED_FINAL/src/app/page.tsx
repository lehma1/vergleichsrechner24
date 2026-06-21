import Link from 'next/link';
import { ArrowRight, CheckCircle, TrendingUp, ShieldCheck, PieChart } from 'lucide-react';
import prisma from '@/lib/prisma';

async function getFeaturedOffers() {
  return await prisma.offer.findMany({
    where: { isFeatured: true, isActive: true },
    include: { provider: true },
    take: 3,
  });
}

export default async function HomePage() {
  const featuredOffers = await getFeaturedOffers();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Your wealth deserves <span className="text-blue-700">better rates.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Compare the best festgeld and tagesgeld offers in Germany. Independent, transparent, and updated daily.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/fixed-term" className="bg-blue-700 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-800 transition-all flex items-center gap-2 shadow-lg shadow-blue-200">
                Compare Fixed-term <ArrowRight size={20} />
              </Link>
              <Link href="/savings" className="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-lg font-bold hover:bg-gray-50 transition-all flex items-center gap-2">
                Compare Savings
              </Link>
            </div>
            
            <div className="mt-12 flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                Over 50 Banks
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                Free Service
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                100% Independent
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Offers */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Current Top Offers</h2>
              <p className="text-gray-600">The most lucrative conditions of the day.</p>
            </div>
            <Link href="/fixed-term" className="text-blue-700 font-bold flex items-center gap-1 hover:underline">
              All Offers <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredOffers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-6">
                  <div className="font-bold text-lg">{offer.provider.name}</div>
                  <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {offer.type}
                  </div>
                </div>
                <div className="mb-6">
                  <div className="text-4xl font-extrabold text-gray-900">{offer.interestRate.toString()}% <span className="text-sm font-normal text-gray-500">p.a.</span></div>
                  <div className="text-sm text-gray-500 mt-1">
                    {offer.durationMonths ? `${offer.durationMonths} Months Duration` : 'Daily Availability'}
                  </div>
                </div>
                <Link href={`/${offer.type === 'festgeld' ? 'festgeld' : 'tagesgeld'}`} className="block w-full text-center bg-blue-700 text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
