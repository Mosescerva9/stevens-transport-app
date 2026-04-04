import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Returns a single image as binary (not JSON) to avoid 413 payload limits
// Usage: GET /api/applications/[id]/images?side=front or ?side=back
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const side = request.nextUrl.searchParams.get('side') || 'front';

    const application = await prisma.application.findUnique({
      where: { id },
      select: {
        licenseImageFront: side === 'front' ? true : false,
        licenseImageBack: side === 'back' ? true : false,
      },
    });

    if (!application) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    }

    const base64Data = side === 'front' ? application.licenseImageFront : application.licenseImageBack;

    if (!base64Data) {
      return NextResponse.json({ success: false, error: 'No image found' }, { status: 404 });
    }

    // Parse the data URI: "data:image/jpeg;base64,/9j/4AAQ..."
    const match = base64Data.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) {
      return NextResponse.json({ success: false, error: 'Invalid image data' }, { status: 500 });
    }

    const contentType = match[1];
    const buffer = Buffer.from(match[2], 'base64');

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'private, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error fetching license image:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch license image' },
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
