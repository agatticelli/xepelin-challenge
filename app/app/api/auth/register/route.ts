import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();
  if (!username?.trim() || !password?.trim()) return new NextResponse(null, { status: 400 });

  const registerResponse = await fetch(`${process.env.API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await registerResponse.json();

  const res = new NextResponse(null, { status: 200 });
  res.cookies.set('token', data.access_token, { httpOnly: true, path: '/' });

  return res;
}