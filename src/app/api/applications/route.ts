import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Lenient validation — accept whatever the form sends
const applicationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  middleName: z.string().optional().default(''),
  socialSecurity: z.string().optional().default(''),
  dateOfBirth: z.string().optional().default(''),
  phone: z.string().optional().default(''),
  email: z.string().optional().default(''),

  currentAddress: z.string().optional().default(''),
  currentCity: z.string().optional().default(''),
  currentState: z.string().optional().default(''),
  currentZip: z.string().optional().default(''),
  currentDuration: z.string().optional().default(''),
  livedHereThreeYears: z.boolean().optional().default(false),
  previousAddresses: z.array(z.any()).optional().default([]),
  licenseNumber: z.string().optional().default(''),
  licenseState: z.string().optional().default(''),
  licenseExpiration: z.string().optional().default(''),
  cdlClass: z.string().optional().default(''),
  endorsements: z.array(z.string()).optional().default([]),
  restrictions: z.array(z.string()).optional().default([]),
  licenseImageFront: z.string().optional().default(''),
  licenseImageBack: z.string().optional().default(''),
  currentEmployer: z.string().optional().default(''),
  currentPosition: z.string().optional().default(''),
  currentStartDate: z.string().optional().default(''),
  currentEndDate: z.string().optional().default(''),
  currentSalary: z.string().optional().default(''),
  currentReasonForLeaving: z.string().optional().default(''),
  previousEmployment: z.array(z.any()).optional().default([]),
  accidents: z.array(z.any()).optional().default([]),
  violations: z.array(z.any()).optional().default([]),
  militaryService: z.boolean().optional().default(false),
  militaryBranch: z.string().optional().default(''),
  militaryRank: z.string().optional().default(''),
  militaryDates: z.string().optional().default(''),
  // Additional questions
  hasConvictions: z.boolean().optional().default(false),
  convictionsDetails: z.string().optional().default(''),
  canLiftFiftyLbs: z.boolean().optional().default(false),
  hasPhysicalLimits: z.boolean().optional().default(false),
  physicalLimitsDetails: z.string().optional().default(''),
  availableWeekends: z.boolean().optional().default(false),
  availableOvernight: z.boolean().optional().default(false),
  expectedPay: z.string().optional().default(''),
  howHeardAboutUs: z.string().optional().default(''),
  referredBy: z.string().optional().default(''),
  emergencyContactName: z.string().optional().default(''),
  emergencyContactPhone: z.string().optional().default(''),
  emergencyContactRelation: z.string().optional().default(''),
  signature: z.string().optional().default(''),
  signatureDate: z.string().optional().default(''),
}).passthrough();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the incoming data
    const validatedData = applicationSchema.parse(body);

    // Save to database — NO silent fallback. If DB fails, return a real error.
    const application = await prisma.application.create({
      data: {
        // Personal Information
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        middleName: validatedData.middleName,
        socialSecurity: validatedData.socialSecurity,
        dateOfBirth: validatedData.dateOfBirth,
        phone: validatedData.phone,
        email: validatedData.email,

        // Current Address
        currentAddress: validatedData.currentAddress,
        currentCity: validatedData.currentCity,
        currentState: validatedData.currentState,
        currentZip: validatedData.currentZip,
        currentDuration: validatedData.currentDuration,
        livedHereThreeYears: validatedData.livedHereThreeYears,

        // Driver License Information
        licenseNumber: validatedData.licenseNumber,
        licenseState: validatedData.licenseState,
        licenseExpiration: validatedData.licenseExpiration,
        cdlClass: validatedData.cdlClass,
        endorsements: JSON.stringify(validatedData.endorsements),
        restrictions: JSON.stringify(validatedData.restrictions),
        licenseImageFront: validatedData.licenseImageFront || null,
        licenseImageBack: validatedData.licenseImageBack || null,

        // Current Employment
        currentEmployer: validatedData.currentEmployer,
        currentPosition: validatedData.currentPosition,
        currentStartDate: validatedData.currentStartDate,
        currentEndDate: validatedData.currentEndDate,
        currentSalary: validatedData.currentSalary,
        currentReasonForLeaving: validatedData.currentReasonForLeaving,

        // Military Service
        militaryService: validatedData.militaryService,
        militaryBranch: validatedData.militaryBranch,
        militaryRank: validatedData.militaryRank,
        militaryDates: validatedData.militaryDates,

        // Additional Questions
        hasConvictions: validatedData.hasConvictions,
        convictionsDetails: validatedData.convictionsDetails || null,
        canLiftFiftyLbs: validatedData.canLiftFiftyLbs,
        hasPhysicalLimits: validatedData.hasPhysicalLimits,
        physicalLimitsDetails: validatedData.physicalLimitsDetails || null,
        availableWeekends: validatedData.availableWeekends,
        availableOvernight: validatedData.availableOvernight,
        expectedPay: validatedData.expectedPay || null,
        howHeardAboutUs: validatedData.howHeardAboutUs || null,
        referredBy: validatedData.referredBy || null,
        emergencyContactName: validatedData.emergencyContactName || null,
        emergencyContactPhone: validatedData.emergencyContactPhone || null,
        emergencyContactRelation: validatedData.emergencyContactRelation || null,
        signature: validatedData.signature || null,
        signatureDate: validatedData.signatureDate || null,

        // Related data
        previousAddresses: {
          create: validatedData.previousAddresses,
        },
        previousEmployment: {
          create: validatedData.previousEmployment,
        },
        accidents: {
          create: validatedData.accidents.filter((acc: { date?: string; description?: string }) =>
            acc.date && acc.description
          ),
        },
        violations: {
          create: validatedData.violations.filter((vio: { date?: string; violation?: string; location?: string }) =>
            vio.date && vio.violation && vio.location
          ),
        },
      },
      include: {
        previousAddresses: true,
        previousEmployment: true,
        accidents: true,
        violations: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: application.id,
        referenceNumber: `ST-${new Date().getFullYear()}-${application.id.slice(-6).toUpperCase()}`,
        submittedAt: application.createdAt,
      },
    }, { status: 201 });

  } catch (error) {
    console.error('Error submitting application:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        details: error.issues,
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to submit application. Database error — please try again or contact support.',
      details: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}

// GET endpoint to retrieve applications (for admin/review purposes)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') ?? '1');
    const limit = parseInt(searchParams.get('limit') ?? '10');
    const skip = (page - 1) * limit;

    const applications = await prisma.application.findMany({
      include: {
        previousAddresses: true,
        previousEmployment: true,
        accidents: true,
        violations: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    const total = await prisma.application.count();

    return NextResponse.json({
      success: true,
      data: {
        applications: applications.map(app => ({
          ...app,
          endorsements: app.endorsements ? JSON.parse(app.endorsements) : [],
          restrictions: app.restrictions ? JSON.parse(app.restrictions) : [],
        })),
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });

  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch applications',
      details: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}
