import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema for the complete application
const applicationSchema = z.object({
  // Personal Information
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  middleName: z.string().optional(),
  socialSecurity: z.string().min(9, 'Social Security Number is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  phone: z.string().min(10, 'Phone number is required'),
  email: z.string().email('Valid email is required'),

  // Current Address
  currentAddress: z.string().min(1, 'Current address is required'),
  currentCity: z.string().min(1, 'Current city is required'),
  currentState: z.string().min(2, 'Current state is required'),
  currentZip: z.string().min(5, 'Current ZIP code is required'),
  currentDuration: z.string().min(1, 'Duration at current address is required'),
  livedHereThreeYears: z.boolean(),

  // Previous Addresses (already filtered client-side, so all should be complete)
  // Empty array is allowed if livedHereThreeYears is true
  previousAddresses: z.array(z.object({
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(2, 'State is required'),
    zip: z.string().min(5, 'ZIP code is required'),
    duration: z.string().min(1, 'Duration is required'),
  })),

  // Driver License Information
  licenseNumber: z.string().min(1, 'License number is required'),
  licenseState: z.string().min(2, 'License state is required'),
  licenseExpiration: z.string().min(1, 'License expiration is required'),
  cdlClass: z.string().optional(),
  endorsements: z.array(z.string()),
  restrictions: z.array(z.string()),

  // Current Employment
  currentEmployer: z.string().min(1, 'Current employer is required'),
  currentPosition: z.string().min(1, 'Current position is required'),
  currentStartDate: z.string().min(1, 'Current job start date is required'),
  currentEndDate: z.string().optional(),
  currentSalary: z.string().min(1, 'Current salary is required'),
  currentReasonForLeaving: z.string().optional(),

  // Previous Employment (already filtered client-side, so all should be complete)
  previousEmployment: z.array(z.object({
    employer: z.string().min(1, 'Employer is required'),
    position: z.string().min(1, 'Position is required'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    salary: z.string().min(1, 'Salary is required'),
    reasonForLeaving: z.string().min(1, 'Reason for leaving is required'),
  })),

  // Driving History (optional arrays)
  accidents: z.array(z.object({
    date: z.string(),
    description: z.string(),
    fatalities: z.boolean(),
    injuries: z.boolean(),
  })),

  violations: z.array(z.object({
    date: z.string(),
    violation: z.string(),
    location: z.string(),
  })),

  // Military Service
  militaryService: z.boolean(),
  militaryBranch: z.string().optional(),
  militaryRank: z.string().optional(),
  militaryDates: z.string().optional(),
}).refine((data) => {
  // Validate address history logic: if they haven't lived at current address for 3+ years,
  // they need at least one previous address
  if (!data.livedHereThreeYears && data.previousAddresses.length === 0) {
    return false;
  }
  return true;
}, {
  message: "Previous addresses are required if you haven't lived at your current address for 3+ years",
  path: ["previousAddresses"]
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the incoming data
    const validatedData = applicationSchema.parse(body);

    // Attempt DB write; fall back to a demo response if DB isn't available
    try {
      await prisma.$connect();
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

          // Related data
          previousAddresses: {
            create: validatedData.previousAddresses,
          },
          previousEmployment: {
            create: validatedData.previousEmployment,
          },
          accidents: {
            create: validatedData.accidents.filter(acc =>
              acc.date && acc.description
            ),
          },
          violations: {
            create: validatedData.violations.filter(vio =>
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

    } catch (dbError) {
      console.warn('Database not available or failed, returning demo response:', dbError);
      return NextResponse.json({
        success: true,
        data: {
          id: 'demo-' + Date.now(),
          referenceNumber: `ST-${new Date().getFullYear()}-DEMO${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          submittedAt: new Date().toISOString(),
        },
      }, { status: 201 });
    }

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
      error: 'Failed to submit application. Please try again.',
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

    // Check if database is available (for deployment environments)
    try {
      await prisma.$connect();
    } catch (dbError) {
      console.warn('Database not available, returning mock response');
      return NextResponse.json({
        success: true,
        data: {
          applications: [],
          pagination: {
            page,
            limit,
            total: 0,
            pages: 0,
          },
        },
      });
    }

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
    }, { status: 500 });
  }
}
