// app/api/auth/signin/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { identifier, password } = await request.json();
    const rawIdentifier = String(identifier ?? '').trim();

    if (!rawIdentifier || !password) {
      return NextResponse.json(
        { error: 'Identifiant et mot de passe requis' },
        { status: 400 }
      );
    }

    // Appel au backend NestJS
    const backendRes = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: rawIdentifier, password }),
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { error: data.message || 'Identifiants incorrects' },
        { status: backendRes.status }
      );
    }

    // Le backend renvoie probablement un token JWT
    // data.access_token ou similaire selon la config NestJS
    return NextResponse.json({
      message: 'Connexion réussie',
      user: data.user || { name: rawIdentifier, role: data.role || 'ADMIN' },
      token: data.access_token || data.token,
    });

  } catch (error) {
    console.error('Erreur de connexion:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}