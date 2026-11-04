# Waypoint Group – kopia för redesign

Statisk HTML/CSS/JS-kopia av https://moagefvert.wixsite.com/my-site-1.
GTM-koden ligger först i `<head>` på alla sidor.

## Spårning
`main.js` pushar events till `dataLayer`:

| Event | Trigger | Data |
|---|---|---|
| `nav_click`, `cta_click`, `read_more_click`, `phone_click`, `email_click`, `social_click`, `logo_click`, `menu_toggle` | klick på element med `data-track` | `element_id`, `element_text`, `link_url`, `page_path` |
| `form_start` | första fokus i ett formulär | `form_id`, `form_name` |
| `form_submit` | giltigt skickat formulär | `form_id`, `form_name`, `form_service`, `page_path` |

### Formulär-ID:n
- `form-boka-mote-teambuilding` (teambuilding-resor.html)
- `form-boka-mote-foretagsevent` (foretagsevent.html)
- `form-boka-foretagsresa` (foretagsresa-paket.html)
- `form-kontakt` (kontakta-oss.html)

Alla fält har ID:n på formen `<form-id>-<fält>` och skicka-knappen `<form-id>-submit`.
Alla klickbara länkar/knappar har unika ID:n, t.ex. `hero-cta-boka-mote`, `nav-om-oss`, `home-service-foretagsevent-readmore`, `footer-phone`.

## Cookie-banner & Consent Mode v2
- Före GTM på varje sida sätts `gtag('consent','default', …)`: `analytics_storage`, `ad_storage`, `ad_user_data` och `ad_personalization` = `denied`.
- Ett sparat val (`localStorage` → `wp_cookie_consent`) appliceras med `consent update` innan GTM laddas.
- Bannern (`consent.js`) har kategorierna Statistik (→ `analytics_storage`) och Marknadsföring (→ `ad_*`).
- Event `cookie_consent_update` pushas med `consent_method` (`accept_all` / `reject_all` / `custom`), `consent_statistik` och `consent_marknadsforing`.
- ID:n: `cookie-banner`, `cookie-accept-all`, `cookie-reject-all`, `cookie-customize`, `cookie-save`, `cookie-opt-statistik`, `cookie-opt-marknadsforing`, `footer-cookie-settings`.
