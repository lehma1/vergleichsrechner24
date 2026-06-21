import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, signToken } from '@/lib/auth';
import { sendVerificationEmail } from '@/lib/mail';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { 
      email, 
      password, 
      firstName, 
      lastName,
      phoneNumber,
      birthDate,
      street,
      zipCode,
      city 
    } = data;

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ message: 'Pflichtfelder fehlen' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'E-Mail Adresse bereits registriert' }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
        phoneNumber: phoneNumber || null,
        birthDate: birthDate ? new Date(birthDate) : null,
        street: street || null,
        zipCode: zipCode || null,
        city: city || null,
        role: 'user',
        emailVerified: false,
      },
    });

    // Echte E-Mail Versendung initiieren
    await sendVerificationEmail(user.email, user.firstName);

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      message: 'Benutzer erfolgreich registriert',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token
    }, { status: 201 });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Interner Serverfehler' }, { status: 500 });
  }
}
