#!/usr/bin/env python3
"""Static site generator for the Mobi Estimates website.

Assembles fully-static HTML pages from shared templates so the header,
footer and <head> stay consistent across all pages. Output is plain HTML +
assets (no runtime framework). Run: python3 build.py
"""
import os

OUT = os.path.dirname(os.path.abspath(__file__))
SITE_NAME = "Mobi Estimates"
PHONE = "(800) 555-0142"
PHONE_HREF = "+18005550142"
EMAIL = "estimates@mobiestimates.com"
ASSET_VER = "2"  # bump to bust browser cache when CSS/JS change

# --------------------------------------------------------------------------
# Icons (Heroicons-style, 24x24 outline). Stored as inner markup.
# --------------------------------------------------------------------------
ICONS = {
    "calculator": '<rect x="4" y="2.75" width="16" height="18.5" rx="2.5"/><path d="M8 7h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15v3.5M8 18.5h4"/>',
    "ruler": '<path d="M3.5 8.5l5-5 12 12-5 5z"/><path d="M7 8l1.5 1.5M9.5 5.5L11 7M12 11l1.5 1.5M14.5 8.5L16 10"/>',
    "clipboard-check": '<path d="M9 4.5h6M9 4.5a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0115 4.5M9 4.5H7.5A1.5 1.5 0 006 6v13.5A1.5 1.5 0 007.5 21h9a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H15"/><path d="M9.5 13.5l2 2 3.5-4"/>',
    "doc-search": '<path d="M13.5 3.5H7A1.5 1.5 0 005.5 5v14A1.5 1.5 0 007 20.5h10A1.5 1.5 0 0018.5 19V8.5z"/><path d="M13.5 3.5V8.5h5"/><circle cx="11" cy="13" r="2.2"/><path d="M12.6 14.6L14.5 16.5"/>',
    "layers": '<path d="M12 3.5l8.5 4.5L12 12.5 3.5 8z"/><path d="M3.5 12l8.5 4.5L20.5 12M3.5 16l8.5 4.5L20.5 16"/>',
    "scale": '<path d="M12 3.5v17M7 6.5h10M5 7l-2.5 6h5zM19 7l-2.5 6h5z"/><path d="M2.5 13a2.5 2.5 0 005 0M16.5 13a2.5 2.5 0 005 0M8 20.5h8"/>',
    "adjust": '<path d="M5 7h9M18 7h1M5 12h1M10 12h9M5 17h6M15 17h4"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="12" r="2"/><circle cx="13" cy="17" r="2"/>',
    "refresh": '<path d="M4.5 9a7.5 7.5 0 0112.8-3.3L20 8M20 4.5V8h-3.5"/><path d="M19.5 15a7.5 7.5 0 01-12.8 3.3L4 16M4 19.5V16h3.5"/>',
    "list-check": '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 5.5l1 1 1.5-2M4 11.5l1 1 1.5-2M4 17.5l1 1 1.5-2"/>',
    "handshake": '<path d="M3 10.5l3-3 4 1 2-1.5 2 1.5 4-1 3 3"/><path d="M6 7.5V15a2 2 0 002 2l1.5-1.5 1.5 1.5 1.5-1.5 1.5 1.5a2 2 0 002-2V7.5"/><path d="M9.5 13l1.5 1.5"/>',
    "users": '<circle cx="9" cy="8" r="3"/><path d="M3.5 19a5.5 5.5 0 0111 0M16 6.5a2.8 2.8 0 010 5.5M16.5 14.5a5.5 5.5 0 014 4.5"/>',
    "bolt": '<path d="M13 2.5L4.5 13.5H11l-1 8 8.5-11H12z"/>',
    "shield": '<path d="M12 3l7.5 3v5.5c0 4.5-3 7.8-7.5 9.5C7.5 18.3 4.5 15 4.5 10.5V6z"/><path d="M9 11.5l2 2 3.5-4"/>',
    "clock": '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    "building": '<path d="M4.5 21V5a1.5 1.5 0 011.5-1.5h7A1.5 1.5 0 0114.5 5v16M14.5 9h3.5A1.5 1.5 0 0119.5 10.5V21M3 21h18"/><path d="M7.5 7h3.5M7.5 11h3.5M7.5 15h3.5"/>',
    "building2": '<path d="M3 21h18M5 21V4.5h9V21M14 21V9h5v12"/><path d="M8 8h3M8 12h3M8 16h3M16 12h1M16 16h1"/>',
    "home": '<path d="M3.5 11.5L12 4l8.5 7.5"/><path d="M5.5 10v10.5h13V10"/><path d="M9.5 20.5V14h5v6.5"/>',
    "truck": '<path d="M2.5 6.5h11v9h-11z"/><path d="M13.5 9.5h4l3 3v3h-7z"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    "wrench": '<path d="M14.5 6.5a3.5 3.5 0 01-4.6 4.6l-5.4 5.4a2 2 0 002.8 2.8l5.4-5.4a3.5 3.5 0 014.6-4.6l-2.3 2.3-2-2z"/>',
    "cube": '<path d="M12 2.8l8 4.4v9.6l-8 4.4-8-4.4V7.2z"/><path d="M4 7.2l8 4.4 8-4.4M12 21.2v-9.6"/>',
    "fire": '<path d="M12 3s4.5 3.5 4.5 8a4.5 4.5 0 01-9 0c0-1.5.7-2.7.7-2.7S9 11 10 11c0-3 2-5 2-8z"/>',
    "store": '<path d="M4 9.5L5 4.5h14l1 5M4 9.5h16M4 9.5v10.5h16V9.5"/><path d="M4 9.5a2.2 2.2 0 004 0 2.2 2.2 0 004 0 2.2 2.2 0 004 0 2.2 2.2 0 004 0M9 20v-5h6v5"/>',
    "bed": '<path d="M3 7v12M3 11h13a4 4 0 014 4v4M3 19h18M3 14h18"/><circle cx="7" cy="9.5" r="1.5"/>',
    "cross": '<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M12 8v8M8 12h8"/>',
    "cap": '<path d="M12 4L2.5 8.5 12 13l9.5-4.5z"/><path d="M6 10.5V15c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5M21.5 8.5V13"/>',
    "flag": '<path d="M5 21V4M5 4h11l-2 3 2 3H5"/>',
    "hammer": '<path d="M14 6l4 4M16 4l4 4-2 2-4-4z"/><path d="M14.5 9.5L6 18a2 2 0 11-2-2l8.5-8.5"/>',
    "upload": '<path d="M12 15.5V4.5M8 8l4-4 4 4"/><path d="M4.5 14v4A1.5 1.5 0 006 19.5h12a1.5 1.5 0 001.5-1.5v-4"/>',
    "phone": '<path d="M4.5 5.5c0 8 6 14 14 14l1.5-3-4-2-1.5 1.5a11 11 0 01-4.5-4.5L11.5 9.5l-2-4z"/>',
    "mail": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6 8.5-6"/>',
    "pin": '<path d="M12 21s6-5.3 6-10.5A6 6 0 006 10.5C6 15.7 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.2"/>',
    "lock": '<rect x="4.5" y="10" width="15" height="10.5" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/><circle cx="12" cy="15" r="1.3"/>',
    "chart": '<path d="M4 4v16h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>',
    "sparkles": '<path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/><path d="M18.5 14.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>',
    "check": '<path d="M5 12.5l4.5 4.5L19 7"/>',
    "check-circle": '<circle cx="12" cy="12" r="8.5"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/>',
    "arrow-right": '<path d="M5 12h14M13 6l6 6-6 6"/>',
    "arrow-ur": '<path d="M7 17L17 7M9 7h8v8"/>',
    "chevron-down": '<path d="M6 9l6 6 6-6"/>',
    "menu": '<path d="M4 7h16M4 12h16M4 17h16"/>',
    "x": '<path d="M6 6l12 12M18 6L6 18"/>',
    "dollar": '<circle cx="12" cy="12" r="8.5"/><path d="M14.5 9c-.5-1-1.5-1.5-2.5-1.5-1.4 0-2.5.8-2.5 2s1 1.6 2.5 2 2.5 1 2.5 2.2-1.1 2-2.5 2c-1.2 0-2.2-.6-2.6-1.6M12 6v1.5M12 16.5V18"/>',
    "briefcase": '<rect x="3" y="7.5" width="18" height="12" rx="2"/><path d="M8.5 7.5V6a2 2 0 012-2h3a2 2 0 012 2v1.5M3 12.5h18"/>',
    "beaker": '<path d="M9 3.5h6M10 3.5v6L5.5 18a2 2 0 001.8 3h9.4a2 2 0 001.8-3L14 9.5v-6"/><path d="M7.5 14h9"/>',
    "globe": '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.4 2.5 14.6 0 17M12 3.5c-2.5 2.4-2.5 14.6 0 17"/>',
    "doc-text": '<path d="M13.5 3.5H7A1.5 1.5 0 005.5 5v14A1.5 1.5 0 007 20.5h10A1.5 1.5 0 0018.5 19V8.5z"/><path d="M13.5 3.5V8.5h5M8.5 12.5h7M8.5 16h5"/>',
    "puzzle": '<path d="M9 4.5a1.5 1.5 0 013 0c0 .8 1 1 1.5 1H16v2.5c0 .5.2 1.5 1 1.5a1.5 1.5 0 010 3c-.8 0-1 1-1 1.5V19h-3c-.5 0-1.5.2-1.5 1a1.5 1.5 0 01-3 0c0-.8-1-1-1.5-1H4v-3.5c0-.5-.2-1.5-1-1.5"/>',
}


def icon(name, cls=""):
    inner = ICONS.get(name, "")
    c = ' class="%s"' % cls if cls else ""
    return ('<svg%s viewBox="0 0 24 24" fill="none" stroke="currentColor" '
            'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" '
            'aria-hidden="true">%s</svg>') % (c, inner)


# --------------------------------------------------------------------------
# Navigation model
# --------------------------------------------------------------------------
SERVICES_MENU = [
    ("quantity-takeoffs.html", "doc-search", "Quantity Takeoffs", "Measured quantities from your drawings"),
    ("construction-cost-estimating.html", "calculator", "Construction Cost Estimating", "Labor, material, equipment & sub costs"),
    ("general-contractor-estimating.html", "building2", "GC Estimating", "Full-project, multi-trade estimates"),
    ("subcontractor-estimating.html", "wrench", "Subcontractor Estimating", "Trade-specific takeoffs & pricing"),
    ("monthly-estimating-support.html", "refresh", "Monthly Estimating Support", "Reserved, ongoing capacity"),
    ("services.html", "layers", "All Services", "Browse the full service list"),
]

NAV = [
    ("index.html", "Home", "home"),
    ("services.html", "Services", "services"),  # has dropdown
    ("industries.html", "Industries", "industries"),
    ("how-it-works.html", "How It Works", "how"),
    ("about.html", "About", "about"),
    ("faq.html", "FAQ", "faq"),
    ("contact.html", "Contact", "contact"),
]


def header(active=""):
    links = []
    for href, label, key in NAV:
        if key == "services":
            menu_items = "".join(
                '<a class="menu-item" href="%s"><span class="mi-ic">%s</span>'
                '<span><strong>%s</strong><span>%s</span></span></a>'
                % (h, icon(ic), t, d) for h, ic, t, d in SERVICES_MENU
            )
            links.append(
                '<div class="has-menu">'
                '<a class="nav-link %s" href="%s">Services %s</a>'
                '<div class="menu-panel">%s</div></div>'
                % ("active" if active == key else "", href,
                   icon("chevron-down", "inline-chev"), menu_items)
            )
        else:
            links.append('<a class="nav-link %s" href="%s">%s</a>'
                         % ("active" if active == key else "", href, label))
    nav_links = "".join(links)

    # mobile drawer links
    m_services = "".join('<a class="m-link" href="%s">%s</a>' % (h, t)
                         for h, ic, t, d in SERVICES_MENU)
    m_main = "".join('<a class="m-link %s" href="%s">%s</a>'
                     % ("active" if active == key else "", href, label)
                     for href, label, key in NAV if key != "services")

    return '''<header class="site-header">
  <div class="container nav">
    <a class="brand" href="index.html" aria-label="%s home">
      <img src="assets/img/mobi-logo.png" alt="%s" width="180" height="72" fetchpriority="high">
    </a>
    <nav class="nav-links hide-mobile" aria-label="Primary">%s</nav>
    <div class="nav-actions">
      <a class="btn btn-outline hide-mobile" href="login.html">%s Client Login</a>
      <a class="btn btn-primary" href="request-a-quote.html">Request an Estimate</a>
      <button class="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobileDrawer">%s</button>
    </div>
  </div>
  <div class="mobile-drawer" id="mobileDrawer">
    <div class="scrim"></div>
    <div class="panel">
      <div class="flex items-center" style="justify-content:space-between;margin-bottom:8px">
        <img src="assets/img/mobi-logo.png" alt="%s" style="height:30px">
      </div>
      %s
      <div class="m-section">Services</div>
      %s
      <div style="margin-top:auto;padding-top:18px;display:grid;gap:10px">
        <a class="btn btn-outline btn-block" href="login.html">Client Login</a>
        <a class="btn btn-primary btn-block" href="request-a-quote.html">Request an Estimate</a>
      </div>
    </div>
  </div>
</header>''' % (SITE_NAME, SITE_NAME, nav_links, icon("lock"), icon("menu"),
                SITE_NAME, m_main, m_services)


def footer():
    services_links = "".join('<a href="%s">%s</a><br>' % (h, t)
                             for h, ic, t, d in SERVICES_MENU[:-1])
    return '''<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-logo"><img src="assets/img/mobi-logo.png" alt="%s"></div>
        <p style="color:#9fb1cc;max-width:34ch;font-size:.94rem;line-height:1.7">
          Your estimating department, on demand. Remote construction estimating and quantity takeoffs for contractors across the United States.</p>
        <div style="margin-top:18px;display:grid;gap:8px;font-size:.92rem">
          <a href="tel:%s" style="display:flex;gap:9px;align-items:center">%s %s</a>
          <a href="mailto:%s" style="display:flex;gap:9px;align-items:center">%s %s</a>
          <span style="display:flex;gap:9px;align-items:center;color:#9fb1cc">%s Serving the United States, nationwide</span>
        </div>
      </div>
      <div>
        <h4>Services</h4>
        %s
      </div>
      <div>
        <h4>Company</h4>
        <a href="about.html">About</a><br>
        <a href="how-it-works.html">How It Works</a><br>
        <a href="industries.html">Industries</a><br>
        <a href="faq.html">FAQ</a><br>
        <a href="contact.html">Contact</a><br>
        <a href="login.html">Client Login</a>
      </div>
      <div>
        <h4>Get Started</h4>
        <a href="request-a-quote.html">Request a Quote</a><br>
        <a href="upload-project.html">Upload a Project</a><br>
        <a href="contact.html">Book a Consultation</a>
        <div style="margin-top:18px">
          <a class="btn btn-primary btn-block" href="upload-project.html">%s Upload Your Project</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; <span id="year">2026</span> %s. All rights reserved.</span>
      <span style="display:flex;gap:18px;flex-wrap:wrap">
        <a href="privacy.html">Privacy Policy</a>
        <a href="terms.html">Terms of Service</a>
        <a href="disclaimer.html">Estimating Disclaimer</a>
      </span>
    </div>
  </div>
</footer>''' % (SITE_NAME, PHONE_HREF, icon("phone"), PHONE, EMAIL, icon("mail"),
                EMAIL, icon("pin"), services_links, icon("upload"), SITE_NAME)


def page(filename, title, description, body, active="", extra_head=""):
    html = '''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>%s</title>
<meta name="description" content="%s">
<meta property="og:title" content="%s">
<meta property="og:description" content="%s">
<meta property="og:type" content="website">
<link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicon-32.png">
<link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/styles.css?v=%s">
%s
</head>
<body>
%s
<main id="main">
%s
</main>
%s
<script src="assets/js/site.js?v=%s" defer></script>
</body>
</html>''' % (title, description, title, description, ASSET_VER, extra_head,
              header(active), body, footer(), ASSET_VER)
    path = os.path.join(OUT, filename)
    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    return filename


# --------------------------------------------------------------------------
# Reusable content components
# --------------------------------------------------------------------------
def btn(label, href, kind="primary", ic=None, size="", cls=""):
    icon_html = (" " + icon(ic)) if ic else ""
    sz = " btn-" + size if size else ""
    lead_icon = icon(ic) + " " if ic else ""
    return '<a class="btn btn-%s%s %s" href="%s">%s%s</a>' % (
        kind, sz, cls, href, lead_icon, label)


def service_card(href, ic, title, desc, delay=0):
    return '''<a class="card card-hover reveal" data-delay="%d" href="%s" style="display:block">
  <div class="icon-box">%s</div>
  <h3>%s</h3>
  <p>%s</p>
  <span class="tag" style="margin-top:16px">Learn more %s</span>
</a>''' % (delay, href, icon(ic), title, desc, icon("arrow-ur"))


def feature_item(ic, title, desc, delay=0):
    return '''<div class="feature reveal" data-delay="%d">
  <div class="fi">%s</div>
  <div><h3>%s</h3><p>%s</p></div>
</div>''' % (delay, icon(ic), title, desc)


def check_list(items, cls=""):
    lis = "".join('<li>%s<span>%s</span></li>' % (icon("check-circle"), i) for i in items)
    return '<ul class="check-list %s">%s</ul>' % (cls, lis)


def cta_band(heading="Ready to bid more work?", sub="Send us your plans and we'll handle the takeoff, pricing, review and bid-ready package."):
    return '''<section class="section">
  <div class="container">
    <div class="cta-band reveal">
      <div class="blueprint"></div>
      <div style="position:relative;max-width:640px">
        <span class="eyebrow on-dark">Get started</span>
        <h2 style="margin-top:14px">%s</h2>
        <p class="lead" style="color:#cdddf7;margin-top:14px">%s</p>
        <div class="flex gap-3 wrap" style="margin-top:26px">
          %s
          %s
        </div>
      </div>
    </div>
  </div>
</section>''' % (heading, sub,
                 btn("Upload Your Project", "upload-project.html", "primary", "upload"),
                 btn("Book a Consultation", "contact.html", "ghost"))


def page_hero(eyebrow, title, subtitle, crumbs):
    crumb_html = '<a href="index.html">Home</a>'
    for label, href in crumbs:
        if href:
            crumb_html += '<span class="sep">/</span><a href="%s">%s</a>' % (href, label)
        else:
            crumb_html += '<span class="sep">/</span><span>%s</span>' % label
    return '''<section class="page-hero">
  <div class="blueprint"></div><div class="glow"></div>
  <div class="container" style="padding-block:clamp(48px,7vw,86px)">
    <div class="breadcrumb reveal">%s</div>
    <span class="eyebrow on-dark reveal">%s</span>
    <h1 class="reveal" data-delay="60" style="margin-top:16px;max-width:18ch">%s</h1>
    <p class="lead reveal" data-delay="120" style="color:#cdddf7;margin-top:18px;max-width:60ch">%s</p>
  </div>
</section>''' % (crumb_html, eyebrow, title, subtitle)
