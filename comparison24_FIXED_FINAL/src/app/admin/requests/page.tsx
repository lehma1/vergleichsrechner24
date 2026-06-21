import prisma from '@/lib/prisma';
import { Mail, Clock, Shield, CheckCircle, AlertCircle } from 'lucide-react';

async function getRequests() {
  return await prisma.offerRequest.findMany({
    include: {
      user: true,
      offer: { include: { provider: true } }
    },
    orderBy: { createdAt: 'desc' },
  });
}

export default async function AdminRequestsPage() {
  const requests = await getRequests();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 w-fit"><CheckCircle size={10} /> Verifiziert</span>;
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 w-fit"><Clock size={10} /> Ausstehend</span>;
      default:
        return <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 w-fit"><Shield size={10} /> Unverifiziert</span>;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="font-bold">Angebotsanfragen & Verifizierung</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
            <tr>
              <th className="px-6 py-4">Nutzer</th>
              <th className="px-6 py-4">Angebot</th>
              <th className="px-6 py-4">Betrag</th>
              <th className="px-6 py-4">Datum</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Aktion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{request.user.firstName} {request.user.lastName}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1"><Mail size={10} /> {request.user.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-800">{request.offer.provider.name}</div>
                  <div className="text-xs text-gray-500">{request.offer.type} · {request.offer.interestRate.toString()}%</div>
                </td>
                <td className="px-6 py-4 font-bold text-gray-900">{request.investmentAmount.toString()} €</td>
                <td className="px-6 py-4 text-xs text-gray-500">
                  {new Date(request.createdAt).toLocaleDateString('de-DE')}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(request.verificationStatus)}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-700 hover:text-blue-800 text-xs font-bold underline">
                    Status ändern
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
