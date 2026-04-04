import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        previousAddresses: true,
        previousEmployment: true,
        accidents: true,
        violations: true,
      },
    });

    if (!application) {
      return NextResponse.json({ success: false, error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        ...application,
        endorsements: application.endorsements ? JSON.parse(application.endorsements) : [],
        restrictions: application.restrictions ? JSON.parse(application.restrictions) : [],
      },
    });
  } catch (error) {
    console.error('Error fetching application:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch application' },
      { status: 500 }
    );
  }
}
