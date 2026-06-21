import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

// Change Verification Status of a request
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

    const { status } = await request.json(); // 'unverified', 'pending', 'verified'

    const updatedRequest = await prisma.offerRequest.update({
      where: { id: parseInt(params.id) },
      data: { verificationStatus: status },
      include: { user: true }
    });

    // Hier könnte man jetzt automatisch eine Mail an den Nutzer senden
    // "Ihr Status wurde auf 'Verifiziert' geändert!"

    return NextResponse.json(updatedRequest);
  } catch (error) {
    return NextResponse.json({ message: 'Status-Update fehlgeschlagen' }, { status: 500 });
  }
}
