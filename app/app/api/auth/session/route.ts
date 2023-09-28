import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';
import { decode } from 'jsonwebtoken';

export async function GET(request: Request) {
  const token = cookies().get('token')?.value;

  console.log(token);

  if (!token) {
    return new NextResponse('', { status: 401 });
  }

  const { sub } = decode(token);

  return NextResponse.json({ username: sub });
}