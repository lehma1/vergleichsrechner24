import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

// Update or Delete a specific offer
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const payload = token ? verifyToken(token) : null;

    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ message: 'Nicht autorisiert' }, { status: 403 });
    }

    const body = await request.json();
    const updated = await prisma.offer.update({
      where: { id: parseInt(params.id) },
      data: body,
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: 'Update fehlgeschlagen' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const payload = token ? verifyToken(token) : null;

    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ message: 'Nicht autorisiert' }, { status: 403 });
    }

    await prisma.offer.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: 'Gelöscht' });
  } catch (error) {
    return NextResponse.json({ message: 'Löschen fehlgeschlagen' }, { status: 500 });
  }
}
