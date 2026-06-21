import prisma from '@/lib/prisma';
import { 
  Users, 
  MousePointer2, 
  FileCheck, 
  TrendingUp 
} from 'lucide-react';

async function getStats() {
  const [userCount, requestCount, offerCount, clickCount] = await Promise.all([
    prisma.user.count(),
    prisma.offerRequest.count(),
    prisma.offer.count(),
    prisma.offer.aggregate({ _sum: { clickCount: true } })
  ]);

  return {
    userCount,
    requestCount,
    offerCount,
    totalClicks: clickCount._sum.clickCount || 0
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: 'Benutzer', value: stats.userCount, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Anfragen', value: stats.requestCount, icon: FileCheck, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Aktive Angebote', value: stats.offerCount, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Gesamt-Klicks', value: stats.totalClicks, icon: MousePointer2, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-xl flex items-center justify-center mb-4`}>
              <card.icon size={24} />
            </div>
            <div className="text-gray-500 text-sm mb-1">{card.label}</div>
            <div className="text-3xl font-bold">{card.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold mb-6">Letzte Aktivitäten</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">AN</div>
                <div>
                  <div className="text-sm font-bold">Neue Anfrage</div>
                  <div className="text-xs text-gray-500">Bigbank Festgeld · vor 2 Min.</div>
                </div>
              </div>
              <div className="text-xs font-bold text-gray-400">#4829</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">VB</div>
                <div>
                  <div className="text-sm font-bold">Benutzer verifiziert</div>
                  <div className="text-xs text-gray-500">Max M. · vor 15 Min.</div>
                </div>
              </div>
              <div className="text-xs font-bold text-gray-400">#4828</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold mb-6">Performance-Übersicht</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span>Konversionsrate</span>
                <span className="text-blue-600">4.2%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[42%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span>Klick-Wachstum</span>
                <span className="text-green-600">+12%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-green-600 h-full w-[75%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
