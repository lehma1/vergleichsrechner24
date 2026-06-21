import { Offer, Provider } from '@prisma/client';
import ComparisonCard from './comparison-card';

interface ComparisonListProps {
  offers: (Offer & { provider: Provider })[];
}

export default function ComparisonList({ offers }: ComparisonListProps) {
  return (
    <div className="space-y-4">
      {offers.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500">Keine passenden Angebote gefunden.</p>
        </div>
      ) : (
        offers.map((offer) => (
          <ComparisonCard key={offer.id} offer={offer} />
        ))
      )}
    </div>
  );
}
