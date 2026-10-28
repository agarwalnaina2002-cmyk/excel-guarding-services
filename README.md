# Excel Guarding Services — website

A static site with no build step: HTML, one stylesheet (`assets/css/site.css`) and one script (`assets/js/site.js`). The script only enhances the pages, so every page still works with JavaScript turned off.

## Preview locally

```bash
node excel-guarding-services/server.js
```

Then open http://localhost:4310. `server.js` is for local preview only. Any static host can serve the site.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Homepage: hero, the brief, People/Process/Oversight, service explorer, officer pathway, contract cycle, due diligence, closing CTA |
| `services.html` | One chapter per service, with anchors `#static`, `#reception`, `#gatehouse`, `#patrols` and `#events` |
| `approach.html` | Selection and training, post instructions, oversight cadence, escalation |
| `contact.html` | Site assessment request form with inline validation |
| `privacy.html` | Draft privacy notice that needs legal review (`noindex`) |
| `404.html` | Not-found page (it uses root-relative paths, so configure your host to serve it) |

## Before launch: information required

Everything marked on the pages with a dashed amber **"to confirm"** tag is a placeholder. Nothing was invented.

1. **Contact details**: phone, email, office address and the regions served.
2. **Licence / registration number**, the regulator and the officer licence types (footer, and `approach.html` step 03).
3. **Service list**: confirm that all five services are offered, and add or remove any that differ.
4. **Operational claims to verify**: the copy describes these practices. Change or remove any that the company does not actually follow:
   - site induction and shadow shifts before an officer works alone
   - written post instructions for every position, approved by the client before deployment
   - supervisor visits, including unannounced ones
   - incident reports written up in the same shift
   - periodic client reviews
   - the five-document due-diligence pack (registration, insurance, officer records, sample formats, references)
   - the four-step escalation chain
5. **Form endpoint**: set `data-endpoint` on the `<form>` in `contact.html` to a form handler (for example, your CRM, Formspree or a serverless function). Until you do, the form validates but tells the user that nothing was sent.
6. **Privacy notice**: the registered company details, the retention period and a privacy contact, checked by someone qualified.
7. **Domain**: add `<link rel="canonical">` to each page, add a `sitemap.xml`, and add the `Sitemap:` line to `robots.txt`. Add Organization / LocalBusiness JSON-LD once the address and phone are confirmed.

## Photography

The current images are real photographs from Unsplash, used under the free Unsplash License (no premium images are used). They are hotlinked through the Unsplash CDN with responsive sizes. Before launch:

- **Replace them with commissioned photographs of Excel's own officers, uniforms and sites wherever possible.** Stock images of other companies' guards can imply staff or sites that aren't yours. Several images show "SECURITY" vests and US street details.
- If any stock images stay, download them and self-host them as WebP/AVIF in `assets/img/` rather than hotlinking.

Photo IDs in use (`images.unsplash.com/photo-…`):

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
- **Motifs**: thin rules, corner registration marks on photographs, mono indices. There are no dashboards, glows or surveillance-style interfaces.
- **Motion**: reveals are per section only. A rule draws in on each officer-pathway step and photos cross-fade. Everything is disabled under `prefers-reduced-motion`, and there is no scroll hijacking.
