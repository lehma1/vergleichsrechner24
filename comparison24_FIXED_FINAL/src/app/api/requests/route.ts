import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Nicht authentifiziert' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ message: 'Ungültiger Token' }, { status: 401 });
    }

    const { offerId, investmentAmount, durationMonths, notes } = await request.json();

    if (!offerId || !investmentAmount) {
      return NextResponse.json({ message: 'Pflichtfelder fehlen' }, { status: 400 });
    }

    const offerRequest = await prisma.offerRequest.create({
      data: {
        userId: payload.userId,
        offerId: parseInt(offerId),
        investmentAmount: parseFloat(investmentAmount),
        durationMonths: durationMonths ? parseInt(durationMonths) : null,
        notes: notes || null,
        verificationStatus: 'unverified',
      },
    });

    return NextResponse.json(offerRequest, { status: 201 });
  } catch (error) {
    console.error('Request error:', error);
    return NextResponse.json({ message: 'Interner Serverfehler' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Nicht authentifiziert' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ message: 'Ungültiger Token' }, { status: 401 });
    }

    const requests = await prisma.offerRequest.findMany({
      where: payload.role === 'admin' ? {} : { userId: payload.userId },
      include: {
        offer: { include: { provider: true } },
        user: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(requests);
  } catch (error) {
    console.error('Fetch requests error:', error);
    return NextResponse.json({ message: 'Interner Serverfehler' }, { status: 500 });
  }
}
