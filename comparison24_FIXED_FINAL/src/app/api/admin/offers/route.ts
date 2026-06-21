import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

// GET all offers (for admin table)
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const payload = token ? verifyToken(token) : null;

    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ message: 'Nicht autorisiert' }, { status: 403 });
    }

    const offers = await prisma.offer.findMany({
      include: { provider: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(offers);
  } catch (error) {
    return NextResponse.json({ message: 'Fehler beim Laden' }, { status: 500 });
  }
}

// POST a new offer
export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const payload = token ? verifyToken(token) : null;

    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ message: 'Nicht autorisiert' }, { status: 403 });
    }

    const body = await request.json();
    const newOffer = await prisma.offer.create({
      data: {
        type: body.type, // 'festgeld' or 'tagesgeld'
        providerId: parseInt(body.providerId),
        interestRate: parseFloat(body.interestRate),
        minInvestment: parseFloat(body.minInvestment || 5000),
        durationMonths: body.durationMonths ? parseInt(body.durationMonths) : null,
        description: body.description,
        conditions: body.conditions,
        isActive: true,
      },
    });

    return NextResponse.json(newOffer, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Fehler beim Erstellen' }, { status: 500 });
  }
}
