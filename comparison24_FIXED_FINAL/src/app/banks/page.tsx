import prisma from '@/lib/prisma';
import { Building2, Globe, ShieldCheck, ExternalLink } from 'lucide-react';

async function getProviders() {
  return await prisma.provider.findMany({
    where: { isActive: true },
    include: { _count: { select: { offers: true } } },
    orderBy: { name: 'asc' },
  });
}

export default async function BankenPage() {
  const providers = await getProviders();

  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Unsere Partnerbanken</h1>
          <p className="text-xl text-gray-600">
            Wir arbeiten nur mit seriösen Banken zusammen, die der EU-weiten Einlagensicherung unterliegen. 
            Ihre Sicherheit steht für uns an erster Stelle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {providers.map((provider) => (
            <div key={provider.id} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-700">
                  <Building2 size={24} />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <Globe size={10} /> {provider.country}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{provider.name}</h3>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                {provider.description || 'Ein verlässlicher Partner für Ihre Geldanlage mit attraktiven Konditionen.'}
              </p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                <div className="text-xs">
                  <div className="text-gray-400 mb-1">Angebote</div>
                  <div className="font-bold text-gray-900">{provider._count.offers} verfügbar</div>
                </div>
                <div className="text-xs">
                  <div className="text-gray-400 mb-1">Sicherung</div>
                  <div className="font-bold text-green-600 flex items-center gap-1">
                    <ShieldCheck size={12} /> 100.000 €
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <a 
                  href={provider.websiteUrl || '#'} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-blue-700 flex items-center gap-1 hover:underline"
                >
                  Zur Webseite <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
