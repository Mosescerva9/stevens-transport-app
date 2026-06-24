#!/usr/bin/env python3
"""Centralized site configuration for Mobi Estimates.

Single source of truth for company info, contact details, pricing, CTAs,
SEO, and deployment paths. Edit values here — pages pull from this module.
Empty strings are treated as "not configured" and are hidden in the UI.
"""

# --------------------------------------------------------------------------
# Company / brand
# --------------------------------------------------------------------------
SITE_NAME = "Mobi Estimates"
TAGLINE = "Bid more projects without hiring another estimator."
LEGAL_NAME = "Mobi Estimates"          # update with registered legal entity name
BUSINESS_LOCATION = "United States"     # service area (nationwide / remote)
GOVERNING_LAW = "[State/Country — owner to supply]"  # for Terms

# --------------------------------------------------------------------------
# Contact — leave blank to hide from the public UI until verified
# --------------------------------------------------------------------------
EMAIL = "estimates@mobiestimates.com"  # preferred; already in use on the site
PHONE = ""                              # NO verified number yet -> hidden everywhere
PHONE_HREF = ""                         # e.g. "+18005551234" once verified
SCHEDULING_URL = ""                     # e.g. Calendly link; falls back to contact page

# Social links (blank = hidden)
SOCIAL = {
    "linkedin": "",
    "instagram": "",
    "facebook": "",
}

# --------------------------------------------------------------------------
# Deployment / domain
# --------------------------------------------------------------------------
# Internal links are relative, so they work on both URLs. CANONICAL_BASE is
# used for <link rel=canonical>, Open Graph URLs, and the sitemap.
GH_PAGES_BASE = "https://mosescerva9.github.io/stevens-transport-app"
PROD_BASE = "https://www.mobiestimates.com"
# Switch to PROD_BASE once the custom domain + DNS are live:
CANONICAL_BASE = GH_PAGES_BASE

# --------------------------------------------------------------------------
# Analytics — blank = no tag emitted (never commit a real secret/key here)
# --------------------------------------------------------------------------
ANALYTICS_ID = ""   # e.g. "G-XXXXXXX"; loaded only if set

# --------------------------------------------------------------------------
# Forms — endpoint for real submissions. Blank = front-end demo mode
# (validates + shows success, no network call). Wire to Formspree/Netlify/
# your backend by setting FORM_ENDPOINT.
# --------------------------------------------------------------------------
FORM_ENDPOINT = ""
ACCEPTED_FILE_TYPES = ".pdf, .dwg, .dwf, .png, .jpg, .jpeg, .xlsx, .xls, .csv, .zip"
MAX_FILE_NOTE = "Up to 25 MB per file. Large plan sets: send a .zip or a shared link in the notes."

# --------------------------------------------------------------------------
# Sample estimate download — blank = lead-capture only (no broken link)
# --------------------------------------------------------------------------
SAMPLE_PDF_URL = ""

# --------------------------------------------------------------------------
# Turnaround language
# --------------------------------------------------------------------------
TURNAROUND_SINGLE = "Typically 2–4 business days"
TURNAROUND_FULL = "Typically 3–5 business days"
TURNAROUND_NOTE = ("Turnaround depends on project size, scope, drawing quality, trade count, "
                   "complexity, and required deliverables. Your delivery schedule is approved before work begins.")

# --------------------------------------------------------------------------
# Pricing — project-based
# --------------------------------------------------------------------------
PROJECT_PLANS = [
    {
        "id": "single-trade",
        "name": "Single-Trade Takeoff",
        "price": "Starting at $199",
        "best_for": "Subcontractors bidding one construction trade.",
        "features": [
            "Quantity takeoff", "Labor and material breakdown", "Marked-up drawings",
            "Excel and PDF delivery", "One revision round", "Typical turnaround of 2–4 business days",
        ],
        "cta": "Upload Plans for Exact Quote",
        "href": "upload-plans.html",
        "featured": False,
    },
    {
        "id": "full-estimate",
        "name": "Full Estimate",
        "price": "Starting at $399",
        "best_for": "Larger trade packages, home builders, remodelers, and smaller multi-trade projects.",
        "features": [
            "Quantity takeoff", "Labor pricing", "Material pricing", "Equipment pricing when applicable",
            "Trade-by-trade cost breakdown", "Assumptions and exclusions", "Marked-up drawings",
            "Proposal-ready estimate summary", "One revision round", "Typical turnaround of 3–5 business days",
        ],
        "cta": "Get My Project Priced",
        "href": "upload-plans.html",
        "featured": True,
    },
    {
        "id": "gc-multi-trade",
        "name": "GC & Multi-Trade Estimate",
        "price": "Custom Quote",
        "best_for": "Commercial, multifamily, industrial, civil, institutional, and larger full-project bids.",
        "features": [
            "Multi-trade estimating", "CSI division breakdown", "Bid leveling", "Scope-gap review",
            "Alternates and allowances", "Subcontractor comparison support", "Bid-form support",
            "Priority communication",
        ],
        "cta": "Request a GC Estimate",
        "href": "upload-plans.html",
        "featured": False,
    },
]

PROJECT_PRICING_DISCLAIMER = (
    "Final pricing depends on project size, scope, drawing quality, trade count, complexity, "
    "deliverables, and required turnaround. Your exact price and delivery schedule will be "
    "approved before work begins.")

# --------------------------------------------------------------------------
# Pricing — monthly subscriptions (capacity-based, NOT hours)
# --------------------------------------------------------------------------
MONTHLY_PLANS = [
    {
        "id": "starter",
        "name": "Starter Estimating Support",
        "price": "$995",
        "period": "per month",
        "best_for": "Smaller contractors that need regular estimating help but do not have constant bid volume.",
        "features": [
            "Up to 3 standard bids per month", "One active estimate at a time",
            "Single-trade takeoffs and estimates", "Labor and material breakdowns", "Marked-up plans",
            "One revision round per estimate", "Standard scheduling", "Saved client pricing preferences",
            "Saved markup preferences", "Month-to-month service",
        ],
        "cta": "Add Estimating Support",
        "href": "capacity-plan.html?plan=starter",
        "featured": False,
    },
    {
        "id": "growth",
        "name": "Growth Bid Support",
        "price": "$1,995",
        "period": "per month",
        "best_for": "Contractors that want to bid more consistently without hiring another estimator.",
        "features": [
            "Up to 7 standard bids per month", "Up to two active estimates at a time",
            "Single-trade estimates", "Smaller multi-trade estimates", "Quantity takeoffs",
            "Labor pricing", "Material pricing", "Equipment pricing when applicable", "Bid preparation",
            "Scope review", "Addenda support", "Revision support", "Priority scheduling",
            "Custom estimate templates", "Monthly bid-pipeline review", "Month-to-month service",
        ],
        "cta": "Increase My Bid Capacity",
        "href": "capacity-plan.html?plan=growth",
        "featured": True,
        "badge": "Most Popular",
    },
    {
        "id": "department",
        "name": "Outsourced Estimating Department",
        "price": "$2,995",
        "period": "per month",
        "best_for": ("Growing contractors that want Mobi to operate as their primary estimating resource "
                     "or significantly expand their internal estimating capacity."),
        "features": [
            "Up to 12 standard bids per month", "Up to three active estimates at a time",
            "Single-trade estimates", "Multi-trade estimates", "General contractor estimate support",
            "Quantity takeoffs", "Labor, material, and equipment pricing", "Bid preparation", "Bid leveling",
            "Scope-gap review", "Addenda management", "Alternates and allowances", "Bid-form support",
            "Custom pricing preferences", "Custom markup preferences", "Custom estimate templates",
            "Priority scheduling", "Weekly bid-pipeline meeting", "Dedicated communication channel",
            "Month-to-month service",
        ],
        "cta": "Build My Estimating Department",
        "href": "capacity-plan.html?plan=department",
        "featured": False,
    },
]

STANDARD_BID_DEF = (
    "A standard bid is based on typical project size, scope, drawing completeness, number of trades, "
    "complexity, and required turnaround. Larger, multi-trade, incomplete, highly detailed, or accelerated "
    "projects may count as two or more standard bids. Every project is reviewed before being assigned to "
    "monthly capacity.")

MONTHLY_CAPACITY_NOTE = (
    "Monthly subscriptions reserve estimating capacity and workflow support. They are not unlimited-use "
    "plans. Project classifications and expected monthly capacity are confirmed during onboarding.")

# Owner-configurable policy answers (kept out of public copy until confirmed).
# Set ROLLOVER_POLICY to a real answer to publish it in the FAQ.
ROLLOVER_POLICY = ""   # e.g. "Unused standard bids do not roll over." — OWNER TO CONFIRM
CANCELLATION_POLICY = "Month-to-month. You can cancel before your next billing cycle."

# --------------------------------------------------------------------------
# Founder / company trust — leave blank to hide individual fields
# --------------------------------------------------------------------------
FOUNDER = {
    "name": "",
    "photo": "",            # path under assets/img/ once supplied
    "bio": "",
    "construction_experience": "",
    "estimating_experience": "",
    "software": "",
    "location": "",
    "linkedin": "",
    "phone": "",
    "email": "",
    "registration": "",
}

FOUNDER_STATEMENT = (
    "Construction companies should not have to turn down profitable bidding opportunities because their "
    "estimating team is overloaded. Mobi provides dependable estimating capacity when contractors need it — "
    "whether that means one project, monthly support, or a primary outsourced estimating resource.")

# --------------------------------------------------------------------------
# Primary / secondary CTAs (label -> destination)
# --------------------------------------------------------------------------
CTA_PRIMARY = ("Upload Plans for a Free Quote", "upload-plans.html")
CTA_UPLOAD = ("Upload Plans", "upload-plans.html")
CTA_PRICING = ("View Pricing", "pricing.html")
CTA_SAMPLE = ("Download Sample Estimate", "sample-estimate.html")
CTA_CAPACITY = ("Request My Capacity Plan", "capacity-plan.html")
CTA_PILOT = ("Start My 30-Day Pilot", "capacity-plan.html?plan=pilot")
CTA_COMPARE = ("Compare Estimating Options", "pricing.html")

# Account signup / subscription onboarding (the separate client portal app).
# Homepage hero + mobile sticky bar point here to drive sign-ups.
# TODO: confirm the live portal domain and update if the portal is hosted
# elsewhere (e.g. the Vercel deployment URL) before launch.
JOIN_URL = "https://portal.mobiestimates.com/signup"
CTA_JOIN = ("Join Now", JOIN_URL)

ASSET_VER = "10"  # bump to bust browser cache when CSS/JS change
