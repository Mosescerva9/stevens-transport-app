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
      select: {
        licenseImageFront: true,
        licenseImageBack: true,
      },
    });

    if (!application) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        licenseImageFront: application.licenseImageFront || null,
        licenseImageBack: application.licenseImageBack || null,
      },
    });
  } catch (error) {
    console.error('Error fetching license images:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch license images' },
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
      data: {
        licenseImageFront: body.licenseImageFront || null,
        licenseImageBack: body.licenseImageBack || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating license images:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save license images' },
      { status: 500 }
    );
  }
}
