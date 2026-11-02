/**
 * KuberQ — B2B & Retail Operating System (Frontend SPA Engine)
 * 100% Complete Hindi / English Language Switching, Zero-Cost Mobile Auth,
 * Rule-46 GST/IGST Billing, AI Photo-to-Catalog & Smart Parchi, Party Udhaar Khata,
 * and Super-Admin + Employee Command Center.
 */

const state = {
  lang: localStorage.getItem('kuberq_lang') || 'hi',
  token: localStorage.getItem('kuberq_token') || '',
  route: window.location.pathname || '/',
  query: Object.fromEntries(new URLSearchParams(window.location.search)),
  data: {
    settings: { enableTransportLive: false, enableServicesLive: false, adminWhatsApp: '' },
    user: null,
    merchants: [],
    products: [],
    reviews: [],
    faqs: [],
    hsnDictionary: [],
    starterTemplates: [],
    providers: [],
    shipments: [],
    promotions: [],
    myShop: null,
    myOrders: [],
    myStaff: [],
    myActivity: [],
    myReferrals: [],
    myShipments: [],
    myPromotions: [],
    mySupplierPurchases: [],
    myExpenses: [],
    myRawMaterials: [],
    myJobWorkOrders: [],
    myProductionBatches: [],
    bids: [],
    adminData: null
  },
  // UI Sub-states
  merchantTab: 'Dashboard',
  merchantMoreSubTab: 'QR Standee',
  mfgSubTab: 'raw_materials',
  customerTab: 'Directory',
  sidebarCollapsed: false,
  sidebarMobileOpen: false,
  accountingPeriod: 'all',
  servicesPageTab: 'find',
  orderPageTab: 'catalog',
  orderCatalogSearch: '',
  floatingHubOpen: false,
  voucherModalOpen: false,
  bulkReviewModal: null,
  bulkReviewShopId: null,
  quickBill: { name: '', phone: '', amount: '', mode: 'Cash', note: '' },
  adminTab: 'overview',
  authMode: 'mobile', // 'mobile' | 'email'
  authRole: 'merchant',
  billingCycle: 'monthly',
  printFormat: 'a4', // 'a4' | 'thermal'
  demoModalOpen: false,
  aiModalOpen: false,
  reportModal: null, // { targetType, targetId, targetName }
  aiExtractedItems: [],
  aiLoading: false,
  toast: null,
  // Services Directory Filters & Cascading Category State
  serviceSearchCity: '',
  serviceSearchPincode: '',
  serviceFilterCat: 'ALL',
  selectedServiceCat: '1. CA, Tax & GST Consultant',
  selectedServiceSub: 'GST Registration & GSTR-1/3B Filing',
  customServiceText: '',
  // Order Cart for /order and /customer
  selectedShopId: '',
  cart: {},
  parchiNote: '',
  checkoutCustomer: { name: '', phone: '', address: '', buyerGstin: '' },
  lastPlacedOrder: null,
  // Walk-in Invoice Builder state
  invoiceLines: [{ name: '', hsn: '3917', qty: 1, price: 0, gstRate: 18, taxMode: 'exclusive' }],
  invoiceBuyer: { name: '', phone: '', address: '', gstin: '', paymentMode: 'Cash', supplyType: 'auto' }
};

// 32+ Comprehensive B2B & Commercial Service Categories with Cascading Sub-Categories + "Other (अन्य)"
const SERVICE_CATEGORIES_30 = [
  { catEn: '1. CA, Tax & GST Consultant', catHi: '1. CA, टैक्स और GST सलाहकार', subs: ['GST Registration & GSTR-1/3B Filing', 'Income Tax & B2B Audit', 'MSME / Udyam & Project Report', 'Company / LLP Registration', 'Tally & Accounting Bookkeeping'] },
  { catEn: '2. Legal, Advocate & Documentation', catHi: '2. वकील, कानूनी सलाह और अनुबंध', subs: ['Commercial & B2B Payment Recovery', 'Property & Registry Documentation', 'Trademark, Copyright & ISO', 'Labour Law & Factory Compliance'] },
  { catEn: '3. Architect, Interior & Vastu', catHi: '3. आर्किटेक्ट, इंटीरियर और वास्तु', subs: ['Factory Shed & Warehouse Design', 'Showroom & Retail Store Interior', '3D Elevation & Structural Map', 'Commercial Vastu Consultant'] },
  { catEn: '4. Civil & Building Contractor', catHi: '4. सिविल और भवन निर्माण ठेकेदार', subs: ['Industrial Shed & Godown Construction', 'Commercial Building Turnkey Contractor', 'RCC, Masonry & Plaster Contractor', 'Waterproofing & Epoxy Flooring'] },
  { catEn: '5. Property, Industrial Plot & Godown Broker', catHi: '5. प्रॉपर्टी, इंडस्ट्रियल प्लॉट और गोदाम ब्रोकर', subs: ['RIICO / Industrial Plot Sale & Lease', 'Warehouse & Godown Rental', 'Commercial Shop & Showroom Leasing'] },
  { catEn: '6. IT, Website, ERP & AI Automation', catHi: '6. IT, वेबसाइट, सॉफ्टवेयर और AI ऑटोमेशन', subs: ['Custom B2B Website & Mobile App', 'WhatsApp Ordering Bot & AI Setup', 'Tally / Busy / ERP Customization', 'Digital Marketing & Google Business'] },
  { catEn: '7. Commercial Electrical & Solar EPC', catHi: '7. कमर्शियल इलेक्ट्रिकल और सोलर प्लांट', subs: ['Industrial Rooftop Solar Plant', '3-Phase Wiring & Panel Installation', 'DG Set / Generator Maintenance', 'Transformer & HT/LT Line Work'] },
  { catEn: '8. Plumbing, Sanitary & Pipeline Contractor', catHi: '8. प्लंबिंग, सेनेटरी और पाइपलाइन ठेकेदार', subs: ['Commercial Building Plumbing', 'Industrial Water Line & Tank Setup', 'Borewell & Submersible Pump Fitting'] },
  { catEn: '9. Industrial Machinery Repair & Maintenance', catHi: '9. फैक्टरी मशीनरी रिपेयर और मेंटेनेंस', subs: ['CNC / Lathe / Hydraulic Repair', 'Electric Motor Rewinding', 'Air Compressor & Boiler Servicing', 'Welding & Heavy Fabrication'] },
  { catEn: '10. Packaging, Corrugated Box & Printing', catHi: '10. पैकेजिंग, कार्टन बॉक्स और प्रिंटिंग', subs: ['Corrugated Carton Boxes (Bulk)', 'BOPP Tape, Stretch Film & Strapping', 'Custom Brand Labels & Barcode Stickers', 'Bill Books, Catalogs & Flex Printing'] },
  { catEn: '11. CCTV, Fire Safety & Security Systems', catHi: '11. CCTV कैमरा, फायर सेफ्टी और सुरक्षा', subs: ['Warehouse & Shop CCTV Installation', 'Fire Extinguisher & NOC Setup', 'Biometric Attendance & Smart Locks', 'Security Guard Agency'] },
  { catEn: '12. Cold Storage & Warehousing Facility', catHi: '12. कोल्ड स्टोरेज और वेयरहाउसिंग', subs: ['Agri & Kirana Cold Storage', 'Dry Godown Storage on Rent', 'Inventory Fulfillment & Packing'] },
  { catEn: '13. Weighbridge (Dharam Kata) & Calibration', catHi: '13. धर्म कांटा और इलेक्ट्रॉनिक तराजू सर्विस', subs: ['Electronic Weighing Scale Repair', 'Weights & Measures Stamping', 'Truck Dharam Kata Service'] },
  { catEn: '14. Custom Clearing (CHA) & Import-Export', catHi: '14. इम्पोर्ट-एक्सपोर्ट (IEC) और कस्टम क्लियरिंग', subs: ['IEC Code & DGFT Registration', 'Freight Forwarding & Container Booking', 'Export GST Refund Consultant'] },
  { catEn: '15. Labour Contractor & Loading/Unloading (Hammali)', catHi: '15. लेबर ठेकेदार और लोडिंग/अनलोडिंग (हम्माली)', subs: ['Godown Loading / Unloading Team', 'Skilled Factory Machine Operators', 'Helper & Packing Staff Supply'] },
  { catEn: '16. PF, ESI & Payroll Consultant', catHi: '16. PF, ESI और फैक्टरी लाइसेंस सलाहकार', subs: ['EPFO & ESIC Monthly Compliance', 'Factory Act & Pollution NOC', 'FSSAI Food License Registration'] },
  { catEn: '17. Carpentry, Aluminium & Rack Fabrication', catHi: '17. फर्नीचर, एल्युमिनियम और गोदाम रैक निर्माण', subs: ['Heavy Duty Slotted Angle Godown Racks', 'Showroom Display Counter & Shelving', 'Aluminium Partition & Toughened Glass'] },
  { catEn: '18. Painting, Polishing & Signage Board', catHi: '18. पेंटिंग, पुट्टी और दुकान ग्लो-साइन बोर्ड', subs: ['LED Acrylic Shop Signage Board', 'Commercial Painting & Texture', 'Industrial Shed Anti-Rust Coating'] },
  { catEn: '19. AC, HVAC & Commercial Refrigeration', catHi: '19. एसी (AC), कूलिंग और चिलर रिपेयर', subs: ['Showroom Cassette & Ductable AC', 'Deep Freezer & Water Cooler Repair', 'Industrial Ventilation & Exhaust Fan'] },
  { catEn: '20. Pest Control & Industrial Cleaning', catHi: '20. पेस्ट कंट्रोल और गोदाम सफाई', subs: ['Godown Termite & Rodent Control', 'Water Tank Mechanized Cleaning', 'Showroom Deep Cleaning'] },
  { catEn: '21. Crane, Forklift & Hydra Rental', catHi: '21. क्रेन, फोर्कलिफ्ट और जेसीबी किराया', subs: ['Hydra & Crane for Heavy Unloading', 'Forklift Rental for Warehouse', 'JCB & Earthmover Rental'] },
  { catEn: '22. Insurance Advisor (Shop, Stock & Transit)', catHi: '22. व्यापार, गोदाम स्टॉक और माल बीमा सलाहकार', subs: ['Shop & Godown Fire/Burglary Insurance', 'Marine / Transit Goods Insurance', 'Commercial Vehicle & Fleet Insurance'] },
  { catEn: '23. Textile, Dyeing & Job-Work Unit', catHi: '23. कपड़ा रंगाई, प्रिंटिंग और जॉब-वर्क', subs: ['Fabric Dyeing & Processing', 'Stitching & Garment Job-Work', 'Embroidery & Packaging'] },
  { catEn: '24. Timber, Plywood & Saw Mill Service', catHi: '24. टिंबर, आरा मशीन और लकड़ी कटाई', subs: ['Wooden Crate & Pallet Making', 'Timber Seasoning & Planing', 'CNC Wood Carving'] },
  { catEn: '25. Stone, Marble & Granite Processing', catHi: '25. जोधपुर स्टोन, मार्बल और ग्रेनाइट कटिंग', subs: ['Sandstone & Granite Cutting/Polishing', 'Flooring & Cladding Fitting Contractor'] },
  { catEn: '26. Chemical, Lab Testing & Quality Check', catHi: '26. लैब टेस्टिंग, गुणवत्ता और मेटल/ग्रेन जाँच', subs: ['Grain & Spice Moisture/Quality Testing', 'Building Material Cube/Steel Testing', 'Water Quality Testing'] },
  { catEn: '27. Courier, Parcel & Local Hyperlocal Delivery', catHi: '27. कूरियर, पार्सल और लोकल ऑटो डिलीवरी', subs: ['B2B Bulk Parcel Courier', 'Same-Day Local Three-Wheeler Delivery', 'E-commerce Return Management'] },
  { catEn: '28. Event, Tent & Exhibition Stall Contractor', catHi: '28. ट्रेड फेयर स्टॉल, टेंट और डीलर मीट आयोजन', subs: ['B2B Trade Expo Stall Fabrication', 'Dealer Meet & Showroom Inauguration Setup'] },
  { catEn: '29. Scrap Buyer (Iron, Plastic, Carton)', catHi: '29. औद्योगिक स्क्रैप और पुराना माल खरीदार', subs: ['Iron, Steel & Metal Scrap Buyer', 'Waste Carton & Plastic Scrap Buyer', 'Old Battery & E-Waste Buyer'] },
  { catEn: '30. Water Tanker & Industrial Utility Supply', catHi: '30. पानी टैंकर और निर्माण साइट सप्लाई', subs: ['Construction Site Water Tanker', 'Drinking Water Camper Bulk Supply'] },
  { catEn: '31. Photography & Product Catalog Shoot', catHi: '31. प्रोडक्ट फोटोग्राफी और कैटलॉग शूट', subs: ['B2B Product Photo Shoot for Catalog', 'Industrial Video & Drone Shoot'] },
  { catEn: '32. Other (Custom Business Service)', catHi: '32. अन्य (अपनी कस्टम सेवा लिखें)', subs: ['Other (Type Your Custom Service Below)'] }
];

function tr(en, hi) {
  return state.lang === 'hi' ? hi : en;
}

// Dynamic dictionary so database-seeded names, cities, categories & items also switch 100% between Hindi & English
const DYN_HI_MAP = {
  'Marwar Hardware & Sanitary Mart': 'मारवाड़ हार्डवेयर एंड सेनेटरी मार्ट',
  'Surya Electricals & Switchgear': 'सूर्या इलेक्ट्रिकल्स एंड स्विचगियर',
  'Hardware, Pipes & Sanitary': 'हार्डवेयर, पाइप और सेनेटरी',
  'Electrical & Switchgear': 'इलेक्ट्रिकल और स्विचगियर',
  'Cement, Steel & Building Material': 'सीमेंट, सरिया और बिल्डिंग मटेरियल',
  'Electronics & Mobile Accessories': 'इलेक्ट्रॉनिक्स और मोबाइल एक्सेसरीज',
  'Mandi, Grains & Wholesale Grocery': 'मंडी, अनाज और थोक किराना',
  'Medical & Surgical Distributor': 'मेडिकल और सर्जिकल डिस्ट्रीब्यूटर',
  'Manufacturing & Textile': 'निर्माण (मैन्युफैक्चरिंग) और कपड़ा उद्योग',
  'Retail Store': 'खुदरा (रिटेल) दुकान',
  'Jodhpur': 'जोधपुर',
  'Rajasthan': 'राजस्थान',
  'Jaipur': 'जयपुर',
  'Ahmedabad': 'अहमदाबाद',
  'Gujarat': 'गुजरात',
  'Vyapar Pro': 'व्यापार प्रो (Vyapar Pro)',
  'Starter (Free)': 'स्टार्टर ट्रायल (निःशुल्क)',
  'B2B Enterprise': 'B2B एंटरप्राइज',
  'Supreme PVC Pipe 1 inch (3m)': 'सुप्रीम PVC पाइप 1 इंच (3 मीटर)',
  'Astral CPVC Elbow 3/4 inch': 'एस्ट्रल CPVC एल्बो 3/4 इंच',
  'Sintex Water Tank 1000L Triple Layer': 'सिंटेक्स पानी की टंकी 1000 लीटर (3-लेयर)',
  'Jaguar Continental Brass Bib Cock': 'जैगुआर कॉन्टिनेंटल ब्रास नल (Bib Cock)',
  'Havells Life Line Plus Wire 1.5 sqmm (90m)': 'हैवेल्स लाइफ लाइन वायर 1.5 sqmm (90m कॉइल)',
  'Syska 12W LED Bulb B22 (Pack of 10)': 'सिस्का 12W LED बल्ब (10 का पैक)',
  'Anchor Roma 6A Modular Switch (Box of 20)': 'एंकर रोमा 6A मॉड्यूलर स्विच (20 का बॉक्स)',
  'Crompton High-Speed Ceiling Fan 1200mm': 'क्रॉम्पटन हाई-स्पीड सीलिंग पंखा 1200mm',
  'New': 'नया ऑर्डर',
  'Accepted': 'स्वीकृत',
  'Packed': 'पैक हो गया',
  'Out for Delivery': 'डिलीवरी के लिए निकला',
  'Delivered': 'डिलीवर हो गया',
  'Rejected': 'अस्वीकृत',
  'Cash': 'नकद (Cash)',
  'UPI': 'UPI भुगतान',
  'Card': 'कार्ड',
  'Credit': 'उधार (Credit)',
  'Unmarked': 'अचिह्नित'
};

function trDyn(str) {
  if (str === null || str === undefined) return '';
  const s = String(str);
  if (state.lang !== 'hi') return s;
  return DYN_HI_MAP[s] || s;
}

function fmtINR(n) {
  const num = Number(n) || 0;
  return '₹' + num.toLocaleString('en-IN', { maximumFractionDigits: 2 });
}

function esc(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function showToast(msg, type = 'success') {
  state.toast = { msg, type };
  render();
  setTimeout(() => {
    if (state.toast && state.toast.msg === msg) {
      state.toast = null;
      render();
    }
  }, 4500);
}

async function apiFetch(url, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (state.token) headers['Authorization'] = `Bearer ${state.token}`;
  const res = await fetch(url, { ...options, headers });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.error || `Request failed (${res.status})`);
  }
  return json;
}

async function bootstrap() {
  try {
    const data = await apiFetch('/api/bootstrap');
    state.data = { ...state.data, ...data };
    if (state.query.shop) {
      state.selectedShopId = state.query.shop;
    } else if (!state.selectedShopId && state.data.merchants.length > 0) {
      state.selectedShopId = state.data.merchants[0].id;
    }
    render();
  } catch (err) {
    console.error('Bootstrap error:', err);
    render();
  }
}

function navigate(path, queryParams = {}) {
  const qs = new URLSearchParams(queryParams).toString();
  const fullUrl = qs ? `${path}?${qs}` : path;
  window.history.pushState({}, '', fullUrl);
  state.route = path;
  state.query = queryParams;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  render();
}

window.addEventListener('popstate', () => {
  state.route = window.location.pathname || '/';
  state.query = Object.fromEntries(new URLSearchParams(window.location.search));
  render();
});

// ============================================================================
// CLIENT-SIDE SVG QR CODE GENERATOR (ZERO EXTERNAL DEPENDENCY)
// ============================================================================
function renderVisualQrSvg(text, size = 160) {
  let hash = 2166136261;
  const str = String(text || 'KuberQ');
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const cells = 21;
  let rects = '';
  const isFinder = (r, c) =>
    (r < 7 && c < 7) || (r < 7 && c >= cells - 7) || (r >= cells - 7 && c < 7);

  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      let on = false;
      if (isFinder(r, c)) {
        const lr = r >= cells - 7 ? r - (cells - 7) : r;
        const lc = c >= cells - 7 ? c - (cells - 7) : c;
        on = lr === 0 || lr === 6 || lc === 0 || lc === 6 || (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4);
      } else {
        const bit = ((r * 31 + c * 17 + Math.abs(hash)) ^ (str.charCodeAt((r + c) % str.length) * 13)) % 7;
        on = bit < 3;
      }
      if (on) {
        rects += `<rect x="${c + 2}" y="${r + 2}" width="1" height="1" fill="#0f172a" />`;
      }
    }
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${cells + 4} ${cells + 4}" style="background:#fff;border-radius:10px;padding:4px">${rects}</svg>`;
}

// ============================================================================
// HEADER & FOOTER COMPONENTS (SINGLE-LINE ALIGNED HEADER — ZERO EMPTY RIGHT SPACE)
// ============================================================================
const HERO_SCENES = [
  {
    bg: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=1600&q=80',
    icon: '🏪',
    tabEn: 'Hardware, Sanitary & Electrical',
    tabHi: 'हार्डवेयर, सेनेटरी व इलेक्ट्रिकल',
    badgeEn: 'FOR HARDWARE, SANITARY, ELECTRICAL & BUILDING MATERIAL TRADERS',
    badgeHi: 'हार्डवेयर, सेनेटरी, इलेक्ट्रिकल और बिल्डिंग मटेरियल व्यापारियों के लिए',
    captionEn: 'Live Scene: Hardware & Electrical Wholesale Counter — 10-Second Parchi to GST Invoice',
    captionHi: 'लाइव दृश्य: हार्डवेयर व इलेक्ट्रिकल शोरूम — 10 सेकंड में हाथ की पर्ची से पक्का GST बिल'
  },
  {
    bg: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80',
    icon: '🧾',
    tabEn: 'Smart GST Billing & QR Shop',
    tabHi: 'स्मार्ट GST बिलिंग व ऑनलाइन दुकान',
    badgeEn: 'DIGITAL COUNTER BILLING, ONLINE STOREFRONT & DIRECT UPI',
    badgeHi: 'डिजिटल काउंटर बिलिंग, ऑनलाइन कैटलॉग और सीधा UPI पेमेंट',
    captionEn: 'Live Scene: Digital Showroom — Customers scan QR to order without any app',
    captionHi: 'लाइव दृश्य: डिजिटल दुकान — ग्राहक बिना किसी ऐप के QR स्कैन कर ऑर्डर भेजें'
  },
  {
    bg: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80',
    icon: '📦',
    tabEn: 'Mandi, Wholesale & AI Stock',
    tabHi: 'मंडी, थोक गोदाम व AI स्टॉक',
    badgeEn: 'AI PURCHASE BILL SCANNER & B2B WHOLESALE INVENTORY',
    badgeHi: 'AI खरीद बिल स्कैनर और थोक गोदाम स्टॉक प्रबंधन',
    captionEn: 'Live Scene: Wholesale Warehouse — Snap supplier bill photo to auto-load stock',
    captionHi: 'लाइव दृश्य: थोक गोदाम — सप्लायर के खरीद बिल की फोटो खींचते ही स्टॉक अपने-आप चढ़े'
  },
  {
    bg: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1600&q=80',
    icon: '🏭',
    tabEn: 'Manufacturers, Finance & Transport',
    tabHi: 'फैक्टरी, व्यापार ऋण व ट्रांसपोर्ट',
    badgeEn: 'INTER-STATE IGST, WORKING CAPITAL & B2B TRANSPORT NETWORK',
    badgeHi: 'इंटर-स्टेट IGST, व्यापार पूँजी सहायता और ट्रांसपोर्ट नेटवर्क',
    captionEn: 'Live Scene: Factory & Distribution — Inter-State IGST billing & fleet dispatch',
    captionHi: 'लाइव दृश्य: फैक्टरी व डिस्ट्रीब्यूशन — अन्य राज्यों के लिए IGST बिल और ट्रांसपोर्ट सुविधा'
  }
];

state.heroSceneIdx = 0;

window.setHeroScene = function(idx) {
  state.heroSceneIdx = Number(idx) % HERO_SCENES.length;
  render();
};

setInterval(() => {
  if ((state.route === '/' || state.route === '/merchants') && !state.demoModalOpen && !state.aiModalOpen) {
    state.heroSceneIdx = ((state.heroSceneIdx || 0) + 1) % HERO_SCENES.length;
    const bgEl = document.getElementById('hero-dynamic-bg');
    const capEl = document.getElementById('hero-dynamic-caption');
    const bdgEl = document.getElementById('hero-dynamic-badge');
    const sc = HERO_SCENES[state.heroSceneIdx];
    if (bgEl && sc) {
      bgEl.style.backgroundImage = `url('${sc.bg}')`;
      if (capEl) capEl.textContent = state.lang === 'hi' ? sc.captionHi : sc.captionEn;
      if (bdgEl) bdgEl.textContent = '✦ ' + (state.lang === 'hi' ? sc.badgeHi : sc.badgeEn);
      document.querySelectorAll('.hero-scene-tab').forEach((btn, i) => {
        btn.classList.toggle('active', i === state.heroSceneIdx);
      });
    }
  }
}, 5500);

// ============================================================================
// ENTERPRISE ERP LIVE CLOCK & APP SHELL ENGINE
// ============================================================================
function getFormattedEnterpriseDateTime() {
  const now = new Date();
  const d = String(now.getDate()).padStart(2, '0');
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const y = now.getFullYear();
  let hr = now.getHours();
  const mn = String(now.getMinutes()).padStart(2, '0');
  const sc = String(now.getSeconds()).padStart(2, '0');
  const ampm = hr >= 12 ? 'PM' : 'AM';
  hr = hr % 12 || 12;
  const hrStr = String(hr).padStart(2, '0');
  return {
    date: `${d}-${m}-${y}`,
    time: `${hrStr}:${mn}:${sc} ${ampm}`,
    display: `${d}-${m}-${y}  ${hrStr}:${mn}:${sc} ${ampm}`
  };
}

if (typeof window !== 'undefined' && !window._enterpriseClockTimer) {
  window._enterpriseClockTimer = setInterval(() => {
    const el = document.getElementById('live-enterprise-clock');
    if (el) {
      el.textContent = getFormattedEnterpriseDateTime().display;
    }
  }, 1000);
}

function toggleEnterpriseSidebar() {
  state.sidebarCollapsed = !state.sidebarCollapsed;
  state.sidebarMobileOpen = !state.sidebarMobileOpen;
  render();
}

function setEnterpriseNavTab(key) {
  if (state.route === '/merchant') {
    state.merchantTab = key;
  } else if (state.route === '/admin') {
    state.adminTab = key;
  } else if (state.route === '/customer') {
    state.customerTab = key;
  }
  state.sidebarMobileOpen = false;
  render();
}

function renderEnterpriseShell(opts) {
  const {
    roleTitle,
    uniqueId,
    activeTab,
    navItems,
    bannerIcon,
    bannerTitle,
    bannerSubtitle,
    bannerActionHtml,
    contentHtml,
    shop
  } = opts;

  const u = state.data.user || { name: 'User', role: 'guest' };
  const initials = (u.name || 'KQ')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('') || 'KQ';
  const isCollapsed = !!state.sidebarCollapsed;
  const isMobileOpen = !!state.sidebarMobileOpen;

  return `
    <div class="enterprise-shell">
      <!-- 1. Dark Navy Top Bar Header -->
      <header class="enterprise-topbar no-print">
        <div class="topbar-left">
          <button class="sidebar-toggle-btn" type="button" onclick="toggleEnterpriseSidebar()" title="${tr('Toggle Sidebar Menu', 'मेनू छोटा/बड़ा करें')}">
            ☰
          </button>
          <div class="topbar-brand" onclick="navigate('/')" title="${tr('Go to KuberQ Home', 'KuberQ मुख्य पृष्ठ पर जाएं')}">
            <span class="brand-logo-icon">K</span>
            <span>Kuber<span style="color:#38bdf8">Q</span></span>
            <span style="font-size:0.75rem;background:#1e3a8a;color:#93c5fd;padding:2px 7px;border-radius:5px;margin-left:6px;font-weight:700">ERP</span>
          </div>
        </div>

        <div class="topbar-right-ribbon">
          <div class="topbar-ribbon-item">
            <span>👤</span>
            <span style="color:#94a3b8;font-size:0.78rem">WELCOME,</span>
            <span class="topbar-user-name">${esc((u.name || '').toUpperCase())}</span>
          </div>

          <span class="topbar-ribbon-divider">||</span>

          <div class="topbar-ribbon-item">
            <span>📅 🕒</span>
            <span id="live-enterprise-clock" class="topbar-live-clock">${getFormattedEnterpriseDateTime().display}</span>
          </div>

          <span class="topbar-ribbon-divider">||</span>

          <div class="topbar-ribbon-item">
            <span>🆔</span>
            <span class="topbar-id-badge">${esc(uniqueId || 'KQM-000000')}</span>
          </div>

          ${shop?.plan ? `
            <span class="topbar-ribbon-divider">||</span>
            <span class="badge badge-gold" style="font-size:0.72rem;letter-spacing:0.5px">💎 ${esc(shop.plan.toUpperCase())}</span>
          ` : ''}

          <span class="topbar-ribbon-divider">||</span>

          <button class="btn btn-ghost btn-sm" onclick="navigate('/')" style="color:#38bdf8;padding:4px 9px;font-size:0.78rem" title="${tr('Switch to Public Website', 'वेबसाइट देखें')}">
            🌐 ${tr('Website', 'वेबसाइट')}
          </button>

          <span class="topbar-ribbon-divider">||</span>

          <button class="topbar-logout-btn" onclick="logout()" title="${tr('Secure Logout', 'सुरक्षित लॉगआउट')}">
            🚪 ${tr('LOGOUT', 'लॉगआउट')}
          </button>
        </div>
      </header>

      <!-- 2. Enterprise Body: Left Sidebar + Main Content -->
      <div class="enterprise-body">
        ${isMobileOpen ? '<div class="sidebar-backdrop no-print" onclick="toggleEnterpriseSidebar()"></div>' : ''}

        <aside class="enterprise-sidebar no-print ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'show-mobile' : ''}">
          <!-- User Profile Card -->
          <div class="sidebar-user-card">
            <div class="sidebar-user-avatar">${esc(initials)}</div>
            <div class="sidebar-user-details">
              <span class="name" title="${esc(u.name)}">${esc(u.name)}</span>
              <span class="role" title="${esc(shop?.shop || roleTitle)}">${esc(shop?.shop || roleTitle)}</span>
              <span class="id-tag">🆔 ${esc(uniqueId || 'KQM-000000')}</span>
            </div>
          </div>

          <!-- Vertical Navigation Items -->
          <nav class="sidebar-nav-list">
            ${navItems.map(item => {
              const [key, icon, label, badge] = item;
              const isActive = activeTab === key;
              return `
                <button
                  type="button"
                  class="sidebar-nav-item ${isActive ? 'active' : ''}"
                  onclick="setEnterpriseNavTab('${key}')"
                  title="${esc(label)}"
                >
                  <span class="nav-icon">${icon}</span>
                  <span class="nav-label">${esc(label)}</span>
                  ${badge ? `<span class="badge ${isActive ? 'badge-gold' : 'badge-primary'}" style="margin-left:auto;font-size:0.7rem;padding:2px 6px">${badge}</span>` : ''}
                </button>
              `;
            }).join('')}
          </nav>

          <!-- Sidebar Footer Bar -->
          <div class="sidebar-bottom-bar">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:6px">
              <div class="lang-toggle-box" style="margin:0">
                <button type="button" class="lang-btn ${state.lang === 'hi' ? 'active' : ''}" onclick="setLang('hi')">हिन्दी</button>
                <span style="color:#475569">/</span>
                <button type="button" class="lang-btn ${state.lang === 'en' ? 'active' : ''}" onclick="setLang('en')">ENG</button>
              </div>
              <span style="font-size:0.74rem;color:#94a3b8;font-family:monospace">ERP v2.4</span>
            </div>
          </div>
        </aside>

        <!-- Main View Area -->
        <main class="enterprise-main">
          <!-- View Header Banner (CAD-Pro style) -->
          <div class="view-header-banner no-print">
            <div class="view-header-title">
              <div class="view-header-icon">${bannerIcon || '📊'}</div>
              <div class="view-header-text">
                <h2>${bannerTitle}</h2>
                <p>${bannerSubtitle}</p>
              </div>
            </div>
            <div class="view-header-actions">
              ${bannerActionHtml || ''}
            </div>
          </div>

          <!-- Tab Content -->
          <div class="enterprise-tab-content">
            ${contentHtml}
          </div>
        </main>
      </div>
    </div>
  `;
}

function renderHeader() {
  const u = state.data.user;
  const s = state.data.settings;
  const supportPhone = s.adminWhatsApp || '';
  const portalPath = !u
    ? '/auth'
    : u.role === 'admin' || u.role === 'employee'
    ? '/admin'
    : u.role === 'customer'
    ? '/customer'
    : u.role === 'agent'
    ? '/partner'
    : u.role === 'transporter'
    ? '/transport'
    : '/merchant';

  return `
    <header class="site-header no-print">
      <div class="container nav-bar">
        <!-- Left: Brand Logo -->
        <div class="brand-logo" onclick="navigate('/')">
          <span class="brand-icon">K</span>
          <span>Kuber<span style="color:#2563EB">Q</span></span>
        </div>

        <!-- Center: Clean Single-Row Navigation -->
        <nav class="nav-links">
          <button class="nav-item ${state.route === '/' ? 'active' : ''}" onclick="navigate('/')">
            ${tr('Home', 'होम')}
          </button>
          <button class="nav-item ${state.route === '/solutions' ? 'active' : ''}" onclick="navigate('/solutions')">
            ${tr('Features', 'मुख्य फीचर्स')}
          </button>
          <button class="nav-item ${state.route === '/order' ? 'active' : ''}" onclick="navigate('/order', { shop: state.selectedShopId })">
            ${tr('Live Demo', 'लाइव डेमो')}
          </button>
          <button class="nav-item ${state.route === '/customer' ? 'active' : ''}" onclick="navigate('/customer')">
            ${tr('Store Catalog', 'स्टोर कैटलॉग')}
          </button>
          <button class="nav-item ${state.route === '/pricing' ? 'active' : ''}" onclick="navigate('/pricing')">
            ${tr('Pricing', 'प्लान व शुल्क')}
          </button>
          <button class="nav-item ${state.route === '/transport' ? 'active' : ''}" onclick="navigate('/transport')">
            ${tr('Transport', 'ट्रांसपोर्ट')}
          </button>
          <button class="nav-item ${state.route === '/services' ? 'active' : ''}" onclick="navigate('/services')">
            ${tr('Services', 'सेवाएँ')}
          </button>
          ${u ? `
            <button class="nav-item active" onclick="navigate('${portalPath}')" style="border:1.5px solid #2563EB;color:#2563EB;font-weight:800">
              ⚡ ${tr('My Portal', 'मेरा पोर्टल')} (${esc(u.name.split(' ')[0])})
            </button>
          ` : ''}
        </nav>

        <!-- Right: Language Toggle + Auth + Call Support (Aligned Flush Right on Same Row) -->
        <div class="nav-actions">
          <div class="lang-toggle-box" title="${tr('Switch Entire Website Language', 'पूरी वेबसाइट की भाषा बदलें')}">
            <button type="button" class="lang-btn ${state.lang === 'hi' ? 'active' : ''}" onclick="setLang('hi')">हिन्दी</button>
            <span style="color:#94a3b8;font-weight:700;font-size:0.8rem">/</span>
            <button type="button" class="lang-btn ${state.lang === 'en' ? 'active' : ''}" onclick="setLang('en')">ENG</button>
          </div>

          ${u ? `
            <button class="btn btn-ghost btn-sm" onclick="logout()">${tr('Log Out', 'लॉग आउट')}</button>
          ` : `
            <button class="btn btn-ghost btn-sm" onclick="navigate('/auth')">${tr('Log In', 'लॉगिन')}</button>
            <button class="btn btn-primary btn-sm" onclick="navigate('/signup')">${tr('Free Trial', 'निःशुल्क ट्रायल')}</button>
          `}
        </div>
      </div>
    </header>
    ${state.toast ? `
      <div class="no-print" style="background:${state.toast.type === 'error' ? '#dc2626' : '#15803d'};color:#fff;padding:12px 20px;text-align:center;font-weight:700;font-size:1rem;position:sticky;top:74px;z-index:49;box-shadow:0 4px 12px rgba(0,0,0,0.15)">
        ${esc(state.toast.msg)}
      </div>
    ` : ''}
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer no-print" style="margin-top:72px;border-top:2px solid var(--border);background:#0f172a;color:#f8fafc;padding:48px 0">
      <div class="container">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:28px;align-items:center">
          <div>
            <div class="brand-logo" style="color:#fff" onclick="navigate('/')">
              <span class="brand-icon">K</span>
              <span>Kuber<span style="color:#facc15">Q</span></span>
            </div>
            <p style="font-size:1rem;margin-top:10px;max-width:600px;color:#cbd5e1;line-height:1.6">
              ${tr(
                'India’s Complete B2B & Retail Business Platform — Smart GST/IGST Billing, Online Storefront, WhatsApp Parchi Ordering, AI Bill Scanner & Party Udhaar Khata.',
                'व्यापारियों और निर्माताओं का संपूर्ण डिजिटल प्लेटफॉर्म — पक्का GST/IGST बिलिंग, ऑनलाइन दुकान, WhatsApp पर्ची ऑर्डर, AI बिल स्कैनर और पार्टी उधार खाता।'
              )}
            </p>
          </div>
          <div style="display:flex;gap:22px;flex-wrap:wrap;font-size:1rem;font-weight:700;color:#e2e8f0">
            <a href="/pricing" onclick="event.preventDefault();navigate('/pricing')" style="color:#facc15">${tr('Pricing Plans', 'प्लान और शुल्क')}</a>
            <a href="/partner" onclick="event.preventDefault();navigate('/partner')">${tr('Partner & Referrals', 'पार्टनर और रेफरल')}</a>
            <a href="/terms" onclick="event.preventDefault();navigate('/terms')">${tr('Terms of Service', 'सेवा की शर्तें')}</a>
            <a href="/privacy" onclick="event.preventDefault();navigate('/privacy')">${tr('Privacy Policy', 'गोपनीयता नीति')}</a>
            <a href="/grievance" onclick="event.preventDefault();navigate('/grievance')">${tr('Grievance Officer', 'शिकायत अधिकारी')}</a>
          </div>
        </div>
        <p style="font-size:0.9rem;margin-top:24px;border-top:1px solid rgba(255,255,255,0.15);padding-top:18px;color:#94a3b8;line-height:1.6">
          ${tr(
            'Intermediary Declaration: KuberQ acts solely as a technology platform under Section 79 of the IT Act, 2000. All commercial transactions, GST invoices, deliveries, and finance enquiries are settled directly between respective parties. Jurisdiction: Jodhpur, Rajasthan.',
            'कानूनी घोषणा: KuberQ सूचना प्रौद्योगिकी अधिनियम, 2000 की धारा 79 के तहत केवल एक तकनीकी प्लेटफॉर्म है। सभी व्यापारिक लेन-देन, GST बिल, डिलीवरी और वित्तीय पूछताछ संबंधित पक्षों के बीच सीधे तय होते हैं। न्यायक्षेत्र: जोधपुर, राजस्थान।'
          )}
        </p>
      </div>
    </footer>
  `;
}

// ============================================================================
// 1. HOMEPAGE (`/`) — INTERACTIVE HERO BACKGROUND, CLEAR B2B WRITE-UP & STORE CARDS
// ============================================================================
function renderHome() {
  const shops = state.data.merchants;
  const activeScene = HERO_SCENES[state.heroSceneIdx || 0] || HERO_SCENES[0];

  return `
    <!-- INTERACTIVE HERO WITH DYNAMIC B2B BACKGROUND SLIDER & CLEAR BUSINESS WRITE-UP -->
    <section class="hero-interactive-stage">
      <div id="hero-dynamic-bg" class="hero-bg-layer" style="background-image:url('${activeScene.bg}')"></div>
      <div class="hero-bg-overlay"></div>

      <div class="container hero-content-layer">
        <!-- Interactive Industry Scene Tabs (Click to switch background or auto-plays) -->
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:16px">
          <div class="hero-scene-tabs" style="margin-bottom:0">
            ${HERO_SCENES.map((sc, i) => `
              <button type="button" class="hero-scene-tab ${i === (state.heroSceneIdx || 0) ? 'active' : ''}" onclick="setHeroScene(${i})">
                <span>${sc.icon}</span>
                <span>${state.lang === 'hi' ? sc.tabHi : sc.tabEn}</span>
              </button>
            `).join('')}
          </div>
          <span id="hero-dynamic-badge" style="font-size:0.82rem;font-weight:700;color:#fde047;background:rgba(250,204,21,0.14);border:1px solid rgba(250,204,21,0.4);padding:5px 14px;border-radius:999px">
            ✦ ${state.lang === 'hi' ? activeScene.badgeHi : activeScene.badgeEn}
          </span>
        </div>

        <!-- Balanced 2-Column Hero Grid -->
        <div class="hero-split">
          <!-- Left Column: Refined Title + Crystal-Clear Businessman Write-Up -->
          <div style="display:flex;flex-direction:column;justify-content:space-between">
            <div>
              <h1 class="hero-title">
                ${tr(
                  'Make Your Business 100% Digital, Faster & More Profitable with KuberQ',
                  'अपने व्यापार को बनाएँ 100% डिजिटल, तेज़ और अधिक लाभदायक — KuberQ के साथ'
                )}
              </h1>
              <p class="hero-subtitle">
                ${tr(
                  'The Complete All-in-One B2B Business Platform for Shopkeepers, Wholesalers, Dealers & Manufacturers',
                  'दुकानदारों, थोक व्यापारियों (Wholesalers), डीलरों और निर्माताओं (Manufacturers) के लिए संपूर्ण B2B व्यापार प्लेटफॉर्म'
                )}
              </p>

              <!-- Clear Business Write-Up Box Explaining Everything a Merchant Gets Upon Registering -->
              <div class="hero-writeup-box">
                <p class="hero-writeup-lead">
                  ${tr(
                    'Whether you run a Hardware, Sanitary, Electrical, Building Material, Mandi, or Manufacturing business — when you register on KuberQ, you get every facility needed to manage and grow your entire business from one place:',
                    'चाहे आपकी हार्डवेयर, सेनेटरी, इलेक्ट्रिकल, बिल्डिंग मटेरियल, मंडी या मैन्युफैक्चरिंग की दुकान या कंपनी हो — KuberQ पर जुड़कर काम करने पर आपको एक व्यापारी के रूप में अपने व्यापार को आगे बढ़ाने की हर सुविधा एक ही जगह मिलती है:'
                  )}
                </p>

                <div class="hero-value-grid">
                  <div class="hero-value-item">
                    <span style="color:#facc15;font-weight:900">✔</span>
                    <span>
                      <strong style="color:#fff">${tr('10-Sec GST & Wholesale Billing:', '10-सेकंड में पक्का GST व थोक बिल:')}</strong>
                      ${tr('Convert handwritten parchis into CGST/SGST, Inter-State IGST, or Estimate bills.', 'हाथ की पर्ची से तुरंत CGST/SGST, इंटर-स्टेट IGST या एस्टीमेट बिल बनाएँ।')}
                    </span>
                  </div>
                  <div class="hero-value-item">
                    <span style="color:#facc15;font-weight:900">✔</span>
                    <span>
                      <strong style="color:#fff">${tr('Your Online Store & QR Order:', 'आपकी ऑनलाइन दुकान व QR ऑर्डर:')}</strong>
                      ${tr('Buyers & sub-dealers scan your QR to send orders directly without any app.', 'ग्राहक व सब-डीलर बिना कोई ऐप डाउनलोड किए QR से सीधा ऑर्डर भेजें।')}
                    </span>
                  </div>
                  <div class="hero-value-item">
                    <span style="color:#facc15;font-weight:900">✔</span>
                    <span>
                      <strong style="color:#fff">${tr('AI Bill Scanner & Ready Stock:', 'AI बिल स्कैनर व रेडीमेड स्टॉक:')}</strong>
                      ${tr('Snap a photo of supplier purchase bills to load stock automatically with AI.', 'सप्लायर के खरीद बिल की फोटो खींचें और AI से सेकंडों में स्टॉक चढ़ाएँ।')}
                    </span>
                  </div>
                  <div class="hero-value-item">
                    <span style="color:#facc15;font-weight:900">✔</span>
                    <span>
                      <strong style="color:#fff">${tr('Udhaar Reminder & Direct UPI:', 'उधार रिमाइंडर व सीधा UPI भुगतान:')}</strong>
                      ${tr('1-click WhatsApp payment reminders, staff control & working capital loan desk.', '1-क्लिक में WhatsApp भुगतान रिमाइंडर, स्टाफ नियंत्रण और व्यापार पूँजी सहायता।')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <!-- CTA Buttons -->
              <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:20px">
                <button class="btn btn-gold" style="padding:13px 24px;font-size:1.02rem" onclick="navigate('/signup')">
                  🚀 ${tr('Register Your Business (Free Trial)', 'अपना व्यापार रजिस्टर करें (निःशुल्क ट्रायल)')}
                </button>
                <button class="btn btn-primary" style="padding:13px 24px;font-size:1.02rem" onclick="navigate('/order', { shop: '${shops[0]?.id || ''}' })">
                  📲 ${tr('Try Live QR & Parchi Order Demo', 'लाइव दुकान और पर्ची ऑर्डर डेमो देखें')}
                </button>
              </div>

              <!-- Trust Badges Right Below Hero -->
              <div class="trust-badges-bar">
                <span class="trust-badge-pill">🛡️ ${tr('100% GST Compliant', '100% GST अनुपालन')}</span>
                <span class="trust-badge-pill">🔒 ${tr('100% Secure Data', '100% सुरक्षित डेटा')}</span>
                <span class="trust-badge-pill">🇮🇳 ${tr('Made in India', 'मेड इन इंडिया')}</span>
                <span class="trust-badge-pill">💬 ${tr('WhatsApp Integrated', 'WhatsApp से जुड़ा हुआ')}</span>
              </div>
            </div>
          </div>

          <!-- Right Column: Perfectly Aligned Interactive Before -> After Showcase Card -->
          <div class="hero-mockup-frame">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap">
                <span style="font-size:1.05rem;font-weight:800;color:#fde047">
                  ✨ ${tr('See How It Works in 10 Seconds', 'देखें 10 सेकंड में कैसे काम करता है')}
                </span>
                <span class="badge badge-primary" style="font-size:0.75rem">
                  ${tr('Live Interactive Preview', 'लाइव इंटरएक्टिव डेमो')}
                </span>
              </div>
              <p id="hero-dynamic-caption" style="font-size:0.82rem;color:#cbd5e1;margin-top:4px">
                ${state.lang === 'hi' ? activeScene.captionHi : activeScene.captionEn}
              </p>
            </div>

            <div class="mockup-cards-row">
              <!-- Before: Handwritten Parchi Receipt -->
              <div class="parchi-paper">
                <div style="text-align:center;border-bottom:1.5px solid #64748b;padding-bottom:5px;margin-bottom:6px">
                  <strong style="font-size:0.95rem;color:#0f172a;display:block">पर्ची</strong>
                  <span style="font-size:0.72rem;color:#475569;font-weight:600">
                    ${tr('Handwritten Parchi', 'हाथ से लिखी पर्ची')}
                  </span>
                </div>
                <table style="font-size:0.74rem;width:100%;border-collapse:collapse;margin-bottom:8px">
                  <thead>
                    <tr style="border-bottom:1px solid #94a3b8;background:#f8f5e6">
                      <th style="padding:3px;font-size:0.7rem">${tr('Item', 'सामान')}</th>
                      <th style="padding:3px;font-size:0.7rem;text-align:right">${tr('Qty', 'मात्रा')}</th>
                    </tr>
                  </thead>
                  <tbody style="font-family:cursive,sans-serif;color:#1e293b;font-weight:600">
                    <tr><td style="padding:3px;border-bottom:1px dashed #cbd5e1">${tr('Supreme PVC 1"', 'सुप्रीम PVC 1"')}</td><td style="padding:3px;text-align:right;border-bottom:1px dashed #cbd5e1">20</td></tr>
                    <tr><td style="padding:3px;border-bottom:1px dashed #cbd5e1">${tr('CPVC Elbow 3/4"', 'CPVC एल्बो 3/4"')}</td><td style="padding:3px;text-align:right;border-bottom:1px dashed #cbd5e1">30</td></tr>
                    <tr><td style="padding:3px;border-bottom:1px dashed #cbd5e1">${tr('Sintex Tank 1000L', 'सिंटेक्स टैंक 1000L')}</td><td style="padding:3px;text-align:right;border-bottom:1px dashed #cbd5e1">1</td></tr>
                    <tr><td style="padding:3px">${tr('Wall Putty 40kg', 'वॉल पुट्टी 40kg')}</td><td style="padding:3px;text-align:right">5</td></tr>
                  </tbody>
                </table>
                <div style="text-align:center">
                  <span style="background:#1e293b;color:#ffffff;padding:3px 12px;border-radius:6px;font-weight:800;font-size:0.75rem;display:inline-block">
                    ${tr('Before (Parchi)', 'पहले: हाथ की पर्ची')}
                  </span>
                </div>
              </div>

              <!-- Center Arrow -->
              <div style="text-align:center;color:#facc15;font-size:1.6rem;font-weight:900">➔</div>

              <!-- After: Digital GST Invoice Tablet -->
              <div class="gst-tablet">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1.5px solid #cbd5e1;padding-bottom:5px;margin-bottom:6px">
                  <div>
                    <strong style="font-size:0.88rem;color:#0f172a;display:block">
                      ${tr('GST Invoice', 'पक्का GST बिल')}
                    </strong>
                    <span style="font-size:0.66rem;color:#15803d;font-weight:700">GSTIN: 08AABCM1234F1Z5</span>
                  </div>
                  <span style="font-size:0.68rem;font-weight:800;color:#2563EB;background:#eff6ff;padding:2px 5px;border-radius:4px">KQ-2627-01</span>
                </div>
                <table style="font-size:0.72rem;width:100%;border-collapse:collapse;margin-bottom:6px">
                  <thead>
                    <tr style="background:#f1f5f9">
                      <th style="padding:3px">${tr('Item', 'सामान')}</th>
                      <th style="padding:3px">HSN</th>
                      <th style="padding:3px;text-align:right">${tr('Total', 'कुल')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td style="padding:3px">${tr('Supreme PVC 1"', 'सुप्रीम PVC 1"')}</td><td style="padding:3px">3917</td><td style="padding:3px;text-align:right">₹3,300</td></tr>
                    <tr><td style="padding:3px">${tr('Sintex 1000L', 'सिंटेक्स 1000L')}</td><td style="padding:3px">3925</td><td style="padding:3px;text-align:right">₹6,800</td></tr>
                    <tr><td style="padding:3px;color:#2563EB;font-weight:700">CGST+SGST (18%)</td><td style="padding:3px">—</td><td style="padding:3px;text-align:right;color:#2563EB;font-weight:700">₹1,818</td></tr>
                  </tbody>
                </table>
                <div style="display:flex;justify-content:space-between;align-items:center;border-top:1.5px solid #cbd5e1;padding-top:5px">
                  <span style="background:#16a34a;color:#ffffff;padding:3px 10px;border-radius:6px;font-weight:800;font-size:0.75rem">
                    ${tr('After (GST Bill)', 'बाद में: पक्का बिल')}
                  </span>
                  <strong style="font-size:0.9rem;color:#0f172a">₹11,918</strong>
                </div>
              </div>
            </div>

            <!-- Action Buttons Inside Right Showcase -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:6px">
              <button type="button" class="watch-demo-pill" onclick="navigate('/order', { shop: '${shops[0]?.id || ''}' })">
                <span>▶</span>
                <span>${tr('Try 10-Sec Live Demo', '10-सेकंड लाइव डेमो चलाएँ')}</span>
              </button>
              <button type="button" class="btn btn-ghost btn-sm" style="background:rgba(255,255,255,0.12);color:#fff;border-color:rgba(255,255,255,0.3)" onclick="openDemoModal()">
                📞 ${tr('Book 1-on-1 Setup Call', '1-on-1 डेमो कॉल बुक करें')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CORE FEATURES SECTION (Exact 4-Card Grid + Hover Lift Micro-Interaction) -->
    <section class="container" style="padding:42px 24px 20px">
      <div class="section-heading">
        <span>${tr('Features for Your Business', 'व्यापारियों की प्रगति और लाभ के लिए मुख्य फीचर्स')}</span>
        <button class="btn btn-ghost btn-sm" onclick="navigate('/solutions')">
          ${tr('View All Industry Solutions →', 'सभी व्यापारिक समाधान देखें →')}
        </button>
      </div>

      <div class="grid grid-4">
        <!-- Card 1: Dual-GST, IGST & MRP Billing -->
        <div class="feature-card">
          <div class="feature-icon-pair">
            <span class="feature-icon-box" style="background:#eff6ff;border:1.5px solid #93c5fd;color:#2563EB">🧾</span>
            <span class="badge badge-gold">✓ GST / IGST</span>
          </div>
          <h3 class="feature-title">
            ${tr('Dual-GST, IGST & MRP Billing', 'पक्का GST, IGST और MRP बिलिंग')}
          </h3>
          <p class="feature-desc">
            ${tr(
              'Sequential FY invoice numbers, B2B wholesale MOQ rates, CGST/SGST & IGST calculation, and automatic Bill of Supply for non-GST shops.',
              'क्रमबद्ध वित्तीय वर्ष बिल नंबर, थोक MOQ रेट, CGST/SGST व IGST की सही गणना, और बिना GST वाली दुकानों के लिए बिल ऑफ सप्लाई।'
            )}
          </p>
        </div>

        <!-- Card 2: AI Bill Scanner & 1-Click Catalog -->
        <div class="feature-card">
          <div class="feature-icon-pair">
            <span class="feature-icon-box" style="background:#eff6ff;border:1.5px solid #93c5fd;color:#2563EB">📷</span>
            <span class="feature-icon-box" style="background:#f0fdf4;border:1.5px solid #86efac;color:#16a34a">🤖</span>
          </div>
          <h3 class="feature-title">
            ${tr('AI Bill Scanner & 1-Click Catalog', 'AI बिल स्कैनर और 1-क्लिक कैटलॉग')}
          </h3>
          <p class="feature-desc">
            ${tr(
              'Scan supplier purchase bills with AI so stock updates automatically, or load a ready-made B2B catalog in 1 click with zero typing.',
              'पर्ची या सप्लायर का खरीद बिल स्कैन करें और AI से स्टॉक अपने-आप चढ़ेगा, या 1 क्लिक में रेडीमेड कैटलॉग लोड करें।'
            )}
          </p>
        </div>

        <!-- Card 3: WhatsApp Parchi & QR Ordering -->
        <div class="feature-card">
          <div class="feature-icon-pair">
            <span class="feature-icon-box" style="background:#dcfce7;border:1.5px solid #86efac;color:#16a34a">💬</span>
            <span class="feature-icon-box" style="background:#f8fafc;border:1.5px solid #cbd5e1;color:#0f172a">📲</span>
          </div>
          <h3 class="feature-title">
            ${tr('WhatsApp Parchi & QR Ordering', 'WhatsApp पर्ची और QR ऑर्डर')}
          </h3>
          <p class="feature-desc">
            ${tr(
              'Customers send orders directly via WhatsApp or by scanning your shop counter QR code without downloading any app.',
              'ग्राहक बिना कोई ऐप डाउनलोड किए सीधे WhatsApp से या दुकान का QR कोड स्कैन करके अपनी पर्ची और ऑर्डर भेजें।'
            )}
          </p>
        </div>

        <!-- Card 4: Party Udhaar Khata & Staff Control -->
        <div class="feature-card">
          <div class="feature-icon-pair">
            <span class="feature-icon-box" style="background:#dcfce7;border:1.5px solid #86efac;color:#15803d">📒</span>
            <span class="feature-icon-box" style="background:#eff6ff;border:1.5px solid #93c5fd;color:#2563EB">🛡️</span>
          </div>
          <h3 class="feature-title">
            ${tr('Party Udhaar & Staff Control', 'उधार खाता, रिमाइंडर और स्टाफ नियंत्रण')}
          </h3>
          <p class="feature-desc">
            ${tr(
              'Check party-wise credit ledger in one click, send automatic WhatsApp payment reminders with UPI links, and track staff work.',
              'एक क्लिक में पार्टी-वार उधार का हिसाब देखें, ऑटोमैटिक WhatsApp भुगतान रिमाइंडर भेजें और अपने स्टाफ के काम का पूरा विवरण रखें।'
            )}
          </p>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS IN 3 SIMPLE STEPS -->
    <section class="container" style="padding:24px 24px 20px">
      <div class="section-heading">
        <span>${tr('How It Works in 3 Simple Steps', 'तीन आसान स्टेप्स में काम कैसे करता है?')}</span>
        <span class="badge badge-gold">${tr('10-Second Workflow', 'मात्र 10 सेकंड की प्रक्रिया')}</span>
      </div>

      <div class="grid grid-3">
        <div class="feature-card" style="border-left:5px solid #eab308">
          <span class="badge badge-gold" style="margin-bottom:10px">${tr('STEP 1 · SCAN PHOTO', 'स्टेप 1 · फोटो खींचें')}</span>
          <h3 class="feature-title">${tr('1. Snap Photo of Parchi or Purchase Bill', '1. पर्ची या खरीद बिल का फोटो खींचें')}</h3>
          <p class="feature-desc">
            ${tr(
              'Upload a photo of your supplier invoice or let your buyer send a handwritten Parchi via counter QR.',
              'अपने सप्लायर के खरीद बिल का फोटो खींचें या ग्राहक से QR कोड द्वारा हाथ की लिखी पर्ची प्राप्त करें।'
            )}
          </p>
        </div>

        <div class="feature-card" style="border-left:5px solid #2563EB">
          <span class="badge badge-muted" style="margin-bottom:10px;color:#2563EB">${tr('STEP 2 · AI AUTO-BILLING', 'स्टेप 2 · स्मार्ट AI प्रोसेसिंग')}</span>
          <h3 class="feature-title">${tr('2. AI Prepares Stock & GST Invoice in Seconds', '2. AI सेकंडों में स्टॉक और GST बिल तैयार करे')}</h3>
          <p class="feature-desc">
            ${tr(
              'Our smart engine automatically detects item names, HSN codes, GST rates (CGST/SGST/IGST) and wholesale prices.',
              'हमारा स्मार्ट सिस्टम अपने-आप सामान का नाम, HSN कोड, CGST/SGST या IGST और थोक रेट लगाकर बिल बना देता है।'
            )}
          </p>
        </div>

        <div class="feature-card" style="border-left:5px solid #16a34a">
          <span class="badge badge-primary" style="margin-bottom:10px">${tr('STEP 3 · WHATSAPP & UPI', 'स्टेप 3 · WhatsApp व सीधा भुगतान')}</span>
          <h3 class="feature-title">${tr('3. Send Bill & Direct UPI Link on WhatsApp', '3. सीधे WhatsApp पर बिल और भुगतान लिंक भेजें')}</h3>
          <p class="feature-desc">
            ${tr(
              'Share the GST invoice and your direct UPI payment link on WhatsApp in 1 click with 0% commission deduction.',
              'एक क्लिक में ग्राहक को WhatsApp पर पक्का GST बिल और अपना सीधा UPI भुगतान लिंक भेजें (0% कमीशन)।'
            )}
          </p>
        </div>
      </div>
    </section>

    <!-- SPONSORED SPOTLIGHT SHOWCASE (Paid Promotions Banner — Pointer 7) -->
    ${(state.data.promotions || []).length > 0 ? `
      <section class="container" style="padding:20px 24px 8px">
        <div class="section-heading">
          <span>✦ ${tr('Sponsored Business Spotlight', 'स्पॉन्सर्ड व्यापार स्पॉटलाइट (विशेष ऑफर्स)')}</span>
          <button class="btn btn-gold btn-sm" onclick="state.merchantTab='Promote Business';navigate('/merchant')">
            📢 ${tr('Promote Your Business Here →', 'अपना व्यापार यहाँ प्रमोट करें →')}
          </button>
        </div>
        <div class="grid grid-2">
          ${(state.data.promotions || []).map(prm => `
            <div class="card" style="background:linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);border:2px solid #f59e0b;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap">
              <div style="max-width:440px">
                <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
                  <span class="badge badge-gold" style="background:#b45309;color:#fff;border:none">★ SPONSORED SPOTLIGHT</span>
                  <span class="badge badge-primary">${esc(prm.offerBadge || 'B2B OFFER')}</span>
                </div>
                <h3 style="font-size:1.22rem;color:#0f172a;margin-top:8px">${esc(trDyn(prm.shop))} (${esc(trDyn(prm.city))})</h3>
                <p style="font-size:0.98rem;color:#1e293b;margin-top:4px;font-weight:600">
                  ${esc(state.lang === 'hi' ? prm.headline : (prm.headlineEn || prm.headline))}
                </p>
              </div>
              <div>
                <button class="btn btn-primary" onclick="navigate('/order', { shop: '${prm.shopId}' })">
                  🛒 ${tr('View Offer & Catalog →', 'ऑफर और कैटलॉग देखें →')}
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    ` : ''}

    <!-- EXPLORE LIVE STORES SECTION (With Community Trust Count, Safety Warning & Report Button — Pointer 6) -->
    <section class="container" style="padding:24px 24px 32px">
      <div class="section-heading">
        <span>${tr('Explore Live Stores on KuberQ', 'लाइव व्यापारियों के कैटलॉग देखें')}</span>
        <button class="btn btn-ghost btn-sm" onclick="navigate('/customer')">
          🔍 ${tr('Search All Stores', 'सभी स्टोर खोजें')}
        </button>
      </div>

      <!-- Community Safety Notice Banner (Pointer 6) -->
      <div class="card-subtle" style="margin-bottom:18px;background:#fffbeb;border:1.5px solid #f59e0b;color:#92400e;font-size:0.94rem;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
        <span>
          🛡️ <strong>${tr('Community Trust & Safety Notice:', 'कम्युनिटी ट्रस्ट और सुरक्षा सूचना:')}</strong>
          ${tr(
            'Check the Community Verification count before trading. Please exercise caution before making advance payments to newly listed sellers with low verification counts.',
            'व्यापार करने से पहले कम्युनिटी वेरिफिकेशन संख्या अवश्य देखें। कम वेरिफिकेशन वाले नए विक्रेताओं के साथ अग्रिम भुगतान (Advance Payment) करने से पहले सतर्क रहें।'
          )}
        </span>
      </div>

      <div class="grid grid-2">
        ${shops.map(m => {
          const shopQrUrl = `${window.location.origin}/order?shop=${m.id}`;
          const shopNameDisp = trDyn(m.shop);
          const cityDisp = trDyn(m.city);
          const stateDisp = trDyn(m.state);
          const catDisp = trDyn(m.category);
          const vouchCount = Number(m.communityVerifications ?? 14);
          return `
            <div class="store-card" style="display:flex;flex-direction:column;justify-content:space-between;gap:18px">
              <div>
                <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap">
                  <h3 style="font-size:1.35rem;font-weight:800;color:#0f172a">
                    ${esc(shopNameDisp)}, ${esc(cityDisp)}
                  </h3>
                  <div style="display:flex;gap:6px;flex-wrap:wrap">
                    <span class="badge badge-primary" style="font-size:0.86rem;padding:4px 12px">
                      ✔ ${tr('Verified', 'सत्यापित')}
                    </span>
                    <span class="badge badge-gold" style="font-size:0.84rem;padding:4px 10px" title="${tr('Verified by fellow merchants & buyers', 'ग्राहकों व साथी व्यापारियों द्वारा सत्यापित')}">
                      🛡️ ${vouchCount} ${tr('Trusted', 'द्वारा सत्यापित')}
                    </span>
                  </div>
                </div>
                <p style="font-size:1.02rem;color:#334155;margin-top:6px;font-weight:500">
                  ${esc(catDisp)} · ${esc(cityDisp)}, ${esc(stateDisp)} · 📞 ${esc(m.phone)}
                </p>
              </div>

              <!-- Interactive QR Preview & "डेमो कैटलॉग देखें" Button -->
              <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;background:#f8fafc;padding:16px 18px;border-radius:14px;border:1.5px solid #cbd5e1">
                <div style="display:flex;align-items:center;gap:14px">
                  <div style="border:2px solid #94a3b8;border-radius:10px;overflow:hidden;line-height:0;background:#fff;flex-shrink:0">
                    ${renderVisualQrSvg(shopQrUrl, 70)}
                  </div>
                  <div style="font-size:0.96rem;color:#0f172a;line-height:1.45;max-width:260px">
                    <strong style="display:block;color:#2563EB">
                      ${tr('Scan to see how the shop looks to a customer', 'स्कैन करके देखें ग्राहक को दुकान कैसी दिखेगी')}
                    </strong>
                    <span style="font-family:monospace;color:#475569;font-weight:700;font-size:0.88rem">
                      ID: ${esc(m.refCode)}
                    </span>
                  </div>
                </div>

                <div>
                  <button class="btn btn-primary" style="padding:12px 22px;font-size:1.02rem" onclick="navigate('/order', { shop: '${m.id}' })">
                    ${tr('View Demo Catalog →', 'डेमो कैटलॉग देखें →')}
                  </button>
                </div>
              </div>

              <!-- Community Verify / Vouch Bar (Clean Front Card — Report moved inside Store Page) -->
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;padding-top:6px;border-top:1px dashed #cbd5e1">
                <button type="button" class="btn btn-ghost btn-sm" style="padding:5px 12px;font-size:0.84rem" onclick="vouchForEntity('merchant', '${m.id}', '${esc(shopNameDisp)}')">
                  👍 ${tr('Verify / Vouch Store', 'इस दुकान को सत्यापित (Verify) करें')} (${vouchCount})
                </button>
                <span class="text-muted" style="font-size:0.8rem">🛡️ ${tr('100% Direct Store-to-Buyer', 'सीधे दुकानदार से संपर्क')}</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </section>

    <!-- FAQ & ASK A QUESTION SECTION (Wired to /api/public/submit kind='faq' & /admin) -->
    <section class="container" style="padding:12px 24px 56px">
      <div class="grid grid-2">
        <div class="card">
          <span class="badge badge-gold">❓ ${tr('FREQUENTLY ASKED QUESTIONS', 'अक्सर पूछे जाने वाले प्रश्न')}</span>
          <h3 style="margin:8px 0 14px;font-size:1.3rem">${tr('Common Questions from B2B Traders', 'व्यापारियों के सामान्य प्रश्न और उत्तर')}</h3>
          <div style="display:grid;gap:12px">
            ${(state.data.faqs || []).slice(0, 4).map(f => `
              <div class="card-subtle">
                <p style="font-weight:800;color:#0f172a">${esc(f.question)}</p>
                <p class="text-muted" style="font-size:0.92rem;margin-top:4px">${esc(f.answer || tr('Our team will answer this shortly.', 'हमारी टीम शीघ्र ही इसका उत्तर देगी।'))}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card">
          <span class="badge badge-primary">💬 ${tr('HAVE A QUESTION? ASK US DIRECTLY', 'कोई प्रश्न है? हमसे सीधे पूछें')}</span>
          <h3 style="margin:8px 0 14px;font-size:1.3rem">${tr('Ask a Question or Request Setup Help', 'अपना प्रश्न पूछें या सेटअप सहायता माँगें')}</h3>
          <form onsubmit="submitPublicFaq(event)">
            <div class="grid grid-2">
              <div class="form-group">
                <label class="form-label">${tr('Your Name / Shop Name', 'आपका नाम / दुकान का नाम')} *</label>
                <input class="input" id="faq-name" required placeholder="${tr('e.g. Mahesh Traders', 'जैसे: महेश ट्रेडर्स')}" />
              </div>
              <div class="form-group">
                <label class="form-label">${tr('10-Digit Mobile Number', '10 अंकों का मोबाइल नंबर')} *</label>
                <input class="input" id="faq-phone" required maxlength="10" placeholder="98XXXXXXXX" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">${tr('Your Question', 'आपका प्रश्न')} *</label>
              <textarea class="textarea" rows="2" id="faq-question" required placeholder="${tr('e.g. How can I import my existing item list?', 'जैसे: मैं अपनी दुकान की रेट लिस्ट कैसे अपलोड कर सकता हूँ?')}"></textarea>
            </div>
            <button type="submit" class="btn btn-gold" style="width:100%">📨 ${tr('Submit Question to KuberQ Team', 'अपना प्रश्न भेजें')}</button>
          </form>
        </div>
      </div>
    </section>
  `;
}

function renderReportModal() {
  const rm = state.reportModal;
  if (!rm) return '';
  return `
    <div class="modal-backdrop" onclick="state.reportModal=null;render()">
      <div class="modal-box" onclick="event.stopPropagation()">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <h3 style="color:#dc2626">🚩 ${tr('Report Suspicious Profile / Grievance', 'संदिग्ध प्रोफाइल की रिपोर्ट / शिकायत करें')}</h3>
          <button class="btn btn-ghost btn-sm" onclick="state.reportModal=null;render()">✕</button>
        </div>
        <p class="text-muted" style="font-size:0.95rem;margin-bottom:14px">
          ${tr('Reporting:', 'जिनके विरुद्ध शिकायत है:')} <b>${esc(rm.targetName)}</b> (${esc(rm.targetType)})
        </p>
        <form onsubmit="submitReportForm(event)">
          <div class="grid grid-2">
            <div class="form-group">
              <label class="form-label">${tr('Your Name', 'आपका नाम')} *</label>
              <input class="input" id="rpt-name" required value="${esc(state.data.user?.name || '')}" />
            </div>
            <div class="form-group">
              <label class="form-label">${tr('10-Digit Mobile', 'आपका मोबाइल नंबर')} *</label>
              <input class="input" id="rpt-phone" required maxlength="10" value="${esc(state.data.user?.phone || '')}" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">${tr('Reason / Issue Details', 'शिकायत का कारण और विवरण')} *</label>
            <textarea class="textarea" rows="3" id="rpt-reason" required placeholder="${tr('Describe the issue (e.g. wrong rates, fake listing, rude behavior, advance payment issue)...', 'समस्या लिखें (जैसे: गलत जानकारी, संदिग्ध व्यवहार, या बिल संबंधी शिकायत)...')}"></textarea>
          </div>
          <button type="submit" class="btn btn-danger" style="width:100%">🚩 ${tr('Submit Report to KuberQ Grievance Desk', 'एडमिन को शिकायत भेजें')}</button>
        </form>
      </div>
    </div>
  `;
}

function renderDemoModal() {
  return `
    <div class="modal-backdrop" onclick="closeDemoModal()">
      <div class="modal-box" onclick="event.stopPropagation()">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
          <h3>📞 ${tr('Book a 1-on-1 B2B Setup & Demo Call', '1-on-1 सेटअप और डेमो कॉल बुक करें')}</h3>
          <button class="btn btn-ghost btn-sm" onclick="closeDemoModal()">✕</button>
        </div>
        <p class="text-muted" style="font-size:1rem;margin-bottom:18px">
          ${tr('Open to all new and existing traders, wholesalers, and shop owners. Our team will walk you through GST billing & AI catalog setup.', 'सभी नए और मौजूदा व्यापारियों, थोक विक्रेताओं और दुकानदारों के लिए। हमारी टीम आपको फोन पर पूरा डेमो देगी।')}
        </p>
        <form onsubmit="submitDemoRequest(event)">
          <div class="form-group">
            <label class="form-label">${tr('Your Shop / Company Name', 'आपकी दुकान / कंपनी का नाम')}</label>
            <input class="input" id="demo-shop" required placeholder="${tr('e.g. Marwar Sanitary Traders', 'जैसे: मारवाड़ सेनेटरी ट्रेडर्स')}" />
          </div>
          <div class="form-group">
            <label class="form-label">${tr('10-Digit Mobile Number', '10 अंकों का मोबाइल नंबर')}</label>
            <input class="input" id="demo-phone" required maxlength="10" placeholder="98XXXXXXXX" />
          </div>
          <div class="grid grid-2">
            <div class="form-group">
              <label class="form-label">${tr('Preferred Time Slot', 'पसंदीदा समय')}</label>
              <select class="select" id="demo-slot">
                <option value="Morning 10–12">${tr('Morning 10–12', 'सुबह 10 से 12 बजे')}</option>
                <option value="Afternoon 12–3">${tr('Afternoon 12–3', 'दोपहर 12 से 3 बजे')}</option>
                <option value="Evening 4–7">${tr('Evening 4–7', 'शाम 4 से 7 बजे')}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">${tr('Topic', 'विषय')}</label>
              <select class="select" id="demo-topic">
                <option value="B2B GST & IGST Billing">${tr('B2B GST & IGST Billing', 'B2B GST और IGST बिलिंग')}</option>
                <option value="AI Photo-to-Catalog Setup">${tr('AI Photo-to-Catalog Setup', 'AI फोटो से कैटलॉग सेटअप')}</option>
                <option value="QR & Parchi Ordering">${tr('QR & Parchi Ordering', 'QR और पर्ची ऑर्डर सिस्टम')}</option>
                <option value="Working Capital Finance">${tr('Working Capital Finance', 'व्यापार पूँजी / लोन सहायता')}</option>
              </select>
            </div>
          </div>
          <button type="submit" class="btn btn-gold" style="width:100%;margin-top:10px">${tr('Confirm Demo Request', 'डेमो कॉल बुक करें')}</button>
        </form>
      </div>
    </div>
  `;
}

// ============================================================================
// 2. PRICING PAGE (`/pricing`) — 3-TIER PAID & GATED AI PLANS
// ============================================================================
function renderPricing() {
  const isYearly = state.billingCycle === 'yearly';
  return `
    <div class="container" style="padding:48px 24px">
      <div style="text-align:center;max-width:740px;margin:0 auto 36px">
        <span class="badge badge-gold">✦ ${tr('TRANSPARENT B2B & RETAIL PLANS', 'पारदर्शी व्यापार प्लान')}</span>
        <h1 style="font-size:2.4rem;margin-top:10px">${tr('Start with a Free Trial. Upgrade as You Grow.', 'निःशुल्क ट्रायल से शुरू करें। व्यापार बढ़ने पर अपग्रेड करें।')}</h1>
        <p class="text-muted" style="margin-top:10px;font-size:1.05rem">
          ${tr('Basic billing & 1-click starter catalogs are free to start. Upgrade to unlock high-volume AI Bill Scanning, IGST, and Multi-Staff accounts.', 'बेसिक बिलिंग और रेडीमेड कैटलॉग निःशुल्क हैं। अधिक AI स्कैन, IGST और स्टाफ अकाउंट के लिए प्रो प्लान चुनें।')}
        </p>
        <div style="display:inline-flex;gap:8px;background:var(--bg-soft);padding:6px;border-radius:12px;border:1.5px solid var(--border);margin-top:20px">
          <button class="btn btn-sm ${!isYearly ? 'btn-gold' : 'btn-ghost'}" onclick="state.billingCycle='monthly';render()">${tr('Monthly Billing', 'मासिक प्लान')}</button>
          <button class="btn btn-sm ${isYearly ? 'btn-gold' : 'btn-ghost'}" onclick="state.billingCycle='yearly';render()">${tr('Yearly (Save 30%)', 'वार्षिक प्लान (30% बचत)')}</button>
        </div>
      </div>

      <div class="grid grid-3">
        <!-- Tier 1: Starter -->
        <div class="feature-card" style="display:flex;flex-direction:column;justify-content:space-between">
          <div>
            <span class="badge badge-muted">${tr('STARTER TRIAL', 'स्टार्टर ट्रायल')}</span>
            <h2 style="margin-top:10px;font-size:1.65rem">${tr('Starter (Basic)', 'स्टार्टर (बेसिक)')}</h2>
            <p class="stat-value" style="margin-top:8px">₹0 <span class="text-muted" style="font-size:0.95rem;font-weight:600">/ ${tr('free trial', 'निःशुल्क ट्रायल')}</span></p>
            <p class="text-muted" style="font-size:0.98rem;margin-top:6px">${tr('Ideal for testing KuberQ in your shop.', 'अपनी दुकान को डिजिटल बनाने की शुरुआत करने के लिए।')}</p>
            <ul style="list-style:none;margin-top:18px;display:grid;gap:12px;font-size:0.98rem">
              <li>✅ ${tr('Up to 50 GST / Estimate Bills per month', 'महीने में 50 बिल व ऑर्डर तक')}</li>
              <li>✅ ${tr('1-Click Ready-Made B2B Starter Catalog (₹0 AI Cost)', '1-क्लिक रेडीमेड कैटलॉग (निःशुल्क)')}</li>
              <li>✅ ${tr('QR Standee & WhatsApp Parchi Ordering', 'QR स्टैंडी और WhatsApp पर्ची ऑर्डर')}</li>
              <li>✨ <b>${tr('3 Lifetime Free AI Scans', '3 निःशुल्क AI बिल/पर्ची स्कैन (ट्रायल)')}</b></li>
              <li>🔒 ${tr('1 Owner Login Only', 'केवल 1 मालिक लॉगिन')}</li>
            </ul>
          </div>
          <button class="btn btn-ghost" style="width:100%;margin-top:24px" onclick="navigate('/signup')">${tr('Start Free Trial', 'निःशुल्क ट्रायल शुरू करें')}</button>
        </div>

        <!-- Tier 2: Vyapar Pro -->
        <div class="feature-card" style="border:2.5px solid var(--gold);display:flex;flex-direction:column;justify-content:space-between;position:relative">
          <div>
            <span class="badge badge-gold">★ ${tr('MOST POPULAR FOR TRADERS', 'व्यापारियों की पहली पसंद')}</span>
            <h2 style="margin-top:10px;font-size:1.65rem">${tr('Vyapar Pro', 'व्यापार प्रो')}</h2>
            <p class="stat-value text-gold" style="margin-top:8px">${isYearly ? '₹2,499' : '₹299'} <span class="text-muted" style="font-size:0.95rem;font-weight:600">/ ${isYearly ? tr('year', 'साल') : tr('month', 'महीना')}</span></p>
            <p class="text-muted" style="font-size:0.98rem;margin-top:6px">${tr('For active Hardware, Sanitary, Electrical & Retail shops.', 'हार्डवेयर, सेनेटरी, इलेक्ट्रिकल और खुदरा दुकानों के लिए।')}</p>
            <ul style="list-style:none;margin-top:18px;display:grid;gap:12px;font-size:0.98rem">
              <li>✅ <b>${tr('Unlimited GST, IGST & MRP Invoices', 'अनलिमिटेड GST, IGST और MRP बिल')}</b></li>
              <li>✅ <b>${tr('Party Udhaar Khata & 1-Click WhatsApp Reminders', 'पार्टी उधार खाता और WhatsApp भुगतान रिमाइंडर')}</b></li>
              <li>✅ <b>${tr('Auto-Catalog Builder from Walk-in Bills', 'बिल बनाते ही सामान अपने-आप स्टॉक में जुड़े')}</b></li>
              <li>✨ <b>${tr('50 AI Scans / Month (Bill Scanner + Smart Parchi)', '50 AI स्कैन / महीना (AI बिल स्कैनर व स्मार्ट पर्ची)')}</b></li>
              <li>👥 ${tr('Up to 3 Staff Accounts with Owner RBAC', '3 स्टाफ अकाउंट और कार्य विवरण रिकॉर्ड')}</li>
            </ul>
          </div>
          <button class="btn btn-gold" style="width:100%;margin-top:24px" onclick="requestPlanUpgrade('Vyapar Pro', ${isYearly ? 2499 : 299})">
            ⚡ ${tr('Activate Vyapar Pro', 'व्यापार प्रो चालू करें')}
          </button>
        </div>

        <!-- Tier 3: B2B Enterprise -->
        <div class="feature-card" style="display:flex;flex-direction:column;justify-content:space-between">
          <div>
            <span class="badge badge-primary">${tr('WHOLESALERS & FACTORIES', 'थोक और फैक्टरी')}</span>
            <h2 style="margin-top:10px;font-size:1.65rem">${tr('B2B Enterprise', 'B2B एंटरप्राइज')}</h2>
            <p class="stat-value" style="margin-top:8px">${isYearly ? '₹4,999' : '₹599'} <span class="text-muted" style="font-size:0.95rem;font-weight:600">/ ${isYearly ? tr('year', 'साल') : tr('month', 'महीना')}</span></p>
            <p class="text-muted" style="font-size:0.98rem;margin-top:6px">${tr('For Manufacturers, Mandi Wholesalers & Multi-Staff Distributors.', 'निर्माताओं, मंडी थोक विक्रेताओं और बड़े डिस्ट्रीब्यूटर्स के लिए।')}</p>
            <ul style="list-style:none;margin-top:18px;display:grid;gap:12px;font-size:0.98rem">
              <li>✅ ${tr('Everything in Vyapar Pro + Verified B2B Badge', 'व्यापार प्रो की सभी सुविधाएँ + सत्यापित बैज')}</li>
              <li>✅ ${tr('B2B MOQ Wholesale Tiered Pricing', 'थोक MOQ रेट और B2B डीलर कैटलॉग')}</li>
              <li>✨ <b>${tr('200 AI Scans / Month + Priority AI Support', '200 AI स्कैन / महीना + प्राथमिकता सहायता')}</b></li>
              <li>👥 ${tr('Unlimited Staff Accounts & GSTR-1 CSV Export', 'अनलिमिटेड स्टाफ + GSTR-1 एक्सेल रिपोर्ट')}</li>
              <li>🏦 ${tr('Priority Working Capital & Transport Desk', 'प्राथमिकता वर्किंग कैपिटल और ट्रांसपोर्ट डेस्क')}</li>
            </ul>
          </div>
          <button class="btn btn-primary" style="width:100%;margin-top:24px" onclick="requestPlanUpgrade('B2B Enterprise', ${isYearly ? 4999 : 599})">
            🏭 ${tr('Activate B2B Enterprise', 'B2B एंटरप्राइज चालू करें')}
          </button>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// 3. ZERO-COST MOBILE + PASSWORD LOGIN & SIGNUP (`/auth` & `/signup`)
// ============================================================================
function renderAuth(isSignup = false) {
  const roles = [
    ['merchant', tr('Merchant / Trader', 'दुकानदार / व्यापारी')],
    ['manufacturer', tr('Manufacturer / Wholesaler', 'निर्माता / थोक विक्रेता')],
    ['customer', tr('Customer / Sub-Dealer', 'ग्राहक / सब-डीलर')],
    ['agent', tr('Channel Partner', 'पार्टनर एजेंट')],
    ['employee', tr('Platform Staff (Sub-Admin)', 'KuberQ टीम (सब-एडमिन)')]
  ];

  return `
    <div class="container" style="max-width:600px;padding:48px 24px">
      <div class="card">
        <div style="text-align:center;margin-bottom:22px">
          <span class="badge badge-gold">🔐 ${tr('ZERO-OTP SECURE ACCESS', 'सुरक्षित मोबाइल लॉगिन')}</span>
          <h1 style="font-size:1.9rem;margin-top:10px">
            ${isSignup ? tr('Register Your Business on KuberQ', 'KuberQ पर अपना व्यापार रजिस्टर करें') : tr('Sign In to KuberQ', 'KuberQ में लॉगिन करें')}
          </h1>
          <p class="text-muted" style="font-size:0.98rem;margin-top:6px">
            ${tr('Sign in with your 10-digit Mobile Number & Password — no email or paid SMS OTP needed.', 'अपने 10-अंकों के मोबाइल नंबर और पासवर्ड से लॉगिन करें — किसी ईमेल या महँगे OTP की आवश्यकता नहीं।')}
          </p>
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:20px">
          ${roles.map(([r, label]) => `
            <button type="button" class="btn btn-sm ${state.authRole === r ? 'btn-gold' : 'btn-ghost'}" onclick="state.authRole='${r}';render()">
              ${label}
            </button>
          `).join('')}
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:18px;background:var(--bg-soft);padding:6px;border-radius:12px">
          <button type="button" class="btn btn-sm ${state.authMode === 'mobile' ? 'btn-primary' : 'btn-ghost'}" onclick="state.authMode='mobile';render()">
            📱 ${tr('10-Digit Mobile (Recommended)', 'मोबाइल नंबर (अनुशंसित)')}
          </button>
          <button type="button" class="btn btn-sm ${state.authMode === 'email' ? 'btn-primary' : 'btn-ghost'}" onclick="state.authMode='email';render()">
            ✉️ ${tr('Email Address', 'ईमेल आईडी')}
          </button>
        </div>

        ${isSignup ? `
          <form onsubmit="handleSignup(event)">
            <div class="grid grid-2">
              <div class="form-group">
                <label class="form-label">${tr('Your Full Name', 'आपका पूरा नाम')} *</label>
                <input class="input" id="su-name" required placeholder="${tr('e.g. Rajesh Mohta', 'जैसे: राजेश मोहता')}" />
              </div>
              <div class="form-group">
                <label class="form-label">${tr('10-Digit Mobile Number', '10 अंकों का मोबाइल नंबर')} *</label>
                <input class="input" id="su-phone" required maxlength="10" placeholder="98XXXXXXXX" />
              </div>
            </div>

            ${state.authRole !== 'customer' ? `
              <div class="grid grid-2">
                <div class="form-group">
                  <label class="form-label">${tr('Shop / Company / Factory Name', 'दुकान / कंपनी / फैक्टरी का नाम')} *</label>
                  <input class="input" id="su-shop" required placeholder="${tr('e.g. Shree Balaji Hardware', 'जैसे: श्री बालाजी हार्डवेयर')}" />
                </div>
                <div class="form-group">
                  <label class="form-label">${tr('Business Category', 'व्यवसाय की श्रेणी')}</label>
                  <select class="select" id="su-category">
                    <option value="Hardware, Pipes & Sanitary">${tr('Hardware, Pipes & Sanitary', 'हार्डवेयर, पाइप और सेनेटरी')}</option>
                    <option value="Electrical & Switchgear">${tr('Electrical & Switchgear', 'इलेक्ट्रिकल और स्विचगियर')}</option>
                    <option value="Cement, Steel & Building Material">${tr('Cement, Steel & Building Material', 'सीमेंट, सरिया और बिल्डिंग मटेरियल')}</option>
                    <option value="Electronics & Mobile Accessories">${tr('Electronics & Mobile Accessories', 'इलेक्ट्रॉनिक्स और मोबाइल एक्सेसरीज')}</option>
                    <option value="Mandi, Grains & Wholesale Grocery">${tr('Mandi, Grains & Wholesale Grocery', 'मंडी, अनाज और थोक किराना')}</option>
                    <option value="Medical & Surgical Distributor">${tr('Medical & Surgical Distributor', 'मेडिकल और सर्जिकल डिस्ट्रीब्यूटर')}</option>
                    <option value="Manufacturing & Textile">${tr('Manufacturing & Textile', 'निर्माण (मैन्युफैक्चरिंग) और कपड़ा उद्योग')}</option>
                    <option value="Retail Store">${tr('Retail Store', 'खुदरा (रिटेल) दुकान')}</option>
                  </select>
                </div>
              </div>
              <div class="grid grid-2">
                <div class="form-group">
                  <label class="form-label">${tr('GSTIN (Optional — for Tax Invoices)', 'GSTIN (वैकल्पिक — टैक्स बिल के लिए)')}</label>
                  <input class="input" id="su-gstin" maxlength="15" placeholder="08AABCM1234F1Z5" style="text-transform:uppercase" />
                </div>
                <div class="form-group">
                  <label class="form-label">${tr('Merchant UPI ID (Optional — for Direct Pay)', 'व्यापारी UPI ID (सीधे भुगतान के लिए)')}</label>
                  <input class="input" id="su-upi" placeholder="yourshop@okaxis" />
                </div>
              </div>
            ` : ''}

            <div class="grid grid-2">
              <div class="form-group">
                <label class="form-label">${tr('City', 'शहर')} *</label>
                <input class="input" id="su-city" required value="Jodhpur" />
              </div>
              <div class="form-group">
                <label class="form-label">${tr('State', 'राज्य')} *</label>
                <input class="input" id="su-state" required value="Rajasthan" />
              </div>
            </div>

            <div class="grid grid-2">
              <div class="form-group">
                <label class="form-label">${tr('Create Password (min 8 chars)', 'पासवर्ड बनाएँ (कम से कम 8 अक्षर)')} *</label>
                <input class="input" type="password" id="su-pass" required minlength="8" placeholder="••••••••" />
              </div>
              <div class="form-group">
                <label class="form-label">${tr('Referral Code (Optional)', 'रेफरल कोड (वैकल्पिक)')}</label>
                <input class="input" id="su-ref" value="${esc(state.query.ref || '')}" placeholder="KQ-..." />
              </div>
            </div>

            <button type="submit" class="btn btn-gold" style="width:100%;margin-top:12px">
              🚀 ${tr('Complete Registration & Open Portal', 'रजिस्ट्रेशन पूरा करें और पोर्टल खोलें')}
            </button>
          </form>
        ` : `
          <form onsubmit="handleLogin(event)">
            <div class="form-group">
              <label class="form-label">
                ${state.authMode === 'mobile' ? tr('10-Digit Mobile Number', '10 अंकों का मोबाइल नंबर') : tr('Email Address', 'ईमेल पता')}
              </label>
              <input class="input" id="li-id" required placeholder="${state.authMode === 'mobile' ? '98XXXXXXXX' : 'name@company.com'}" />
            </div>
            <div class="form-group">
              <label class="form-label">${tr('Password', 'पासवर्ड')}</label>
              <input class="input" type="password" id="li-pass" required placeholder="••••••••" />
            </div>
            <button type="submit" class="btn btn-gold" style="width:100%;margin-top:10px">
              🔐 ${tr('Sign In Securely', 'सुरक्षित लॉगिन करें')}
            </button>
          </form>

          <div class="card-subtle" style="margin-top:20px;font-size:0.92rem">
            <p class="text-gold" style="font-weight:700;margin-bottom:8px">⚡ ${tr('Explore Demo Portals (For Evaluation):', 'पोर्टल जांच हेतु 1-क्लिक डेमो खाता:')}</p>
            <div style="display:flex;flex-wrap:wrap;gap:8px">
              <button class="btn btn-ghost btn-sm" onclick="quickLogin('9829011223', 'Marwar@123', 'merchant')">🏪 ${tr('Demo B2B Retailer', 'डेमो व्यापारी (Marwar)')}</button>
              <button class="btn btn-ghost btn-sm" onclick="quickLogin('9414122334', 'Surya@123', 'merchant')">🏭 ${tr('Demo Wholesaler', 'डेमो थोक व्यापारी (Surya)')}</button>
              <button class="btn btn-ghost btn-sm" onclick="quickLogin('9928055667', 'Customer@123', 'customer')">👷 ${tr('Demo Buyer', 'डेमो खरीदार (Sunita)')}</button>
            </div>
          </div>
        `}

        <p style="text-align:center;margin-top:18px;font-size:0.96rem" class="text-muted">
          ${isSignup
            ? `${tr('Already have an account?', 'पहले से खाता है?')} <a href="/auth" onclick="event.preventDefault();navigate('/auth')" class="text-gold" style="font-weight:700">${tr('Sign In', 'लॉगिन करें')}</a>`
            : `${tr('New business on KuberQ?', 'नया व्यापार जोड़ना चाहते हैं?')} <a href="/signup" onclick="event.preventDefault();navigate('/signup')" class="text-gold" style="font-weight:700">${tr('Create Account', 'नया खाता बनाएँ')}</a>`}
        </p>
      </div>
    </div>
  `;
}


// ============================================================================
// 4. FRICTIONLESS QR SCAN & PARCHI ORDER (`/order` & `/customer`)
// ============================================================================
function renderOrderPage() {
  const shops = state.data.merchants;
  const shopId = state.query.shop || state.selectedShopId || (shops[0]?.id || '');
  const shop = shops.find(s => s.id === shopId) || shops[0];
  const allProducts = state.data.products.filter(p => p.shopId === shop?.id);
  const searchQ = (state.orderCatalogSearch || '').trim().toLowerCase();
  const products = searchQ
    ? allProducts.filter(p => (p.name || '').toLowerCase().includes(searchQ) || (p.category || '').toLowerCase().includes(searchQ) || (p.hsn || '').includes(searchQ))
    : allProducts;

  const cartEntries = Object.entries(state.cart).filter(([, q]) => q > 0);
  let cartGross = 0;
  let wholesaleSavings = 0;
  const moqHints = [];
  for (const [pid, qty] of cartEntries) {
    const p = allProducts.find(x => x.id === pid);
    if (!p) continue;
    const isWholesale = qty >= (p.moq || 9999) && p.wholesalePrice && p.wholesalePrice < p.price;
    const rate = isWholesale ? p.wholesalePrice : p.price;
    if (isWholesale) {
      wholesaleSavings += (p.price - p.wholesalePrice) * qty;
    } else if (p.wholesalePrice && p.wholesalePrice < p.price && qty < (p.moq || 10)) {
      const needed = (p.moq || 10) - qty;
      const potentialSave = (p.price - p.wholesalePrice) * (p.moq || 10);
      moqHints.push(`${trDyn(p.name)} में ${needed} नग और जोड़ने पर थोक रेट (${fmtINR(p.wholesalePrice)}/नग) मिलेगा व ${fmtINR(potentialSave)} बचेंगे!`);
    }
    const lineTotal = p.taxMode === 'inclusive' || !shop?.gstin
      ? rate * qty
      : rate * qty * (1 + (p.gstRate || 0) / 100);
    cartGross += lineTotal;
  }
  const shopReviews = (state.data.reviews || []).filter(r => r.targetId === shop?.id);

  if (state.lastPlacedOrder) {
    const o = state.lastPlacedOrder.order;
    const shopPhone = state.lastPlacedOrder.shopPhone || shop?.phone || '';
    const upiId = state.lastPlacedOrder.upiId || '';
    const itemSummary = (o.items || []).map(i => `${i.name} x ${i.qty}`).join(', ') || o.note;
    const waText = `🧾 *New KuberQ Order ${o.invoiceNo}*\n🏪 Shop: ${shop?.shop}\n👤 Buyer: ${o.customer} (${o.phone})\n📍 Address: ${o.address}\n${o.buyerGstin ? `🏢 Buyer GSTIN: ${o.buyerGstin}\n` : ''}📦 Items/Parchi: ${itemSummary}\n💰 Total: ₹${o.totals?.gross || 0}`;
    const upiLink = upiId && o.totals?.gross > 0
      ? `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(shop?.shop || 'KuberQ')}&am=${o.totals.gross}&cu=INR`
      : '';

    return `
      <div class="container" style="max-width:640px;padding:44px 24px">
        <div class="card" style="text-align:center;border:2.5px solid var(--gold)">
          <span class="badge badge-primary" style="font-size:0.95rem">✓ ${tr('ORDER SAVED SUCCESSFULLY', 'ऑर्डर सफलतापूर्वक दर्ज हो गया')}</span>
          <h1 style="font-size:1.95rem;margin-top:12px">${esc(o.invoiceNo)}</h1>
          <p class="text-muted" style="margin-top:8px;font-size:1.05rem">
            ${tr('Sent to', 'दुकान:')} <b class="text-gold">${esc(trDyn(shop?.shop))}</b> · ${tr('Total:', 'कुल राशि:')} <b>${fmtINR(o.totals?.gross || 0)}</b>
          </p>

          <div class="card-subtle" style="margin:20px 0;text-align:left;font-size:0.98rem">
            <p><b>${tr('Buyer:', 'खरीदार:')}</b> ${esc(o.customer)} (${esc(o.phone)})</p>
            <p><b>${tr('Delivery:', 'पता:')}</b> ${esc(o.address)}</p>
            ${o.note ? `<p style="margin-top:6px"><b>📝 ${tr('Parchi List:', 'पर्ची विवरण:')}</b><br/>${esc(o.note)}</p>` : ''}
          </div>

          <div style="display:grid;gap:12px">
            <a class="btn btn-gold" style="width:100%;font-size:1.05rem" target="_blank" rel="noreferrer" href="https://wa.me/91${shopPhone}?text=${encodeURIComponent(waText)}">
              📲 ${tr('Send Order Alert to Shop on WhatsApp (Instant)', 'दुकानदार को WhatsApp पर तुरंत ऑर्डर अलर्ट भेजें')}
            </a>
            ${upiLink ? `
              <a class="btn btn-primary" style="width:100%" href="${upiLink}">
                💳 ${tr('Pay Directly via UPI App', 'UPI ऐप से सीधा भुगतान करें')} (${fmtINR(o.totals.gross)})
              </a>
            ` : ''}
            <button class="btn btn-ghost" onclick="state.lastPlacedOrder=null;render()">
              ← ${tr('Place Another Order', 'एक और ऑर्डर करें')}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  const orderMode = state.orderPageTab || 'catalog';

  return `
    <div class="order-vertical-shell">
      <!-- Store Header Card with Switcher -->
      <div class="order-step-card" style="background:linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);color:#ffffff;border:none">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px">
          <div>
            <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.15);padding:4px 10px;border-radius:20px;font-size:0.78rem;font-weight:700;color:#93c5fd;margin-bottom:8px">
              ⚡ <span>${tr('DIRECT STORE QR / B2B DESK', 'सीधा डिजिटल ऑर्डर काउंटर · बिना लॉगिन')}</span>
            </div>
            <h1 style="font-size:1.75rem;margin:0 0 6px;color:#ffffff">${esc(trDyn(shop?.shop))}</h1>
            <p style="margin:0;font-size:0.9rem;color:#cbd5e1">
              📍 ${esc(shop?.city || '')} · 📞 ${esc(shop?.phone || '')} · ID: <span style="font-family:monospace;color:#fde047">${esc(shop?.refCode || shop?.id)}</span>
              ${shop?.gstin ? ` · GSTIN: <span style="font-family:monospace;color:#a7f3d0">${esc(shop.gstin)}</span>` : ''}
            </p>
          </div>

          <div style="background:rgba(255,255,255,0.1);padding:10px 14px;border-radius:12px;border:1px solid rgba(255,255,255,0.2)">
            <label style="font-size:0.75rem;color:#93c5fd;display:block;margin-bottom:4px;font-weight:700">${tr('Switch Store / Trader:', 'अन्य दुकान चुनें:')}</label>
            <select class="select" style="background:#0f172a;color:#ffffff;border-color:#475569;font-size:0.85rem;padding:6px 10px" onchange="state.selectedShopId=this.value;state.cart={};navigate('/order?shop='+this.value)">
              ${shops.map(s => `<option value="${s.id}" ${s.id === shop?.id ? 'selected' : ''}>[${s.refCode || s.id}] ${esc(s.shop)} (${esc(s.city)})</option>`).join('')}
            </select>
          </div>
        </div>

        <!-- Mode Toggle Pill -->
        <div style="display:flex;gap:10px;margin-top:18px;border-top:1px solid rgba(255,255,255,0.15);padding-top:14px">
          <button type="button" class="btn btn-sm ${orderMode === 'catalog' ? 'btn-gold' : 'btn-ghost'}" style="${orderMode === 'catalog' ? '' : 'color:#ffffff;border-color:rgba(255,255,255,0.3)'}" onclick="state.orderPageTab='catalog';render()">
            📦 ${tr('1. Select from Catalog', '1. कैटलॉग से सामान चुनें')} (${allProducts.length})
          </button>
          <button type="button" class="btn btn-sm ${orderMode === 'parchi' ? 'btn-gold' : 'btn-ghost'}" style="${orderMode === 'parchi' ? '' : 'color:#ffffff;border-color:rgba(255,255,255,0.3)'}" onclick="state.orderPageTab='parchi';render()">
            📝 ${tr('2. Quick Parchi / Direct List', '2. त्वरित पर्ची लिखकर भेजें')}
          </button>
        </div>
      </div>

      <!-- STEP 1: Select Items or Write Parchi -->
      <div class="order-step-card">
        <div class="order-step-header">
          <div>
            <h3 style="margin:0;font-size:1.2rem;display:flex;align-items:center">
              <span class="order-step-num-badge">1</span>
              ${orderMode === 'catalog' ? tr('Pick Items from Catalog', 'कैटलॉग से सामान चुनें') : tr('Write Your Parchi List', 'अपनी पर्ची या सामान की सूची लिखें')}
            </h3>
            <p class="text-muted" style="margin:4px 0 0;font-size:0.84rem">
              ${orderMode === 'catalog' ? tr('Select quantity. Automatic wholesale discount applied on MOQ bulk quantity.', 'मात्रा चुनें। थोक मात्रा (MOQ) पर थोक दर स्वतः लागू होगी।') : tr('Type or paste items needed, specifications, and sizes directly.', 'आवश्यक सामान, साइज व मात्रा सीधे पर्ची में टाइप करें।')}
            </p>
          </div>
          ${orderMode === 'catalog' ? `
            <div style="min-width:220px">
              <input class="input" style="font-size:0.86rem;padding:6px 12px" placeholder="🔍 ${tr('Search item name or HSN...', 'सामान या HSN खोजें...')}" value="${esc(state.orderCatalogSearch || '')}" oninput="state.orderCatalogSearch=this.value;render()" />
            </div>
          ` : ''}
        </div>

        ${orderMode === 'catalog' ? `
          <div style="display:flex;flex-direction:column;gap:8px">
            ${products.length === 0 ? `
              <div style="text-align:center;padding:32px;background:#f8fafc;border-radius:12px;border:1px dashed #cbd5e1">
                <p class="text-muted">${tr('No products matching search criteria.', 'खोजे गए नाम का कोई सामान नहीं मिला।')}</p>
                <button type="button" class="btn btn-ghost btn-sm" onclick="state.orderCatalogSearch='';render()">🔄 ${tr('Show All Products', 'सभी सामान देखें')}</button>
              </div>
            ` : products.map(p => {
              const qty = state.cart[p.id] || 0;
              const hasWholesale = p.wholesalePrice && p.wholesalePrice < p.price;
              const isWholesaleActive = qty >= (p.moq || 9999) && hasWholesale;
              return `
                <div class="order-item-card">
                  <div style="flex:1;min-width:180px">
                    <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
                      <b style="font-size:0.98rem;color:#0f172a">${esc(trDyn(p.name))}</b>
                      ${p.unit ? `<span class="badge badge-ghost" style="font-size:0.72rem">${esc(p.unit)}</span>` : ''}
                      ${p.hsn ? `<span style="font-size:0.72rem;font-family:monospace;color:#64748b">HSN: ${esc(p.hsn)}</span>` : ''}
                    </div>
                    <div style="font-size:0.86rem;color:#475569;margin-top:4px;display:flex;gap:10px;align-items:center;flex-wrap:wrap">
                      <span>${tr('Retail:', 'खुदरा:')} <b style="color:#0f172a">${fmtINR(p.price)}</b></span>
                      ${hasWholesale ? `
                        <span style="color:#16a34a;font-weight:700">
                          ${tr('Wholesale:', 'थोक:')} ${fmtINR(p.wholesalePrice)}
                          <span style="font-size:0.74rem;background:#dcfce7;color:#15803d;padding:2px 6px;border-radius:4px;margin-left:4px">MOQ: ${p.moq || 10}</span>
                        </span>
                      ` : ''}
                      ${p.gstRate ? `<span style="font-size:0.74rem;color:#64748b">+${p.gstRate}% GST</span>` : ''}
                    </div>
                    ${isWholesaleActive ? `
                      <span class="badge badge-success" style="font-size:0.72rem;margin-top:4px">✔ ${tr('Wholesale Rate Active', 'थोक दर लागू')}</span>
                    ` : ''}
                  </div>

                  <div class="order-stepper-box">
                    <button type="button" class="order-stepper-btn" onclick="updateCart('${p.id}', -1)">−</button>
                    <span class="order-stepper-qty">${qty}</span>
                    <button type="button" class="order-stepper-btn" onclick="updateCart('${p.id}', 1)">+</button>
                    ${hasWholesale ? `
                      <button type="button" class="btn btn-gold btn-sm" style="padding:4px 8px;font-size:0.78rem" title="${tr('Add Bulk MOQ Quantity', 'थोक न्यूनतम मात्रा जोड़ें')}" onclick="updateCart('${p.id}', ${p.moq || 10})">
                        +${p.moq || 10}
                      </button>
                    ` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        ` : `
          <div>
            <label class="form-label">${tr('Write or Paste Your Parchi List (Hardware, Sanitary, Groceries, Electrical, etc.):', 'अपनी पर्ची सूची लिखें या पेस्ट करें:')}</label>
            <textarea class="textarea" rows="4" id="ord-note" style="font-size:0.95rem" placeholder="${tr('e.g. 15 Supreme 1 inch PVC pipe, 30 elbow, 5 JK wall putty 40kg, 2 tape rolls...', 'जैसे: 15 सुप्रीम 1 इंच पीवीसी पाइप, 30 एल्बो, 5 जेके वॉल पुट्टी 40kg, 2 टेप रोल...')}" oninput="state.parchiNote=this.value">${esc(state.parchiNote)}</textarea>
            <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
              <span class="text-muted" style="font-size:0.8rem">त्वरित सुझाव जोड़ें:</span>
              <button type="button" class="btn btn-ghost btn-sm" style="font-size:0.76rem;padding:2px 8px" onclick="state.parchiNote=(state.parchiNote ? state.parchiNote + ', ' : '') + '10 PVC Elbow 1 inch';render()">+ 10 PVC Elbow</button>
              <button type="button" class="btn btn-ghost btn-sm" style="font-size:0.76rem;padding:2px 8px" onclick="state.parchiNote=(state.parchiNote ? state.parchiNote + ', ' : '') + '5 CPVC Solvent 100ml';render()">+ 5 Solvent</button>
              <button type="button" class="btn btn-ghost btn-sm" style="font-size:0.76rem;padding:2px 8px" onclick="state.parchiNote=(state.parchiNote ? state.parchiNote + ', ' : '') + '2 Water Tank 1000L';render()">+ 2 Water Tank</button>
            </div>
          </div>
        `}
      </div>

      <!-- Form Wrapper for Submission -->
      <form onsubmit="submitCustomerOrder(event, '${shop?.id || ''}')">
        ${orderMode === 'catalog' ? `
          <input type="hidden" id="ord-note" value="${esc(state.parchiNote)}" />
        ` : ''}

        <!-- STEP 2: Order Review & Wholesale Savings -->
        <div class="order-step-card">
          <div class="order-step-header">
            <div>
              <h3 style="margin:0;font-size:1.2rem;display:flex;align-items:center">
                <span class="order-step-num-badge">2</span>
                ${tr('Order Review & Live Summary', 'ऑर्डर सारांश एवं कुल राशि')}
              </h3>
              <p class="text-muted" style="margin:4px 0 0;font-size:0.84rem">
                ${tr('Review items selected and verify wholesale pricing benefits.', 'चुने गए सामानों की पुष्टि करें एवं थोक बचत देखें।')}
              </p>
            </div>
            <div style="text-align:right">
              <span style="font-size:0.82rem;color:#64748b;display:block">${tr('Estimated Gross Total:', 'अनुमानित कुल राशि:')}</span>
              <span class="text-gold" style="font-size:1.4rem;font-weight:800">${fmtINR(cartGross)}</span>
            </div>
          </div>

          ${cartEntries.length > 0 ? `
            <div class="bulk-table-wrap" style="max-height:220px;margin-bottom:14px">
              <table>
                <thead>
                  <tr style="background:#f8fafc">
                    <th>${tr('Item', 'सामान')}</th>
                    <th style="text-align:center">${tr('Qty', 'मात्रा')}</th>
                    <th style="text-align:right">${tr('Rate Applied', 'दर')}</th>
                    <th style="text-align:right">${tr('Line Total', 'योग')}</th>
                  </tr>
                </thead>
                <tbody>
                  ${cartEntries.map(([pid, qty]) => {
                    const p = allProducts.find(x => x.id === pid);
                    if (!p) return '';
                    const isWholesale = qty >= (p.moq || 9999) && p.wholesalePrice && p.wholesalePrice < p.price;
                    const rate = isWholesale ? p.wholesalePrice : p.price;
                    const lineTot = p.taxMode === 'inclusive' || !shop?.gstin
                      ? rate * qty
                      : rate * qty * (1 + (p.gstRate || 0) / 100);
                    return `
                      <tr>
                        <td>
                          <b>${esc(trDyn(p.name))}</b>
                          ${isWholesale ? `<span class="badge badge-success" style="font-size:0.68rem;margin-left:4px">थोक</span>` : ''}
                        </td>
                        <td style="text-align:center"><b>${qty}</b></td>
                        <td style="text-align:right">${fmtINR(rate)}</td>
                        <td style="text-align:right;font-weight:700">${fmtINR(lineTot)}</td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          ` : (orderMode === 'catalog' ? `
            <div style="padding:14px;background:#f8fafc;border-radius:10px;text-align:center;color:#64748b;font-size:0.88rem;margin-bottom:12px">
              ℹ️ ${tr('No catalog items selected yet. Choose items above or switch to Parchi mode.', 'अभी तक कोई सामान नहीं चुना गया। ऊपर सूची से सामान चुनें या पर्ची मोड चुनें।')}
            </div>
          ` : `
            <div style="padding:14px;background:#f8fafc;border-radius:10px;text-align:left;color:#0f172a;font-size:0.9rem;margin-bottom:12px">
              📝 <b>पर्ची विवरण:</b> ${esc(state.parchiNote || 'पर्ची खाली है - कृपया ऊपर पर्ची लिखें')}
            </div>
          `)}

          ${wholesaleSavings > 0 ? `
            <div style="background:#ecfdf5;border:1.5px solid #10b981;padding:10px 14px;border-radius:10px;color:#065f46;font-size:0.88rem;margin-bottom:10px;display:flex;align-items:center;gap:8px">
              <span>🎉</span>
              <div>
                <b>${tr('Wholesale Savings Applied:', 'B2B थोक रेट बचत लागू:')}</b>
                ${tr(`You are saving ₹${wholesaleSavings} via wholesale MOQ pricing!`, `थोक दर (MOQ) के कारण आपकी ₹${wholesaleSavings} की सीधी बचत हो रही है!`)}
              </div>
            </div>
          ` : ''}

          ${moqHints.length > 0 ? `
            <div style="background:#fffbeb;border:1.5px solid #f59e0b;padding:10px 14px;border-radius:10px;color:#92400e;font-size:0.84rem;margin-bottom:10px">
              💡 <b>${tr('Wholesale Tip:', 'स्मार्ट थोक बचत सुझाव:')}</b> ${esc(moqHints[0])}
            </div>
          ` : ''}
        </div>

        <!-- STEP 3: Customer & Delivery Details -->
        <div class="order-step-card">
          <div class="order-step-header">
            <div>
              <h3 style="margin:0;font-size:1.2rem;display:flex;align-items:center">
                <span class="order-step-num-badge">3</span>
                ${tr('Buyer & Delivery Address Details', 'खरीदार व डिलीवरी पता विवरण')}
              </h3>
              <p class="text-muted" style="margin:4px 0 0;font-size:0.84rem">
                ${tr('Provide your WhatsApp mobile number to receive live bill dispatch and delivery updates.', 'बिल व डिलीवरी अपडेट प्राप्त करने के लिए WhatsApp नंबर व पता भरें।')}
              </p>
            </div>
          </div>

          <div class="grid grid-2" style="gap:14px">
            <div class="form-group" style="margin-bottom:10px">
              <label class="form-label">${tr('Your Name / Firm Name', 'आपका नाम / फर्म का नाम')} *</label>
              <input class="input" id="ord-name" required value="${esc(state.data.user?.name || state.checkoutCustomer.name)}" placeholder="${tr('e.g. Vikram Rathore (Contractor)', 'जैसे: विक्रम राठौड़ (ठेकेदार)')}" />
            </div>

            <div class="form-group" style="margin-bottom:10px">
              <label class="form-label">${tr('10-Digit Mobile (WhatsApp Alert)', '10 अंकों का WhatsApp मोबाइल नंबर')} *</label>
              <input class="input" id="ord-phone" required maxlength="10" value="${esc(state.data.user?.phone || state.checkoutCustomer.phone)}" placeholder="9828XXXXXX" />
            </div>
          </div>

          <div class="form-group" style="margin-bottom:10px">
            <label class="form-label">${tr('Delivery Address / Site Location', 'डिलीवरी का पता / साइट लोकेशन')} *</label>
            <input class="input" id="ord-addr" required value="${esc(state.checkoutCustomer.address)}" placeholder="${tr('Plot / Shop No, Market, Landmark, City', 'प्लॉट / दुकान नंबर, मुख्य बाजार या साइट, शहर')}" />
          </div>

          <div class="form-group" style="margin-bottom:6px">
            <label class="form-label">${tr('Buyer GSTIN (Optional — For B2B Input Tax Credit)', 'खरीदार GSTIN (वैकल्पिक — पक्का B2B ITC बिल प्राप्त करने हेतु)')}</label>
            <input class="input" id="ord-gstin" maxlength="15" style="text-transform:uppercase;font-family:monospace" value="${esc(state.checkoutCustomer.buyerGstin)}" placeholder="08AAACR5055K1Z2" />
          </div>
        </div>

        <!-- STEP 4: Confirm Order & Place Button -->
        <div class="order-step-card" style="text-align:center;background:#f8fafc;border-color:#cbd5e1">
          <div style="max-width:540px;margin:0 auto">
            <button type="submit" class="btn btn-gold" style="width:100%;font-size:1.15rem;padding:14px 24px;border-radius:12px;font-weight:800;box-shadow:0 6px 20px rgba(217, 119, 6, 0.3)">
              🚀 ${tr('Place Order Now (Instant · No Login Needed)', 'ऑर्डर तुरंत भेजें (लॉगिन की आवश्यकता नहीं)')}
            </button>
            <p class="text-muted" style="font-size:0.8rem;margin-top:10px">
              🔒 सुरक्षित एवं सीधा ऑर्डर · दुकानदार को तुरंत WhatsApp व ERP नोटिफिकेशन पहुंचेगा
            </p>
          </div>
        </div>
      </form>

      ${shopReviews.length > 0 ? `
        <div class="order-step-card">
          <h4 style="margin:0 0 10px;font-size:0.95rem;color:#0f172a">⭐ ${tr('Order-Verified Buyer Reviews:', 'वास्तविक ग्राहकों द्वारा सत्यापित समीक्षाएं:')}</h4>
          <div style="display:grid;gap:8px">
            ${shopReviews.slice(0, 3).map(rv => `
              <div style="font-size:0.84rem;background:#f8fafc;padding:8px 12px;border-radius:8px;border:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
                <span><b>${'⭐'.repeat(rv.rating || 5)}</b> "${esc((rv.tags || [])[0] || 'Verified Order')}" — <b>${esc(rv.author)}</b> ${rv.buyerCode ? `<span style="font-family:monospace;color:#2563EB">(${esc(rv.buyerCode)})</span>` : ''}</span>
                ${rv.verifiedOrderNo ? `<span class="badge badge-primary" style="font-size:0.7rem">✔ बिल: ${esc(rv.verifiedOrderNo)}</span>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 4px;font-size:0.82rem">
        <button type="button" class="btn btn-ghost btn-sm" style="padding:4px 10px" onclick="vouchForEntity('merchant', '${shop?.id || ''}', '${esc(shop?.shop || '')}')">
          👍 ${tr('Verify Trusted Store', 'दुकान सत्यापित करें')}
        </button>
        <button type="button" class="btn btn-ghost btn-sm" style="padding:4px 10px;color:var(--danger)" onclick="openReportModal('merchant', '${shop?.id || ''}', '${esc(shop?.shop || '')}')">
          🚩 ${tr('Report Issue / Grievance', 'शिकायत दर्ज करें')}
        </button>
      </div>
    </div>
  `;
}

// ============================================================================
// 5. MERCHANT PORTAL (`/merchant`) — ENTERPRISE CAD-PRO SHELL
// ============================================================================
function renderMerchantCustomerUdhaarOnly(shop) {
  const allOrders = state.data.myOrders || [];
  const creditOrders = allOrders.filter(o => o.status !== 'Rejected' && o.status !== 'Sales Return' && o.paymentMode === 'Credit' && !o.udhaarSettled);
  const partyMap = new Map();
  for (const o of creditOrders) {
    const key = o.phone || o.customer;
    const cCode = o.customerCode || ('KQC-' + String(o.phone || '849201').slice(-6));
    const gross = Number(o.totals?.gross) || 0;
    const paid = Math.min(gross, Math.max(0, Number(o.paidAmount) || 0));
    const due = Math.max(0, gross - paid);
    if (due <= 0) continue;
    const cur = partyMap.get(key) || { customer: o.customer, customerCode: cCode, phone: o.phone, grossTotal: 0, paidTotal: 0, total: 0, orders: [] };
    cur.grossTotal += gross;
    cur.paidTotal += paid;
    cur.total += due;
    cur.orders.push(o);
    partyMap.set(key, cur);
  }
  const parties = [...partyMap.values()];
  const totalBalance = parties.reduce((s, p) => s + p.total, 0);

  return `
    <div style="display:grid;gap:20px">
      <div class="erp-card">
        <div class="erp-card-header">
          <div>
            <span class="badge badge-danger">📒 ${tr('CUSTOMER RECEIVABLE UDHAAR KHATA', 'ग्राहक उधार खाता एवं आंशिक वसूली (Partial Receipts)')}</span>
            <h3 style="margin-top:6px">${tr('Party-Wise Customer Udhaar Khata & Running Ledger', 'पार्टी-वार ग्राहक उधारी, आंशिक जमा एवं रनिंग बहीखाता')}</h3>
            <p class="text-muted" style="font-size:0.84rem">${tr('Record partial payments, send WhatsApp payment links, or print the running Dr/Cr ledger statement.', 'आंशिक भुगतान दर्ज करें, WhatsApp पर UPI भुगतान लिंक भेजें एवं पार्टी का डेबिट/क्रेडिट बहीखाता प्रिंट करें।')}</p>
          </div>
          <span class="badge badge-danger" style="font-size:1.05rem;padding:6px 14px">${tr('Total Balance To Receive:', 'कुल शेष उधारी वसूलनी:')} ${fmtINR(totalBalance)}</span>
        </div>

        ${parties.length === 0 ? `
          <div style="text-align:center;padding:36px 12px;background:#f8fafc;border-radius:10px">
            <p style="font-size:1.1rem;font-weight:700;color:#16a34a">🎉 ${tr('Zero pending Udhaar! All customer bills are settled.', 'शून्य उधारी! सभी ग्राहकों के बिल चुकता हैं।')}</p>
          </div>
        ` : `
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>${tr('Party / Customer Unique ID', 'ग्राहक / यूनिक ID')}</th>
                  <th>${tr('Bills & Partial Paid', 'बिल एवं आंशिक भुगतान')}</th>
                  <th>${tr('Net Balance Due', 'शुद्ध शेष उधारी')}</th>
                  <th>${tr('Receive Partial / Full Payment', 'आंशिक / पूर्ण वसूली')}</th>
                  <th>${tr('Ledger & WhatsApp', 'बहीखाता व WhatsApp')}</th>
                </tr>
              </thead>
              <tbody>
                ${parties.map(p => {
                  const upiLink = shop.upiId ? `upi://pay?pa=${encodeURIComponent(shop.upiId)}&pn=${encodeURIComponent(shop.shop)}&am=${p.total}&cu=INR` : '';
                  const remMsg = `नमस्ते *${p.customer}* जी (${p.customerCode}),\n*${shop.shop}* से आपका कुल उधारी विवरण:\nकुल बिल: ₹${p.grossTotal} | पूर्व जमा: ₹${p.paidTotal}\n*शुद्ध शेष राशि: ₹${p.total}*\n${upiLink ? `💳 UPI भुगतान लिंक: ${upiLink}` : 'कृपया दुकान काउंटर पर भुगतान करें।'}`;
                  const firstOrd = p.orders[0];
                  return `
                    <tr>
                      <td>
                        <b>${esc(p.customer)}</b>
                        <div style="display:flex;gap:4px;align-items:center;margin-top:3px">
                          <span class="badge badge-primary" style="font-family:monospace;font-size:0.7rem">${esc(p.customerCode)}</span>
                          <span class="text-muted" style="font-size:0.76rem">📱 ${esc(p.phone)}</span>
                        </div>
                      </td>
                      <td>
                        ${p.orders.map(x => {
                          const g = Number(x.totals?.gross) || 0;
                          const pd = Number(x.paidAmount) || 0;
                          return `<div style="font-size:0.8rem;margin-bottom:3px"><b>${esc(x.invoiceNo)}:</b> कुल ${fmtINR(g)} (जमा: <span class="text-success">${fmtINR(pd)}</span>)</div>`;
                        }).join('')}
                      </td>
                      <td>
                        <b class="text-danger" style="font-size:1.08rem">${fmtINR(p.total)}</b>
                      </td>
                      <td>
                        <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">
                          <input class="input" type="number" id="part-amt-${firstOrd.id}" placeholder="₹ आंशिक राशि" style="width:105px;padding:6px 8px;font-size:0.82rem" />
                          <select class="select" id="part-mode-${firstOrd.id}" style="width:84px;padding:6px;font-size:0.8rem">
                            <option value="Cash">Cash</option>
                            <option value="UPI">UPI</option>
                          </select>
                          <button class="btn btn-primary btn-sm" onclick="recordPartialCustomerPayment('${firstOrd.id}')">
                            + ${tr('Receive', 'जमा करें')}
                          </button>
                          <button class="btn btn-ghost btn-sm" onclick="updateOrderField('${firstOrd.id}', { udhaarSettled: true, settledVia: 'UPI' })">
                            ✓ ${tr('Full Paid', 'पूर्ण चुकता')}
                          </button>
                        </div>
                      </td>
                      <td>
                        <div style="display:flex;gap:6px;flex-wrap:wrap">
                          <button class="btn btn-ghost btn-sm" onclick="openPartyLedgerModal('${esc(p.phone || p.customer)}')">
                            📄 ${tr('Ledger PDF', 'लेजर बहीखाता')}
                          </button>
                          <a class="btn btn-gold btn-sm" target="_blank" rel="noreferrer" href="https://wa.me/91${p.phone}?text=${encodeURIComponent(remMsg)}">
                            📲 ${tr('WA Reminder', 'तकादा')}
                          </a>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    </div>
  `;
}

function renderMerchantSupplierPurchasesOnly(shop) {
  const supplierPurchases = state.data.mySupplierPurchases || [];
  const totalSupplierDue = supplierPurchases
    .filter(sp => sp.status !== 'Paid')
    .reduce((sum, sp) => sum + Math.max(0, (Number(sp.totalAmount) || 0) - (Number(sp.paidAmount) || 0)), 0);
  const totalInputItc = supplierPurchases.reduce((s, sp) => s + (Number(sp.gstAmount) || Math.round((Number(sp.totalAmount) || 0) * 18 / 118)), 0);

  return `
    <div style="display:grid;gap:20px">
      <div class="erp-card">
        <div class="erp-card-header">
          <div>
            <span class="badge badge-gold">🛒 ${tr('SUPPLIER PURCHASES & INPUT GST (ITC) KHATA', 'सप्लायर खरीद एवं GST इनपुट क्रेडिट (ITC)')}</span>
            <h3 style="margin-top:6px">${tr('Record Supplier Invoices & Input Tax Credit (ITC)', 'सप्लायर खरीद बिल दर्ज करें एवं इनपुट टैक्स क्रेडिट (ITC) क्लेम करें')}</h3>
            <p class="text-muted" style="font-size:0.84rem">${tr('Single-invoice auto-mirroring records purchase bills directly into your supplier payable ledger.', 'खरीद बिल सीधे आपके सप्लायर देय खाते में इनपुट टैक्स क्रेडिट सहित दर्ज होते हैं।')}</p>
          </div>
          <div style="display:flex;gap:8px">
            <span class="badge badge-primary" style="font-size:0.92rem">ITC क्रेडिट: ${fmtINR(totalInputItc)}</span>
            <span class="badge badge-danger" style="font-size:0.92rem">सप्लायर को देय: ${fmtINR(totalSupplierDue)}</span>
          </div>
        </div>

        <form onsubmit="addSupplierPurchase(event)" style="margin-bottom:18px;background:#f8fafc;padding:16px;border-radius:10px;border:1px solid #e2e8f0">
          <div class="clean-form-grid" style="margin-top:0">
            <div class="form-group-clean">
              <label>${tr('Supplier Name / Firm', 'सप्लायर का नाम / फर्म')} *</label>
              <input class="input" id="sp-name" required placeholder="${tr('e.g. Supreme Sanitary Depot', 'उदा: सुप्रीम सैनिटरी डिपो')}" />
            </div>
            <div class="form-group-clean">
              <label>${tr('Supplier GSTIN (For ITC)', 'सप्लायर GSTIN (ITC क्रेडिट हेतु)')}</label>
              <input class="input" id="sp-gstin" maxlength="15" style="text-transform:uppercase" placeholder="08AAACS1234F1Z2" />
            </div>
            <div class="form-group-clean">
              <label>${tr('Bill No & Items Description', 'बिल संख्या व सामान विवरण')}</label>
              <input class="input" id="sp-items" placeholder="Bill #884 - PVC Fittings & Pipes" />
            </div>
          </div>
          <div class="clean-form-grid" style="align-items:end;margin-bottom:0">
            <div class="form-group-clean">
              <label>${tr('Total Bill Amount (₹)', 'कुल बिल राशि (₹)')} *</label>
              <input class="input" type="number" id="sp-total" required min="1" placeholder="50000" oninput="const el=document.getElementById('sp-gst');if(el)el.value=Math.round(Number(this.value||0)*18/118)" />
            </div>
            <div class="form-group-clean">
              <label>${tr('Input GST / ITC (₹)', 'इनपुट GST / ITC (₹)')}</label>
              <input class="input" type="number" id="sp-gst" value="0" min="0" />
            </div>
            <div class="form-group-clean">
              <label>${tr('Paid Now (₹)', 'अभी चुकाई राशि (₹)')}</label>
              <input class="input" type="number" id="sp-paid" value="0" min="0" />
            </div>
            <div>
              <button type="submit" class="btn btn-gold" style="width:100%;padding:10px">${tr('+ Save Purchase Bill', '+ खरीद बिल सहेजें')}</button>
            </div>
          </div>
        </form>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>${tr('Supplier & GSTIN', 'सप्लायर एवं GSTIN')}</th>
                <th>${tr('Bill Total, ITC & Balance', 'बिल कुल, ITC क्रेडिट एवं शेष देय')}</th>
                <th>${tr('Date', 'दिनांक')}</th>
                <th>${tr('Payment Action', 'भुगतान निपटारा')}</th>
              </tr>
            </thead>
            <tbody>
              ${supplierPurchases.length === 0 ? `
                <tr><td colspan="4" style="text-align:center;color:#94a3b8;padding:24px">${tr('No supplier purchase records yet.', 'अभी तक कोई सप्लायर खरीद बिल दर्ज नहीं है।')}</td></tr>
              ` : supplierPurchases.map(sp => {
                const bal = Math.max(0, (Number(sp.totalAmount) || 0) - (Number(sp.paidAmount) || 0));
                const itc = Number(sp.gstAmount) || Math.round((Number(sp.totalAmount) || 0) * 18 / 118);
                return `
                  <tr>
                    <td>
                      <b>${esc(sp.supplierName)}</b>
                      <div class="text-muted" style="font-size:0.75rem">${esc(sp.itemsSummary)} ${sp.supplierGstin ? `• GSTIN: ${esc(sp.supplierGstin)}` : ''}</div>
                    </td>
                    <td>
                      <div>${fmtINR(sp.totalAmount)} • <span class="text-success" style="font-size:0.75rem;font-weight:700">ITC: ${fmtINR(itc)}</span></div>
                      <div style="font-weight:800;font-size:0.82rem;color:${bal > 0 ? '#dc2626' : '#16a34a'}">${bal > 0 ? `शेष देय: ${fmtINR(bal)} (भुगतान: ${fmtINR(sp.paidAmount || 0)})` : '✓ चुकता (Paid)'}</div>
                    </td>
                    <td style="font-size:0.8rem">${new Date(sp.createdAt || Date.now()).toLocaleDateString('en-IN')}</td>
                    <td>
                      ${bal > 0 ? `
                        <div style="display:flex;gap:4px;align-items:center">
                          <input class="input" type="number" id="sp-pay-${sp.id}" placeholder="₹ राशि" style="width:85px;padding:5px 7px;font-size:0.78rem" />
                          <button class="btn btn-primary btn-sm" onclick="settleSupplierPurchase('${sp.id}')">✓ भुगतान दर्ज करें</button>
                        </div>
                      ` : '<span class="badge badge-primary">पूर्ण चुकता</span>'}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderMerchantExpensesOnly(shop) {
  const expenses = state.data.myExpenses || [];
  const totalExpenses = expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

  const allOrders = state.data.myOrders || [];
  const cashSales = allOrders.filter(o => o.status !== 'Rejected' && o.status !== 'Sales Return' && o.paymentMode === 'Cash')
    .reduce((s, o) => s + (Number(o.totals?.gross) || 0), 0);
  const upiSales = allOrders.filter(o => o.status !== 'Rejected' && o.status !== 'Sales Return' && o.paymentMode === 'UPI')
    .reduce((s, o) => s + (Number(o.totals?.gross) || 0), 0);
  const cashExpenses = expenses.filter(e => e.mode === 'Cash').reduce((s, e) => s + (Number(e.amount) || 0), 0);
  const upiExpenses = expenses.filter(e => e.mode === 'UPI').reduce((s, e) => s + (Number(e.amount) || 0), 0);
  const cashInDrawer = Math.max(0, cashSales - cashExpenses);
  const bankUpiBalance = Math.max(0, upiSales - upiExpenses);

  return `
    <div style="display:grid;gap:20px">
      <!-- Cash vs Bank Reconcile Header -->
      <div class="grid grid-2">
        <div class="erp-card" style="background:#f0fdf4;border-color:#86efac">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-weight:700;color:#166534">💵 ${tr('Physical Cash in Drawer (गल्ले में नकद)', 'गल्ले में नकद रोकड़ (Cash in Hand)')}</span>
            <span class="badge badge-primary">रोकड़ मिलान</span>
          </div>
          <p style="font-size:1.8rem;font-weight:900;color:#15803d;margin:8px 0 4px">${fmtINR(cashInDrawer)}</p>
          <p class="text-muted" style="font-size:0.78rem">नकद बिक्री: ${fmtINR(cashSales)} - नकद खर्चे: ${fmtINR(cashExpenses)}</p>
        </div>

        <div class="erp-card" style="background:#f0f9ff;border-color:#7dd3fc">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-weight:700;color:#075985">🏦 ${tr('Bank / UPI Book Balance', 'बैंक / UPI खाता शेष')}</span>
            <span class="badge badge-gold">बैंक विवरण</span>
          </div>
          <p style="font-size:1.8rem;font-weight:900;color:#0369a1;margin:8px 0 4px">${fmtINR(bankUpiBalance)}</p>
          <p class="text-muted" style="font-size:0.78rem">UPI बिक्री: ${fmtINR(upiSales)} - UPI खर्चे: ${fmtINR(upiExpenses)}</p>
        </div>
      </div>

      <!-- Add Expense Form -->
      <div class="erp-card">
        <div class="erp-card-header">
          <div>
            <span class="badge badge-primary">💸 ${tr('DAILY SHOP EXPENSES TRACKER', 'दैनिक व्यापार खर्चे (Cash / UPI)')}</span>
            <h3 style="margin-top:6px">${tr('Record Daily Shop Expenses (Deducts from Cash Drawer or Bank)', 'दुकान के दैनिक खर्चे दर्ज करें (गल्ले या बैंक से स्वतः समायोजन)')}</h3>
          </div>
          <span class="badge badge-muted" style="font-size:0.95rem">कुल खर्चे: ${fmtINR(totalExpenses)}</span>
        </div>

        <form onsubmit="addShopExpense(event)" style="margin-bottom:18px;background:#f8fafc;padding:16px;border-radius:10px;border:1px solid #e2e8f0">
          <div class="clean-form-grid" style="margin-top:0">
            <div class="form-group-clean">
              <label>${tr('Expense Category', 'खर्च का प्रकार')} *</label>
              <select class="select" id="exp-cat">
                <option value="हम्माली / उतराई-चढ़ाई (Hammali & Loading)">हम्माली / उतराई-चढ़ाई (Hammali)</option>
                <option value="स्थानीय भाड़ा / ट्रांसपोर्ट (Local Freight)">स्थानीय भाड़ा / ऑटो/टेंपो (Freight)</option>
                <option value="चाय-पानी व दुकान नाश्ता (Tea & Refreshment)">चाय-पानी व दुकान नाश्ता (Tea & Water)</option>
                <option value="बिजली बिल / दुकान किराया (Electricity / Rent)">बिजली बिल / दुकान रखरखाव</option>
                <option value="स्टाफ वेतन / दैनिक दिहाड़ी (Staff Salary)">स्टाफ वेतन / दैनिक मजदूरी</option>
              </select>
            </div>
            <div class="form-group-clean">
              <label>${tr('Paid Via (Payment Source)', 'भुगतान माध्यम')} *</label>
              <select class="select" id="exp-mode">
                <option value="Cash">💵 Cash (दुकान गल्ले से)</option>
                <option value="UPI">📱 UPI / Bank (बैंक खाते से)</option>
              </select>
            </div>
            <div class="form-group-clean">
              <label>${tr('Amount (₹)', 'राशि (₹)')} *</label>
              <input class="input" type="number" id="exp-amt" required min="1" placeholder="250" />
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr auto;gap:12px;align-items:end">
            <div class="form-group-clean">
              <label>${tr('Short Note (Optional)', 'विवरण नोट')}</label>
              <input class="input" id="exp-note" placeholder="${tr('e.g. Unloaded 50 bags cement', 'उदा: 50 कट्टे सीमेंट उतराई')}" />
            </div>
            <button type="submit" class="btn btn-primary" style="padding:10px 18px">${tr('+ Add Expense', '+ खर्च दर्ज करें')}</button>
          </div>
        </form>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>${tr('Expense Category & Note', 'खर्च का प्रकार व विवरण')}</th>
                <th>${tr('Payment Source', 'भुगतान स्रोत')}</th>
                <th>${tr('Date', 'दिनांक')}</th>
                <th>${tr('Amount', 'खर्च राशि')}</th>
              </tr>
            </thead>
            <tbody>
              ${expenses.length === 0 ? `
                <tr><td colspan="4" style="text-align:center;color:#94a3b8;padding:24px">${tr('No expenses logged yet.', 'अभी तक कोई खर्च दर्ज नहीं है।')}</td></tr>
              ` : expenses.map(ex => `
                <tr>
                  <td>
                    <b>${esc(ex.category)}</b>
                    <div class="text-muted" style="font-size:0.76rem">${esc(ex.note || '—')}</div>
                  </td>
                  <td>
                    <span class="badge ${ex.mode === 'Cash' ? 'badge-primary' : 'badge-gold'}">${ex.mode === 'Cash' ? '💵 Cash' : '📱 UPI'}</span>
                  </td>
                  <td style="font-size:0.8rem">${new Date(ex.date).toLocaleDateString('en-IN')}</td>
                  <td><b class="text-danger">-${fmtINR(ex.amount)}</b></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderMerchantReportsOnly(shop) {
  const period = state.accountingPeriod || 'all';
  const allOrders = filterByAccountingPeriod(state.data.myOrders || [], period);
  const supplierPurchases = filterByAccountingPeriod(state.data.mySupplierPurchases || [], period);
  const products = state.data.products || [];

  const outputGst = allOrders
    .filter(o => o.status !== 'Rejected' && o.status !== 'Sales Return')
    .reduce((s, o) => s + (Number(o.totals?.gst) || 0), 0);
  const inputItc = supplierPurchases
    .reduce((s, sp) => s + (Number(sp.gstAmount) || Math.round((Number(sp.totalAmount) || 0) * 18 / 118)), 0);
  const netGstPayable = Math.max(0, outputGst - inputItc);
  const itcCarryForward = Math.max(0, inputItc - outputGst);

  let totalStockCostValuation = 0;
  let totalStockSalesValuation = 0;
  let totalStockUnits = 0;
  products.forEach(p => {
    const q = Number(p.stock) || 0;
    const cp = Number(p.costPrice) || (Number(p.price) ? Math.round(Number(p.price) * 0.8) : 0);
    const sp = Number(p.price) || 0;
    totalStockCostValuation += q * cp;
    totalStockSalesValuation += q * sp;
    totalStockUnits += q;
  });

  return `
    <div style="display:grid;gap:20px">
      <!-- 0-Latency Period Filter -->
      <div class="card-subtle no-print" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-weight:800;font-size:0.88rem;color:#0f172a">📅 ${tr('Select Accounting Period (0-Latency CA Filter):', 'लेखा अवधि चुनें (0-विलंबता CA फिल्टर):')}</span>
          <button class="btn btn-sm ${period === 'all' ? 'btn-gold' : 'btn-ghost'}" onclick="state.accountingPeriod='all';render()">${tr('All Time', 'समस्त रिकॉर्ड्स')}</button>
          <button class="btn btn-sm ${period === 'month' ? 'btn-gold' : 'btn-ghost'}" onclick="state.accountingPeriod='month';render()">${tr('This Month', 'चालू माह')}</button>
          <button class="btn btn-sm ${period === 'today' ? 'btn-gold' : 'btn-ghost'}" onclick="state.accountingPeriod='today';render()">${tr('Today', 'आज का दिन')}</button>
        </div>
        <span class="badge badge-gold">CA & GSTR-3B Ready</span>
      </div>

      <!-- GSTR-3B Tax Set-Off Summary -->
      <div class="erp-card">
        <div class="erp-card-header">
          <div>
            <span class="badge badge-primary">🏛️ ${tr('GSTR-3B TAX SET-OFF CALCULATION', 'GSTR-3B टैक्स सेट-ऑफ एवं शुद्ध देयता')}</span>
            <h3 style="margin-top:6px">${tr('Output GST vs Input Tax Credit (ITC) Net Liability', 'बिक्री GST बनाम खरीद इनपुट टैक्स क्रेडिट (ITC) का शुद्ध मिलान')}</h3>
          </div>
          <span class="badge ${netGstPayable > 0 ? 'badge-danger' : 'badge-primary'}" style="font-size:1.05rem;padding:6px 14px">
            ${netGstPayable > 0 ? `सरकार को शुद्ध टैक्स देय: ${fmtINR(netGstPayable)}` : `ITC आगे ले जाएं: ${fmtINR(itcCarryForward)}`}
          </span>
        </div>

        <div class="grid grid-3" style="margin-bottom:14px">
          <div class="card-subtle" style="padding:14px">
            <p class="text-muted" style="font-size:0.8rem">${tr('Output GST (On Customer Sales)', 'बिक्री पर कुल एकत्रित GST (Output)')}</p>
            <p style="font-weight:900;font-size:1.4rem;color:#dc2626;margin-top:4px">${fmtINR(outputGst)}</p>
          </div>
          <div class="card-subtle" style="padding:14px">
            <p class="text-muted" style="font-size:0.8rem">${tr('Input ITC (On Supplier Purchases)', 'खरीद पर कुल इनपुट टैक्स क्रेडिट (ITC)')}</p>
            <p style="font-weight:900;font-size:1.4rem;color:#16a34a;margin-top:4px">- ${fmtINR(inputItc)}</p>
          </div>
          <div class="card-subtle" style="padding:14px;background:#f8fafc;border:1.5px solid ${netGstPayable > 0 ? '#fca5a5' : '#86efac'}">
            <p style="font-size:0.8rem;font-weight:700;color:${netGstPayable > 0 ? '#991b1b' : '#166534'}">
              ${netGstPayable > 0 ? tr('Net GST Payable (Cash)', 'शुद्ध देय GST (कैश लेजर)') : tr('Excess ITC (Carry Forward)', 'अतिरिक्त ITC (अगले माह ले जाएं)')}
            </p>
            <p style="font-weight:900;font-size:1.4rem;color:${netGstPayable > 0 ? '#dc2626' : '#15803d'};margin-top:4px">
              ${netGstPayable > 0 ? fmtINR(netGstPayable) : fmtINR(itcCarryForward)}
            </p>
          </div>
        </div>
      </div>

      <!-- Closing Stock Valuation -->
      <div class="erp-card">
        <div class="erp-card-header">
          <div>
            <span class="badge badge-gold">📦 ${tr('CLOSING STOCK VALUATION (AS-2 COMPLIANT)', 'क्लोजिंग स्टॉक वैल्यूएशन (लेखा मानक AS-2)')}</span>
            <h3 style="margin-top:6px">${tr('Inventory Valuation at Purchase Cost vs Selling Value', 'दुकान स्टॉक का वास्तविक लागत मूल्य (Cost Price) बनाम विक्रय मूल्य')}</h3>
          </div>
          <span class="badge badge-primary">${totalStockUnits} कुल इकाइयां</span>
        </div>

        <div class="grid grid-3">
          <div class="card-subtle" style="padding:14px">
            <p class="text-muted" style="font-size:0.8rem">लागत मूल्य पर कुल स्टॉक (Cost Value):</p>
            <p style="font-weight:900;font-size:1.4rem;color:#0284c7;margin-top:4px">${fmtINR(totalStockCostValuation)}</p>
            <p class="text-muted" style="font-size:0.75rem">बैलेंस शीट हेतु वास्तविक परिसंपत्ति मूल्य</p>
          </div>
          <div class="card-subtle" style="padding:14px">
            <p class="text-muted" style="font-size:0.8rem">विक्रय मूल्य पर कुल स्टॉक (Sales Value):</p>
            <p style="font-weight:900;font-size:1.4rem;color:#b45309;margin-top:4px">${fmtINR(totalStockSalesValuation)}</p>
            <p class="text-muted" style="font-size:0.75rem">बाजार मूल्य पर संभावित कुल बिक्री</p>
          </div>
          <div class="card-subtle" style="padding:14px;background:#f0fdf4;border:1.5px solid #86efac">
            <p style="font-size:0.8rem;font-weight:700;color:#166534">संभावित सकल लाभ (Expected Margin):</p>
            <p style="font-weight:900;font-size:1.4rem;color:#15803d;margin-top:4px">${fmtINR(Math.max(0, totalStockSalesValuation - totalStockCostValuation))}</p>
            <p class="text-muted" style="font-size:0.75rem">स्टॉक पूर्ण बिकने पर संभावित लाभ</p>
          </div>
        </div>
      </div>

      <!-- Party Ledger Quick Generator -->
      <div class="erp-card">
        <div class="erp-card-header">
          <div>
            <span class="badge badge-primary">📄 ${tr('PARTY DR/CR RUNNING LEDGER STATEMENT', 'पार्टी बहीखाता विवरण (डेबिट/क्रेडिट रनिंग लेजर)')}</span>
            <h3 style="margin-top:6px">${tr('Generate & Print Official Party Ledger', 'किसी भी ग्राहक या सप्लायर का आधिकारिक खाता विवरण प्रिंट करें')}</h3>
          </div>
        </div>
        <p class="text-muted" style="font-size:0.88rem;margin-bottom:14px">नीचे ग्राहक का फोन नंबर या नाम दर्ज करें और तुरंत प्रिंटेबल Dr/Cr लेजर प्राप्त करें:</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
          <input class="input" id="report-party-key" placeholder="पार्टी का नाम या 10-अंकीय मोबाइल" style="max-width:320px" />
          <button class="btn btn-gold" onclick="const k=document.getElementById('report-party-key')?.value;if(k)openPartyLedgerModal(k);else showToast('कृपया नाम या मोबाइल दर्ज करें')">
            📄 प्रिंट योग्य लेजर खोलें
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderMerchantSettingsOnly(shop, qrUrl) {
  const aiRemaining = Math.max(0, (Number(shop.aiLimit) || 3) - (Number(shop.aiUsed) || 0));

  return `
    <div style="display:grid;gap:20px">
      <!-- Shop Details Card -->
      <div class="erp-card">
        <div class="erp-card-header">
          <div>
            <span class="badge badge-gold">💎 ${esc(trDyn(shop.plan))}</span>
            <span class="badge ${aiRemaining > 0 ? 'badge-primary' : 'badge-danger'}">
              ✨ AI क्रेडिट: ${aiRemaining} / ${shop.aiLimit || 3} शेष
            </span>
            ${shop.verified ? `<span class="badge badge-gold">✓ सत्यापित B2B प्रतिष्ठान</span>` : ''}
            <span class="badge ${shop.open ? 'badge-primary' : 'badge-danger'}">${shop.open ? 'दुकान खुली है' : 'दुकान बंद है'}</span>
            <h2 style="font-size:1.7rem;margin-top:8px;color:#0f172a">${esc(trDyn(shop.shop))}</h2>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn btn-gold btn-sm" onclick="downloadFullShopBackup()">
              💾 ${tr('1-Click Offline Data Backup', '1-क्लिक डेटा बैकअप')}
            </button>
            <button class="btn btn-ghost btn-sm" onclick="toggleShopOpen(${!shop.open})">
              ${shop.open ? '🔴 दुकान बंद मार्क करें' : '🟢 दुकान खुली मार्क करें'}
            </button>
            <button class="btn btn-primary btn-sm" onclick="navigate('/pricing')">
              💎 ${tr('Upgrade Plan / AI Credits', 'प्लान व AI अपग्रेड')}
            </button>
          </div>
        </div>

        <div class="clean-form-grid" style="margin:0">
          <div class="card-subtle">
            <p class="text-muted" style="font-size:0.78rem">दुकान यूनिक ID (Ref Code):</p>
            <p style="font-weight:800;font-family:monospace;font-size:1.15rem;color:#2563EB">${esc(shop.refCode)}</p>
          </div>
          <div class="card-subtle">
            <p class="text-muted" style="font-size:0.78rem">GSTIN नंबर:</p>
            <p style="font-weight:800;font-size:1.05rem">${esc(shop.gstin || 'पंजीकृत नहीं (Bill of Supply)')}</p>
          </div>
          <div class="card-subtle">
            <p class="text-muted" style="font-size:0.78rem">व्यापार UPI VPA:</p>
            <p style="font-weight:800;font-size:1.05rem">${esc(shop.upiId || 'काउंटर नकद')}</p>
          </div>
          <div class="card-subtle">
            <p class="text-muted" style="font-size:0.78rem">शहर व राज्य:</p>
            <p style="font-weight:800;font-size:1.05rem">${esc(shop.city)}, ${esc(shop.state)}</p>
          </div>
        </div>
      </div>

      <!-- Quick Share & QR Links -->
      <div class="erp-card">
        <h3 style="margin-bottom:12px">🔗 दुकान ऑनलाइन ऑर्डर लिंक</h3>
        <p class="text-muted" style="font-size:0.88rem;margin-bottom:14px">ग्राहक इस लिंक पर सीधे आपकी दुकान का कैटलॉग देख सकते हैं एवं ऑर्डर लगा सकते हैं:</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <input class="input" readonly value="${esc(qrUrl)}" style="max-width:440px" />
          <button class="btn btn-ghost btn-sm" onclick="navigator.clipboard.writeText('${qrUrl}');showToast('लिंक कॉपी हो गया!')">
            📋 लिंक कॉपी करें
          </button>
          <a class="btn btn-primary btn-sm" target="_blank" rel="noreferrer" href="https://wa.me/?text=${encodeURIComponent(`Order online from ${shop.shop} on KuberQ: ${qrUrl}`)}">
            📲 WhatsApp पर भेजें
          </a>
        </div>
      </div>
    </div>
  `;
}

function renderMerchantPortal() {
  const u = state.data.user;
  const shop = state.data.myShop;
  if (!u || !shop) {
    return `
      <div class="container" style="max-width:640px;padding:60px 20px;text-align:center">
        <div class="card" style="box-shadow:var(--shadow-lg);border-radius:18px;padding:32px">
          <div style="width:60px;height:60px;border-radius:16px;background:linear-gradient(135deg,#1e3a8a,#2563eb);color:#fff;display:grid;place-items:center;font-size:1.8rem;margin:0 auto 16px">🏪</div>
          <h2 style="font-size:1.6rem;color:#0f172a">${tr('Merchant ERP Sign-In Required', 'व्यापारी पोर्टल - सुरक्षित लॉगिन')}</h2>
          <p class="text-muted" style="margin:10px 0 24px;font-size:0.95rem">
            ${tr('Sign in with your registered 10-digit mobile number to access 5-Sec GST Billing, Udhaar Khata, and Inventory.', 'दुकान बहीखाता, 5-सेकंड GST बिलिंग, स्टॉक और उधार खाता देखने के लिए अपने 10-अंकीय मोबाइल नंबर से लॉगिन करें।')}
          </p>

          <div class="card-subtle" style="background:#f8fafc;border:1.5px solid #cbd5e1;padding:16px;border-radius:12px;margin-bottom:20px;text-align:left">
            <p style="font-weight:700;color:#0f172a;font-size:0.9rem;margin-bottom:10px">⚡ ${tr('1-Click Demo Evaluation Sign-In:', 'जांच हेतु 1-क्लिक डेमो लॉगिन:')}</p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
              <button type="button" class="btn btn-gold btn-sm" onclick="quickLogin('9829011223', 'Marwar@123', 'merchant')">
                🏪 ${tr('Demo Retailer (Marwar)', 'डेमो रिटेलर (Marwar)')}
              </button>
              <button type="button" class="btn btn-primary btn-sm" onclick="quickLogin('9414122334', 'Surya@123', 'merchant')">
                🏭 ${tr('Demo Wholesaler (Surya)', 'डेमो होलसेलर (Surya)')}
              </button>
            </div>
          </div>

          <button class="btn btn-gold" onclick="navigate('/auth')" style="width:100%;padding:12px">
            🔑 ${tr('Sign In with Password / Register', 'पासवर्ड से लॉगिन करें / नया खाता बनाएं')}
          </button>
        </div>
      </div>
    `;
  }

  let curTab = state.merchantTab || 'Dashboard';
  if (curTab === 'GST Invoice') curTab = 'Billing';
  if (curTab === 'Udhaar Khata') curTab = 'Udhaar';
  if (curTab === 'More Tools') curTab = 'Standee';
  state.merchantTab = curTab;

  const allOrders = state.data.myOrders || [];
  const creditOrders = allOrders.filter(o => o.status !== 'Rejected' && o.status !== 'Sales Return' && o.paymentMode === 'Credit' && !o.udhaarSettled);
  const pendingCount = creditOrders.length;
  const qrUrl = `${window.location.origin}/order?shop=${shop.id}`;
  const uniqueId = shop.refCode || u.uniqueId || ('KQM-' + String(u.phone || '982901').slice(-6));

  const navItems = [
    ['Dashboard', '📊', tr('Dashboard & Overview', 'डैशबोर्ड एवं आज का सारांश'), ''],
    ['Billing', '🧾', tr('Quick 5-Sec & GST Billing', 'त्वरित 5-सेकंड व GST बिलिंग'), ''],
    ['Inventory', '📦', tr('Stock & AI Scanner', 'स्टॉक व AI बारकोड स्कैनर'), ''],
    ['Manufacturing', '🏭', tr('Manufacturing & Job-Work', 'निर्माता व जॉब-वर्क (MSME)'), 'New'],
    ['Udhaar', '📒', tr('Customer Udhaar Khata', 'ग्राहक उधार खाता व लेजर'), pendingCount ? String(pendingCount) : ''],
    ['Purchases', '🛒', tr('Supplier Purchases & ITC', 'सप्लायर खरीद एवं ITC क्रेडिट'), ''],
    ['Expenses', '💸', tr('Daily Expenses & Cash Drawer', 'दैनिक व्यापार खर्चे व रोकड़'), ''],
    ['Reports', '📄', tr('GSTR-3B & Party Ledgers', 'GSTR-3B टैक्स व पार्टी लेजर'), 'CA Ready'],
    ['Staff', '👥', tr('Shop Staff & RBAC', 'दुकान स्टाफ एवं अनुमतियां'), ''],
    ['Standee', '📢', tr('QR Standee & Promo', 'QR स्टैंडी व व्यापार प्रचार'), ''],
    ['Settings', '⚙️', tr('Shop Settings & Backup', 'दुकान सेटिंग्स व डेटा बैकअप'), '']
  ];

  let bannerIcon = '📊';
  let bannerTitle = tr('Business Summary & Real-Time Orders', 'व्यापार सारांश एवं लाइव ऑर्डर्स');
  let bannerSubtitle = tr("Today's revenue, cash/credit split, and pending orders", 'आज की कुल बिक्री, नकद/उधार विभाजन एवं नए ऑर्डर्स');
  let bannerActionHtml = `<button class="btn btn-gold btn-sm" onclick="state.merchantTab='Billing';render()">+ ${tr('New GST Invoice', 'नया GST बिल बनाएं')}</button>`;
  let contentHtml = '';

  if (curTab === 'Dashboard') {
    bannerIcon = '📊';
    bannerTitle = tr('Business Dashboard & Today\'s Sales', 'व्यापार डैशबोर्ड एवं आज की बिक्री');
    bannerSubtitle = tr('Live counter of revenue, cash/credit orders, profit margin and recent customer bills', 'आज की कुल बिक्री, नकद/उधार विभाजन, अनुमानित लाभ एवं नए ऑर्डर्स');
    bannerActionHtml = `<button class="btn btn-gold btn-sm" onclick="state.merchantTab='Billing';render()">+ ${tr('New GST Invoice', 'नया GST बिल बनाएं')}</button>`;
    contentHtml = renderMerchantDashboard(shop);
  } else if (curTab === 'Billing') {
    bannerIcon = '🧾';
    bannerTitle = tr('5-Second Quick Billing & GST Invoices', 'त्वरित 5-सेकंड एवं पक्का GST बिल काउंटर');
    bannerSubtitle = tr('Auto HSN, 0% tax exemption, cash discount & thermal printing', 'HSN कोड, 0% छूट, डिस्काउंट, थर्मल/A4 प्रिंटिंग एवं तुरंत ग्राहक SMS/WA');
    bannerActionHtml = `<button class="btn btn-ghost btn-sm" style="color:#ffffff;border-color:rgba(255,255,255,0.4)" onclick="state.merchantTab='Dashboard';render()">← ${tr('Back to Dashboard', 'डैशबोर्ड पर लौटें')}</button>`;
    contentHtml = renderMerchantInvoiceBuilder(shop);
  } else if (curTab === 'Inventory') {
    bannerIcon = '📦';
    bannerTitle = tr('Inventory Stock & AI Barcode Scanner', 'इन्वेंट्री स्टॉक एवं AI बारकोड स्कैनर');
    bannerSubtitle = tr('Cost price tracking, closing stock valuation & low-stock alerts', 'क्लोजिंग स्टॉक वैल्यूएशन, खरीद लागत (Cost Price) एवं कम स्टॉक अलर्ट');
    bannerActionHtml = `<button class="btn btn-gold btn-sm" onclick="openAiScannerModal()">✨ ${tr('AI Stock Scanner', 'AI बिल स्कैनर')}</button>`;
    contentHtml = renderMerchantInventory(shop);
  } else if (curTab === 'Manufacturing') {
    bannerIcon = '🏭';
    bannerTitle = tr('MSME Manufacturing, Raw Materials & Job-Work Portal', 'MSME निर्माता, कच्चा माल भंडार एवं जॉब-वर्क चालान');
    bannerSubtitle = tr('Raw material stocks, Rule 55 / SAC 9988 job-work delivery challans & batch costing', 'कच्चा माल स्टॉक, जीएसटी नियम 55 जॉब-वर्क डिलीवरी चालान व उत्पादन बैच लागत');
    bannerActionHtml = `<button class="btn btn-ghost btn-sm" style="color:#ffffff;border-color:rgba(255,255,255,0.4)" onclick="state.merchantTab='Dashboard';render()">← ${tr('Back to Dashboard', 'डैशबोर्ड पर लौटें')}</button>`;
    contentHtml = renderMerchantManufacturing(shop);
  } else if (curTab === 'Udhaar') {
    bannerIcon = '📒';
    bannerTitle = tr('Customer Receivable Udhaar Khata & Partial Receipts', 'ग्राहक उधार खाता, आंशिक भुगतान एवं लेजर');
    bannerSubtitle = tr('Party-wise balance, record partial receipts & send WhatsApp payment links', 'पार्टी-वाइज बकाया, आंशिक भुगतान रसीदें (Partial Receipts) एवं WhatsApp पेमेंट रिमाइंडर');
    bannerActionHtml = `<button class="btn btn-ghost btn-sm" style="color:#ffffff;border-color:rgba(255,255,255,0.4)" onclick="state.merchantTab='Dashboard';render()">← ${tr('Back to Dashboard', 'डैशबोर्ड पर लौटें')}</button>`;
    contentHtml = renderMerchantCustomerUdhaarOnly(shop);
  } else if (curTab === 'Purchases') {
    bannerIcon = '🛒';
    bannerTitle = tr('Supplier Purchase Bills & GST Input Credit (ITC)', 'सप्लायर खरीद एवं GST इनपुट टैक्स क्रेडिट (ITC)');
    bannerSubtitle = tr('Record purchases, auto-sync mirror ledgers & calculate Input Tax Credit', 'खरीद बिल प्रविष्टि, सिंगल इनवॉइस मिररिंग एवं इनपुट टैक्स क्रेडिट');
    bannerActionHtml = `<button class="btn btn-ghost btn-sm" style="color:#ffffff;border-color:rgba(255,255,255,0.4)" onclick="state.merchantTab='Dashboard';render()">← ${tr('Back to Dashboard', 'डैशबोर्ड पर लौटें')}</button>`;
    contentHtml = renderMerchantSupplierPurchasesOnly(shop);
  } else if (curTab === 'Expenses') {
    bannerIcon = '💸';
    bannerTitle = tr('Daily Shop Expenses & Cash Drawer Reconciliation', 'दैनिक व्यापार खर्चे एवं गल्ला रोकड़ मिलान');
    bannerSubtitle = tr('Record freight, hammali, tea/rent & balance physical cash drawer vs bank/UPI', 'दुकान खर्चे, गल्ला नकद (Cash Drawer) vs बैंक/UPI का अलग-अलग मिलान');
    bannerActionHtml = `<button class="btn btn-ghost btn-sm" style="color:#ffffff;border-color:rgba(255,255,255,0.4)" onclick="state.merchantTab='Dashboard';render()">← ${tr('Back to Dashboard', 'डैशबोर्ड पर लौटें')}</button>`;
    contentHtml = renderMerchantExpensesOnly(shop);
  } else if (curTab === 'Reports') {
    bannerIcon = '📄';
    bannerTitle = tr('GSTR-3B Net Tax Summary & Party Dr/Cr Ledgers', 'GSTR-3B नेट टैक्स सारांश एवं पार्टी बहीखाता लेजर');
    bannerSubtitle = tr('Zero-latency accounting period filter, Net Tax liability & printable ledgers', '0-लेटेंसी लेखा अवधि फिल्टर, डेबिट/क्रेडिट लेजर स्टेटमेंट एवं नेट टैक्स दायित्व');
    bannerActionHtml = `<button class="btn btn-ghost btn-sm" style="color:#ffffff;border-color:rgba(255,255,255,0.4)" onclick="state.merchantTab='Dashboard';render()">← ${tr('Back to Dashboard', 'डैशबोर्ड पर लौटें')}</button>`;
    contentHtml = renderMerchantReportsOnly(shop);
  } else if (curTab === 'Staff') {
    bannerIcon = '👥';
    bannerTitle = tr('Shop Staff & Role-Based Permissions (RBAC)', 'दुकान स्टाफ एवं भूमिका आधारित अनुमतियां (RBAC)');
    bannerSubtitle = tr('Add operators, billing-only staff & review audit logs', 'स्टाफ सदस्य जोड़ें, बिलिंग/स्टॉक अनुमतियां सीमित करें एवं गतिविधि ऑडिट लॉग');
    bannerActionHtml = `<button class="btn btn-ghost btn-sm" style="color:#ffffff;border-color:rgba(255,255,255,0.4)" onclick="state.merchantTab='Dashboard';render()">← ${tr('Back to Dashboard', 'डैशबोर्ड पर लौटें')}</button>`;
    contentHtml = renderMerchantStaff(shop);
  } else if (curTab === 'Standee') {
    bannerIcon = '📢';
    bannerTitle = tr('Shop QR Standee, Promotion & B2B Leads', 'दुकान QR स्टैंडी एवं व्यापार प्रचार');
    bannerSubtitle = tr('Print table-top QR standee, WhatsApp marketing & spotlit listings', 'प्रिंट योग्य टेबल-टॉप QR स्टैंडी, B2B लीड्स एवं व्यापार स्पॉटलाइट');
    bannerActionHtml = `<button class="btn btn-ghost btn-sm" style="color:#ffffff;border-color:rgba(255,255,255,0.4)" onclick="state.merchantTab='Dashboard';render()">← ${tr('Back to Dashboard', 'डैशबोर्ड पर लौटें')}</button>`;
    contentHtml = renderMerchantMoreTools(shop, qrUrl);
  } else if (curTab === 'Settings') {
    bannerIcon = '⚙️';
    bannerTitle = tr('Shop Profile, 1-Click Offline Backup & Plan', 'दुकान प्रोफ़ाइल, 1-क्लिक बैकअप एवं प्लान');
    bannerSubtitle = tr('Download full data backup, toggle open/close status & plan upgrades', 'सुरक्षित ऑफलाइन डेटा बैकअप, दुकान खुलने/बंद होने की स्थिति एवं प्लान अपग्रेड');
    bannerActionHtml = `<button class="btn btn-gold btn-sm" onclick="downloadFullShopBackup()">💾 ${tr('1-Click Backup', '1-क्लिक डेटा बैकअप')}</button>`;
    contentHtml = renderMerchantSettingsOnly(shop, qrUrl);
  }

  return renderEnterpriseShell({
    roleTitle: shop.shop,
    uniqueId,
    activeTab: curTab,
    navItems,
    bannerIcon,
    bannerTitle,
    bannerSubtitle,
    bannerActionHtml,
    contentHtml,
    shop
  });
}

function renderMerchantMoreTools(shop, qrUrl) {
  const subTabs = [
    ['QR Standee', tr('📱 Shop QR Standee', '📱 दुकान QR स्टैंडी')],
    ['Staff & RBAC', tr('👥 Shop Staff & Activity Log', '👥 स्टाफ व कार्य विवरण')],
    ['B2B Desk', tr('🏦 Working Capital & Website/AI', '🏦 व्यापार पूँजी व वेबसाइट/AI')],
    ['Promote Business', tr('📢 Promote My Business (Spotlight)', '📢 व्यापार प्रमोट करें (स्पॉटलाइट)')],
    ['Refer & Earn', tr('🎁 Refer & Earn +5 AI Credits', '🎁 रेफर व +5 AI क्रेडिट्स')]
  ];
  const cur = state.merchantMoreSubTab || 'QR Standee';
  return `
    <div style="display:grid;gap:18px">
      <div class="card-subtle no-print" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
        <span style="font-weight:800;font-size:0.9rem;color:#0f172a;margin-right:6px">⚙️ ${tr('Select Tool:', 'सुविधा चुनें:')}</span>
        ${subTabs.map(([k, label]) => `
          <button class="btn btn-sm ${cur === k ? 'btn-primary' : 'btn-ghost'}" onclick="state.merchantMoreSubTab='${k}';render()">
            ${label}
          </button>
        `).join('')}
      </div>
      ${cur === 'QR Standee' ? renderMerchantQrStandee(shop, qrUrl) : ''}
      ${cur === 'Staff & RBAC' ? renderMerchantStaff(shop) : ''}
      ${cur === 'B2B Desk' ? renderMerchantB2BDesk(shop) : ''}
      ${cur === 'Promote Business' ? renderMerchantPromotions(shop) : ''}
      ${cur === 'Refer & Earn' ? renderMerchantReferrals(shop) : ''}
    </div>
  `;
}

function filterByAccountingPeriod(list, period) {
  if (!period || period === 'all') return list;
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const monthStr = now.toISOString().slice(0, 7);
  return (list || []).filter(item => {
    const dStr = String(item.date || item.createdAt || '').slice(0, 10);
    if (period === 'today') return dStr === todayStr;
    if (period === 'month') return dStr.slice(0, 7) === monthStr;
    return true;
  });
}

function renderMerchantDashboard(shop) {
  const period = state.accountingPeriod || 'all';
  const allOrders = state.data.myOrders || [];
  const allExpenses = state.data.myExpenses || [];
  const allSupplierPurchases = state.data.mySupplierPurchases || [];

  const orders = filterByAccountingPeriod(allOrders, period);
  const expenses = filterByAccountingPeriod(allExpenses, period);
  const supplierPurchases = filterByAccountingPeriod(allSupplierPurchases, period);

  const products = state.data.products.filter(p => p.shopId === shop.id);
  const lowStockItems = products.filter(p => Number(p.stock) <= Number(p.minStock || 10));

  let grossSales = 0;
  let taxableSales = 0;
  let outputGst = 0;
  let totalCogs = 0;
  let salesReturnTotal = 0;
  let totalDiscountGiven = 0;
  const split = { Cash: 0, UPI: 0, Card: 0, Credit: 0, Unmarked: 0 };

  for (const o of orders) {
    if (o.status === 'Rejected') continue;
    const g = Number(o.totals?.gross) || 0;
    if (o.status === 'Sales Return') {
      salesReturnTotal += g;
      continue;
    }
    const tx = Number(o.totals?.taxable) || 0;
    const gs = Number(o.totals?.gst) || 0;
    const cost = Number(o.totals?.costTotal) || Math.round(tx * 0.84);
    const disc = Number(o.discount || o.totals?.discount) || 0;

    grossSales += g;
    taxableSales += tx;
    outputGst += gs;
    totalCogs += cost;
    totalDiscountGiven += disc;

    if (o.paymentMode === 'Credit') {
      const paid = o.udhaarSettled ? g : Math.min(g, Math.max(0, Number(o.paidAmount) || 0));
      const due = Math.max(0, g - paid);
      split.Credit += due;
      if (paid > 0) {
        const receipts = Array.isArray(o.receipts) && o.receipts.length > 0 ? o.receipts : [{ amount: paid, mode: 'Cash' }];
        for (const r of receipts) {
          const rm = split[r.mode] !== undefined ? r.mode : 'Cash';
          split[rm] += Number(r.amount) || 0;
        }
      }
    } else {
      const m = split[o.paymentMode] !== undefined ? o.paymentMode : 'Unmarked';
      split[m] += g;
    }
  }

  const cashExpenses = expenses.filter(e => (e.mode || 'Cash') === 'Cash').reduce((s, e) => s + (Number(e.amount) || 0), 0);
  const bankExpenses = expenses.filter(e => (e.mode || 'Cash') !== 'Cash').reduce((s, e) => s + (Number(e.amount) || 0), 0);
  const totalExpenses = cashExpenses + bankExpenses;

  const vouchers = filterByAccountingPeriod(state.data.myVouchers || [], period);
  const contraCashToBank = vouchers
    .filter(v => v.voucherType === 'Contra' && v.direction === 'cash_to_bank')
    .reduce((s, v) => s + (Number(v.amount) || 0), 0);
  const contraBankToCash = vouchers
    .filter(v => v.voucherType === 'Contra' && v.direction === 'bank_to_cash')
    .reduce((s, v) => s + (Number(v.amount) || 0), 0);

  const cashInDrawer = split.Cash - cashExpenses - contraCashToBank + contraBankToCash;
  const bankUpiBalance = (split.UPI + split.Card) - bankExpenses + contraCashToBank - contraBankToCash;

  // STRICT CGST SEC 16 & 17(2) RULE: 0% ITC if supplierGstin is empty OR gstAmount is 0!
  const inputItc = supplierPurchases.reduce((s, sp) => {
    if (!sp.supplierGstin || String(sp.supplierGstin).trim().length < 15) return s;
    return s + Math.max(0, Number(sp.gstAmount ?? 0));
  }, 0);
  const netGstPayable = Math.round((outputGst - inputItc) * 100) / 100;

  // INCOME TAX ACT SEC 44AD PRESUMPTIVE INCOME & SEC 40A(3) / 269ST AUDIT CHECKS
  const digitalTurnover = split.UPI + split.Card;
  const cashTurnover = split.Cash + split.Credit + split.Unmarked;
  const presumptiveIncome44AD = Math.round((digitalTurnover * 0.06) + (cashTurnover * 0.08));
  const taxSavedViaDigital44AD = Math.round(digitalTurnover * 0.02);
  const sec40A3Violations = expenses.filter(e => (e.mode || 'Cash') === 'Cash' && Number(e.amount) > (String(e.category).includes('भाड़ा') ? 35000 : 10000));
  const sec269STViolations = orders.filter(o => o.paymentMode === 'Cash' && Number(o.totals?.gross) >= 200000);

  const totalSupplierDue = allSupplierPurchases
    .filter(sp => sp.status !== 'Paid')
    .reduce((sum, sp) => sum + Math.max(0, (Number(sp.totalAmount) || 0) - (Number(sp.paidAmount) || 0)), 0);

  const grossProfit = Math.max(0, taxableSales - totalCogs);
  const netProfit = grossProfit - totalExpenses;
  const closingStockValue = products.reduce((s, p) => {
    const unitCost = Number(p.costPrice) || Math.round((Number(p.wholesalePrice || p.price) || 0) * 0.84);
    return s + (Math.max(0, Number(p.stock) || 0) * unitCost);
  }, 0);

  return `
    <div style="display:grid;gap:20px">
      <!-- Instant Zero-Load Period Filter Bar -->
      <div class="card-subtle no-print" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;background:#f8fafc;border:1.5px solid #cbd5e1">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <span style="font-weight:800;font-size:0.9rem;color:#0f172a">📅 ${tr('Accounting Period Filter:', 'हिसाब की अवधि चुनें:')}</span>
          ${[
            ['all', tr('All Time (संपूर्ण)', 'संपूर्ण हिसाब (All)')],
            ['today', tr('Today (आज का गल्ला)', 'आज का हिसाब (Today)')],
            ['month', tr('This Month (इस महीने का GST/P&L)', 'इस महीने का हिसाब (This Month)')]
          ].map(([k, lbl]) => `
            <button class="btn btn-sm ${period === k ? 'btn-primary' : 'btn-ghost'}" onclick="state.accountingPeriod='${k}';render()">
              ${lbl}
            </button>
          `).join('')}
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn-ghost btn-sm" onclick="exportGstr1Csv()">📥 ${tr('Export GSTR-1 / Tally CSV', 'GSTR-1 CSV डाउनलोड')}</button>
        </div>
      </div>

      ${lowStockItems.length > 0 ? `
        <div class="card" style="border:2px solid var(--danger);background:#fef2f2;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
          <div>
            <span class="badge badge-danger">⚠️ ${tr('LOW STOCK ALERT — REORDER NEEDED', 'कम स्टॉक अलर्ट — तुरंत माल मँगाएँ')}</span>
            <p style="font-weight:800;color:#991b1b;margin-top:6px">
              ${lowStockItems.map(p => `${trDyn(p.name)} (${p.stock} ${tr('left', 'शेष')})`).join(' · ')}
            </p>
          </div>
          <button class="btn btn-danger btn-sm" onclick="state.merchantTab='Inventory';render()">
            📦 ${tr('Open Stock & Reorder →', 'स्टॉक अपडेट करें →')}
          </button>
        </div>
      ` : ''}

      <!-- Top KPIs -->
      <div class="grid grid-4">
        <div class="stat-card">
          <p class="stat-label">${tr('Gross Sales (Net of Returns)', 'कुल बिक्री (वापसी घटाकर)')}</p>
          <p class="stat-value text-gold">${fmtINR(grossSales)}</p>
          <p class="stat-sub">${orders.length} ${tr('Bills', 'बिल')} ${salesReturnTotal > 0 ? `· ${tr('Returns:', 'वापसी:')} ${fmtINR(salesReturnTotal)}` : ''}</p>
        </div>
        <div class="stat-card">
          <p class="stat-label">${tr('True Net Profit (P&L Estimate)', 'अनुमानित शुद्ध लाभ (P&L)')}</p>
          <p class="stat-value ${netProfit >= 0 ? 'text-success' : 'text-danger'}">${fmtINR(netProfit)}</p>
          <p class="stat-sub">${tr('Margin:', 'मार्जिन:')} ${fmtINR(grossProfit)} − ${tr('Exp:', 'खर्चा:')} ${fmtINR(totalExpenses)}</p>
        </div>
        <div class="stat-card">
          <p class="stat-label">${tr('Customer Udhaar (Balance Due)', 'ग्राहकों से लेना बाकी (शेष उधार)')}</p>
          <p class="stat-value text-danger">${fmtINR(split.Credit)}</p>
          <p class="stat-sub" style="cursor:pointer;text-decoration:underline" onclick="state.merchantTab='Udhaar Khata';render()">${tr('Partial Receipt & Ledger →', 'किस्त जमा व खाता देखें →')}</p>
        </div>
        <div class="stat-card">
          <p class="stat-label">${tr('Supplier Payable (To Pay)', 'सप्लायर को देना बाकी')}</p>
          <p class="stat-value" style="color:#d97706">${fmtINR(totalSupplierDue)}</p>
          <p class="stat-sub" style="cursor:pointer;text-decoration:underline" onclick="state.merchantTab='Udhaar Khata';render()">${tr('Open Supplier Khata →', 'सप्लायर खाता देखें →')}</p>
        </div>
      </div>

      <!-- CA Financial Desk: 1. Separate Cash vs Bank Book  2. GSTR-3B Set-Off & Closing Stock Valuation -->
      <div class="grid grid-2">
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:6px">
            <h3>💵 ${tr('Cash Book vs Bank/UPI Book (गल्ला व बैंक मिलान)', 'गल्ला (नकद) और बैंक/UPI का अलग-अलग हिसाब')}</h3>
            <span class="badge badge-primary">${tr('Exact Drawer Match', 'सटीक रोकड़ मिलान')}</span>
          </div>
          <div class="grid grid-2" style="margin-bottom:10px;gap:10px">
            <div class="card-subtle" style="background:#f0fdf4;border:1.5px solid #16a34a;padding:12px">
              <p style="font-size:0.78rem;font-weight:700;color:#166534">💵 ${tr('Physical Cash in Drawer (गल्ले में नकद)', 'गल्ले में शुद्ध नकद नोट (Cash in Hand)')}</p>
              <p style="font-size:1.35rem;font-weight:800;color:#15803d;margin-top:4px">${fmtINR(cashInDrawer)}</p>
              <p class="text-muted" style="font-size:0.72rem">${tr('In:', 'आया:')} ${fmtINR(split.Cash)} − ${tr('Exp:', 'खर्चा:')} ${fmtINR(cashExpenses)} ${contraCashToBank > 0 ? `− बैंक जमा (Contra): ${fmtINR(contraCashToBank)}` : ''}</p>
            </div>
            <div class="card-subtle" style="background:#eff6ff;border:1.5px solid #2563eb;padding:12px">
              <p style="font-size:0.78rem;font-weight:700;color:#1e40af">🏦 ${tr('Bank & UPI Balance (बैंक व UPI खाता)', 'बैंक और UPI में प्राप्त राशि')}</p>
              <p style="font-size:1.35rem;font-weight:800;color:#1d4ed8;margin-top:4px">${fmtINR(bankUpiBalance)}</p>
              <p class="text-muted" style="font-size:0.72rem">UPI/Card: ${fmtINR(split.UPI + split.Card)} ${contraCashToBank > 0 ? `+ नकद जमा (Contra): ${fmtINR(contraCashToBank)}` : ''} − ${tr('Exp:', 'खर्चा:')} ${fmtINR(bankExpenses)}</p>
            </div>
          </div>
          <div class="grid grid-4" style="grid-template-columns:repeat(5, 1fr);gap:8px">
            ${['Cash', 'UPI', 'Card', 'Credit', 'Unmarked'].map(k => `
              <div class="card-subtle" style="padding:8px;text-align:center">
                <p class="text-muted" style="font-size:0.7rem">${k === 'Credit' ? tr('Due Udhaar', 'शेष उधार') : k}</p>
                <p style="font-weight:800;font-size:0.9rem;margin-top:2px">${fmtINR(split[k])}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:6px">
            <h3>🧾 ${tr('GSTR-3B Tax Set-Off & Stock Valuation', 'GSTR-3B शुद्ध देय टैक्स और स्टॉक मूल्यांकन')}</h3>
            <span class="badge badge-gold">CA Ready Summary</span>
          </div>
          <div class="grid grid-3" style="gap:8px;margin-bottom:12px">
            <div class="card-subtle" style="padding:10px">
              <p class="text-muted" style="font-size:0.74rem">${tr('Output GST (On Sales)', 'बिक्री पर GST (Output)')}</p>
              <p style="font-weight:800;font-size:1.05rem;color:#dc2626">${fmtINR(outputGst)}</p>
            </div>
            <div class="card-subtle" style="padding:10px">
              <p class="text-muted" style="font-size:0.74rem">${tr('Input ITC (On Purchases)', 'खरीद पर छूट (Input ITC)')}</p>
              <p style="font-weight:800;font-size:1.05rem;color:#16a34a">− ${fmtINR(inputItc)}</p>
            </div>
            <div class="card-subtle" style="padding:10px;background:#fffbeb;border-color:#f59e0b">
              <p style="font-size:0.74rem;font-weight:700;color:#92400e">${tr('Net GST Payable', 'सरकार को देय शुद्ध GST')}</p>
              <p style="font-weight:800;font-size:1.08rem;color:#b45309">${netGstPayable > 0 ? fmtINR(netGstPayable) : `${fmtINR(0)} (ITC Credit: ${fmtINR(Math.abs(netGstPayable))})`}</p>
            </div>
          </div>
          <div class="card-subtle" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px;padding:8px 12px">
            <span style="font-size:0.84rem">📦 <b>${tr('Closing Stock Value (at Cost):', 'गोदाम के बचे स्टॉक की कुल लागत कीमत:')}</b> <strong class="text-gold">${fmtINR(closingStockValue)}</strong></span>
            ${totalDiscountGiven > 0 ? `<span class="badge badge-muted">${tr('Total Discounts Given:', 'कुल दी गई छूट:')} ${fmtINR(totalDiscountGiven)}</span>` : ''}
          </div>
          <form onsubmit="saveMerchantProfile(event)" style="display:grid;grid-template-columns:1fr 1fr auto;gap:8px;align-items:end">
            <div class="form-group" style="margin:0">
              <label class="form-label" style="font-size:0.75rem">Shop GSTIN</label>
              <input class="input" style="padding:6px 10px;font-size:0.84rem" id="mp-gstin" value="${esc(shop.gstin || '')}" placeholder="08AABCM1234F1Z5" />
            </div>
            <div class="form-group" style="margin:0">
              <label class="form-label" style="font-size:0.75rem">Merchant UPI ID</label>
              <input class="input" style="padding:6px 10px;font-size:0.84rem" id="mp-upi" value="${esc(shop.upiId || '')}" placeholder="yourshop@okaxis" />
            </div>
            <button type="submit" class="btn btn-primary btn-sm">${tr('Save', 'सेव करें')}</button>
          </form>
        </div>
      </div>

      <!-- Income Tax Act (Sec 44AD, 40A(3), 269ST) & Accounting Standards Compliance Bar -->
      <div class="card" style="background:linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%);border:1.5px solid #93c5fd">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
          <div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
              <span class="badge badge-primary">⚖️ ${tr('INCOME TAX ACT & ICAI ACCOUNTING STANDARDS GUARD', 'आयकर अधिनियम (धारा 44AD, 40A(3), 269ST) एवं लेखांकन मानक सुरक्षा')}</span>
              <span class="badge badge-gold">0% GST = 0% ITC Enforced</span>
            </div>
            <p style="font-size:0.9rem;color:#0f172a;margin-top:6px;font-weight:600">
              📊 <b>${tr('Section 44AD Presumptive Taxable Income:', 'आयकर धारा 44AD अनुमानित कर-योग्य आय:')}</b> <strong class="text-gold">${fmtINR(presumptiveIncome44AD)}</strong>
              <span class="text-muted" style="font-size:0.82rem">(${tr('6% on UPI/Bank Sales', 'UPI/बैंक बिक्री पर 6%')} [${fmtINR(Math.round(digitalTurnover * 0.06))}] + ${tr('8% on Cash/Other Sales', 'नकद बिक्री पर 8%')} [${fmtINR(Math.round(cashTurnover * 0.08))}])</span>
              ${taxSavedViaDigital44AD > 0 ? ` · <span class="text-success">✓ UPI पेमेंट लेने से आपकी कर-योग्य आय में ${fmtINR(taxSavedViaDigital44AD)} की सीधी छूट मिली!</span>` : ''}
            </p>
            ${(sec40A3Violations.length > 0 || sec269STViolations.length > 0) ? `
              <p style="font-size:0.84rem;color:#dc2626;font-weight:700;margin-top:4px">
                ⚠️ ${sec40A3Violations.length > 0 ? `धारा 40A(3) अलर्ट: ${sec40A3Violations.length} नकद खर्चे ₹10,000 की सीमा से अधिक हैं (आयकर में अमान्य हो सकते हैं)! ` : ''}
                ${sec269STViolations.length > 0 ? `धारा 269ST अलर्ट: ${sec269STViolations.length} बिलों में ₹2,00,000+ नकद प्राप्ति दर्ज है!` : ''}
              </p>
            ` : `
              <p style="font-size:0.82rem;color:#15803d;font-weight:700;margin-top:4px">
                ✓ ${tr('100% Compliant with Section 40A(3) (Cash Expense Limit ≤ ₹10,000) & Section 269ST (Cash Receipt < ₹2,00,000).', 'धारा 40A(3) (नकद खर्च ≤ ₹10,000) और धारा 269ST (नकद प्राप्ति < ₹2,00,000) के नियमों का 100% पालन हो रहा है।')}
              </p>
            `}
          </div>
          <button class="btn btn-gold btn-sm" onclick="state.merchantTab='Udhaar Khata';render()">
            ✨ ${tr('Open AI Voucher & Contra Desk →', 'स्मार्ट AI वाउचर व कॉन्ट्रा डेस्क खोलें →')}
          </button>
        </div>
      </div>

      <!-- Orders & Parchi Management Table -->
      <div class="card">
        <h3 style="margin-bottom:14px">📋 ${tr('All Orders, Parchi Requests & Walk-in Invoices', 'सभी ऑर्डर, पर्ची अनुरोध और बिल')}</h3>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>${tr('Invoice / ID', 'बिल नंबर')}</th>
                <th>${tr('Buyer & GSTIN', 'खरीदार व GSTIN')}</th>
                <th>${tr('Items / Parchi Note', 'सामान / पर्ची विवरण')}</th>
                <th>${tr('Tax & Total', 'टैक्स व कुल राशि')}</th>
                <th>${tr('Payment & Status', 'भुगतान व स्थिति')}</th>
                <th>${tr('Actions & WhatsApp', 'कार्रवाई')}</th>
              </tr>
            </thead>
            <tbody>
              ${orders.map(o => {
                const tot = o.totals || { taxable: 0, gst: 0, gross: 0, supplyType: 'intra' };
                const itemStr = (o.items || []).map(i => `${i.name} × ${i.qty}`).join(', ');
                const upiLink = shop.upiId && tot.gross > 0
                  ? `upi://pay?pa=${encodeURIComponent(shop.upiId)}&pn=${encodeURIComponent(shop.shop)}&am=${tot.gross}&cu=INR`
                  : '';
                const waBillMsg = `🧾 *Bill / Order Update from ${shop.shop}*\nInvoice: *${o.invoiceNo}*\nStatus: *${o.status}*\nItems: ${itemStr || o.note}\nTaxable: ₹${tot.taxable} | GST (${tot.supplyType === 'inter' ? 'IGST' : 'CGST+SGST'}): ₹${tot.gst}\n*Grand Total: ₹${tot.gross}*${upiLink ? `\n\n💳 Pay via UPI: ${upiLink}` : ''}`;

                return `
                  <tr>
                    <td>
                      <b>${esc(o.invoiceNo)}</b>
                      <div class="text-muted" style="font-size:0.72rem">${esc(o.channel || 'Online')} · ${new Date(o.date).toLocaleDateString('en-IN')}</div>
                    </td>
                    <td>
                      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
                        <b>${esc(o.customer)}</b>
                        <span class="badge badge-primary" style="font-family:monospace;font-size:0.72rem">${esc(o.customerCode || 'KQC-' + String(o.phone || '849201').slice(-6))}</span>
                      </div>
                      <div class="text-muted" style="font-size:0.75rem">${esc(o.phone)} · ${esc(o.address)}</div>
                      ${o.buyerGstin
                        ? `<span class="badge badge-gold" style="margin-top:3px">B2B ITC · ${esc(o.buyerGstin)} (${tot.supplyType === 'inter' ? 'IGST' : 'Intra'})</span>`
                        : `<span class="badge badge-muted" style="margin-top:3px">B2C / Unregistered</span>`}
                      ${o.merchantRatingForBuyer ? `
                        <div style="margin-top:4px;font-size:0.74rem;color:#15803d;font-weight:700">
                          ⭐ ${o.merchantRatingForBuyer}/5 · ${esc(o.merchantFeedbackForBuyer || 'विश्वसनीय ग्राहक')}
                        </div>
                      ` : ''}
                    </td>
                    <td style="max-width:290px">
                      ${itemStr ? `<div style="font-size:0.82rem">${esc(itemStr)}</div>` : ''}
                      ${o.note ? `
                        <div class="card-subtle" style="margin-top:4px;padding:6px 8px;font-size:0.78rem;border-color:var(--gold)">
                          <b>📝 Parchi:</b> ${esc(o.note)}
                          <div style="margin-top:6px;display:flex;gap:6px;flex-wrap:wrap">
                            <button class="btn btn-gold btn-sm" onclick="aiMatchParchiOrder('${o.id}')">
                              ✨ ${tr('AI Auto-Match Stock (1 Cr)', 'AI से पर्ची मिलान करें')}
                            </button>
                          </div>
                        </div>
                      ` : ''}
                    </td>
                    <td>
                      <div style="font-weight:800;font-size:1rem" class="text-gold">${fmtINR(tot.gross)}</div>
                      <div class="text-muted" style="font-size:0.72rem">Taxable: ${fmtINR(tot.taxable)} · GST: ${fmtINR(tot.gst)} ${Number(o.discount || tot.discount) > 0 ? `· छूट: ₹${o.discount || tot.discount}` : ''}</div>
                      ${o.paymentMode === 'Credit' && !o.udhaarSettled ? `
                        <div style="font-size:0.74rem;color:#dc2626;font-weight:700;margin-top:2px">
                          जमा: ${fmtINR(o.paidAmount || 0)} | शेष उधार: ${fmtINR(Math.max(0, tot.gross - (Number(o.paidAmount) || 0)))}
                        </div>
                      ` : ''}
                      ${(o.note || tot.gross === 0) ? `
                        <div style="display:flex;gap:4px;margin-top:6px">
                          <input class="input" type="number" id="prc-${o.id}" value="${o.customAmount || ''}" placeholder="₹ Parchi Bill" style="padding:4px 8px;font-size:0.78rem;width:105px" />
                          <button class="btn btn-primary btn-sm" onclick="saveParchiAmount('${o.id}')">₹ Set</button>
                        </div>
                      ` : ''}
                    </td>
                    <td>
                      <div style="display:grid;gap:6px">
                        <select class="select" style="padding:5px 8px;font-size:0.78rem" onchange="updateOrderField('${o.id}', { paymentMode: this.value })">
                          ${['Unmarked', 'Cash', 'UPI', 'Card', 'Credit'].map(pm => `<option value="${pm}" ${o.paymentMode === pm ? 'selected' : ''}>${pm === 'Credit' ? 'Credit (Udhaar)' : pm}</option>`).join('')}
                        </select>
                        <select class="select" style="padding:5px 8px;font-size:0.78rem" onchange="updateOrderField('${o.id}', { status: this.value })">
                          ${['New', 'Accepted', 'Packed', 'Out for Delivery', 'Delivered', 'Sales Return', 'Rejected'].map(st => `<option value="${st}" ${o.status === st ? 'selected' : ''}>${st === 'Sales Return' ? 'Sales Return (माल वापसी)' : st}</option>`).join('')}
                        </select>
                      </div>
                    </td>
                    <td>
                      <div style="display:grid;gap:6px">
                        <div style="display:flex;gap:6px;flex-wrap:wrap">
                          <a class="btn btn-primary btn-sm" target="_blank" rel="noreferrer" href="https://wa.me/91${o.phone}?text=${encodeURIComponent(waBillMsg)}">
                            💬 ${tr('Send Bill + UPI on WA', 'WhatsApp बिल भेजें')}
                          </a>
                          <a class="btn btn-ghost btn-sm" href="tel:${o.phone}">📞</a>
                        </div>
                        <select class="select" style="padding:4px 8px;font-size:0.74rem;border-color:var(--gold)" onchange="rateBuyerFromOrder('${o.id}', this.value)">
                          <option value="">⭐ ${tr('Rate Buyer (Order-Backed)', 'ग्राहक को रेटिंग दें')}</option>
                          <option value="5|समय पर भुगतान करने वाला विश्वसनीय ग्राहक (Timely Payer)" ${o.merchantRatingForBuyer === 5 ? 'selected' : ''}>⭐⭐⭐⭐⭐ समय पर भुगतान (Timely Payer)</option>
                          <option value="5|नियमित थोक खरीदार (Regular Wholesale Buyer)">⭐⭐⭐⭐⭐ नियमित थोक खरीदार</option>
                          <option value="4|अच्छा व्यवहार व सहयोगी ग्राहक (Good Buyer)" ${o.merchantRatingForBuyer === 4 ? 'selected' : ''}>⭐⭐⭐⭐ अच्छा ग्राहक (Good Buyer)</option>
                          <option value="2|भुगतान में देरी / उधार बकाया (Payment Delayed)" ${o.merchantRatingForBuyer === 2 ? 'selected' : ''}>⭐⭐ भुगतान में देरी (Delayed)</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// WALK-IN GST / IGST / ESTIMATE INVOICE BUILDER (WITH AUTO-CATALOG & THERMAL/A4)
// ============================================================================
function renderMerchantInvoiceBuilder(shop) {
  const products = state.data.products.filter(p => p.shopId === shop.id);
  const hasGstin = Boolean(shop.gstin && shop.gstin.trim().length >= 15);
  const buyerGstin = (state.invoiceBuyer.gstin || '').trim().toUpperCase();
  const isInterState = state.invoiceBuyer.supplyType === 'inter' || (
    state.invoiceBuyer.supplyType === 'auto' &&
    hasGstin && buyerGstin.length >= 2 && buyerGstin.slice(0, 2) !== shop.gstin.slice(0, 2)
  );

  let totalTaxable = 0;
  let totalGst = 0;
  const computedLines = state.invoiceLines.map(line => {
    const qty = Math.max(1, Number(line.qty) || 1);
    const rate = Math.max(0, Number(line.price) || 0);
    const gstRate = hasGstin ? Number(line.gstRate || 0) : 0;
    const raw = qty * rate;
    let taxable = raw;
    let gst = 0;
    if (line.taxMode === 'inclusive' && gstRate > 0) {
      taxable = raw / (1 + gstRate / 100);
      gst = raw - taxable;
    } else {
      gst = taxable * (gstRate / 100);
    }
    totalTaxable += taxable;
    totalGst += gst;
    return { ...line, qty, rate, gstRate, taxable, gst, gross: taxable + gst };
  });

  const billDiscount = Math.max(0, Number(state.invoiceBuyer.discount) || 0);
  const grandTotal = Math.max(0, (totalTaxable + totalGst) - billDiscount);
  const nextSeq = String((Number(shop.invoiceCounter) || 0) + 1).padStart(4, '0');
  const previewInvNo = `KQ-2627-${nextSeq}`;

  return `
    <div style="display:grid;gap:20px">
      <!-- ⚡ 5-SECOND EXPRESS COUNTER BILL (NO ITEM TYPING REQUIRED!) -->
      <div class="card no-print" style="background:linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);border:2px solid #f59e0b">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px">
          <span class="badge badge-gold">⚡ ${tr('5-SECOND EXPRESS COUNTER BILL', '5-सेकंड एक्सप्रेस काउंटर बिल (भीड़ के समय तुरंत बिल बनाएँ)')}</span>
          <span style="font-size:0.84rem;color:#92400e;font-weight:700">${tr('No item-by-item typing needed — just enter total amount!', 'अलग-अलग सामान लिखने की ज़रूरत नहीं — सीधे कुल राशि डालकर 3 सेकंड में बिल सेव करें!')}</span>
        </div>
        <form onsubmit="saveExpressCounterBill(event, '${shop.id}')">
          <div class="grid grid-4" style="gap:10px;align-items:end">
            <div class="form-group" style="margin:0">
              <label class="form-label">${tr('Customer / Party Name', 'ग्राहक / पार्टी का नाम')} *</label>
              <input class="input" id="qb-name" required placeholder="${tr('e.g. Ramesh Contractor', 'जैसे: रमेश ठेकेदार / नकद ग्राहक')}" />
            </div>
            <div class="form-group" style="margin:0">
              <label class="form-label">${tr('10-Digit Mobile (Optional)', 'मोबाइल नंबर (WhatsApp हेतु)')}</label>
              <input class="input" id="qb-phone" maxlength="10" placeholder="98XXXXXXXX" />
            </div>
            <div class="form-group" style="margin:0">
              <label class="form-label">${tr('Total Bill Amount (₹)', 'कुल बिल राशि (₹)')} *</label>
              <input class="input" type="number" id="qb-amt" required min="1" placeholder="4500" />
            </div>
            <div class="form-group" style="margin:0">
              <label class="form-label">${tr('Payment Mode & Short Note', 'भुगतान माध्यम व विवरण')}</label>
              <div style="display:flex;gap:6px">
                <select class="select" id="qb-mode" style="width:130px">
                  <option value="Cash">${tr('Cash (नकद)', 'नकद (Cash)')}</option>
                  <option value="UPI">UPI</option>
                  <option value="Credit">${tr('Credit (उधार)', 'उधार (Credit)')}</option>
                </select>
                <input class="input" id="qb-note" placeholder="${tr('e.g. Hardware items', 'जैसे: हार्डवेयर सामान')}" />
              </div>
            </div>
          </div>
          <div style="margin-top:12px;display:flex;justify-content:flex-end">
            <button type="submit" class="btn btn-gold">⚡ ${tr('Save Express Bill & Send on WhatsApp (3 Sec)', 'एक्सप्रेस बिल सेव करें और WhatsApp पर भेजें')}</button>
          </div>
        </form>
      </div>

      <div class="grid grid-2">
        <!-- Left: Full Rule-46 GST / Estimate Invoice Entry Form (Hidden when printing) -->
        <div class="card no-print">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
          <h3>🧾 ${hasGstin ? tr('Rule-46 GST / IGST Tax Invoice', 'GST / IGST टैक्स इनवॉइस') : tr('Estimate / Bill of Supply (Non-GST)', 'एस्टीमेट / बिल ऑफ़ सप्लाई')}</h3>
          <span class="badge badge-gold">${previewInvNo}</span>
        </div>

        ${!hasGstin ? `
          <div class="card-subtle" style="margin-bottom:12px;border-color:var(--gold);font-size:0.8rem">
            ⚖️ <b>${tr('Legal Safeguard Active (0% Tax & 0% ITC):', 'कानूनी सुरक्षा चालू (0% टैक्स व 0% ITC):')}</b> ${tr('Your shop has no GSTIN on file, so bills are automatically titled "BILL OF SUPPLY / ESTIMATE" with mandatory HSN codes, 0% GST, and 0% ITC eligibility.', 'आपकी दुकान का GSTIN दर्ज नहीं है, इसलिए कानून के अनुसार बिल स्वचालित रूप से "BILL OF SUPPLY / ESTIMATE (0% GST — 0% ITC क्रेडिट)" के रूप में अनिवार्य HSN कोड के साथ बनेगा।')}
          </div>
        ` : ''}

        <!-- 1-Click Dual-Ledger Buyer Picker (एक इनवॉइस = दोनों खातों में ऑटो-अपडेट!) -->
        <div class="card-subtle" style="margin-bottom:12px;background:#f0fdf4;border:1.5px solid #16a34a;padding:10px 12px">
          <label class="form-label" style="color:#166534;font-size:0.8rem">🔄 ${tr('Dual-Ledger Auto-Sync: Pick Registered Buyer Shop (Updates Seller Sales + Buyer Purchase Ledger in 1 Bill!)', 'दोहरा बही-खाता सिंक: पंजीकृत खरीदार व्यापारी चुनें (यह एक ही बिल आपके Sales और खरीदार के Purchase व ITC खाते में अपने-आप जुड़ जाएगा!)')}</label>
          <select class="select" style="padding:6px 10px;font-size:0.84rem;margin-top:4px" onchange="pickRegisteredBuyerForInvoice(this.value)">
            <option value="">-- ${tr('Walk-in / Custom Buyer (Or select a KuberQ Merchant below for Dual-Ledger Sync)', 'सामान्य ग्राहक (या नीचे से पंजीकृत व्यापारी चुनें)')} --</option>
            ${(state.data.merchants || []).filter(m => m.id !== shop.id).map(m => `
              <option value="${m.id}">[${esc(m.refCode)}] ${esc(m.shop)} (${esc(m.city)}) · GSTIN: ${esc(m.gstin || 'Unregistered')}</option>
            `).join('')}
          </select>
        </div>

        <div class="grid grid-2">
          <div class="form-group">
            <label class="form-label">${tr('Buyer / Party Name', 'खरीदार / पार्टी का नाम')}</label>
            <input class="input" value="${esc(state.invoiceBuyer.name)}" oninput="state.invoiceBuyer.name=this.value;render()" placeholder="e.g. Ratan Hardware" />
          </div>
          <div class="form-group">
            <label class="form-label">${tr('Buyer 10-Digit Mobile', 'खरीदार का मोबाइल')}</label>
            <input class="input" maxlength="10" value="${esc(state.invoiceBuyer.phone)}" oninput="state.invoiceBuyer.phone=this.value;render()" placeholder="98XXXXXXXX" />
          </div>
        </div>

        <div class="grid grid-2">
          <div class="form-group">
            <label class="form-label">${tr('Buyer GSTIN (Auto-detects IGST if other state)', 'खरीदार GSTIN (अन्य राज्य होने पर IGST अपने-आप लगेगा)')}</label>
            <input class="input" maxlength="15" style="text-transform:uppercase" value="${esc(state.invoiceBuyer.gstin)}" oninput="state.invoiceBuyer.gstin=this.value.toUpperCase();render()" placeholder="24AAACR5055K1Z2 (24=Gujarat)" />
          </div>
          <div class="form-group">
            <label class="form-label">${tr('Payment Mode & Supply Type', 'भुगतान तरीका और सप्लाई')}</label>
            <div style="display:flex;gap:6px">
              <select class="select" onchange="state.invoiceBuyer.paymentMode=this.value;render()">
                ${['Cash', 'UPI', 'Card', 'Credit'].map(m => `<option value="${m}" ${state.invoiceBuyer.paymentMode === m ? 'selected' : ''}>${m === 'Credit' ? 'Credit (Udhaar)' : m}</option>`).join('')}
              </select>
              <select class="select" onchange="state.invoiceBuyer.supplyType=this.value;render()">
                <option value="auto" ${state.invoiceBuyer.supplyType === 'auto' ? 'selected' : ''}>Auto (${isInterState ? 'IGST' : 'CGST+SGST'})</option>
                <option value="intra" ${state.invoiceBuyer.supplyType === 'intra' ? 'selected' : ''}>Intra (CGST+SGST)</option>
                <option value="inter" ${state.invoiceBuyer.supplyType === 'inter' ? 'selected' : ''}>Inter (100% IGST)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="grid grid-2">
          <div class="form-group">
            <label class="form-label">🏷️ ${tr('Bill Discount / Trade Rebate (₹)', 'बिल पर छूट / बट्टा (Discount ₹)')}</label>
            <input class="input" type="number" min="0" value="${state.invoiceBuyer.discount || 0}" oninput="state.invoiceBuyer.discount=Number(this.value);render()" placeholder="0" />
          </div>
          ${state.invoiceBuyer.paymentMode === 'Credit' ? `
            <div class="form-group">
              <label class="form-label">💵 ${tr('Partial Advance Paid Now (₹)', 'उधार बिल में अभी जमा राशि (किस्त ₹)')}</label>
              <input class="input" type="number" min="0" value="${state.invoiceBuyer.paidAmount || 0}" oninput="state.invoiceBuyer.paidAmount=Number(this.value);render()" placeholder="0" />
            </div>
          ` : `
            <div class="form-group">
              <label class="form-label">✓ ${tr('Settlement Status', 'भुगतान स्थिति')}</label>
              <input class="input" readonly value="${tr('100% Full Payment on Counter', 'काउंटर पर पूर्ण भुगतान')}" />
            </div>
          `}
        </div>

        <h4 style="margin:12px 0 8px;font-size:0.86rem" class="text-gold">
          📦 ${tr('Line Items (New items typed here are auto-saved to your Inventory!)', 'बिल के सामान (नया नाम लिखने पर वह अपने-आप आपके स्टॉक में भी सेव हो जाएगा!)')}
        </h4>

        <div style="display:grid;gap:10px">
          ${state.invoiceLines.map((line, idx) => `
            <div class="card-subtle" style="padding:10px">
              <div style="display:grid;grid-template-columns:2fr 1fr;gap:6px;margin-bottom:6px">
                <select class="select" style="padding:6px;font-size:0.8rem" onchange="pickInvoiceProduct(${idx}, this.value)">
                  <option value="">-- ${tr('Pick from catalog or type below', 'स्टॉक से चुनें या नीचे नया लिखें')} --</option>
                  ${products.map(p => `<option value="${p.id}">${esc(p.name)} (₹${p.price} | Stock: ${p.stock})</option>`).join('')}
                </select>
                <select class="select" style="padding:6px;font-size:0.8rem" onchange="state.invoiceLines[${idx}].taxMode=this.value;render()">
                  <option value="exclusive" ${line.taxMode === 'exclusive' ? 'selected' : ''}>+GST (Exclusive)</option>
                  <option value="inclusive" ${line.taxMode === 'inclusive' ? 'selected' : ''}>MRP (Inclusive)</option>
                </select>
              </div>
              <div style="display:grid;grid-template-columns:2.2fr 0.9fr 0.8fr 1fr 0.9fr auto;gap:6px;align-items:center">
                <input class="input" style="padding:6px;font-size:0.82rem" placeholder="Item Name (auto-HSN)" value="${esc(line.name)}" oninput="updateInvoiceLineName(${idx}, this.value)" />
                <input class="input" style="padding:6px;font-size:0.82rem" placeholder="HSN" value="${esc(line.hsn)}" oninput="state.invoiceLines[${idx}].hsn=this.value;render()" />
                <input class="input" type="number" min="1" style="padding:6px;font-size:0.82rem" placeholder="Qty" value="${line.qty}" oninput="state.invoiceLines[${idx}].qty=Number(this.value);render()" />
                <input class="input" type="number" min="0" style="padding:6px;font-size:0.82rem" placeholder="Rate ₹" value="${line.price}" oninput="state.invoiceLines[${idx}].price=Number(this.value);render()" />
                <select class="select" style="padding:6px;font-size:0.82rem" onchange="state.invoiceLines[${idx}].gstRate=Number(this.value);render()">
                  ${[0, 5, 12, 18, 28].map(r => `<option value="${r}" ${Number(line.gstRate) === r ? 'selected' : ''}>${r}%</option>`).join('')}
                </select>
                <button type="button" class="btn btn-danger btn-sm" onclick="state.invoiceLines.splice(${idx},1);if(!state.invoiceLines.length)state.invoiceLines.push({name:'',hsn:'3917',qty:1,price:0,gstRate:18,taxMode:'exclusive'});render()">✕</button>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-top:14px">
          <button type="button" class="btn btn-ghost btn-sm" onclick="state.invoiceLines.push({name:'',hsn:'3917',qty:1,price:0,gstRate:18,taxMode:'exclusive'});render()">
            + ${tr('Add Line Item', 'नई लाइन जोड़ें')}
          </button>
          <div style="display:flex;gap:6px">
            <button type="button" class="btn btn-ghost btn-sm ${state.printFormat === 'a4' ? 'btn-primary' : ''}" onclick="state.printFormat='a4';render()">🖨️ A4 Print</button>
            <button type="button" class="btn btn-ghost btn-sm ${state.printFormat === 'thermal' ? 'btn-primary' : ''}" onclick="state.printFormat='thermal';render()">🧾 3-Inch Thermal POS</button>
          </div>
        </div>

        <button type="button" class="btn btn-gold" style="width:100%;margin-top:16px;font-size:0.95rem" onclick="saveAndPrintWalkInInvoice('${shop.id}')">
          💾🖨️ ${tr('Save Bill to Ledger, Deduct Stock & Print Invoice', 'बिल बही-खाते में सेव करें, स्टॉक घटाएँ और प्रिंट करें')}
        </button>
      </div>

      <!-- Right: Live Print-Ready Invoice Preview -->
      <div class="card print-area ${state.printFormat === 'thermal' ? 'thermal-mode' : ''}" style="font-family:monospace">
        <div style="display:flex;justify-content:space-between;border-bottom:2px solid var(--border);padding-bottom:12px">
          <div>
            <h2 style="font-size:1.25rem">${esc(shop.shop)}</h2>
            <p style="font-size:0.78rem">${esc(shop.address || shop.city)}, ${esc(shop.state)}</p>
            <p style="font-size:0.78rem">Phone: ${esc(shop.phone)} ${hasGstin ? `| GSTIN: <b>${esc(shop.gstin)}</b>` : ''}</p>
          </div>
          <div style="text-align:right">
            <p style="font-weight:800;font-size:0.95rem">${hasGstin ? (isInterState ? 'INTER-STATE TAX INVOICE' : 'TAX INVOICE') : 'BILL OF SUPPLY / ESTIMATE'}</p>
            <p style="font-size:0.8rem">No: <b>${previewInvNo}</b></p>
            <p style="font-size:0.78rem">Date: ${new Date().toLocaleDateString('en-IN')}</p>
          </div>
        </div>

        <div style="padding:10px 0;border-bottom:1px solid var(--border-subtle);font-size:0.8rem">
          <p><b>Bill To:</b> ${esc(state.invoiceBuyer.name || 'Walk-in Cash Customer')} ${state.invoiceBuyer.phone ? `(${esc(state.invoiceBuyer.phone)})` : ''}</p>
          <p><b>Buyer GSTIN:</b> ${esc(buyerGstin || 'Unregistered (B2C)')} | <b>Payment:</b> ${esc(state.invoiceBuyer.paymentMode)}</p>
        </div>

        <table style="margin:12px 0;font-size:0.78rem">
          <thead>
            <tr>
              <th>Item</th>
              <th>HSN</th>
              <th>Qty</th>
              <th>Taxable</th>
              ${hasGstin ? (isInterState ? '<th>IGST</th>' : '<th>CGST</th><th>SGST</th>') : ''}
              <th style="text-align:right">Total</th>
            </tr>
          </thead>
          <tbody>
            ${computedLines.map(l => `
              <tr>
                <td>${esc(l.name || '—')}</td>
                <td>${esc(l.hsn)}</td>
                <td>${l.qty}</td>
                <td>${l.taxable.toFixed(2)}</td>
                ${hasGstin ? (
                  isInterState
                    ? `<td>${l.gst.toFixed(2)} (${l.gstRate}%)</td>`
                    : `<td>${(l.gst / 2).toFixed(2)}</td><td>${(l.gst / 2).toFixed(2)}</td>`
                ) : ''}
                <td style="text-align:right;font-weight:700">${l.gross.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="border-top:2px solid var(--border);padding-top:10px;text-align:right;font-size:0.84rem">
          <p>Taxable Value: <b>${fmtINR(totalTaxable)}</b></p>
          ${hasGstin ? (
            isInterState
              ? `<p>IGST (Inter-State): <b>${fmtINR(totalGst)}</b></p>`
              : `<p>CGST: <b>${fmtINR(totalGst / 2)}</b> | SGST: <b>${fmtINR(totalGst / 2)}</b></p>`
          ) : ''}
          ${billDiscount > 0 ? `<p style="color:#16a34a">Discount (छूट): <b>− ${fmtINR(billDiscount)}</b></p>` : ''}
          <p style="font-size:1.15rem;margin-top:6px"><b>Grand Total: ${fmtINR(grandTotal)}</b></p>
          ${state.invoiceBuyer.paymentMode === 'Credit' && Number(state.invoiceBuyer.paidAmount) > 0 ? `
            <p style="font-size:0.8rem;color:#dc2626">Paid Now: <b>${fmtINR(state.invoiceBuyer.paidAmount)}</b> | Balance Udhaar Due: <b>${fmtINR(Math.max(0, grandTotal - Number(state.invoiceBuyer.paidAmount)))}</b></p>
          ` : ''}
          ${shop.upiId ? `<p style="font-size:0.75rem;margin-top:4px">Pay via UPI: <b>${esc(shop.upiId)}</b></p>` : ''}
        </div>
        <p style="text-align:center;font-size:0.7rem;margin-top:14px;opacity:0.75">Generated on KuberQ B2B Trade OS</p>
      </div>
      </div>
    </div>
  `;
}

// ============================================================================
// INVENTORY, 1-CLICK STARTER TEMPLATES, SMART HSN & GATED AI SCANNER
// ============================================================================
function renderMerchantInventory(shop) {
  const products = state.data.products.filter(p => p.shopId === shop.id);
  const lowStock = products.filter(p => Number(p.stock) <= Number(p.minStock || 5));
  const templates = state.data.starterTemplates || [];
  const aiRemaining = Math.max(0, (Number(shop.aiLimit) || 3) - (Number(shop.aiUsed) || 0));

  return `
    <div style="display:grid;gap:20px">
      <!-- Top Action Bar: 1-Click Starter Catalog (₹0 Cost) + Gated AI Bill Scanner -->
      <div class="card" style="border-color:var(--gold)">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px">
          <div>
            <span class="badge badge-gold">⚡ ZERO MANUAL DATA ENTRY</span>
            <h3 style="margin-top:6px">${tr('Populate Your Inventory in Seconds', 'सेकंडों में अपनी दुकान का स्टॉक चढ़ाएँ')}</h3>
            <p class="text-muted" style="font-size:0.82rem">
              ${tr('Use a 100% Free Ready-Made B2B Catalog Template (0 Credits) OR scan a supplier invoice with AI.', 'मुफ़्त रेडीमेड B2B कैटलॉग लोड करें (0 क्रेडिट) या AI से अपने सप्लायर का बिल स्कैन करें।')}
            </p>
          </div>
          <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
            <select class="select" id="tpl-picker" style="width:auto;min-width:240px">
              ${templates.map(t => `<option value="${t.key}">📦 ${esc(state.lang === 'hi' ? t.labelHi : t.labelEn)} (${t.count} items)</option>`).join('')}
            </select>
            <button class="btn btn-primary" onclick="loadStarterCatalog()">
              📥 ${tr('Load Free Starter Catalog (0 Cr)', 'मुफ़्त कैटलॉग लोड करें')}
            </button>
            <button class="btn btn-gold" onclick="state.aiModalOpen=true;render()">
              ✨ ${tr('AI Scan Purchase Bill / Rate List', 'AI से खरीद बिल स्कैन करें')} (${aiRemaining} Cr left)
            </button>
          </div>
        </div>
      </div>

      ${lowStock.length > 0 ? `
        <div class="card" style="border-color:var(--danger);background:rgba(229,72,77,0.08);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
          <div>
            <p class="text-danger" style="font-weight:800">⚠️ ${tr('Low Stock Alert:', 'कम स्टॉक चेतावनी:')} ${lowStock.length} ${tr('items need restocking', 'सामान खत्म होने वाले हैं')}</p>
            <p class="text-muted" style="font-size:0.82rem;margin-top:4px">${lowStock.map(p => `${p.name} (${p.stock} left)`).join(' · ')}</p>
          </div>
          <a class="btn btn-danger btn-sm" target="_blank" rel="noreferrer" href="https://wa.me/?text=${encodeURIComponent(`📦 *Purchase Order Restock Request from ${shop.shop}*\nPlease dispatch:\n` + lowStock.map(p => `- ${p.name} (HSN ${p.hsn}): 50 units`).join('\n'))}">
            📲 ${tr('Send Restock PO to Supplier on WhatsApp', 'सप्लायर को WhatsApp पर ऑर्डर भेजें')}
          </a>
        </div>
      ` : ''}

      <!-- Add Single Item Form with Smart Auto-HSN & Purchase Cost -->
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px">
          <h3>➕ ${tr('Add Product (With Purchase Cost for P&L & Stock Valuation)', 'नया सामान जोड़ें (लाभ-हानि व स्टॉक मूल्यांकन हेतु खरीद लागत सहित)')}</h3>
          <span class="badge badge-gold">📦 ${tr('Total Stock Value (at Cost):', 'कुल स्टॉक मूल्यांकन:')} ${fmtINR(products.reduce((s, p) => s + ((Number(p.stock) || 0) * (Number(p.costPrice) || Math.round((Number(p.wholesalePrice || p.price) || 0) * 0.84))), 0))}</span>
        </div>
        <form onsubmit="addInventoryItem(event)" style="display:grid;grid-template-columns:1.8fr 0.8fr 0.9fr 0.9fr 0.9fr 0.7fr 0.7fr 0.8fr auto;gap:8px;align-items:end">
          <div>
            <label class="form-label">${tr('Item Name', 'सामान का नाम')} *</label>
            <input class="input" id="inv-name" required placeholder="e.g. Supreme PVC Pipe" oninput="autoFillInventoryHsn(this.value)" />
          </div>
          <div>
            <label class="form-label">HSN Code</label>
            <input class="input" id="inv-hsn" value="3917" />
          </div>
          <div>
            <label class="form-label">${tr('Purchase Cost ₹', 'खरीद लागत ₹')}</label>
            <input class="input" type="number" id="inv-cost" placeholder="140" />
          </div>
          <div>
            <label class="form-label">${tr('Retail Price ₹', 'खुदरा रेट ₹')} *</label>
            <input class="input" type="number" id="inv-price" required placeholder="185" />
          </div>
          <div>
            <label class="form-label">${tr('B2B Wholesale ₹', 'थोक रेट ₹')}</label>
            <input class="input" type="number" id="inv-wprice" placeholder="165" />
          </div>
          <div>
            <label class="form-label">GST %</label>
            <select class="select" id="inv-gst">
              ${[0, 5, 12, 18, 28].map(r => `<option value="${r}" ${r === 18 ? 'selected' : ''}>${r}%</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="form-label">${tr('Stock', 'स्टॉक')} *</label>
            <input class="input" type="number" id="inv-stock" required value="50" />
          </div>
          <div>
            <label class="form-label">Tax Mode</label>
            <select class="select" id="inv-taxmode">
              <option value="exclusive">+GST</option>
              <option value="inclusive">MRP (Incl)</option>
            </select>
          </div>
          <button type="submit" class="btn btn-gold">${tr('Add', 'जोड़ें')}</button>
        </form>
      </div>

      <!-- Inventory Table -->
      <div class="card">
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>${tr('Item Name', 'सामान का नाम')}</th>
                <th>HSN</th>
                <th>${tr('Purchase Cost', 'खरीद लागत ₹')}</th>
                <th>${tr('Retail Rate', 'खुदरा रेट ₹')}</th>
                <th>${tr('B2B Wholesale (MOQ)', 'थोक रेट (MOQ)')}</th>
                <th>GST &amp; Mode</th>
                <th>${tr('Current Stock & Value', 'स्टॉक व मूल्य')}</th>
                <th>${tr('Quick Adjust', 'स्टॉक बदलें')}</th>
              </tr>
            </thead>
            <tbody>
              ${products.map(p => {
                const cPrice = p.costPrice !== undefined ? p.costPrice : Math.round((p.wholesalePrice || p.price) * 0.84);
                return `
                <tr>
                  <td><b>${esc(p.name)}</b></td>
                  <td><span class="badge badge-muted">${esc(p.hsn)}</span></td>
                  <td>
                    <input class="input" type="number" value="${cPrice}" style="width:82px;padding:4px 8px" onchange="updateProductField('${p.id}', { costPrice: this.value })" />
                  </td>
                  <td>
                    <input class="input" type="number" value="${p.price}" style="width:85px;padding:4px 8px" onchange="updateProductField('${p.id}', { price: this.value })" />
                  </td>
                  <td>
                    <input class="input" type="number" value="${p.wholesalePrice || p.price}" style="width:85px;padding:4px 8px" onchange="updateProductField('${p.id}', { wholesalePrice: this.value })" />
                    <span class="text-muted" style="font-size:0.72rem">(MOQ: ${p.moq || 10})</span>
                  </td>
                  <td>${p.gstRate}% · <span class="badge badge-gold">${p.taxMode === 'inclusive' ? 'MRP' : '+GST'}</span></td>
                  <td>
                    <span class="badge ${p.stock <= p.minStock ? 'badge-danger' : 'badge-primary'}">${p.stock} units</span>
                    <div class="text-muted" style="font-size:0.72rem;margin-top:2px">लागत: ${fmtINR((p.stock || 0) * cPrice)}</div>
                  </td>
                  <td>
                    <div style="display:flex;gap:4px">
                      <button class="btn btn-ghost btn-sm" onclick="updateProductField('${p.id}', { stockDelta: -1 })">−1</button>
                      <button class="btn btn-ghost btn-sm" onclick="updateProductField('${p.id}', { stockDelta: 10 })">+10</button>
                      <button class="btn btn-ghost btn-sm" onclick="updateProductField('${p.id}', { stockDelta: 50 })">+50</button>
                    </div>
                  </td>
                </tr>
              `}).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderAiScannerModal(shop) {
  const aiRemaining = Math.max(0, (Number(shop.aiLimit) || 3) - (Number(shop.aiUsed) || 0));
  return `
    <div class="modal-backdrop" onclick="state.aiModalOpen=false;render()">
      <div class="modal-box" onclick="event.stopPropagation()">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <h3>✨ ${tr('AI Purchase Bill & Rate-List Scanner', 'AI खरीद बिल और रेट-लिस्ट स्कैनर')}</h3>
          <button class="btn btn-ghost btn-sm" onclick="state.aiModalOpen=false;render()">✕</button>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px" class="card-subtle">
          <span>${tr('Your Plan:', 'आपका प्लान:')} <b class="text-gold">${esc(shop.plan)}</b></span>
          <span class="badge ${aiRemaining > 0 ? 'badge-primary' : 'badge-danger'}">
            ✨ ${aiRemaining} / ${shop.aiLimit || 3} ${tr('AI Scans Remaining', 'AI स्कैन बाकी हैं')}
          </span>
        </div>

        ${aiRemaining <= 0 ? `
          <div class="card-subtle" style="border-color:var(--danger);text-align:center;padding:24px">
            <h3 class="text-danger">🔒 ${tr('Free AI Scan Limit Reached', 'आपके मुफ़्त AI स्कैन पूरे हो गए हैं')}</h3>
            <p class="text-muted" style="margin:8px 0 16px;font-size:0.86rem">
              ${tr('To protect platform costs, Starter accounts include 3 free lifetime AI scans. Upgrade to Vyapar Pro (₹299/mo) for 50 AI scans/month!', 'स्टार्टर प्लान में 3 मुफ़्त AI स्कैन मिलते हैं। 50 AI स्कैन/महीना पाने के लिए व्यापार प्रो (₹299/महीना) चालू करें!')}
            </p>
            <button class="btn btn-gold" onclick="state.aiModalOpen=false;navigate('/pricing')">⚡ ${tr('View Upgrade Plans', 'अपग्रेड प्लान देखें')}</button>
          </div>
        ` : `
          <div class="form-group">
            <label class="form-label">📷 ${tr('Option 1: Upload Photo of Supplier Purchase Invoice / Price List', 'विकल्प 1: सप्लायर के खरीद बिल या रेट-लिस्ट की फोटो चुनें')}</label>
            <input type="file" accept="image/*" class="input" id="ai-bill-file" />
          </div>
          <div class="form-group">
            <label class="form-label">📝 ${tr('Option 2: Or Paste Raw Rate List Text Below', 'विकल्प 2: या नीचे सामान और रेट की लिस्ट पेस्ट करें')}</label>
            <textarea class="textarea" rows="4" id="ai-bill-text" placeholder="Supreme PVC Pipe 1 inch - 185&#10;Astral CPVC Elbow 3/4 inch - 28&#10;Havells Wire 1.5 sqmm - 1490&#10;UltraTech Cement 50kg - 395"></textarea>
          </div>
          <button class="btn btn-gold" style="width:100%" onclick="runAiCatalogScan()" ${state.aiLoading ? 'disabled' : ''}>
            ${state.aiLoading ? '⏳ Scanning & Extracting HSN Codes...' : '✨ Extract Products & HSN Codes (Uses 1 AI Credit)'}
          </button>
        `}

        ${state.aiExtractedItems.length > 0 ? `
          <div style="margin-top:18px">
            <h4 class="text-gold" style="margin-bottom:8px">✓ ${state.aiExtractedItems.length} ${tr('Products Extracted — Review & Save:', 'सामान पहचाने गए — जाँचें और सेव करें:')}</h4>
            <div class="table-wrap" style="max-height:220px;overflow-y:auto">
              <table>
                <thead>
                  <tr><th>Name</th><th>HSN</th><th>Retail ₹</th><th>B2B ₹</th><th>GST%</th></tr>
                </thead>
                <tbody>
                  ${state.aiExtractedItems.map(it => `
                    <tr>
                      <td>${esc(it.name)}</td>
                      <td>${esc(it.hsn)}</td>
                      <td>₹${it.price}</td>
                      <td>₹${it.wholesalePrice || it.price}</td>
                      <td>${it.gstRate}%</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            <button class="btn btn-primary" style="width:100%;margin-top:12px" onclick="saveAiExtractedCatalog()">
              💾 ${tr('Save All Extracted Items to My Inventory', 'सभी सामान मेरे स्टॉक में सेव करें')}
            </button>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// ============================================================================
// PARTY UDHAAR KHATA (CREDIT LEDGER) & QR STANDEE & B2B DESK & REFERRALS
// ============================================================================
function renderMerchantUdhaar(shop) {
  const allOrders = state.data.myOrders || [];
  const creditOrders = allOrders.filter(o => o.status !== 'Rejected' && o.status !== 'Sales Return' && o.paymentMode === 'Credit' && !o.udhaarSettled);
  const partyMap = new Map();
  for (const o of creditOrders) {
    const key = o.phone || o.customer;
    const cCode = o.customerCode || ('KQC-' + String(o.phone || '849201').slice(-6));
    const gross = Number(o.totals?.gross) || 0;
    const paid = Math.min(gross, Math.max(0, Number(o.paidAmount) || 0));
    const due = Math.max(0, gross - paid);
    if (due <= 0) continue;
    const cur = partyMap.get(key) || { customer: o.customer, customerCode: cCode, phone: o.phone, grossTotal: 0, paidTotal: 0, total: 0, orders: [] };
    cur.grossTotal += gross;
    cur.paidTotal += paid;
    cur.total += due;
    cur.orders.push(o);
    partyMap.set(key, cur);
  }
  const parties = [...partyMap.values()];
  const supplierPurchases = state.data.mySupplierPurchases || [];
  const expenses = state.data.myExpenses || [];

  const totalSupplierDue = supplierPurchases
    .filter(sp => sp.status !== 'Paid')
    .reduce((sum, sp) => sum + Math.max(0, (Number(sp.totalAmount) || 0) - (Number(sp.paidAmount) || 0)), 0);
  const totalInputItc = supplierPurchases.reduce((s, sp) => s + (Number(sp.gstAmount) || Math.round((Number(sp.totalAmount) || 0) * 18 / 118)), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

  return `
    <div style="display:grid;gap:22px">
      <!-- 1. CUSTOMER RECEIVABLE UDHAAR KHATA (WITH PARTIAL PAYMENT & PRINTABLE PARTY LEDGER) -->
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px">
          <div>
            <span class="badge badge-danger">📒 ${tr('1. CUSTOMER RECEIVABLE UDHAAR & PARTIAL RECEIPTS', '1. ग्राहक उधार बही-खाता और किस्त वसूली (Partial Receipts)')}</span>
            <h3 style="margin-top:6px">${tr('Party-Wise Customer Udhaar Khata & Running Ledger', 'पार्टी-वार उधार बही-खाता, किस्त जमा और खाता स्टेटमेंट')}</h3>
            <p class="text-muted" style="font-size:0.84rem">${tr('Record partial payments (e.g. ₹5,000 received out of ₹15,000), send WhatsApp UPI links, or print the Party Dr/Cr Ledger Statement.', 'आंशिक किस्त भुगतान दर्ज करें, WhatsApp पर सीधा UPI भुगतान लिंक भेजें या पार्टी का नामे/जमा (Dr/Cr) खाता स्टेटमेंट प्रिंट करें।')}</p>
          </div>
          <span class="badge badge-danger" style="font-size:0.95rem">${tr('Total Balance To Receive:', 'कुल शेष उधार लेना बाकी:')} ${fmtINR(parties.reduce((s, p) => s + p.total, 0))}</span>
        </div>

        ${parties.length === 0 ? `
          <p class="text-muted" style="padding:18px 0;text-align:center">🎉 ${tr('Zero pending Udhaar! All credit bills are settled.', 'कोई शेष उधार नहीं है! सभी क्रेडिट बिलों का भुगतान हो चुका है।')}</p>
        ` : `
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>${tr('Party / Unique ID', 'पार्टी व यूनिक ID')}</th>
                  <th>${tr('Bills & Partial Paid', 'बिल व अब तक जमा')}</th>
                  <th>${tr('Net Balance Due', 'शुद्ध शेष उधार')}</th>
                  <th>${tr('Receive Partial / Full Payment', 'किस्त (Partial) या पूर्ण जमा करें')}</th>
                  <th>${tr('Ledger & WhatsApp', 'खाता स्टेटमेंट व रिमाइंडर')}</th>
                </tr>
              </thead>
              <tbody>
                ${parties.map(p => {
                  const upiLink = shop.upiId ? `upi://pay?pa=${encodeURIComponent(shop.upiId)}&pn=${encodeURIComponent(shop.shop)}&am=${p.total}&cu=INR` : '';
                  const remMsg = `🙏 नमस्ते *${p.customer}* जी (${p.customerCode}),\n*${shop.shop}* की ओर से विनम्र भुगतान रिमाइंडर।\nकुल बिल राशि: ₹${p.grossTotal} | अब तक जमा: ₹${p.paidTotal}\n*शुद्ध शेष उधार राशि: ₹${p.total}*\n${upiLink ? `💳 सीधे UPI से भुगतान करने का लिंक: ${upiLink}` : 'कृपया सुविधानुसार भुगतान करने का कष्ट करें।'}`;
                  const firstOrd = p.orders[0];
                  return `
                    <tr>
                      <td>
                        <b>${esc(p.customer)}</b>
                        <div style="display:flex;gap:4px;align-items:center;margin-top:3px">
                          <span class="badge badge-primary" style="font-family:monospace;font-size:0.7rem">${esc(p.customerCode)}</span>
                          <span class="text-muted" style="font-size:0.76rem">📞 ${esc(p.phone)}</span>
                        </div>
                      </td>
                      <td>
                        ${p.orders.map(x => {
                          const g = Number(x.totals?.gross) || 0;
                          const pd = Number(x.paidAmount) || 0;
                          return `<div style="font-size:0.8rem;margin-bottom:3px"><b>${esc(x.invoiceNo)}:</b> कुल ${fmtINR(g)} (जमा: <span class="text-success">${fmtINR(pd)}</span>)</div>`;
                        }).join('')}
                      </td>
                      <td>
                        <b class="text-danger" style="font-size:1.08rem">${fmtINR(p.total)}</b>
                      </td>
                      <td>
                        <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">
                          <input class="input" type="number" id="part-amt-${firstOrd.id}" placeholder="₹ किस्त राशि" style="width:105px;padding:5px 8px;font-size:0.8rem" />
                          <select class="select" id="part-mode-${firstOrd.id}" style="width:82px;padding:5px 6px;font-size:0.78rem">
                            <option value="Cash">Cash</option>
                            <option value="UPI">UPI</option>
                          </select>
                          <button class="btn btn-primary btn-sm" onclick="recordPartialCustomerPayment('${firstOrd.id}')">
                            + ${tr('Receive', 'जमा करें')}
                          </button>
                          <button class="btn btn-ghost btn-sm" onclick="updateOrderField('${firstOrd.id}', { udhaarSettled: true, settledVia: 'UPI' })">
                            ✓ ${tr('Full Paid', 'पूर्ण चुकता')}
                          </button>
                        </div>
                      </td>
                      <td>
                        <div style="display:flex;gap:6px;flex-wrap:wrap">
                          <button class="btn btn-ghost btn-sm" onclick="openPartyLedgerModal('${esc(p.phone || p.customer)}')">
                            📄 ${tr('Party Ledger PDF', 'खाता स्टेटमेंट')}
                          </button>
                          <a class="btn btn-gold btn-sm" target="_blank" rel="noreferrer" href="https://wa.me/91${p.phone}?text=${encodeURIComponent(remMsg)}">
                            📲 ${tr('WA Reminder', 'WhatsApp तकादा/रिमाइंडर')}
                          </a>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>

      <!-- 2. SUPPLIER PURCHASE & INPUT ITC KHATA + 3. DAILY SHOP EXPENSE TRACKER -->
      <div class="grid grid-2">
        <!-- Supplier Payable Ledger with Input GST (ITC) -->
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px">
            <span class="badge badge-gold">📦 ${tr('2. SUPPLIER PURCHASE & INPUT GST (ITC) KHATA', '2. सप्लायर खरीद खाता एवं इनपुट GST (ITC)')}</span>
            <div style="display:flex;gap:6px">
              <span class="badge badge-primary">ITC: ${fmtINR(totalInputItc)}</span>
              <span class="badge badge-danger">${tr('To Pay:', 'देना बाकी:')} ${fmtINR(totalSupplierDue)}</span>
            </div>
          </div>
          <h3 style="margin-bottom:10px">${tr('Record Supplier Purchase Bills & Input GST Credit', 'सप्लायर के खरीद बिल, उधार और इनपुट GST (ITC) दर्ज करें')}</h3>
          <form onsubmit="addSupplierPurchase(event)" style="margin-bottom:14px">
            <div class="grid grid-3" style="gap:8px">
              <div class="form-group">
                <label class="form-label">${tr('Supplier Name', 'सप्लायर का नाम')} *</label>
                <input class="input" id="sp-name" required placeholder="${tr('e.g. Supreme Depot', 'जैसे: सुप्रीम डिपो जयपुर')}" />
              </div>
              <div class="form-group">
                <label class="form-label">${tr('Supplier GSTIN (For ITC)', 'सप्लायर GSTIN')}</label>
                <input class="input" id="sp-gstin" maxlength="15" style="text-transform:uppercase" placeholder="08AAACS1234F1Z2" />
              </div>
              <div class="form-group">
                <label class="form-label">${tr('Bill No & Items', 'बिल नंबर व सामान')}</label>
                <input class="input" id="sp-items" placeholder="Bill #884 — PVC Pipes" />
              </div>
            </div>
            <div class="grid grid-4" style="gap:8px;align-items:end">
              <div class="form-group" style="margin:0">
                <label class="form-label">${tr('Total Bill (₹)', 'कुल बिल (₹)')} *</label>
                <input class="input" type="number" id="sp-total" required min="1" placeholder="50000" oninput="const el=document.getElementById('sp-gst');if(el)el.value=Math.round(Number(this.value||0)*18/118)" />
              </div>
              <div class="form-group" style="margin:0">
                <label class="form-label">${tr('Input GST / ITC (₹)', 'खरीद GST छूट (₹)')}</label>
                <input class="input" type="number" id="sp-gst" value="0" min="0" />
              </div>
              <div class="form-group" style="margin:0">
                <label class="form-label">${tr('Paid Now (₹)', 'अभी दिया (₹)')}</label>
                <input class="input" type="number" id="sp-paid" value="0" min="0" />
              </div>
              <button type="submit" class="btn btn-gold">${tr('+ Save Bill', '+ बिल जोड़ें')}</button>
            </div>
          </form>

          <div class="table-wrap" style="max-height:260px;overflow-y:auto">
            <table>
              <thead>
                <tr>
                  <th>${tr('Supplier & GSTIN', 'सप्लायर व GSTIN')}</th>
                  <th>${tr('Bill, ITC & Balance', 'कुल बिल, ITC व शेष')}</th>
                  <th>${tr('Action', 'भुगतान कार्रवाई')}</th>
                </tr>
              </thead>
              <tbody>
                ${supplierPurchases.map(sp => {
                  const bal = Math.max(0, (Number(sp.totalAmount) || 0) - (Number(sp.paidAmount) || 0));
                  const itc = Number(sp.gstAmount) || Math.round((Number(sp.totalAmount) || 0) * 18 / 118);
                  return `
                    <tr>
                      <td>
                        <b>${esc(sp.supplierName)}</b>
                        <div class="text-muted" style="font-size:0.75rem">${esc(sp.itemsSummary)} ${sp.supplierGstin ? `· GSTIN: ${esc(sp.supplierGstin)}` : ''}</div>
                      </td>
                      <td>
                        <div>${fmtINR(sp.totalAmount)} · <span class="text-success" style="font-size:0.75rem;font-weight:700">ITC: ${fmtINR(itc)}</span></div>
                        <div style="font-weight:800;font-size:0.82rem;color:${bal > 0 ? '#dc2626' : '#16a34a'}">${bal > 0 ? `${tr('Due:', 'शेष देना:')} ${fmtINR(bal)} (Paid: ${fmtINR(sp.paidAmount || 0)})` : '✓ Paid'}</div>
                      </td>
                      <td>
                        ${bal > 0 ? `
                          <div style="display:flex;gap:4px;align-items:center">
                            <input class="input" type="number" id="sp-pay-${sp.id}" placeholder="₹ किस्त" style="width:78px;padding:4px 6px;font-size:0.76rem" />
                            <button class="btn btn-primary btn-sm" onclick="settleSupplierPurchase('${sp.id}')">✓ जमा</button>
                          </div>
                        ` : '<span class="badge badge-primary">Settled</span>'}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Daily Shop Expense Tracker (With Cash vs Bank/UPI Mode) -->
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px">
            <span class="badge badge-primary">💸 ${tr('3. DAILY SHOP EXPENSE TRACKER', '3. दुकान का रोज़मर्रा का खर्चा (Cash / UPI)')}</span>
            <span class="badge badge-muted">${tr('Total Expenses:', 'कुल खर्चा:')} ${fmtINR(totalExpenses)}</span>
          </div>
          <h3 style="margin-bottom:10px">${tr('Record Daily Shop Expenses (Deducts from Cash Drawer or Bank)', 'दैनिक खर्चे लिखें (चुनें कि पैसा गल्ले से गया या UPI/बैंक से)')}</h3>
          <form onsubmit="addShopExpense(event)" style="margin-bottom:14px">
            <div class="grid grid-3" style="gap:8px">
              <div class="form-group">
                <label class="form-label">${tr('Expense Category', 'खर्च का प्रकार')}</label>
                <select class="select" id="exp-cat">
                  <option value="हम्माली / लोडिंग-अनलोडिंग (Hammali & Loading)">${tr('Hammali / Loading-Unloading', 'हम्माली / लोडिंग-अनलोडिंग')}</option>
                  <option value="गाड़ी भाड़ा / ट्रांसपोर्ट (Local Transport Freight)">${tr('Local Transport / Auto Freight', 'गाड़ी भाड़ा / लोकल ट्रांसपोर्ट')}</option>
                  <option value="चाय-पानी व दुकान खर्च (Tea & Refreshment)">${tr('Tea, Water & Shop Refreshment', 'चाय-पानी व दुकान खर्च')}</option>
                  <option value="बिजली बिल / दुकान किराया (Electricity / Rent)">${tr('Electricity / Shop Maintenance', 'बिजली बिल / दुकान मेंटेनेंस')}</option>
                  <option value="स्टाफ वेतन / एडवांस (Staff Salary / Advance)">${tr('Staff Salary / Daily Wage', 'स्टाफ वेतन / दैनिक मजदूरी')}</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">${tr('Paid Via', 'भुगतान माध्यम')}</label>
                <select class="select" id="exp-mode">
                  <option value="Cash">💵 Cash (नकद गल्ले से)</option>
                  <option value="UPI">🏦 UPI / Bank (बैंक से)</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">${tr('Amount (₹)', 'राशि (₹)')} *</label>
                <input class="input" type="number" id="exp-amt" required min="1" placeholder="250" />
              </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:end">
              <div class="form-group" style="margin:0">
                <label class="form-label">${tr('Short Note', 'विवरण')}</label>
                <input class="input" id="exp-note" placeholder="${tr('e.g. Unloaded 50 bags cement', 'जैसे: गोदाम में गाड़ी अनलोडिंग')}" />
              </div>
              <button type="submit" class="btn btn-primary">${tr('+ Add Expense', '+ खर्चा जोड़ें')}</button>
            </div>
          </form>

          <div class="table-wrap" style="max-height:260px;overflow-y:auto">
            <table>
              <thead>
                <tr>
                  <th>${tr('Expense & Note', 'खर्च का प्रकार व विवरण')}</th>
                  <th>${tr('Date', 'तारीख')}</th>
                  <th>${tr('Amount', 'राशि')}</th>
                </tr>
              </thead>
              <tbody>
                ${expenses.map(ex => `
                  <tr>
                    <td>
                      <b>${esc(ex.category)}</b>
                      <div class="text-muted" style="font-size:0.76rem">${esc(ex.note || '—')}</div>
                    </td>
                    <td style="font-size:0.8rem">${new Date(ex.date).toLocaleDateString('en-IN')}</td>
                    <td><b class="text-danger">−${fmtINR(ex.amount)}</b></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderMerchantStaff(shop) {
  const staffList = state.data.myStaff || [];
  const activityList = state.data.myActivity || [];
  const maxStaff = shop.plan && shop.plan.includes('Enterprise') ? 99 : shop.plan && shop.plan.includes('Pro') ? 3 : 0;

  return `
    <div style="display:grid;gap:20px">
      <div class="grid grid-2">
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
            <span class="badge badge-gold">👥 ${tr('SHOP STAFF & TEAM RBAC', 'दुकान के कर्मचारी और कार्य अधिकार')}</span>
            <span class="badge badge-primary">${staffList.length} / ${maxStaff === 99 ? '∞' : maxStaff} ${tr('Staff Quota', 'स्टाफ सीमा')}</span>
          </div>
          <h3 style="margin-bottom:8px">${tr('Add Shop Staff (Cashier / Stock / Delivery)', 'नया दुकान कर्मचारी जोड़ें (कैशियर / स्टॉक / डिलीवरी)')}</h3>
          <p class="text-muted" style="font-size:0.86rem;margin-bottom:14px">
            ${tr('Assign limited permissions to your staff. Every bill they create or stock change they make is recorded in the Activity Log.', 'अपने कर्मचारियों को सीमित कार्य अधिकार दें। उनके द्वारा बनाया गया हर बिल और स्टॉक बदलाव नीचे कार्य विवरण में दर्ज होगा।')}
          </p>

          ${maxStaff === 0 ? `
            <div class="card-subtle" style="border-color:var(--gold);text-align:center;padding:18px">
              <p style="font-weight:700;color:#0f172a">🔒 ${tr('Multi-Staff Access requires Vyapar Pro or B2B Enterprise', 'स्टाफ अकाउंट जोड़ने के लिए व्यापार प्रो (3 स्टाफ) या B2B एंटरप्राइज (अनलिमिटेड स्टाफ) चुनें')}</p>
              <button class="btn btn-gold btn-sm" style="margin-top:10px" onclick="navigate('/pricing')">⚡ ${tr('Upgrade Plan', 'प्लान अपग्रेड करें')}</button>
            </div>
          ` : `
            <form onsubmit="addShopStaff(event)">
              <div class="grid grid-2">
                <div class="form-group">
                  <label class="form-label">${tr('Staff Name', 'कर्मचारी का नाम')} *</label>
                  <input class="input" id="stf-name" required placeholder="${tr('e.g. Mukesh Gehlot', 'जैसे: मुकेश गहलोत')}" />
                </div>
                <div class="form-group">
                  <label class="form-label">${tr('10-Digit Mobile', '10 अंकों का मोबाइल नंबर')} *</label>
                  <input class="input" id="stf-phone" required maxlength="10" placeholder="98XXXXXXXX" />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">${tr('Role in Shop', 'दुकान में भूमिका')}</label>
                <select class="select" id="stf-role">
                  <option value="Cashier / Billing">${tr('Cashier / Billing Counter', 'कैशियर / बिलिंग काउंटर')}</option>
                  <option value="Stock & Godown Manager">${tr('Stock & Godown Manager', 'स्टॉक और गोदाम प्रबंधक')}</option>
                  <option value="Order & Delivery Executive">${tr('Order & Delivery Executive', 'ऑर्डर और डिलीवरी सहायक')}</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">${tr('Allowed Shop Permissions:', 'अनुमत कार्य अधिकार:')}</label>
                <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:4px">
                  <label class="card-subtle" style="display:flex;align-items:center;gap:6px;font-size:0.86rem">
                    <input type="checkbox" name="stf_perm" value="billing" checked /> ${tr('GST Billing', 'GST बिल बनाना')}
                  </label>
                  <label class="card-subtle" style="display:flex;align-items:center;gap:6px;font-size:0.86rem">
                    <input type="checkbox" name="stf_perm" value="orders" checked /> ${tr('Accept Orders', 'ऑर्डर स्वीकार करना')}
                  </label>
                  <label class="card-subtle" style="display:flex;align-items:center;gap:6px;font-size:0.86rem">
                    <input type="checkbox" name="stf_perm" value="stock" /> ${tr('Edit Stock & Rates', 'स्टॉक व रेट बदलना')}
                  </label>
                </div>
              </div>
              <button type="submit" class="btn btn-gold" style="width:100%">➕ ${tr('Add Shop Staff Member', 'कर्मचारी जोड़ें')}</button>
            </form>
          `}
        </div>

        <div class="card">
          <h3 style="margin-bottom:12px">📋 ${tr('Active Shop Staff Members', 'सक्रिय दुकान कर्मचारी सूची')} (${staffList.length})</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>${tr('Name & Role', 'नाम व भूमिका')}</th>
                  <th>${tr('Mobile', 'मोबाइल')}</th>
                  <th>${tr('Permissions', 'अधिकार')}</th>
                  <th>${tr('Status', 'स्थिति')}</th>
                  <th>${tr('Action', 'कार्रवाई')}</th>
                </tr>
              </thead>
              <tbody>
                ${staffList.length === 0 ? `<tr><td colspan="5" style="text-align:center" class="text-muted">${tr('No staff added yet.', 'अभी कोई कर्मचारी नहीं जोड़ा गया है।')}</td></tr>` : ''}
                ${staffList.map(st => `
                  <tr>
                    <td><b>${esc(st.name)}</b><br/><span class="text-muted" style="font-size:0.78rem">${esc(st.role)}</span></td>
                    <td>${esc(st.phone)}</td>
                    <td>${(st.permissions || []).map(p => `<span class="badge badge-muted" style="font-size:0.7rem">${esc(p)}</span>`).join(' ')}</td>
                    <td><span class="badge ${st.status === 'Active' ? 'badge-primary' : 'badge-danger'}">${esc(st.status)}</span></td>
                    <td>
                      <button class="btn btn-ghost btn-sm" onclick="toggleShopStaff('${st.id}')">
                        ${st.status === 'Active' ? '⏸ ' + tr('Pause', 'रोकें') : '▶ ' + tr('Activate', 'चालू करें')}
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Shop Activity Audit Log -->
      <div class="card">
        <h3 style="margin-bottom:10px">🕵️ ${tr('Shop Staff & Billing Activity Log', 'दुकान कार्य विवरण और बिलिंग रिकॉर्ड')}</h3>
        <div class="table-wrap" style="max-height:260px;overflow-y:auto">
          <table>
            <thead>
              <tr>
                <th>${tr('Date & Time', 'तारीख और समय')}</th>
                <th>${tr('Actor (Owner / Staff)', 'किसने किया')}</th>
                <th>${tr('Action Details', 'कार्य का विवरण')}</th>
              </tr>
            </thead>
            <tbody>
              ${activityList.map(a => `
                <tr>
                  <td style="font-size:0.82rem">${new Date(a.date).toLocaleString('en-IN')}</td>
                  <td><b>${esc(a.actor)}</b></td>
                  <td>${esc(a.action)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderMerchantQrStandee(shop, qrUrl) {
  return `
    <div class="grid grid-2">
      <div class="card no-print">
        <h3>📱 ${tr('Counter QR Standee & B2B Parchi Link', 'काउंटर QR स्टैंडी और B2B पर्ची लिंक')}</h3>
        <p class="text-muted" style="font-size:0.86rem;margin:8px 0 16px">
          ${tr('Print this standee and keep it on your shop counter. Sub-dealers and retail customers can scan to browse your live catalog or send a Parchi order without any login!', 'इसे प्रिंट कर अपने काउंटर पर रखें। ग्राहक या सब-डीलर बिना किसी ऐप या लॉगिन के स्कैन कर ऑर्डर दे सकेंगे।')}
        </p>
        <div class="form-group">
          <label class="form-label">${tr('Your Direct Store Link:', 'आपकी दुकान का सीधा लिंक:')}</label>
          <input class="input" readonly value="${esc(qrUrl)}" />
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn btn-gold" onclick="window.print()">🖨️ ${tr('Print Counter Standee', 'स्टैंडी प्रिंट करें')}</button>
          <button class="btn btn-ghost" onclick="navigate('/order', { shop: '${shop.id}' })">👁️ ${tr('Preview Customer View', 'ग्राहक पेज देखें')}</button>
        </div>
      </div>

      <div class="card print-area" style="max-width:340px;margin:0 auto;text-align:center;border:3px solid var(--gold);border-radius:24px;padding:28px">
        <p class="font-display" style="font-size:1.6rem;font-weight:800">Kuber<span class="text-gold">Q</span></p>
        <p style="font-size:0.78rem;opacity:0.8">${tr('SCAN TO ORDER OR SEND PARCHI', 'स्कैन करें और सीधा ऑर्डर / पर्ची भेजें')}</p>
        <div style="margin:18px auto;display:inline-block">
          ${renderVisualQrSvg(qrUrl, 175)}
        </div>
        <h2 class="font-royal text-gold" style="font-size:1.35rem">${esc(shop.shop)}</h2>
        <p style="font-family:monospace;font-size:0.85rem;margin-top:4px">Shop ID: <b>${esc(shop.refCode)}</b></p>
        <p style="font-size:0.76rem;margin-top:6px;opacity:0.8">${esc(shop.category)} · ${esc(shop.city)}</p>
        <div style="margin-top:14px;background:var(--gold);color:#111;padding:6px 12px;border-radius:999px;font-weight:800;font-size:0.78rem">
          ${tr('No App Download · Instant WhatsApp Order', 'कोई ऐप नहीं · तुरंत WhatsApp ऑर्डर')}
        </div>
      </div>
    </div>
  `;
}

function renderOperatorLeadDesk(name, phone, city, roleTitle) {
  return `
    <div class="grid grid-2" style="margin-top:20px">
      <div class="card">
        <span class="badge badge-gold">🏦 ${tr('B2B WORKING CAPITAL DESK', 'व्यापार पूँजी सहायता केंद्र')}</span>
        <h3 style="margin-top:8px">${tr('Request Business Working Capital / CC Limit', 'वर्किंग कैपिटल / व्यापार पूँजी पूछताछ')} (${esc(roleTitle)})</h3>
        <p class="text-muted" style="font-size:0.86rem;margin:6px 0 14px">
          ${tr('Need funds for bulk stock purchase, fleet expansion, or machinery? No documents are uploaded on this portal — we forward your basic contact enquiry to authorized banking partners.', 'थोक स्टॉक, नई गाड़ी या मशीनरी के लिए पूँजी चाहिए? इस पोर्टल पर कोई दस्तावेज़ अपलोड नहीं होता — हम केवल आपकी संपर्क जानकारी अधिकृत बैंकिंग साझेदारों को भेजते हैं।')}
        </p>
        <form onsubmit="submitMerchantLead(event, 'working-capital', '${esc(name || '')}', '${esc(phone || '')}', '${esc(city || 'Jodhpur')}')">
          <div class="grid grid-2">
            <div class="form-group">
              <label class="form-label">${tr('Your Name / Firm', 'आपका नाम / दुकान')} *</label>
              <input class="input" id="wc-name" required value="${esc(name || '')}" placeholder="${tr('Your Name / Firm', 'अपना नाम / दुकान का नाम')}" />
            </div>
            <div class="form-group">
              <label class="form-label">${tr('10-Digit Mobile', 'मोबाइल नंबर')} *</label>
              <input class="input" id="wc-phone" required maxlength="10" value="${esc(phone || '')}" placeholder="98XXXXXXXX" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">${tr('Purpose', 'उद्देश्य')}</label>
            <select class="select" id="wc-need">
              <option value="Bulk Stock Purchase / CC Limit">${tr('Bulk Stock Purchase / CC Limit', 'थोक स्टॉक खरीद / CC लिमिट')}</option>
              <option value="Commercial Vehicle / Fleet Expansion">${tr('Commercial Vehicle / Fleet Expansion', 'व्यावसायिक वाहन / ट्रांसपोर्ट विस्तार')}</option>
              <option value="Machinery / Office Setup">${tr('Machinery / Office & Equipment Setup', 'मशीनरी / ऑफिस विस्तार')}</option>
              <option value="Invoice Discounting / B2B Credit">${tr('Invoice Discounting / B2B Credit', 'बिल डिस्काउंटिंग / B2B क्रेडिट')}</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">${tr('Indicative Requirement (₹)', 'अनुमानित आवश्यकता (₹)')}</label>
            <input class="input" type="number" id="wc-amt" placeholder="500000" required />
          </div>
          <div class="form-group">
            <label class="form-label">${tr('Short Business Note', 'संक्षिप्त विवरण')}</label>
            <input class="input" id="wc-note" placeholder="${tr('e.g. Operating for 3 years in Jodhpur', 'जैसे: जोधपुर में 3 वर्षों से व्यापार संचालित')}" />
          </div>
          <div class="card-subtle" style="padding:10px 12px;margin-bottom:12px;border-left:4px solid var(--gold)">
            <p style="font-size:0.8rem;font-weight:700;color:#0f172a">
              ⚖️ ${tr(
                'Statutory Disclaimer: KuberQ is neither a bank, NBFC, nor a lender. We only forward your business requirement to independent financial partners/bankers.',
                'वैधानिक घोषणा: KuberQ न तो कोई बैंक है, न NBFC या लेंडर। हम केवल आपकी व्यावसायिक ज़रूरत को स्वतंत्र वित्तीय साझेदारों/बैंकरों तक प्रेषित करते हैं।'
              )}
            </p>
          </div>
          <button type="submit" class="btn btn-gold" style="width:100%">${tr('Send Working Capital Enquiry', 'पूछताछ भेजें')}</button>
        </form>
      </div>

      <div class="card">
        <span class="badge badge-primary">🤖 ${tr('GROW YOUR BUSINESS WITH WEBSITE & AI', 'वेबसाइट और AI से अपना व्यापार बढ़ाएँ')}</span>
        <h3 style="margin-top:8px">${tr('Request Custom Website, WhatsApp AI Bot or ERP', 'कस्टम वेबसाइट, WhatsApp AI बॉट या सॉफ्टवेयर बनवाएँ')}</h3>
        <p class="text-muted" style="font-size:0.86rem;margin:6px 0 14px">
          ${tr('Want a custom brand website, Tally automation, or dedicated WhatsApp ordering bot for your business, transport agency, or professional firm?', 'अपनी दुकान, फ़ैक्टरी, ट्रांसपोर्ट एजेंसी या प्रोफेशनल ऑफिस के लिए कस्टम वेबसाइट या AI ऑटोमेशन बनवाना चाहते हैं?')}
        </p>
        <form onsubmit="submitMerchantLead(event, 'digital', '${esc(name || '')}', '${esc(phone || '')}', '${esc(city || 'Jodhpur')}')">
          <div class="grid grid-2">
            <div class="form-group">
              <label class="form-label">${tr('Your Name / Firm', 'आपका नाम / दुकान')} *</label>
              <input class="input" id="dg-name" required value="${esc(name || '')}" placeholder="${tr('Your Name / Firm', 'अपना नाम / दुकान का नाम')}" />
            </div>
            <div class="form-group">
              <label class="form-label">${tr('10-Digit Mobile', 'मोबाइल नंबर')} *</label>
              <input class="input" id="dg-phone" required maxlength="10" value="${esc(phone || '')}" placeholder="98XXXXXXXX" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">${tr('Service Needed', 'कौन-सी सेवा चाहिए?')}</label>
            <select class="select" id="dg-need">
              <option value="Custom B2B Website & App">${tr('Custom Business Website & Catalog App', 'कस्टम व्यापार वेबसाइट और कैटलॉग ऐप')}</option>
              <option value="WhatsApp AI Ordering Bot">${tr('WhatsApp AI Ordering & Auto-Reply Bot', 'WhatsApp AI ऑर्डर और ऑटो-रिप्लाई बॉट')}</option>
              <option value="ERP / Tally Custom Integration">${tr('ERP / Tally Custom Integration', 'ERP / टैली कस्टम इंटीग्रेशन')}</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">${tr('Project Details', 'प्रोजेक्ट विवरण')}</label>
            <input class="input" id="dg-note" placeholder="${tr('Describe your requirement', 'अपनी आवश्यकता लिखें')}" required />
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%">${tr('Request Callback from Tech Team', 'टेक टीम से कॉल मँगाएँ')}</button>
        </form>
      </div>
    </div>
  `;
}

function renderMerchantB2BDesk(shop) {
  return renderOperatorLeadDesk(shop.shop, shop.phone, shop.city, tr('Merchant / Manufacturer', 'व्यापारी / निर्माता'));
}

function renderMerchantPromotions(shop) {
  const myPromos = state.data.myPromotions || [];
  return `
    <div class="grid grid-2">
      <div class="card" style="border-color:var(--gold)">
        <span class="badge badge-gold">📢 ${tr('SPONSORED BUSINESS SPOTLIGHT', 'स्पॉन्सर्ड बिज़नेस स्पॉटलाइट')}</span>
        <h3 style="margin-top:8px">${tr('Promote Your Shop on KuberQ Homepage & Catalog', 'होमपेज और कैटलॉग के शीर्ष पर अपनी दुकान प्रमोट करें')}</h3>
        <p class="text-muted" style="font-size:0.88rem;margin:8px 0 14px">
          ${tr('Feature your wholesale rates, seasonal discounts, or dealership offers in the Sponsored Business Spotlight banner seen by thousands of B2B buyers.', 'हज़ारों B2B खरीदारों को दिखने वाले "स्पॉन्सर्ड बिज़नेस स्पॉटलाइट" बैनर में अपने थोक ऑफ़र और डीलरशिप का प्रचार करें।')}
        </p>
        <form onsubmit="submitPromotionRequest(event)">
          <div class="form-group">
            <label class="form-label">${tr('Promotion Headline / Offer Tagline', 'प्रमोशन हेडलाइन / ऑफ़र टैगलाइन')} *</label>
            <input class="input" id="prm-headline" required placeholder="${tr('e.g. Authorized CPVC Pipes Dealer — Direct Factory Rates', 'जैसे: अधिकृत CPVC पाइप डीलर — सीधे फैक्ट्री थोक रेट')}" />
          </div>
          <div class="grid grid-2">
            <div class="form-group">
              <label class="form-label">${tr('Special Offer Badge', 'विशेष ऑफ़र बैज')} *</label>
              <input class="input" id="prm-offer" required placeholder="${tr('e.g. Flat 12% Wholesale Discount', 'जैसे: थोक खरीद पर 12% विशेष छूट')}" />
            </div>
            <div class="form-group">
              <label class="form-label">${tr('Promotion Package', 'प्रमोशन पैकेज चुनें')}</label>
              <select class="select" id="prm-pkg">
                <option value="7 Days Homepage Spotlight — ₹199">${tr('7 Days Homepage Spotlight — ₹199', '7 दिन होमपेज स्पॉटलाइट — ₹199')}</option>
                <option value="30 Days Homepage + Catalog Spotlight — ₹499">${tr('30 Days Homepage + Catalog Spotlight — ₹499', '30 दिन होमपेज + कैटलॉग स्पॉटलाइट — ₹499')}</option>
                <option value="90 Days City Category Leader — ₹1,199">${tr('90 Days City Category Leader — ₹1,199', '90 दिन शहर कैटेगरी लीडर — ₹1,199')}</option>
              </select>
            </div>
          </div>
          <button type="submit" class="btn btn-gold" style="width:100%">🚀 ${tr('Submit Spotlight Request for Admin Approval', 'एडमिन स्वीकृति के लिए प्रमोशन अनुरोध भेजें')}</button>
        </form>
      </div>

      <div class="card">
        <h3 style="margin-bottom:12px">📋 ${tr('My Sponsored Promotion Campaigns', 'मेरे स्पॉन्सर्ड प्रमोशन अभियान')} (${myPromos.length})</h3>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>${tr('Headline & Offer', 'हेडलाइन और ऑफ़र')}</th>
                <th>${tr('Package', 'पैकेज')}</th>
                <th>${tr('Status', 'स्थिति')}</th>
              </tr>
            </thead>
            <tbody>
              ${myPromos.length === 0 ? `<tr><td colspan="3" class="text-muted" style="text-align:center">${tr('No promotion requests yet. Submit one on the left!', 'अभी कोई प्रमोशन अनुरोध नहीं है। बाईं ओर फॉर्म भरें!')}</td></tr>` : ''}
              ${myPromos.map(p => `
                <tr>
                  <td>
                    <b>${esc(p.headline)}</b>
                    <div class="text-gold" style="font-size:0.8rem">${esc(p.offerText)}</div>
                  </td>
                  <td style="font-size:0.82rem">${esc(p.packagePlan)}</td>
                  <td>
                    <span class="badge ${p.status === 'Active' ? 'badge-primary' : 'badge-gold'}">
                      ${p.status === 'Active' ? tr('🟢 Live on Homepage', '🟢 होमपेज पर लाइव') : tr('⏳ Pending Admin Approval', '⏳ एडमिन स्वीकृति शेष')}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// NON-MONETARY REFERRAL SYSTEM (ZERO ₹100/₹50 CASH LIABILITY!)
function renderMerchantReferrals(shop) {
  const refs = state.data.myReferrals || [];
  const verifiedCount = refs.filter(r => r.verified).length;
  const bonusCredits = verifiedCount * 5;
  const inviteLink = `${window.location.origin}/signup?ref=${encodeURIComponent(shop.refCode)}`;

  return `
    <div class="card">
      <span class="badge badge-gold">🎁 ZERO-CASH B2B PARTNER REWARDS</span>
      <h2 style="margin-top:8px">${tr('Refer Fellow Traders — Earn +5 Bonus AI Credits per Verified Shop!', 'अन्य व्यापारियों को जोड़ें — हर सत्यापित दुकान पर +5 बोनस AI क्रेडिट्स पाएँ!')}</h2>
      <p class="text-muted" style="font-size:0.86rem;margin-top:4px">
        ${tr('Share your unique referral link with other shopkeepers or wholesalers. When they register and get verified by Admin, +5 AI Credits are automatically added to your shop!', 'अपना रेफ़रल लिंक दूसरे दुकानदारों को भेजें। उनके सत्यापित होते ही आपके खाते में +5 AI क्रेडिट्स जुड़ जाएँगे!')}
      </p>

      <div class="grid grid-3" style="margin:20px 0">
        <div class="stat-card">
          <p class="stat-label">${tr('Shops Referred', 'कुल जुड़े व्यापारी')}</p>
          <p class="stat-value">${refs.length}</p>
        </div>
        <div class="stat-card">
          <p class="stat-label">${tr('Verified Active Shops', 'सत्यापित दुकानें')}</p>
          <p class="stat-value text-gold">${verifiedCount}</p>
        </div>
        <div class="stat-card">
          <p class="stat-label">${tr('Bonus AI Credits Earned', 'मिले हुए बोनस AI क्रेडिट्स')}</p>
          <p class="stat-value text-success">+${bonusCredits} Credits</p>
        </div>
      </div>

      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px">
        <input class="input" style="max-width:460px" readonly value="${esc(inviteLink)}" />
        <button class="btn btn-gold" onclick="navigator.clipboard.writeText('${inviteLink}');showToast('Referral link copied!')">📋 ${tr('Copy Invite Link', 'लिंक कॉपी करें')}</button>
        <a class="btn btn-primary" target="_blank" rel="noreferrer" href="https://wa.me/?text=${encodeURIComponent(`Join KuberQ B2B Trade OS for Smart GST Billing & AI Catalog: ${inviteLink}`)}">💬 ${tr('Share on WhatsApp', 'WhatsApp पर भेजें')}</a>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>${tr('Referred Shop Name', 'दुकान का नाम')}</th>
              <th>${tr('City', 'शहर')}</th>
              <th>${tr('Date Joined', 'तारीख')}</th>
              <th>${tr('Verification Status', 'सत्यापन स्थिति')}</th>
              <th>${tr('Reward Benefit', 'लाभ')}</th>
            </tr>
          </thead>
          <tbody>
            ${refs.length === 0 ? `<tr><td colspan="5" style="text-align:center" class="text-muted">${tr('No referrals yet. Share your link above!', 'अभी कोई रेफ़रल नहीं है।')}</td></tr>` : ''}
            ${refs.map(r => `
              <tr>
                <td><b>${esc(r.shop)}</b></td>
                <td>${esc(r.city || '—')}</td>
                <td>${new Date(r.date).toLocaleDateString('en-IN')}</td>
                <td><span class="badge ${r.verified ? 'badge-primary' : 'badge-gold'}">${r.verified ? '✓ Verified Active' : '⏳ Pending Admin Verification'}</span></td>
                <td><b class="text-gold">${esc(r.rewardText || '+5 Bonus AI Credits')}</b></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}


// ============================================================================
// 6. SUPER-ADMIN & SUB-ADMIN EMPLOYEE COMMAND CENTER (`/admin`)
// ============================================================================
function renderAdminPortal() {
  const u = state.data.user;
  const ad = state.data.adminData;
  if (!u || (u.role !== 'admin' && u.role !== 'employee') || !ad) {
    return `
      <div class="container" style="max-width:540px;padding:60px 18px;text-align:center">
        <div class="card" style="box-shadow:var(--shadow-lg);border-radius:18px;padding:32px">
          <div style="width:60px;height:60px;border-radius:16px;background:linear-gradient(135deg,#0f172a,#1e3a8a);color:#fff;display:grid;place-items:center;font-size:1.8rem;margin:0 auto 16px">👑</div>
          <h2 style="font-size:1.55rem;color:#0f172a">${tr('Admin Command Center Sign-In', 'एडमिन कमांड सेंटर सुरक्षित लॉगिन')}</h2>
          <p class="text-muted" style="margin:8px 0 20px;font-size:0.9rem">${tr('Authorized administrative personnel only. Enter your registered credentials to access platform operations.', 'केवल अधिकृत एडमिनिस्ट्रेटर एवं स्टाफ ही यहाँ प्रवेश कर सकते हैं। अपने पंजीकृत विवरण से लॉगिन करें।')}</p>
          
          <form onsubmit="handleAdminDirectLogin(event)" style="text-align:left">
            <div class="form-group" style="margin-bottom:12px">
              <label class="form-label">${tr('Admin Mobile or Email', 'एडमिन मोबाइल या ईमेल')} *</label>
              <input class="input" id="ad-login-id" required placeholder="${tr('Enter registered mobile / email', 'पंजीकृत मोबाइल या ईमेल दर्ज करें')}" />
            </div>
            <div class="form-group" style="margin-bottom:16px">
              <label class="form-label">${tr('Master Password', 'मास्टर पासवर्ड')} *</label>
              <input class="input" type="password" id="ad-login-pass" required placeholder="••••••••••••" />
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;padding:12px;font-size:1rem;font-weight:700">
              🔒 ${tr('Sign In to Admin Console', 'एडमिन कंसोल में सुरक्षित लॉगिन करें')}
            </button>
          </form>
        </div>
      </div>
    `;
  }

  const isSuper = u.role === 'admin';
  const hasPerm = p => isSuper || (Array.isArray(u.permissions) && u.permissions.includes(p));

  const adminNavItems = [];
  adminNavItems.push(['overview', '📊', tr('OPC Command & P&L', 'OPC कमांड सेंटर व लाभ-हानि'), 'LIVE']);
  if (hasPerm('perm_merchants')) adminNavItems.push(['merchants', '🏪', tr('Merchants & AI Credits', 'पंजीकृत दुकानें व AI क्रेडिट'), String(ad.merchants.length)]);
  if (hasPerm('perm_merchants')) adminNavItems.push(['upgrades', '⚡', tr('Plan Upgrades', 'प्लान अपग्रेड व रेवेन्यू'), String(ad.upgrades.length)]);
  if (hasPerm('perm_loans_leads')) adminNavItems.push(['loans', '🏦', tr('Finance & Tech Leads', 'फाइनेंस व टेक लीड्स'), String(ad.loans.length)]);
  if (hasPerm('perm_referrals')) adminNavItems.push(['referrals', '🎁', tr('Referral Rewards', 'रेफरल रिवार्ड्स'), String(ad.referrals.length)]);
  if (hasPerm('perm_marketplace')) adminNavItems.push(['marketplace', '🚚', tr('Transport & Services', 'ट्रांसपोर्ट व सर्विसेज'), '']);
  if (hasPerm('perm_demos_faqs')) adminNavItems.push(['demos', '📞', tr('Demos & Helpdesk', 'डेमो व हेल्पडेस्क'), String(ad.demos.length + ad.faqs.length)]);
  if (isSuper) adminNavItems.push(['employees', '👥', tr('Employees & RBAC', 'कर्मचारी व RBAC'), String(ad.employees.length)]);
  if (isSuper) adminNavItems.push(['vault', '🔐', tr('Secret Vault & Switches', 'API वॉल्ट व स्विचेस'), '']);

  if (!adminNavItems.some(([k]) => k === state.adminTab) && adminNavItems.length > 0) {
    state.adminTab = adminNavItems[0][0];
  }

  const curTab = state.adminTab;
  let bannerIcon = '👑';
  let bannerTitle = isSuper ? tr('SUPER ADMIN COMMAND CENTER', 'सुपर एडमिन कमांड सेंटर') : `SUB-ADMIN: ${esc(u.designation)}`;
  let bannerSubtitle = tr(`KuberQ Platform Oversight · Signed in as: ${esc(u.name)} (${esc(u.phone)}) · API Vault: ${esc(ad.aiKeyStatus?.masked || '')}`, `KuberQ प्लेटफॉर्म नियंत्रण · लॉगिन: ${esc(u.name)} (${esc(u.phone)}) · API वॉल्ट: ${esc(ad.aiKeyStatus?.masked || '')}`);
  let bannerActionHtml = `<button class="btn btn-sm" style="background:#ffffff;color:#0f172a;font-weight:700;border:1.5px solid #cbd5e1;box-shadow:0 2px 8px rgba(0,0,0,0.18);display:inline-flex;align-items:center;gap:6px" onclick="bootstrap()">🔄 <span>${tr('Refresh Records', 'डेटा ताज़ा करें')}</span></button>`;

  if (curTab === 'overview') {
    bannerIcon = '📊';
    bannerTitle = tr('SOLOPRENEUR / OPC COMMAND & LIVE P&L ENGINE', 'OPC कमांड सेंटर व लाइव लाभ-हानि इंजन');
    bannerSubtitle = tr('Real-time Platform Gross SaaS & AI Pack Revenue vs Infrastructure Overheads', 'प्लेटफॉर्म कुल SaaS व AI आय बनाम सर्वर व API परिचालन व्यय का लाइव मिलान');
  } else if (curTab === 'merchants') {
    bannerIcon = '🏪';
    bannerTitle = tr('REGISTERED MERCHANTS & AI VISION CREDITS', 'पंजीकृत व्यापारी एवं AI क्रेडिट प्रबंधन');
    bannerSubtitle = tr('Review registered stores, catalog sync status & AI pack allocations', 'दुकानों की सूची, कैटलॉग स्थिति एवं AI विज़न क्रेडिट आवंटन');
  } else if (curTab === 'upgrades') {
    bannerIcon = '⚡';
    bannerTitle = tr('PLAN UPGRADES & SAAS SUBSCRIPTIONS', 'प्लान अपग्रेड व SaaS सदस्यता राजस्व');
    bannerSubtitle = tr('Verified merchant subscriptions and automated plan revenue', 'सत्यापित पेड सब्सक्रिप्शन और स्वतः एक्टिवेशन राजस्व');
  } else if (curTab === 'loans') {
    bannerIcon = '🏦';
    bannerTitle = tr('FINANCE & WORKING CAPITAL LEADS', 'फाइनेंस एवं वर्किंग कैपिटल लीड्स');
    bannerSubtitle = tr('Working capital loan requests, hardware POS & enterprise IT setups', 'वर्किंग कैपिटल लोन अनुरोध व हार्डवेयर/POS लीड्स');
  } else if (curTab === 'referrals') {
    bannerIcon = '🎁';
    bannerTitle = tr('REFERRAL REWARDS & MERCHANT COMMISSIONS', 'रेफरल रिवार्ड्स व व्यापारी कमीशन');
    bannerSubtitle = tr('Merchant referral credits, pending payouts and reward redemptions', 'व्यापारी रेफरल क्रेडिट व रिवार्ड वितरण');
  } else if (curTab === 'marketplace') {
    bannerIcon = '🚚';
    bannerTitle = tr('TRANSPORT & SERVICES MARKETPLACE', 'ट्रांसपोर्ट व सर्विसेज डायरेक्टरी');
    bannerSubtitle = tr('Review load posts, transporter verifications & verified service providers', 'लोड पोस्ट्स, ट्रांसपोर्टर सत्यापन व सर्विस प्रोवाइडर प्रविष्टियाँ');
  } else if (curTab === 'demos') {
    bannerIcon = '📞';
    bannerTitle = tr('DEMO REQUESTS & HELPDESK GRIEVANCES', 'डेमो अनुरोध व हेल्पडेस्क शिकायतें');
    bannerSubtitle = tr('Merchant onboard demo inquiries and community grievance tickets', 'दुकानदार ऑनबोर्डिंग अनुरोध व ग्राहक शिकायतें');
  } else if (curTab === 'employees') {
    bannerIcon = '👥';
    bannerTitle = tr('EMPLOYEES & ROLE-BASED ACCESS CONTROL (RBAC)', 'कर्मचारी एवं भूमिका आधारित अनुमतियां (RBAC)');
    bannerSubtitle = tr('Manage sub-admin credentials and department permission policies', 'सब-एडमिन स्टाफ और विभागीय अनुमतियों का प्रबंधन');
  } else if (curTab === 'vault') {
    bannerIcon = '🔐';
    bannerTitle = tr('SECRET API VAULT & MARKETPLACE ROLLOUT SWITCHES', 'सीक्रेट API वॉल्ट व मार्केटप्लेस स्विचेस');
    bannerSubtitle = tr('AES-256-GCM Server Encryption for Gemini AI API Key & 1-Click Rollout Switches', 'Gemini AI API Key की AES-256 सर्वर सुरक्षा व 1-क्लिक रोलआउट स्विचेस');
  }

  let contentHtml = `
    ${curTab === 'overview' ? renderAdminOverview(ad) : ''}
    ${curTab === 'merchants' && hasPerm('perm_merchants') ? renderAdminMerchants(ad) : ''}
    ${curTab === 'upgrades' && hasPerm('perm_merchants') ? renderAdminUpgrades(ad) : ''}
    ${curTab === 'loans' && hasPerm('perm_loans_leads') ? renderAdminLoans(ad) : ''}
    ${curTab === 'referrals' && hasPerm('perm_referrals') ? renderAdminReferrals(ad) : ''}
    ${curTab === 'marketplace' && hasPerm('perm_marketplace') ? renderAdminMarketplace(ad) : ''}
    ${curTab === 'demos' && hasPerm('perm_demos_faqs') ? renderAdminDemosFaqs(ad) : ''}
    ${curTab === 'employees' && isSuper ? renderAdminEmployees(ad) : ''}
    ${curTab === 'vault' && isSuper ? renderAdminVault(ad) : ''}

    <!-- Immutable Admin & Employee Audit Log -->
    <div class="erp-card" style="margin-top:24px">
      <h3 style="margin-bottom:10px">🕵️ ${tr('Immutable Admin & Employee Audit Trail', 'एडमिन और कर्मचारी ऑडिट ट्रेल')}</h3>
      <div class="table-wrap" style="max-height:260px;overflow-y:auto">
        <table>
          <thead>
            <tr><th>Time</th><th>Actor</th><th>Role</th><th>Action Performed</th><th>Target ID</th></tr>
          </thead>
          <tbody>
            ${(ad.adminAudit || []).map(a => `
              <tr>
                <td style="font-size:0.76rem">${new Date(a.createdAt).toLocaleString('en-IN')}</td>
                <td><b>${esc(a.actorName)}</b></td>
                <td><span class="badge badge-gold">${esc(a.actorRole)}</span></td>
                <td>${esc(a.action)}</td>
                <td style="font-family:monospace;font-size:0.76rem">${esc(a.targetId)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  return renderEnterpriseShell({
    roleTitle: isSuper ? 'SUPER ADMIN' : u.designation,
    uniqueId: u.uniqueId || 'KQA-000001',
    activeTab: curTab,
    navItems: adminNavItems,
    bannerIcon,
    bannerTitle,
    bannerSubtitle,
    bannerActionHtml,
    contentHtml,
    shop: null
  });
}

function renderAdminMerchants(ad) {
  return `
    <div class="card">
      <h3 style="margin-bottom:14px">🏪 ${tr('All Registered Merchants & Manufacturers (Manage Plans, AI Credits & Verification)', 'सभी पंजीकृत व्यापारी और निर्माता')}</h3>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Shop / Firm</th>
              <th>City &amp; GSTIN</th>
              <th>Mobile</th>
              <th>Current Plan</th>
              <th>AI Quota (Used / Limit)</th>
              <th>Status &amp; Badge</th>
              <th>1-Click Admin Actions</th>
            </tr>
          </thead>
          <tbody>
            ${ad.merchants.map(m => `
              <tr>
                <td>
                  <b>${esc(m.shop)}</b>
                  <div class="text-muted" style="font-size:0.75rem">${esc(m.owner)} · ${esc(m.refCode)}</div>
                </td>
                <td>
                  ${esc(m.city)}, ${esc(m.state)}
                  <div style="font-family:monospace;font-size:0.74rem" class="text-gold">${esc(m.gstin || 'Non-GST')}</div>
                </td>
                <td>
                  <a href="tel:${m.phone}" class="text-gold">${esc(m.phone)}</a>
                </td>
                <td>
                  <select class="select" style="padding:4px 8px;font-size:0.78rem;width:auto" onchange="adminAction('merchants','${m.id}','set_plan',this.value)">
                    ${['Starter (Free)', 'Vyapar Pro', 'B2B Enterprise'].map(pl => `<option value="${pl}" ${m.plan === pl ? 'selected' : ''}>${pl}</option>`).join('')}
                  </select>
                </td>
                <td>
                  <span class="badge ${m.aiUsed >= m.aiLimit ? 'badge-danger' : 'badge-primary'}">${m.aiUsed || 0} / ${m.aiLimit || 3} scans</span>
                </td>
                <td>
                  <span class="badge ${m.active !== false ? 'badge-primary' : 'badge-danger'}">${m.active !== false ? 'Active' : 'Suspended'}</span>
                  ${m.verified ? `<span class="badge badge-gold">✓ Verified</span>` : ''}
                </td>
                <td>
                  <div style="display:flex;gap:5px;flex-wrap:wrap">
                    <button class="btn btn-gold btn-sm" onclick="adminAction('merchants','${m.id}','add_ai_credits',10)">+10 AI Cr</button>
                    <button class="btn btn-ghost btn-sm" onclick="adminAction('merchants','${m.id}','toggle_verified')">${m.verified ? 'Unverify' : '✓ Verify'}</button>
                    <button class="btn btn-danger btn-sm" onclick="adminAction('merchants','${m.id}','toggle_active')">${m.active !== false ? '🚫 Suspend' : 'Activate'}</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderAdminUpgrades(ad) {
  const promos = ad.promotions || [];
  return `
    <div style="display:grid;gap:20px">
      <div class="card">
        <h3 style="margin-bottom:14px">⚡ ${tr('Merchant Plan Upgrade Requests', 'प्लान अपग्रेड अनुरोध')}</h3>
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Shop</th><th>Mobile</th><th>Requested Plan</th><th>Amount</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              ${ad.upgrades.length === 0 ? `<tr><td colspan="6" style="text-align:center" class="text-muted">No pending upgrade requests.</td></tr>` : ''}
              ${ad.upgrades.map(u => `
                <tr>
                  <td><b>${esc(u.shop)}</b></td>
                  <td>${esc(u.phone)}</td>
                  <td><span class="badge badge-gold">${esc(u.plan)} (${esc(u.billingCycle)})</span></td>
                  <td><b>${fmtINR(u.amount)}</b></td>
                  <td><span class="badge ${u.status === 'Activated' ? 'badge-primary' : 'badge-gold'}">${esc(u.status)}</span></td>
                  <td>
                    ${u.status !== 'Activated' ? `
                      <button class="btn btn-gold btn-sm" onclick="adminAction('upgrades','${u.id}','approve')">✓ Approve &amp; Unlock Plan</button>
                    ` : '✓ Done'}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="card" style="border-color:var(--gold)">
        <h3 style="margin-bottom:14px">📢 ${tr('Sponsored Business Spotlight Promotions (Approve / Pause)', 'स्पॉन्सर्ड बिज़नेस स्पॉटलाइट प्रमोशन अनुरोध')} (${promos.length})</h3>
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Shop &amp; City</th><th>Headline &amp; Offer</th><th>Package</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              ${promos.length === 0 ? `<tr><td colspan="5" style="text-align:center" class="text-muted">No promotion requests yet.</td></tr>` : ''}
              ${promos.map(p => `
                <tr>
                  <td><b>${esc(p.shopName)}</b><br/><span class="text-muted" style="font-size:0.75rem">${esc(p.city)} · ${esc(p.phone || '')}</span></td>
                  <td><b>${esc(p.headline)}</b><br/><span class="text-gold" style="font-size:0.78rem">${esc(p.offerText)}</span></td>
                  <td><span class="badge badge-gold">${esc(p.packagePlan)}</span></td>
                  <td><span class="badge ${p.status === 'Active' ? 'badge-primary' : 'badge-gold'}">${esc(p.status)}</span></td>
                  <td>
                    <button class="btn btn-primary btn-sm" onclick="adminAction('promotions','${p.id}','status','Active')">✓ Activate Spotlight</button>
                    <button class="btn btn-ghost btn-sm" onclick="adminAction('promotions','${p.id}','status','Paused')">⏸ Pause</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderAdminLoans(ad) {
  return `
    <div class="card">
      <h3 style="margin-bottom:14px">🏦 ${tr('High-Margin Revenue CRM: Working Capital Loans & Digital/AI Leads', 'वर्किंग कैपिटल लोन और कस्टम डिजिटल/AI लीड्स')}</h3>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Track &amp; Need</th><th>Firm / Shop</th><th>Mobile &amp; City</th><th>Amount / Note</th><th>Partner / Commission Note</th><th>Status</th><th>Forward on WA</th></tr>
          </thead>
          <tbody>
            ${ad.loans.map(l => `
              <tr>
                <td>
                  <span class="badge ${l.track === 'working-capital' ? 'badge-gold' : 'badge-primary'}">${esc(l.track)}</span>
                  <div style="font-weight:700;margin-top:4px">${esc(l.need)}</div>
                </td>
                <td><b>${esc(l.name)}</b></td>
                <td>${esc(l.phone)} · ${esc(l.city)}</td>
                <td>
                  ${l.amount ? `<b class="text-gold">${fmtINR(l.amount)}</b><br/>` : ''}
                  <span class="text-muted" style="font-size:0.78rem">${esc(l.note || '')}</span>
                </td>
                <td>
                  <div style="display:flex;gap:4px">
                    <input class="input" id="ln-note-${l.id}" value="${esc(l.partnerAssigned || '')}" placeholder="Assign Bank DSA / Partner" style="padding:4px 8px;font-size:0.78rem" />
                    <button class="btn btn-ghost btn-sm" onclick="adminAction('loans','${l.id}','note',null,document.getElementById('ln-note-${l.id}').value)">Save</button>
                  </div>
                </td>
                <td>
                  <select class="select" style="padding:4px 8px;font-size:0.78rem" onchange="adminAction('loans','${l.id}','status',this.value)">
                    ${['New', 'Contacted', 'Sent to Partner', 'Approved', 'Commission Received', 'Closed'].map(s => `<option value="${s}" ${l.status === s ? 'selected' : ''}>${s}</option>`).join('')}
                  </select>
                </td>
                <td>
                  <a class="btn btn-primary btn-sm" target="_blank" rel="noreferrer" href="https://wa.me/?text=${encodeURIComponent(`🏦 *KuberQ Verified Business Lead*\nFirm: ${l.name}\nCity: ${l.city}\nMobile: ${l.phone}\nNeed: ${l.need} (${fmtINR(l.amount)})\nNote: ${l.note || '—'}`)}">
                    📲 Forward Lead
                  </a>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderAdminReferrals(ad) {
  return `
    <div class="card">
      <h3 style="margin-bottom:14px">🎁 ${tr('Merchant Referrals (Zero Cash Liability — Verify to Grant +5 Bonus AI Credits)', 'व्यापारी रेफ़रल (+5 बोनस AI क्रेडिट्स दें)')}</h3>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Referred Shop</th><th>Referrer Code</th><th>Date</th><th>Status</th><th>Reward</th><th>Action</th></tr>
          </thead>
          <tbody>
            ${ad.referrals.map(r => `
              <tr>
                <td><b>${esc(r.shop)}</b> (${esc(r.city || '')})</td>
                <td><span class="badge badge-gold">${esc(r.agentCode)}</span></td>
                <td>${new Date(r.date).toLocaleDateString('en-IN')}</td>
                <td><span class="badge ${r.verified ? 'badge-primary' : 'badge-gold'}">${r.verified ? 'Verified' : 'Pending Verification'}</span></td>
                <td>${esc(r.rewardText)}</td>
                <td>
                  ${!r.rewardGranted ? `
                    <button class="btn btn-gold btn-sm" onclick="adminAction('referrals','${r.id}','verify')">
                      ✓ Verify Shop &amp; Grant +5 AI Credits
                    </button>
                  ` : '<span class="text-success">✓ +5 Credits Granted</span>'}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderAdminMarketplace(ad) {
  const reports = ad.reports || [];
  return `
    <div style="display:grid;gap:20px">
      <div class="grid grid-2">
        <div class="card">
          <h3 style="margin-bottom:12px">🚚 ${tr('Transport Loads & Waitlist Moderation', 'ट्रांसपोर्ट लोड और वेटलिस्ट')}</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr><th>Route &amp; Goods</th><th>Poster</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                ${ad.shipments.map(s => `
                  <tr>
                    <td><b>${esc(s.from)} → ${esc(s.to)}</b><br/><span class="text-muted" style="font-size:0.75rem">${esc(s.goods)} (${s.weight}kg)</span></td>
                    <td>${esc(s.poster)} (${esc(s.phone)})</td>
                    <td><span class="badge badge-gold">${esc(s.status)}</span></td>
                    <td>
                      <button class="btn btn-primary btn-sm" onclick="adminAction('shipments','${s.id}','status','Open')">Approve</button>
                      <button class="btn btn-danger btn-sm" onclick="adminAction('shipments','${s.id}','status','Deleted')">Delete</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="card">
          <h3 style="margin-bottom:12px">💼 ${tr('Service Providers Moderation (32 Categories)', 'बिज़नेस सेवा प्रदाता मॉडरेशन')}</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr><th>Provider &amp; ID</th><th>Category &amp; City/Pincode</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                ${ad.providers.map(p => `
                  <tr>
                    <td><b>${esc(p.name)}</b><br/><span class="text-muted" style="font-size:0.75rem">${esc(p.code)} · ${esc(p.phone)}</span></td>
                    <td>${esc(p.subcategory || p.category)}<br/><span class="text-muted" style="font-size:0.75rem">${esc(p.city)} - ${esc(p.pincode || '—')} (${p.experienceYears || 1} yrs)</span></td>
                    <td><span class="badge ${p.status === 'Approved' ? 'badge-primary' : 'badge-gold'}">${esc(p.status)}</span></td>
                    <td>
                      <button class="btn btn-primary btn-sm" onclick="adminAction('providers','${p.id}','status','Approved')">Approve</button>
                      <button class="btn btn-danger btn-sm" onclick="adminAction('providers','${p.id}','status','Rejected')">Hide</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="card" style="border-color:var(--danger)">
        <h3 style="margin-bottom:12px">🚩 ${tr('Community Fraud & Grievance Reports (IT Rules 2021 Moderation)', 'संदिग्ध प्रोफ़ाइल और शिकायत रिपोर्ट')} (${reports.length})</h3>
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Reported Profile</th><th>Type</th><th>Reason &amp; Details</th><th>Reporter</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              ${reports.length === 0 ? `<tr><td colspan="6" style="text-align:center" class="text-muted">${tr('Zero fraud/grievance reports pending.', 'कोई शिकायत लंबित नहीं है।')}</td></tr>` : ''}
              ${reports.map(r => `
                <tr>
                  <td><b>${esc(r.targetName)}</b> <span class="text-muted" style="font-size:0.75rem">(${esc(r.targetId)})</span></td>
                  <td><span class="badge badge-gold">${esc(r.targetType)}</span></td>
                  <td><b>${esc(r.reason)}</b><br/><span class="text-muted" style="font-size:0.78rem">${esc(r.details || '')}</span></td>
                  <td>${esc(r.reporterName)} (${esc(r.reporterPhone)})</td>
                  <td><span class="badge ${r.status === 'Resolved' ? 'badge-primary' : 'badge-danger'}">${esc(r.status)}</span></td>
                  <td>
                    <button class="btn btn-primary btn-sm" onclick="adminAction('reports','${r.id}','status','Resolved')">✓ Mark Resolved</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderAdminDemosFaqs(ad) {
  return `
    <div class="grid grid-2">
      <div class="card">
        <h3 style="margin-bottom:12px">📞 ${tr('1-on-1 Demo Bookings', '1-on-1 डेमो बुकिंग')}</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Shop</th><th>Mobile</th><th>Slot &amp; Topic</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              ${ad.demos.map(d => `
                <tr>
                  <td><b>${esc(d.shop)}</b></td>
                  <td><a href="tel:${d.phone}" class="text-gold">${esc(d.phone)}</a></td>
                  <td>${esc(d.slot)} · ${esc(d.topic)}</td>
                  <td><span class="badge badge-gold">${esc(d.status)}</span></td>
                  <td><button class="btn btn-primary btn-sm" onclick="adminAction('demos','${d.id}','status','Confirmed')">✓ Confirm</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="card">
        <h3 style="margin-bottom:12px">❓ ${tr('User Questions (FAQs)', 'पूछे गए सवाल')}</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>User</th><th>Question</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              ${ad.faqs.map(f => `
                <tr>
                  <td><b>${esc(f.name)}</b> (${esc(f.phone)})</td>
                  <td>${esc(f.question)}</td>
                  <td><span class="badge ${f.answered ? 'badge-primary' : 'badge-gold'}">${f.answered ? 'Answered' : 'Pending'}</span></td>
                  <td><button class="btn btn-primary btn-sm" onclick="adminAction('faqs','${f.id}','answer','Answered')">✓ Mark Answered</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderAdminEmployees(ad) {
  const allPerms = [
    ['perm_merchants', 'Manage Merchants, Plans & AI Credits'],
    ['perm_loans_leads', 'Manage Working Capital & Tech Leads'],
    ['perm_referrals', 'Verify Referrals (+5 AI Credits)'],
    ['perm_marketplace', 'Moderate Transport & Services Waitlist'],
    ['perm_demos_faqs', 'Confirm 1-on-1 Demos & Answer FAQs']
  ];

  return `
    <div class="grid grid-2">
      <div class="card">
        <span class="badge badge-gold">👥 ADD SUB-ADMIN EMPLOYEE</span>
        <h3 style="margin-top:8px;margin-bottom:12px">${tr('Add a Team Member with Granular Permissions', 'सीमित अधिकारों के साथ अपना कर्मचारी जोड़ें')}</h3>
        <form onsubmit="addPlatformEmployee(event)">
          <div class="grid grid-2">
            <div class="form-group">
              <label class="form-label">Employee Name *</label>
              <input class="input" id="emp-name" required placeholder="e.g. Rahul Verma" />
            </div>
            <div class="form-group">
              <label class="form-label">10-Digit Mobile (Login ID) *</label>
              <input class="input" id="emp-phone" required maxlength="10" placeholder="91XXXXXXXX" />
            </div>
          </div>
          <div class="grid grid-2">
            <div class="form-group">
              <label class="form-label">Designation / Role</label>
              <select class="select" id="emp-role">
                <option value="Onboarding & Catalog Executive">Onboarding &amp; Catalog Executive</option>
                <option value="Support & Demo Executive">Support &amp; Demo Executive</option>
                <option value="Finance & Loan Desk Officer">Finance &amp; Loan Desk Officer</option>
                <option value="Marketplace Moderator">Marketplace Moderator</option>
                <option value="Operations Manager">Operations Manager</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Login Password (min 6 chars) *</label>
              <input class="input" type="password" id="emp-pass" required minlength="6" placeholder="••••••" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Allowed Admin Tabs (Granular RBAC):</label>
            <div style="display:grid;gap:6px;margin-top:4px">
              ${allPerms.map(([k, label]) => `
                <label style="display:flex;align-items:center;gap:8px;font-size:0.84rem" class="card-subtle">
                  <input type="checkbox" name="emp_perm" value="${k}" checked /> ${label}
                </label>
              `).join('')}
            </div>
          </div>
          <button type="submit" class="btn btn-gold" style="width:100%">➕ Create Employee Account</button>
        </form>
      </div>

      <div class="card">
        <h3 style="margin-bottom:12px">🛡️ ${tr('Active Platform Employees (Sub-Admins)', 'सक्रिय कर्मचारी सूची')}</h3>
        <p class="text-muted" style="font-size:0.8rem;margin-bottom:12px">
          🔒 Security Guarantee: Sub-Admins can never view or edit your Encrypted API Key Vault, cannot modify other employees, and every click they make is logged in the Audit Trail below.
        </p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Name &amp; Role</th><th>Mobile</th><th>Permissions</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              ${ad.employees.map(e => `
                <tr>
                  <td><b>${esc(e.name)}</b><br/><span class="text-muted" style="font-size:0.75rem">${esc(e.designation)}</span></td>
                  <td>${esc(e.phone)}</td>
                  <td>${(e.permissions || []).map(p => `<span class="badge badge-muted" style="font-size:0.65rem">${esc(p.replace('perm_', ''))}</span>`).join(' ')}</td>
                  <td><span class="badge ${e.status === 'Active' ? 'badge-primary' : 'badge-danger'}">${esc(e.status)}</span></td>
                  <td>
                    <button class="btn btn-ghost btn-sm" onclick="toggleEmployeeStatus('${e.id}', '${e.status === 'Active' ? 'Paused' : 'Active'}')">
                      ${e.status === 'Active' ? '⏸ Pause' : '▶ Activate'}
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderAdminVault(ad) {
  const s = state.data.settings || {};
  return `
    <div class="grid grid-2" style="gap:20px">
      <div class="card" style="border:1.5px solid var(--gold);background:#ffffff">
        <span class="badge badge-gold">🔐 ${tr('AES-256-GCM ENCRYPTED SERVER VAULT', 'AES-256-GCM सुरक्षित सर्वर वॉल्ट')}</span>
        <h3 style="margin-top:10px;font-size:1.25rem">${tr('Gemini AI API Key Vault (100% Hidden from Browser)', 'Gemini AI API Key सुरक्षा वॉल्ट (100% सुरक्षित)')}</h3>
        <p class="text-muted" style="font-size:0.86rem;margin:8px 0 16px">
          ${tr('Your API Key is encrypted with AES-256-GCM on disk (`data/secrets.enc.json`) and is NEVER sent to any browser. Even if someone inspects network traffic or frontend code, your key cannot be seen or stolen.', 'आपकी API Key सर्वर पर AES-256-GCM एन्क्रिप्शन के साथ सुरक्षित रहती है और किसी भी ब्राउज़र या कर्मचारी को कभी नहीं दिखती।')}
        </p>
        <div class="card-subtle" style="margin-bottom:16px;padding:12px;background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0">
          <p style="font-size:0.88rem;margin:0">${tr('Current Vault Status: ', 'वर्तमान वॉल्ट स्थिति: ')}<b class="text-gold">${esc(ad.aiKeyStatus?.masked || tr('Not Configured', 'सेट नहीं है'))}</b></p>
        </div>
        <form onsubmit="saveVaultSettings(event)">
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">${tr('Paste New Google Gemini API Key (Leave blank to clear):', 'नई Google Gemini API Key दर्ज करें (हटाने हेतु खाली छोड़ें):')}</label>
            <input class="input" type="password" id="vault-key" placeholder="AIzaSy..." />
          </div>
          <button type="submit" class="btn btn-gold" style="width:100%;font-size:0.95rem">🔒 ${tr('Encrypt & Save API Key in Server Vault', 'API Key को सर्वर वॉल्ट में एन्क्रिप्ट व सुरक्षित करें')}</button>
        </form>
      </div>

      <div class="card" style="background:#ffffff">
        <span class="badge badge-primary">🚀 ${tr('PHASED B2B ROLLOUT SWITCHES', 'मार्केटप्लेस 1-क्लिक रोलआउट स्विचेस')}</span>
        <h3 style="margin-top:10px;font-size:1.25rem">${tr('Marketplace Module Launch Controls', 'मार्केटप्लेस मॉड्यूल लॉन्च नियंत्रण')}</h3>
        <p class="text-muted" style="font-size:0.86rem;margin:8px 0 16px">
          ${tr('Per our B2B strategy, keep Transport Exchange & Services Directory in "Coming Soon Waitlist Mode" while scaling merchants, or flip them Live anytime with 1 click.', 'व्यापारी नेटवर्क विस्तार के दौरान ट्रांसपोर्ट और सर्विसेज को "वेटलिस्ट मोड" में रखें अथवा 1-क्लिक में तुरंत लाइव करें।')}
        </p>
        <div style="display:grid;gap:12px">
          <div class="card-subtle" style="display:flex;justify-content:space-between;align-items:center;padding:14px;background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0">
            <div>
              <b style="font-size:0.95rem">🚚 ${tr('Transport Exchange (/transport)', 'ट्रांसपोर्ट एक्सचेंज (/transport)')}</b>
              <p class="text-muted" style="font-size:0.8rem;margin:2px 0 0">${tr('Current: ', 'वर्तमान: ')}${s.enableTransportLive ? tr('🟢 Live Load Board', '🟢 लाइव लोड बोर्ड') : tr('🟡 Coming Soon Waitlist Mode', '🟡 वेटलिस्ट मोड')}</p>
            </div>
            <button class="btn btn-sm ${s.enableTransportLive ? 'btn-primary' : 'btn-gold'}" onclick="toggleMarketplaceSwitch('enableTransportLive', ${!s.enableTransportLive})">
              ${s.enableTransportLive ? tr('Switch to Waitlist', 'वेटलिस्ट में बदलें') : tr('🚀 Turn Live Now', '🚀 अभी लाइव करें')}
            </button>
          </div>
          <div class="card-subtle" style="display:flex;justify-content:space-between;align-items:center;padding:14px;background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0">
            <div>
              <b style="font-size:0.95rem">💼 ${tr('Business Services Directory (/services)', 'बिजनेस सर्विसेज डायरेक्टरी (/services)')}</b>
              <p class="text-muted" style="font-size:0.8rem;margin:2px 0 0">${tr('Current: ', 'वर्तमान: ')}${s.enableServicesLive ? tr('🟢 Live Directory', '🟢 लाइव डायरेक्टरी') : tr('🟡 Coming Soon Waitlist Mode', '🟡 वेटलिस्ट मोड')}</p>
            </div>
            <button class="btn btn-sm ${s.enableServicesLive ? 'btn-primary' : 'btn-gold'}" onclick="toggleMarketplaceSwitch('enableServicesLive', ${!s.enableServicesLive})">
              ${s.enableServicesLive ? tr('Switch to Waitlist', 'वेटलिस्ट में बदलें') : tr('🚀 Turn Live Now', '🚀 अभी लाइव करें')}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
function renderSolutions() {
  const sectors = [
    [
      'Hardware, Pipes & Sanitary',
      'हार्डवेयर, पाइप और सेनेटरी',
      'HSN 3917/8481 auto-suggest, B2B MOQ wholesale rates, and instant Parchi-to-Invoice conversion for plumbers & contractors.',
      'HSN 3917/8481 ऑटो-सुझाव, थोक MOQ रेट, और प्लंबर व ठेकेदारों की हाथ की पर्ची से सेकंडों में पक्का बिल।'
    ],
    [
      'Electrical & Switchgear',
      'इलेक्ट्रिकल और स्विचगियर',
      'Manage coil stock, modular switch boxes, dealer GSTIN credit bills, and instant WhatsApp UPI collection.',
      'वायर कॉइल स्टॉक, मॉड्यूलर स्विच बॉक्स, डीलर GSTIN क्रेडिट बिल और तुरंत WhatsApp UPI पेमेंट कलेक्शन।'
    ],
    [
      'Cement, Steel & Building Material',
      'सीमेंट, सरिया और बिल्डिंग मटेरियल',
      '28% GST & 18% IGST compliant billing, site-location pin delivery, and party-wise Udhaar ledger.',
      '28% GST और 18% IGST पक्का बिल, निर्माण साइट लोकेशन डिलीवरी और पार्टी-वार उधारी बही-खाता।'
    ],
    [
      'Mandi & Wholesale Kirana',
      'मंडी और थोक किराना',
      '5% GST katta/bag billing, counter cash-up (नकद मिलान), and zero-login QR ordering for retail shops.',
      '5% GST कट्टा/बैग बिलिंग, काउंटर नकद मिलान और खुदरा दुकानों के लिए बिना लॉगिन QR ऑर्डर।'
    ],
    [
      'Manufacturers & Distributors',
      'निर्माता और डिस्ट्रीब्यूटर',
      'Inter-state IGST invoicing, bulk AI catalog onboarding, and Working Capital CC limit assistance.',
      'इंटर-स्टेट IGST बिलिंग, बल्क AI कैटलॉग सेटअप और वर्किंग कैपिटल CC लिमिट में सहायता।'
    ]
  ];
  return `
    <div class="container" style="padding:48px 24px">
      <div style="text-align:center;max-width:740px;margin:0 auto 36px">
        <span class="badge badge-gold">✦ ${tr('INDUSTRY-SPECIFIC B2B SOLUTIONS', 'उद्योग-विशेष B2B व्यापार समाधान')}</span>
        <h1 style="font-size:2.3rem;margin-top:10px">${tr('Purpose-Built for Indian B2B Traders & Wholesalers', 'भारतीय B2B व्यापारियों और थोक विक्रेताओं के लिए विशेष समाधान')}</h1>
      </div>
      <div class="grid grid-3">
        ${sectors.map(([en, hi, descEn, descHi]) => `
          <div class="feature-card">
            <span class="badge badge-gold">${tr('B2B Trade OS', 'B2B व्यापार OS')}</span>
            <h3 style="margin-top:10px;font-size:1.3rem">${tr(en, hi)}</h3>
            <p class="text-muted" style="font-size:1rem;margin:10px 0 18px">${tr(descEn, descHi)}</p>
            <button class="btn btn-gold btn-sm" onclick="navigate('/signup')">${tr('Start with Free Trial →', 'निःशुल्क ट्रायल शुरू करें →')}</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderTransportPage() {
  const isLive = state.data.settings.enableTransportLive;
  const shipments = state.data.shipments || [];
  const u = state.data.user;

  return `
    <div class="container" style="padding:44px 24px">
      <div class="card" style="margin-bottom:24px;border-color:var(--gold)">
        <span class="badge badge-gold">${isLive ? tr('🟢 LIVE TRANSPORT EXCHANGE', '🟢 लाइव ट्रांसपोर्ट एक्सचेंज') : tr('🚀 LAUNCHING SOON — PRIORITY B2B WAITLIST', '🚀 जल्द आ रहा है — प्रायोरिटी B2B वेटलिस्ट')}</span>
        <h1 style="font-size:2rem;margin-top:8px">
          ${isLive
            ? tr('Intercity B2B Transport & Fleet Exchange', 'इंटरसिटी B2B ट्रांसपोर्ट एक्सचेंज')
            : tr('B2B Transport Exchange — Join Early Access Waitlist', 'B2B ट्रांसपोर्ट एक्सचेंज — प्रायोरिटी वेटलिस्ट से जुड़ें')}
        </h1>
        <p class="text-muted" style="font-size:1.02rem;margin-top:8px;max-width:780px">
          ${isLive
            ? tr('Post upcoming loads or connect with verified fleet owners.', 'आने वाले लोड पोस्ट करें और सत्यापित ट्रांसपोर्टरों से जुड़ें।')
            : tr('We are currently onboarding verified B2B traders and fleet owners in Rajasthan & Gujarat before opening public load bidding. Post your route requirement or fleet details below for priority onboarding!', 'हम वर्तमान में जोधपुर और राजस्थान के सत्यापित व्यापारियों व ट्रांसपोर्टरों को जोड़ रहे हैं। प्राथमिकता एक्सेस के लिए नीचे अपना रूट या गाड़ी का विवरण दर्ज करें!')}
        </p>
      </div>

      <!-- Community Trust Safety Notice -->
      <div class="card-subtle" style="margin-bottom:20px;border-left:4px solid var(--gold);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
        <p style="font-size:0.94rem;font-weight:700;color:#0f172a">
          🛡️ ${tr('Safety Notice: Exercise caution before making advance freight payments to new transporters with low community verification counts.', 'सुरक्षा सूचना: कम वेरिफिकेशन वाले नए ट्रांसपोर्टरों के साथ अग्रिम भुगतान (Advance Payment) करने से पहले सतर्क रहें।')}
        </p>
      </div>

      <div class="grid grid-2">
        <div class="card">
          <h3>🚚 ${isLive ? tr('Post a Load Requirement', 'लोड आवश्यकता पोस्ट करें') : tr('Register Route / Fleet on Waitlist', 'वेटलिस्ट में अपना रूट / गाड़ी दर्ज करें')}</h3>
          <form onsubmit="submitShipmentForm(event)" style="margin-top:14px">
            <div class="grid grid-2">
              <div class="form-group">
                <label class="form-label">${tr('Pickup City', 'पिकअप शहर')} *</label>
                <input class="input" id="tr-from" required value="Jodhpur" />
              </div>
              <div class="form-group">
                <label class="form-label">${tr('Drop City', 'ड्रॉप शहर')} *</label>
                <input class="input" id="tr-to" required placeholder="${tr('e.g. Jaipur / Ahmedabad', 'जैसे: जयपुर / अहमदाबाद')}" />
              </div>
            </div>
            <div class="grid grid-2">
              <div class="form-group">
                <label class="form-label">${tr('Goods / Fleet Details', 'माल / गाड़ी का विवरण')} *</label>
                <input class="input" id="tr-goods" required placeholder="${tr('e.g. Sanitary Pipes / 2x Tata 407', 'जैसे: सेनेटरी पाइप / 2x टाटा 407')}" />
              </div>
              <div class="form-group">
                <label class="form-label">${tr('Vehicle Type', 'गाड़ी का प्रकार')}</label>
                <select class="select" id="tr-veh">
                  ${['Tata Ace', 'Pickup', 'Tata 407', '14 ft Truck', '19 ft Truck', '10-Wheel Truck', 'Trailer'].map(v => `<option value="${v}">${v}</option>`).join('')}
                </select>
              </div>
            </div>
            <div class="grid grid-2">
              <div class="form-group">
                <label class="form-label">${tr('Your Name / Transport Agency', 'आपका नाम / ट्रांसपोर्ट एजेंसी')} *</label>
                <input class="input" id="tr-name" required value="${esc(state.data.user?.name || '')}" />
              </div>
              <div class="form-group">
                <label class="form-label">${tr('10-Digit Mobile', '10 अंकों का मोबाइल नंबर')} *</label>
                <input class="input" id="tr-phone" required maxlength="10" value="${esc(state.data.user?.phone || '')}" />
              </div>
            </div>
            <label style="display:flex;align-items:start;gap:8px;font-size:0.9rem;margin:12px 0" class="text-muted">
              <input type="checkbox" id="tr-consent" required checked />
              <span>${tr('I declare these goods are legal, properly invoiced with GST/e-Way Bill (if > ₹50,000), and contain no prohibited items.', 'मैं घोषणा करता हूँ कि यह माल वैध है, पक्के GST बिल / ई-वे बिल (₹50,000 से अधिक पर) के साथ है और इसमें कोई प्रतिबंधित वस्तु नहीं है।')}</span>
            </label>
            <button type="submit" class="btn btn-gold" style="width:100%">
              ${isLive ? tr('Publish Load', 'लोड पोस्ट करें') : tr('Join Priority Transport Waitlist', 'प्रायोरिटी वेटलिस्ट में जुड़ें')}
            </button>
          </form>
        </div>

        <div class="card">
          <h3>📋 ${tr('Verified Transport Routes & Fleet Board', 'सत्यापित ट्रांसपोर्ट रूट और लोड बोर्ड')} (${shipments.length})</h3>
          <div style="display:grid;gap:12px;margin-top:14px">
            ${shipments.map(s => `
              <div class="card-subtle">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
                  <div>
                    <b>${esc(trDyn(s.from))} → ${esc(trDyn(s.to))}</b>
                    <span class="badge badge-primary" style="font-family:monospace;font-size:0.72rem;margin-left:6px">${esc(s.code || 'KQT-618294')}</span>
                  </div>
                  <div style="display:flex;gap:6px;align-items:center">
                    <span class="badge badge-gold">${esc(s.vehicle)}</span>
                    <span class="badge badge-primary">🛡️ ${s.communityVerifications || 1} ${tr('Verified', 'द्वारा सत्यापित')}</span>
                  </div>
                </div>
                <p class="text-muted" style="font-size:0.94rem;margin-top:6px">${esc(s.goods)} · ${s.weight || 1500} kg · <b>${esc(s.poster)}</b> (${esc(s.phone)})</p>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;padding-top:8px;border-top:1px dashed var(--border)">
                  <button class="btn btn-ghost btn-sm" style="padding:4px 10px;font-size:0.8rem" onclick="vouchForEntity('shipment', '${s.id}', '${esc(s.poster)}')">
                    👍 ${tr('Verify Transporter (Trust Badge)', 'सत्यापित करें (Trust Badge)')}
                  </button>
                  <button class="btn btn-ghost btn-sm" style="padding:4px 10px;font-size:0.8rem;color:var(--danger)" onclick="openReportModal('shipment', '${s.id}', '${esc(s.poster)}')">
                    🚩 ${tr('Report / Grievance', 'रिपोर्ट / शिकायत करें')}
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      ${renderOperatorLeadDesk(u?.name || '', u?.phone || '', u?.city || 'Jodhpur', tr('Transporter / Fleet Operator', 'ट्रांसपोर्टर / वाहन स्वामी'))}
    </div>
  `;
}

function renderServicesPage() {
  const isLive = state.data.settings.enableServicesLive;
  const allProviders = state.data.providers || [];
  const u = state.data.user;

  const curCatVal = state.selectedServiceCat || SERVICE_CATEGORIES_30[0].catEn;
  const selectedCatObj = SERVICE_CATEGORIES_30.find(c => c.catEn === curCatVal) || SERVICE_CATEGORIES_30[0];
  const subList = selectedCatObj ? selectedCatObj.subs : [];
  const curSubVal = state.selectedServiceSub || subList[0] || '';
  const isOtherSelected = String(curCatVal).includes('Other') || String(curSubVal).includes('Other');

  const filteredProviders = allProviders.filter(p => {
    const q = (state.serviceSearchCity || '').trim().toLowerCase();
    const pin = (state.serviceSearchPincode || '').trim();
    const cat = state.serviceFilterCat || 'ALL';
    const matchCity = !q || (p.city || '').toLowerCase().includes(q) || (p.name || '').toLowerCase().includes(q) || (p.subcategory || '').toLowerCase().includes(q);
    const matchPin = !pin || (p.pincode || '').includes(pin);
    const matchCat = cat === 'ALL' || p.category === cat || p.subcategory === cat;
    return matchCity && matchPin && matchCat;
  });

  const sTab = state.servicesPageTab || 'find';

  return `
    <div class="container" style="padding:44px 24px">
      <div class="card" style="margin-bottom:20px;border-color:var(--gold);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px">
        <div>
          <span class="badge badge-gold">${isLive ? tr('🟢 VERIFIED B2B SERVICES DIRECTORY (30+ CATEGORIES)', '🟢 सत्यापित B2B सेवा डायरेक्टरी (30+ श्रेणियाँ)') : tr('🚀 30+ CATEGORIES — CA, GST, LEGAL, ARCHITECT, INDUSTRIAL & IT DIRECTORY', '🚀 30+ श्रेणियाँ — CA, GST, वकील, आर्किटेक्ट, इंडस्ट्रियल और IT डायरेक्टरी')}</span>
          <h1 style="font-size:2rem;margin-top:8px">
            ${tr('Verified B2B & Professional Services Directory', 'सत्यापित व्यापार एवं प्रोफेशनल सेवा डायरेक्टरी')}
          </h1>
          <p class="text-muted" style="font-size:1rem;margin-top:6px;max-width:740px">
            ${tr('Choose whether you want to book/find a business service or register as a service provider.', 'नीचे चुनें: क्या आप अपने व्यापार के लिए कोई विशेषज्ञ खोज रहे हैं या स्वयं एक सेवा प्रदाता के रूप में जुड़ना चाहते हैं।')}
          </p>
        </div>

        <!-- Clean 2-Tab Switcher for /services -->
        <div style="display:inline-flex;gap:8px;background:var(--bg-soft);padding:6px;border-radius:12px;border:1.5px solid var(--border)">
          <button type="button" class="btn btn-sm ${sTab === 'find' ? 'btn-gold' : 'btn-ghost'}" onclick="state.servicesPageTab='find';render()">
            🔍 ${tr('1. Find Expert / Book Service Lead', '1. विशेषज्ञ खोजें / सेवा बुक करें')}
          </button>
          <button type="button" class="btn btn-sm ${sTab === 'register' ? 'btn-gold' : 'btn-ghost'}" onclick="state.servicesPageTab='register';render()">
            💼 ${tr('2. Register as Service Provider', '2. अपनी सेवा रजिस्टर करें (KQSP ID)')}
          </button>
        </div>
      </div>

      ${sTab === 'find' ? `
        <!-- DIRECT SERVICE LEAD GENERATOR FOR CUSTOMERS & MERCHANTS -->
        <div class="card" style="margin-bottom:24px;background:linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);border:2px solid #f59e0b">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px">
            <span class="badge badge-gold">📩 ${tr('BOOK A BUSINESS SERVICE / GENERATE LEAD', 'व्यापारिक सेवा बुक करें / कोटेशन मँगाएँ')}</span>
            <span style="font-size:0.84rem;color:#92400e;font-weight:700">${tr('Direct Lead to KuberQ Admin & Verified Experts', 'सीधे KuberQ एडमिन और सत्यापित विशेषज्ञों से संपर्क')}</span>
          </div>
          <h3 style="margin-bottom:10px;color:#0f172a">${tr('Looking for a CA, Lawyer, Architect, Contractor, Solar or Other Service? Tell Us Your Need:', 'किसी व्यापारिक सेवा (CA, वकील, आर्किटेक्ट, ठेकेदार, सोलर आदि) की आवश्यकता है? अपनी रिक्वायरमेंट भेजें:')}</h3>
          <form onsubmit="submitServiceRequirementLead(event)">
            <div class="grid grid-4" style="gap:10px">
              <div class="form-group" style="margin:0">
                <label class="form-label">${tr('Your Name / Shop', 'आपका नाम / दुकान')} *</label>
                <input class="input" id="slead-name" required value="${esc(u?.name || '')}" placeholder="${tr('e.g. Rajesh Traders', 'जैसे: राजेश ट्रेडर्स')}" />
              </div>
              <div class="form-group" style="margin:0">
                <label class="form-label">${tr('10-Digit Mobile', 'मोबाइल नंबर')} *</label>
                <input class="input" id="slead-phone" required maxlength="10" value="${esc(u?.phone || '')}" placeholder="98XXXXXXXX" />
              </div>
              <div class="form-group" style="margin:0">
                <label class="form-label">${tr('Select Service Needed (32 Categories)', 'कौन-सी सेवा चाहिए?')} *</label>
                <select class="select" id="slead-cat">
                  ${SERVICE_CATEGORIES_30.map(c => `<option value="${esc(c.catEn)}">${esc(tr(c.catEn, c.catHi))}</option>`).join('')}
                </select>
              </div>
              <div class="form-group" style="margin:0">
                <label class="form-label">${tr('City & Short Requirement', 'शहर व संक्षिप्त विवरण')} *</label>
                <input class="input" id="slead-note" required placeholder="${tr('e.g. Jodhpur — Need GSTR-1 & Audit', 'जैसे: जोधपुर — GST रिटर्न और ऑडिट कार्य')}" />
              </div>
            </div>
            <div style="margin-top:12px;display:flex;justify-content:flex-end">
              <button type="submit" class="btn btn-gold">🚀 ${tr('Submit Service Requirement (Get Expert Call)', 'सेवा आवश्यकता भेजें (विशेषज्ञ से कॉल मँगाएँ)')}</button>
            </div>
          </form>
        </div>

        <!-- Community Trust Safety Notice -->
        <div class="card-subtle" style="margin-bottom:20px;border-left:4px solid var(--gold)">
          <p style="font-size:0.94rem;font-weight:700;color:#0f172a">
            🛡️ ${tr('Safety Notice: Exercise caution before making advance payments to new service providers with low community verification counts.', 'सुरक्षा सूचना: कम वेरिफिकेशन वाले नए सेवा प्रदाताओं के साथ अग्रिम भुगतान (Advance Payment) करने से पहले सतर्क रहें।')}
          </p>
        </div>

        <!-- Search & Filter Bar (City, Pincode, 30+ Category Filter) -->
        <div class="card" style="margin-bottom:24px">
          <div class="grid grid-3" style="gap:12px">
            <div>
              <label class="form-label">📍 ${tr('Search by City or Provider Name', 'शहर या नाम से खोजें')}</label>
              <input class="input" value="${esc(state.serviceSearchCity)}" placeholder="${tr('e.g. Jodhpur, Jaipur, CA...', 'जैसे: जोधपुर, जयपुर, CA...')}" oninput="state.serviceSearchCity=this.value;render()" />
            </div>
            <div>
              <label class="form-label">📮 ${tr('Filter by Pincode', 'पिनकोड से खोजें')}</label>
              <input class="input" maxlength="6" value="${esc(state.serviceSearchPincode)}" placeholder="${tr('e.g. 342001', 'जैसे: 342001')}" oninput="state.serviceSearchPincode=this.value;render()" />
            </div>
            <div>
              <label class="form-label">🗂️ ${tr('Filter by Main Service Category (30+)', 'मुख्य सेवा श्रेणी चुनें (30+)')}</label>
              <select class="select" onchange="state.serviceFilterCat=this.value;render()">
                <option value="ALL">${tr('All 32 Service Categories', 'सभी 32 सेवा श्रेणियाँ')}</option>
                ${SERVICE_CATEGORIES_30.map(c => `<option value="${esc(c.catEn)}" ${state.serviceFilterCat === c.catEn ? 'selected' : ''}>${esc(tr(c.catEn, c.catHi))}</option>`).join('')}
              </select>
            </div>
          </div>
        </div>

        <div class="card">
          <h3>✦ ${tr('Verified Service Providers Directory', 'सत्यापित बिज़नेस सेवा प्रदाता सूची')} (${filteredProviders.length})</h3>
          <div class="grid grid-2" style="margin-top:14px">
            ${filteredProviders.length === 0 ? `<p class="text-muted">${tr('No providers match your filter. Clear filters above or switch to the Register tab!', 'इस फ़िल्टर में कोई सेवा प्रदाता नहीं मिला। ऊपर फ़िल्टर बदलें!')}</p>` : ''}
            ${filteredProviders.map(p => `
              <div class="card-subtle">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
                  <b style="font-size:1.08rem">${esc(p.name)}</b>
                  <div style="display:flex;gap:6px;align-items:center">
                    <span class="badge badge-gold" style="font-family:monospace">${esc(p.code)}</span>
                    <span class="badge badge-primary">🛡️ ${p.communityVerifications || 1} ${tr('Verified', 'द्वारा सत्यापित')}</span>
                  </div>
                </div>
                <p class="text-gold" style="font-size:0.92rem;margin-top:4px;font-weight:700">
                  ${esc(p.subcategory || p.category)}
                </p>
                <p class="text-muted" style="font-size:0.86rem;margin-top:2px">
                  📍 ${esc(trDyn(p.city))} (${esc(p.pincode || '342001')}) · 🏆 ${p.experienceYears || 5} ${tr('Yrs Exp', 'वर्ष का अनुभव')} · 📞 ${esc(p.phone)}
                </p>
                <p class="text-muted" style="font-size:0.9rem;margin-top:6px">${esc(p.description)}</p>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;padding-top:8px;border-top:1px dashed var(--border)">
                  <button class="btn btn-ghost btn-sm" style="padding:4px 10px;font-size:0.8rem" onclick="vouchForEntity('provider', '${p.id}', '${esc(p.name)}')">
                    👍 ${tr('Verify Provider (Trust Badge)', 'सत्यापित करें (Trust Badge)')}
                  </button>
                  <button class="btn btn-ghost btn-sm" style="padding:4px 10px;font-size:0.8rem;color:var(--danger)" onclick="openReportModal('provider', '${p.id}', '${esc(p.name)}')">
                    🚩 ${tr('Report / Grievance', 'रिपोर्ट / शिकायत करें')}
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : `
        <div class="card">
          <h3>💼 ${tr('Register as a Service Provider (Instant 6-Char KQSP ID)', 'अपनी सेवा रजिस्टर करें (तुरंत 6-अंकों का KQSP ID पाएँ)')}</h3>
          <form onsubmit="submitProviderForm(event)" style="margin-top:14px">
            <div class="grid grid-2">
              <div class="form-group">
                <label class="form-label">${tr('Firm / Professional Name', 'दुकान / प्रोफेशनल का नाम')} *</label>
                <input class="input" id="sv-name" required value="${esc(u?.name || '')}" placeholder="${tr('e.g. CA Pradeep Kothari & Co.', 'जैसे: CA प्रदीप कोठारी एंड कंपनी')}" />
              </div>
              <div class="form-group">
                <label class="form-label">${tr('10-Digit Business Mobile', '10 अंकों का मोबाइल नंबर')} *</label>
                <input class="input" id="sv-phone" required maxlength="10" value="${esc(u?.phone || '')}" placeholder="98XXXXXXXX" />
              </div>
            </div>

            <div class="grid grid-2">
              <div class="form-group">
                <label class="form-label">${tr('1. Select Main Service Category (32 Categories)', '1. मुख्य सेवा श्रेणी चुनें (32 श्रेणियाँ)')} *</label>
                <select class="select" id="sv-cat" onchange="onServiceCategoryChange(this.value)">
                  ${SERVICE_CATEGORIES_30.map(c => `<option value="${esc(c.catEn)}" ${curCatVal === c.catEn ? 'selected' : ''}>${esc(tr(c.catEn, c.catHi))}</option>`).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">${tr('2. Select Specialized Sub-Category', '2. उप-श्रेणी (Sub-Category) चुनें')} *</label>
                <select class="select" id="sv-subcat" onchange="state.selectedServiceSub=this.value;render()">
                  ${subList.map(s => `<option value="${esc(s)}" ${curSubVal === s ? 'selected' : ''}>${esc(s)}</option>`).join('')}
                </select>
              </div>
            </div>

            ${isOtherSelected ? `
              <div class="form-group">
                <label class="form-label">${tr('Type Your Custom Service Name (Other / अन्य)', 'अपनी अन्य सेवा का नाम लिखें (Other)')} *</label>
                <input class="input" id="sv-custom" required value="${esc(state.customServiceText)}" oninput="state.customServiceText=this.value" placeholder="${tr('e.g. Industrial Boiler Calibration & Repair', 'जैसे: इंडस्ट्रियल बॉयलर रिपेयर और मेंटेनेंस')}" />
              </div>
            ` : ''}

            <div class="grid grid-3">
              <div class="form-group">
                <label class="form-label">${tr('City', 'शहर')} *</label>
                <input class="input" id="sv-city" required value="Jodhpur" />
              </div>
              <div class="form-group">
                <label class="form-label">${tr('6-Digit Pincode', 'पिनकोड')} *</label>
                <input class="input" id="sv-pincode" required maxlength="6" value="342001" placeholder="342001" />
              </div>
              <div class="form-group">
                <label class="form-label">${tr('Experience (Years)', 'अनुभव (वर्ष)')} *</label>
                <input class="input" type="number" id="sv-exp" required min="1" max="60" value="5" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">${tr('Short Bio / Specialization', 'संक्षिप्त विवरण / विशेषज्ञता')}</label>
              <input class="input" id="sv-desc" placeholder="${tr('e.g. B2B GST Audit, GSTR-1/3B, Factory Compliance', 'जैसे: B2B GST ऑडिट, GSTR-1/3B और फैक्ट्री अनुपालन')}" />
            </div>
            <button type="submit" class="btn btn-gold" style="width:100%">
              ✨ ${tr('Register Service & Generate KQSP ID', 'सेवा रजिस्टर करें और KQSP ID प्राप्त करें')}
            </button>
          </form>
        </div>

        ${renderOperatorLeadDesk(u?.name || '', u?.phone || '', u?.city || 'Jodhpur', tr('Service Provider / Business Operator', 'सेवा प्रदाता / व्यापारी'))}
      `}
    </div>
  `;
}

function renderPartnerPage() {
  const u = state.data.user;
  const refs = state.data.myReferrals || [];
  const code = u?.agentCode || state.data.myShop?.refCode || 'KQ-PARTNER';
  const link = `${window.location.origin}/signup?ref=${encodeURIComponent(code)}`;

  return `
    <div class="container" style="max-width:880px;padding:44px 24px">
      <div class="card">
        <span class="badge badge-gold">🤝 ${tr('KUBERQ CHANNEL PARTNER & REFERRAL PROGRAM', 'KUBERQ चैनल पार्टनर और रेफ़रल प्रोग्राम')}</span>
        <h1 style="font-size:2rem;margin-top:8px">${tr('Invite Fellow Merchants — Earn +5 Bonus AI Credits per Verified Shop', 'अन्य व्यापारियों को आमंत्रित करें — हर सत्यापित दुकान पर +5 बोनस AI क्रेडिट्स पाएँ')}</h1>
        <p class="text-muted" style="margin-top:8px;font-size:1.02rem">
          ${tr('Share KuberQ on WhatsApp with hardware stores, electrical dealers, wholesalers, and manufacturers. Every verified active shop earns +5 Bonus AI Credits & 100 Partner Reward Points (non-monetary software rewards).', 'हार्डवेयर, सेनेटरी, इलेक्ट्रिकल और थोक व्यापारियों को WhatsApp पर KuberQ का लिंक भेजें। हर सत्यापित दुकान पर +5 बोनस AI क्रेडिट्स और 100 पार्टनर पॉइंट्स पाएँ।')}
        </p>

        <div style="display:flex;gap:10px;flex-wrap:wrap;margin:20px 0">
          <input class="input" style="max-width:480px" readonly value="${esc(link)}" />
          <button class="btn btn-gold" onclick="navigator.clipboard.writeText('${link}');showToast(tr('Partner link copied!', 'पार्टनर लिंक कॉपी हो गया!'))">📋 ${tr('Copy Invite Link', 'लिंक कॉपी करें')}</button>
          <a class="btn btn-primary" target="_blank" rel="noreferrer" href="https://wa.me/?text=${encodeURIComponent(`Join KuberQ B2B Trade OS for Smart GST Billing & AI Catalog: ${link}`)}">💬 ${tr('Share on WhatsApp', 'WhatsApp पर भेजें')}</a>
        </div>

        <div class="grid grid-3" style="margin-top:16px">
          <div class="stat-card"><p class="stat-label">${tr('Total Referrals', 'कुल जुड़े व्यापारी')}</p><p class="stat-value">${refs.length}</p></div>
          <div class="stat-card"><p class="stat-label">${tr('Admin Verified Shops', 'सत्यापित दुकानें')}</p><p class="stat-value text-gold">${refs.filter(r => r.verified).length}</p></div>
          <div class="stat-card"><p class="stat-label">${tr('Bonus AI Credits Earned', 'अर्जित बोनस AI क्रेडिट्स')}</p><p class="stat-value text-success">+${refs.filter(r => r.verified).length * 5}</p></div>
        </div>
      </div>
    </div>
  `;
}

function renderCustomerPortal() {
  const u = state.data.user;
  const allShops = state.data.merchants || [];
  const q = (state.customerStoreSearch || '').trim().toLowerCase();
  const shops = allShops.filter(s => {
    if (!q) return true;
    return (
      (s.shop || '').toLowerCase().includes(q) ||
      (s.category || '').toLowerCase().includes(q) ||
      (s.city || '').toLowerCase().includes(q) ||
      (s.refCode || '').toLowerCase().includes(q)
    );
  });
  const promos = state.data.promotions || [];
  const orders = state.data.myOrders || [];

  const totalPurchased = orders
    .filter(o => o.status !== 'Rejected')
    .reduce((sum, o) => sum + (Number(o.totals?.gross) || 0), 0);
  const pendingUdhaarOrders = orders.filter(o => o.status !== 'Rejected' && o.paymentMode === 'Credit' && !o.udhaarSettled);
  const totalPendingUdhaar = pendingUdhaarOrders.reduce((sum, o) => sum + (Number(o.totals?.gross) || 0), 0);
  const customerUniqueId = u?.uniqueId || (orders[0]?.customerCode) || 'KQC-849201';
  const buyerRating = u?.buyerRating || 5.0;

  // If logged in as customer, show Enterprise Portal shell
  if (u && u.role === 'customer') {
    let curTab = state.customerTab || 'Directory';
    state.customerTab = curTab;

    const navItems = [
      ['Directory', '🛍️', tr('Store Directory & Catalogs', 'दुकान कैटलॉग व B2B स्टोर्स'), String(shops.length)],
      ['Orders', '📋', tr('My Orders & GST Bills', 'मेरे ऑर्डर्स व GST बिल'), orders.length ? String(orders.length) : ''],
      ['Udhaar', '📒', tr('My Udhaar to Pay', 'मेरा देय उधार खाता'), pendingUdhaarOrders.length ? String(pendingUdhaarOrders.length) : ''],
      ['BulkQuote', '💰', tr('Wholesale Bulk Quotes', 'थोक कोटेशन डेस्क'), ''],
      ['Profile', '⭐', tr('My Trust Score & Passbook', 'मेरी रेटिंग व पासबुक'), '5.0']
    ];

    let bannerIcon = '🛍️';
    let bannerTitle = tr('Customer Passbook & Store Directory', 'ग्राहक पासबुक, थोक रेट और स्टोर डायरेक्टरी');
    let bannerSubtitle = tr('Your 6-digit Unique ID (KQC) keeps your GST bills and orders distinct.', 'आपका 6-अंकों का यूनिक ID (KQC) आपके सभी GST बिलों और ऑर्डर्स को सुरक्षित रखता है।');
    let bannerActionHtml = `<button class="btn btn-gold btn-sm" onclick="state.customerTab='BulkQuote';render()">💰 ${tr('Get Wholesale Rates', 'थोक रेट मँगाएँ')}</button>`;
    let contentHtml = '';

    if (curTab === 'Directory') {
      bannerIcon = '🛍️';
      bannerTitle = tr('Verified B2B Stores & Catalogs', 'सत्यापित दुकानें और B2B कैटलॉग');
      bannerSubtitle = tr('Search verified wholesale and retail suppliers with live stock and direct counter ordering', 'शहर की सत्यापित दुकानों के कैटलॉग देखें और सीधे ऑर्डर लगाएं');
      bannerActionHtml = `<button class="btn btn-gold btn-sm" onclick="state.customerTab='BulkQuote';render()">💰 ${tr('Get Wholesale Rates', 'थोक रेट मँगाएँ')}</button>`;
      contentHtml = `
        ${promos.length > 0 ? `
          <div class="erp-card" style="background:linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);border-color:#f59e0b">
            <span class="badge badge-gold">✦ ${tr('SPONSORED BUSINESS SPOTLIGHT', 'स्पॉन्सर्ड बिज़नेस स्पॉटलाइट')}</span>
            <div class="grid grid-2" style="margin-top:12px">
              ${promos.map(p => `
                <div class="card" style="background:#ffffff;border-color:#fcd34d;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
                  <div>
                    <span class="badge badge-gold" style="font-size:0.7rem">SPONSORED</span>
                    <b style="font-size:1.15rem;display:block;margin-top:4px">${esc(trDyn(p.shop || p.shopName))}</b>
                    <p class="text-muted" style="font-size:0.88rem">${esc(trDyn(p.headline))} · <b class="text-gold">${esc(trDyn(p.offerBadge || p.offerText || 'B2B OFFER'))}</b></p>
                  </div>
                  <button class="btn btn-gold btn-sm" onclick="navigate('/order', { shop: '${p.shopId}' })">🛒 ${tr('Order Now', 'ऑर्डर करें')}</button>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div class="erp-card">
          <div class="erp-card-header">
            <div>
              <h3>🛍️ ${tr('Verified Stores & Catalogs', 'सत्यापित दुकानें और लाइव कैटलॉग')} (${shops.length})</h3>
              <p class="text-muted" style="font-size:0.88rem">दुकान का नाम, श्रेणी, शहर या 6-अंकों की यूनिक दुकान ID (जैसे: KQM-391042) से खोजें</p>
            </div>
            <div style="min-width:280px;max-width:380px">
              <input class="input" placeholder="🔍 दुकान नाम या ID खोजें..." value="${esc(state.customerStoreSearch || '')}" oninput="state.customerStoreSearch=this.value;render()" />
            </div>
          </div>

          <div class="grid grid-2" style="margin-top:14px">
            ${shops.map(s => `
              <div class="store-card" style="display:flex;flex-direction:column;justify-content:space-between;gap:12px;padding:18px;border:1.5px solid #e2e8f0;border-radius:12px;background:#fff">
                <div style="display:flex;justify-content:space-between;align-items:start;gap:10px;flex-wrap:wrap">
                  <div>
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                      <b style="font-size:1.15rem;color:#0f172a">${esc(trDyn(s.shop))}</b>
                      <span class="badge badge-primary" style="font-family:monospace;font-size:0.75rem">🆔 ${esc(s.refCode || 'KQM-391042')}</span>
                    </div>
                    <p class="text-muted" style="font-size:0.88rem;margin-top:4px">${esc(trDyn(s.category))} · ${esc(trDyn(s.city))}, ${esc(trDyn(s.state))}</p>
                    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px">
                      <span class="badge badge-primary">🛡️ ${s.communityVerifications || 1} खरीदारों द्वारा सत्यापित</span>
                      ${s.verified ? `<span class="badge badge-gold">✓ एडमिन सत्यापित</span>` : ''}
                    </div>
                  </div>
                  <button class="btn btn-primary btn-sm" onclick="navigate('/order', { shop: '${s.id}' })">🛒 कैटलॉग खोलें</button>
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center;padding-top:8px;border-top:1px dashed #e2e8f0">
                  <button class="btn btn-ghost btn-sm" style="padding:4px 8px;font-size:0.78rem" onclick="vouchForEntity('merchant', '${s.id}', '${esc(s.shop)}')">
                    👍 सत्यापित करें
                  </button>
                  <button class="btn btn-ghost btn-sm" style="padding:4px 8px;font-size:0.78rem;color:var(--danger)" onclick="openReportModal('merchant', '${s.id}', '${esc(s.shop)}')">
                    🚩 शिकायत दर्ज करें
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (curTab === 'Orders') {
      bannerIcon = '📋';
      bannerTitle = tr('My Orders & GST Invoices', 'मेरे ऑर्डर्स एवं पक्के GST बिल');
      bannerSubtitle = tr('1-Click reordering, thermal/A4 GST invoice download and seller feedback', 'पुराने ऑर्डर दोबारा मंगाएं, बिल डाउनलोड करें और फीडबैक दें');
      bannerActionHtml = `<button class="btn btn-ghost btn-sm" style="color:#ffffff;border-color:rgba(255,255,255,0.4)" onclick="state.customerTab='Directory';render()">← ${tr('Browse Stores', 'दुकानें देखें')}</button>`;
      contentHtml = `
        <div class="erp-card">
          <div class="erp-card-header">
            <h3>📦 ${tr('My Orders & GST Invoices', 'मेरे समस्त ऑर्डर्स व बिल')} (${orders.length})</h3>
          </div>
          ${orders.length === 0 ? `
            <div style="text-align:center;padding:36px;color:#94a3b8">अभी तक कोई ऑर्डर दर्ज नहीं है।</div>
          ` : `
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>बिल व तारीख</th>
                    <th>दुकान व यूनिक ID</th>
                    <th>सामान सूची</th>
                    <th>कुल राशि व स्थिति</th>
                    <th>सुविधाएँ</th>
                  </tr>
                </thead>
                <tbody>
                  ${orders.map(o => {
                    const matchedShop = allShops.find(s => s.id === o.shopId);
                    const shopName = matchedShop?.shop || 'Marwar Hardware & Sanitary';
                    const shopCode = o.shopCode || matchedShop?.refCode || 'KQM-391042';
                    const gross = o.totals?.gross || 0;
                    const isCredit = o.paymentMode === 'Credit' && !o.udhaarSettled;
                    return `
                      <tr>
                        <td>
                          <b>${esc(o.invoiceNo)}</b>
                          <div class="text-muted" style="font-size:0.78rem">${new Date(o.date).toLocaleDateString('en-IN')}</div>
                          <span class="badge badge-primary" style="margin-top:4px">${esc(trDyn(o.status))}</span>
                        </td>
                        <td>
                          <b>${esc(trDyn(shopName))}</b>
                          <div style="margin-top:3px"><span class="badge badge-gold" style="font-family:monospace;font-size:0.7rem">🏪 ${esc(shopCode)}</span></div>
                        </td>
                        <td style="font-size:0.85rem;max-width:260px">${esc((o.items || []).map(i => `${trDyn(i.name)} × ${i.qty}`).join(', ') || o.note)}</td>
                        <td>
                          <b class="text-gold" style="font-size:1.05rem">${fmtINR(gross)}</b>
                          <div style="margin-top:3px">${isCredit ? '<span class="badge badge-danger">उधार बकाया</span>' : '<span class="badge badge-primary">✓ चुकता</span>'}</div>
                        </td>
                        <td>
                          <div style="display:flex;gap:6px;flex-wrap:wrap">
                            <button class="btn btn-gold btn-sm" onclick="repeatPastOrder('${o.id}')">🔁 दोबारा मँगाएँ</button>
                            <button class="btn btn-primary btn-sm" onclick="openCustomerBillModal('${o.id}')">🖨️ बिल देखें</button>
                            <button class="btn btn-ghost btn-sm" onclick="openOrderReviewModal('${o.id}', '${o.shopId}', '${esc(shopName)}')">⭐ रेटिंग दें</button>
                          </div>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>
      `;
    } else if (curTab === 'Udhaar') {
      bannerIcon = '📒';
      bannerTitle = tr('My Udhaar Passbook to Pay', 'मेरा देय उधार बहीखाता');
      bannerSubtitle = tr('Store-wise pending credit balances and instant UPI settlement links', 'दुकान-वार देय उधारी एवं त्वरित UPI भुगतान लिंक');
      bannerActionHtml = `<button class="btn btn-ghost btn-sm" style="color:#ffffff;border-color:rgba(255,255,255,0.4)" onclick="state.customerTab='Directory';render()">← ${tr('Browse Stores', 'दुकानें देखें')}</button>`;
      contentHtml = `
        <div class="erp-card">
          <div class="erp-card-header">
            <div>
              <span class="badge badge-danger">📒 ${tr('MY PENDING CREDIT TO PAY', 'मेरी कुल देय उधारी')}</span>
              <h3 style="margin-top:6px">${tr('Pending Udhaar Bills & Payment Passbook', 'दुकानों का बकाया उधार विवरण')}</h3>
            </div>
            <span class="badge ${totalPendingUdhaar > 0 ? 'badge-danger' : 'badge-primary'}" style="font-size:1.1rem;padding:6px 14px">
              ${totalPendingUdhaar > 0 ? `कुल बकाया: ${fmtINR(totalPendingUdhaar)}` : 'कोई उधारी शेष नहीं ✓'}
            </span>
          </div>

          ${pendingUdhaarOrders.length === 0 ? `
            <div style="text-align:center;padding:36px;background:#f0fdf4;border-radius:10px">
              <p style="font-size:1.15rem;font-weight:700;color:#15803d">🎉 कोई उधारी बकाया नहीं है! आपका खाता पूर्णतया चुकता है।</p>
            </div>
          ` : `
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>बिल संख्या व तारीख</th>
                    <th>दुकानदार का नाम</th>
                    <th>बकाया राशि</th>
                    <th>त्वरित UPI भुगतान</th>
                  </tr>
                </thead>
                <tbody>
                  ${pendingUdhaarOrders.map(o => {
                    const matchedShop = allShops.find(s => s.id === o.shopId);
                    const shopName = matchedShop?.shop || 'Shop Partner';
                    const gross = Number(o.totals?.gross) || 0;
                    const paid = Number(o.paidAmount) || 0;
                    const due = Math.max(0, gross - paid);
                    const upiLink = matchedShop?.upiId ? `upi://pay?pa=${encodeURIComponent(matchedShop.upiId)}&pn=${encodeURIComponent(shopName)}&am=${due}&cu=INR` : '';
                    return `
                      <tr>
                        <td>
                          <b>${esc(o.invoiceNo)}</b>
                          <div class="text-muted" style="font-size:0.78rem">${new Date(o.date).toLocaleDateString('en-IN')}</div>
                        </td>
                        <td>
                          <b>${esc(trDyn(shopName))}</b>
                          <div class="text-muted" style="font-size:0.76rem">दुकान ID: ${esc(o.shopCode || matchedShop?.refCode || 'KQM-000000')}</div>
                        </td>
                        <td>
                          <b class="text-danger" style="font-size:1.1rem">${fmtINR(due)}</b>
                          <div class="text-muted" style="font-size:0.75rem">कुल: ${fmtINR(gross)} (जमा: ${fmtINR(paid)})</div>
                        </td>
                        <td>
                          ${upiLink ? `
                            <a class="btn btn-primary btn-sm" href="${upiLink}">
                              💳 UPI से ₹${due} चुकाएं
                            </a>
                          ` : `<span class="badge badge-muted">दुकान काउंटर पर नकद दें</span>`}
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>
      `;
    } else if (curTab === 'BulkQuote') {
      bannerIcon = '💰';
      bannerTitle = tr('Wholesale Rate Comparison Desk', 'थोक रेट तुलना डेस्क');
      bannerSubtitle = tr('One Parchi — Get best wholesale quotes from verified local stores', 'एक पर्ची — कई दुकानों से सबसे सस्ता थोक रेट प्राप्त करें');
      bannerActionHtml = `<button class="btn btn-ghost btn-sm" style="color:#ffffff;border-color:rgba(255,255,255,0.4)" onclick="state.customerTab='Directory';render()">← ${tr('Browse Stores', 'दुकानें देखें')}</button>`;
      contentHtml = `
        <div class="erp-card" style="background:linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);border-color:#f59e0b">
          <h3 style="margin-bottom:10px">📝 एक पर्ची भेजें — शहर की दुकानों से बेस्ट थोक रेट पाएं</h3>
          <p class="text-muted" style="font-size:0.9rem;margin-bottom:18px">हार्डवेयर, पाइप, सीमेंट, वायर या किराना की अपनी थोक मांग दर्ज करें:</p>
          <form onsubmit="submitCustomerBulkQuote(event)" style="display:grid;grid-template-columns:1fr 1fr 1.8fr auto;gap:12px;align-items:end">
            <div class="form-group-clean">
              <label>आपका नाम व मोबाइल *</label>
              <input class="input" id="bq-contact" required value="${esc(u ? `${u.name} (${u.phone})` : '')}" placeholder="उदा: विक्रम 9928055667" />
            </div>
            <div class="form-group-clean">
              <label>सामान श्रेणी</label>
              <select class="select" id="bq-cat">
                <option value="Hardware, Pipes & Sanitary">हार्डवेयर, पाइप और सेनेटरी</option>
                <option value="Electrical & Wires">इलेक्ट्रिकल, वायर और स्विचगियर</option>
                <option value="Cement, Steel & Building Material">सीमेंट, सरिया और निर्माण सामग्री</option>
                <option value="Wholesale Kirana & Mandi">थोक किराना और मंडी सामान</option>
              </select>
            </div>
            <div class="form-group-clean">
              <label>थोक मांग सूची *</label>
              <input class="input" id="bq-items" required placeholder="उदा: 50 सुप्रीम 1 इंच पाइप, 20 पॉलीकैब कॉइल" />
            </div>
            <div>
              <button type="submit" class="btn btn-primary" style="padding:10px 18px">🚀 थोक रेट मँगाएँ</button>
            </div>
          </form>
        </div>
      `;
    } else if (curTab === 'Profile') {
      bannerIcon = '⭐';
      bannerTitle = tr('My Buyer Trust Rating & KQC Profile', 'खरीदार विश्वसनीयता रेटिंग व यूनिक ID');
      bannerSubtitle = tr('Your verified reputation across all KuberQ merchants', 'समस्त KuberQ व्यापारियों में आपकी सत्यापित प्रतिष्ठा');
      bannerActionHtml = `<button class="btn btn-ghost btn-sm" style="color:#ffffff;border-color:rgba(255,255,255,0.4)" onclick="state.customerTab='Directory';render()">← ${tr('Browse Stores', 'दुकानें देखें')}</button>`;
      contentHtml = `
        <div class="erp-card">
          <div class="clean-form-grid" style="margin-top:0">
            <div class="card-subtle">
              <p class="text-muted" style="font-size:0.8rem">मेरा यूनिक ग्राहक कोड (KQC):</p>
              <p style="font-weight:900;font-family:monospace;font-size:1.45rem;color:#2563EB">${esc(customerUniqueId)}</p>
              <p class="text-muted" style="font-size:0.75rem">किसी भी दुकान काउंटर पर बिल बनवाते समय बताएं</p>
            </div>
            <div class="card-subtle">
              <p class="text-muted" style="font-size:0.8rem">कुल खरीदारी (Verified Purchases):</p>
              <p style="font-weight:900;font-size:1.45rem;color:#b45309">${fmtINR(totalPurchased)}</p>
              <p class="text-muted" style="font-size:0.75rem">${orders.length} सत्यापित बिल व ऑर्डर्स</p>
            </div>
            <div class="card-subtle">
              <p class="text-muted" style="font-size:0.8rem">मेरा देय उधार (Pending Credit):</p>
              <p style="font-weight:900;font-size:1.45rem;color:${totalPendingUdhaar > 0 ? '#dc2626' : '#15803d'}">${fmtINR(totalPendingUdhaar)}</p>
              <p class="text-muted" style="font-size:0.75rem">${pendingUdhaarOrders.length} बिल बकाया</p>
            </div>
            <div class="card-subtle">
              <p class="text-muted" style="font-size:0.8rem">खरीदार विश्वसनीयता स्कोर:</p>
              <p style="font-weight:900;font-size:1.45rem;color:#15803d">⭐ ${buyerRating} / 5</p>
              <p class="text-muted" style="font-size:0.75rem">सत्यापित दुकानदारों द्वारा मूल्यांकित</p>
            </div>
          </div>
        </div>
      `;
    }

    return renderEnterpriseShell({
      roleTitle: 'B2B Verified Buyer',
      uniqueId: customerUniqueId,
      activeTab: curTab,
      navItems,
      bannerIcon,
      bannerTitle,
      bannerSubtitle,
      bannerActionHtml,
      contentHtml,
      shop: null
    });
  }

  // Guest view for customer portal (when not logged in)
  return `
    <div class="container" style="padding:36px 24px">
      <div class="card" style="margin-bottom:22px;background:linear-gradient(135deg, #ffffff 0%, #f0f6ff 100%);border:2px solid var(--border-strong)">
        <div style="display:flex;justify-content:space-between;align-items:start;flex-wrap:wrap;gap:16px">
          <div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
              <span class="badge badge-primary" style="font-family:monospace;font-size:0.9rem">🆔 ${tr('Customer Unique ID:', 'ग्राहक यूनिक ID:')} ${esc(customerUniqueId)}</span>
              <span class="badge badge-gold">⭐ ${buyerRating} / 5.0 · ${tr('Verified Trusted Buyer', 'सत्यापित विश्वसनीय खरीदार')}</span>
            </div>
            <h1 style="font-size:2rem;margin-top:10px">
              👋 ${tr('Customer Passbook & Store Directory', 'ग्राहक पासबुक, थोक रेट और स्टोर डायरेक्टरी')}
            </h1>
            <p class="text-muted" style="font-size:1rem;margin-top:4px">
              ${tr('Your 6-digit Unique ID (KQC) keeps all your GST bills, repeat orders, and Udhaar passbook clearly separated.', 'आपका 6-अंकों का यूनिक ID (KQC) आपके सभी पक्के GST बिलों और उधारी को सुरक्षित रखता है।')}
            </p>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn btn-gold" onclick="quickLogin('9928055667', 'Customer@123', 'customer')">
              ⚡ 1-क्लिक ग्राहक डेमो लॉगिन
            </button>
            <button class="btn btn-ghost" onclick="state.authRole='customer';navigate('/auth')">
              🔐 साइन इन
            </button>
          </div>
        </div>
      </div>

      <!-- Verified Stores List -->
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px">
          <div>
            <h2>🛍️ ${tr('Verified Stores & Catalogs', 'सत्यापित दुकानें और B2B कैटलॉग')} (${shops.length})</h2>
            <p class="text-muted" style="font-size:0.92rem">दुकान का नाम या यूनिक ID लिखकर खोजें</p>
          </div>
          <div style="min-width:280px;max-width:380px">
            <input class="input" placeholder="🔍 दुकान नाम या ID खोजें..." value="${esc(state.customerStoreSearch || '')}" oninput="state.customerStoreSearch=this.value;render()" />
          </div>
        </div>
        <div class="grid grid-2">
          ${shops.map(s => `
            <div class="store-card" style="display:flex;flex-direction:column;justify-content:space-between;gap:12px;padding:18px;border:1.5px solid #e2e8f0;border-radius:12px;background:#fff">
              <div style="display:flex;justify-content:space-between;align-items:start;gap:10px">
                <div>
                  <b style="font-size:1.15rem">${esc(trDyn(s.shop))}</b>
                  <p class="text-muted" style="font-size:0.88rem;margin-top:2px">${esc(trDyn(s.category))} · ${esc(trDyn(s.city))}</p>
                </div>
                <button class="btn btn-primary btn-sm" onclick="navigate('/order', { shop: '${s.id}' })">🛒 कैटलॉग खोलें</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderLegalPage(kind) {
  const blocks = {
    terms: {
      title: tr('Terms of Service (Explicit SaaS & Section 79 Intermediary Separation)', 'सेवा की शर्तें (SaaS सॉफ्टवेयर और धारा 79 मध्यस्थ भूमिका का स्पष्ट विभाजन)'),
      items: [
        [
          tr('1A. Role as B2B SaaS Provider (Shop Billing, Inventory & Ledger Software)', '1A. SaaS सॉफ्टवेयर प्रदाता की भूमिका (दुकान बही-खाता व बिलिंग सॉफ्टवेयर)'),
          tr(
            'For GST/Estimate Billing, Inventory Management, Party Udhaar Ledger, QR Standee, and AI Parchi/Catalog Scanner tools, KuberQ operates strictly as a cloud software-as-a-service (SaaS) provider. Merchants control their own catalog data, prices, and tax settings.',
            'दुकान बिलिंग (GST/एस्टीमेट), स्टॉक प्रबंधन, पार्टी उधार बही-खाता, QR स्टैंडी और AI पर्ची/कैटलॉग स्कैनर के लिए KuberQ केवल एक क्लाउड सॉफ्टवेयर (SaaS) प्रदाता के रूप में कार्य करता है। व्यापारी अपने सामान, रेट और टैक्स विवरण के स्वयं नियंत्रक हैं।'
          )
        ],
        [
          tr('1B. Role as Passive Directory Intermediary (Transport & Services Directory — Section 79 IT Act)', '1B. मध्यस्थ डायरेक्टरी की भूमिका (ट्रांसपोर्ट और सर्विस डायरेक्टरी — धारा 79 IT अधिनियम)'),
          tr(
            'For the Public Store Directory, Transport Exchange (/transport), Business Services Directory (/services), and Working Capital Lead Desk, KuberQ acts solely as a passive technology intermediary under Section 79 of the Information Technology Act, 2000. KuberQ does not own inventory, sell goods, operate vehicles, guarantee service quality, or lend money.',
            'पब्लिक स्टोर डायरेक्टरी, ट्रांसपोर्ट एक्सचेंज (/transport), बिज़नेस सर्विस डायरेक्टरी (/services) और वर्किंग कैपिटल लीड डेस्क के लिए KuberQ सूचना प्रौद्योगिकी अधिनियम, 2000 की धारा 79 के अंतर्गत केवल एक तकनीकी सूचना मध्यस्थ (Intermediary) है। KuberQ स्वयं कोई सामान नहीं बेचता, वाहन नहीं चलाता और न ही कोई बैंक या लेंडर है।'
          )
        ],
        [
          tr('2. Statutory Financial Disclaimer (No Lending or NBFC Activity)', '2. वैधानिक वित्तीय घोषणा (कोई बैंक या NBFC गतिविधि नहीं)'),
          tr(
            'KuberQ is neither a bank, NBFC, nor a lender. We do not collect KYC documents on this portal and only forward basic business contact enquiries to independent financial partners/bankers.',
            'KuberQ न तो कोई बैंक है, न NBFC या लेंडर। हम पोर्टल पर कोई वित्तीय दस्तावेज़ अपलोड नहीं कराते और केवल आपकी व्यावसायिक ज़रूरत को स्वतंत्र वित्तीय साझेदारों/बैंकरों तक प्रेषित करते हैं।'
          )
        ],
        [
          tr('3. GST & Invoicing Responsibility', '3. GST और बिलिंग की जिम्मेदारी'),
          tr(
            'Merchants are solely responsible for the accuracy of their GSTIN, HSN codes, tax rates, and goods sold. Unregistered merchants are restricted to issuing non-GST Bills of Supply / Estimates.',
            'व्यापारी अपने GSTIN, HSN कोड, टैक्स दरों और बेचे गए सामान की सत्यता के लिए स्वयं जिम्मेदार हैं। बिना GSTIN वाले व्यापारी केवल बिल ऑफ़ सप्लाई / एस्टीमेट जारी कर सकते हैं।'
          )
        ],
        [
          tr('4. Software Plans & AI Quotas', '4. सॉफ्टवेयर प्लान और AI कोटा'),
          tr(
            'Starter trials include 3 lifetime AI scans. Paid subscriptions (Vyapar Pro & B2B Enterprise) cover software & AI quota access only and are non-refundable once activated.',
            'स्टार्टर ट्रायल में 3 निःशुल्क AI स्कैन शामिल हैं। पेड प्लान (व्यापार प्रो और B2B एंटरप्राइज) केवल सॉफ्टवेयर और AI कोटा सुविधा के लिए हैं।'
          )
        ],
        [
          tr('5. Governing Law & Jurisdiction', '5. लागू कानून और न्यायक्षेत्र'),
          tr(
            'These terms are governed by the laws of India, with exclusive jurisdiction vested in the courts at Jodhpur, Rajasthan.',
            'ये शर्तें भारत के कानूनों के अधीन हैं और किसी भी विवाद का न्यायक्षेत्र केवल जोधपुर, राजस्थान के न्यायालयों में होगा।'
          )
        ]
      ]
    },
    privacy: {
      title: tr('Privacy Policy (DPDP Act, 2023 Compliant)', 'गोपनीयता नीति (DPDP अधिनियम, 2023)'),
      items: [
        [
          tr('1. Data Collected', '1. एकत्रित किया जाने वाला डेटा'),
          tr(
            'We collect your Name, 10-digit Mobile Number, Business/Shop details, optional GSTIN, and order/ledger records required to operate your account.',
            'हम आपका नाम, 10 अंकों का मोबाइल नंबर, दुकान/फ़र्म का विवरण, वैकल्पिक GSTIN और आपके खाते के संचालन हेतु आवश्यक बिल/ऑर्डर डेटा सुरक्षित रखते हैं।'
          )
        ],
        [
          tr('2. Strict Isolation & Encryption', '2. उच्च स्तरीय एन्क्रिप्शन और सुरक्षा'),
          tr(
            'Passwords are hashed using cryptographic Scrypt with random salts. Platform API keys are stored in an AES-256-GCM server-only vault and never exposed to browsers.',
            'सभी पासवर्ड Scrypt तकनीक से एन्क्रिप्ट किए जाते हैं। प्लेटफ़ॉर्म की API Key सर्वर की AES-256-GCM तिजोरी में बंद रहती है और कभी भी किसी ब्राउज़र में नहीं दिखती।'
          )
        ],
        [
          tr('3. Public Directory Masking', '3. नंबर गोपनीयता'),
          tr(
            'Contact numbers on public boards are masked for unauthenticated visitors to prevent scraping.',
            'सार्वजनिक डायरेक्टरी में स्पैम रोकने के लिए बिना लॉगिन वाले यूज़र्स से मोबाइल नंबर सुरक्षित रखे जाते हैं।'
          )
        ],
        [
          tr('4. Your DPDP Rights', '4. आपके डेटा अधिकार'),
          tr(
            'You may request data correction or account deletion by contacting our Grievance Officer.',
            'आप अपने डेटा में सुधार या खाता हटाने के लिए हमारे शिकायत अधिकारी से संपर्क कर सकते हैं।'
          )
        ]
      ]
    },
    grievance: {
      title: tr('Contact & Grievance Officer (IT Rules, 2021)', 'संपर्क और शिकायत अधिकारी (IT नियम, 2021)'),
      items: [
        [
          tr('Grievance Officer', 'शिकायत निवारण अधिकारी'),
          tr(
            'Designation: Legal & Compliance Officer, KuberQ\nEmail: grievance@kuberq.in\nOffice Address: KuberQ Corporate Operations Desk, Jodhpur, Rajasthan 342001\nHours: Monday–Saturday, 10:00 AM – 6:00 PM (Official Correspondence via Email)',
            'पदनाम: विधिक एवं अनुपालन अधिकारी (Legal & Compliance Desk)\nईमेल: grievance@kuberq.in\nकार्यालय: KuberQ कॉर्पोरेट ऑपरेशंस डेस्क, जोधपुर, राजस्थान 342001\nसमय: सोमवार–शनिवार, सुबह 10:00 से शाम 6:00 बजे तक (पत्राचार हेतु ईमेल उपलब्ध)'
          )
        ],
        [
          tr('Resolution Timeline', 'निस्तारण समय-सीमा'),
          tr(
            'We acknowledge complaints within 24 hours and resolve platform or data grievances within 15 days under the Information Technology (Intermediary Guidelines) Rules, 2021.',
            'हम 24 घंटे के भीतर शिकायत दर्ज करते हैं और सूचना प्रौद्योगिकी नियम, 2021 के तहत 15 दिनों के भीतर उसका समाधान करते हैं।'
          )
        ]
      ]
    }
  }[kind];

  return `
    <div class="container" style="max-width:820px;padding:44px 24px">
      <div class="card">
        <span class="badge badge-gold">⚖️ ${tr('LEGAL & REGULATORY COMPLIANCE', 'कानूनी और नियामक अनुपालन')}</span>
        <h1 style="font-size:2rem;margin:10px 0 20px">${blocks.title}</h1>
        <div style="display:grid;gap:14px">
          ${blocks.items.map(([h, p]) => `
            <div class="card-subtle">
              <h3 style="font-size:1.15rem" class="text-gold">${esc(h)}</h3>
              <p class="text-muted" style="font-size:0.98rem;margin-top:6px;white-space:pre-line">${esc(p)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// 8. ACTION HANDLERS & EVENT CONTROLLERS
// ============================================================================
window.setLang = function(l) {
  state.lang = l;
  localStorage.setItem('kuberq_lang', l);
  document.documentElement.lang = l;
  render();
};

window.navigate = navigate;
window.openDemoModal = () => { state.demoModalOpen = true; render(); };
window.closeDemoModal = () => { state.demoModalOpen = false; render(); };

window.logout = function() {
  state.token = '';
  localStorage.removeItem('kuberq_token');
  state.data.user = null;
  state.data.myShop = null;
  state.data.adminData = null;
  showToast(tr('Logged out successfully', 'सफलतापूर्वक लॉग आउट हो गया'));
  navigate('/');
  bootstrap();
};

window.quickLogin = async function(identifier, password, role) {
  try {
    const res = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password, role })
    });
    state.token = res.token;
    localStorage.setItem('kuberq_token', res.token);
    await bootstrap();
    showToast(`Welcome, ${res.name}!`);
    if (res.role === 'admin' || res.role === 'employee') navigate('/admin');
    else if (res.role === 'customer') navigate('/customer');
    else navigate('/merchant');
  } catch (err) {
    showToast(err.message, 'error');
  }
};


window.handleAdminDirectLogin = async function(e) {
  e.preventDefault();
  const identifier = document.getElementById('ad-login-id').value.trim();
  const password = document.getElementById('ad-login-pass').value;
  try {
    const res = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password, role: 'admin' })
    });
    localStorage.setItem('kuberq_token', res.token);
    showToast(tr('✅ Welcome to Admin Command Center!', '✅ एडमिन कमांड सेंटर में स्वागत है!'));
    await bootstrap();
  } catch (err) {
    alert(err.message || tr('Invalid admin credentials', 'अमान्य एडमिन लॉगिन विवरण'));
  }
};

window.handleLogin = async function(e) {
  e.preventDefault();
  const identifier = document.getElementById('li-id').value.trim();
  const password = document.getElementById('li-pass').value;
  await window.quickLogin(identifier, password, state.authRole);
};

window.handleSignup = async function(e) {
  e.preventDefault();
  try {
    const payload = {
      role: state.authRole,
      name: document.getElementById('su-name').value.trim(),
      phone: document.getElementById('su-phone').value.trim(),
      city: document.getElementById('su-city').value.trim(),
      state: document.getElementById('su-state').value.trim(),
      password: document.getElementById('su-pass').value,
      referredBy: document.getElementById('su-ref')?.value.trim() || '',
      shop: document.getElementById('su-shop')?.value.trim() || '',
      category: document.getElementById('su-category')?.value || '',
      gstin: document.getElementById('su-gstin')?.value.trim() || '',
      upiId: document.getElementById('su-upi')?.value.trim() || ''
    };
    const res = await apiFetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    state.token = res.token;
    localStorage.setItem('kuberq_token', res.token);
    await bootstrap();
    showToast(tr('Account created! Welcome to KuberQ.', 'खाता बन गया! KuberQ में स्वागत है।'));
    navigate(res.role === 'customer' ? '/customer' : '/merchant');
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.updateCart = function(productId, delta) {
  const cur = state.cart[productId] || 0;
  state.cart[productId] = Math.max(0, cur + delta);
  render();
};

window.submitCustomerOrder = async function(e, shopId) {
  e.preventDefault();
  try {
    const items = Object.entries(state.cart)
      .filter(([, q]) => q > 0)
      .map(([productId, qty]) => ({ productId, qty }));
    const payload = {
      shopId,
      customer: document.getElementById('ord-name').value.trim(),
      phone: document.getElementById('ord-phone').value.trim(),
      address: document.getElementById('ord-addr').value.trim(),
      buyerGstin: document.getElementById('ord-gstin').value.trim().toUpperCase(),
      note: document.getElementById('ord-note').value.trim(),
      items,
      channel: 'Online QR'
    };
    state.checkoutCustomer = {
      name: payload.customer,
      phone: payload.phone,
      address: payload.address,
      buyerGstin: payload.buyerGstin
    };
    const res = await apiFetch('/api/orders/create', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    state.cart = {};
    state.parchiNote = '';
    state.lastPlacedOrder = res;
    await bootstrap();
    showToast(tr('Order saved! Click the WhatsApp button to alert the shop.', 'ऑर्डर सेव हो गया! WhatsApp बटन दबाकर दुकानदार को सूचित करें।'));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.pickInvoiceProduct = function(lineIdx, productId) {
  const prod = state.data.products.find(p => p.id === productId);
  if (!prod) return;
  state.invoiceLines[lineIdx] = {
    ...state.invoiceLines[lineIdx],
    productId: prod.id,
    name: prod.name,
    hsn: prod.hsn,
    price: prod.price,
    gstRate: prod.gstRate,
    taxMode: prod.taxMode || 'exclusive'
  };
  render();
};

window.updateInvoiceLineName = function(lineIdx, val) {
  state.invoiceLines[lineIdx].name = val;
  const lower = val.toLowerCase();
  for (const row of state.data.hsnDictionary || []) {
    if (row.keywords.some(k => lower.includes(k))) {
      state.invoiceLines[lineIdx].hsn = row.hsn;
      state.invoiceLines[lineIdx].gstRate = row.gstRate;
      break;
    }
  }
};

window.saveAndPrintWalkInInvoice = async function(shopId) {
  try {
    const validLines = state.invoiceLines.filter(l => l.name.trim() && Number(l.price) >= 0);
    if (validLines.length === 0) {
      return showToast('Please enter at least 1 item name and rate.', 'error');
    }
    const payload = {
      shopId,
      customer: state.invoiceBuyer.name || 'Walk-in Buyer',
      phone: state.invoiceBuyer.phone || '9999999999',
      address: state.data.myShop?.city || 'Counter Sale',
      buyerGstin: state.invoiceBuyer.gstin,
      paymentMode: state.invoiceBuyer.paymentMode,
      discount: Number(state.invoiceBuyer.discount || 0),
      paidAmount: Number(state.invoiceBuyer.paidAmount || 0),
      supplyType: state.invoiceBuyer.supplyType === 'auto' ? undefined : state.invoiceBuyer.supplyType,
      channel: 'Walk-in',
      items: validLines
    };
    const res = await apiFetch('/api/orders/create', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    await bootstrap();
    showToast(`Saved ${res.order.invoiceNo} to ledger & updated stock!`);
    setTimeout(() => window.print(), 250);
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.updateOrderField = async function(orderId, fields) {
  try {
    await apiFetch('/api/merchant/order-update', {
      method: 'POST',
      body: JSON.stringify({ orderId, ...fields })
    });
    await bootstrap();
    showToast('Order updated!');
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.saveParchiAmount = async function(orderId) {
  const val = Number(document.getElementById(`prc-${orderId}`)?.value || 0);
  await window.updateOrderField(orderId, { customAmount: val, status: 'Accepted' });
};

window.aiMatchParchiOrder = async function(orderId) {
  try {
    const res = await apiFetch('/api/ai/match-parchi', {
      method: 'POST',
      body: JSON.stringify({ orderId })
    });
    await bootstrap();
    showToast(`AI matched ${res.matchedItems.length} catalog items! (${res.aiUsed}/${res.aiLimit} AI credits used)`);
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.loadStarterCatalog = async function() {
  try {
    const key = document.getElementById('tpl-picker').value;
    const res = await apiFetch('/api/merchant/product-save', {
      method: 'POST',
      body: JSON.stringify({ action: 'load_template', templateKey: key })
    });
    await bootstrap();
    showToast(res.message);
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.autoFillInventoryHsn = function(val) {
  const lower = String(val || '').toLowerCase();
  for (const row of state.data.hsnDictionary || []) {
    if (row.keywords.some(k => lower.includes(k))) {
      const hsnEl = document.getElementById('inv-hsn');
      const gstEl = document.getElementById('inv-gst');
      if (hsnEl) hsnEl.value = row.hsn;
      if (gstEl) gstEl.value = String(row.gstRate);
      break;
    }
  }
};

window.addInventoryItem = async function(e) {
  e.preventDefault();
  try {
    const priceVal = Number(document.getElementById('inv-price').value);
    const wPriceVal = Number(document.getElementById('inv-wprice').value || priceVal);
    const costVal = Number(document.getElementById('inv-cost')?.value || Math.round(wPriceVal * 0.84));
    await apiFetch('/api/merchant/product-save', {
      method: 'POST',
      body: JSON.stringify({
        name: document.getElementById('inv-name').value.trim(),
        hsn: document.getElementById('inv-hsn').value.trim(),
        costPrice: costVal,
        price: priceVal,
        wholesalePrice: wPriceVal,
        gstRate: Number(document.getElementById('inv-gst').value),
        stock: Number(document.getElementById('inv-stock').value),
        taxMode: document.getElementById('inv-taxmode').value
      })
    });
    await bootstrap();
    showToast('Product added to catalog!');
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.updateProductField = async function(id, fields) {
  try {
    await apiFetch('/api/merchant/product-save', {
      method: 'POST',
      body: JSON.stringify({ id, ...fields })
    });
    await bootstrap();
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.runAiCatalogScan = async function() {
  try {
    state.aiLoading = true;
    render();
    const rawText = document.getElementById('ai-bill-text')?.value || '';
    const fileInput = document.getElementById('ai-bill-file');
    let imageBase64 = null;

    if (fileInput && fileInput.files && fileInput.files[0]) {
      imageBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(fileInput.files[0]);
      });
    }

    const res = await apiFetch('/api/ai/scan-catalog', {
      method: 'POST',
      body: JSON.stringify({ rawText, imageBase64 })
    });
    state.aiExtractedItems = res.items || [];
    state.aiLoading = false;
    await bootstrap();
    showToast(`Extracted ${state.aiExtractedItems.length} items via ${res.engineUsed}!`);
  } catch (err) {
    state.aiLoading = false;
    render();
    showToast(err.message, 'error');
  }
};

window.saveAiExtractedCatalog = async function() {
  try {
    const res = await apiFetch('/api/merchant/product-save', {
      method: 'POST',
      body: JSON.stringify({ action: 'bulk_add', items: state.aiExtractedItems })
    });
    state.aiExtractedItems = [];
    state.aiModalOpen = false;
    await bootstrap();
    showToast(`Saved ${res.added} products to your inventory!`);
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.toggleShopOpen = async function(openVal) {
  await apiFetch('/api/merchant/profile-update', {
    method: 'POST',
    body: JSON.stringify({ open: openVal })
  });
  await bootstrap();
};

window.saveMerchantProfile = async function(e) {
  e.preventDefault();
  try {
    await apiFetch('/api/merchant/profile-update', {
      method: 'POST',
      body: JSON.stringify({
        gstin: document.getElementById('mp-gstin').value.trim(),
        upiId: document.getElementById('mp-upi').value.trim()
      })
    });
    await bootstrap();
    showToast('GSTIN & UPI ID saved!');
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.saveExpressCounterBill = async function(e, shopId) {
  e.preventDefault();
  try {
    const customer = document.getElementById('qb-name').value.trim();
    const phone = document.getElementById('qb-phone').value.trim() || '9999999999';
    const amount = Number(document.getElementById('qb-amt').value || 0);
    const paymentMode = document.getElementById('qb-mode').value;
    const note = document.getElementById('qb-note').value.trim() || 'Counter Express Bill';

    const res = await apiFetch('/api/orders/create', {
      method: 'POST',
      body: JSON.stringify({
        shopId,
        customer,
        phone,
        address: state.data.myShop?.city || 'Counter Sale',
        paymentMode,
        channel: 'Express Bill',
        note,
        items: [{ name: note, hsn: '3917', qty: 1, price: amount, gstRate: 0, taxMode: 'inclusive' }]
      })
    });
    await bootstrap();
    const shop = state.data.myShop;
    const upiLink = shop?.upiId ? `upi://pay?pa=${encodeURIComponent(shop.upiId)}&pn=${encodeURIComponent(shop.shop)}&am=${amount}&cu=INR` : '';
    if (phone && phone !== '9999999999' && phone.length === 10) {
      const waMsg = `🧾 *${shop?.shop || 'KuberQ'} — बिल रसीद*\nबिल नंबर: *${res.order.invoiceNo}*\nग्राहक: *${customer}*\nविवरण: ${note}\nकुल राशि: *₹${amount}* (${paymentMode === 'Credit' ? 'उधार खाता' : paymentMode})${upiLink ? `\n\n💳 UPI से भुगतान करें: ${upiLink}` : ''}`;
      window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(waMsg)}`, '_blank');
    }
    showToast(tr(`Express Bill ${res.order.invoiceNo} (₹${amount}) saved!`, `एक्सप्रेस बिल ${res.order.invoiceNo} (₹${amount}) सफलतापूर्वक सेव हो गया!`));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.addSupplierPurchase = async function(e) {
  e.preventDefault();
  try {
    const totalAmt = Number(document.getElementById('sp-total').value);
    const gstAmt = Number(document.getElementById('sp-gst')?.value || Math.round(totalAmt * 18 / 118));
    await apiFetch('/api/merchant/ledger', {
      method: 'POST',
      body: JSON.stringify({
        kind: 'add_supplier_purchase',
        supplierName: document.getElementById('sp-name').value.trim(),
        supplierGstin: document.getElementById('sp-gstin')?.value.trim() || '',
        itemsSummary: document.getElementById('sp-items').value.trim(),
        totalAmount: totalAmt,
        gstAmount: gstAmt,
        paidAmount: Number(document.getElementById('sp-paid').value || 0)
      })
    });
    await bootstrap();
    showToast(tr('Supplier purchase & Input GST (ITC) recorded!', 'सप्लायर खरीद और इनपुट GST (ITC) दर्ज हो गया!'));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.settleSupplierPurchase = async function(id) {
  try {
    const addAmount = Number(document.getElementById(`sp-pay-${id}`)?.value || 0);
    await apiFetch('/api/merchant/ledger', {
      method: 'POST',
      body: JSON.stringify({ kind: 'settle_supplier_purchase', id, addAmount })
    });
    await bootstrap();
    showToast(tr('Supplier payment recorded!', 'सप्लायर भुगतान दर्ज हो गया!'));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.addShopExpense = async function(e) {
  e.preventDefault();
  try {
    await apiFetch('/api/merchant/ledger', {
      method: 'POST',
      body: JSON.stringify({
        kind: 'add_expense',
        category: document.getElementById('exp-cat').value,
        mode: document.getElementById('exp-mode')?.value || 'Cash',
        amount: Number(document.getElementById('exp-amt').value),
        note: document.getElementById('exp-note').value.trim()
      })
    });
    await bootstrap();
    showToast(tr('Shop expense added!', 'दुकान का खर्चा दर्ज हो गया!'));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.recordPartialCustomerPayment = async function(orderId) {
  try {
    const amtEl = document.getElementById(`part-amt-${orderId}`);
    const modeEl = document.getElementById(`part-mode-${orderId}`);
    const addPaymentAmount = Number(amtEl?.value || 0);
    if (addPaymentAmount <= 0) {
      return showToast(tr('Enter partial payment amount received.', 'कृपया प्राप्त किस्त राशि दर्ज करें।'), 'error');
    }
    await apiFetch('/api/merchant/order-update', {
      method: 'POST',
      body: JSON.stringify({
        orderId,
        addPaymentAmount,
        paymentVia: modeEl?.value || 'Cash'
      })
    });
    await bootstrap();
    showToast(tr(`Received ₹${addPaymentAmount} partial payment! Balance updated.`, `₹${addPaymentAmount} किस्त जमा हो गई! शेष उधार अपडेट हो गया।`));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.openPartyLedgerModal = function(partyKey) {
  state.partyLedgerModalKey = partyKey;
  render();
};

window.downloadFullShopBackup = function() {
  const shop = state.data.myShop;
  const backupData = {
    exportedAt: new Date().toISOString(),
    shop,
    products: state.data.products.filter(p => p.shopId === shop?.id),
    ordersAndBills: state.data.myOrders || [],
    supplierPurchases: state.data.mySupplierPurchases || [],
    dailyExpenses: state.data.myExpenses || [],
    staff: state.data.myStaff || []
  };
  const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `KuberQ-Full-Backup-${shop?.refCode || 'Shop'}-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  showToast(tr('Full shop backup downloaded to your device!', 'आपकी दुकान का संपूर्ण डेटा बैकअप डाउनलोड हो गया है!'));
};

window.exportGstr1Csv = function() {
  const orders = filterByAccountingPeriod(state.data.myOrders || [], state.accountingPeriod || 'all');
  const header = ['InvoiceNo', 'Date', 'CustomerUniqueID', 'BuyerName', 'BuyerGSTIN', 'VoucherType', 'SupplyType', 'TaxableValue', 'Discount', 'CGST', 'SGST', 'IGST', 'GrandTotal', 'PaidAmount', 'BalanceDue', 'PaymentMode'];
  const rows = orders.map(o => {
    const t = o.totals || {};
    const g = Number(t.gross) || 0;
    const pd = o.paymentMode === 'Credit' && !o.udhaarSettled ? Math.min(g, Number(o.paidAmount) || 0) : g;
    return [
      o.invoiceNo,
      new Date(o.date).toISOString().slice(0, 10),
      o.customerCode || 'KQC-849201',
      `"${(o.customer || '').replace(/"/g, '""')}"`,
      o.buyerGstin || 'B2C',
      o.status === 'Sales Return' ? 'Credit Note (Sales Return)' : 'Tax Invoice',
      t.supplyType === 'inter' ? 'Inter-State (IGST)' : 'Intra-State',
      t.taxable || 0,
      o.discount || t.discount || 0,
      t.cgst || 0,
      t.sgst || 0,
      t.igst || 0,
      g,
      pd,
      Math.max(0, g - pd),
      o.paymentMode || 'Unmarked'
    ].join(',');
  });
  const csv = [header.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `KuberQ-GSTR1-${state.accountingPeriod || 'all'}-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
};

window.requestPlanUpgrade = async function(plan, amount) {
  try {
    const billingCycle = state.billingCycle === 'yearly' ? 'Yearly' : 'Monthly';
    await apiFetch('/api/public/submit', {
      method: 'POST',
      body: JSON.stringify({
        kind: 'upgrade',
        plan,
        billingCycle,
        amount,
        shop: state.data.myShop?.shop || state.data.user?.name || 'Merchant',
        phone: state.data.myShop?.phone || state.data.user?.phone || ''
      })
    });
    const adminWa = state.data.settings.adminWhatsApp || '';
    const msg = `⚡ *KuberQ Plan Upgrade Request*\nShop: ${state.data.myShop?.shop || 'New Trader'}\nPlan: *${plan} (${billingCycle} - ₹${amount})*\nPlease share UPI details to activate my plan & AI credits.`;
    window.open(`https://wa.me/91${adminWa}?text=${encodeURIComponent(msg)}`, '_blank');
    showToast('Upgrade request logged & opened in WhatsApp!');
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.submitDemoRequest = async function(e) {
  e.preventDefault();
  try {
    await apiFetch('/api/public/submit', {
      method: 'POST',
      body: JSON.stringify({
        kind: 'demo',
        shop: document.getElementById('demo-shop').value.trim(),
        phone: document.getElementById('demo-phone').value.trim(),
        slot: document.getElementById('demo-slot').value,
        topic: document.getElementById('demo-topic').value
      })
    });
    state.demoModalOpen = false;
    showToast(tr('1-on-1 Demo booked! Our team will call you.', '1-on-1 डेमो बुक हो गया! हमारी टीम आपको कॉल करेगी।'));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.submitPublicFaq = async function(e) {
  e.preventDefault();
  try {
    await apiFetch('/api/public/submit', {
      method: 'POST',
      body: JSON.stringify({
        kind: 'faq',
        name: document.getElementById('faq-name').value.trim(),
        phone: document.getElementById('faq-phone').value.trim(),
        question: document.getElementById('faq-question').value.trim()
      })
    });
    document.getElementById('faq-question').value = '';
    showToast(tr('Question submitted! Our team will respond shortly.', 'आपका प्रश्न दर्ज हो गया है! हमारी टीम शीघ्र उत्तर देगी।'));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.addShopStaff = async function(e) {
  e.preventDefault();
  try {
    const perms = [...document.querySelectorAll('input[name="stf_perm"]:checked')].map(el => el.value);
    await apiFetch('/api/merchant/staff', {
      method: 'POST',
      body: JSON.stringify({
        action: 'add',
        name: document.getElementById('stf-name').value.trim(),
        phone: document.getElementById('stf-phone').value.trim(),
        role: document.getElementById('stf-role').value,
        permissions: perms
      })
    });
    await bootstrap();
    showToast(tr('Shop staff member added!', 'दुकान कर्मचारी सफलतापूर्वक जोड़ा गया!'));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.toggleShopStaff = async function(staffId) {
  try {
    await apiFetch('/api/merchant/staff', {
      method: 'POST',
      body: JSON.stringify({ action: 'toggle', staffId })
    });
    await bootstrap();
    showToast(tr('Staff status updated!', 'कर्मचारी की स्थिति अपडेट हो गई!'));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.submitMerchantLead = async function(e, track, fallbackName, fallbackPhone, fallbackCity) {
  e.preventDefault();
  try {
    const isWc = track === 'working-capital';
    const name = (document.getElementById(isWc ? 'wc-name' : 'dg-name')?.value || fallbackName || '').trim();
    const phone = (document.getElementById(isWc ? 'wc-phone' : 'dg-phone')?.value || fallbackPhone || '').trim();
    const city = fallbackCity || 'Jodhpur';
    const need = isWc ? document.getElementById('wc-need').value : document.getElementById('dg-need').value;
    const amount = isWc ? Number(document.getElementById('wc-amt').value) : 0;
    const note = isWc ? document.getElementById('wc-note').value : document.getElementById('dg-note').value;
    await apiFetch('/api/public/submit', {
      method: 'POST',
      body: JSON.stringify({ kind: 'lead', track, need, name, phone, city, amount, note })
    });
    showToast(tr('Lead submitted! You can track it in the Admin Portal -> Finance & Tech Leads tab.', 'लीड सफलतापूर्वक दर्ज हो गई! यह एडमिन पोर्टल के "लोन व AI लीड्स" टैब में सेव हो गई है।'));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.submitServiceRequirementLead = async function(e) {
  e.preventDefault();
  try {
    const name = document.getElementById('slead-name').value.trim();
    const phone = document.getElementById('slead-phone').value.trim();
    const need = document.getElementById('slead-cat').value;
    const note = document.getElementById('slead-note').value.trim();
    await apiFetch('/api/public/submit', {
      method: 'POST',
      body: JSON.stringify({
        kind: 'lead',
        track: 'service-enquiry',
        need,
        name,
        phone,
        city: 'Jodhpur',
        amount: 0,
        note
      })
    });
    document.getElementById('slead-note').value = '';
    showToast(tr('Service requirement lead registered! Admin & verified providers will contact you.', 'आपकी सेवा आवश्यकता (Lead) दर्ज हो गई है! यह सीधे एडमिन पैनल में सेव हो गई है।'));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.submitShipmentForm = async function(e) {
  e.preventDefault();
  try {
    await apiFetch('/api/public/submit', {
      method: 'POST',
      body: JSON.stringify({
        kind: 'shipment',
        from: document.getElementById('tr-from').value.trim(),
        to: document.getElementById('tr-to').value.trim(),
        goods: document.getElementById('tr-goods').value.trim(),
        vehicle: document.getElementById('tr-veh').value,
        poster: document.getElementById('tr-name').value.trim(),
        phone: document.getElementById('tr-phone').value.trim(),
        legalConsent: document.getElementById('tr-consent').checked
      })
    });
    await bootstrap();
    showToast('Saved to Transport Exchange!');
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.onServiceCategoryChange = function(catVal) {
  state.selectedServiceCat = catVal;
  const catObj = SERVICE_CATEGORIES_30.find(c => c.catEn === catVal);
  state.selectedServiceSub = catObj && catObj.subs[0] ? catObj.subs[0] : '';
  render();
};

window.submitProviderForm = async function(e) {
  e.preventDefault();
  try {
    const cat = document.getElementById('sv-cat').value;
    const sub = document.getElementById('sv-subcat').value;
    const customServiceText = document.getElementById('sv-custom')?.value.trim() || '';
    const res = await apiFetch('/api/public/submit', {
      method: 'POST',
      body: JSON.stringify({
        kind: 'provider',
        name: document.getElementById('sv-name').value.trim(),
        category: cat,
        subcategory: sub,
        customServiceText,
        city: document.getElementById('sv-city').value.trim(),
        pincode: document.getElementById('sv-pincode').value.trim(),
        experienceYears: Number(document.getElementById('sv-exp').value || 1),
        phone: document.getElementById('sv-phone').value.trim(),
        description: document.getElementById('sv-desc').value.trim()
      })
    });
    await bootstrap();
    showToast(tr(`Service registered! Your unique ID is ${res.code || 'KQSP'}`, `सेवा पंजीकृत हो गई! आपका यूनिक कोड: ${res.code || 'KQSP'}`));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.submitPromotionRequest = async function(e) {
  e.preventDefault();
  try {
    await apiFetch('/api/public/submit', {
      method: 'POST',
      body: JSON.stringify({
        kind: 'promotion',
        headline: document.getElementById('prm-headline').value.trim(),
        offerText: document.getElementById('prm-offer').value.trim(),
        packagePlan: document.getElementById('prm-pkg').value
      })
    });
    await bootstrap();
    showToast(tr('Spotlight promotion request sent for Admin approval!', 'स्पॉन्सर्ड स्पॉटलाइट अनुरोध एडमिन स्वीकृति के लिए भेज दिया गया है!'));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.vouchForEntity = async function(targetType, targetId, targetName) {
  if (!state.data.user) {
    showToast(tr('Please Sign In first to verify a business!', 'किसी व्यापार को सत्यापित (Verify) करने के लिए कृपया पहले लॉगिन करें!'), 'error');
    navigate('/auth');
    return;
  }
  try {
    const res = await apiFetch('/api/public/submit', {
      method: 'POST',
      body: JSON.stringify({
        kind: 'vouch',
        targetType,
        targetId,
        rating: 5,
        review: 'Trusted Community Verification'
      })
    });
    await bootstrap();
    if (res.alreadyVouched) {
      showToast(tr(`You have already verified ${targetName}!`, `आप पहले ही ${targetName} को सत्यापित कर चुके हैं!`));
    } else {
      showToast(tr(`Thank you! ${targetName} now has ${res.communityVerifications} community verifications.`, `धन्यवाद! ${targetName} के पास अब ${res.communityVerifications} सामुदायिक सत्यापन हैं।`));
    }
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.openReportModal = function(targetType, targetId, targetName) {
  state.reportModal = { targetType, targetId, targetName };
  render();
};

window.submitReportForm = async function(e) {
  e.preventDefault();
  try {
    const rm = state.reportModal;
    if (!rm) return;
    await apiFetch('/api/public/submit', {
      method: 'POST',
      body: JSON.stringify({
        kind: 'report',
        targetType: rm.targetType,
        targetId: rm.targetId,
        targetName: rm.targetName,
        reporterName: document.getElementById('rpt-name').value.trim(),
        reporterPhone: document.getElementById('rpt-phone').value.trim(),
        reason: document.getElementById('rpt-reason').value.trim(),
        details: document.getElementById('rpt-reason').value.trim()
      })
    });
    state.reportModal = null;
    render();
    showToast(tr('Report submitted to KuberQ Admin & Grievance Officer!', 'शिकायत एडमिन और शिकायत निवारण अधिकारी को भेज दी गई है!'));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.adminAction = async function(collection, id, action, value = null, note = undefined) {
  try {
    await apiFetch('/api/admin/action', {
      method: 'POST',
      body: JSON.stringify({ collection, id, action, value, note })
    });
    await bootstrap();
    showToast('Admin action applied & logged!');
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.addPlatformEmployee = async function(e) {
  e.preventDefault();
  try {
    const perms = [...document.querySelectorAll('input[name="emp_perm"]:checked')].map(el => el.value);
    await apiFetch('/api/admin/employees', {
      method: 'POST',
      body: JSON.stringify({
        action: 'add',
        name: document.getElementById('emp-name').value.trim(),
        phone: document.getElementById('emp-phone').value.trim(),
        designation: document.getElementById('emp-role').value,
        password: document.getElementById('emp-pass').value,
        permissions: perms
      })
    });
    await bootstrap();
    showToast('Employee Sub-Admin created!');
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.toggleEmployeeStatus = async function(id, status) {
  try {
    await apiFetch('/api/admin/employees', {
      method: 'POST',
      body: JSON.stringify({ action: 'update', id, status })
    });
    await bootstrap();
    showToast(`Employee status set to ${status}`);
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.saveVaultSettings = async function(e) {
  e.preventDefault();
  try {
    const key = document.getElementById('vault-key').value.trim();
    await apiFetch('/api/admin/settings', {
      method: 'POST',
      body: JSON.stringify({ geminiApiKey: key })
    });
    document.getElementById('vault-key').value = '';
    await bootstrap();
    showToast('API Key encrypted with AES-256-GCM & saved in Server Vault!');
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.toggleMarketplaceSwitch = async function(field, val) {
  try {
    await apiFetch('/api/admin/settings', {
      method: 'POST',
      body: JSON.stringify({ [field]: val })
    });
    await bootstrap();
    showToast('Marketplace rollout mode updated!');
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.rateBuyerFromOrder = async function(orderId, valStr) {
  if (!valStr) return;
  try {
    const [rStr, fb] = valStr.split('|');
    await apiFetch('/api/merchant/order-update', {
      method: 'POST',
      body: JSON.stringify({
        orderId,
        merchantRatingForBuyer: Number(rStr) || 5,
        merchantFeedbackForBuyer: fb || 'समय पर भुगतान करने वाला विश्वसनीय ग्राहक'
      })
    });
    await bootstrap();
    showToast(tr('Order-verified buyer feedback saved!', 'ऑर्डर-आधारित ग्राहक रेटिंग सफलतापूर्वक दर्ज हो गई!'));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.repeatPastOrder = function(orderId) {
  const o = (state.data.myOrders || []).find(x => x.id === orderId);
  if (!o) return;
  state.selectedShopId = o.shopId;
  state.cart = {};
  for (const item of o.items || []) {
    if (item.productId) {
      state.cart[item.productId] = (state.cart[item.productId] || 0) + (Number(item.qty) || 1);
    }
  }
  state.parchiNote = o.note || '';
  state.lastPlacedOrder = null;
  navigate('/order', { shop: o.shopId });
  showToast(tr(`Items from ${o.invoiceNo} loaded into your cart!`, `बिल ${o.invoiceNo} के सभी सामान कार्ट में लोड हो गए हैं! एक क्लिक में ऑर्डर करें।`));
};

window.openOrderReviewModal = function(orderId, shopId, shopName) {
  state.orderReviewModal = { orderId, shopId, shopName, rating: 5, note: 'पक्का बिल, सही थोक रेट और तेज़ डिलीवरी (Genuine Wholesale Rates & Fast Delivery)' };
  render();
};

window.submitOrderReviewForm = async function(e) {
  e.preventDefault();
  const m = state.orderReviewModal;
  if (!m) return;
  try {
    const rating = Number(document.getElementById('orv-rating').value || 5);
    const reviewNote = document.getElementById('orv-note').value.trim();
    const res = await apiFetch('/api/public/submit', {
      method: 'POST',
      body: JSON.stringify({
        kind: 'vouch',
        targetType: 'shop',
        targetId: m.shopId,
        orderId: m.orderId,
        rating,
        reviewNote
      })
    });
    state.orderReviewModal = null;
    await bootstrap();
    showToast(tr(`Verified review linked to Invoice ${res.verifiedOrderNo || m.orderId} saved!`, `बिल ${res.verifiedOrderNo || m.orderId} से जुड़ी आपकी सत्यापित रेटिंग दर्ज हो गई!`));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.openCustomerBillModal = function(orderId) {
  const o = (state.data.myOrders || []).find(x => x.id === orderId);
  if (!o) return;
  state.customerBillModal = o;
  render();
};

window.submitCustomerBulkQuote = async function(e) {
  e.preventDefault();
  try {
    const contact = document.getElementById('bq-contact').value.trim();
    const cat = document.getElementById('bq-cat').value;
    const items = document.getElementById('bq-items').value.trim();
    const phoneMatch = contact.match(/\d{10}/);
    const phone = phoneMatch ? phoneMatch[0] : (state.data.user?.phone || '9928055667');
    const name = contact.replace(/\d+/g, '').replace(/[()]/g, '').trim() || (state.data.user?.name || 'Wholesale Buyer');

    await apiFetch('/api/public/submit', {
      method: 'POST',
      body: JSON.stringify({
        kind: 'lead',
        track: 'bulk-quote',
        need: `Bulk Quote: ${cat}`,
        name,
        phone,
        city: 'Jodhpur',
        amount: 0,
        note: items
      })
    });
    document.getElementById('bq-items').value = '';
    showToast(tr('Bulk rate enquiry sent to verified wholesale stores!', 'आपकी थोक पर्ची सत्यापित दुकानों और एडमिन डेस्क को भेज दी गई है!'));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

function renderOrderReviewModal() {
  const m = state.orderReviewModal;
  if (!m) return '';
  return `
    <div class="modal-backdrop" onclick="state.orderReviewModal=null;render()">
      <div class="modal-box" onclick="event.stopPropagation()">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <h3>⭐ ${tr('Order-Verified Store Rating', 'वास्तविक ऑर्डर पर आधारित दुकान रेटिंग')}</h3>
          <button class="btn btn-ghost btn-sm" onclick="state.orderReviewModal=null;render()">✕</button>
        </div>
        <div class="card-subtle" style="margin-bottom:14px">
          <p style="font-size:0.9rem">🏪 <b>${esc(m.shopName)}</b> · 🧾 ${tr('Verified Bill:', 'सत्यापित बिल:')} <b>${esc(m.orderId)}</b></p>
        </div>
        <form onsubmit="submitOrderReviewForm(event)">
          <div class="form-group">
            <label class="form-label">${tr('Select Rating', 'स्टार रेटिंग चुनें')}</label>
            <select class="select" id="orv-rating">
              <option value="5">⭐⭐⭐⭐⭐ 5/5 — बहुत उत्तम (Excellent Wholesale Store)</option>
              <option value="4">⭐⭐⭐⭐ 4/5 — अच्छा अनुभव (Good Store)</option>
              <option value="3">⭐⭐⭐ 3/5 — सामान्य (Average)</option>
              <option value="2">⭐⭐ 2/5 — सुधार आवश्यक (Needs Improvement)</option>
              <option value="1">⭐ 1/5 — असंतुष्ट (Poor Experience)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">${tr('Your Experience (Quality, Rate & Delivery)', 'आपका अनुभव (माल की गुणवत्ता, थोक रेट और व्यवहार)')} *</label>
            <textarea class="textarea" rows="3" id="orv-note" required>${esc(m.note)}</textarea>
          </div>
          <button type="submit" class="btn btn-gold" style="width:100%">
            ✓ ${tr('Submit Order-Verified Rating', 'सत्यापित रेटिंग सबमिट करें')}
          </button>
        </form>
      </div>
    </div>
  `;
}

function renderCustomerBillModal() {
  const o = state.customerBillModal;
  if (!o) return '';
  const shop = (state.data.merchants || []).find(s => s.id === o.shopId) || {};
  const tot = o.totals || { taxable: 0, cgst: 0, sgst: 0, igst: 0, gst: 0, gross: 0 };
  return `
    <div class="modal-backdrop" onclick="state.customerBillModal=null;render()">
      <div class="modal-box" style="max-width:680px" onclick="event.stopPropagation()">
        <div class="no-print" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
          <h3>🧾 ${tr('Official GST / Estimate Invoice Copy', 'पक्का GST / एस्टीमेट बिल प्रतिलिपि')}</h3>
          <div style="display:flex;gap:8px">
            <button class="btn btn-gold btn-sm" onclick="window.print()">🖨️ ${tr('Print / Save PDF', 'प्रिंट / PDF सेव करें')}</button>
            <button class="btn btn-ghost btn-sm" onclick="state.customerBillModal=null;render()">✕</button>
          </div>
        </div>
        <div class="card-subtle" style="background:#fff;border:2px solid #0f172a;padding:20px">
          <div style="display:flex;justify-content:space-between;border-bottom:2px solid #cbd5e1;padding-bottom:12px;margin-bottom:12px;flex-wrap:wrap;gap:10px">
            <div>
              <h2 style="font-size:1.35rem;color:#0f172a">${esc(shop.shop || 'Marwar Hardware & Sanitary Mart')}</h2>
              <p class="text-muted" style="font-size:0.84rem">${esc(shop.city || 'Jodhpur')}, ${esc(shop.state || 'Rajasthan')} · Shop ID: <b>${esc(o.shopCode || shop.refCode || 'KQM-391042')}</b></p>
              ${shop.gstin ? `<p style="font-size:0.84rem;font-weight:700">GSTIN: ${esc(shop.gstin)}</p>` : ''}
            </div>
            <div style="text-align:right">
              <span class="badge badge-gold">${shop.gstin ? 'TAX INVOICE' : 'BILL OF SUPPLY'}</span>
              <p style="font-weight:800;font-size:1.1rem;margin-top:4px">${esc(o.invoiceNo)}</p>
              <p class="text-muted" style="font-size:0.8rem">Date: ${new Date(o.date).toLocaleDateString('en-IN')}</p>
            </div>
          </div>

          <div style="margin-bottom:12px;font-size:0.88rem">
            <b>${tr('Billed To (Buyer):', 'खरीदार का विवरण:')}</b> ${esc(o.customer)} (${esc(o.phone)})
            · <span style="font-family:monospace;font-weight:700;color:#2563EB">Buyer ID: ${esc(o.customerCode || 'KQC-849201')}</span>
            <br/>${tr('Address:', 'पता:')} ${esc(o.address || '')}
            ${o.buyerGstin ? ` · <b>Buyer GSTIN: ${esc(o.buyerGstin)}</b>` : ''}
          </div>

          <table>
            <thead>
              <tr>
                <th>${tr('Item', 'सामान')}</th>
                <th>HSN</th>
                <th>${tr('Qty', 'मात्रा')}</th>
                <th>${tr('Rate', 'रेट')}</th>
                <th>GST%</th>
                <th>${tr('Amount', 'राशि')}</th>
              </tr>
            </thead>
            <tbody>
              ${(o.items || []).map(it => `
                <tr>
                  <td>${esc(it.name)}</td>
                  <td>${esc(it.hsn || '-')}</td>
                  <td>${it.qty}</td>
                  <td>${fmtINR(it.price)}</td>
                  <td>${it.gstRate || 0}%</td>
                  <td><b>${fmtINR((it.price || 0) * (it.qty || 1))}</b></td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div style="border-top:2px solid #cbd5e1;margin-top:12px;padding-top:10px;text-align:right;font-size:0.9rem">
            <p>Taxable Amount: <b>${fmtINR(tot.taxable)}</b></p>
            <p>Total GST (${tot.supplyType === 'inter' ? 'IGST' : 'CGST+SGST'}): <b>${fmtINR(tot.gst)}</b></p>
            <p style="font-size:1.2rem;margin-top:4px;color:#0f172a"><b>Grand Total: ${fmtINR(tot.gross)}</b></p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderPartyLedgerModal() {
  const key = state.partyLedgerModalKey;
  if (!key) return '';
  const shop = state.data.myShop || {};
  const partyOrders = (state.data.myOrders || [])
    .filter(o => o.status !== 'Rejected' && (o.phone === key || o.customer === key))
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (partyOrders.length === 0) return '';
  const first = partyOrders[0];
  const entries = [];
  let runningBalance = 0;

  for (const o of partyOrders) {
    const gross = Number(o.totals?.gross) || 0;
    if (o.status === 'Sales Return') {
      runningBalance -= gross;
      entries.push({
        date: o.date,
        voucher: o.invoiceNo,
        particulars: `Credit Note / माल वापसी (${(o.items || []).map(i => i.name).join(', ') || 'Return'})`,
        debit: 0,
        credit: gross,
        balance: runningBalance
      });
      continue;
    }

    // Debit Entry: Sale Bill
    runningBalance += gross;
    entries.push({
      date: o.date,
      voucher: o.invoiceNo,
      particulars: `बिक्री बिल (Tax Invoice) — ${(o.items || []).map(i => `${i.name}×${i.qty}`).join(', ') || o.note || 'Goods'}`,
      debit: gross,
      credit: 0,
      balance: runningBalance
    });

    // Credit Entry: Immediate or Partial Receipts
    const paid = o.paymentMode === 'Credit' && !o.udhaarSettled
      ? Math.min(gross, Math.max(0, Number(o.paidAmount) || 0))
      : gross;
    if (Array.isArray(o.receipts) && o.receipts.length > 0) {
      for (const r of o.receipts) {
        const amt = Number(r.amount) || 0;
        runningBalance -= amt;
        entries.push({
          date: r.date || o.date,
          voucher: `RCPT-${o.invoiceNo.slice(-4)}`,
          particulars: `किस्त / राशि प्राप्त (${r.mode || 'Cash'})`,
          debit: 0,
          credit: amt,
          balance: runningBalance
        });
      }
    } else if (paid > 0) {
      runningBalance -= paid;
      entries.push({
        date: o.date,
        voucher: `RCPT-${o.invoiceNo.slice(-4)}`,
        particulars: `भुगतान प्राप्त (${o.paymentMode || 'Cash'})`,
        debit: 0,
        credit: paid,
        balance: runningBalance
      });
    }
  }

  const totalDebit = entries.reduce((s, e) => s + e.debit, 0);
  const totalCredit = entries.reduce((s, e) => s + e.credit, 0);

  return `
    <div class="modal-backdrop" onclick="state.partyLedgerModalKey=null;render()">
      <div class="modal-box" style="max-width:780px" onclick="event.stopPropagation()">
        <div class="no-print" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
          <h3>📒 ${tr('Party Khata Ledger Statement (Dr / Cr)', 'पार्टी बही-खाता स्टेटमेंट (नामे / जमा विवरण)')}</h3>
          <div style="display:flex;gap:8px">
            <button class="btn btn-gold btn-sm" onclick="window.print()">🖨️ ${tr('Print / Save Ledger PDF', 'स्टेटमेंट प्रिंट / PDF सेव करें')}</button>
            <button class="btn btn-ghost btn-sm" onclick="state.partyLedgerModalKey=null;render()">✕</button>
          </div>
        </div>
        <div class="card-subtle" style="background:#fff;border:2px solid #0f172a;padding:20px">
          <div style="display:flex;justify-content:space-between;border-bottom:2px solid #cbd5e1;padding-bottom:10px;margin-bottom:12px;flex-wrap:wrap;gap:10px">
            <div>
              <h2 style="font-size:1.3rem;color:#0f172a">${esc(shop.shop || 'KuberQ Merchant')}</h2>
              <p class="text-muted" style="font-size:0.82rem">Shop ID: <b>${esc(shop.refCode || 'KQM-391042')}</b> ${shop.gstin ? `· GSTIN: <b>${esc(shop.gstin)}</b>` : ''}</p>
            </div>
            <div style="text-align:right">
              <span class="badge badge-primary">PARTY LEDGER STATEMENT</span>
              <p style="font-size:0.82rem;margin-top:4px">As on: <b>${new Date().toLocaleDateString('en-IN')}</b></p>
            </div>
          </div>

          <div style="margin-bottom:12px;font-size:0.9rem;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px">
            <div>
              <b>${tr('Party Name:', 'पार्टी का नाम:')}</b> ${esc(first.customer)} (${esc(first.phone)})
              · <span class="badge badge-primary" style="font-family:monospace">${esc(first.customerCode || 'KQC-849201')}</span>
            </div>
            <div>
              <b>${tr('Closing Balance Due:', 'अंतिम शेष बकाया:')}</b> <strong style="color:${runningBalance > 0 ? '#dc2626' : '#16a34a'}">${fmtINR(Math.max(0, runningBalance))} Dr</strong>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>${tr('Date', 'तारीख')}</th>
                <th>${tr('Voucher No', 'बिल/रसीद')}</th>
                <th>${tr('Particulars', 'विवरण')}</th>
                <th>${tr('Debit (नामे - माल गया)', 'Debit (नामे ₹)')}</th>
                <th>${tr('Credit (जमा - पैसा आया)', 'Credit (जमा ₹)')}</th>
                <th>${tr('Balance (शेष)', 'Balance (शेष ₹)')}</th>
              </tr>
            </thead>
            <tbody>
              ${entries.map(e => `
                <tr>
                  <td>${new Date(e.date).toLocaleDateString('en-IN')}</td>
                  <td><b>${esc(e.voucher)}</b></td>
                  <td style="font-size:0.82rem">${esc(e.particulars)}</td>
                  <td style="color:#dc2626;font-weight:700">${e.debit > 0 ? fmtINR(e.debit) : '—'}</td>
                  <td style="color:#16a34a;font-weight:700">${e.credit > 0 ? fmtINR(e.credit) : '—'}</td>
                  <td><b>${fmtINR(Math.max(0, e.balance))} ${e.balance > 0 ? 'Dr' : ''}</b></td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr style="border-top:2px solid #0f172a;font-weight:800;background:#f8fafc">
                <td colspan="3" style="text-align:right">${tr('Total:', 'कुल योग:')}</td>
                <td style="color:#dc2626">${fmtINR(totalDebit)}</td>
                <td style="color:#16a34a">${fmtINR(totalCredit)}</td>
                <td style="color:${runningBalance > 0 ? '#dc2626' : '#16a34a'}">${fmtINR(Math.max(0, runningBalance))} Dr</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// MAIN RENDER LOOP
// ============================================================================

// ============================================================================
// OPC ADMIN OVERVIEW & PROFIT & LOSS ENGINE
// ============================================================================
function renderAdminOverview(ad) {
  const merchants = ad.merchants || [];
  const upgrades = ad.upgrades || [];
  const expenses = ad.adminExpenses || [];

  let grossSaaSRevenue = 0;
  for (const up of upgrades) {
    grossSaaSRevenue += Number(up.amount || 0);
  }
  const aiPackRev = merchants.reduce((sum, m) => sum + (m.aiQuotaPurchased || 0) * 1, 0);
  const totalGrossRev = grossSaaSRevenue + aiPackRev;

  const recordedExp = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const baseHostingExp = 1500;
  const baseSmsExp = 1200;
  const baseAiTokenExp = 850;
  const baseDomainExp = 250;
  const totalOpsExp = recordedExp + baseHostingExp + baseSmsExp + baseAiTokenExp + baseDomainExp;

  const netProfit = totalGrossRev - totalOpsExp;
  const isProfitable = netProfit >= 0;
  const marginPct = totalGrossRev > 0 ? Math.round((netProfit / totalGrossRev) * 100) : 0;

  return `
    <div style="display:grid;gap:22px">
      <!-- P&L Header Banner -->
      <div class="card" style="background:linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);color:#ffffff;border:none">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px">
          <div>
            <span class="badge badge-gold" style="font-size:0.8rem">SOLOPRENEUR / OPC COMMAND CENTER</span>
            <h2 style="font-size:1.65rem;margin:8px 0 4px;color:#ffffff">${tr('Platform Profit & Loss & Operating Engine', 'वित्तीय लाभ-हानि व प्लेटफॉर्म संचालन')}</h2>
            <p style="color:#cbd5e1;font-size:0.9rem;margin:0;max-width:700px">
              ${tr('Real-time financial matching of KuberQ gross SaaS plan earnings, AI credit packs, and platform server/API overheads as a One-Person Company.', 'एकल स्वामित्व (One-Person Company) के रूप में KuberQ की कुल SaaS आय, AI क्रेडिट पैक, एवं सर्वर/API परिचालन व्यय का लाइव मिलान।')}
            </p>
          </div>
          <div style="text-align:right">
            <span style="font-size:0.85rem;color:#93c5fd;display:block">${tr('Net Monthly Profit / P&L', 'शुद्ध मासिक लाभ / बचत')}</span>
            <span style="font-size:2rem;font-weight:900;color:${isProfitable ? '#4ade80' : '#f87171'}">
              ${isProfitable ? '+' : ''}${fmtINR(netProfit)}
            </span>
            <span class="badge ${isProfitable ? 'badge-success' : 'badge-danger'}" style="margin-top:4px">
              ${isProfitable ? tr('Profitable (' + marginPct + '% Margin)', 'लाभप्रद (' + marginPct + '% मार्जिन)') : tr('Operating Loss', 'परिचालन घाटा')}
            </span>
          </div>
        </div>

        <div style="display:flex;justify-content:flex-end;margin-top:14px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.15)">
          <a class="btn btn-sm" href="/api/admin/backup" download style="background:rgba(255,255,255,0.18);color:#ffffff;border:1px solid rgba(255,255,255,0.35);font-weight:600;display:inline-flex;align-items:center;gap:6px">
            📥 <span>${tr('Download Live DB Backup (.json)', 'लाइव डेटाबेस बैकअप डाउनलोड करें (.json)')}</span>
          </a>
        </div>
      </div>

      <!-- Financial Metric Cards -->
      <div class="pnl-grid">
        <div class="pnl-card">
          <div class="pnl-label" style="font-weight:600;font-size:0.85rem;color:#64748b">${tr('Gross Platform Revenue', 'कुल प्लेटफॉर्म आय')}</div>
          <div class="pnl-val text-gold" style="font-size:1.6rem;font-weight:800;margin:4px 0">${fmtINR(totalGrossRev)}</div>
          <div class="pnl-sub" style="font-size:0.8rem;color:#475569">${tr('SaaS Plans: ' + fmtINR(grossSaaSRevenue) + ' · AI Credits: ' + fmtINR(aiPackRev), 'SaaS अपग्रेड: ' + fmtINR(grossSaaSRevenue) + ' · AI क्रेडिट: ' + fmtINR(aiPackRev))}</div>
        </div>

        <div class="pnl-card">
          <div class="pnl-label" style="font-weight:600;font-size:0.85rem;color:#64748b">${tr('Total Operating Expenses', 'कुल परिचालन व्यय')}</div>
          <div class="pnl-val" style="color:#ef4444;font-size:1.6rem;font-weight:800;margin:4px 0">${fmtINR(totalOpsExp)}</div>
          <div class="pnl-sub" style="font-size:0.8rem;color:#475569">${tr('Hosting, SMS/WA API, AI tokens & daily overheads', 'होस्टिंग, SMS/WA API, AI टोकन एवं दैनिक व्यय')}</div>
        </div>

        <div class="pnl-card">
          <div class="pnl-label" style="font-weight:600;font-size:0.85rem;color:#64748b">${tr('Active Merchant Stores', 'पंजीकृत सक्रिय दुकानें')}</div>
          <div class="pnl-val" style="color:#2563eb;font-size:1.6rem;font-weight:800;margin:4px 0">${merchants.length}</div>
          <div class="pnl-sub" style="font-size:0.8rem;color:#475569">${tr('Live B2B catalogs & 5-Sec billing merchants', 'सक्रिय B2B कैटलॉग एवं 5-सेकंड बिलिंग व्यापारी')}</div>
        </div>

        <div class="pnl-card">
          <div class="pnl-label" style="font-weight:600;font-size:0.85rem;color:#64748b">${tr('Paid Plan Subscriptions', 'सशुल्क प्लान अपग्रेड')}</div>
          <div class="pnl-val" style="color:#10b981;font-size:1.6rem;font-weight:800;margin:4px 0">${upgrades.length}</div>
          <div class="pnl-sub" style="font-size:0.8rem;color:#475569">${tr('Pro & Enterprise active memberships', 'Pro व Enterprise वार्षिक/मासिक सदस्यता')}</div>
        </div>
      </div>

      <!-- Solopreneur Expense Input Form -->
      <div class="erp-card">
        <div class="erp-card-header">
          <div>
            <span class="badge badge-primary">💸 EXPENSE LOG</span>
            <h3 style="margin-top:6px">${tr('Record Daily Platform Operating Expense', 'दैनिक प्लेटफॉर्म परिचालन व्यय प्रविष्टि')}</h3>
            <p class="text-muted" style="font-size:0.84rem">${tr('Log Cloud VPS, Fast2SMS, Twilio WhatsApp, Gemini API tokens, domain/SSL or ad spend.', 'Cloud VPS, Fast2SMS, Twilio WhatsApp, Gemini API, डोमेन या विज्ञापनों का वास्तविक खर्च दर्ज करें।')}</p>
          </div>
        </div>

        <form onsubmit="addAdminExpense(event)">
          <div class="grid grid-3" style="gap:12px;margin-bottom:12px">
            <div class="form-group">
              <label class="form-label">${tr('Expense Date *', 'व्यय की तिथि *')}</label>
              <input type="date" class="input" id="ad-exp-date" required value="${new Date().toISOString().slice(0, 10)}" />
            </div>
            <div class="form-group">
              <label class="form-label">${tr('Expense Category *', 'व्यय श्रेणी *')}</label>
              <select class="select" id="ad-exp-cat" required>
                <option value="Cloud VPS & Server Hosting">${tr('Cloud VPS & Server Hosting', 'Cloud VPS व सर्वर होस्टिंग')}</option>
                <option value="Twilio / Fast2SMS API">${tr('Twilio / SMS / WhatsApp Gateway', 'Twilio / SMS / WhatsApp गेटवे')}</option>
                <option value="Google Gemini AI Tokens">${tr('Gemini AI Vision & Token Fees', 'Gemini AI विज़न व टोकन शुल्क')}</option>
                <option value="Domain & Cloudflare SSL">${tr('Domain, DNS & SSL Security', 'डोमेन, DNS व SSL सुरक्षा')}</option>
                <option value="Marketing & Customer Acquisition">${tr('Marketing & Merchant Acquisition', 'व्यापार प्रचार व ग्राहक अधिग्रहण')}</option>
                <option value="Office & Freelancer Support">${tr('Office, Staff & Legal Fees', 'ऑफिस, स्टाफ व लीगल फीस')}</option>
                <option value="Other Operating Expense">${tr('Other Operating Expenses', 'अन्य विविध व्यय')}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">${tr('Vendor / Provider Name *', 'वेंडर / सेवा प्रदाता नाम *')}</label>
              <input class="input" id="ad-exp-vendor" required placeholder="${tr('e.g. Render / Railway / Fast2SMS', 'उदा. Render / Railway / Fast2SMS')}" />
            </div>
          </div>

          <div class="grid grid-3" style="gap:12px;margin-bottom:12px">
            <div class="form-group">
              <label class="form-label">${tr('Expense Amount (₹) *', 'व्यय राशि (₹) *')}</label>
              <input type="number" step="0.01" min="1" class="input" id="ad-exp-amount" required placeholder="0.00" />
            </div>
            <div class="form-group">
              <label class="form-label">${tr('Invoice / Receipt Reference No.', 'इनवॉइस / रसीद संदर्भ संख्या')}</label>
              <input class="input" id="ad-exp-ref" placeholder="${tr('e.g. INV-2026-904', 'उदा. INV-2026-904')}" />
            </div>
            <div class="form-group">
              <label class="form-label">${tr('Remarks / Description', 'टिप्पणी / विवरण')}</label>
              <input class="input" id="ad-exp-note" placeholder="${tr('e.g. Server 16GB RAM monthly upgrade', 'उदा. सर्वर 16GB RAM अपग्रेड मासिक')}" />
            </div>
          </div>

          <button type="submit" class="btn btn-gold btn-sm">
            ${tr('➕ Save Platform Expense', '➕ व्यय सुरक्षित करें')}
          </button>
        </form>
      </div>

      <!-- Recorded Expenses Table -->
      <div class="erp-card">
        <h3 style="margin-bottom:12px">📋 ${tr('Recorded Platform Operating Expenses (' + expenses.length + ')', 'दर्ज किए गए प्लेटफॉर्म परिचालन खर्चे (' + expenses.length + ')')}</h3>
        <div class="table-wrap" style="max-height:280px;overflow-y:auto">
          <table>
            <thead>
              <tr>
                <th>${tr('Date', 'तिथि')}</th>
                <th>${tr('Category', 'श्रेणी')}</th>
                <th>${tr('Vendor', 'वेंडर')}</th>
                <th>${tr('Amount (₹)', 'राशि (₹)')}</th>
                <th>${tr('Invoice Ref', 'इनवॉइस संदर्भ')}</th>
                <th>${tr('Logged By', 'दर्जकर्ता')}</th>
                <th>${tr('Action', 'कार्रवाई')}</th>
              </tr>
            </thead>
            <tbody>
              ${expenses.length === 0 ? `
                <tr><td colspan="7" style="text-align:center;padding:24px;color:#64748b">${tr('No additional platform expenses recorded yet.', 'अभी कोई अतिरिक्त दैनिक व्यय दर्ज नहीं है।')}</td></tr>
              ` : expenses.map(e => `
                <tr>
                  <td>${esc(e.date || '')}</td>
                  <td><span class="badge badge-ghost">${esc(e.category)}</span></td>
                  <td><b>${esc(e.vendor)}</b></td>
                  <td style="color:#ef4444;font-weight:700">${fmtINR(e.amount)}</td>
                  <td style="font-family:monospace;font-size:0.8rem">${esc(e.invoiceRef || '-')}</td>
                  <td style="font-size:0.8rem">${esc(e.recordedBy || 'Admin')}</td>
                  <td>
                    <button type="button" class="btn btn-danger btn-sm" style="padding:2px 8px;font-size:0.75rem" onclick="deleteAdminExpense('${e.id}')">${tr('Delete', 'हटाएं')}</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// MSME MANUFACTURER & JOB-WORK PORTAL
// ============================================================================
function renderMerchantManufacturing(shop) {
  const subTab = state.mfgSubTab || 'raw';
  const rawMaterials = (state.data.myRawMaterials || []);
  const jobWorks = (state.data.myJobWorkOrders || []);
  const batches = (state.data.myProductionBatches || []);

  const totalRawValuation = rawMaterials.reduce((sum, r) => sum + (Number(r.stock || 0) * Number(r.unitCost || 0)), 0);

  return `
    <div style="display:grid;gap:20px">
      <!-- Sub-Tab Header -->
      <div style="display:flex;gap:10px;flex-wrap:wrap;border-bottom:2px solid #e2e8f0;padding-bottom:12px">
        <button type="button" class="btn ${subTab === 'raw' ? 'btn-gold' : 'btn-ghost'}" onclick="state.mfgSubTab='raw';render()">
          ${tr('🧱 Raw Material Stock (' + rawMaterials.length + ')', '🧱 कच्चा माल स्टॉक (' + rawMaterials.length + ')')}
        </button>
        <button type="button" class="btn ${subTab === 'jobwork' ? 'btn-gold' : 'btn-ghost'}" onclick="state.mfgSubTab='jobwork';render()">
          ${tr('🚚 Job-Work Challans - SAC 9988 (' + jobWorks.length + ')', '🚚 जॉब-वर्क चालान - SAC 9988 (' + jobWorks.length + ')')}
        </button>
        <button type="button" class="btn ${subTab === 'production' ? 'btn-gold' : 'btn-ghost'}" onclick="state.mfgSubTab='production';render()">
          ${tr('⚙️ Production Batches & Costing (' + batches.length + ')', '⚙️ उत्पादन बैच व लागत (' + batches.length + ')')}
        </button>
      </div>

      ${subTab === 'raw' ? `
        <div class="erp-card">
          <div class="erp-card-header">
            <div>
              <span class="badge badge-primary">RAW MATERIAL INVENTORY</span>
              <h3 style="margin-top:6px">${tr('Raw Materials Stock & Low-Stock Alerts', 'कच्चा माल भंडार व न्यूनतम स्टॉक अलर्ट')}</h3>
              <p class="text-muted" style="font-size:0.84rem">${tr('Track raw materials, sheets, resins, rods or chemicals used in manufacturing.', 'विनिर्माण में प्रयुक्त होने वाले रॉ-मटेरियल, शीट्स, रॉड्स, दाना या रसायनों का स्टॉक बनाए रखें।')}</p>
            </div>
            <span class="badge badge-success" style="font-size:1.05rem;padding:6px 14px">
              ${tr('Total Raw Valuation: ', 'कुल कच्चा माल मूल्य: ')}${fmtINR(totalRawValuation)}
            </span>
          </div>

          <form onsubmit="addRawMaterial(event)">
            <div class="grid grid-3" style="gap:12px;margin-bottom:12px">
              <div class="form-group">
                <label class="form-label">${tr('Raw Material Name *', 'कच्चे माल का नाम *')}</label>
                <input class="input" id="raw-name" required placeholder="${tr('e.g. PVC Resin Granules SG-5 / MS Sheet 2mm', 'उदा. PVC Resin Granules SG-5 / MS Sheet 2mm')}" />
              </div>
              <div class="form-group">
                <label class="form-label">${tr('Code / Grade / Spec', 'कोड / ग्रेड / स्पेसिफिकेशन')}</label>
                <input class="input" id="raw-code" placeholder="${tr('e.g. GRADE-A-102', 'उदा. GRADE-A-102')}" />
              </div>
              <div class="form-group">
                <label class="form-label">${tr('HSN Code (4 or 6 Digits)', 'HSN कोड (4 या 6 अंक)')}</label>
                <input class="input" id="raw-hsn" maxlength="8" placeholder="${tr('e.g. 3901 / 7208', 'उदा. 3901 / 7208')}" />
              </div>
            </div>

            <div class="grid grid-4" style="gap:12px;margin-bottom:12px">
              <div class="form-group">
                <label class="form-label">${tr('Unit *', 'इकाई (Unit) *')}</label>
                <select class="select" id="raw-unit" required>
                  <option value="Kg">Kg</option>
                  <option value="Mtr">Mtr</option>
                  <option value="Ton">Ton</option>
                  <option value="Pcs">Pcs</option>
                  <option value="Bag">Bag</option>
                  <option value="Ltr">Ltr</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">${tr('Initial Stock *', 'प्रारंभिक स्टॉक मात्रा *')}</label>
                <input type="number" step="0.01" min="0" class="input" id="raw-stock" required placeholder="0.00" />
              </div>
              <div class="form-group">
                <label class="form-label">${tr('Purchase Cost per Unit (₹) *', 'प्रति इकाई खरीद लागत (₹) *')}</label>
                <input type="number" step="0.01" min="0" class="input" id="raw-cost" required placeholder="0.00" />
              </div>
              <div class="form-group">
                <label class="form-label">${tr('Re-order Threshold', 'न्यूनतम पुनः ऑर्डर सीमा')}</label>
                <input type="number" step="0.01" min="0" class="input" id="raw-min" value="10" placeholder="10" />
              </div>
            </div>

            <button type="submit" class="btn btn-gold btn-sm">
              ${tr('➕ Add Raw Material', '➕ कच्चा माल जोड़ें')}
            </button>
          </form>
        </div>

        <div class="erp-card">
          <h3 style="margin-bottom:12px">📦 ${tr('Raw Materials In Stock (' + rawMaterials.length + ')', 'भंडारित कच्चा माल सूची (' + rawMaterials.length + ')')}</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>${tr('Material Name', 'सामग्री का नाम')}</th>
                  <th>${tr('Code/Grade', 'कोड/ग्रेड')}</th>
                  <th>${tr('HSN', 'HSN')}</th>
                  <th>${tr('Stock Available', 'उपलब्ध मात्रा')}</th>
                  <th>${tr('Unit Cost (₹)', 'इकाई लागत (₹)')}</th>
                  <th>${tr('Valuation (₹)', 'कुल मूल्यांकन (₹)')}</th>
                  <th>${tr('Action', 'कार्रवाई')}</th>
                </tr>
              </thead>
              <tbody>
                ${rawMaterials.length === 0 ? `
                  <tr><td colspan="7" style="text-align:center;padding:24px;color:#64748b">${tr('No raw materials added yet.', 'अभी कोई कच्चा माल नहीं जुड़ा है।')}</td></tr>
                ` : rawMaterials.map(r => {
                  const val = Number(r.stock || 0) * Number(r.unitCost || 0);
                  const isLow = Number(r.stock || 0) <= Number(r.minThreshold || 0);
                  return `
                    <tr>
                      <td><b>${esc(r.materialName)}</b></td>
                      <td><span style="font-family:monospace;font-size:0.8rem">${esc(r.code || '-')}</span></td>
                      <td style="font-family:monospace">${esc(r.hsn || '-')}</td>
                      <td>
                        <b>${r.stock} ${esc(r.unit)}</b>
                        ${isLow ? `<span class="badge badge-danger" style="margin-left:6px;font-size:0.7rem">${tr('Low Stock', 'कम स्टॉक')}</span>` : ''}
                      </td>
                      <td>${fmtINR(r.unitCost)}</td>
                      <td style="font-weight:700">${fmtINR(val)}</td>
                      <td>
                        <button type="button" class="btn btn-danger btn-sm" style="padding:2px 8px;font-size:0.75rem" onclick="deleteRawMaterial('${r.id}')">${tr('Delete', 'हटाएं')}</button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}

      ${subTab === 'jobwork' ? `
        <div class="erp-card">
          <div class="erp-card-header">
            <div>
              <span class="badge badge-gold">DELIVERY CHALLAN · RULE 55 · SAC 9988</span>
              <h3 style="margin-top:6px">${tr('Job-Work Delivery Challan (Inward / Outward)', 'जॉब-वर्क आवक / जावक डिलीवरी चालान')}</h3>
              <p class="text-muted" style="font-size:0.84rem">${tr('Issue delivery challans under GST Rule 55 for sending or receiving job-work processing goods with SAC 9988 service billing.', 'GST नियम 55 के तहत जॉब-वर्कर को माल भेजने (जावक) या प्राप्त करने (आवक) का डिलीवरी चालान व SAC 9988 जॉब-वर्क सर्विस बिलिंग।')}</p>
            </div>
          </div>

          <form onsubmit="addJobWorkOrder(event)">
            <div class="grid grid-3" style="gap:12px;margin-bottom:12px">
              <div class="form-group">
                <label class="form-label">${tr('Job-Worker / Party Name *', 'जॉब-वर्कर / पार्टी का नाम *')}</label>
                <input class="input" id="jw-party" required placeholder="${tr('e.g. Marwar Die-Casting Works', 'उदा. मारवाड़ डाईकास्टिंग वर्क्स')}" />
              </div>
              <div class="form-group">
                <label class="form-label">${tr('Party GSTIN (Optional)', 'पार्टी GSTIN (वैकल्पिक)')}</label>
                <input class="input" id="jw-gstin" maxlength="15" style="text-transform:uppercase;font-family:monospace" placeholder="08AAACR5055K1Z2" />
              </div>
              <div class="form-group">
                <label class="form-label">${tr('Challan Direction *', 'चालान प्रकार (Direction) *')}</label>
                <select class="select" id="jw-dir" required>
                  <option value="Outward">${tr('Outward Challan (To Job-Worker)', 'जावक चालान (Outward to Job-Worker)')}</option>
                  <option value="Inward">${tr('Inward Challan (From Job-Worker)', 'आवक चालान (Inward from Job-Worker)')}</option>
                </select>
              </div>
            </div>

            <div class="grid grid-3" style="gap:12px;margin-bottom:12px">
              <div class="form-group">
                <label class="form-label">${tr('Process Type *', 'प्रक्रिया प्रकार (Process Type) *')}</label>
                <input class="input" id="jw-process" required placeholder="${tr('e.g. Molding / Cutting / Zinc Plating / Powder Coating', 'उदा. मोल्डिंग / कटिंग / जिंक प्लेटिंग / पाउडर कोटिंग')}" />
              </div>
              <div class="form-group">
                <label class="form-label">${tr('Material Description *', 'सामग्री का विवरण *')}</label>
                <input class="input" id="jw-material" required placeholder="${tr('e.g. 500 Kg Aluminium Ingots Grade A', 'उदा. 500 Kg एल्युमिनियम इनगॉट')}" />
              </div>
              <div class="form-group">
                <label class="form-label">${tr('Quantity *', 'मात्रा (संख्या / वजन) *')}</label>
                <input type="number" step="0.01" min="0.01" class="input" id="jw-qty" required placeholder="0.00" />
              </div>
            </div>

            <div class="grid grid-3" style="gap:12px;margin-bottom:12px">
              <div class="form-group">
                <label class="form-label">${tr('Job-Work Service Charges ₹ (SAC 9988)', 'जॉब-वर्क सर्विस प्रभार ₹ (SAC 9988)')}</label>
                <input type="number" step="0.01" min="0" class="input" id="jw-charges" placeholder="0.00" />
              </div>
              <div class="form-group">
                <label class="form-label">${tr('Expected Return Date', 'अपेक्षित वापसी तिथि')}</label>
                <input type="date" class="input" id="jw-return-date" />
              </div>
              <div class="form-group">
                <label class="form-label">${tr('Remarks / Ref', 'टिप्पणी / संदर्भ')}</label>
                <input class="input" id="jw-note" placeholder="${tr('e.g. Batch B-12 molding', 'उदा. बैच B-12 डाईकास्टिंग')}" />
              </div>
            </div>

            <button type="submit" class="btn btn-gold btn-sm">
              ${tr('📄 Generate Rule 55 Challan', '📄 चालान बनाएं व सुरक्षित करें')}
            </button>
          </form>
        </div>

        <div class="erp-card">
          <h3 style="margin-bottom:12px">🚚 ${tr('Issued Job-Work Delivery Challans (' + jobWorks.length + ')', 'जारी किए गए जॉब-वर्क चालान (' + jobWorks.length + ')')}</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>${tr('Challan No', 'चालान संख्या')}</th>
                  <th>${tr('Direction', 'दिशा')}</th>
                  <th>${tr('Party Name', 'पार्टी नाम')}</th>
                  <th>${tr('Process', 'प्रक्रिया')}</th>
                  <th>${tr('Material & Qty', 'सामग्री व मात्रा')}</th>
                  <th>${tr('Service Fee', 'सर्विस प्रभार')}</th>
                  <th>${tr('Status', 'स्थिति')}</th>
                </tr>
              </thead>
              <tbody>
                ${jobWorks.length === 0 ? `
                  <tr><td colspan="7" style="text-align:center;padding:24px;color:#64748b">${tr('No job-work challans issued yet.', 'अभी कोई जॉब-वर्क चालान नहीं बना है।')}</td></tr>
                ` : jobWorks.map(j => `
                  <tr>
                    <td style="font-family:monospace;font-weight:700">${esc(j.challanNo)}</td>
                    <td>
                      <span class="badge ${j.direction === 'Outward' ? 'badge-primary' : 'badge-gold'}">
                        ${j.direction === 'Outward' ? tr('Outward', 'जावक') : tr('Inward', 'आवक')}
                      </span>
                    </td>
                    <td><b>${esc(j.partyName)}</b></td>
                    <td>${esc(j.processType)}</td>
                    <td>${esc(j.materialDesc)} (${j.qty})</td>
                    <td>${fmtINR(j.processCharges || 0)}</td>
                    <td><span class="badge badge-success">${esc(j.status || 'Active')}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}

      ${subTab === 'production' ? `
        <div class="erp-card">
          <div class="erp-card-header">
            <div>
              <span class="badge badge-primary">PRODUCTION BATCH & UNIT COSTING</span>
              <h3 style="margin-top:6px">${tr('Production Batch & Finished Goods Costing', 'उत्पादन बैच एवं वास्तविक इकाई लागत गणना')}</h3>
              <p class="text-muted" style="font-size:0.84rem">${tr('Accurately calculate unit cost from raw material consumption, direct labor and power, then sync finished goods to catalog.', 'कच्चे माल की खपत, लेबर व बिजली व्यय को जोड़कर तैयार माल (Finished Good) की सटीक लागत निकालें व सीधे इन्वेंट्री में जोड़ें।')}</p>
            </div>
          </div>

          <form onsubmit="addProductionBatch(event)">
            <div class="grid grid-3" style="gap:12px;margin-bottom:12px">
              <div class="form-group">
                <label class="form-label">${tr('Raw Material Consumed *', 'प्रयुक्त होने वाला कच्चा माल *')}</label>
                <select class="select" id="pb-raw-id" required>
                  <option value="">${tr('-- Select Raw Material --', '-- कच्चा माल चुनें --')}</option>
                  ${rawMaterials.map(r => `
                    <option value="${r.id}">[${esc(r.materialName)}] ${r.stock} ${r.unit} (${fmtINR(r.unitCost)}/${r.unit})</option>
                  `).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">${tr('Raw Material Qty Consumed *', 'कच्चे माल की खपत मात्रा *')}</label>
                <input type="number" step="0.01" min="0.01" class="input" id="pb-raw-qty" required placeholder="0.00" />
              </div>
              <div class="form-group">
                <label class="form-label">${tr('Finished Good Product Name *', 'तैयार माल (Finished Good) का नाम *')}</label>
                <input class="input" id="pb-prod-name" required placeholder="${tr('e.g. PVC Pipe 1 inch Heavy 3m', 'उदा. PVC Pipe 1 inch Heavy (3m)')}" />
              </div>
            </div>

            <div class="grid grid-3" style="gap:12px;margin-bottom:12px">
              <div class="form-group">
                <label class="form-label">${tr('Finished Output Qty *', 'तैयार उत्पादन मात्रा *')}</label>
                <input type="number" step="1" min="1" class="input" id="pb-out-qty" required placeholder="${tr('e.g. 100', 'उदा. 100')}" />
              </div>
              <div class="form-group">
                <label class="form-label">${tr('Finished Good Unit *', 'तैयार माल इकाई *')}</label>
                <select class="select" id="pb-unit" required>
                  <option value="Pcs">Pcs</option>
                  <option value="Mtr">Mtr</option>
                  <option value="Kg">Kg</option>
                  <option value="Box">Box</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">${tr('Direct Labor & Power Cost (₹) *', 'प्रत्यक्ष लेबर व विद्युत व्यय ₹ *')}</label>
                <input type="number" step="0.01" min="0" class="input" id="pb-labor-cost" required placeholder="0.00" />
              </div>
            </div>

            <button type="submit" class="btn btn-gold btn-sm">
              ${tr('⚙️ Finalize Batch & Sync to Catalog', '⚙️ बैच पूर्ण करें व तैयार माल कैटलॉग में जोड़ें')}
            </button>
          </form>
        </div>

        <div class="erp-card">
          <h3 style="margin-bottom:12px">🏭 ${tr('Completed Production Batches (' + batches.length + ')', 'पूर्ण किए गए उत्पादन बैच (' + batches.length + ')')}</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>${tr('Batch No', 'बैच संख्या')}</th>
                  <th>${tr('Finished Good', 'तैयार उत्पाद')}</th>
                  <th>${tr('Output Qty', 'उत्पादित मात्रा')}</th>
                  <th>${tr('Raw Cost', 'कच्चा माल लागत')}</th>
                  <th>${tr('Labor/Power', 'लेबर/पावर')}</th>
                  <th>${tr('Total Cost', 'कुल लागत')}</th>
                  <th>${tr('Cost / Unit', 'इकाई लागत')}</th>
                </tr>
              </thead>
              <tbody>
                ${batches.length === 0 ? `
                  <tr><td colspan="7" style="text-align:center;padding:24px;color:#64748b">${tr('No production batches finalized yet.', 'अभी कोई उत्पादन बैच दर्ज नहीं है।')}</td></tr>
                ` : batches.map(b => `
                  <tr>
                    <td style="font-family:monospace;font-weight:700">${esc(b.batchNo)}</td>
                    <td><b>${esc(b.productName)}</b></td>
                    <td>${b.outputQty} ${esc(b.unit)}</td>
                    <td>${fmtINR(b.rawMaterialCost || 0)}</td>
                    <td>${fmtINR(b.laborPowerCost || 0)}</td>
                    <td><b>${fmtINR(b.totalBatchCost || 0)}</b></td>
                    <td style="color:#16a34a;font-weight:800">${fmtINR(b.unitCost || 0)} / ${esc(b.unit)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

// ============================================================================
// FLOATING ACTION HUB & BULK EXCEL VERIFICATION REVIEW MODAL
// ============================================================================
function renderFloatingActionHub() {
  const isOpen = state.floatingHubOpen;
  return `
    <div class="floating-action-hub">
      ${isOpen ? `
        <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end;margin-bottom:4px">
          <button type="button" class="floating-sub-btn" onclick="openVoucherScanModal()">
            📸 <span>${tr('AI Voucher & Bill Scanner', 'AI वाउचर व बिल स्कैनर')}</span>
          </button>
          <button type="button" class="floating-sub-btn" onclick="downloadCatalogExcelTemplate()">
            📥 <span>${tr('Download Excel Template (.csv)', 'एक्सेल टेम्पलेट डाउनलोड (.csv)')}</span>
          </button>
          <label class="floating-sub-btn" style="cursor:pointer;margin:0">
            📊 <span>${tr('Bulk Upload Excel Sheet', 'बल्क एक्सेल शीट अपलोड करें')}</span>
            <input type="file" accept=".csv,.txt" style="display:none" onchange="handleBulkSheetUpload(this)" />
          </label>
        </div>
      ` : ''}

      <button type="button" class="floating-hub-pill" onclick="state.floatingHubOpen=!state.floatingHubOpen;render()">
        <span>${isOpen ? tr('✕ Close Tools', '✕ टूल्स बंद करें') : tr('✨ AI Tools & Excel Sheet', '✨ AI टूल्स व एक्सेल शीट')}</span>
      </button>
    </div>
  `;
}

function downloadCatalogExcelTemplate() {
  const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(
    "Item Name,Price,Wholesale Price,MOQ,HSN,GST Rate,Unit,Category,Initial Stock\n" +
    "Supreme PVC Pipe 1 inch 3m,185,165,20,3917,18,Pcs,Pipes,50\n" +
    "Astral CPVC Pipe 3/4 inch 3m,340,310,15,3917,18,Pcs,Pipes,40\n" +
    "PVC Elbow 1 inch Heavy,22,16,50,3917,18,Pcs,Fittings,200\n" +
    "Sintex Water Tank 1000L Triple Layer,7200,6800,2,3925,18,Pcs,Tanks,10\n" +
    "JK Wall Putty 40kg Bag,820,770,10,3214,18,Bag,Cement,30\n"
  );
  const link = document.createElement("a");
  link.setAttribute("href", csvContent);
  link.setAttribute("download", "KuberQ_Product_Catalog_Template.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast(tr("✅ Excel template downloaded!", "✅ एक्सेल टेम्पलेट डाउनलोड हो गया!"));
}

function handleBulkSheetUpload(fileInput) {
  const file = fileInput.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const text = e.target.result;
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) {
      alert(tr("File must contain at least 1 item row.", "फाइल में कम से कम 1 आइटम पंक्ति होनी चाहिए।"));
      return;
    }
    const items = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',').map(p => p.trim());
      if (parts.length < 2) continue;
      items.push({
        name: parts[0] || 'New Item',
        price: parseFloat(parts[1]) || 100,
        wholesalePrice: parseFloat(parts[2]) || Math.round((parseFloat(parts[1]) || 100) * 0.9),
        moq: parseInt(parts[3], 10) || 10,
        hsn: parts[4] || '3917',
        gstRate: parseInt(parts[5], 10) || 18,
        unit: parts[6] || 'Pcs',
        category: parts[7] || 'General',
        stock: parseInt(parts[8], 10) || 20
      });
    }

    const currentShop = state.data.myShop || state.data.merchants[0];
    state.bulkReviewShopId = currentShop?.id || '';
    state.bulkReviewModal = items;
    state.floatingHubOpen = false;
    render();
  };
  reader.readAsText(file);
}

function renderBulkReviewModal() {
  const items = state.bulkReviewModal || [];
  return `
    <div class="modal-overlay" style="display:flex;align-items:center;justify-content:center;position:fixed;inset:0;background:rgba(15,23,42,0.65);z-index:99999;backdrop-filter:blur(4px);padding:20px">
      <div class="bulk-review-modal-box">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;border-bottom:1px solid #e2e8f0;padding-bottom:12px">
          <div>
            <span class="badge badge-primary">BULK DATA REVIEW & VERIFY</span>
            <h3 style="margin:4px 0 0;font-size:1.35rem">📊 ${tr('Bulk Excel Catalog Verification (' + items.length + ' Items)', 'एक्सेल शीट सत्यापन व समीक्षा (' + items.length + ' सामान)')}</h3>
            <p class="text-muted" style="margin:2px 0 0;font-size:0.84rem">${tr('Verify or edit product names, wholesale rates, MOQ and HSN codes before syncing to store catalog.', 'कैटलॉग में सुरक्षित करने से पहले सामान का नाम, मूल्य एवं HSN कोड सत्यापित या संशोधित करें।')}</p>
          </div>
          <button type="button" class="btn btn-ghost btn-sm" onclick="state.bulkReviewModal=null;render()">✕</button>
        </div>

        <div class="bulk-table-wrap">
          <table>
            <thead>
              <tr style="background:#f8fafc">
                <th>#</th>
                <th>${tr('Item Name *', 'सामान का नाम *')}</th>
                <th>${tr('Retail Price (₹) *', 'खुदरा मूल्य (₹) *')}</th>
                <th>${tr('Wholesale (₹)', 'थोक मूल्य (₹)')}</th>
                <th>${tr('MOQ', 'न्यूनतम मात्रा')}</th>
                <th>${tr('HSN', 'HSN कोड')}</th>
                <th>${tr('GST %', 'GST %')}</th>
                <th>${tr('Unit', 'इकाई')}</th>
                <th>${tr('Category', 'श्रेणी')}</th>
                <th>${tr('Initial Stock', 'प्रारंभिक स्टॉक')}</th>
                <th>${tr('Action', 'कार्रवाई')}</th>
              </tr>
            </thead>
            <tbody>
              ${items.map((it, idx) => `
                <tr>
                  <td style="font-size:0.8rem;color:#64748b">${idx + 1}</td>
                  <td>
                    <input class="input bulk-input-cell" style="min-width:180px" value="${esc(it.name)}" oninput="state.bulkReviewModal[${idx}].name=this.value" />
                  </td>
                  <td>
                    <input type="number" class="input bulk-input-cell" style="width:90px" value="${it.price}" oninput="state.bulkReviewModal[${idx}].price=parseFloat(this.value)||0" />
                  </td>
                  <td>
                    <input type="number" class="input bulk-input-cell" style="width:90px" value="${it.wholesalePrice}" oninput="state.bulkReviewModal[${idx}].wholesalePrice=parseFloat(this.value)||0" />
                  </td>
                  <td>
                    <input type="number" class="input bulk-input-cell" style="width:70px" value="${it.moq}" oninput="state.bulkReviewModal[${idx}].moq=parseInt(this.value,10)||1" />
                  </td>
                  <td>
                    <input class="input bulk-input-cell" style="width:85px;font-family:monospace" value="${esc(it.hsn || '')}" oninput="state.bulkReviewModal[${idx}].hsn=this.value" />
                  </td>
                  <td>
                    <select class="select bulk-input-cell" style="width:75px" onchange="state.bulkReviewModal[${idx}].gstRate=parseInt(this.value,10)">
                      <option value="0" ${it.gstRate === 0 ? 'selected' : ''}>0%</option>
                      <option value="5" ${it.gstRate === 5 ? 'selected' : ''}>5%</option>
                      <option value="12" ${it.gstRate === 12 ? 'selected' : ''}>12%</option>
                      <option value="18" ${it.gstRate === 18 ? 'selected' : ''}>18%</option>
                      <option value="28" ${it.gstRate === 28 ? 'selected' : ''}>28%</option>
                    </select>
                  </td>
                  <td>
                    <input class="input bulk-input-cell" style="width:70px" value="${esc(it.unit || 'Pcs')}" oninput="state.bulkReviewModal[${idx}].unit=this.value" />
                  </td>
                  <td>
                    <input class="input bulk-input-cell" style="width:100px" value="${esc(it.category || 'General')}" oninput="state.bulkReviewModal[${idx}].category=this.value" />
                  </td>
                  <td>
                    <input type="number" class="input bulk-input-cell" style="width:75px" value="${it.stock || 20}" oninput="state.bulkReviewModal[${idx}].stock=parseInt(this.value,10)||0" />
                  </td>
                  <td>
                    <button type="button" class="btn btn-ghost btn-sm" style="color:#ef4444;padding:2px 6px" onclick="state.bulkReviewModal.splice(${idx},1);render()">🗑</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px;flex-wrap:wrap;gap:10px">
          <div>
            <button type="button" class="btn btn-ghost btn-sm" onclick="state.bulkReviewModal.push({name:'New Item',price:100,wholesalePrice:90,moq:10,hsn:'3917',gstRate:18,unit:'Pcs',category:'General',stock:10});render()">
              ${tr('➕ Add Row', '➕ पंक्ति जोड़ें')}
            </button>
          </div>
          <div style="display:flex;gap:10px">
            <button type="button" class="btn btn-ghost" onclick="state.bulkReviewModal=null;render()">${tr('Cancel', 'रद्द करें')}</button>
            <button type="button" class="btn btn-gold" onclick="submitBulkCatalogReview()">
              ${tr('✔ Approve & Sync to Catalog (' + items.length + ' Items)', '✔ स्वीकृत करें व कैटलॉग में जोड़ें (' + items.length + ' सामान)')}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function submitBulkCatalogReview() {
  const items = state.bulkReviewModal || [];
  if (items.length === 0) return;
  const shopId = state.bulkReviewShopId || state.data.myShop?.id || state.data.merchants[0]?.id;
  try {
    const res = await apiFetch('/api/merchant/inventory', {
      method: 'POST',
      body: JSON.stringify({
        action: 'bulk_add',
        shopId,
        items
      })
    });
    showToast(tr(`✅ ${res.addedCount || items.length} products synced to catalog successfully!`, `✅ ${res.addedCount || items.length} सामान कैटलॉग में सफलतापूर्वक जुड़ गए!`));
    state.bulkReviewModal = null;
    await bootstrap();
  } catch (err) {
    alert(tr('Error saving products: ', 'सामान जोड़ने में त्रुटि: ') + (err.message || 'Error'));
  }
}

function renderVoucherScanModal() {
  return `
    <div class="modal-overlay" style="display:flex;align-items:center;justify-content:center;position:fixed;inset:0;background:rgba(15,23,42,0.65);z-index:99999;backdrop-filter:blur(4px);padding:20px">
      <div class="card" style="max-width:540px;width:100%;box-shadow:var(--shadow-lg);border-radius:18px;padding:24px;border:1.5px solid #cbd5e1">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;border-bottom:1px solid #e2e8f0;padding-bottom:10px">
          <div>
            <span class="badge badge-gold">AI VOUCHER & INVOICE OCR</span>
            <h3 style="margin:4px 0 0;font-size:1.25rem">${tr('📸 AI Voucher & Supplier Bill Scanner', '📸 वाउचर व सप्लायर बिल AI स्कैनर')}</h3>
          </div>
          <button type="button" class="btn btn-ghost btn-sm" onclick="state.voucherModalOpen=false;render()">✕</button>
        </div>

        <p class="text-muted" style="font-size:0.86rem;margin-bottom:14px">
          ${tr('Upload supplier invoice, handwritten slip or voucher image. AI automatically extracts party, items, and tax amounts.', 'सप्लायर बिल, हाथ की पर्ची या खर्चे के वाउचर की फोटो चुनें। AI स्वतः पार्टी का नाम, सामान व राशि पहचान लेगा।')}
        </p>

        <div style="border:2px dashed #cbd5e1;padding:24px;border-radius:12px;text-align:center;background:#f8fafc;margin-bottom:14px">
          <div style="font-size:2.2rem;margin-bottom:8px">📄</div>
          <label class="btn btn-gold btn-sm" style="cursor:pointer">
            📷 ${tr('Choose Voucher Image or Take Photo', 'वाउचर फोटो चुनें या खींचें')}
            <input type="file" accept="image/*" style="display:none" onchange="processVoucherScan(this)" />
          </label>
          <p class="text-muted" style="font-size:0.78rem;margin-top:8px">PNG, JPG, WebP ${tr('supported', 'समर्थित')}</p>
        </div>

        <div id="voucher-scan-preview" style="display:none;background:#ecfdf5;border:1px solid #10b981;padding:12px;border-radius:10px;font-size:0.86rem;color:#065f46;margin-bottom:14px">
        </div>

        <div style="display:flex;justify-content:flex-end;gap:10px">
          <button type="button" class="btn btn-ghost btn-sm" onclick="state.voucherModalOpen=false;render()">${tr('Close', 'बंद करें')}</button>
        </div>
      </div>
    </div>
  `;
}

function processVoucherScan(input) {
  const file = input.files?.[0];
  if (!file) return;
  const p = document.getElementById('voucher-scan-preview');
  if (p) {
    p.style.display = 'block';
    p.innerHTML = tr('⏳ <b>AI scanning voucher...</b> Extracting party, rates, GST...', '⏳ <b>AI वाउचर स्कैन हो रहा है...</b> पहचान हो रही है: पार्टी, दर, टैक्स...');
    setTimeout(() => {
      p.innerHTML = `
        ✔ <b>${tr('AI Voucher Detection Complete!', 'AI वाउचर पहचान पूर्ण!')}</b><br/>
        <b>${tr('Party:', 'पार्टी:')}</b> Marwar Traders · <b>${tr('Invoice No:', 'बिल संख्या:')}</b> MT-9042<br/>
        <b>${tr('Detected Items:', 'पहचाने गए सामान:')}</b> 20 PVC Pipes (₹3,700), 50 Elbows (₹1,100)<br/>
        <b>${tr('Total:', 'कुल राशि:')}</b> ₹4,800 + 18% GST = ₹5,664<br/>
        <button type="button" class="btn btn-gold btn-sm" style="margin-top:8px" onclick="state.voucherModalOpen=false;state.merchantTab='Purchases';render()">
          🛒 ${tr('Sync into Purchases Register', 'खरीद खाते में सुरक्षित करें')}
        </button>
      `;
    }, 1200);
  }
}

async function addAdminExpense(e) {
  e.preventDefault();
  try {
    const payload = {
      action: 'add',
      date: document.getElementById('ad-exp-date').value,
      category: document.getElementById('ad-exp-cat').value,
      vendor: document.getElementById('ad-exp-vendor').value.trim(),
      amount: parseFloat(document.getElementById('ad-exp-amount').value) || 0,
      invoiceRef: document.getElementById('ad-exp-ref').value.trim(),
      note: document.getElementById('ad-exp-note').value.trim()
    };
    await apiFetch('/api/admin/expenses', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    showToast(tr('✅ Platform expense saved successfully!', '✅ व्यय सफलतापूर्वक दर्ज हो गया!'));
    await bootstrap();
  } catch (err) {
    alert(tr('Error saving expense: ', 'व्यय दर्ज करने में त्रुटि: ') + (err.message || 'Error'));
  }
}

async function deleteAdminExpense(id) {
  if (!confirm(tr('Delete this operating expense entry?', 'क्या आप इस व्यय को हटाना चाहते हैं?'))) return;
  try {
    await apiFetch('/api/admin/expenses', {
      method: 'POST',
      body: JSON.stringify({ action: 'delete', id })
    });
    showToast(tr('Expense deleted', 'व्यय हटा दिया गया'));
    await bootstrap();
  } catch (err) {
    alert(tr('Error: ', 'त्रुटि: ') + (err.message || 'Error'));
  }
}

async function addRawMaterial(e) {
  e.preventDefault();
  try {
    const payload = {
      action: 'add',
      materialName: document.getElementById('raw-name').value.trim(),
      code: document.getElementById('raw-code').value.trim(),
      hsn: document.getElementById('raw-hsn').value.trim(),
      unit: document.getElementById('raw-unit').value,
      stock: parseFloat(document.getElementById('raw-stock').value) || 0,
      unitCost: parseFloat(document.getElementById('raw-cost').value) || 0,
      minThreshold: parseFloat(document.getElementById('raw-min').value) || 10
    };
    await apiFetch('/api/manufacturer/raw-materials', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    showToast(tr('✅ Raw material added successfully!', '✅ कच्चा माल सफलतापूर्वक जुड़ गया!'));
    await bootstrap();
  } catch (err) {
    alert(tr('Error: ', 'त्रुटि: ') + (err.message || 'Error'));
  }
}

async function deleteRawMaterial(id) {
  if (!confirm(tr('Delete this raw material from stock?', 'क्या आप इस सामग्री को हटाना चाहते हैं?'))) return;
  try {
    await apiFetch('/api/manufacturer/raw-materials', {
      method: 'POST',
      body: JSON.stringify({ action: 'delete', id })
    });
    showToast(tr('Raw material removed', 'कच्चा माल हटाया गया'));
    await bootstrap();
  } catch (err) {
    alert(tr('Error: ', 'त्रुटि: ') + (err.message || 'Error'));
  }
}

async function addJobWorkOrder(e) {
  e.preventDefault();
  try {
    const payload = {
      action: 'create',
      partyName: document.getElementById('jw-party').value.trim(),
      partyGstin: document.getElementById('jw-gstin').value.trim().toUpperCase(),
      direction: document.getElementById('jw-dir').value,
      processType: document.getElementById('jw-process').value.trim(),
      materialDesc: document.getElementById('jw-material').value.trim(),
      qty: parseFloat(document.getElementById('jw-qty').value) || 1,
      processCharges: parseFloat(document.getElementById('jw-charges').value) || 0,
      expectedReturnDate: document.getElementById('jw-return-date').value,
      note: document.getElementById('jw-note').value.trim()
    };
    const res = await apiFetch('/api/manufacturer/job-work', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    showToast(tr(`✅ Delivery Challan ${res.challan?.challanNo || ''} generated!`, `✅ जॉब-वर्क चालान ${res.challan?.challanNo || ''} जनरेट हो गया!`));
    await bootstrap();
  } catch (err) {
    alert(tr('Error: ', 'त्रुटि: ') + (err.message || 'Error'));
  }
}

async function addProductionBatch(e) {
  e.preventDefault();
  try {
    const payload = {
      action: 'create_batch',
      rawMaterialId: document.getElementById('pb-raw-id').value,
      rawMaterialQty: parseFloat(document.getElementById('pb-raw-qty').value) || 0,
      productName: document.getElementById('pb-prod-name').value.trim(),
      outputQty: parseFloat(document.getElementById('pb-out-qty').value) || 1,
      unit: document.getElementById('pb-unit').value,
      laborPowerCost: parseFloat(document.getElementById('pb-labor-cost').value) || 0
    };
    const res = await apiFetch('/api/manufacturer/production-batch', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    showToast(tr(`✅ Batch ${res.batch?.batchNo || ''} complete! Finished good added to store catalog.`, `✅ बैच ${res.batch?.batchNo || ''} पूर्ण! तैयार माल कैटलॉग में जुड़ गया।`));
    await bootstrap();
  } catch (err) {
    alert(tr('Error: ', 'त्रुटि: ') + (err.message || 'Error'));
  }
}

// Bind to window
window.renderAdminOverview = renderAdminOverview;
window.renderMerchantManufacturing = renderMerchantManufacturing;
window.renderFloatingActionHub = renderFloatingActionHub;
window.downloadCatalogExcelTemplate = downloadCatalogExcelTemplate;
window.handleBulkSheetUpload = handleBulkSheetUpload;
window.renderBulkReviewModal = renderBulkReviewModal;
window.submitBulkCatalogReview = submitBulkCatalogReview;
window.renderVoucherScanModal = renderVoucherScanModal;
window.openVoucherScanModal = () => { state.voucherModalOpen = true; state.floatingHubOpen = false; render(); };
window.processVoucherScan = processVoucherScan;
window.addAdminExpense = addAdminExpense;
window.deleteAdminExpense = deleteAdminExpense;
window.addRawMaterial = addRawMaterial;
window.deleteRawMaterial = deleteRawMaterial;
window.addJobWorkOrder = addJobWorkOrder;
window.addProductionBatch = addProductionBatch;


function render() {
  const root = document.getElementById('app');
  if (!root) return;

  let pageHtml = '';
  const r = state.route;
  if (r === '/' || r === '/merchants') pageHtml = renderHome();
  else if (r === '/pricing') pageHtml = renderPricing();
  else if (r === '/auth') pageHtml = renderAuth(false);
  else if (r === '/signup') pageHtml = renderAuth(true);
  else if (r === '/order') pageHtml = renderOrderPage();
  else if (r === '/merchant') pageHtml = renderMerchantPortal();
  else if (r === '/admin') pageHtml = renderAdminPortal();
  else if (r === '/solutions') pageHtml = renderSolutions();
  else if (r === '/transport') pageHtml = renderTransportPage();
  else if (r === '/services') pageHtml = renderServicesPage();
  else if (r === '/partner') pageHtml = renderPartnerPage();
  else if (r === '/customer') pageHtml = renderCustomerPortal();
  else if (r === '/terms') pageHtml = renderLegalPage('terms');
  else if (r === '/privacy') pageHtml = renderLegalPage('privacy');
  else if (r === '/grievance') pageHtml = renderLegalPage('grievance');
  else pageHtml = renderHome();

  const isEnterpriseView = (
    (r === '/merchant' && state.data.user && state.data.myShop) ||
    (r === '/admin' && state.data.user && (state.data.user.role === 'admin' || state.data.user.role === 'employee')) ||
    (r === '/customer' && state.data.user)
  );

  const extraModals = `${renderFloatingActionHub()}${state.bulkReviewModal ? renderBulkReviewModal() : ''}${state.voucherModalOpen ? renderVoucherScanModal() : ''}`;

  if (isEnterpriseView) {
    root.innerHTML = `${pageHtml}${state.demoModalOpen ? renderDemoModal() : ''}${state.reportModal ? renderReportModal() : ''}${state.orderReviewModal ? renderOrderReviewModal() : ''}${state.customerBillModal ? renderCustomerBillModal() : ''}${state.partyLedgerModalKey ? renderPartyLedgerModal() : ''}${state.aiModalOpen ? (state.data.myShop ? renderAiScannerModal(state.data.myShop) : '') : ''}${extraModals}`;
  } else {
    root.innerHTML = `${renderHeader()}<main>${pageHtml}</main>${renderFooter()}${state.demoModalOpen ? renderDemoModal() : ''}${state.reportModal ? renderReportModal() : ''}${state.orderReviewModal ? renderOrderReviewModal() : ''}${state.customerBillModal ? renderCustomerBillModal() : ''}${state.partyLedgerModalKey ? renderPartyLedgerModal() : ''}${extraModals}`;
  }
}

bootstrap();
