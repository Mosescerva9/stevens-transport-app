import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
