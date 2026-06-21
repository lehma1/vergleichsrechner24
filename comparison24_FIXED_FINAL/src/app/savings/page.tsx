import ComparisonList from '@/components/comparison-list';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Savings Account Comparison 2026 | High Interest, Daily Access',
  description: 'The best tagesgeld accounts compared. Available daily and secure through EU deposit insurance.',
};

async function getSavingsOffers() {
  return await prisma.offer.findMany({
    where: { type: 'tagesgeld', isActive: true },
    include: { provider: true },
    orderBy: { interestRate: 'desc' },
  });
}

export default async function SavingsPage() {
  const offers = await getSavingsOffers();

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Savings Account Comparison</h1>
          <p className="text-xl text-gray-600">
            Stay flexible and benefit from attractive interest rates from the very first Euro.
          </p>
        </header>

        <div className="lg:col-span-3">
          <ComparisonList offers={offers as any} />
        </div>
      </div>
    </div>
  );
}
