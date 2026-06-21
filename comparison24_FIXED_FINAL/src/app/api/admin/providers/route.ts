import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const payload = token ? verifyToken(token) : null;

    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ message: 'Nicht autorisiert' }, { status: 403 });
    }

    const providers = await prisma.provider.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(providers);
  } catch (error) {
    return NextResponse.json({ message: 'Fehler beim Laden' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const payload = token ? verifyToken(token) : null;

    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ message: 'Nicht autorisiert' }, { status: 403 });
    }

    const body = await request.json();
    const newProvider = await prisma.provider.create({
      data: {
        name: body.name,
        country: body.country || 'DE',
        description: body.description,
        websiteUrl: body.websiteUrl,
        isActive: true,
      },
    });

    return NextResponse.json(newProvider, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Fehler beim Erstellen' }, { status: 500 });
  }
}
