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
        // Return flags instead of full base64 — images loaded separately via /images endpoint
        licenseImageFront: application.licenseImageFront ? 'uploaded' : null,
        licenseImageBack: application.licenseImageBack ? 'uploaded' : null,
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    await prisma.application.update({
      where: { id },
      data: { status: body.status },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update application' },
      { status: 500 }
    );
  }
}
