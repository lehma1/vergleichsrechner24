import ComparisonList from '@/components/comparison-list';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Fixed-term Deposit Comparison 2026 | Best Rates',
  description: 'Compare the best festgeld offers in Germany. Guaranteed rates up to 4.15% p.a.',
};

async function getFixedTermOffers() {
  return await prisma.offer.findMany({
    where: { type: 'festgeld', isActive: true },
    include: { provider: true },
    orderBy: { interestRate: 'desc' },
  });
}

export default async function FixedTermPage() {
  const offers = await getFixedTermOffers();

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Fixed-term Comparison</h1>
          <p className="text-xl text-gray-600">
            Find the best rates for your investment. Secure and independent.
          </p>
        </header>

        <div className="lg:col-span-3">
          <ComparisonList offers={offers as any} />
        </div>
      </div>
    </div>
  );
}
