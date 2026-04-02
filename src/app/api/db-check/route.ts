import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const tables = await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname = 'public'`;
    return NextResponse.json({ success: true, tables, envUrl: process.env.DATABASE_URL?.replace(/:[^@]+@/, ':***@') });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      envUrl: process.env.DATABASE_URL?.replace(/:[^@]+@/, ':***@')
    });
  }
}
