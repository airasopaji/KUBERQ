# KuberQ Merchant Web Application — Complete Full-Stack Audit & QA Report

- **Live Website Inspected:** https://kuberq.onrender.com/merchant
- **Local Source & Verification Server:** `D:\Business excel file\KuberQ` & `D:\Business excel file\KuberQ-Deploy` (`http://localhost:4500/merchant`)
- **Audit & Fix Date:** November 17, 2026
- **Auditor Role:** Senior Full-Stack Developer & QA Engineer

---

## 1. Executive Summary & Root Cause of the Merchant Loading / Sign-In Failure

### 1.1 Why `/merchant` Got Stuck on `"Merchant ERP Sign-In Required"` / `"Loading taking longer than usual"`
Our full-stack inspection of both the live Render deployment (`https://kuberq.onrender.com/merchant`) and local codebase (`server.js`, `public/app.js`, `public/index.html`, `public/styles.css`) uncovered **two compounding root causes**:

1. **CRITICAL HTTP Cache Poisoning on `GET /api/bootstrap` (`BUG-01`):**
   - When a user first visits `/merchant` unauthenticated, `bootstrap()` in `public/app.js` sends an unauthenticated `GET /api/bootstrap` request.
   - `server.js` (lines 1929 and 2047) returned `Cache-Control: public, max-age=300` **without** `Vary: Authorization`, and `apiFetch()` in `public/app.js` (line 254) did not specify `cache: 'no-store'`.
   - When the user clicked **"🏪 Demo Retailer (Marwar)"**, **"🏭 Demo Wholesaler (Surya)"**, or signed in with password, `POST /api/auth/demo-login` succeeded (`200 OK`) and saved the JWT token to `localStorage`, then called `await bootstrap()`.
   - Because the browser had cached `GET /api/bootstrap` with `max-age=300`, the browser served the **stale unauthenticated response (`user: null`) from disk cache** for 5 full minutes, overwriting `state.data.user` back to `null` and trapping the user on the `"Merchant ERP Sign-In Required"` screen (as seen in the user's screenshot)!
   - **Fix Applied:** Changed `/api/bootstrap` response headers in `server.js` to `Cache-Control: private, no-cache, no-store, must-revalidate`, `Pragma: no-cache`, and `Vary: Authorization`; added `catalogCache.invalidatePattern('^bootstrap:')` inside `saveDb()`; and added `cache: 'no-store'` to `apiFetch()` in `public/app.js`.

2. **Render Cold-Start & Render-Blocking Google Fonts on `#kuberq-splash` (`BUG-02`):**
   - `public/index.html` loaded `<link href="https://fonts.googleapis.com/..." rel="stylesheet" />` synchronously in `<head>`, which can block initial rendering and script execution on slow connections or during Render free-tier cold starts (`>5s`), triggering the `#splash-fallback-card` (`"⚠️ Loading taking longer than usual..."`).
   - Additionally, `window.__dismissKuberqSplash()` used a 450ms CSS fade-out delay during which the splash logo briefly bled behind the sign-in card.
   - **Fix Applied:** Made Google Fonts non-render-blocking (`media="print" onload="this.media='all'"` with `<noscript>` fallback), bumped cache-busting query strings (`?v=20261117_v17`), and updated `window.__dismissKuberqSplash()` to remove `#kuberq-splash` immediately upon SPA mount.

---

## 2. Feature-Wise QA Status Matrix (`PASS` / `FAIL` / `BLOCKED`)

| # | Module / Feature | Initial Audit Status | Post-Fix Local Status (`localhost:4500`) | Live Render Status (`kuberq.onrender.com`) | Notes & Evidence |
|---|---|---|---|---|---|
| 1 | **Splash Screen & Initial Load (`/merchant`)** | `FAIL` (Watermark bleed / 5s fallback) | **`PASS`** | `BLOCKED` (Needs Render redeploy) | Non-blocking fonts + instant DOM removal on mount. |
| 2 | **1-Click Demo Login (`Marwar` & `Surya`)** | `FAIL` (Trapped on Sign-In screen for 5m) | **`PASS`** | `BLOCKED` (Needs Render redeploy) | Fixed `/api/bootstrap` `no-store` headers + `apiFetch` `cache: 'no-store'`. Enters ERP on 1st click. |
| 3 | **Password Sign-In, Registration & Forgot Password OTP** | `FAIL` (Same `/api/bootstrap` cache trap) | **`PASS`** | `BLOCKED` (Needs Render redeploy) | Tested mobile/email login, signup, and 2-step OTP password reset. Also fixed `state.token` assignment in `handleAdminDirectLogin`. |
| 4 | **POS Counter (`Retail POS Counter Desk`)** | `PARTIAL` (Mismatched product photos, empty-state `openProductModal` crash) | **`PASS`** | `BLOCKED` (Needs Render redeploy) | Replaced broken Unsplash bookshelf/flower URLs with zero-latency SVG product illustrations; fixed `PRODUCT_PLACEHOLDER_SVG` single-quote `SyntaxError`; aliased `openProductModal`. |
| 5 | **Queue Board (`Live Counter Queue`)** | `FAIL` (`ReferenceError: api is not defined`) | **`PASS`** | `BLOCKED` (Needs Render redeploy) | Replaced undefined `api(...)` call in `updateOrderStatusFromQueue` with `apiFetch(...)`. |
| 6 | **Sales Return & Credit Notes** | `PASS` | **`PASS`** | `PASS` | Invoice lookup, item tick, qty back, shelf restock, and refund preview verified. |
| 7 | **Expiry & Batches (`FEFO Logic`)** | `FAIL` (Broken regex `.replace(/s/g, '_')`, stray duplicate HTML buttons, undefined `openSupplierReturnModal`) | **`PASS`** | `BLOCKED` (Needs Render redeploy) | Fixed `.replace(/\s+/g, '_')` regex, removed stray duplicate `GOOD`/`FINISHED` buttons, implemented `openSupplierReturnModal` & `openProductModal`. |
| 8 | **Shifts & Cash Drawer (`Z-Reports`)** | `PASS` | **`PASS`** | `PASS` | Shift open, cash in/out, blind drawer count, and Z-Report modal verified. |
| 9 | **Suppliers & Inward Stock (`Receive Stock`)** | `PASS` | **`PASS`** | `PASS` | Add/edit supplier, receive inward stock, and purchase history verified. |
| 10 | **Executive Dashboard (`KPIs & 6M Charts`)** | `PARTIAL` (Right-side KPI card clipping at 1280px, P&L mismatch) | **`PASS`** | `BLOCKED` (Needs Render redeploy) | Fixed `.exec-kpi-grid` (`minmax(0, 1fr)`), repaired `KQ-2627-0001` totals in `loadDb()`, unified `Net Operating Profit` (`₹2,687`). |
| 11 | **Customers CRM Directory** | `FAIL` (`"🧾 Create Bill"` set invalid tab `'InvoiceBuilder'`, resetting to Dashboard) | **`PASS`** | `BLOCKED` (Needs Render redeploy) | Fixed `prefillInvoiceFromCustomer` & `saveCustomerModalForm` to navigate to `'Billing'` with buyer details pre-filled. |
| 12 | **Orders & Parchi (`Online QR & WhatsApp`)** | `PASS` | **`PASS`** | `PASS` | Order review modal, status updates, WhatsApp bill share, and smart Hinglish parchi matching verified. |
| 13 | **Invoice Builder (`5-Sec GST/IGST Billing & Quotations`)** | `PASS` | **`PASS`** | `PASS` | Intra-state CGST+SGST, Inter-state IGST auto-switch (`24...` GSTIN), A4 & 3-inch thermal print preview verified. |
| 14 | **Products & Stock (`Inventory` & Bulk CSV Upload)** | `FAIL` (`POST /api/merchant/inventory` returned `404` on Bulk CSV review submit) | **`PASS`** | `BLOCKED` (Needs Render redeploy) | Added `/api/merchant/inventory` route alias in `server.js` and removed duplicate `+` prefix on Add Product button. |
| 15 | **CRM Pipeline (`6-Stage Kanban`)** | `PASS` | **`PASS`** | `PASS` | Kanban stage cards, New Deal modal, and pipeline valuation verified. |
| 16 | **Tasks & Reminders** | `PASS` | **`PASS`** | `PASS` | Priority filters, status filters, and Add Task modal verified. |
| 17 | **Manufacturing (`Raw Materials`, `Job-Work SAC 9988`, `Production Batches`)** | `FAIL` (Opened blank due to `mfgSubTab: 'raw_materials'`, field name mismatches between `app.js` and `server.js`) | **`PASS`** | `BLOCKED` (Needs Render redeploy) | Initialized `mfgSubTab: 'raw'`; aligned `materialName`/`name`, `materialDesc`/`inputMaterial`, `processCharges`/`totalJobCharges`, `laborPowerCost`/`laborJobCost`, `unitCost`/`unitProductionCost`; auto-deducts raw material stock on batch creation. |
| 18 | **Udhaar Khata (`Aging Debtors Radar 0-30/31-60/61-90/90+`)** | `PASS` | **`PASS`** | `PASS` | Bucket filtering, partial payment recording, Dr/Cr ledger modal, and WhatsApp payment links verified. |
| 19 | **Purchases & ITC (`Single-Invoice Dual-Ledger Mirroring`)** | `PASS` | **`PASS`** | `PASS` | Purchase entry, CGST Sec 16/17(2) ITC eligibility check, and 1-click stock sync verified. |
| 20 | **Expenses & P&L (`Cash Drawer vs Bank/UPI`)** | `PARTIAL` (Profit formula differed from Dashboard & 6M Reports) | **`PASS`** | `BLOCKED` (Needs Render redeploy) | Unified via `computeOrderFinancials()` so Dashboard, Expenses & P&L, and Reports 6M P&L report identical `₹2,687` Net Profit. |
| 21 | **Reports (`6-Month P&L`, `Valuation`, `Expiry Risk`, `Sales`, `Margins`)** | `PARTIAL` (`6M P&L` COGS/Net Profit mismatch) | **`PASS`** | `BLOCKED` (Needs Render redeploy) | Fixed `computeSixMonthFinancials()` and `total6mNet` calculation to match Dashboard and Expenses & P&L. |
| 22 | **Managers & Staff RBAC (`14 Granular Permissions`)** | `FAIL` (`POST /api/merchant/staff` returned `404` for counter staff form) | **`PASS`** | `BLOCKED` (Needs Render redeploy) | Added `/api/merchant/staff` (`add` & `toggle`) endpoint in `server.js`; Owner Manager ID modal (`manager_save`) verified. |
| 23 | **QR Standee & More Tools (`Standee`, `Promote Business`, `Refer & Earn`)** | `PARTIAL` (Homepage `"Promote Your Business Here"` set invalid tab `'Promote Business'`) | **`PASS`** | `BLOCKED` (Needs Render redeploy) | Mapped homepage button to `state.merchantTab='Standee'; state.merchantMoreSubTab='Promote Business'`. |
| 24 | **System Settings (`Profile`, `Banking`, `Invoice Defaults`, `AI APIs`, `Backup`)** | `FAIL` (`Invoice Defaults` & `AI Provider APIs` threw `TypeError: Cannot read properties of null` due to DOM ID mismatches) | **`PASS`** | `BLOCKED` (Needs Render redeploy) | Aligned `saveSystemSettingsTab` (`'invoice'` -> `set-inv-*`) and `onAiProviderPlatformChange` / `saveAiProviderConfig` / `testAiProviderConnection` (`aip-*`). |
| 25 | **Mobile Responsiveness (`375x812` & `768x1024`)** | `FAIL` (`+ New ▾` dropdown clipped by `overflow: hidden !important`; `.mobile-bottom-nav` stacked vertically) | **`PASS`** | `BLOCKED` (Needs Render redeploy) | Set `.enterprise-topbar { overflow: visible !important; z-index: 120 !important; }` and `nav.mobile-bottom-nav.mobile-only { display: flex !important; flex-direction: row !important; }`. |

---

## 3. Detailed Bug Catalog, Root Causes & Severity

| Bug ID | Severity | Component / File | Description & Root Cause | Fix Implemented |
|---|---|---|---|---|
| **BUG-01** | **Critical** | `server.js` (L1929, L2047)<br>`public/app.js` (L254, L8410) | `GET /api/bootstrap` returned `Cache-Control: public, max-age=300` without `Vary: Authorization`. After 1-click Demo Login or Password Login, the browser served the cached guest response (`user: null`), trapping the user on `"Merchant ERP Sign-In Required"`. Also `handleAdminDirectLogin` forgot to set `state.token = res.token`. | Changed `/api/bootstrap` headers to `Cache-Control: private, no-cache, no-store, must-revalidate` and `Vary: Authorization`; invalidated `catalogCache` in `saveDb()`; added `cache: 'no-store'` in `apiFetch()`; set `state.token = res.token` in `handleAdminDirectLogin`. |
| **BUG-02** | **Critical** | `public/index.html` (L86, L266) | Render-blocking Google Fonts stylesheet in `<head>` delayed script execution on slow networks, triggering `#splash-fallback-card` (`"Loading taking longer than usual"`), and 450ms splash fade-out bled behind the login card. | Loaded Google Fonts non-blockingly (`media="print" onload="this.media='all'"`), bumped asset version to `?v=20261117_v17`, and removed `#kuberq-splash` immediately upon mount. |
| **BUG-03** | **Critical** | `public/app.js` (L4072–4265, L12390–12520) | Settings -> `Invoice Defaults` form passed `'invoice'` and rendered `set-inv-*` IDs, while `saveSystemSettingsTab` checked `tab === 'invoice_defaults'` and queried non-existent `def-*` IDs. Settings -> `AI Digital Manager & APIs` rendered `aip-*` IDs while `onAiProviderPlatformChange`, `saveAiProviderConfig`, and `testAiProviderConnection` queried non-existent `ai-cfg-*` IDs, throwing `TypeError: Cannot read properties of null (reading 'value')`. | Updated `saveSystemSettingsTab` to accept `'invoice'` and `'invoice_defaults'` and read `set-inv-*` (with `def-*` fallback), and updated AI Provider functions to read `aip-*` (with `ai-cfg-*` fallback). |
| **BUG-04** | **Critical** | `public/app.js` (L9647, L11102, L13169)<br>`server.js` (L2828, L2919) | 1) `updateOrderStatusFromQueue` called undefined function `api('/api/merchant/order-update', ...)` instead of `apiFetch(...)`.<br>2) `addShopStaff` and `toggleShopStaff` called `POST /api/merchant/staff`, which was missing in `server.js` (`404`).<br>3) `submitBulkCatalogReview` called `POST /api/merchant/inventory`, which was missing in `server.js` (`404`). | Replaced `api(...)` with `apiFetch(...)`; implemented `POST /api/merchant/staff` (`add` & `toggle`) and aliased `POST /api/merchant/inventory` to `/api/merchant/product-save` in `server.js`. |
| **BUG-05** | **High** | `public/app.js` (L1824, L4495, L9632, L12900, L13503, L13583) | 1) `openProductModal()` and `openSupplierReturnModal()` were called in inline `onclick` handlers on POS Counter and Expiry & Batches but were never defined (`ReferenceError`).<br>2) `submitDemoRequest()` read `document.getElementById('demo-slot').value` and `'demo-topic'`, which do not exist in `renderDemoModal()`. | Defined `window.openProductModal` (aliasing `openProductAddModal`) and `window.openSupplierReturnModal`; added optional chaining & defaults in `submitDemoRequest`. |
| **BUG-06** | **High** | `public/app.js` (L1571, L11612, L11652) | Clicking `"🧾 Create Bill"` in Customers CRM set `state.merchantTab = 'InvoiceBuilder'` (invalid tab key, resetting view to `'Dashboard'`). Clicking `"Promote Your Business Here"` on Homepage set `state.merchantTab = 'Promote Business'` (invalid top-level tab key). | Mapped `'InvoiceBuilder'` to `'Billing'` and `'Promote Business'` to `state.merchantTab = 'Standee'; state.merchantMoreSubTab = 'Promote Business'`. |
| **BUG-07** | **High** | `public/app.js` (L85, L10580–10795)<br>`server.js` (L1055, L4617–4745) | 1) `state.mfgSubTab` defaulted to `'raw_materials'`, while `renderMerchantManufacturing` checked `subTab === 'raw'`, causing Manufacturing tab to open completely blank.<br>2) Frontend sent `materialName`, `minThreshold`, `materialDesc`, `processCharges`, `laborPowerCost`, `rawMaterialId`, `rawMaterialQty`, whereas backend expected `name`, `minAlert`, `inputMaterial`, `totalJobCharges`, `laborJobCost`, `rawMaterialCost`. | Changed `state.mfgSubTab` default to `'raw'`; normalized both field naming conventions in `server.js` and `public/app.js`; added automatic raw material stock deduction & cost calculation when `rawMaterialId` + `rawMaterialQty` are submitted. |
| **BUG-08** | **High** | `server.js` (L860, L3695)<br>`public/app.js` (L3298, L3505, L3619, L4718) | 1) Seeded order `KQ-2627-0001` had `totals.taxable = 0, gross = 0, costTotal = 8114` in `kuberq_db.json` because `loadDb()` didn't calculate totals from `o.items`.<br>2) POS Counter sales (`pos_sale_complete`) saved orders without `customer`, `date`, or `totals`.<br>3) `Dashboard`, `Expenses & P&L`, and `Reports 6M P&L` used different COGS/margin formulas. | Repaired `loadDb()` and `pos_sale_complete` in `server.js` to populate full `totals` (`taxable`, `gst`, `gross`, `costTotal`); added `computeOrderFinancials()` in `public/app.js` so all 3 views report identical Revenue (`₹16,675.46`), COGS (`₹11,445`), and Net Profit (`₹2,687`). |
| **BUG-09** | **Medium** | `public/styles.css` (L1529) | `.enterprise-topbar` had `overflow: hidden !important` on viewports `<=900px`, clipping `.quick-create-menu` (`+ New ▾`) and `.global-search-dropdown` (`Ctrl+K`) at the 48px header boundary. | Changed `.enterprise-topbar` to `overflow: visible !important; z-index: 120 !important;`. |
| **BUG-10** | **Medium** | `public/styles.css` (L1452, L2064, L2249, L2698) | 1) `.mobile-only { display: block !important; }` overrode `.mobile-bottom-nav { display: flex; }`, stacking the 5 bottom nav buttons vertically on mobile.<br>2) `.exec-kpi-grid` used `repeat(4, 1fr)` without `minmax(0, 1fr)`, allowing wide inner tables to clip right-side KPI cards on 1280px screens. | Added `nav.mobile-bottom-nav.mobile-only { display: flex !important; flex-direction: row !important; }` and updated `.exec-kpi-grid` / `.enterprise-main` to use `minmax(0, 1fr)` and `overflow-x: hidden`. |
| **BUG-11** | **Medium** | `public/app.js` (L4587, L5864, L13571) | 1) `renderMerchantExpiryBatches` had a broken regex `.replace(/s/g, '_')` (missing backslash `\s+`, breaking the `⏳ EXPIRING SOON` filter) and a stray copy-pasted HTML block rendering duplicate `GOOD` and `FINISHED` buttons.<br>2) `Add Product` button had duplicate `+` (`➕ + Add Product`). | Fixed regex to `.replace(/\s+/g, '_')`, removed the stray duplicate HTML buttons, and cleaned up double `+` labels. |
| **BUG-12** | **Medium** | `public/app.js` (L2394–2425, L13989) | 1) `PRODUCT_PLACEHOLDER_SVG` contained unescaped single quotes (`xmlns='http://...'`) inside `onerror="this.src='${PRODUCT_PLACEHOLDER_SVG}'"`, throwing `SyntaxError: Unexpected identifier 'http'` whenever an image fallback fired.<br>2) `getProductPhotoUrl()` used mismatched Unsplash photos (bookshelf for copper wire, pink flowers for Sintex water tank).<br>3) Barcode fallback regex used `.replace(/D/g, '')` instead of `.replace(/\D/g, '')`. | URL-encoded double quotes (`%22`) in `PRODUCT_PLACEHOLDER_SVG`; replaced mismatched Unsplash stock IDs with crisp 0ms inline SVG product illustrations; fixed `.replace(/\D/g, '')`. |

---

## 4. Files Changed

All fixes were applied to the primary project directory and mirrored identically to the deployment directory:

1. [`D:\Business excel file\KuberQ\server.js`](file:///D:/Business%20excel%20file/KuberQ/server.js) *(mirrored to [`D:\Business excel file\KuberQ-Deploy\server.js`](file:///D:/Business%20excel%20file/KuberQ-Deploy/server.js))*
2. [`D:\Business excel file\KuberQ\public\index.html`](file:///D:/Business%20excel%20file/KuberQ/public/index.html) *(mirrored to [`D:\Business excel file\KuberQ-Deploy\public\index.html`](file:///D:/Business%20excel%20file/KuberQ-Deploy/public/index.html))*
3. [`D:\Business excel file\KuberQ\public\app.js`](file:///D:/Business%20excel%20file/KuberQ/public/app.js) *(mirrored to [`D:\Business excel file\KuberQ-Deploy\public\app.js`](file:///D:/Business%20excel%20file/KuberQ-Deploy/public/app.js))*
4. [`D:\Business excel file\KuberQ\public\styles.css`](file:///D:/Business%20excel%20file/KuberQ/public/styles.css) *(mirrored to [`D:\Business excel file\KuberQ-Deploy\public\styles.css`](file:///D:/Business%20excel%20file/KuberQ-Deploy/public/styles.css))*

---

## 5. Verification & Test Evidence

### 5.1 Syntax & Static Code Analysis Checks (`0` Errors)
- `node --check server.js` -> **PASS (Exit Code 0)**
- `node --check public/app.js` -> **PASS (Exit Code 0)**
- `audit_handlers.js` (405 inline DOM event handlers vs defined functions) -> **0 undefined functions**
- `audit_routes.js` (31 backend routes vs all frontend `apiFetch` calls & `state.merchantTab` transitions) -> **0 missing routes, 0 invalid tab targets**
- `audit_ids.js` (all `document.getElementById` calls vs rendered template IDs) -> **All active form IDs matched with safe fallbacks**

### 5.2 Automated Integration & API Test Suite (`verify_fixes.js` — `12/12 PASS`)
Executed against `http://localhost:4500`:
```text
=== KuberQ Automated Integration & API Verification Suite ===
  [PASS] BUG-01a: GET /api/bootstrap (Guest) returns Cache-Control: private, no-cache, no-store, must-revalidate
  [PASS] BUG-01b: POST /api/auth/demo-login returns valid token
  [PASS] BUG-01c: GET /api/bootstrap (Authenticated) returns user & myShop immediately without stale cache
  [PASS] BUG-03a: POST /api/merchant/pro (settings_save invoiceDefaults) succeeds
  [PASS] BUG-03b: POST /api/merchant/pro (ai_provider_test) succeeds cleanly
  [PASS] BUG-04a: POST /api/merchant/staff (add staff) returns 200 OK
  [PASS] BUG-04b: POST /api/merchant/staff (toggle staff) returns 200 OK
  [PASS] BUG-04c: POST /api/merchant/inventory (bulk_add alias) returns 200 OK
  [PASS] BUG-07a: POST /api/manufacturer/raw-materials accepts materialName & minThreshold
  [PASS] BUG-07b: POST /api/manufacturer/job-work accepts materialDesc & processCharges and returns challan
  [PASS] BUG-07c: POST /api/manufacturer/production-batch computes rawMaterialCost from rawMaterialId + rawMaterialQty & returns unitCost
  [PASS] BUG-08: POST /api/merchant/pro (pos_sale_complete) populates order.customer, order.date, and order.totals

=== SUMMARY: 12 Passed, 0 Failed ===
```

### 5.3 Live End-to-End Browser Verification (`http://localhost:4500/merchant`)
Verified via automated browser inspection across Desktop (`1280x800`) and Mobile (`375x812`):
- **Unauthenticated -> 1-Click Demo Login (`Marwar`):** Logged in immediately on the first click into the Merchant ERP (`Retail POS Counter Desk`) with zero cache delay.
- **Settings (`Invoice Defaults` & `AI Digital Manager & APIs`):** Both forms saved and tested cleanly (`HTTP 200 OK`) with zero `TypeError`s.
- **Expiry & Batches:** Duplicate buttons gone; `⏳ EXPIRING SOON` pill filtered accurately to 3 expiring batches; `+ Add New Batch` and `🚚 Return` worked with zero `ReferenceError`s.
- **Customers -> Create Bill:** Clicking `"🧾 Bill"` on `Apex Infotech Solutions` navigated directly to `Billing` (`5-Second Quick Billing, Quotations & GST Invoices`) with buyer name, phone, and GSTIN pre-filled.
- **Manufacturing (`Raw Materials`, `Job-Work Challans`, `Production Batches`):** Rendered `Raw Material Stock` immediately on tab open (`Total Raw Valuation: ₹1,12,000`) and displayed all 3 sub-tabs without `undefined` fields.
- **Mobile Viewport (`375x812`):** Topbar `+ New ▾` dropdown opened all 7 quick-create items completely unclipped, and `.mobile-bottom-nav` on `/order` aligned all 5 buttons horizontally in a single row.

---

## 6. Deployment Limitation & Prioritized Recommendations

### 6.1 Live Render Deployment Status (`https://kuberq.onrender.com/merchant`)
- **Important Note on Live Deployment Access:** All fixes have been implemented, verified, and synced to both [`D:\Business excel file\KuberQ`](file:///D:/Business%20excel%20file/KuberQ) and [`D:\Business excel file\KuberQ-Deploy`](file:///D:/Business%20excel%20file/KuberQ-Deploy) and confirmed working on `http://localhost:4500/merchant`. However, this machine does not have `git` installed on the system PATH or direct Render deployment credentials/webhook access, so the remote instance at `https://kuberq.onrender.com` is still serving the pre-fix bundle (`?v=20261111_v16`) until `D:\Business excel file\KuberQ-Deploy` is pushed to GitHub (`https://github.com/airasopaji/KUBERQ.git`) or uploaded to Render.

### 6.2 Prioritized Next Steps to Deploy to Production
1. **Push `D:\Business excel file\KuberQ-Deploy` to GitHub (`airasopaji/KUBERQ`):**
   - Upload or commit the 4 updated files (`server.js`, `public/index.html`, `public/app.js`, `public/styles.css`) to the `main` branch of `https://github.com/airasopaji/KUBERQ.git`. Render will automatically build and deploy the new release (`?v=20261117_v17`).
2. **Keep-Alive Ping for Render Free Tier:**
   - Configure a free uptime monitor (such as UptimeRobot or Cron-job.org) to ping `https://kuberq.onrender.com/healthz` every 10 minutes during business hours (9 AM – 9 PM IST) to eliminate Render free-tier cold-start spin-down delays.
3. **Persistent Disk / Managed Database for Production Data:**
   - On Render's free tier, the local filesystem (`data/kuberq_db.json`) resets on container redeploys. Use the built-in **Settings -> Backup & Reset -> 1-Click Full JSON Backup** before redeploying, or mount a Render Persistent Disk at `/opt/render/project/src/data`.
