#!/usr/bin/env python3
"""Page content + site build. Run: python3 generate.py"""
from build import *  # noqa: F401,F403


# ==========================================================================
# HOME
# ==========================================================================
def build_home():
    benefit_cards = "".join([
        service_card("how-it-works.html", "clock", "Faster Turnaround",
                     "Complete more estimates and respond to more bidding opportunities without overwhelming your internal team.", 0),
        service_card("how-it-works.html", "shield", "Human Quality Control",
                     "AI and estimating technology speed up the process, while trained estimators review the quantities, scope, pricing and final deliverables.", 80),
        service_card("industries.html", "layers", "All Trades & Project Types",
                     "We support general contractors and subcontractors across residential, commercial, industrial, civil, renovation and new construction.", 160),
        service_card("services.html", "adjust", "Flexible Estimating Capacity",
                     "Use Mobi Estimates for occasional overflow work, individual projects, or ongoing monthly estimating support.", 240),
    ])

    services = "".join([
        service_card(h, ic, t, d, i * 70)
        for i, (h, ic, t, d) in enumerate([
            ("quantity-takeoffs.html", "doc-search", "Quantity Takeoffs",
             "Detailed measurements and quantities extracted directly from your construction drawings."),
            ("construction-cost-estimating.html", "calculator", "Construction Cost Estimating",
             "Labor, material, equipment and subcontractor costs prepared from plans and specifications."),
            ("general-contractor-estimating.html", "building2", "General Contractor Estimating",
             "Full-project, multi-trade estimates and bid-ready packages for general contractors."),
            ("subcontractor-estimating.html", "wrench", "Subcontractor Estimating",
             "Trade-specific takeoffs and pricing so subs can bid faster and more competitively."),
            ("monthly-estimating-support.html", "refresh", "Monthly Estimating Support",
             "Reserved, ongoing estimating capacity without hiring a full-time in-house estimator."),
            ("services.html", "list-check", "Bid Preparation & Review",
             "Bid summaries, scope breakdowns, scope-gap review, bid leveling and value engineering."),
        ])
    ])

    who_we_serve = [
        "General contractors", "Subcontractors", "Home builders", "Remodelers",
        "Developers", "Construction managers", "Property investors", "Architects needing budget support",
        "Owners needing independent estimates", "Restoration contractors", "Specialty contractors",
        "Commercial contractors", "Residential contractors", "Civil contractors", "Public-project bidders",
    ]
    serve_chips = "".join('<span class="tag reveal" data-delay="%d">%s %s</span>'
                          % (min(i * 25, 300), icon("check"), w) for i, w in enumerate(who_we_serve))

    deliverables = [
        "Detailed construction estimate", "Quantity takeoff", "Labor & material breakdown",
        "Trade-by-trade cost summary", "Marked-up drawings", "Material list",
        "Scope-of-work summary", "Inclusions & exclusions", "Assumptions & clarifications",
        "Bid-form support", "Proposal-ready summary", "Alternate pricing",
        "Allowance schedule", "Change-order estimate", "Subcontractor comparison",
        "Revision log", "Excel / spreadsheet files", "PDF estimate package",
    ]
    deliver_html = check_list(deliverables, "cols-2")

    process_steps = [
        ("Submit Your Project", "Upload the plans, specifications, addenda, bid forms, project location, required trades and bid deadline."),
        ("We Review the Scope", "Our team reviews the documents, confirms the required services, identifies missing information and organizes the project."),
        ("Takeoff & Estimate", "We prepare quantities, labor, materials, equipment, subcontractor costs and the requested bid breakdown."),
        ("Quality-Control Review", "The estimate is checked for scope coverage, quantities, pricing, assumptions, exclusions, addenda and calculation accuracy."),
        ("Receive Your Estimate", "The completed estimate, takeoff, marked-up plans and scope summary are uploaded to your client portal."),
        ("Request Revisions", "Submit clarifications, revised plans, addenda or revision requests directly through the portal."),
    ]
    steps_html = "".join(
        '<div class="step reveal" data-delay="%d"><div class="num">%d</div><h3>%s</h3><p>%s</p></div>'
        % (i * 60, i + 1, t, d) for i, (t, d) in enumerate(process_steps))

    why_features = [
        ("globe", "Nationwide Service", "Remote estimating support for contractors across the United States."),
        ("upload", "Fast Project Intake", "Submit drawings, specifications, addenda and bidding instructions through one organized portal."),
        ("shield", "Human-Reviewed Estimates", "Every completed estimate goes through a structured quality-control process before delivery."),
        ("layers", "Construction-Focused Workflow", "Each project is organized by trade, scope, bid deadline, document version and required deliverables."),
        ("lock", "Secure Client Portal", "Upload files, track progress, answer questions, message the team and download completed work."),
        ("adjust", "Flexible Service Options", "Choose per-project estimating, overflow estimating support, or ongoing monthly service."),
    ]
    why_html = "".join(feature_item(ic, t, d, i * 60) for i, (ic, t, d) in enumerate(why_features))

    sample_rows = [
        ("Sitework & Concrete", 62),
        ("Structure & Framing", 78),
        ("Finishes", 45),
        ("MEP", 88),
    ]
    rows_html = "".join(
        '<div class="ec-row"><span>%s %s</span><div class="bar"><i style="width:%d%%"></i></div></div>'
        % (icon("cube"), name, pct) for name, pct in sample_rows)

    body = '''
<section class="hero">
  <div class="blueprint"></div><div class="glow a"></div><div class="glow b"></div>
  <div class="container section" style="padding-block:clamp(56px,8vw,104px)">
    <div class="hero-grid">
      <div class="stagger">
        <span class="pill"><span class="dot"></span> Your estimating department, on demand</span>
        <h1 style="margin-top:20px">Bid more projects without hiring another <span class="gradient-text">full-time estimator</span>.</h1>
        <p class="lead" style="color:#cdddf7;margin-top:20px;max-width:54ch">
          Mobi Estimates helps contractors complete more bids with fast, accurate, bid-ready construction estimates — powered by AI and reviewed by real estimators.</p>
        <div class="flex gap-3 wrap" style="margin-top:30px">
          %s
          %s
        </div>
        <div class="flex gap-4 wrap" style="margin-top:30px;color:#9fb4d4;font-size:.9rem">
          <span class="flex items-center gap-2">%s All trades &amp; divisions</span>
          <span class="flex items-center gap-2">%s Nationwide, USA</span>
          <span class="flex items-center gap-2">%s Human-reviewed</span>
        </div>
        <p style="margin-top:18px"><a href="services.html" style="color:#8fb8fb;font-weight:600;display:inline-flex;align-items:center;gap:8px">Explore our services %s</a></p>
      </div>
      <div class="reveal-scale">
        <div class="estimate-card float">
          <div class="ec-head">
            <div class="flex items-center gap-2"><span class="icon-box" style="margin:0;width:38px;height:38px">%s</span><strong style="color:#0b1d3a">Sample estimate summary</strong></div>
            <span class="tag">Bid-ready</span>
          </div>
          <div class="animate-bar">%s</div>
          <div class="ec-row"><span>%s Scope &amp; quantities verified</span><b style="color:#16a34a">Reviewed</b></div>
          <div class="ec-total"><span>Organized, trade-by-trade</span><b>Proposal-ready</b></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section-tight band-alt">
  <div class="container">
    <div class="trust-strip reveal">
      <span class="chip">%s Residential</span>
      <span class="chip">%s Commercial</span>
      <span class="chip">%s Industrial &amp; Civil</span>
      <span class="chip">%s Multifamily</span>
      <span class="chip">%s Renovations &amp; TI</span>
      <span class="chip">%s New Construction</span>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="center reveal" style="max-width:760px;margin-inline:auto">
      <span class="eyebrow">Why contractors choose Mobi</span>
      <h2 style="margin-top:14px">Send us your plans. Get back a bid-ready package.</h2>
      <p class="lead mt-3">Send us your plans, specifications, bid documents and project details. Our team organizes the scope, completes the takeoff, prepares the pricing, reviews the estimate and delivers a professional, bid-ready package.</p>
    </div>
    <div class="grid cols-4 mt-8">%s</div>
  </div>
</section>

<section class="section band-alt">
  <div class="container">
    <div class="flex items-center wrap reveal" style="justify-content:space-between;gap:18px">
      <div style="max-width:560px">
        <span class="eyebrow">What we do</span>
        <h2 style="margin-top:14px">Estimating services for every stage of the bid</h2>
      </div>
      %s
    </div>
    <div class="grid cols-3 mt-8">%s</div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="center reveal" style="max-width:700px;margin-inline:auto">
      <span class="eyebrow">How it works</span>
      <h2 style="margin-top:14px">A simple, organized estimating process</h2>
      <p class="lead mt-3">From document intake to a reviewed, bid-ready deliverable — without the overhead of an in-house department.</p>
    </div>
    <div class="grid cols-3 mt-8">%s</div>
    <div class="center mt-6 reveal">%s</div>
  </div>
</section>

<section class="section band-dark">
  <div class="container">
    <div class="grid" style="grid-template-columns:.95fr 1.05fr;gap:48px;align-items:center">
      <div class="reveal-left">
        <span class="eyebrow on-dark">Built for contractors</span>
        <h2 style="margin-top:14px">Built for contractors who want to bid more work</h2>
        <p class="lead mt-3" style="color:#aebfd8">Whether you need help with one estimate or ongoing support for your entire bidding pipeline, Mobi Estimates can operate as an extension of your team.</p>
        <div class="flex wrap gap-2 mt-6">%s</div>
      </div>
      <div class="reveal">
        <div class="card" style="background:rgba(255,255,255,.04);border-color:rgba(255,255,255,.12)">
          <h3 style="color:#fff">What you receive</h3>
          <p class="muted mt-2" style="margin-bottom:18px">Depending on the service selected, deliverables may include:</p>
          %s
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="center reveal" style="max-width:720px;margin-inline:auto">
      <span class="eyebrow">A better way to handle estimating</span>
      <h2 style="margin-top:14px">Modern estimating, organized around how contractors actually bid</h2>
    </div>
    <div class="grid cols-3 mt-8">%s</div>
  </div>
</section>

%s
''' % (
        btn("Request an Estimate", "request-a-quote.html", "primary", "calculator", "lg"),
        btn("Upload Your Project", "upload-project.html", "ghost", "upload", "lg"),
        icon("check"), icon("pin"), icon("shield"), icon("arrow-right"),
        icon("calculator"), rows_html, icon("check-circle"),
        icon("home"), icon("building"), icon("truck"), icon("building2"), icon("hammer"), icon("cube"),
        benefit_cards,
        btn("View all services", "services.html", "outline", "arrow-right"),
        services, steps_html,
        btn("See the full process", "how-it-works.html", "outline", "arrow-right"),
        serve_chips, deliver_html, why_html,
        cta_band(),
    )
    page("index.html",
         "Mobi Estimates — Construction Estimating & Quantity Takeoffs, Nationwide",
         "Fast, accurate, bid-ready construction estimates and quantity takeoffs for contractors nationwide. Powered by AI and reviewed by real estimators. Request an estimate today.",
         body, active="home")


# ==========================================================================
# SERVICES (overview)
# ==========================================================================
def build_services():
    groups = [
        ("Core estimating", [
            ("construction-cost-estimating.html", "calculator", "Construction Cost Estimating",
             "Detailed labor, material, equipment, subcontractor and project-cost estimates from plans, specs and project documents."),
            ("quantity-takeoffs.html", "doc-search", "Quantity Takeoffs",
             "Detailed measurements and quantities extracted from construction drawings — linear feet, SF, CY, counts and schedules."),
            ("general-contractor-estimating.html", "building2", "General Contractor Estimating",
             "Full-project, multi-trade estimates and bid-ready packages built for general contractors."),
            ("subcontractor-estimating.html", "wrench", "Subcontractor Estimating",
             "Trade-specific takeoffs and pricing so subcontractors can bid faster and more competitively."),
        ]),
        ("Bid & budget support", [
            ("services.html#bid-prep", "list-check", "Bid Preparation",
             "Bid summary, scope breakdown, inclusions, exclusions, assumptions, alternates and a proposal-ready estimate."),
            ("services.html#budget", "chart", "Budget & Conceptual Estimating",
             "Early-stage budgets, cost-per-SF, schematic and feasibility estimates before complete documents exist."),
            ("services.html#review", "scale", "Estimate Review & Bid Comparison",
             "Scope-gap analysis, bid leveling, subcontractor comparison, quantity verification and risk review."),
            ("services.html#ve", "adjust", "Value Engineering",
             "Cost-saving alternatives, material substitutions and constructability suggestions that maintain project intent."),
        ]),
        ("Ongoing & specialized", [
            ("monthly-estimating-support.html", "refresh", "Monthly Estimating Support",
             "Reserved estimating capacity, priority intake and dedicated communication without hiring in-house."),
            ("services.html#change-order", "doc-text", "Change-Order Estimating",
             "Pricing support for added or deleted scope, labor/material/equipment impacts and change-order backup."),
            ("services.html#materials", "cube", "Material Lists",
             "Organized material quantity reports for purchasing, supplier pricing and field coordination."),
            ("services.html#scope-sheets", "clipboard-check", "Subcontractor Scope Sheets",
             "Scope-of-work documents to request and compare subcontractor bids with clear inclusions and exclusions."),
        ]),
    ]
    sections = ""
    for gi, (label, items) in enumerate(groups):
        cards = "".join(service_card(h, ic, t, d, i * 60) for i, (h, ic, t, d) in enumerate(items))
        sections += '''<div class="reveal" style="margin-top:%dpx">
          <span class="eyebrow">%s</span>
        </div>
        <div class="grid cols-2 mt-4">%s</div>''' % (0 if gi == 0 else 56, label, cards)

    detail_anchors = '''
<section class="section band-alt">
  <div class="container">
    <div class="grid cols-2" style="gap:40px">
      <div class="reveal" id="bid-prep">
        <span class="eyebrow">Bid preparation</span>
        <h3 class="mt-2">Submit professional, organized, competitive bids</h3>
        <p class="muted mt-2 mb-3">Complete support to help contractors put together winning bids.</p>
        %s
      </div>
      <div class="reveal" id="budget" data-delay="80">
        <span class="eyebrow">Budget &amp; conceptual</span>
        <h3 class="mt-2">Early-stage estimates before full documents</h3>
        <p class="muted mt-2 mb-3">Cost planning for projects still in design.</p>
        %s
      </div>
      <div class="reveal" id="review">
        <span class="eyebrow">Review &amp; comparison</span>
        <h3 class="mt-2">Catch missing scope before it costs you</h3>
        <p class="muted mt-2 mb-3">Independent review of estimates and subcontractor bids.</p>
        %s
      </div>
      <div class="reveal" id="ve" data-delay="80">
        <span class="eyebrow">Value engineering</span>
        <h3 class="mt-2">Reduce cost while protecting project intent</h3>
        <p class="muted mt-2 mb-3">Practical alternatives that keep performance in mind.</p>
        %s
      </div>
    </div>
    <p class="muted mt-6" style="font-size:.86rem;max-width:70ch">Note: value engineering suggestions are not architectural or engineering design and do not replace work performed by a properly licensed professional.</p>
  </div>
</section>''' % (
        check_list(["Bid summary", "Scope breakdown", "Labor & material pricing", "Inclusions & exclusions",
                    "Assumptions & alternates", "Allowances", "Proposal-ready estimate", "Bid-form assistance",
                    "Scope-gap review", "Final bid review"]),
        check_list(["Preliminary budgets", "Cost-per-square-foot estimates", "Conceptual & schematic estimates",
                    "Feasibility estimates", "Development budgets", "Preliminary trade budgets",
                    "Cost planning", "Design-stage cost updates"]),
        check_list(["Scope-gap analysis", "Estimate review", "Bid leveling", "Subcontractor comparison",
                    "Quantity verification", "Pricing review", "Missing-scope identification",
                    "Duplicate-cost identification", "Inclusions/exclusions review", "Risk review"]),
        check_list(["Alternative materials & assemblies", "Cost-saving options", "Scope modifications",
                    "Constructability suggestions", "Labor-saving alternatives", "Material substitutions",
                    "Budget alignment"]),
    )

    body = page_hero(
        "Services",
        "Construction estimating services for the entire bid",
        "From quantity takeoffs and detailed cost estimates to bid preparation, change-order pricing and ongoing monthly support — across all trades and project types.",
        [("Services", None)]
    ) + '''
<section class="section">
  <div class="container">%s</div>
</section>
%s
%s
''' % (sections, detail_anchors, cta_band())
    page("services.html",
         "Services — Construction Estimating & Takeoffs | Mobi Estimates",
         "Construction cost estimating, quantity takeoffs, bid preparation, budget estimating, change-order pricing, value engineering and monthly estimating support — all trades, nationwide.",
         body, active="services")


# ==========================================================================
# Generic service-detail page builder
# ==========================================================================
def service_detail(filename, title_seo, eyebrow, h1, intro, included, deliverables,
                   meta_desc, extra_section=""):
    body = page_hero(eyebrow, h1, intro, [("Services", "services.html"), (eyebrow, None)])
    body += '''
<section class="section">
  <div class="container">
    <div class="grid" style="grid-template-columns:1.05fr .95fr;gap:48px;align-items:start">
      <div class="reveal">
        <span class="eyebrow">What's included</span>
        <h2 class="mt-2 mb-4">Detailed, organized and bid-ready</h2>
        %s
      </div>
      <div class="reveal" data-delay="80">
        <div class="card" style="position:sticky;top:96px">
          <h3>Typical deliverables</h3>
          <p class="muted mt-2 mb-3" style="font-size:.95rem">What you can expect to receive with this service.</p>
          %s
          <div class="mt-6 grid" style="gap:10px">
            %s
            %s
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
%s
%s''' % (
        check_list(included, "cols-2"),
        check_list(deliverables),
        btn("Request an Estimate", "request-a-quote.html", "primary", "calculator", cls="btn-block"),
        btn("Upload Your Project", "upload-project.html", "outline", "upload", cls="btn-block"),
        extra_section,
        cta_band(),
    )
    page(filename, title_seo, meta_desc, body, active="services")


def build_quantity_takeoffs():
    service_detail(
        "quantity-takeoffs.html",
        "Quantity Takeoffs — Construction Takeoff Services | Mobi Estimates",
        "Quantity Takeoffs",
        "Accurate quantity takeoffs from your construction drawings",
        "Detailed measurements and quantities extracted directly from your plans — organized by trade and ready to price or hand to your suppliers and subs.",
        ["Linear feet", "Square footage", "Cubic yards", "Material counts", "Fixture counts",
         "Equipment counts", "Door & window schedules", "Room-by-room quantities",
         "Area & volume calculations", "Trade-specific takeoff reports", "Marked-up plans when applicable"],
        ["Trade-specific takeoff reports", "Marked-up drawings", "Material counts & schedules",
         "Area / volume calculations", "Excel or spreadsheet files", "PDF takeoff package"],
        "Professional construction quantity takeoff services. Linear feet, square footage, cubic yards, counts, schedules and marked-up plans — organized by trade, nationwide.",
    )


def build_cost_estimating():
    extra = '''
<section class="section band-alt">
  <div class="container">
    <div class="center reveal" style="max-width:680px;margin-inline:auto">
      <span class="eyebrow">Cost components</span>
      <h2 class="mt-2">Every cost accounted for</h2>
      <p class="lead mt-3">We build estimates from the documents, your pricing and professional estimating procedures — then review before delivery.</p>
    </div>
    <div class="grid cols-3 mt-8">
      %s
    </div>
  </div>
</section>''' % "".join(feature_item(ic, t, d, i * 50) for i, (ic, t, d) in enumerate([
        ("users", "Labor costs", "Production rates and crew pricing applied by trade."),
        ("cube", "Material costs", "Quantities priced with waste factors, taxes and freight."),
        ("truck", "Equipment costs", "Owned or rented equipment built into the estimate."),
        ("handshake", "Subcontractor costs", "Subcontracted scopes captured and organized."),
        ("briefcase", "Overhead & GCs", "General conditions, overhead and general requirements."),
        ("dollar", "Markup & contingencies", "Profit markup, allowances, alternates and contingencies."),
    ]))
    service_detail(
        "construction-cost-estimating.html",
        "Construction Cost Estimating Services | Mobi Estimates",
        "Construction Cost Estimating",
        "Detailed construction cost estimates you can bid with confidence",
        "Labor, material, equipment, subcontractor and project costs prepared from your construction plans, specifications and project documents — then reviewed before delivery.",
        ["Labor costs", "Material costs", "Equipment costs", "Subcontractor costs", "Waste factors",
         "Production rates", "Overhead", "Profit markup", "Taxes & freight", "General conditions",
         "Allowances", "Alternates", "Contingencies"],
        ["Detailed construction estimate", "Trade-by-trade cost summary", "Labor & material breakdown",
         "Inclusions & exclusions", "Assumptions & clarifications", "Excel / PDF estimate package"],
        "Detailed construction cost estimating: labor, material, equipment, subcontractor costs, overhead, markup and contingencies — prepared from your plans and reviewed before delivery.",
        extra_section=extra,
    )


def build_gc_estimating():
    extra = '''
<section class="section band-alt">
  <div class="container">
    <div class="grid cols-3">
      %s
    </div>
  </div>
</section>''' % "".join(feature_item(ic, t, d, i * 60) for i, (ic, t, d) in enumerate([
        ("layers", "Every division covered", "From general requirements and sitework to MEP and finishes, organized by CSI trade."),
        ("scale", "Bid leveling support", "Compare subcontractor bids, find scope gaps and avoid duplicate or missing costs."),
        ("clipboard-check", "Proposal-ready output", "A clean, organized package you can put in front of an owner or GC."),
    ]))
    service_detail(
        "general-contractor-estimating.html",
        "General Contractor Estimating Services | Mobi Estimates",
        "GC Estimating",
        "Full-project estimating for general contractors",
        "Multi-trade estimates and bid-ready packages that help general contractors pursue more projects without expanding their in-house estimating department.",
        ["Full-project, multi-trade takeoffs", "Detailed cost estimates", "General conditions & requirements",
         "Subcontractor cost organization", "Bid summary & scope breakdown", "Inclusions, exclusions & assumptions",
         "Alternates & allowances", "Scope-gap review", "Bid leveling", "Proposal-ready estimate package"],
        ["Trade-by-trade cost summary", "Bid summary & scope breakdown", "Marked-up drawings",
         "Subcontractor comparison", "Inclusions & exclusions", "Excel / PDF estimate package"],
        "Full-project general contractor estimating: multi-trade takeoffs, detailed costs, general conditions, bid leveling and proposal-ready packages. All project types, nationwide.",
        extra_section=extra,
    )


def build_sub_estimating():
    extra = '''
<section class="section band-alt">
  <div class="container">
    <div class="center reveal" style="max-width:680px;margin-inline:auto">
      <span class="eyebrow">All major divisions</span>
      <h2 class="mt-2">Trade-specific estimating across every division</h2>
    </div>
    <div class="cols-fill reveal mt-8">%s</div>
  </div>
</section>''' % trade_columns()
    service_detail(
        "subcontractor-estimating.html",
        "Subcontractor Estimating Services | Mobi Estimates",
        "Subcontractor Estimating",
        "Trade-specific estimating for subcontractors",
        "Fast, detailed takeoffs and pricing for your trade so you can bid more work, more competitively — without slowing down your field operations.",
        ["Trade-specific quantity takeoffs", "Material counts & schedules", "Labor & production rates",
         "Equipment costs", "Waste factors", "Marked-up plans", "Scope-of-work summary",
         "Inclusions & exclusions", "Alternates & allowances", "Proposal-ready pricing"],
        ["Trade-specific takeoff report", "Material list", "Labor & material breakdown",
         "Marked-up drawings", "Scope-of-work summary", "Excel / PDF package"],
        "Subcontractor estimating and trade-specific takeoffs across all CSI divisions — concrete, masonry, metals, MEP, finishes and more. Bid faster and more competitively.",
        extra_section=extra,
    )


def build_monthly_support():
    extra = '''
<section class="section band-dark">
  <div class="container">
    <div class="center reveal" style="max-width:680px;margin-inline:auto">
      <span class="eyebrow on-dark">Dedicated estimating support</span>
      <h2 class="mt-2">An estimating department, without the headcount</h2>
      <p class="lead mt-3" style="color:#aebfd8">Monthly support for contractors who need ongoing help but aren't ready to hire a full-time estimator.</p>
    </div>
    <div class="grid cols-3 mt-8">%s</div>
  </div>
</section>''' % "".join(feature_item(ic, t, d, i * 50) for i, (ic, t, d) in enumerate([
        ("users", "Dedicated point of contact", "A consistent estimator who learns how your company bids."),
        ("refresh", "Recurring capacity", "Reserved estimating hours each month for your pipeline."),
        ("adjust", "Your pricing & markups", "Client-specific labor rates, markups and templates."),
        ("clipboard-check", "Project intake & organization", "We organize incoming projects by trade and deadline."),
        ("chart", "Bid tracking support", "Keep your bidding pipeline organized and moving."),
        ("doc-text", "Historical pricing", "We organize and reuse your historical pricing data."),
    ]))
    service_detail(
        "monthly-estimating-support.html",
        "Monthly Estimating Support | Mobi Estimates",
        "Monthly Estimating Support",
        "Ongoing estimating support, month after month",
        "Reserved estimating capacity for contractors with recurring needs — quantity takeoffs, cost estimates, bid prep and revisions, all set up around how your company bids.",
        ["Dedicated point of contact", "Recurring estimating capacity", "Project intake & organization",
         "Quantity takeoffs", "Cost estimates", "Bid preparation", "Estimate revisions", "Scope reviews",
         "Bid tracking support", "Client-specific estimating templates", "Client-specific labor rates & markups",
         "Historical pricing organization"],
        ["Recurring takeoffs & estimates", "Bid preparation", "Estimate revisions",
         "Client-specific templates", "Bid-status tracking", "Ongoing portal access"],
        "Monthly construction estimating support: reserved capacity, priority intake, recurring takeoffs and estimates, your pricing and templates, plus bid tracking. Scale without hiring.",
        extra_section=extra,
    )


# ==========================================================================
# Trade columns (shared)
# ==========================================================================
def trade_columns():
    trades = [
        ("General Requirements", ["Mobilization", "Supervision", "Temporary facilities", "Project management", "Safety", "Cleanup", "Permits", "Insurance", "General conditions"]),
        ("Sitework & Civil", ["Demolition", "Clearing & grubbing", "Excavation", "Grading", "Earthwork", "Utilities", "Storm drainage", "Sanitary sewer", "Water lines", "Asphalt", "Concrete paving", "Curbs & sidewalks", "Landscaping", "Fencing"]),
        ("Concrete", ["Footings", "Foundations", "Slabs", "Reinforcing steel", "Formwork", "Concrete walls", "Elevated slabs", "Paving", "Precast concrete"]),
        ("Masonry", ["CMU", "Brick", "Stone", "Veneer", "Mortar", "Reinforcement", "Accessories"]),
        ("Metals", ["Structural steel", "Miscellaneous metals", "Metal framing", "Joists", "Decking", "Railings", "Stairs", "Fabrication"]),
        ("Wood & Composites", ["Rough carpentry", "Finish carpentry", "Wood framing", "Sheathing", "Blocking", "Millwork", "Cabinets", "Countertops", "Trim"]),
        ("Thermal & Moisture", ["Roofing", "Waterproofing", "Insulation", "Air barriers", "Vapor barriers", "Sealants", "Siding", "Gutters", "Flashing"]),
        ("Openings", ["Doors", "Frames", "Hardware", "Windows", "Storefront", "Glass", "Overhead doors", "Louvers"]),
        ("Finishes", ["Drywall", "Metal studs", "Acoustical ceilings", "Flooring", "Tile", "Painting", "Wall coverings", "Plaster", "Epoxy coatings"]),
        ("Specialties & Equipment", ["Toilet accessories", "Signage", "Fire extinguishers", "Lockers", "Partitions", "Shelving", "Commercial equipment", "Appliances", "Casework", "Furnishings"]),
        ("Fire Protection", ["Sprinkler systems", "Fire suppression", "Fire alarms", "Accessories"]),
        ("Plumbing", ["Fixtures", "Domestic water", "Sanitary waste", "Storm drainage", "Gas piping", "Water heaters", "Equipment"]),
        ("HVAC & Mechanical", ["Heating", "Ventilation", "Air conditioning", "Ductwork", "Piping", "Equipment", "Controls", "Insulation", "Testing & balancing"]),
        ("Electrical", ["Service", "Distribution", "Panels", "Lighting", "Receptacles", "Wiring", "Conduit", "Fire alarm", "Low-voltage", "Security", "Communications", "Generators"]),
    ]
    out = ""
    for name, items in trades:
        lis = "".join("<li>%s</li>" % i for i in items)
        out += '<div class="trade-group"><h4>%s</h4><ul>%s</ul></div>' % (name, lis)
    return out


# ==========================================================================
# INDUSTRIES
# ==========================================================================
def build_industries():
    inds = [
        ("home", "Residential", "Single-family, renovations and custom homes."),
        ("building", "Commercial", "Offices, retail build-outs and mixed-use."),
        ("truck", "Industrial", "Warehouses, manufacturing and heavy facilities."),
        ("building2", "Multifamily", "Apartments, condos and developments."),
        ("store", "Retail", "Stores, shells and tenant improvements."),
        ("bed", "Hospitality", "Hotels, restaurants and entertainment."),
        ("cross", "Healthcare", "Clinics, medical offices and facilities."),
        ("cap", "Educational", "Schools, campuses and institutional work."),
        ("flag", "Government & Public", "Public bids and publicly funded projects."),
        ("wrench", "Tenant Improvements", "Interior fit-outs and space conversions."),
        ("refresh", "Renovations & Remodels", "Additions, restorations and upgrades."),
        ("hammer", "New Construction", "Ground-up across every sector."),
        ("layers", "Civil & Site Development", "Sitework, utilities and infrastructure."),
    ]
    cards = "".join(
        '<div class="card card-hover reveal" data-delay="%d"><div class="icon-box">%s</div><h3>%s</h3><p>%s</p></div>'
        % (i * 40, icon(ic), t, d) for i, (ic, t, d) in enumerate(inds))
    body = page_hero(
        "Industries & project types",
        "Estimating for every sector of construction",
        "We provide remote estimating support to contractors and construction companies throughout the United States — whatever you're bidding.",
        [("Industries", None)]
    ) + '''
<section class="section">
  <div class="container">
    <p class="lead measure reveal mb-6">Whether you are bidding a residential renovation, commercial build-out, multifamily development, public project or ground-up build, our team can help prepare a detailed, organized estimate.</p>
    <div class="grid cols-4">%s</div>
  </div>
</section>
%s''' % (cards, cta_band())
    page("industries.html",
         "Industries & Project Types | Mobi Estimates",
         "Construction estimating across residential, commercial, industrial, multifamily, retail, hospitality, healthcare, education, government, civil, renovation and new construction.",
         body, active="industries")


# ==========================================================================
# HOW IT WORKS
# ==========================================================================
def build_how():
    steps = [
        ("Submit Your Project", "Upload the plans, specifications, addenda, bid forms, project location, required trades and bid deadline through our secure portal.", "upload"),
        ("We Review the Scope", "Our team reviews the documents, confirms the required services, identifies missing information and organizes the project.", "doc-search"),
        ("We Complete the Takeoff & Estimate", "We prepare quantities, labor, materials, equipment, subcontractor costs and the requested bid breakdown.", "calculator"),
        ("Human Quality-Control Review", "The estimate is checked for scope coverage, quantities, pricing, assumptions, exclusions, addenda and calculation accuracy.", "shield"),
        ("Receive Your Estimate", "The completed estimate, takeoff, marked-up plans, scope summary and related deliverables are uploaded to your client portal.", "check-circle"),
        ("Request Revisions", "Submit clarifications, revised plans, addenda or revision requests through the portal and we'll update the estimate.", "refresh"),
    ]
    big_steps = "".join(
        '''<div class="grid reveal" data-delay="%d" style="grid-template-columns:auto 1fr;gap:22px;align-items:start;padding:26px 0;border-bottom:1px solid var(--line)">
          <div class="num" style="font-family:Fraunces,serif;width:54px;height:54px;border-radius:14px;background:var(--navy-900);color:#fff;display:grid;place-items:center;font-size:1.2rem">%d</div>
          <div><div class="flex items-center gap-2 mb-2"><span style="color:var(--brand-600)">%s</span><h3>%s</h3></div><p class="muted">%s</p></div>
        </div>''' % (i * 50, i + 1, icon(ic), t, d) for i, (t, d, ic) in enumerate(steps))

    body = page_hero(
        "How it works",
        "A faster, more organized estimating process",
        "From document intake to a reviewed, bid-ready deliverable in six clear steps — with human quality control built in.",
        [("How It Works", None)]
    ) + '''
<section class="section">
  <div class="container" style="max-width:860px">%s</div>
</section>
<section class="section band-alt">
  <div class="container">
    <div class="grid cols-3">
      %s
    </div>
  </div>
</section>
%s''' % (
        big_steps,
        "".join(feature_item(ic, t, d) for ic, t, d in [
            ("clock", "Fast turnaround", "Standard turnaround generally ranges from three to seven business days, depending on size, complexity, document quality, scope and current workload. Rush service may be available for qualifying projects."),
            ("shield", "Reviewed before delivery", "Every estimate is prepared using available documents, your pricing and professional estimating procedures, then reviewed before it reaches you."),
            ("lock", "Everything in one portal", "Upload files, track progress, answer questions, communicate with the team and download completed work."),
        ]),
        cta_band(),
    )
    page("how-it-works.html",
         "How It Works — The Mobi Estimates Process",
         "How Mobi Estimates works: submit your project, we review the scope, complete the takeoff and estimate, run human quality control, deliver via portal and handle revisions.",
         body, active="how")


# ==========================================================================
# ABOUT
# ==========================================================================
def build_about():
    body = page_hero(
        "About Mobi Estimates",
        "Estimating support built for modern contractors",
        "We help construction companies handle more bidding opportunities with a faster, more organized estimating process.",
        [("About", None)]
    ) + '''
<section class="section">
  <div class="container">
    <div class="grid" style="grid-template-columns:1.1fr .9fr;gap:48px;align-items:center">
      <div class="reveal">
        <span class="eyebrow">Our story</span>
        <h2 class="mt-2 mb-3">More bids, without a bigger in-house department</h2>
        <div class="stack" style="color:var(--slate-600)">
          <p>Contractors lose opportunities when they don't have enough time or estimating capacity to review every project. Mobi Estimates was created to help construction companies handle more bidding opportunities with a faster, more organized estimating process.</p>
          <p>We combine estimating technology, standardized workflows, construction cost information, client-specific pricing and human quality control to deliver professional estimates contractors can actually use.</p>
          <p>Our goal is simple: help contractors bid more work, make informed pricing decisions, and operate without the cost and complexity of building a large internal estimating department.</p>
        </div>
      </div>
      <div class="reveal" data-delay="100">
        <div class="card">
          <h3 class="mb-3">What sets us apart</h3>
          %s
        </div>
      </div>
    </div>
  </div>
</section>
<section class="section band-dark">
  <div class="container">
    <div class="center reveal" style="max-width:680px;margin-inline:auto">
      <span class="eyebrow on-dark">A better way to handle estimating</span>
      <h2 class="mt-2">Built around how contractors bid</h2>
    </div>
    <div class="grid cols-3 mt-8">%s</div>
    <p class="muted center mt-6" style="max-width:70ch;margin-inline:auto;font-size:.9rem">As a growing company, we focus on the quality and organization of our work rather than inflated claims. As we build a verified track record, we'll share real figures such as projects estimated, total construction value, turnaround times and repeat-client rates.</p>
  </div>
</section>
%s''' % (
        check_list(["AI-assisted speed with human review", "Construction-focused, trade-by-trade workflow",
                    "Your pricing, markups and templates", "Secure client portal for every project",
                    "Flexible: per-project, overflow or monthly", "Nationwide coverage"]),
        "".join(feature_item(ic, t, d, i * 50) for i, (ic, t, d) in enumerate([
            ("globe", "Nationwide service", "Remote estimating support for contractors across the United States."),
            ("upload", "Fast project intake", "Submit drawings, specs and addenda through one organized portal."),
            ("shield", "Human-reviewed estimates", "Every estimate goes through structured quality control before delivery."),
            ("layers", "Construction-focused workflow", "Organized by trade, scope, deadline, document version and deliverables."),
            ("lock", "Secure client portal", "Upload, track, communicate and download in one place."),
            ("adjust", "Flexible service options", "Per-project, overflow support, or ongoing monthly service."),
        ])),
        cta_band("Let's talk about your bidding pipeline",
                 "Tell us how you bid today and we'll show you how Mobi Estimates can extend your team."),
    )
    page("about.html",
         "About | Mobi Estimates",
         "Mobi Estimates provides remote construction estimating built for modern contractors — combining estimating technology, standardized workflows and human quality control.",
         body, active="about")


# ==========================================================================
# FAQ
# ==========================================================================
FAQS = [
    ("What types of projects do you estimate?", "We support residential, commercial, multifamily, industrial, civil, public, renovation, tenant-improvement and new-construction projects."),
    ("Do you work with both general contractors and subcontractors?", "Yes. We provide full-project estimates for general contractors and trade-specific estimates for subcontractors."),
    ("Do you provide services nationwide?", "Yes. Mobi Estimates provides remote estimating services throughout the United States."),
    ("What documents should I submit?", "Submit all available plans, specifications, addenda, bid forms, project instructions, scope notes, site information, and supplier or subcontractor pricing."),
    ("Can you use my company's pricing?", "Yes. We can use client-provided labor rates, material prices, supplier quotes, production rates, overhead and markup preferences."),
    ("What happens when information is missing?", "Our team will identify missing information and send questions or clarification requests through the client portal."),
    ("Can I request revisions?", "Yes. Revision availability and limits depend on the service or package selected."),
    ("Do you guarantee that I will win the project?", "No. Bid results depend on competition, project conditions, pricing strategy, qualifications, relationships and other factors outside the estimator's control."),
    ("How quickly will I receive my estimate?", "Turnaround depends on project size, complexity, document quality, scope and deadline. Standard turnaround generally ranges from three to seven business days, and rush options may be available for qualifying projects."),
    ("Do you provide engineering or architectural services?", "No. Mobi Estimates provides construction estimating and takeoff services. We do not replace licensed architectural, engineering, legal or other professional services."),
]


def faq_items(items):
    return "".join(
        '''<div class="faq-item reveal"><button class="faq-q" type="button">%s<span class="chev">%s</span></button><div class="faq-a"><div class="inner">%s</div></div></div>'''
        % (q, icon("chevron-down"), a) for q, a in items)


def build_faq():
    body = page_hero(
        "Frequently asked questions",
        "Answers for contractors and construction teams",
        "Everything you need to know about how Mobi Estimates works, what we deliver and how to get started.",
        [("FAQ", None)]
    ) + '''
<section class="section">
  <div class="container" style="max-width:820px">%s</div>
</section>
%s''' % (faq_items(FAQS),
         cta_band("Still have questions?", "Reach out and we'll walk you through scope, turnaround and pricing for your project."))
    page("faq.html",
         "FAQ | Mobi Estimates",
         "Frequently asked questions about Mobi Estimates: project types, turnaround, documents to submit, using your pricing, revisions and what we deliver.",
         body, active="faq")


# ==========================================================================
# Lead form (shared)
# ==========================================================================
def lead_form(form_id, submit_label, submit_icon="upload", compact=False):
    contractor_types = ["General contractor", "Subcontractor", "Home builder", "Remodeler",
                        "Developer", "Construction manager", "Property owner / investor", "Architect", "Other"]
    project_types = ["Residential", "Commercial", "Industrial", "Multifamily", "Retail",
                     "Hospitality", "Healthcare", "Educational", "Government / public",
                     "Tenant improvement", "Renovation / remodel", "New construction", "Civil / site"]
    services = ["Construction cost estimate", "Quantity takeoff", "Bid preparation",
                "Budget / conceptual estimate", "Change-order estimate", "Estimate review / bid comparison",
                "Value engineering", "Monthly estimating support", "Not sure — please advise"]
    heard = ["Search engine", "Referral", "Social media", "Online ad", "Industry association", "Other"]

    def opts(lst):
        return "".join("<option>%s</option>" % o for o in lst)

    return '''<form class="form-card" id="%s" data-demo-form novalidate>
  <div class="form-grid">
    <div class="field"><label>Full name <span class="req">*</span></label><input type="text" name="name" required><span class="err-msg">Please enter your name.</span></div>
    <div class="field"><label>Company name <span class="req">*</span></label><input type="text" name="company" required><span class="err-msg">Please enter your company.</span></div>
    <div class="field"><label>Email <span class="req">*</span></label><input type="email" name="email" required><span class="err-msg">Please enter a valid email.</span></div>
    <div class="field"><label>Phone number <span class="req">*</span></label><input type="tel" name="phone" required><span class="err-msg">Please enter your phone number.</span></div>
    <div class="field"><label>Contractor type</label><select name="contractor_type"><option value="">Select…</option>%s</select></div>
    <div class="field"><label>Service requested</label><select name="service"><option value="">Select…</option>%s</select></div>
    <div class="field"><label>Project name</label><input type="text" name="project_name"></div>
    <div class="field"><label>Project location</label><input type="text" name="project_location" placeholder="City, State"></div>
    <div class="field"><label>Project type</label><select name="project_type"><option value="">Select…</option>%s</select></div>
    <div class="field"><label>Bid due date</label><input type="date" name="bid_due"></div>
    <div class="field"><label>Trades required</label><input type="text" name="trades" placeholder="e.g. concrete, framing, MEP"></div>
    <div class="field"><label>Estimated construction value <span class="hint">(optional)</span></label><input type="text" name="value" placeholder="$"></div>
  </div>
  <div class="field"><label>Project description</label><textarea name="description" placeholder="Tell us about the scope, the bid and anything we should know."></textarea></div>
  <div class="field"><label>Special instructions</label><input type="text" name="instructions"></div>
  <div class="field">
    <label>Upload your project files</label>
    <div class="dropzone"><input type="file" name="files" multiple hidden>
      <div style="display:grid;gap:6px;place-items:center">%s<strong class="dz-label">Drop plans, specs &amp; addenda here, or click to browse</strong><span class="hint">PDF, images, spreadsheets and more</span></div>
    </div>
  </div>
  <div class="form-grid">
    <div class="field"><label>Preferred contact method</label><select name="contact_method"><option>Email</option><option>Phone</option><option>Either</option></select></div>
    <div class="field"><label>How did you hear about us?</label><select name="heard">%s</select></div>
  </div>
  <button type="submit" class="btn btn-primary btn-lg btn-block">%s %s</button>
  <p class="hint center mt-3">By submitting, you agree to our <a href="terms.html" style="color:var(--brand-600)">Terms</a> and <a href="privacy.html" style="color:var(--brand-600)">Privacy Policy</a>.</p>
</form>
<div class="form-success">
  <div class="ok-ic">%s</div>
  <h3>Thank you — your project has been submitted</h3>
  <p class="muted mt-2" style="max-width:52ch;margin-inline:auto">Thank you for submitting your project to Mobi Estimates. Our team will review the information and contact you regarding scope, turnaround, pricing and any additional documents needed.</p>
  <div class="mt-6"><a class="btn btn-outline" href="index.html">Back to home</a></div>
</div>''' % (form_id, opts(contractor_types), opts(services), opts(project_types),
            icon("upload"), opts(heard), icon(submit_icon), submit_label, icon("check"))


def build_upload():
    body = page_hero(
        "Upload a project",
        "Send us your plans and start your estimate",
        "Upload your drawings, specifications, addenda and bid details. We'll review the scope, complete the takeoff, prepare pricing and deliver a bid-ready package.",
        [("Upload a Project", None)]
    ) + '''
<section class="section">
  <div class="container">
    <div class="grid" style="grid-template-columns:.8fr 1.2fr;gap:48px;align-items:start">
      <div class="reveal">
        <span class="eyebrow">What to include</span>
        <h2 class="mt-2 mb-3">The more we have, the better the estimate</h2>
        %s
        <div class="card mt-6" style="background:var(--bg-alt);border:none">
          <div class="flex items-center gap-2 mb-2" style="color:var(--brand-700);font-weight:600">%s Secure &amp; confidential</div>
          <p class="muted" style="font-size:.92rem">Your documents are handled through our secure client portal and used only to prepare your estimate.</p>
        </div>
      </div>
      <div class="reveal" data-delay="80">%s</div>
    </div>
  </div>
</section>''' % (
        check_list(["Plans & drawings", "Specifications", "Addenda", "Bid forms",
                    "Project instructions & scope notes", "Site information",
                    "Supplier or subcontractor pricing", "Your labor rates & markups (optional)"]),
        icon("lock"),
        lead_form("uploadForm", "Upload Your Project", "upload"),
    )
    page("upload-project.html",
         "Upload a Project | Mobi Estimates",
         "Upload your construction plans, specifications and bid details to Mobi Estimates and get a fast, accurate, bid-ready estimate. Secure project intake, nationwide.",
         body, active="services")


def build_request_quote():
    body = page_hero(
        "Request a quote",
        "Request a construction estimate",
        "Tell us about your project and what you need. We'll follow up about scope, turnaround and pricing — and let you know exactly which documents to send.",
        [("Request a Quote", None)]
    ) + '''
<section class="section">
  <div class="container">
    <div class="grid" style="grid-template-columns:.8fr 1.2fr;gap:48px;align-items:start">
      <div class="reveal">
        <span class="eyebrow">Choose your service</span>
        <h2 class="mt-2 mb-3">Per-project, overflow, or ongoing</h2>
        <p class="muted mb-4">Not sure which fits? Select "please advise" on the form and we'll recommend the right option.</p>
        %s
        <div class="mt-6 grid" style="gap:10px">
          %s
        </div>
      </div>
      <div class="reveal" data-delay="80">%s</div>
    </div>
  </div>
</section>''' % (
        check_list(["Per-project estimating for a specific bid", "Overflow support during busy periods",
                    "Ongoing monthly estimating support", "GC full-project or sub trade-specific",
                    "Fast turnaround options available"]),
        btn("Prefer to talk? Book a consultation", "contact.html", "outline", "phone", cls="btn-block"),
        lead_form("quoteForm", "Request a Quote", "calculator"),
    )
    page("request-a-quote.html",
         "Request a Quote | Mobi Estimates",
         "Request a construction estimating quote from Mobi Estimates. Per-project, overflow or monthly support for general contractors and subcontractors, nationwide.",
         body, active="services")


# ==========================================================================
# CONTACT
# ==========================================================================
def build_contact():
    info_cards = "".join([
        '<div class="card reveal"><div class="icon-box">%s</div><h3>Call us</h3><p class="mt-2"><a href="tel:%s" style="color:var(--brand-700);font-weight:600">%s</a></p></div>' % (icon("phone"), PHONE_HREF, PHONE),
        '<div class="card reveal" data-delay="80"><div class="icon-box">%s</div><h3>Email</h3><p class="mt-2"><a href="mailto:%s" style="color:var(--brand-700);font-weight:600">%s</a></p></div>' % (icon("mail"), EMAIL, EMAIL),
        '<div class="card reveal" data-delay="160"><div class="icon-box">%s</div><h3>Service area</h3><p class="mt-2 muted">Remote estimating nationwide, across the United States.</p></div>' % icon("globe"),
        '<div class="card reveal" data-delay="240"><div class="icon-box">%s</div><h3>Hours</h3><p class="mt-2 muted">Monday–Friday, with rush service available for qualifying projects.</p></div>' % icon("clock"),
    ])
    body = page_hero(
        "Contact",
        "Let's talk about your next bid",
        "Book a consultation or send us a message. We'll get back to you about scope, turnaround and pricing.",
        [("Contact", None)]
    ) + '''
<section class="section">
  <div class="container">
    <div class="grid cols-4 mb-6">%s</div>
    <div class="grid" style="grid-template-columns:.8fr 1.2fr;gap:48px;align-items:start">
      <div class="reveal">
        <span class="eyebrow">Book a consultation</span>
        <h2 class="mt-2 mb-3">Two easy ways to start</h2>
        <p class="muted mb-4">Ready to send a project now? Upload your plans and we'll take it from there. Prefer to talk first? Use the form and we'll reach out.</p>
        <div class="grid" style="gap:10px">
          %s
          %s
        </div>
      </div>
      <div class="reveal" data-delay="80">%s</div>
    </div>
  </div>
</section>''' % (
        info_cards,
        btn("Upload Your Project", "upload-project.html", "primary", "upload", cls="btn-block"),
        btn("Request a Quote", "request-a-quote.html", "outline", "calculator", cls="btn-block"),
        lead_form("contactForm", "Book a Consultation", "phone"),
    )
    page("contact.html",
         "Contact | Mobi Estimates",
         "Contact Mobi Estimates to book a consultation or request a construction estimate. Call, email, or send your project details — remote estimating nationwide.",
         body, active="contact")


# ==========================================================================
# CLIENT LOGIN
# ==========================================================================
def build_login():
    body = '''
<section class="section" style="min-height:72vh;display:grid;place-items:center;background:var(--bg-alt)">
  <div class="container" style="max-width:460px">
    <div class="reveal-scale">
      <div class="center mb-4">
        <a class="brand" href="index.html" style="justify-content:center"><img src="assets/img/mobi-logo.png" alt="%s" style="height:40px"></a>
        <h1 style="font-size:1.7rem;margin-top:18px">Client portal login</h1>
        <p class="muted mt-2">Access your estimates, upload files, track progress and message your estimating team.</p>
      </div>
      <form class="form-card" data-demo-form novalidate>
        <div class="field"><label>Email <span class="req">*</span></label><input type="email" name="email" required><span class="err-msg">Please enter a valid email.</span></div>
        <div class="field"><label>Password <span class="req">*</span></label><input type="password" name="password" required><span class="err-msg">Please enter your password.</span></div>
        <div class="flex items-center" style="justify-content:space-between;margin-bottom:18px">
          <label style="display:flex;gap:8px;align-items:center;font-size:.9rem;color:var(--slate-600);font-weight:500"><input type="checkbox" style="width:auto"> Remember me</label>
          <a href="#" style="color:var(--brand-600);font-size:.9rem;font-weight:600">Forgot password?</a>
        </div>
        <button type="submit" class="btn btn-primary btn-lg btn-block">%s Sign in</button>
      </form>
      <div class="form-success">
        <div class="ok-ic">%s</div>
        <h3>Portal coming soon</h3>
        <p class="muted mt-2">The secure client portal is being set up. In the meantime, %s or %s to get started.</p>
      </div>
      <p class="center muted mt-4" style="font-size:.92rem">New client? <a href="request-a-quote.html" style="color:var(--brand-600);font-weight:600">Request an estimate</a> to get started.</p>
    </div>
  </div>
</section>''' % (SITE_NAME, icon("lock"), icon("check"),
                 '<a href="upload-project.html" style="color:var(--brand-600)">upload a project</a>',
                 '<a href="contact.html" style="color:var(--brand-600)">contact us</a>')
    page("login.html",
         "Client Login | Mobi Estimates",
         "Log in to the Mobi Estimates client portal to access your estimates, upload files, track progress and communicate with your estimating team.",
         body)


# ==========================================================================
# LEGAL PAGES
# ==========================================================================
def legal_page(filename, eyebrow, h1, intro, sections, seo_title, seo_desc):
    inner = ""
    for heading, paras in sections:
        inner += "<h2>%s</h2>" % heading
        for p in paras:
            if isinstance(p, list):
                inner += "<ul>" + "".join("<li>%s</li>" % li for li in p) + "</ul>"
            else:
                inner += "<p>%s</p>" % p
    body = page_hero(eyebrow, h1, intro, [(h1, None)]) + '''
<section class="section">
  <div class="container">
    <div class="prose reveal">
      <p class="muted" style="font-size:.9rem">Last updated: June 2026</p>
      %s
      <div class="card mt-8" style="background:var(--bg-alt);border:none">
        <p class="muted" style="margin:0;font-size:.92rem">This page is provided for general informational purposes and does not constitute legal advice. Please consult a qualified professional for advice specific to your situation.</p>
      </div>
    </div>
  </div>
</section>''' % inner
    page(filename, seo_title, seo_desc, body)


def build_legal():
    legal_page(
        "privacy.html", "Legal", "Privacy Policy",
        "How Mobi Estimates collects, uses and protects the information you share with us.",
        [
            ("Information we collect", ["We collect information you provide directly, such as your name, company, email, phone number and the project documents you submit (plans, specifications, addenda, bid forms and related materials).",
                                        "We may also collect limited technical information automatically, such as device and usage data, to operate and improve our website."]),
            ("How we use information", ["We use your information to prepare and deliver estimates, communicate with you about your projects, respond to inquiries, operate our client portal and improve our services.",
                                        ["To prepare quantity takeoffs and estimates", "To communicate about scope, turnaround and pricing", "To provide access to the client portal", "To improve and secure our services"]]),
            ("Project documents", ["Documents you submit are used to prepare your estimate and are handled through our secure client portal. We do not sell your project documents."]),
            ("Sharing", ["We do not sell your personal information. We may share information with service providers who help us operate our business, subject to appropriate confidentiality obligations, or when required by law."]),
            ("Data security", ["We use reasonable administrative, technical and physical safeguards to protect your information. No method of transmission or storage is completely secure, and we cannot guarantee absolute security."]),
            ("Your choices", ["You may request access to, correction of, or deletion of your personal information by contacting us at %s." % EMAIL]),
            ("Contact", ["Questions about this policy? Email us at %s." % EMAIL]),
        ],
        "Privacy Policy | Mobi Estimates",
        "Mobi Estimates privacy policy: how we collect, use, share and protect your information and project documents.",
    )

    legal_page(
        "terms.html", "Legal", "Terms of Service",
        "The terms that govern your use of the Mobi Estimates website and services.",
        [
            ("Acceptance of terms", ["By accessing our website or using our services, you agree to these Terms of Service. If you do not agree, please do not use our website or services."]),
            ("Our services", ["Mobi Estimates provides construction estimating and quantity takeoff services. Estimates are prepared using the documents and information you provide, your pricing where applicable, and professional estimating procedures."]),
            ("Client responsibilities", ["You are responsible for providing accurate, complete and current project documents and information. The quality and completeness of the documents you submit directly affect the resulting estimate.",
                                          ["Provide complete plans, specifications and addenda", "Confirm scope, trades and deadlines", "Respond to clarification requests in a timely manner"]]),
            ("Estimates and bid results", ["Our estimates are tools to support your bidding decisions. We do not guarantee bid awards, project outcomes, or that an estimate will match final constructed costs. Bid results depend on many factors outside our control."]),
            ("Revisions", ["Revision availability and limits depend on the service or package selected and will be described for your specific engagement."]),
            ("Intellectual property", ["Website content is owned by Mobi Estimates or its licensors. Deliverables prepared for you may be used for your project and bidding purposes as agreed."]),
            ("Limitation of liability", ["To the maximum extent permitted by law, Mobi Estimates is not liable for indirect, incidental or consequential damages arising from use of our website, services or deliverables."]),
            ("Changes", ["We may update these terms from time to time. Continued use of our website or services constitutes acceptance of the updated terms."]),
            ("Contact", ["Questions about these terms? Email us at %s." % EMAIL]),
        ],
        "Terms of Service | Mobi Estimates",
        "Mobi Estimates terms of service governing use of our website and construction estimating services.",
    )

    legal_page(
        "disclaimer.html", "Legal", "Estimating Disclaimer",
        "Important information about the nature and limitations of our estimates.",
        [
            ("Nature of our estimates", ["Our estimates are prepared using the available construction documents, project information, client-provided pricing, cost data and professional estimating procedures. Every estimate is reviewed before delivery."]),
            ("No guarantees", ["We do not represent that estimates are 100% accurate, error-free, or guaranteed. We do not guarantee bid wins, the lowest price, or that an estimate will match final actual costs.",
                               ["Estimates depend on the quality and completeness of the documents provided", "Market conditions, pricing and availability change over time", "Final costs depend on factors outside the estimator's control"]]),
            ("Not professional design services", ["Mobi Estimates provides construction estimating and takeoff services only. We do not provide architectural, engineering, legal or other licensed professional services, and our deliverables do not replace work performed by a properly licensed professional."]),
            ("Value engineering", ["Value engineering suggestions identify potential cost-saving options. They are not architectural or engineering design and should be reviewed and approved by the appropriate licensed professionals before implementation."]),
            ("Your responsibility", ["You are responsible for reviewing each estimate, verifying scope and quantities for your specific project, and making your own pricing and bidding decisions."]),
            ("Contact", ["Questions about this disclaimer? Email us at %s." % EMAIL]),
        ],
        "Estimating Disclaimer | Mobi Estimates",
        "Mobi Estimates estimating disclaimer: the nature, scope and limitations of our construction estimates and takeoff deliverables.",
    )


# ==========================================================================
# BUILD ALL
# ==========================================================================
def main():
    build_home()
    build_services()
    build_quantity_takeoffs()
    build_cost_estimating()
    build_gc_estimating()
    build_sub_estimating()
    build_monthly_support()
    build_industries()
    build_how()
    build_about()
    build_faq()
    build_upload()
    build_request_quote()
    build_contact()
    build_login()
    build_legal()
    files = sorted(os.listdir(OUT))
    html_files = [f for f in files if f.endswith(".html")]
    print("Generated %d pages:" % len(html_files))
    for f in html_files:
        print("  -", f)


if __name__ == "__main__":
    main()
