# Excel Guarding Services — website

A static site with no build step: HTML, two stylesheets (`assets/css/site.css`, then `assets/css/extra.css` for the group pages) and one script (`assets/js/site.js`). The script only enhances the pages, so every page works with JavaScript turned off.

## Preview locally

```bash
node excel-guarding-services/server.js
```

Then open http://localhost:4310. `server.js` is for local preview only and mirrors Vercel's clean URLs (`/about` serves `about.html`).

## Pages

| File | URL | Purpose |
| --- | --- | --- |
| `index.html` | `/` | Homepage: hero, brief, People/Process/Oversight, service explorer, three businesses, officer pathway, contract cycle, leadership and associations, credentials teaser, closing CTA |
| `services.html` | `/services` | Five service chapters (`#static`, `#reception`, `#gatehouse`, `#patrols`, `#events`) and the full list under `#more` |
| `equipment.html` | `/equipment` | Excel Security Equipments Pvt Ltd: strengths, five-category catalogue, quotation CTA |
| `academy.html` | `/academy` | Excel Academy of Security Training (EAST): course, provisions, syllabus, admissions |
| `about.html` | `/about` | Overview, mission and vision, Excel Group, Why EGS, `#management`, `#associations` |
| `approach.html` | `/approach` | Selection and training, post instructions, oversight, escalation |
| `credentials.html` | `/credentials` | Compliance practices with evidence slots, registrations, document pack |
| `gallery.html` | `/gallery` | Labelled photo slots (`noindex` until real photos are added) |
| `contact.html` | `/contact` | Three companies' details and the enquiry form. `?topic=guarding\|equipment\|academy\|careers\|other` pre-selects "What is this about?" |
| `privacy.html` | `/privacy` | Draft privacy notice for legal review (`noindex`) |
| `404.html` | — | Not-found page |

`vercel.json` turns on clean URLs, adds basic security headers, and redirects the old site's page names (`/who-we-are.html` and so on) to the new pages.

## Before launch

Every dashed amber **"to confirm"** tag on the pages is a placeholder. Search the HTML for `class="tbc"` to find them all. Nothing in those tags should go live as it is.

1. **Form endpoint**: set `data-endpoint` on the `<form>` in `contact.html` (there is a comment above it) to a form service URL, such as Formspree, Basin or your CRM. Until you do, the form validates but tells visitors that nothing was sent.
2. **Domain**: every page's `<link rel="canonical">` and `og:url`, `sitemap.xml` and `robots.txt` use `https://excel-guarding-services.vercel.app`. If you move to `excelguardingservices.com`, find and replace that origin across the files.
3. **Photos**: the gallery, management portraits, academy and About hero have empty slots for EGS's own photos. Self-host them in `assets/img/` and get consent from everyone pictured. The remaining Unsplash stock photos (listed below) should be replaced too.
4. **Jammers**: these are deliberately left off `equipment.html` (see the comment there). Don't add them without legal advice.

## Stock photo IDs still in use (`images.unsplash.com/photo-…`)

| Where | ID |
| --- | --- |
| Hero, lobby officer | `1485230405346-71acb9518d9c` |
| Static guarding | `1680714246510-94d1055e4a8b` |
| Reception | `1785123379745-c160d941859f` |
| Gatehouse booth | `1765741836920-421cb507d7c1` |
| Patrols | `1609193084914-8c454697fe90` |
| Events | `1760228604788-db8a36d5c1a3` |
| People portrait | `1759366035053-4b172d9b299d` |
| Process, log sheet | `1523705480679-b5d0cc17a656` |
| Oversight, two officers | `1770529933902-d2f7851be31c` |
| Closing, offices at night | `1642286230565-3489d1766b6f` |
| Services hero, gatehouse in snow | `1732442719317-6d9c348245dd` |
| Approach hero, night path | `1734635701461-0879f73e1c9a` |

## Design system (summary)

- **Palette**: ink `#0c0d0e`, bone `#ece8e1`, paper `#e8e4dc` for light sections, and one signal colour, sodium-lamp amber `#e3a33d`.
- **Type**: Inter Tight (display and body), Instrument Serif italic (accent phrases only), JetBrains Mono (small index labels).
- **Motifs**: thin rules, corner registration marks on photographs and photo slots, mono indices.
- **Motion**: reveals are per section only, and everything is disabled under `prefers-reduced-motion`.
- **Header**: the inline nav shows from 1181px; below that, the menu button opens the full-screen menu.
