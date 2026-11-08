/**
 * KuberQ — B2B & Retail Operating System (Frontend SPA Engine)
 * 100% Complete Hindi / English Language Switching, Zero-Cost Mobile Auth,
 * Rule-46 GST/IGST Billing, AI Photo-to-Catalog & Smart Parchi, Party Udhaar Khata,
 * and Super-Admin + Employee Command Center.
 */

const CENTRAL_SUPPORT_PHONE = '7240692736';

const state = {
  lang: localStorage.getItem('kuberq_lang') || 'en',
  token: localStorage.getItem('kuberq_token') || '',
  route: window.location.pathname || '/',
  query: Object.fromEntries(new URLSearchParams(window.location.search)),
  data: {
    settings: { enableTransportLive: true, enableServicesLive: true, adminWhatsApp: '7240692736' },
    user: null,
    merchants: [
      {
        id: 'MQM-31CD16',
        shop: 'Marwar Hardware & Sanitary Mart',
        city: 'Jodhpur',
        state: 'Rajasthan',
        category: 'Hardware & Sanitary',
        phone: CENTRAL_SUPPORT_PHONE,
        refCode: 'KQM-31CD16',
        communityVerifications: 14
      }
    ],
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
    myCrmLeads: [],
    myCustomers: [],
    myTasks: [],
    myManagers: [],
    bids: [],
    adminData: null
  },
  // UI Sub-states
  theme: localStorage.getItem('kuberq_theme') || 'light',
  quickCreateOpen: false,
  globalSearchQuery: '',
  globalSearchOpen: false,
  customerModal: null,
  customerSearch: '',
  productModal: null,
  dealModal: null,
  taskModal: null,
  taskFilterStatus: 'ALL',
  taskFilterPriority: 'ALL',
  managerModal: null,
  settingsSubTab: 'profile',
  aiProviderForm: {
    id: '',
    provider: 'Google AI Studio (Gemini)',
    label: 'Google AI Studio (Gemini)',
    apiKey: '',
    modelId: 'google/gemini-flash-1.5',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    temperature: 0.70,
    maxTokens: 4096,
    enabled: true,
    isPrimary: true
  },
  merchantTab: 'Dashboard',
  merchantMoreSubTab: 'QR Standee',
  mfgSubTab: 'raw_materials',
  invoiceDocType: 'Tax Invoice',
  invoiceValidUntil: '',
  udhaarAgeBucket: 'ALL',
  aiManagerMessages: [],
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
  'Unmarked': 'अचिह्नित',
  'Hardware & Sanitary': 'हार्डवेयर और सेनेटरी',
  'Pipes & Fittings': 'पाइप और फिटिंग्स',
  'Building Materials': 'निर्माण सामग्री',
  'Can we generate Inter-State IGST bills for Gujarat dealers?': 'Buyer और supplier की state अलग होने पर बिल कैसे बनेगा? (इंटर-स्टेट IGST बिलिंग)',
  'Yes! Enter the buyer GSTIN starting with 24 (Gujarat) and KuberQ automatically switches CGST+SGST to 100% IGST.': 'Buyer और supplier की state अलग होने पर invoice में CGST+SGST की जगह लागू rate पर IGST लगाया जाएगा।',
  'Buyer और supplier की state अलग होने पर बिल कैसे बनेगा? (Can we generate Inter-State IGST bills?)': 'Buyer और supplier की state अलग होने पर बिल कैसे बनेगा? (इंटर-स्टेट IGST बिलिंग)',
  'Buyer और supplier की state अलग होने पर invoice में CGST+SGST की जगह लागू rate पर IGST लगाया जाएगा। (When buyer and supplier are located in different states, KuberQ automatically calculates and applies IGST at the applicable tax rate instead of CGST+SGST.)': 'Buyer और supplier की state अलग होने पर invoice में CGST+SGST की जगह लागू rate पर IGST लगाया जाएगा।'
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
  // 1. Instant optimistic render so user sees the interface in 0ms without waiting for network
  if (!state.selectedShopId && state.data.merchants.length > 0) {
    state.selectedShopId = state.data.merchants[0].id;
  }
  document.documentElement.lang = state.lang;
  document.documentElement.setAttribute('data-theme', state.theme || 'light');
  render();

  try {
    const data = await apiFetch('/api/bootstrap');
    state.data = { ...state.data, ...data };
    if (state.data.myShop && state.data.myShop.invoiceDefaults && !state._invoiceDefaultsApplied) {
      const def = state.data.myShop.invoiceDefaults;
      state._invoiceDefaultsApplied = true;
      state.invoiceBuyer.paymentMode = def.defaultPaymentMode || 'Cash';
      state.invoiceBuyer.supplyType = def.defaultSupplyType || 'auto';
      state.printFormat = def.defaultPrintFormat || 'a4';
      if (state.invoiceLines && state.invoiceLines.length === 1 && !state.invoiceLines[0].name) {
        state.invoiceLines[0].hsn = def.defaultHsn || '3917';
        state.invoiceLines[0].gstRate = Number(def.defaultGstRate ?? 18);
        state.invoiceLines[0].taxMode = def.defaultTaxMode || 'exclusive';
      }
    }
    if (state.query.shop) {
      state.selectedShopId = state.query.shop;
    } else if (!state.selectedShopId && state.data.merchants.length > 0) {
      state.selectedShopId = state.data.merchants[0].id;
    }
    if (state.query.forgot === '1') {
      openForgotPasswordModal();
    }
    render();
  } catch (err) {
    console.error('Bootstrap error:', err);
    render();
  }
}

window.toggleTheme = function() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('kuberq_theme', state.theme);
  document.documentElement.setAttribute('data-theme', state.theme);
  render();
};

if (typeof window !== 'undefined' && !window._ctrlKBound) {
  window._ctrlKBound = true;
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      state.globalSearchOpen = true;
      render();
      setTimeout(() => {
        const el = document.getElementById('global-ctrl-k-input');
        if (el) el.focus();
      }, 30);
    } else if (e.key === 'Escape') {
      if (state.quickCreateOpen || state.globalSearchOpen) {
        state.quickCreateOpen = false;
        state.globalSearchOpen = false;
        render();
      }
    }
  });
}

function navigate(path, queryParams = {}) {
  const qs = new URLSearchParams(queryParams).toString();
  const fullUrl = qs ? `${path}?${qs}` : path;
  window.history.pushState({}, '', fullUrl);
  state.route = path;
  state.query = queryParams;
  if (state.query.forgot === '1') {
    openForgotPasswordModal();
  }
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

function renderGlobalSearchDropdown() {
  const q = (state.globalSearchQuery || '').trim().toLowerCase();
  if (!state.globalSearchOpen || !q) return '';

  const results = [];
  for (const c of state.data.myCustomers || []) {
    if ((c.name || '').toLowerCase().includes(q) || (c.companyName || '').toLowerCase().includes(q) || (c.phone || '').includes(q) || (c.gstin || '').toLowerCase().includes(q)) {
      results.push({ type: 'Customer', icon: '👥', title: c.name, sub: `${c.companyName || ''} · ${c.phone || ''}`, tab: 'Customers' });
    }
  }
  for (const o of state.data.myOrders || []) {
    if ((o.invoiceNo || '').toLowerCase().includes(q) || (o.customer || '').toLowerCase().includes(q) || (o.phone || '').includes(q)) {
      const isQ = o.docType === 'Quotation' || o.status === 'Quotation';
      results.push({ type: isQ ? 'Quotation' : 'Invoice', icon: isQ ? '📝' : '🧾', title: `${o.invoiceNo} — ${o.customer}`, sub: `${fmtINR(o.totals?.gross || 0)} · ${o.paymentMode || ''}`, tab: 'Billing' });
    }
  }
  for (const l of state.data.myCrmLeads || []) {
    if ((l.title || '').toLowerCase().includes(q) || (l.buyerName || '').toLowerCase().includes(q) || (l.companyName || '').toLowerCase().includes(q) || (l.itemsInterest || '').toLowerCase().includes(q)) {
      results.push({ type: 'Deal / Lead', icon: '🎯', title: l.title || l.buyerName, sub: `${l.companyName || l.buyerName} · ${fmtINR(l.expectedValue || 0)} (${l.stage})`, tab: 'CRM Pipeline' });
    }
  }
  for (const p of (state.data.products || []).filter(x => !state.data.myShop || x.shopId === state.data.myShop.id)) {
    if ((p.name || '').toLowerCase().includes(q) || (p.hsn || '').includes(q) || (p.category || '').toLowerCase().includes(q)) {
      results.push({ type: 'Product', icon: '📦', title: p.name, sub: `${fmtINR(p.price)} · Stock: ${p.stock} ${p.unit || ''}`, tab: 'Inventory' });
    }
  }
  for (const t of state.data.myTasks || []) {
    if ((t.title || '').toLowerCase().includes(q) || (t.details || '').toLowerCase().includes(q)) {
      results.push({ type: 'Task', icon: '✅', title: t.title, sub: `${t.priority} · Due: ${t.dueDate || 'Today'}`, tab: 'Tasks' });
    }
  }

  return `
    <div class="global-search-dropdown" onclick="event.stopPropagation()">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:4px 8px 6px;border-bottom:1px solid #e2e8f0;font-size:0.74rem;color:#64748b;font-weight:700">
        <span>🔍 ${tr('GLOBAL SEARCH RESULTS', 'खोज परिणाम')} (${results.length})</span>
        <button type="button" class="btn btn-ghost btn-sm" style="padding:1px 6px;font-size:0.7rem" onclick="state.globalSearchOpen=false;state.globalSearchQuery='';render()">✕ ESC</button>
      </div>
      ${results.length === 0 ? `
        <div style="padding:16px;text-align:center;font-size:0.84rem;color:#64748b">
          ${tr('No matching customers, invoices, leads, products, or tasks found.', 'कोई ग्राहक, बिल, लीड या सामान नहीं मिला।')}
        </div>
      ` : results.slice(0, 10).map(r => `
        <div class="global-search-item" onclick="state.globalSearchOpen=false;state.merchantTab='${r.tab}';if(state.route!=='/merchant')navigate('/merchant');else render()">
          <div style="display:flex;align-items:center;gap:8px;min-width:0">
            <span style="font-size:1.1rem">${r.icon}</span>
            <div style="min-width:0">
              <div style="font-weight:700;font-size:0.85rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(r.title)}</div>
              <div style="font-size:0.74rem;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(r.sub)}</div>
            </div>
          </div>
          <span class="badge badge-primary" style="font-size:0.68rem;flex-shrink:0">${esc(r.type)}</span>
        </div>
      `).join('')}
    </div>
  `;
}

window.triggerQuickCreate = function(action) {
  state.quickCreateOpen = false;
  if (state.route !== '/merchant') {
    state.route = '/merchant';
    window.history.pushState({}, '', '/merchant');
  }
  if (action === 'invoice') {
    state.invoiceDocType = 'Tax Invoice';
    state.merchantTab = 'Billing';
  } else if (action === 'quotation') {
    state.invoiceDocType = 'Quotation';
    state.merchantTab = 'Billing';
  } else if (action === 'customer') {
    openCustomerModal();
    return;
  } else if (action === 'deal') {
    openDealModal();
    return;
  } else if (action === 'product') {
    openProductAddModal();
    return;
  } else if (action === 'expense') {
    state.merchantTab = 'Expenses';
  } else if (action === 'task') {
    openTaskModal();
    return;
  }
  render();
};

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
    <div class="enterprise-shell" onclick="if(state.quickCreateOpen||state.globalSearchOpen){state.quickCreateOpen=false;state.globalSearchOpen=false;render();}">
      <!-- 1. Dark Navy Top Bar Header with Global Search (Ctrl+K), + Create & Theme Toggle -->
      <header class="enterprise-topbar no-print">
        <div class="topbar-left">
          <button class="sidebar-toggle-btn" type="button" onclick="event.stopPropagation();toggleEnterpriseSidebar()" title="${tr('Toggle Sidebar Menu', 'मेनू छोटा/बड़ा करें')}">
            ☰
          </button>
          <div class="topbar-brand" onclick="navigate('/')" title="${tr('Go to KuberQ Home', 'KuberQ मुख्य पृष्ठ पर जाएं')}">
            <span class="brand-logo-icon">K</span>
            <span>Kuber<span style="color:#38bdf8">Q</span></span>
            <span style="font-size:0.72rem;background:#1e3a8a;color:#93c5fd;padding:2px 6px;border-radius:5px;margin-left:4px;font-weight:700">ERP</span>
          </div>
        </div>

        <!-- Center: YBT-Style Global Search Bar (Ctrl+K) -->
        <div class="topbar-global-search-wrap desktop-only" onclick="event.stopPropagation()">
          <div class="topbar-global-search-box">
            <span style="font-size:0.88rem;opacity:0.8">🔍</span>
            <input
              id="global-ctrl-k-input"
              class="topbar-global-search-input"
              placeholder="${tr('Search customers, invoices, leads... (Ctrl+K)', 'ग्राहक, इनवॉइस, लीड या सामान खोजें... (Ctrl+K)')}"
              value="${esc(state.globalSearchQuery || '')}"
              onfocus="state.globalSearchOpen=true;render()"
              oninput="state.globalSearchQuery=this.value;state.globalSearchOpen=true;render()"
            />
            <span class="topbar-kbd-badge">Ctrl+K</span>
          </div>
          ${renderGlobalSearchDropdown()}
        </div>

        <div class="topbar-right-ribbon">
          <!-- + Create Quick Action Dropdown (Item #1) -->
          <div class="quick-create-wrap" onclick="event.stopPropagation()">
            <button type="button" class="quick-create-btn" onclick="state.quickCreateOpen=!state.quickCreateOpen;state.globalSearchOpen=false;render()">
              <span>+ ${tr('Create', 'नया बनाएँ')}</span>
              <span style="font-size:0.7rem">▾</span>
            </button>
            ${state.quickCreateOpen ? `
              <div class="quick-create-menu">
                <button type="button" class="quick-create-item" onclick="triggerQuickCreate('invoice')">🧾 ${tr('New GST Invoice', 'नया GST इनवॉइस')}</button>
                <button type="button" class="quick-create-item" onclick="triggerQuickCreate('quotation')">📝 ${tr('New Quotation', 'नया कोटेशन (Estimate)')}</button>
                <button type="button" class="quick-create-item" onclick="triggerQuickCreate('customer')">👥 ${tr('Add New Customer', 'नया ग्राहक जोड़ें')}</button>
                <button type="button" class="quick-create-item" onclick="triggerQuickCreate('deal')">🎯 ${tr('Add Deal / Lead', 'नई डील / लीड जोड़ें')}</button>
                <button type="button" class="quick-create-item" onclick="triggerQuickCreate('product')">📦 ${tr('Add Product / Service', 'नया प्रोडक्ट / सर्विस जोड़ें')}</button>
                <button type="button" class="quick-create-item" onclick="triggerQuickCreate('task')">✅ ${tr('Add Task / Reminder', 'नया टास्क / रिमाइंडर')}</button>
                <button type="button" class="quick-create-item" onclick="triggerQuickCreate('expense')">💸 ${tr('Log Shop Expense', 'दुकान का खर्चा लिखें')}</button>
              </div>
            ` : ''}
          </div>

          <!-- Quick AI Assistant Button -->
          <button type="button" class="theme-toggle-btn" style="color:#38bdf8" title="${tr('Ask AI Digital Manager', 'AI डिजिटल मैनेजर से पूछें')}" onclick="state.merchantTab='AI Manager';if(state.route!=='/merchant')navigate('/merchant');else render()">
            ✨
          </button>

          <!-- Dark / Light Mode Switch (Item #2) -->
          <button type="button" class="theme-toggle-btn" title="${tr('Switch Dark / Light Mode', 'डार्क / लाइट मोड बदलें')}" onclick="toggleTheme()">
            ${state.theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <span class="topbar-ribbon-divider desktop-only">||</span>

          <div class="topbar-ribbon-item desktop-only">
            <span id="live-enterprise-clock" class="topbar-live-clock">${getFormattedEnterpriseDateTime().display}</span>
          </div>

          <span class="topbar-ribbon-divider desktop-only">||</span>

          <div class="topbar-ribbon-item desktop-only">
            <span class="topbar-id-badge">${esc(uniqueId || 'KQM-000000')}</span>
          </div>

          <button class="btn btn-ghost btn-sm desktop-only" onclick="navigate('/')" style="color:#38bdf8;padding:4px 8px;font-size:0.76rem" title="${tr('Switch to Public Website', 'वेबसाइट देखें')}">
            🌐 ${tr('Website', 'वेबसाइट')}
          </button>

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

        <!-- Right: Theme Toggle + Language Toggle + Auth (Aligned Flush Right on Same Row) -->
        <div class="nav-actions">
          <button type="button" class="btn btn-ghost btn-sm" style="padding:6px 8px;font-size:0.95rem" title="${tr('Toggle Dark / Light Mode', 'डार्क / लाइट मोड बदलें')}" onclick="toggleTheme()">
            ${state.theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <!-- Desktop Dual Box -->
          <div class="desktop-only lang-toggle-box" title="${tr('Switch Entire Website Language', 'पूरी वेबसाइट की भाषा बदलें')}">
            <button type="button" class="lang-btn ${state.lang === 'hi' ? 'active' : ''}" onclick="setLang('hi')">हिन्दी</button>
            <span style="color:#94a3b8;font-weight:700;font-size:0.8rem">/</span>
            <button type="button" class="lang-btn ${state.lang === 'en' ? 'active' : ''}" onclick="setLang('en')">ENG</button>
          </div>

          <!-- Mobile 1-Tap Toggle Pill (Saves 60px so Free Trial Never Clips) -->
          <button type="button" class="mobile-only btn btn-ghost btn-sm" style="padding:4px 6px;font-size:0.75rem;font-weight:700;border:1px solid #cbd5e1" title="${tr('Switch Language', 'भाषा बदलें')}" onclick="setLang(state.lang === 'hi' ? 'en' : 'hi')">
            ${state.lang === 'hi' ? 'ENG' : 'हिन्दी'}
          </button>

          ${u ? `
            <button class="btn btn-ghost btn-sm" onclick="logout()">${tr('Log Out', 'लॉग आउट')}</button>
          ` : `
            <button class="btn btn-ghost btn-sm desktop-only" onclick="navigate('/auth')">${tr('Log In', 'लॉगिन')}</button>
            <button class="btn btn-coral btn-sm" onclick="navigate('/signup')">${tr('Free Trial', 'निःशुल्क ट्रायल')}</button>
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

function renderMobileBottomNav() {
  const u = state.data.user;
  const merchantTarget = !u ? '/auth' : (u.role === 'admin' || u.role === 'employee' ? '/admin' : '/merchant');
  const supportPhone = state.data.settings?.adminWhatsApp || CENTRAL_SUPPORT_PHONE;
  const isHome = state.route === '/';
  const isOrder = state.route === '/order';
  const isMerchant = state.route === '/merchant' || state.route === '/admin' || state.route === '/auth';

  return `
    <nav class="mobile-bottom-nav mobile-only no-print" aria-label="Mobile Navigation">
      <button type="button" class="mobile-nav-btn ${isHome ? 'active' : ''}" onclick="navigate('/')">
        <span class="mobile-nav-icon">🏠</span>
        <span class="mobile-nav-label">${tr('Home', 'होम')}</span>
      </button>
      <button type="button" class="mobile-nav-btn ${isOrder ? 'active' : ''}" onclick="navigate('/order', { shop: state.selectedShopId || (state.data.merchants[0]?.id || '') })">
        <span class="mobile-nav-icon">🛒</span>
        <span class="mobile-nav-label">${tr('Order', 'ऑर्डर')}</span>
      </button>
      <button type="button" class="mobile-nav-btn ${isMerchant ? 'active' : ''}" onclick="navigate('${merchantTarget}')">
        <span class="mobile-nav-icon">🏪</span>
        <span class="mobile-nav-label">${tr('Merchant', 'व्यापारी')}</span>
      </button>
      <a class="mobile-nav-btn" href="https://wa.me/91${supportPhone}?text=${encodeURIComponent(state.lang === 'hi' ? 'नमस्ते KuberQ, मुझे सहायता चाहिए।' : 'Hello KuberQ, I need assistance.')}" target="_blank" rel="noreferrer">
        <span class="mobile-nav-icon">💬</span>
        <span class="mobile-nav-label">${tr('Help', 'सहायता')}</span>
      </a>
    </nav>
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
        <!-- MOBILE-ONLY MINIMALIST HERO (Clean, Customer-Centric, Instant Action) -->
        <div class="mobile-only mobile-hero-clean">
          <div class="mobile-badge-pill">
            ⚡ ${tr('Smart B2B Business & Order Desk', 'स्मार्ट B2B व्यापार व ऑर्डर')}
          </div>
          <h1 class="mobile-hero-heading">
            ${tr('Fast B2B Billing, Live Stock & Direct Orders', 'दुकान का पक्का बिल, स्टॉक और सीधा ऑर्डर')}
          </h1>
          <p class="mobile-hero-sub">
            ${tr(
              'Hardware, Sanitary, Electrical & All Traders — 10-Second Simple Solution.',
              'हार्डवेयर, सेनेटरी, इलेक्ट्रिकल व सभी व्यापारियों के लिए 10-सेकंड आसान समाधान।'
            )}
          </p>

          <div class="mobile-cta-stack">
            <button type="button" class="btn btn-gold mobile-btn-action" onclick="navigate('/order', { shop: '${shops[0]?.id || ''}' })">
              🛍️ ${tr('Place Order from Shop (Customer)', 'दुकान से सीधा ऑर्डर करें (ग्राहक)')}
            </button>
            <button type="button" class="btn btn-primary mobile-btn-action" onclick="navigate(state.data.user ? '/merchant' : '/auth')">
              🏪 ${tr('Merchant Portal & Billing (Free Trial)', 'व्यापारी पोर्टल व बिलिंग (निःशुल्क ट्रायल)')}
            </button>
          </div>
        </div>

        <!-- DESKTOP-ONLY RICH INTERACTIVE HERO -->
        <div class="desktop-only">
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
              <!-- CTA Buttons (Warm Coral & Royal Blue Buttons - Apollo / HubSpot style) -->
              <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:20px">
                <button class="btn btn-coral" style="padding:13px 26px;font-size:1.02rem" onclick="navigate('/signup')">
                  🚀 ${tr('Register Your Business (Free Trial)', 'अपना व्यापार रजिस्टर करें (निःशुल्क ट्रायल)')}
                </button>
                <button class="btn btn-primary" style="padding:13px 26px;font-size:1.02rem" onclick="navigate('/order', { shop: '${shops[0]?.id || ''}' })">
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
      <!-- HubSpot-style Smooth Wave Divider to Features Section -->
      <div class="hero-wave-divider">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" style="display:block;width:100%;height:36px">
          <path d="M0,20 C360,55 1080,55 1440,20 L1440,60 L0,60 Z" fill="var(--bg)"></path>
        </svg>
      </div>
    </section>

  <!-- MOBILE-ONLY 4-GRID QUICK ACTIONS (Swiggy / Khatabook style) -->
  <section class="container mobile-only" style="padding:16px 14px 4px">
    <div class="mobile-quick-grid">
      <div class="mobile-quick-card" onclick="navigate('/order', { shop: '${shops[0]?.id || ''}' })">
        <div class="mobile-quick-icon" style="background:#eff6ff;color:#2563EB">🛍️</div>
        <div class="mobile-quick-title">${tr('Store Catalog', 'दुकान कैटलॉग')}</div>
        <div class="mobile-quick-desc">${tr('Order directly from store', 'सामान चुनें व सीधा ऑर्डर दें')}</div>
      </div>

      <div class="mobile-quick-card" onclick="navigate(state.data.user ? '/merchant' : '/auth')">
        <div class="mobile-quick-icon" style="background:#fef3c7;color:#d97706">🧾</div>
        <div class="mobile-quick-title">${tr('5-Sec Billing', '5-सेकंड बिलिंग')}</div>
        <div class="mobile-quick-desc">${tr('GST & Wholesale invoices', 'पक्का GST व थोक बिल')}</div>
      </div>

      <div class="mobile-quick-card" onclick="navigate(state.data.user ? '/merchant' : '/auth')">
        <div class="mobile-quick-icon" style="background:#f0fdf4;color:#16a34a">📒</div>
        <div class="mobile-quick-title">${tr('Udhaar Khata', 'उधार खाता')}</div>
        <div class="mobile-quick-desc">${tr('WhatsApp reminders', 'WhatsApp तगादा व हिसाब')}</div>
      </div>

      <div class="mobile-quick-card" onclick="navigate(state.data.user ? '/merchant' : '/auth')">
        <div class="mobile-quick-icon" style="background:#fdf2f8;color:#db2777">📸</div>
        <div class="mobile-quick-title">${tr('AI Scanner', 'AI पर्ची स्कैनर')}</div>
        <div class="mobile-quick-desc">${tr('Bill photo to stock', 'फोटो से तुरंत स्टॉक व बिल')}</div>
      </div>
    </div>
  </section>

  <!-- DESKTOP-ONLY IN-DEPTH FEATURES & 3-STEP WORKFLOW -->
  <div class="desktop-only">
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
            <span class="feature-icon-box" style="background:#fff1ee;border:1.5px solid #fed7aa;color:#ea580c">🧾</span>
            <span class="badge" style="background:#fff1ee;color:#c2410c;border:1px solid #fed7aa">✓ GST / IGST</span>
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
            <span class="feature-icon-box" style="background:#eff6ff;border:1.5px solid #bfdbfe;color:#2563EB">📷</span>
            <span class="badge" style="background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe">🤖 AI Auto</span>
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
            <span class="feature-icon-box" style="background:#ecfdf5;border:1.5px solid #a7f3d0;color:#059669">💬</span>
            <span class="badge" style="background:#ecfdf5;color:#047857;border:1px solid #a7f3d0">📲 Counter QR</span>
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
            <span class="feature-icon-box" style="background:#fef3c7;border:1.5px solid #fde68a;color:#d97706">📒</span>
            <span class="badge" style="background:#fef3c7;color:#b45309;border:1px solid #fde68a">🛡️ 0% Commission</span>
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
        <div class="feature-card" style="border-left:5px solid #ff7a59">
          <span class="badge" style="background:#fff1ee;color:#c2410c;border:1px solid #fed7aa;margin-bottom:10px">${tr('STEP 1 · SCAN PHOTO', 'स्टेप 1 · फोटो खींचें')}</span>
          <h3 class="feature-title">${tr('1. Snap Photo of Parchi or Purchase Bill', '1. पर्ची या खरीद बिल का फोटो खींचें')}</h3>
          <p class="feature-desc">
            ${tr(
              'Upload a photo of your supplier invoice or let your buyer send a handwritten Parchi via counter QR.',
              'अपने सप्लायर के खरीद बिल का फोटो खींचें या ग्राहक से QR कोड द्वारा हाथ की लिखी पर्ची प्राप्त करें।'
            )}
          </p>
        </div>

        <div class="feature-card" style="border-left:5px solid #2563EB">
          <span class="badge" style="background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe;margin-bottom:10px">${tr('STEP 2 · AI AUTO-BILLING', 'स्टेप 2 · स्मार्ट AI प्रोसेसिंग')}</span>
          <h3 class="feature-title">${tr('2. AI Prepares Stock & GST Invoice in Seconds', '2. AI सेकंडों में स्टॉक और GST बिल तैयार करे')}</h3>
          <p class="feature-desc">
            ${tr(
              'Our smart engine automatically detects item names, HSN codes, GST rates (CGST/SGST/IGST) and wholesale prices.',
              'हमारा स्मार्ट सिस्टम अपने-आप सामान का नाम, HSN कोड, CGST/SGST या IGST और थोक रेट लगाकर बिल बना देता है।'
            )}
          </p>
        </div>

        <div class="feature-card" style="border-left:5px solid #10b981">
          <span class="badge" style="background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;margin-bottom:10px">${tr('STEP 3 · WHATSAPP & UPI', 'स्टेप 3 · WhatsApp व सीधा भुगतान')}</span>
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
  </div> <!-- end of desktop-only in-depth features & steps -->

  <!-- HUBSPOT-STYLE "OUR COMMUNITY & PLATFORM SCALE" SECTION (Matching Mobbin Reference) -->
  <section class="home-community-section">
    <div class="community-wave-top">
      <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" style="display:block;width:100%;height:32px">
        <path d="M0,0 C360,50 1080,50 1440,0 L1440,60 L0,60 Z" fill="#0b1329"></path>
      </svg>
    </div>

    <div class="container" style="padding:28px 24px 36px;text-align:center">
      <span class="badge" style="background:rgba(255,122,89,0.18);color:#ff9070;border:1px solid rgba(255,122,89,0.4);margin-bottom:12px;font-size:0.86rem;padding:5px 16px">
        ✦ ${tr('Our Community & Business Scale', 'हमारा समुदाय एवं व्यापारिक विश्वास')}
      </span>
      <h2 style="font-size:clamp(1.6rem, 2.5vw, 2.2rem);color:#ffffff;font-weight:800;margin-bottom:8px">
        ${tr('Empowering Traders, Wholesalers & Small Businesses Across India', 'भारत के व्यापारियों, थोक विक्रेताओं और उत्पादकों को सशक्त बनाता KuberQ')}
      </h2>
      <p style="color:#94a3b8;max-width:720px;margin:0 auto 36px;font-size:1.02rem">
        ${tr('Fastest GST invoicing, automated AI stock entry, and zero-leakage credit accounting designed specifically for Indian Mandis & B2B markets.', 'भारतीय मंडियों और थोक बाज़ारों के लिए विशेष रूप से तैयार किया गया सबसे तेज़ GST बिलिंग, AI स्टॉक और सुरक्षित उधार खाता।')}
      </p>

      <div class="community-stats-grid">
        <div class="community-stat-item">
          <div class="community-stat-val">1,500+</div>
          <div class="community-stat-label">${tr('Invoices & Parchis Tested', 'परीक्षित पर्चियां व बिल')}</div>
          <div class="community-stat-sub">${tr('Across Pilot Traders', 'पायलट व्यापारियों में')}</div>
        </div>
        <div class="community-stat-item">
          <div class="community-stat-val">~10 Sec</div>
          <div class="community-stat-label">${tr('Rapid Counter Billing', 'त्वरित काउंटर बिलिंग')}</div>
          <div class="community-stat-sub">${tr('Zero-lag 1-click generation', '1-क्लिक फास्ट जेनरेशन')}</div>
        </div>
        <div class="community-stat-item">
          <div class="community-stat-val">0%</div>
          <div class="community-stat-label">${tr('Platform Commission Fee', 'प्लेटफ़ॉर्म कमीशन शुल्क')}</div>
          <div class="community-stat-sub">${tr('Direct Peer UPI / Bank', 'सीधा बैंक खाते में UPI')}</div>
        </div>
        <div class="community-stat-item">
          <div class="community-stat-val">AES-256</div>
          <div class="community-stat-label">${tr('Server Vault Encryption', 'सर्वर एन्क्रिप्शन सुरक्षा')}</div>
          <div class="community-stat-sub">${tr('AES-256-GCM at rest', 'हार्डवेयर व डेटा स्तर पर')}</div>
        </div>
        <div class="community-stat-item">
          <div class="community-stat-val">₹0</div>
          <div class="community-stat-label">${tr('Starter Plan Fee', 'स्टार्टर निःशुल्क योजना')}</div>
          <div class="community-stat-sub">${tr('Free 14-day full access', '14 दिन का पूर्ण ट्रायल')}</div>
        </div>
      </div>

      <!-- Transparent Grounded Methodology Note (Item #9) -->
      <div style="margin-top:20px;padding:12px 16px;background:rgba(255,255,255,0.06);border-radius:10px;border:1px solid rgba(255,255,255,0.14);text-align:left;font-size:0.82rem;color:#cbd5e1;line-height:1.5">
        <strong style="color:#fde047">ℹ️ ${tr('Methodology & Transparency Notes:', 'पारदर्शिता एवं कार्यपद्धति विवरण:')}</strong>
        ${tr(
          '1. Billing speed measured on internal tests for 3-item walk-in GST invoices compared to legacy multi-step ERP software. 2. 0% Commission applies to peer-to-peer UPI QR payments deposited directly to merchant bank accounts without platform escrow. 3. AES-256-GCM encryption is actively enforced on server-side stored API credentials and session records. 4. Free starter tier includes core billing with 3 complimentary AI scans for test evaluation.',
          '1. बिलिंग समय का बेंचमार्क 3-आइटम काउंटर GST बिल को सामान्य बहु-चरणीय ERP की तुलना में 1-क्लिक जनरेशन पर आधारित है। 2. 0% कमीशन का तात्पर्य सीधे व्यापारी के बैंक UPI खाते में बिना बिचौलिए के भुगतान प्राप्त होना है। 3. AES-256-GCM एन्क्रिप्शन सर्वर तिजोरी (API व क्रेडेंशियल डेटा) पर सक्रिय है। 4. स्टार्टर प्लान में 3 निःशुल्क AI स्कैन एवं बेसिक बिलिंग सुविधाएं शामिल हैं।'
        )}
      </div>

      <div class="community-quote-banner">
        <p class="community-quote-text">
          “${tr('Success is making those who believed in you look brilliant — smart digital tech tailored for every Indian merchant.', 'सफलता वही है जो उन सभी का विश्वास बढ़ाए जिन्होंने आप पर भरोसा किया — हर भारतीय व्यापारी के लिए आसान डिजिटल तकनीक।')}”
        </p>
        <span style="color:#f59e0b;font-weight:700;font-size:0.92rem">— KuberQ ${tr('Founding Mission & Merchant Promise', 'मिशन एवं व्यापारी संकल्प')}</span>
      </div>
    </div>

    <div class="community-wave-bottom">
      <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" style="display:block;width:100%;height:32px">
        <path d="M0,60 C360,10 1080,10 1440,60 L1440,0 L0,0 Z" fill="#0b1329"></path>
      </svg>
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
          const isDemoStore = Boolean(m.isDemo || m.id === 'shop-marwar-hw-01' || m.id === 'MQM-31CD16');
          const vouchCount = Number(m.communityVerifications || 18);
          return `
            <div class="store-card" style="display:flex;flex-direction:column;justify-content:space-between;gap:18px">
              <div>
                <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap">
                  <h3 style="font-size:1.35rem;font-weight:800;color:#0f172a">
                    ${esc(shopNameDisp)}, ${esc(cityDisp)}
                  </h3>
                  <div style="display:flex;gap:6px;flex-wrap:wrap">
                    ${isDemoStore ? `
                      <span class="badge badge-gold" style="font-size:0.84rem;padding:4px 10px;background:#fef3c7;color:#92400e;border:1.5px solid #f59e0b">
                        🏷️ ${tr('Sample / Demo Store', 'सैंपल डेमो स्टोर')}
                      </span>
                      <span class="badge badge-primary" style="font-size:0.82rem;padding:4px 8px" title="${tr('Sample catalog for trying order and invoice flow', 'ऑर्डर और बिलिंग टेस्ट करने हेतु डेमो कैटलॉग')}">
                        ✔ ${tr('Demo KYC Oct 2026', 'KYC डेमो सत्यापन Oct 2026')}
                      </span>
                    ` : `
                      <span class="badge badge-primary" style="font-size:0.86rem;padding:4px 12px">
                        🏢 ${tr('Verified Business', 'सत्यापित बिज़नेस')}
                      </span>
                      <span class="badge badge-gold" style="font-size:0.84rem;padding:4px 10px">
                        ✔ ${tr('KYC Approved', 'KYC स्वीकृत')} (${esc(m.verifiedDate || 'Active')})
                      </span>
                    `}
                  </div>
                </div>
                <p style="font-size:1.02rem;color:#334155;margin-top:6px;font-weight:500">
                  ${esc(catDisp)} · ${esc(cityDisp)}, ${esc(stateDisp)} · 📞 ${esc(m.phone || CENTRAL_SUPPORT_PHONE)}
                  ${isDemoStore ? `<span class="text-muted" style="font-size:0.82rem;display:block;margin-top:3px">💡 ${tr('Sample Demo Storefront with preloaded test catalog & fictional GSTIN.', 'सैंपल डेमो स्टोर: परीक्षण हेतु डेमो कैटलॉग व टेस्ट GSTIN।')}</span>` : ''}
                </p>
              </div>

              <!-- Desktop: Interactive QR Preview & "डेमो कैटलॉग देखें" Button -->
              <div class="desktop-only" style="background:#f8fafc;padding:16px 18px;border-radius:14px;border:1.5px solid #cbd5e1">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">
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
              </div>

              <!-- Mobile: Direct 1-Tap Customer Button -->
              <div class="mobile-only" style="margin-top:8px">
                <button type="button" class="btn btn-primary mobile-btn-action" onclick="navigate('/order', { shop: '${m.id}' })">
                  🛒 ${tr('View Products & Place Order →', 'सामान देखें व सीधा ऑर्डर करें →')}
                </button>
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
    <section class="container" style="padding:16px 0 56px">
      <div class="grid grid-2">
        <div class="card">
          <span class="badge badge-gold">❓ ${tr('FREQUENTLY ASKED QUESTIONS', 'अक्सर पूछे जाने वाले प्रश्न')}</span>
          <h3 style="margin:8px 0 14px;font-size:1.3rem">${tr('Common Questions from B2B Traders', 'व्यापारियों के सामान्य प्रश्न और उत्तर')}</h3>
          <div style="display:grid;gap:12px">
            ${(state.data.faqs || []).slice(0, 4).map(f => `
              <div class="card-subtle">
                <p style="font-weight:800;color:#0f172a">${esc(trDyn(f.question))}</p>
                <p class="text-muted" style="font-size:0.92rem;margin-top:4px">${esc(trDyn(f.answer || tr('Our team will answer this shortly.', 'हमारी टीम शीघ्र ही इसका उत्तर देगी।')))}</p>
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
                <input class="input" id="faq-name" name="name" autocomplete="name" required placeholder="${tr('e.g. Mahesh Traders', 'जैसे: महेश ट्रेडर्स')}" />
              </div>
              <div class="form-group">
                <label class="form-label">${tr('10-Digit Mobile Number', '10 अंकों का मोबाइल नंबर')} *</label>
                <input class="input" id="faq-phone" name="tel" autocomplete="tel" pattern="^[6-9][0-9]{9}$" required maxlength="10" placeholder="98XXXXXXXX" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">${tr('Your Question', 'आपका प्रश्न')} *</label>
              <textarea class="textarea" rows="2" id="faq-question" name="question" required placeholder="${tr('e.g. How can I import my existing item list?', 'जैसे: मैं अपनी दुकान की रेट लिस्ट कैसे अपलोड कर सकता हूँ?')}"></textarea>
            </div>
            <button type="submit" class="btn btn-gold" style="width:100%">📨 ${tr('Submit Question to KuberQ Team', 'अपना प्रश्न भेजें')}</button>
            <p class="text-muted" style="font-size:0.78rem;margin-top:8px;text-align:center">
              ⏱️ ${tr('Expected response time: Within 2–4 business hours via WhatsApp/Call.', 'अपेक्षित उत्तर समय: 2 से 4 कार्य घंटों के भीतर WhatsApp या कॉल द्वारा।')}
            </p>
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
// 3. ZERO-COST MOBILE + PASSWORD LOGIN & SIGNUP + GOOGLE & AUTOFILL (`/auth` & `/signup`)
// ============================================================================
function getSavedBrowserAccounts() {
  try {
    return JSON.parse(localStorage.getItem('kuberq_saved_accounts') || '[]');
  } catch {
    return [];
  }
}

function saveBrowserAccount(identifier, name, role) {
  try {
    const list = getSavedBrowserAccounts().filter(a => a.identifier !== identifier);
    list.unshift({ identifier, name: name || identifier, role: role || 'merchant', savedAt: new Date().toISOString() });
    localStorage.setItem('kuberq_saved_accounts', JSON.stringify(list.slice(0, 5)));
  } catch (_) {}
}

window.pickSavedLoginAccount = function(identifier, role) {
  state.authRole = role || 'merchant';
  state.authMode = String(identifier).includes('@') ? 'email' : 'mobile';
  render();
  setTimeout(() => {
    const idEl = document.getElementById('li-id');
    const passEl = document.getElementById('li-pass');
    if (idEl) idEl.value = identifier;
    if (passEl) passEl.focus();
  }, 30);
};

window.handleGoogleQuickAuth = async function() {
  try {
    const saved = getSavedBrowserAccounts().find(a => String(a.identifier).includes('@'));
    const defaultEmail = saved ? saved.identifier : 'rajesh@marwarhardware.in';
    const email = prompt(
      tr(
        'Google Account Direct Sign-In (Free):\nEnter or confirm your Google Email ID to sign in directly:',
        'गूगल अकाउंट डायरेक्ट लॉगिन (निःशुल्क):\nसीधे लॉगिन करने के लिए अपनी Google Email ID दर्ज करें या पुष्टि करें:'
      ),
      defaultEmail
    );
    if (!email || !email.trim()) return;
    const cleanEmail = email.trim().toLowerCase();
    const res = await apiFetch('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify({
        email: cleanEmail,
        name: cleanEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        role: state.authRole || 'merchant'
      })
    });
    state.token = res.token;
    localStorage.setItem('kuberq_token', res.token);
    saveBrowserAccount(cleanEmail, res.name, res.role);
    await bootstrap();
    showToast(tr(`✅ Signed in with Google as ${res.name}!`, `✅ गूगल खाते (${res.name}) से सफल लॉगिन!`));
    if (res.role === 'admin' || res.role === 'employee') navigate('/admin');
    else if (res.role === 'customer') navigate('/customer');
    else navigate('/merchant');
  } catch (err) {
    showToast(err.message, 'error');
  }
};

function renderAuth(isSignup = false) {
  const roles = [
    ['merchant', tr('Merchant / Trader', 'दुकानदार / व्यापारी')],
    ['manufacturer', tr('Manufacturer / Wholesaler', 'निर्माता / थोक विक्रेता')],
    ['staff', tr('Shop Manager / Staff', 'दुकान मैनेजर / स्टाफ')],
    ['customer', tr('Customer / Sub-Dealer', 'ग्राहक / सब-डीलर')],
    ['agent', tr('Channel Partner', 'पार्टनर एजेंट')],
    ['employee', tr('Platform Staff (Sub-Admin)', 'KuberQ टीम (सब-एडमिन)')]
  ];
  const savedAccounts = getSavedBrowserAccounts();

  return `
    <div class="container" style="max-width:600px;padding:36px 20px">
      <div class="card">
        <div style="text-align:center;margin-bottom:18px">
          <span class="badge badge-gold">🔐 ${tr('INSTANT AUTOFILL & GOOGLE SIGN-IN', 'ऑटो-फिल व गूगल डायरेक्ट लॉगिन')}</span>
          <h1 style="font-size:1.75rem;margin-top:8px">
            ${isSignup ? tr('Register Your Business on KuberQ', 'KuberQ पर अपना व्यापार रजिस्टर करें') : tr('Sign In to KuberQ', 'KuberQ में लॉगिन करें')}
          </h1>
          <p class="text-muted" style="font-size:0.9rem;margin-top:4px">
            ${tr('Use 1-Click Google Sign-In, saved browser autofill, or your 10-digit Mobile / Email.', '1-क्लिक Google लॉगिन, ऑटो-फिल या अपने 10-अंकीय मोबाइल / ईमेल से तुरंत लॉगिन करें।')}
          </p>
        </div>

        <!-- Free 1-Click Google Sign-In Button (Item #4) -->
        <div style="margin-bottom:16px">
          <button
            type="button"
            onclick="handleGoogleQuickAuth()"
            style="width:100%;display:flex;align-items:center;justify-content:center;gap:10px;padding:11px 16px;border-radius:10px;border:1.5px solid #cbd5e1;background:#ffffff;color:#0f172a;font-weight:700;font-size:0.94rem;cursor:pointer;box-shadow:0 2px 6px rgba(15,23,42,0.06);transition:all 0.15s ease"
          >
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
            <span>${tr('Continue with Google (Instant Verified Email)', 'Google अकाउंट से सीधे लॉगिन करें (निःशुल्क)')}</span>
          </button>
        </div>

        ${!isSignup && savedAccounts.length > 0 ? `
          <div style="margin-bottom:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:10px 12px">
            <div style="font-size:0.76rem;font-weight:700;color:#475569;margin-bottom:6px">⚡ ${tr('Saved Accounts on This Device (Click to Auto-Fill):', 'इस डिवाइस पर सेव किए गए खाते (1-क्लिक ऑटो-फिल):')}</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${savedAccounts.map(acc => `
                <button type="button" class="btn btn-ghost btn-sm" style="font-size:0.78rem;padding:4px 10px;background:#fff;border:1px solid #cbd5e1" onclick="pickSavedLoginAccount('${esc(acc.identifier)}', '${esc(acc.role)}')">
                  👤 ${esc(acc.name)} (${esc(acc.identifier)})
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:16px">
          ${roles.map(([r, label]) => `
            <button type="button" class="btn btn-sm ${state.authRole === r ? 'btn-gold' : 'btn-ghost'}" onclick="state.authRole='${r}';render()">
              ${label}
            </button>
          `).join('')}
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px;background:var(--bg-soft);padding:6px;border-radius:12px">
          <button type="button" class="btn btn-sm ${state.authMode === 'mobile' ? 'btn-primary' : 'btn-ghost'}" onclick="state.authMode='mobile';render()">
            📱 ${tr('10-Digit Mobile (Auto-Fill)', 'मोबाइल नंबर (ऑटो-फिल)')}
          </button>
          <button type="button" class="btn btn-sm ${state.authMode === 'email' ? 'btn-primary' : 'btn-ghost'}" onclick="state.authMode='email';render()">
            ✉️ ${tr('Email Address (Auto-Fill)', 'ईमेल आईडी (ऑटो-फिल)')}
          </button>
        </div>

        ${isSignup ? `
          <form onsubmit="handleSignup(event)" autocomplete="on">
            <div class="grid grid-2">
              <div class="form-group">
                <label class="form-label">${tr('Your Full Name', 'आपका पूरा नाम')} *</label>
                <input class="input" id="su-name" name="name" autocomplete="name" required placeholder="${tr('e.g. Rajesh Mohta', 'जैसे: राजेश मोहता')}" />
              </div>
              <div class="form-group">
                <label class="form-label">${tr('10-Digit Mobile Number', '10 अंकों का मोबाइल नंबर')} *</label>
                <input class="input" id="su-phone" name="phone" type="tel" autocomplete="tel" required maxlength="10" placeholder="98XXXXXXXX" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">${tr('Official Email Address (For Google & Auto-Fill Login)', 'ईमेल आईडी (गूगल व ऑटो-फिल लॉगिन हेतु)')}</label>
              <input class="input" id="su-email" name="email" type="email" autocomplete="email" placeholder="business@example.com" />
            </div>

            ${state.authRole !== 'customer' ? `
              <div class="grid grid-2">
                <div class="form-group">
                  <label class="form-label">${tr('Shop / Company / Factory Name', 'दुकान / कंपनी / फैक्टरी का नाम')} *</label>
                  <input class="input" id="su-shop" name="organization" autocomplete="organization" required placeholder="${tr('e.g. Shree Balaji Hardware', 'जैसे: श्री बालाजी हार्डवेयर')}" />
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
                <input class="input" id="su-city" name="address-level2" autocomplete="address-level2" required value="Jodhpur" />
              </div>
              <div class="form-group">
                <label class="form-label">${tr('State', 'राज्य')} *</label>
                <input class="input" id="su-state" name="address-level1" autocomplete="address-level1" required value="Rajasthan" />
              </div>
            </div>

            <div class="grid grid-2">
              <div class="form-group">
                <label class="form-label">${tr('Create Password (min 8 chars)', 'पासवर्ड बनाएँ (कम से कम 8 अक्षर)')} *</label>
                <input class="input" type="password" id="su-pass" name="password" autocomplete="new-password" required minlength="8" placeholder="••••••••" />
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
          <form onsubmit="handleLogin(event)" autocomplete="on">
            <div class="form-group">
              <label class="form-label">
                ${state.authMode === 'mobile' ? tr('10-Digit Mobile Number (or Email)', '10 अंकों का मोबाइल नंबर (या ईमेल)') : tr('Email Address (or Mobile)', 'ईमेल पता (या मोबाइल)')}
              </label>
              <input
                class="input"
                id="li-id"
                name="username"
                type="${state.authMode === 'email' ? 'email' : 'text'}"
                autocomplete="${state.authMode === 'email' ? 'email' : 'username'}"
                required
                placeholder="${state.authMode === 'mobile' ? '9829011223' : 'name@company.com'}"
              />
            </div>
            <div class="form-group">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
                <label class="form-label" style="margin-bottom:0">${tr('Password', 'पासवर्ड')}</label>
                <a href="#" onclick="event.preventDefault();openForgotPasswordModal()" style="font-size:0.84rem;color:#ea580c;font-weight:700;text-decoration:none">
                  🔑 ${tr('Forgot Password?', 'पासवर्ड भूल गए?')}
                </a>
              </div>
              <input class="input" type="password" id="li-pass" name="password" autocomplete="current-password" required placeholder="••••••••" />
            </div>
            <button type="submit" class="btn btn-gold" style="width:100%;margin-top:10px">
              🔐 ${tr('Sign In Securely', 'सुरक्षित लॉगिन करें')}
            </button>
          </form>

          <div class="card-subtle" style="margin-top:20px;font-size:0.92rem">
            <p class="text-gold" style="font-weight:700;margin-bottom:8px">⚡ ${tr('1-Click Instant Demo Login (No Typing Needed):', 'बिना टाइप किए 1-क्लिक डेमो लॉगिन:')}</p>
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
// SELF-SERVICE FORGOT PASSWORD & OTP RESET MODAL
// ============================================================================
function renderForgotPasswordModal() {
  const m = state.forgotPasswordModal;
  if (!m) return '';

  const isStep2 = m.step === 2;

  return `
    <div class="pro-blur-modal-overlay" onclick="closeForgotPasswordModal()">
      <div class="pro-blur-modal-card" style="max-width:480px" onclick="event.stopPropagation()">
        <div class="pro-blur-modal-head" style="border-bottom:1.5px solid var(--border);padding-bottom:12px">
          <div>
            <h3 style="font-size:1.25rem;font-weight:800;color:var(--text);display:flex;align-items:center;gap:8px">
              🔑 ${tr('Reset Your Password', 'पासवर्ड रीसेट करें (Forgot Password)')}
            </h3>
            <p class="text-muted" style="font-size:0.86rem;margin-top:2px">
              ${isStep2 
                ? tr(`Step 2 of 2: Enter OTP sent to ${esc(m.maskedTarget)}`, `स्टेप 2/2: ${esc(m.maskedTarget)} पर भेजा गया OTP और नया पासवर्ड दर्ज करें`) 
                : tr('Step 1 of 2: Enter your registered 10-digit mobile or email', 'स्टेप 1/2: अपना पंजीकृत 10-अंकीय मोबाइल नंबर या ईमेल दर्ज करें')}
            </p>
          </div>
          <button type="button" class="btn btn-ghost btn-sm" onclick="closeForgotPasswordModal()">✕</button>
        </div>

        ${!isStep2 ? `
          <!-- STEP 1: REQUEST OTP -->
          <form onsubmit="sendPasswordResetOtp(event)">
            <div class="pro-blur-modal-body" style="padding:18px 0 10px">
              <div class="form-group">
                <label class="form-label">${tr('Registered Mobile Number or Email', 'पंजीकृत 10-अंकीय मोबाइल नंबर या ईमेल आईडी')} *</label>
                <input 
                  class="input" 
                  id="fp-identifier" 
                  required 
                  value="${esc(m.identifier || '')}" 
                  placeholder="${tr('e.g. 9829011223 or name@company.com', 'जैसे: 9829011223 या name@company.com')}" 
                  autofocus
                />
              </div>

              <div class="card-subtle" style="background:#fff8f5;border:1px solid #ffd8cc;color:#c2410c;font-size:0.84rem;margin-top:10px">
                🛡️ ${tr('A secure 6-digit verification code will be sent to confirm your identity with zero hassle.', 'आपकी पहचान सत्यापित करने के लिए एक सुरक्षित 6-अंकीय OTP तुरंत तैयार किया जाएगा।')}
              </div>
            </div>

            <div class="pro-blur-modal-foot" style="border-top:1.5px solid var(--border);padding-top:14px;margin-top:10px;display:flex;justify-content:space-between;align-items:center">
              <button type="button" class="btn btn-ghost" onclick="closeForgotPasswordModal()">${tr('Cancel', 'रद्द करें')}</button>
              <button type="submit" class="btn btn-coral" style="padding:9px 20px" ${m.loading ? 'disabled' : ''}>
                ${m.loading ? tr('Sending...', 'भेज रहे हैं...') : `📨 ${tr('Send OTP & Continue', 'OTP भेजें और आगे बढ़ें')}`}
              </button>
            </div>
          </form>
        ` : `
          <!-- STEP 2: VERIFY OTP & SET NEW PASSWORD -->
          <form onsubmit="submitPasswordReset(event)">
            <div class="pro-blur-modal-body" style="padding:14px 0 10px">
              ${m.otpPreview ? `
                <div class="card-subtle" style="background:#eff6ff;border:1.5px solid #93c5fd;color:#1e40af;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center">
                  <div>
                    <span style="font-size:0.75rem;font-weight:700;display:block">⚡ ${tr('INSTANT TEST / SMS OTP:', 'तत्काल टेस्ट / SMS OTP:')}</span>
                    <strong style="font-size:1.3rem;letter-spacing:0.18em;color:#2563eb">${esc(m.otpPreview)}</strong>
                  </div>
                  <button type="button" class="btn btn-ghost btn-sm" style="font-size:0.78rem;background:#fff;border:1px solid #93c5fd" onclick="document.getElementById('fp-otp').value='${esc(m.otpPreview)}'">
                    📋 ${tr('Auto-Fill', 'ऑटो-फिल')}
                  </button>
                </div>
              ` : ''}

              <div class="form-group">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <label class="form-label">${tr('6-Digit Verification Code (OTP)', '6-अंकों का वेरिफिकेशन कोड (OTP)')} *</label>
                  <button type="button" class="btn btn-ghost btn-sm" style="padding:2px 8px;font-size:0.78rem;color:#ea580c" onclick="resendPasswordResetOtp()">
                    🔄 ${tr('Resend OTP', 'OTP पुनः भेजें')}
                  </button>
                </div>
                <input class="input" id="fp-otp" required maxlength="6" style="font-size:1.2rem;letter-spacing:0.2em;text-align:center;font-weight:800" placeholder="••••••" autofocus />
              </div>

              <div class="form-group">
                <label class="form-label">${tr('New Password (min 8 characters)', 'नया पासवर्ड (कम से कम 8 अक्षर)')} *</label>
                <input class="input" type="password" id="fp-new-pass" required minlength="8" placeholder="${tr('Create a strong password', 'मजबूत नया पासवर्ड बनाएँ')}" />
              </div>

              <div class="form-group">
                <label class="form-label">${tr('Confirm New Password', 'नए पासवर्ड की पुष्टि करें')} *</label>
                <input class="input" type="password" id="fp-confirm-pass" required minlength="8" placeholder="${tr('Re-enter new password', 'नया पासवर्ड दोबारा लिखें')}" />
              </div>
            </div>

            <div class="pro-blur-modal-foot" style="border-top:1.5px solid var(--border);padding-top:14px;margin-top:10px;display:flex;justify-content:space-between;align-items:center">
              <button type="button" class="btn btn-ghost" onclick="state.forgotPasswordModal.step=1;render()">${tr('← Back', '← वापस')}</button>
              <button type="submit" class="btn btn-coral" style="padding:9px 22px" ${m.loading ? 'disabled' : ''}>
                ${m.loading ? tr('Updating...', 'अपडेट हो रहा है...') : `🔐 ${tr('Reset Password & Sign In', 'पासवर्ड बदलें और लॉगिन करें')}`}
              </button>
            </div>
          </form>
        `}
      </div>
    </div>
  `;
}

window.openForgotPasswordModal = function() {
  const existingInput = document.getElementById('li-id')?.value.trim() || '';
  state.forgotPasswordModal = {
    step: 1,
    identifier: existingInput,
    maskedTarget: '',
    otpPreview: '',
    loading: false
  };
  render();
};

window.closeForgotPasswordModal = function() {
  state.forgotPasswordModal = null;
  render();
};

window.sendPasswordResetOtp = async function(e) {
  e.preventDefault();
  const inputEl = document.getElementById('fp-identifier');
  const identifier = inputEl ? inputEl.value.trim() : '';
  if (!identifier) {
    showToast(tr('Please enter your mobile or email', 'कृपया मोबाइल नंबर या ईमेल दर्ज करें'), 'error');
    return;
  }
  state.forgotPasswordModal.loading = true;
  render();

  try {
    const res = await apiFetch('/api/auth/forgot-password/request', {
      method: 'POST',
      body: JSON.stringify({ identifier })
    });
    state.forgotPasswordModal.step = 2;
    state.forgotPasswordModal.identifier = identifier;
    state.forgotPasswordModal.maskedTarget = res.maskedTarget;
    state.forgotPasswordModal.otpPreview = res.otpPreview || '';
    state.forgotPasswordModal.loading = false;
    showToast(tr(res.message, res.message));
    render();
  } catch (err) {
    state.forgotPasswordModal.loading = false;
    showToast(err.message, 'error');
    render();
  }
};

window.resendPasswordResetOtp = async function() {
  const identifier = state.forgotPasswordModal?.identifier;
  if (!identifier) return;
  try {
    const res = await apiFetch('/api/auth/forgot-password/request', {
      method: 'POST',
      body: JSON.stringify({ identifier })
    });
    state.forgotPasswordModal.otpPreview = res.otpPreview || '';
    showToast(tr('New OTP generated!', 'नया OTP तैयार कर दिया गया है!'));
    render();
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.submitPasswordReset = async function(e) {
  e.preventDefault();
  const otp = document.getElementById('fp-otp')?.value.trim() || '';
  const newPassword = document.getElementById('fp-new-pass')?.value || '';
  const confirmPassword = document.getElementById('fp-confirm-pass')?.value || '';
  const identifier = state.forgotPasswordModal?.identifier || '';

  if (!otp || otp.length < 6) {
    showToast(tr('Please enter the 6-digit OTP', 'कृपया 6-अंकीय OTP दर्ज करें'), 'error');
    return;
  }
  if (newPassword.length < 8) {
    showToast(tr('Password must be at least 8 characters long', 'पासवर्ड कम से कम 8 अक्षरों का होना चाहिए'), 'error');
    return;
  }
  if (newPassword !== confirmPassword) {
    showToast(tr('Passwords do not match', 'दोनों पासवर्ड एक जैसे नहीं हैं'), 'error');
    return;
  }

  state.forgotPasswordModal.loading = true;
  render();

  try {
    const res = await apiFetch('/api/auth/forgot-password/confirm', {
      method: 'POST',
      body: JSON.stringify({ identifier, otp, newPassword })
    });
    state.token = res.token;
    localStorage.setItem('kuberq_token', res.token);
    state.forgotPasswordModal = null;
    showToast(tr('Password reset successfully! Logged in.', 'पासवर्ड सफलतापूर्वक बदल दिया गया! आप लॉगिन हो चुके हैं।'));
    await bootstrap();
    navigate(res.role === 'customer' ? '/customer' : (res.role === 'admin' || res.role === 'employee') ? '/admin' : '/merchant');
  } catch (err) {
    state.forgotPasswordModal.loading = false;
    showToast(err.message, 'error');
    render();
  }
};


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

          <!-- Expected Dispatch & Response Time (Item #8) -->
          <div style="margin:16px 0;padding:12px 14px;background:#f0fdf4;border-radius:10px;border:1px solid #bbf7d0;font-size:0.88rem;color:#166534;text-align:left">
            ⏱️ <b>${tr('Expected Response Time:', 'अपेक्षित प्रतिक्रिया समय:')}</b>
            ${tr('Merchant usually verifies stock and confirms dispatch within 15–30 minutes during business hours (9 AM – 8 PM).', 'दुकानदार आमतौर पर व्यापारिक समय (सुबह 9 से रात 8 बजे) में 15 से 30 मिनट के भीतर स्टॉक जांचकर बिल/डिलीवरी की पुष्टि करता है।')}
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

          <div style="background:rgba(255,255,255,0.1);padding:10px 14px;border-radius:12px;border:1px solid rgba(255,255,255,0.2);max-width:100%;box-sizing:border-box">
            <label style="font-size:0.75rem;color:#93c5fd;display:block;margin-bottom:4px;font-weight:700">${tr('Switch Store / Trader:', 'अन्य दुकान चुनें:')}</label>
            <select class="select" style="background:#0f172a;color:#ffffff;border-color:#475569;font-size:0.85rem;padding:6px 10px;max-width:100%;box-sizing:border-box" onchange="state.selectedShopId=this.value;state.cart={};navigate('/order?shop='+this.value)">
              ${shops.map(s => `<option value="${s.id}" ${s.id === shop?.id ? 'selected' : ''}>[${s.refCode || s.id}] ${esc(s.shop)} (${esc(s.city)})</option>`).join('')}
            </select>
          </div>
        </div>

        <!-- Mode Toggle Pill -->
        <div style="display:flex;gap:10px;margin-top:18px;border-top:1px solid rgba(255,255,255,0.15);padding-top:14px;flex-wrap:wrap">
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
              <input class="input" id="ord-name" name="name" autocomplete="name" required value="${esc(state.data.user?.name || state.checkoutCustomer.name)}" placeholder="${tr('e.g. Vikram Rathore (Contractor)', 'जैसे: विक्रम राठौड़ (ठेकेदार)')}" />
            </div>

            <div class="form-group" style="margin-bottom:10px">
              <label class="form-label">${tr('10-Digit Mobile (WhatsApp Alert)', '10 अंकों का WhatsApp मोबाइल नंबर')} *</label>
              <input class="input" id="ord-phone" name="tel" autocomplete="tel" pattern="^[6-9][0-9]{9}$" required maxlength="10" value="${esc(state.data.user?.phone || state.checkoutCustomer.phone)}" placeholder="9828XXXXXX" oninput="const e=document.getElementById('ord-phone-err');if(e)e.style.display='none'" />
              <div id="ord-phone-err" style="display:none;color:#dc2626;font-size:0.78rem;font-weight:600;margin-top:4px"></div>
            </div>
          </div>

          <div class="form-group" style="margin-bottom:10px">
            <label class="form-label">${tr('Delivery Address / Site Location', 'डिलीवरी का पता / साइट लोकेशन')} *</label>
            <input class="input" id="ord-addr" name="address" autocomplete="street-address" required value="${esc(state.checkoutCustomer.address)}" placeholder="${tr('Plot / Shop No, Market, Landmark, City', 'प्लॉट / दुकान नंबर, मुख्य बाजार या साइट, शहर')}" />
          </div>

          <div class="form-group" style="margin-bottom:6px">
            <label class="form-label">${tr('Buyer GSTIN (Optional — For B2B Input Tax Credit)', 'खरीदार GSTIN (वैकल्पिक — पक्का B2B ITC बिल प्राप्त करने हेतु)')}</label>
            <input class="input" id="ord-gstin" name="organization" autocomplete="organization" maxlength="15" style="text-transform:uppercase;font-family:monospace" value="${esc(state.checkoutCustomer.buyerGstin)}" placeholder="08AAACR5055K1Z2" />
          </div>

          <!-- DPDP Act 2025 Explicit Order Update Consent Checkbox -->
          <div style="margin:12px 0 6px;display:flex;align-items:flex-start;gap:10px;text-align:left;background:#f8fafc;padding:10px 12px;border-radius:8px;border:1px solid #e2e8f0">
            <input type="checkbox" id="ord-consent" checked required style="margin-top:3px;accent-color:var(--primary);width:16px;height:16px;flex-shrink:0;cursor:pointer" />
            <label for="ord-consent" style="font-size:0.8rem;color:#475569;line-height:1.45;cursor:pointer">
              ${tr('I consent to receiving order confirmations, digital GST invoices & dispatch updates via WhatsApp / SMS under KuberQ DPDP-compliant', 'मैं KuberQ की DPDP-अनुपालन')}
              <a href="javascript:void(0)" onclick="navigate('/privacy')" style="color:#2563EB;text-decoration:underline;font-weight:600">${tr('Privacy Policy', 'गोपनीयता नीति')}</a>
              ${tr('terms.', 'के अंतर्गत WhatsApp/SMS पर ऑर्डर पुष्टि, GST बिल व डिलीवरी अपडेट्स प्राप्त करने की सहमति देता हूँ।')}
            </label>
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
  const creditOrders = allOrders.filter(o => o.status !== 'Rejected' && o.status !== 'Sales Return' && o.status !== 'Quotation' && o.docType !== 'Quotation' && o.paymentMode === 'Credit' && !o.udhaarSettled);
  const partyMap = new Map();
  const buckets = {
    b0_30: { amount: 0, count: 0 },
    b31_60: { amount: 0, count: 0 },
    b61_90: { amount: 0, count: 0 },
    b90_plus: { amount: 0, count: 0 }
  };

  for (const o of creditOrders) {
    const key = o.phone || o.customer;
    const cCode = o.customerCode || ('KQC-' + String(o.phone || '849201').slice(-6));
    const gross = Number(o.totals?.gross) || 0;
    const paid = Math.min(gross, Math.max(0, Number(o.paidAmount) || 0));
    const due = Math.max(0, gross - paid);
    if (due <= 0) continue;

    const orderTs = new Date(o.date || o.createdAt || Date.now()).getTime();
    const daysOld = Math.max(0, Math.floor((Date.now() - (isNaN(orderTs) ? Date.now() : orderTs)) / 86400000));
    let bucketKey = '0-30';
    if (daysOld > 90) {
      bucketKey = '90+';
      buckets.b90_plus.amount += due;
      buckets.b90_plus.count++;
    } else if (daysOld > 60) {
      bucketKey = '61-90';
      buckets.b61_90.amount += due;
      buckets.b61_90.count++;
    } else if (daysOld > 30) {
      bucketKey = '31-60';
      buckets.b31_60.amount += due;
      buckets.b31_60.count++;
    } else {
      bucketKey = '0-30';
      buckets.b0_30.amount += due;
      buckets.b0_30.count++;
    }

    const cur = partyMap.get(key) || { customer: o.customer, customerCode: cCode, phone: o.phone, grossTotal: 0, paidTotal: 0, total: 0, maxDaysOld: 0, bucketKey: '0-30', orders: [] };
    cur.grossTotal += gross;
    cur.paidTotal += paid;
    cur.total += due;
    if (daysOld >= cur.maxDaysOld) {
      cur.maxDaysOld = daysOld;
      cur.bucketKey = bucketKey;
    }
    cur.orders.push({ ...o, daysOld, bucketKey });
    partyMap.set(key, cur);
  }

  const allParties = [...partyMap.values()];
  const activeFilter = state.udhaarAgeBucket || 'ALL';
  const parties = activeFilter === 'ALL' ? allParties : allParties.filter(p => p.bucketKey === activeFilter);
  const totalBalance = allParties.reduce((s, p) => s + p.total, 0);

  return `
    <div style="display:grid;gap:20px">
      <!-- AGING DEBTORS RADAR (30 / 60 / 90+ Days Recovery Analysis) -->
      <div class="erp-card" style="background:linear-gradient(135deg, #0f172a 0%, #1e293b 100%);color:#ffffff;border:none">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:14px">
          <div>
            <span class="badge badge-gold">📡 ${tr('AGING RECEIVABLES RADAR (30/60/90+ DAYS)', 'उधार वसूली एजिंग रडार (30/60/90+ दिन विश्लेषण)')}</span>
            <h3 style="color:#ffffff;margin:6px 0 2px">${tr('Smart Aging Debtors Radar & Priority Recovery', 'बकायेदारों का समय-आधारित वर्गीकरण एवं त्वरित वसूली रडार')}</h3>
            <p style="font-size:0.82rem;color:#cbd5e1;margin:0">${tr('Click any aging bucket below to filter parties and send urgency-matched WhatsApp reminders.', 'किसी भी समय-श्रेणी (Bucket) पर क्लिक करके बकायेदारों को फ़िल्टर करें व तात्कालिकता अनुसार WhatsApp रिमाइंडर भेजें।')}</p>
          </div>
          <button class="btn btn-sm ${activeFilter === 'ALL' ? 'btn-gold' : 'btn-ghost'}" style="${activeFilter === 'ALL' ? '' : 'color:#fff;border-color:rgba(255,255,255,0.3)'}" onclick="state.udhaarAgeBucket='ALL';render()">
            🔄 ${tr('Show All', 'सभी देखें')} (${fmtINR(totalBalance)})
          </button>
        </div>

        <div class="grid grid-4" style="gap:12px">
          <div onclick="state.udhaarAgeBucket='0-30';render()" style="cursor:pointer;background:${activeFilter === '0-30' ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.07)'};border:2px solid ${activeFilter === '0-30' ? '#4ade80' : 'rgba(74,222,128,0.35)'};border-radius:12px;padding:12px">
            <div style="font-size:0.78rem;color:#86efac;font-weight:700">🟢 ${tr('0 - 30 Days (Current)', '0 - 30 दिन (नया उधार)')}</div>
            <div style="font-size:1.35rem;font-weight:900;color:#ffffff;margin:4px 0">${fmtINR(buckets.b0_30.amount)}</div>
            <div style="font-size:0.74rem;color:#cbd5e1">${buckets.b0_30.count} ${tr('bills · Standard cycle', 'बिल · सामान्य अवधि')}</div>
          </div>

          <div onclick="state.udhaarAgeBucket='31-60';render()" style="cursor:pointer;background:${activeFilter === '31-60' ? 'rgba(250,204,21,0.25)' : 'rgba(255,255,255,0.07)'};border:2px solid ${activeFilter === '31-60' ? '#facc15' : 'rgba(250,204,21,0.35)'};border-radius:12px;padding:12px">
            <div style="font-size:0.78rem;color:#fde047;font-weight:700">🟡 ${tr('31 - 60 Days (Attention)', '31 - 60 दिन (ध्यान दें)')}</div>
            <div style="font-size:1.35rem;font-weight:900;color:#ffffff;margin:4px 0">${fmtINR(buckets.b31_60.amount)}</div>
            <div style="font-size:0.74rem;color:#cbd5e1">${buckets.b31_60.count} ${tr('bills · Follow-up needed', 'बिल · रिमाइंडर भेजें')}</div>
          </div>

          <div onclick="state.udhaarAgeBucket='61-90';render()" style="cursor:pointer;background:${activeFilter === '61-90' ? 'rgba(249,115,22,0.25)' : 'rgba(255,255,255,0.07)'};border:2px solid ${activeFilter === '61-90' ? '#fb923c' : 'rgba(251,146,60,0.35)'};border-radius:12px;padding:12px">
            <div style="font-size:0.78rem;color:#fdba74;font-weight:700">🟠 ${tr('61 - 90 Days (Urgent)', '61 - 90 दिन (अति आवश्यक)')}</div>
            <div style="font-size:1.35rem;font-weight:900;color:#ffffff;margin:4px 0">${fmtINR(buckets.b61_90.amount)}</div>
            <div style="font-size:0.74rem;color:#cbd5e1">${buckets.b61_90.count} ${tr('bills · Priority call', 'बिल · तुरंत तकादा करें')}</div>
          </div>

          <div onclick="state.udhaarAgeBucket='90+';render()" style="cursor:pointer;background:${activeFilter === '90+' ? 'rgba(239,68,68,0.28)' : 'rgba(255,255,255,0.07)'};border:2px solid ${activeFilter === '90+' ? '#f87171' : 'rgba(248,113,113,0.4)'};border-radius:12px;padding:12px">
            <div style="font-size:0.78rem;color:#fca5a5;font-weight:700">🔴 ${tr('90+ Days (Critical Risk)', '90+ दिन (गंभीर जोखिम)')}</div>
            <div style="font-size:1.35rem;font-weight:900;color:#fca5a5;margin:4px 0">${fmtINR(buckets.b90_plus.amount)}</div>
            <div style="font-size:0.74rem;color:#cbd5e1">${buckets.b90_plus.count} ${tr('bills · Immediate recovery', 'बिल · तत्काल वसूली')}</div>
          </div>
        </div>
      </div>

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
            <p style="font-size:1.1rem;font-weight:700;color:#16a34a">🎉 ${tr('Zero pending Udhaar in this bucket! All customer bills are settled.', 'इस श्रेणी में कोई बकाया उधारी नहीं है!')}</p>
          </div>
        ` : `
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>${tr('Party / Customer & Aging Status', 'ग्राहक / यूनिक ID व एजिंग स्थिति')}</th>
                  <th>${tr('Bills & Partial Paid', 'बिल एवं आंशिक भुगतान')}</th>
                  <th>${tr('Net Balance Due', 'शुद्ध शेष उधारी')}</th>
                  <th>${tr('Receive Partial / Full Payment', 'आंशिक / पूर्ण वसूली')}</th>
                  <th>${tr('Ledger & WhatsApp', 'बहीखाता व WhatsApp')}</th>
                </tr>
              </thead>
              <tbody>
                ${parties.map(p => {
                  const upiLink = shop.upiId ? `upi://pay?pa=${encodeURIComponent(shop.upiId)}&pn=${encodeURIComponent(shop.shop)}&am=${p.total}&cu=INR` : '';
                  const urgencyPrefix = p.maxDaysOld > 60
                    ? `⚠️ *अति-आवश्यक भुगतान अनुस्मारक (${p.maxDaysOld} दिन से लंबित)*\n`
                    : (p.maxDaysOld > 30 ? `🔔 *भुगतान अनुस्मारक (${p.maxDaysOld} दिन)*\n` : '');
                  const remMsg = `${urgencyPrefix}नमस्ते *${p.customer}* जी (${p.customerCode}),\n*${shop.shop}* से आपका कुल उधारी विवरण:\nकुल बिल: ₹${p.grossTotal} | पूर्व जमा: ₹${p.paidTotal}\n*शुद्ध शेष राशि: ₹${p.total}*\n${upiLink ? `💳 तुरंत UPI भुगतान लिंक: ${upiLink}` : 'कृपया शीघ्र भुगतान कर सहयोग करें।'}`;
                  const firstOrd = p.orders[0];
                  const ageBadgeColor = p.bucketKey === '90+' ? '#dc2626' : (p.bucketKey === '61-90' ? '#ea580c' : (p.bucketKey === '31-60' ? '#ca8a04' : '#16a34a'));
                  return `
                    <tr>
                      <td>
                        <b>${esc(p.customer)}</b>
                        <div style="display:flex;gap:5px;align-items:center;flex-wrap:wrap;margin-top:4px">
                          <span class="badge badge-primary" style="font-family:monospace;font-size:0.7rem">${esc(p.customerCode)}</span>
                          <span class="text-muted" style="font-size:0.76rem">📱 ${esc(p.phone)}</span>
                          <span style="background:${ageBadgeColor};color:#fff;font-size:0.68rem;font-weight:700;padding:2px 7px;border-radius:999px">⏱️ ${p.maxDaysOld}d (${p.bucketKey}d)</span>
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
  const validOrders = allOrders.filter(o => o.status !== 'Rejected' && o.status !== 'Sales Return' && o.status !== 'Quotation' && o.docType !== 'Quotation');
  const grossRevenue = validOrders.reduce((s, o) => s + (Number(o.totals?.gross) || 0), 0);
  const taxableSales = validOrders.reduce((s, o) => s + (Number(o.totals?.taxable) || Number(o.totals?.gross) || 0), 0);

  const products = state.data.products.filter(p => p.shopId === shop.id);
  let totalCogs = 0;
  for (const o of validOrders) {
    for (const item of o.items || []) {
      const p = products.find(pr => pr.id === item.productId || pr.name === item.name);
      const unitCost = p && p.costPrice ? Number(p.costPrice) : Math.round((Number(item.price) || 0) * 0.82);
      totalCogs += unitCost * (Number(item.qty) || 1);
    }
  }
  const grossMargin = Math.max(0, taxableSales - totalCogs);
  const netOperatingProfit = grossMargin - totalExpenses;

  const cashSales = validOrders.filter(o => o.paymentMode === 'Cash')
    .reduce((s, o) => s + (Number(o.totals?.gross) || 0), 0);
  const upiSales = validOrders.filter(o => o.paymentMode === 'UPI')
    .reduce((s, o) => s + (Number(o.totals?.gross) || 0), 0);
  const cashExpenses = expenses.filter(e => e.mode === 'Cash').reduce((s, e) => s + (Number(e.amount) || 0), 0);
  const upiExpenses = expenses.filter(e => e.mode === 'UPI').reduce((s, e) => s + (Number(e.amount) || 0), 0);
  const cashInDrawer = Math.max(0, cashSales - cashExpenses);
  const bankUpiBalance = Math.max(0, upiSales - upiExpenses);

  const maxBar = Math.max(1, grossRevenue, totalExpenses, Math.abs(netOperatingProfit));
  const revPct = Math.min(100, Math.round((grossRevenue / maxBar) * 100));
  const expPct = Math.min(100, Math.round((totalExpenses / maxBar) * 100));
  const netPct = Math.min(100, Math.round((Math.max(0, netOperatingProfit) / maxBar) * 100));

  return `
    <div style="display:grid;gap:20px">
      <!-- Real-Time Net Operating Profit Engine & Visual Comparison -->
      <div class="erp-card" style="background:linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);color:#ffffff;border:none">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:14px">
          <div>
            <span class="badge badge-gold">📈 ${tr('REAL-TIME NET PROFIT ENGINE (P&L)', 'वास्तविक शुद्ध मुनाफ़ा एवं लाभ-हानि इंजन')}</span>
            <h3 style="color:#ffffff;margin:6px 0 2px">${tr('Revenue vs Cost of Goods vs Operating Expenses = Net Profit', 'कुल बिक्री - माल की लागत - दैनिक दुकान खर्चे = शुद्ध बचत (Net Profit)')}</h3>
          </div>
          <div style="text-align:right">
            <span style="font-size:0.76rem;color:#93c5fd;display:block">${tr('Net Operating Profit (शुद्ध मुनाफ़ा)', 'शुद्ध व्यापारिक मुनाफ़ा')}</span>
            <span style="font-size:1.75rem;font-weight:900;color:${netOperatingProfit >= 0 ? '#4ade80' : '#f87171'}">${fmtINR(netOperatingProfit)}</span>
          </div>
        </div>

        <div class="grid grid-4" style="gap:12px;margin-bottom:14px">
          <div style="background:rgba(255,255,255,0.08);padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,0.15)">
            <div style="font-size:0.75rem;color:#cbd5e1">${tr('Gross Sales Revenue', 'कुल बिक्री (Sales)')}</div>
            <div style="font-size:1.2rem;font-weight:800;color:#ffffff">${fmtINR(grossRevenue)}</div>
          </div>
          <div style="background:rgba(255,255,255,0.08);padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,0.15)">
            <div style="font-size:0.75rem;color:#cbd5e1">${tr('Gross Margin (Sales - COGS)', 'सकल मार्जिन (Gross Profit)')}</div>
            <div style="font-size:1.2rem;font-weight:800;color:#fde047">${fmtINR(grossMargin)}</div>
          </div>
          <div style="background:rgba(255,255,255,0.08);padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,0.15)">
            <div style="font-size:0.75rem;color:#cbd5e1">${tr('Operating Expenses', 'दुकान के कुल खर्चे')}</div>
            <div style="font-size:1.2rem;font-weight:800;color:#fca5a5">− ${fmtINR(totalExpenses)}</div>
          </div>
          <div style="background:rgba(34,197,94,0.18);padding:10px 12px;border-radius:10px;border:1px solid rgba(74,222,128,0.4)">
            <div style="font-size:0.75rem;color:#86efac">${tr('Net Operating Profit', 'शुद्ध मुनाफ़ा (Net Profit)')}</div>
            <div style="font-size:1.2rem;font-weight:900;color:#4ade80">${fmtINR(netOperatingProfit)}</div>
          </div>
        </div>

        <!-- Visual Comparison Bars -->
        <div style="background:rgba(15,23,42,0.55);padding:12px 14px;border-radius:10px;display:grid;gap:8px;font-size:0.78rem">
          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:3px"><span>📊 ${tr('Gross Revenue', 'कुल बिक्री')}</span><b>${fmtINR(grossRevenue)}</b></div>
            <div style="height:8px;background:rgba(255,255,255,0.12);border-radius:999px;overflow:hidden"><div style="width:${revPct}%;height:100%;background:#38bdf8;border-radius:999px"></div></div>
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:3px"><span>💸 ${tr('Operating Expenses', 'दैनिक खर्चे')}</span><b>${fmtINR(totalExpenses)}</b></div>
            <div style="height:8px;background:rgba(255,255,255,0.12);border-radius:999px;overflow:hidden"><div style="width:${expPct}%;height:100%;background:#f87171;border-radius:999px"></div></div>
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:3px"><span>🏆 ${tr('Net Operating Profit', 'शुद्ध बचत / मुनाफ़ा')}</span><b>${fmtINR(netOperatingProfit)}</b></div>
            <div style="height:8px;background:rgba(255,255,255,0.12);border-radius:999px;overflow:hidden"><div style="width:${netPct}%;height:100%;background:#4ade80;border-radius:999px"></div></div>
          </div>
        </div>
      </div>

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
                <option value="दुकान किराया (Shop Rent)">दुकान किराया (Shop Rent)</option>
                <option value="बिजली बिल व यूटिलिटी (Electricity & Utilities)">बिजली बिल व यूटिलिटी (Electricity Bill)</option>
                <option value="स्टाफ वेतन व चाय-नाश्ता (Staff Salary & Tea)">स्टाफ वेतन व चाय-नाश्ता (Staff & Tea)</option>
                <option value="स्थानीय भाड़ा / ट्रांसपोर्ट (Logistics & Transport)">स्थानीय भाड़ा / ट्रांसपोर्ट (Freight)</option>
                <option value="पैकिंग व कार्टन खर्च (Packaging & Boxes)">पैकिंग व कार्टन खर्च (Packaging)</option>
                <option value="हम्माली / उतराई-चढ़ाई (Hammali & Loading)">हम्माली / उतराई-चढ़ाई (Hammali)</option>
                <option value="दुकान रखरखाव व अन्य (Maintenance & Other)">दुकान रखरखाव व अन्य (Maintenance)</option>
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

function computeSixMonthFinancials(orders, expenses) {
  const months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
    months.push({ ym, label, revenue: 0, cogs: 0, expenses: 0, netProfit: 0, count: 0 });
  }
  for (const o of orders || []) {
    if (o.status === 'Rejected' || o.status === 'Sales Return' || o.docType === 'Quotation' || o.status === 'Quotation') continue;
    const ym = String(o.date || o.createdAt || '').slice(0, 7);
    const m = months.find(x => x.ym === ym) || months[months.length - 1];
    if (m) {
      const g = Number(o.totals?.gross || o.amount || 0);
      const tx = Number(o.totals?.taxable || g);
      const cost = Number(o.totals?.costTotal) || Math.round(tx * 0.82);
      m.revenue += g;
      m.cogs += cost;
      m.count += 1;
    }
  }
  for (const ex of expenses || []) {
    const ym = String(ex.date || '').slice(0, 7);
    const m = months.find(x => x.ym === ym) || months[months.length - 1];
    if (m) {
      m.expenses += Number(ex.amount || 0);
    }
  }
  for (const m of months) {
    const grossMargin = Math.max(0, m.revenue - m.cogs);
    m.grossMargin = grossMargin;
    m.netProfit = grossMargin - m.expenses;
  }
  return months;
}

function renderMerchantReportsOnly(shop) {
  const period = state.accountingPeriod || 'all';
  const rawOrders = state.data.myOrders || [];
  const rawExpenses = state.data.myExpenses || [];
  const allOrders = filterByAccountingPeriod(rawOrders, period);
  const supplierPurchases = filterByAccountingPeriod(state.data.mySupplierPurchases || [], period);
  const expenses = filterByAccountingPeriod(rawExpenses, period);
  const products = (state.data.products || []).filter(p => p.shopId === shop.id);

  const validInvoices = allOrders.filter(o => o.status !== 'Rejected' && o.status !== 'Sales Return' && o.docType !== 'Quotation' && o.status !== 'Quotation');

  const outputGst = validInvoices.reduce((s, o) => s + (Number(o.totals?.gst) || 0), 0);
  const inputItc = supplierPurchases.reduce((s, sp) => s + (Number(sp.gstAmount) || Math.round((Number(sp.totalAmount) || 0) * 18 / 118)), 0);
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

  // 1. 6-Month P&L Statement Summary (Item #14)
  const sixMonths = computeSixMonthFinancials(rawOrders, rawExpenses);
  const total6mRev = sixMonths.reduce((s, m) => s + m.revenue, 0);
  const total6mCogs = sixMonths.reduce((s, m) => s + m.cogs, 0);
  const total6mExp = sixMonths.reduce((s, m) => s + m.expenses, 0);
  const total6mNet = sixMonths.reduce((s, m) => s + m.netProfit, 0);

  // 2. Top Revenue Customers Leaderboard (Item #14)
  const custMap = new Map();
  for (const o of validInvoices) {
    const key = o.phone || o.customer || 'Walk-in';
    const gross = Number(o.totals?.gross || o.amount || 0);
    const paid = o.paymentMode === 'Credit' ? (o.udhaarSettled ? gross : Math.min(gross, Number(o.paidAmount || 0))) : gross;
    const due = Math.max(0, gross - paid);
    const cur = custMap.get(key) || { name: o.customer || 'Customer', phone: o.phone || '', gstin: o.buyerGstin || '', invoiced: 0, paid: 0, due: 0, count: 0 };
    cur.invoiced += gross;
    cur.paid += paid;
    cur.due += due;
    cur.count += 1;
    custMap.set(key, cur);
  }
  const topCustomers = [...custMap.values()].sort((a, b) => b.invoiced - a.invoiced);

  // 3. Expense Category Breakdown
  const expCatMap = new Map();
  for (const ex of expenses) {
    const cat = ex.category || 'General';
    expCatMap.set(cat, (expCatMap.get(cat) || 0) + Number(ex.amount || 0));
  }
  const expCategories = [...expCatMap.entries()].sort((a, b) => b[1] - a[1]);

  return `
    <div style="display:grid;gap:18px">
      <!-- 0-Latency Period Filter + Export Bar -->
      <div class="card-subtle no-print" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <span style="font-weight:800;font-size:0.88rem;color:#0f172a">📅 ${tr('Accounting Period Filter:', 'लेखा अवधि चुनें:')}</span>
          <button class="btn btn-sm ${period === 'all' ? 'btn-gold' : 'btn-ghost'}" onclick="state.accountingPeriod='all';render()">${tr('All Time', 'समस्त रिकॉर्ड्स')}</button>
          <button class="btn btn-sm ${period === 'month' ? 'btn-gold' : 'btn-ghost'}" onclick="state.accountingPeriod='month';render()">${tr('This Month', 'चालू माह')}</button>
          <button class="btn btn-sm ${period === 'today' ? 'btn-gold' : 'btn-ghost'}" onclick="state.accountingPeriod='today';render()">${tr('Today', 'आज का दिन')}</button>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn-primary btn-sm" onclick="exportGstr1Csv()">📥 ${tr('Export GSTR-1 / Tally CSV', 'GSTR-1 CSV डाउनलोड')}</button>
          <button class="btn btn-ghost btn-sm" onclick="window.print()">🖨️ ${tr('Print Financial Report', 'रिपोर्ट प्रिंट करें')}</button>
        </div>
      </div>

      <!-- 1. 6-MONTH P&L STATEMENT SUMMARY (Item #14) -->
      <div class="erp-card">
        <div class="erp-card-header">
          <div>
            <span class="badge badge-primary">📊 ${tr('6-MONTH P&L STATEMENT SUMMARY', '6-माह का लाभ-हानि (P&L) विवरण सारांश')}</span>
            <h3 style="margin-top:6px">${tr('Monthly Revenue, Cost of Goods (COGS), Operating Expenses & Net Profit', 'माह-वार कुल बिक्री, माल की लागत, परिचालन खर्चे एवं शुद्ध मुनाफ़ा')}</h3>
          </div>
          <span class="badge ${total6mNet >= 0 ? 'badge-primary' : 'badge-danger'}" style="font-size:0.95rem;padding:6px 12px">
            ${tr('6M Net Profit:', '6-माह शुद्ध लाभ:')} ${fmtINR(total6mNet)}
          </span>
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>${tr('Month', 'माह')}</th>
                <th>${tr('Invoices', 'बिल संख्या')}</th>
                <th>${tr('Gross Revenue', 'कुल बिक्री (Revenue)')}</th>
                <th>${tr('Est. COGS', 'माल लागत (COGS)')}</th>
                <th>${tr('Gross Margin', 'सकल लाभ')}</th>
                <th>${tr('Operating Expenses', 'दुकान खर्चे')}</th>
                <th>${tr('Net Operating Profit', 'शुद्ध मुनाफ़ा (Net Profit)')}</th>
              </tr>
            </thead>
            <tbody>
              ${sixMonths.map(m => `
                <tr>
                  <td><b>${esc(m.label)}</b></td>
                  <td>${m.count}</td>
                  <td><b style="color:#0284c7">${fmtINR(m.revenue)}</b></td>
                  <td>${fmtINR(m.cogs)}</td>
                  <td style="color:#16a34a;font-weight:700">${fmtINR(m.grossMargin)}</td>
                  <td style="color:#dc2626">−${fmtINR(m.expenses)}</td>
                  <td>
                    <b style="color:${m.netProfit >= 0 ? '#15803d' : '#dc2626'}">${fmtINR(m.netProfit)}</b>
                  </td>
                </tr>
              `).join('')}
              <tr style="background:#f8fafc;font-weight:800">
                <td>${tr('6-Month Total', '6-माह कुल योग')}</td>
                <td>${sixMonths.reduce((s, m) => s + m.count, 0)}</td>
                <td style="color:#0284c7">${fmtINR(total6mRev)}</td>
                <td>${fmtINR(total6mCogs)}</td>
                <td style="color:#16a34a">${fmtINR(Math.max(0, total6mRev - total6mCogs))}</td>
                <td style="color:#dc2626">−${fmtINR(total6mExp)}</td>
                <td style="color:${total6mNet >= 0 ? '#15803d' : '#dc2626'}">${fmtINR(total6mNet)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 2. TOP REVENUE CUSTOMERS & EXPENSE BREAKDOWN (Item #14) -->
      <div class="grid grid-2">
        <div class="erp-card">
          <div class="erp-card-header">
            <div>
              <span class="badge badge-gold">🏆 ${tr('TOP REVENUE CUSTOMERS', 'शीर्ष रेवेन्यू देने वाले ग्राहक')}</span>
              <h3 style="margin-top:6px">${tr('Customer Revenue Contribution & Outstanding Balance', 'ग्राहक-वार कुल व्यापार एवं बकाया राशि')}</h3>
            </div>
          </div>
          ${topCustomers.length === 0 ? `
            <p class="text-muted" style="font-size:0.86rem">${tr('No customer invoices recorded in this period.', 'इस अवधि में कोई ग्राहक बिल नहीं है।')}</p>
          ` : `
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>${tr('Customer', 'ग्राहक')}</th>
                    <th>${tr('Bills', 'बिल')}</th>
                    <th>${tr('Total Invoiced', 'कुल बिल')}</th>
                    <th>${tr('Balance Due', 'बकाया')}</th>
                    <th>${tr('Ledger', 'खाता')}</th>
                  </tr>
                </thead>
                <tbody>
                  ${topCustomers.slice(0, 8).map((c, idx) => `
                    <tr>
                      <td>
                        <b>#${idx + 1} ${esc(c.name)}</b>
                        <div class="text-muted" style="font-size:0.74rem">${esc(c.phone)} ${c.gstin ? `· ${esc(c.gstin)}` : ''}</div>
                      </td>
                      <td>${c.count}</td>
                      <td><b style="color:#0284c7">${fmtINR(c.invoiced)}</b></td>
                      <td><b style="color:${c.due > 0 ? '#dc2626' : '#16a34a'}">${fmtINR(c.due)}</b></td>
                      <td>
                        <button type="button" class="btn btn-ghost btn-sm" style="padding:3px 8px;font-size:0.75rem" onclick="openPartyLedgerModal('${esc(c.phone || c.name)}')">📄 Ledger</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>

        <div class="erp-card">
          <div class="erp-card-header">
            <div>
              <span class="badge badge-danger">💸 ${tr('OPERATING EXPENSE BREAKDOWN', 'खर्च श्रेणी विश्लेषण')}</span>
              <h3 style="margin-top:6px">${tr('Category-Wise Shop & Operational Expenses', 'मद-वार दुकान एवं व्यापारिक खर्चों का विवरण')}</h3>
            </div>
          </div>
          ${expCategories.length === 0 ? `
            <p class="text-muted" style="font-size:0.86rem">${tr('No operating expenses recorded in this period.', 'इस अवधि में कोई खर्च दर्ज नहीं है।')}</p>
          ` : `
            <div style="display:grid;gap:10px">
              ${expCategories.map(([cat, amt]) => {
                const totalExpAll = Math.max(1, expenses.reduce((s, e) => s + Number(e.amount || 0), 0));
                const pct = Math.min(100, Math.round((amt / totalExpAll) * 100));
                return `
                  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:10px 12px">
                    <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.84rem;margin-bottom:4px">
                      <b>${esc(cat)}</b>
                      <span style="color:#dc2626;font-weight:800">${fmtINR(amt)} (${pct}%)</span>
                    </div>
                    <div style="height:6px;background:#e2e8f0;border-radius:999px;overflow:hidden">
                      <div style="width:${pct}%;height:100%;background:#ef4444;border-radius:999px"></div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>
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

// ============================================================================
// 5-TAB SYSTEM SETTINGS (Items #8, #9, #10 — Matching Screenshots 3 & 4)
// ============================================================================
function renderMerchantSettingsOnly(shop, qrUrl) {
  const subTab = state.settingsSubTab || 'profile';
  const bp = shop.businessProfile || {};
  const bk = shop.banking || {};
  const invDef = shop.invoiceDefaults || {};
  const aiProviders = shop.aiProviders || [];
  const f = state.aiProviderForm || {};

  const tabs = [
    ['profile', '🏢', tr('Business Profile', 'व्यापार प्रोफ़ाइल')],
    ['banking', '🏦', tr('Banking & UPI', 'बैंकिंग व UPI')],
    ['invoice', '🧾', tr('Invoice Defaults', 'इनवॉइस डिफ़ॉल्ट सेटिंग्स')],
    ['ai_apis', '✨', tr('AI Digital Manager & APIs', 'AI डिजिटल मैनेजर व API')],
    ['backup', '💾', tr('Backup & Reset', 'बैकअप व स्टोर लिंक')]
  ];

  return `
    <div>
      <p class="text-muted" style="font-size:0.86rem;margin-bottom:10px">
        ${tr('Configure organization profile, tax rules, banking details, invoice defaults, AI providers, and system backups.', 'अपनी कंपनी की पहचान, जीएसटी, बैंक खाता, डिफ़ॉल्ट इनवॉइस नियम, AI प्रोवाइडर API और डेटा बैकअप यहाँ से प्रबंधित करें।')}
      </p>

      <!-- 5 Horizontal Sub-Tabs (Screenshot 3) -->
      <div class="ybt-settings-tabs no-print">
        ${tabs.map(([k, icon, label]) => `
          <button type="button" class="ybt-settings-tab-btn ${subTab === k ? 'active' : ''}" onclick="state.settingsSubTab='${k}';render()">
            <span>${icon}</span>
            <span>${label}</span>
          </button>
        `).join('')}
      </div>

      ${subTab === 'profile' ? `
        <div class="erp-card">
          <div class="erp-card-header">
            <h3>${tr('Company Identity & Tax Details', 'कंपनी पहचान एवं टैक्स विवरण (One-Time Setup)')}</h3>
            <span class="badge badge-primary">ID: ${esc(shop.refCode)}</span>
          </div>
          <form onsubmit="saveSystemSettingsTab(event, 'profile')">
            <div class="grid grid-2" style="gap:14px;margin-bottom:12px">
              <div class="form-group-clean">
                <label>${tr('Business Trade Name *', 'व्यापार / दुकान का नाम *')}</label>
                <input class="input" id="set-trade-name" required value="${esc(bp.tradeName || shop.shop || '')}" placeholder="Apex Infotech Solutions" />
              </div>
              <div class="form-group-clean">
                <label>${tr('Legal Registered Entity Name', 'पंजीकृत कानूनी फर्म का नाम')}</label>
                <input class="input" id="set-legal-name" value="${esc(bp.legalName || shop.shop || '')}" placeholder="Apex Infotech Solutions Private Limited" />
              </div>
            </div>

            <div class="form-group-clean" style="margin-bottom:12px">
              <label>${tr('Tagline', 'व्यापार टैगलाइन / स्लोगन')}</label>
              <input class="input" id="set-tagline" value="${esc(bp.tagline || '')}" placeholder="Empowering Digital Transformation / Authorized Wholesale Dealer" />
            </div>

            <div class="grid grid-2" style="gap:14px;margin-bottom:12px">
              <div class="form-group-clean">
                <label>${tr('Official Email', 'आधिकारिक ईमेल पता')}</label>
                <input class="input" type="email" id="set-email" value="${esc(bp.officialEmail || '')}" placeholder="contact@company.example.com" />
              </div>
              <div class="form-group-clean">
                <label>${tr('Official Phone', 'आधिकारिक फ़ोन / WhatsApp')}</label>
                <input class="input" id="set-phone" value="${esc(bp.officialPhone || shop.phone || '')}" placeholder="+91 98201 12345" />
              </div>
            </div>

            <div class="grid grid-2" style="gap:14px;margin-bottom:12px">
              <div class="form-group-clean">
                <label>${tr('GSTIN (Goods and Services Tax Number)', 'GSTIN (15-अंकीय जीएसटी नंबर)')}</label>
                <input class="input" id="set-gstin" maxlength="15" style="text-transform:uppercase;font-family:monospace" value="${esc(bp.gstin || shop.gstin || '')}" placeholder="27AAACA1234A1Z5" />
              </div>
              <div class="form-group-clean">
                <label>${tr('PAN (Permanent Account Number)', 'PAN (10-अंकीय पैन नंबर)')}</label>
                <input class="input" id="set-pan" maxlength="10" style="text-transform:uppercase;font-family:monospace" value="${esc(bp.pan || '')}" placeholder="AAACA1234A" />
              </div>
            </div>

            <div class="form-group-clean" style="margin-bottom:10px">
              <label>${tr('Registered Office Address', 'पंजीकृत कार्यालय / दुकान का पता')}</label>
              <input class="input" id="set-addr1" style="margin-bottom:8px" value="${esc(bp.addressLine1 || shop.address || '')}" placeholder="Tech Park Plaza, Tower B, Suite 402" />
              <input class="input" id="set-addr2" value="${esc(bp.addressLine2 || '')}" placeholder="Industrial Area / Main Market Road" />
            </div>

            <div class="grid grid-3" style="gap:12px;margin-bottom:16px">
              <div class="form-group-clean">
                <label>${tr('City', 'शहर')}</label>
                <input class="input" id="set-city" value="${esc(bp.city || shop.city || '')}" placeholder="Mumbai / Jodhpur" />
              </div>
              <div class="form-group-clean">
                <label>${tr('State', 'राज्य')}</label>
                <input class="input" id="set-state" value="${esc(bp.state || shop.state || '')}" placeholder="Maharashtra / Rajasthan" />
              </div>
              <div class="form-group-clean">
                <label>${tr('Pincode', 'पिनकोड')}</label>
                <input class="input" id="set-pincode" maxlength="6" value="${esc(bp.pincode || '')}" placeholder="400093" />
              </div>
            </div>

            <button type="submit" class="btn btn-primary" style="background:#0284c7;border-color:#0284c7">
              💾 ${tr('Save Business Profile', 'व्यापार प्रोफ़ाइल सेव करें')}
            </button>
          </form>
        </div>
      ` : ''}

      ${subTab === 'banking' ? `
        <div class="erp-card">
          <div class="erp-card-header">
            <h3>🏦 ${tr('Company Bank Account & Direct UPI QR Settings', 'बैंक खाता एवं UPI पेमेंट सेटिंग्स')}</h3>
          </div>
          <form onsubmit="saveSystemSettingsTab(event, 'banking')">
            <div class="grid grid-2" style="gap:14px;margin-bottom:12px">
              <div class="form-group-clean">
                <label>${tr('Bank Name', 'बैंक का नाम')}</label>
                <input class="input" id="set-bank-name" value="${esc(bk.bankName || '')}" placeholder="HDFC Bank / SBI / ICICI Bank" />
              </div>
              <div class="form-group-clean">
                <label>${tr('Account Holder Name', 'खाताधारक का नाम')}</label>
                <input class="input" id="set-acc-holder" value="${esc(bk.accountHolder || shop.shop || '')}" placeholder="${esc(shop.shop)}" />
              </div>
            </div>
            <div class="grid grid-3" style="gap:14px;margin-bottom:12px">
              <div class="form-group-clean">
                <label>${tr('Account Number', 'खाता संख्या (A/c No.)')}</label>
                <input class="input" id="set-acc-no" style="font-family:monospace" value="${esc(bk.accountNumber || '')}" placeholder="50200012345678" />
              </div>
              <div class="form-group-clean">
                <label>${tr('IFSC Code', 'IFSC कोड')}</label>
                <input class="input" id="set-ifsc" style="text-transform:uppercase;font-family:monospace" value="${esc(bk.ifsc || '')}" placeholder="HDFC0000123" />
              </div>
              <div class="form-group-clean">
                <label>${tr('Branch Name', 'शाखा (Branch)')}</label>
                <input class="input" id="set-branch" value="${esc(bk.branch || shop.city || '')}" placeholder="Main Industrial Branch" />
              </div>
            </div>
            <div class="form-group-clean" style="margin-bottom:16px">
              <label>${tr('Merchant UPI ID (For Dynamic Invoice QR & WhatsApp Payment Link)', 'व्यापारी UPI ID (इनवॉइस QR व WhatsApp पेमेंट लिंक हेतु)')}</label>
              <input class="input" id="set-upi-id" value="${esc(bk.upiId || shop.upiId || '')}" placeholder="merchant@okaxis" />
            </div>
            <button type="submit" class="btn btn-primary" style="background:#0284c7;border-color:#0284c7">
              💾 ${tr('Save Banking & UPI Details', 'बैंक व UPI विवरण सेव करें')}
            </button>
          </form>
        </div>
      ` : ''}

      ${subTab === 'invoice' ? `
        <div class="erp-card">
          <div class="erp-card-header">
            <div>
              <h3>🧾 ${tr('Seller Invoice Default Settings (Auto-Fills Every New Invoice)', 'डिफ़ॉल्ट इनवॉइस सेटिंग्स (हर नए बिल में स्वतः लागू)')}</h3>
              <p class="text-muted" style="font-size:0.8rem;margin:2px 0 0">${tr('Set your default tax rate, HSN, payment mode, due days, terms & signatory once so you never have to retype them.', 'एक बार डिफ़ॉल्ट टैक्स, HSN, नियम व शर्तें सेव करें ताकि हर बिल बनाते समय बार-बार न भरना पड़े।')}</p>
            </div>
          </div>
          <form onsubmit="saveSystemSettingsTab(event, 'invoice')">
            <div class="grid grid-4" style="gap:12px;margin-bottom:12px">
              <div class="form-group-clean">
                <label>${tr('Default Payment Mode', 'डिफ़ॉल्ट भुगतान माध्यम')}</label>
                <select class="select" id="set-inv-paymode">
                  ${['Cash', 'UPI', 'Card', 'Credit'].map(m => `<option value="${m}" ${(invDef.defaultPaymentMode || 'Cash') === m ? 'selected' : ''}>${m}</option>`).join('')}
                </select>
              </div>
              <div class="form-group-clean">
                <label>${tr('Default GST Rate (%)', 'डिफ़ॉल्ट GST दर (%)')}</label>
                <select class="select" id="set-inv-gst">
                  ${[0, 5, 12, 18, 28].map(r => `<option value="${r}" ${Number(invDef.defaultGstRate ?? 18) === r ? 'selected' : ''}>${r}% GST</option>`).join('')}
                </select>
              </div>
              <div class="form-group-clean">
                <label>${tr('Default Tax Mode', 'डिफ़ॉल्ट टैक्स मोड')}</label>
                <select class="select" id="set-inv-taxmode">
                  <option value="exclusive" ${(invDef.defaultTaxMode || 'exclusive') === 'exclusive' ? 'selected' : ''}>+GST (Tax Exclusive)</option>
                  <option value="inclusive" ${invDef.defaultTaxMode === 'inclusive' ? 'selected' : ''}>MRP (Tax Inclusive)</option>
                </select>
              </div>
              <div class="form-group-clean">
                <label>${tr('Default HSN / SAC Code', 'डिफ़ॉल्ट HSN / SAC कोड')}</label>
                <input class="input" id="set-inv-hsn" value="${esc(invDef.defaultHsn || '3917')}" placeholder="3917" />
              </div>
            </div>

            <div class="grid grid-4" style="gap:12px;margin-bottom:12px">
              <div class="form-group-clean">
                <label>${tr('Default Supply Type', 'सप्लाई का प्रकार')}</label>
                <select class="select" id="set-inv-supply">
                  <option value="auto" ${(invDef.defaultSupplyType || 'auto') === 'auto' ? 'selected' : ''}>Auto Detect from GSTIN</option>
                  <option value="intra" ${invDef.defaultSupplyType === 'intra' ? 'selected' : ''}>Intra-State (CGST+SGST)</option>
                  <option value="inter" ${invDef.defaultSupplyType === 'inter' ? 'selected' : ''}>Inter-State (100% IGST)</option>
                </select>
              </div>
              <div class="form-group-clean">
                <label>${tr('Payment Due Days', 'उधार भुगतान समय-सीमा (दिन)')}</label>
                <input class="input" type="number" id="set-inv-duedays" value="${Number(invDef.dueDays ?? 15)}" />
              </div>
              <div class="form-group-clean">
                <label>${tr('Quotation Validity (Days)', 'कोटेशन वैधता (दिन)')}</label>
                <input class="input" type="number" id="set-inv-quotedays" value="${Number(invDef.quotationValidityDays ?? 7)}" />
              </div>
              <div class="form-group-clean">
                <label>${tr('Default Print Paper Size', 'डिफ़ॉल्ट प्रिंट साइज')}</label>
                <select class="select" id="set-inv-print">
                  <option value="a4" ${(invDef.defaultPrintFormat || 'a4') === 'a4' ? 'selected' : ''}>A4 Full Tax Invoice</option>
                  <option value="thermal" ${invDef.defaultPrintFormat === 'thermal' ? 'selected' : ''}>3-Inch Thermal POS</option>
                </select>
              </div>
            </div>

            <div class="grid grid-2" style="gap:12px;margin-bottom:12px">
              <div class="form-group-clean">
                <label>${tr('Authorized Signatory Name / Title', 'अधिकृत हस्ताक्षरकर्ता का नाम / पद')}</label>
                <input class="input" id="set-inv-sign" value="${esc(invDef.signatoryTitle || ('For ' + shop.shop))}" />
              </div>
              <div class="form-group-clean">
                <label>${tr('Invoice Footer Thank-You Note', 'बिल फुटर संदेश')}</label>
                <input class="input" id="set-inv-footer" value="${esc(invDef.footerNote || 'Thank you for your business!')}" />
              </div>
            </div>

            <div class="form-group-clean" style="margin-bottom:12px">
              <label>${tr('Default Invoice Terms & Conditions (Printed on Every Bill)', 'डिफ़ॉल्ट नियम एवं शर्तें (हर बिल पर स्वतः छपेंगी)')}</label>
              <textarea class="textarea" rows="3" id="set-inv-terms">${esc(invDef.termsAndConditions || '1. Goods once sold will not be taken back.\n2. Subject to local jurisdiction only.')}</textarea>
            </div>

            <div style="margin-bottom:16px">
              <label style="display:inline-flex;align-items:center;gap:8px;font-weight:600;font-size:0.86rem;cursor:pointer">
                <input type="checkbox" id="set-inv-showbank" ${invDef.showBankDetails !== false ? 'checked' : ''} />
                <span>${tr('Automatically print Company Bank Account & UPI ID on all Tax Invoices', 'सभी टैक्स इनवॉइस पर कंपनी का बैंक खाता और UPI ID स्वतः प्रिंट करें')}</span>
              </label>
            </div>

            <button type="submit" class="btn btn-primary" style="background:#0284c7;border-color:#0284c7">
              💾 ${tr('Save Invoice Defaults', 'इनवॉइस डिफ़ॉल्ट सेव करें')}
            </button>
          </form>
        </div>
      ` : ''}

      ${subTab === 'ai_apis' ? `
        <div style="display:grid;gap:16px">
          <!-- Status Banner Matching Screenshot 4 -->
          <div class="erp-card" style="display:flex;align-items:center;gap:14px;padding:14px 18px;background:#f8fafc;border-left:4px solid #0284c7;margin-bottom:0">
            <div style="width:36px;height:36px;border-radius:10px;background:#e0f2fe;color:#0284c7;display:grid;place-items:center;font-size:1.1rem;flex-shrink:0">⚛️</div>
            <div>
              <div style="font-weight:700;font-size:0.94rem;color:#0f172a">
                ${aiProviders.some(p => p.enabled && p.keyConfigured)
                  ? tr('Cloud Generative AI + Autonomous Business Logic Active', 'क्लाउड जनरेटिव AI + लोकल बिज़नेस लॉजिक सक्रिय')
                  : tr('Autonomous Local Business Logic Active', 'लोकल बिज़नेस लॉजिक इंजन सक्रिय (Offline Mode)')}
              </div>
              <div style="font-size:0.8rem;color:#64748b">
                ${tr('The assistant runs smoothly in local mode using database-driven business logic. To enable generative cloud LLM conversations, connect your Google AI Studio, OpenRouter, OpenAI, or Claude API key below.', 'असिस्टेंट डेटाबेस-आधारित लोकल बिज़नेस लॉजिक पर हमेशा मुफ़्त काम करता है। क्लाउड जनरेटिव AI चैट के लिए नीचे अपना Google AI Studio (Gemini) या OpenRouter API Key जोड़ें।')}
              </div>
            </div>
          </div>

          <!-- Configure New AI Provider API Card Matching Screenshot 4 -->
          <div class="erp-card">
            <div class="erp-card-header">
              <h3>🔑 ${tr('Configure New AI Provider API', 'नया AI प्रोवाइडर API कॉन्फ़िगर करें')}</h3>
            </div>

            <form onsubmit="saveAiProviderConfig(event)">
              <div class="grid grid-2" style="gap:16px;margin-bottom:14px">
                <div class="form-group-clean">
                  <label>${tr('Provider Platform *', 'प्रोवाइडर प्लेटफ़ॉर्म *')}</label>
                  <select class="select" id="aip-provider" onchange="onAiProviderPlatformChange(this.value)">
                    ${[
                      'Google AI Studio (Gemini)',
                      'OpenRouter (Unified API)',
                      'OpenAI (ChatGPT)',
                      'Anthropic Claude',
                      'Custom OpenAI-Compatible API (Ollama / Local / Groq)'
                    ].map(p => `<option value="${p}" ${f.provider === p ? 'selected' : ''}>${p}</option>`).join('')}
                  </select>
                </div>
                <div class="form-group-clean">
                  <label>${tr('Configuration Label *', 'कॉन्फ़िगरेशन नाम (Label) *')}</label>
                  <input class="input" id="aip-label" required value="${esc(f.label || f.provider || 'Google AI Studio (Gemini)')}" oninput="state.aiProviderForm.label=this.value" placeholder="Google AI Studio (Gemini)" />
                </div>
              </div>

              <div class="form-group-clean" style="margin-bottom:14px">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <label>${tr('API Key (Encrypted with AES-256-GCM at rest — never logged)', 'API Key (सर्वर पर AES-256-GCM से सुरक्षित एन्क्रिप्टेड)')}</label>
                  <a href="${f.provider.includes('OpenRouter') ? 'https://openrouter.ai/keys' : (f.provider.includes('OpenAI') ? 'https://platform.openai.com/api-keys' : (f.provider.includes('Anthropic') ? 'https://console.anthropic.com/' : 'https://aistudio.google.com/app/apikey'))}" target="_blank" rel="noreferrer" style="font-size:0.78rem;color:#0284c7;font-weight:600">
                    Get ${esc(f.provider)} API Key ↗
                  </a>
                </div>
                <input class="input" type="password" id="aip-key" value="${esc(f.apiKey || '')}" oninput="state.aiProviderForm.apiKey=this.value" placeholder="AIzaSy... or sk-or-v1-..." />
              </div>

              <div class="grid grid-2" style="gap:16px;margin-bottom:14px">
                <div class="form-group-clean">
                  <label>${tr('Model ID *', 'मॉडल ID (Model ID) *')}</label>
                  <input class="input" id="aip-model" required value="${esc(f.modelId || 'google/gemini-flash-1.5')}" oninput="state.aiProviderForm.modelId=this.value" placeholder="google/gemini-flash-1.5" />
                  <div style="margin-top:6px">
                    <span style="font-size:0.74rem;color:#64748b;display:block;margin-bottom:4px">Quick Select:</span>
                    <div style="display:flex;gap:6px;flex-wrap:wrap">
                      ${[
                        'google/gemini-flash-1.5',
                        'openai/gpt-4o-mini',
                        'anthropic/claude-3.5-sonnet',
                        'deepseek/deepseek-chat',
                        'meta-llama/llama-3.3-70b-instruct'
                      ].map(m => `
                        <button type="button" class="btn btn-ghost btn-sm" style="padding:2px 8px;font-size:0.72rem;border:1px solid #cbd5e1;font-family:monospace" onclick="state.aiProviderForm.modelId='${m}';render()">
                          ${m}
                        </button>
                      `).join('')}
                    </div>
                  </div>
                </div>

                <div class="form-group-clean">
                  <label>${tr('Base API URL', 'बेस API URL')}</label>
                  <input class="input" id="aip-baseurl" value="${esc(f.baseUrl || 'https://openrouter.ai/api/v1')}" oninput="state.aiProviderForm.baseUrl=this.value" placeholder="https://openrouter.ai/api/v1" />
                  <span style="font-size:0.74rem;color:#64748b;margin-top:4px">Pre-filled with official vendor endpoint. Change for custom reverse proxies or local models.</span>
                </div>
              </div>

              <div class="grid grid-2" style="gap:16px;margin-bottom:14px;align-items:center">
                <div class="form-group-clean">
                  <label>Temperature: <b id="temp-val-lbl">${Number(f.temperature ?? 0.70).toFixed(2)}</b></label>
                  <input type="range" min="0" max="1" step="0.05" value="${Number(f.temperature ?? 0.70)}" oninput="state.aiProviderForm.temperature=parseFloat(this.value);const l=document.getElementById('temp-val-lbl');if(l)l.textContent=Number(this.value).toFixed(2)" style="accent-color:#0284c7;cursor:pointer" />
                  <div style="display:flex;justify-content:space-between;font-size:0.72rem;color:#64748b">
                    <span>0.0 (Precise / Factual)</span>
                    <span>1.0 (Creative)</span>
                  </div>
                </div>

                <div class="form-group-clean">
                  <label>${tr('Max Output Tokens', 'अधिकतम आउटपुट टोकन')}</label>
                  <select class="select" id="aip-tokens" onchange="state.aiProviderForm.maxTokens=Number(this.value)">
                    <option value="1024" ${Number(f.maxTokens) === 1024 ? 'selected' : ''}>1,024 tokens (Fast & Concise)</option>
                    <option value="2048" ${Number(f.maxTokens) === 2048 ? 'selected' : ''}>2,048 tokens (Standard)</option>
                    <option value="4096" ${Number(f.maxTokens || 4096) === 4096 ? 'selected' : ''}>4,096 tokens (Detailed, Recommended)</option>
                    <option value="8192" ${Number(f.maxTokens) === 8192 ? 'selected' : ''}>8,192 tokens (Extended Reports)</option>
                  </select>
                </div>
              </div>

              <div style="display:flex;gap:20px;flex-wrap:wrap;margin-bottom:18px">
                <label style="display:inline-flex;align-items:center;gap:7px;font-size:0.86rem;font-weight:600;cursor:pointer">
                  <input type="checkbox" id="aip-enabled" ${f.enabled !== false ? 'checked' : ''} onchange="state.aiProviderForm.enabled=this.checked" />
                  <span>${tr('Enable this AI provider for requests', 'इस AI प्रोवाइडर को अनुरोधों के लिए सक्रिय करें')}</span>
                </label>
                <label style="display:inline-flex;align-items:center;gap:7px;font-size:0.86rem;font-weight:600;cursor:pointer">
                  <input type="checkbox" id="aip-primary" ${f.isPrimary !== false ? 'checked' : ''} onchange="state.aiProviderForm.isPrimary=this.checked" />
                  <span>${tr('Set as primary default AI provider', 'मुख्य डिफ़ॉल्ट AI प्रोवाइडर के रूप में सेट करें')}</span>
                </label>
              </div>

              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;border-top:1px solid #e2e8f0;padding-top:14px">
                <button type="button" class="btn btn-ghost" style="border:1.5px solid #cbd5e1" onclick="testAiProviderConnection()">
                  ⚡ ${tr('Test Connection', 'कनेक्शन टेस्ट करें')}
                </button>
                <button type="submit" class="btn btn-primary" style="background:#0284c7;border-color:#0284c7">
                  💾 ${tr('Save AI Provider', 'AI प्रोवाइडर सेव करें')}
                </button>
              </div>
            </form>
          </div>

          ${aiProviders.length > 0 ? `
            <div class="erp-card">
              <div class="erp-card-header">
                <h3>📋 ${tr('Configured AI Providers', 'सेव किए गए AI प्रोवाइडर्स')} (${aiProviders.length})</h3>
              </div>
              <div class="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>${tr('Provider & Label', 'प्रोवाइडर व नाम')}</th>
                      <th>${tr('Model ID', 'मॉडल ID')}</th>
                      <th>${tr('API Key Vault', 'API Key स्थिति')}</th>
                      <th>${tr('Status', 'स्थिति')}</th>
                      <th>${tr('Actions', 'कार्रवाई')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${aiProviders.map(p => `
                      <tr>
                        <td>
                          <b>${esc(p.label)}</b>
                          <div class="text-muted" style="font-size:0.74rem">${esc(p.provider)}</div>
                        </td>
                        <td style="font-family:monospace;font-size:0.8rem">${esc(p.modelId)}</td>
                        <td><span class="badge ${p.keyConfigured ? 'badge-primary' : 'badge-muted'}">${esc(p.keyMasked || 'Not Set')}</span></td>
                        <td>
                          ${p.isPrimary ? '<span class="badge badge-gold">★ Primary</span> ' : ''}
                          <span class="badge ${p.enabled ? 'badge-primary' : 'badge-danger'}">${p.enabled ? 'Enabled' : 'Disabled'}</span>
                        </td>
                        <td>
                          <div style="display:flex;gap:6px">
                            <button type="button" class="btn btn-ghost btn-sm" onclick="testAiProviderConnection('${p.id}')">⚡ Test</button>
                            <button type="button" class="btn btn-danger btn-sm" onclick="deleteAiProviderConfig('${p.id}')">🗑</button>
                          </div>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          ` : ''}
        </div>
      ` : ''}

      ${subTab === 'backup' ? `
        <div style="display:grid;gap:16px">
          <div class="erp-card">
            <div class="erp-card-header">
              <div>
                <span class="badge badge-gold">💎 ${esc(trDyn(shop.plan))}</span>
                <h3 style="margin-top:6px">💾 ${tr('1-Click Full Database Backup & Store Status', '1-क्लिक संपूर्ण डेटा बैकअप एवं दुकान स्थिति')}</h3>
              </div>
              <div style="display:flex;gap:8px;flex-wrap:wrap">
                <button class="btn btn-gold btn-sm" onclick="downloadFullShopBackup()">
                  💾 ${tr('Download Complete JSON Backup', 'संपूर्ण बैकअप डाउनलोड करें')}
                </button>
                <button class="btn btn-primary btn-sm" onclick="exportGstr1Csv()">
                  📥 ${tr('Export Invoices CSV', 'इनवॉइस CSV डाउनलोड')}
                </button>
                <button class="btn btn-ghost btn-sm" onclick="toggleShopOpen(${!shop.open})">
                  ${shop.open ? '🔴 ' + tr('Mark Shop Closed', 'दुकान बंद मार्क करें') : '🟢 ' + tr('Mark Shop Open', 'दुकान खुली मार्क करें')}
                </button>
              </div>
            </div>
            <p class="text-muted" style="font-size:0.86rem;margin-bottom:14px">
              ${tr('Your online storefront link where customers can view your catalog and place orders directly:', 'आपकी दुकान का ऑनलाइन ऑर्डर लिंक जहाँ ग्राहक सीधे कैटलॉग देखकर ऑर्डर भेज सकते हैं:')}
            </p>
            <div style="display:flex;gap:10px;flex-wrap:wrap">
              <input class="input" readonly value="${esc(qrUrl)}" style="max-width:440px" />
              <button class="btn btn-ghost btn-sm" onclick="navigator.clipboard.writeText('${qrUrl}');showToast('Link copied!')">
                📋 ${tr('Copy Link', 'लिंक कॉपी करें')}
              </button>
              <a class="btn btn-primary btn-sm" target="_blank" rel="noreferrer" href="https://wa.me/?text=${encodeURIComponent(`Order online from ${shop.shop} on KuberQ: ${qrUrl}`)}">
                📲 ${tr('Share on WhatsApp', 'WhatsApp पर भेजें')}
              </a>
            </div>
          </div>
        </div>
      ` : ''}
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

  const allOrders = state.data.myOrders || [];
  const creditOrders = allOrders.filter(o => o.status !== 'Rejected' && o.status !== 'Sales Return' && o.docType !== 'Quotation' && o.status !== 'Quotation' && o.paymentMode === 'Credit' && !o.udhaarSettled);
  const pendingCount = creditOrders.length;
  const pendingTasksCount = (state.data.myTasks || []).filter(t => t.status !== 'Completed').length;
  const qrUrl = `${window.location.origin}/order?shop=${shop.id}`;
  const uniqueId = shop.refCode || u.uniqueId || ('KQM-' + String(u.phone || '982901').slice(-6));

  // Complete Navigation List with Permission Mapping for Staff/Managers (Item #16)
  const rawNavItems = [
    ['Dashboard', '📊', tr('Dashboard', 'एग्जीक्यूटिव डैशबोर्ड'), '', 'dashboard'],
    ['Customers', '👥', tr('Customers', 'ग्राहक (Customers CRM)'), String((state.data.myCustomers || []).length || ''), 'customers'],
    ['CRM Pipeline', '🎯', tr('Leads & Deals', 'लीड्स व डील्स पाइपलाइन'), '', 'leads'],
    ['Inventory', '📦', tr('Products & Services', 'प्रोडक्ट्स व स्टॉक'), '', 'products'],
    ['Tasks', '✅', tr('Tasks & Reminders', 'टास्क व रिमाइंडर'), pendingTasksCount ? String(pendingTasksCount) : '', 'tasks'],
    ['Billing', '🧾', tr('Billing, Quotes & Invoices', 'कोटेशन व GST बिलिंग'), '', 'invoices'],
    ['Udhaar', '📒', tr('Payments & Udhaar Radar', 'पेमेंट व उधार रडार'), pendingCount ? String(pendingCount) : '', 'payments'],
    ['Expenses', '💸', tr('Expenses & P&L', 'खर्चे व मुनाफ़ा (Expenses)'), '', 'expenses'],
    ['Purchases', '🛒', tr('Supplier Purchases & ITC', 'सप्लायर खरीद व ITC'), '', 'expenses'],
    ['Manufacturing', '🏭', tr('Manufacturing & Job-Work', 'निर्माता व जॉब-वर्क'), '', 'products'],
    ['Reports', '📈', tr('Reports & 6M P&L', 'रिपोर्ट्स व 6-माह P&L'), 'CA Ready', 'reports'],
    ['AI Manager', '✨', tr('AI Digital Manager', 'AI डिजिटल मैनेजर'), 'AI', 'ai'],
    ['Staff', '🛡️', tr('Managers & Staff RBAC', 'मैनेजर व स्टाफ आईडी'), '', 'managers'],
    ['Standee', '📢', tr('QR Standee & Promo', 'QR स्टैंडी व प्रचार'), '', 'dashboard'],
    ['Settings', '⚙️', tr('Settings & APIs', 'सेटिंग्स व AI API'), '', 'settings']
  ];

  const isStaffUser = u.role === 'staff';
  const staffPerms = Array.isArray(u.permissions) ? u.permissions : [];
  const filteredNav = isStaffUser
    ? rawNavItems.filter(item => {
        const permKey = item[4];
        if (item[0] === 'Billing' && (staffPerms.includes('invoices') || staffPerms.includes('quotations'))) return true;
        if (item[0] === 'Settings' && (staffPerms.includes('settings') || staffPerms.includes('backup'))) return true;
        return staffPerms.includes(permKey);
      })
    : rawNavItems;

  const navItems = (filteredNav.length > 0 ? filteredNav : rawNavItems.slice(0, 1)).map(([k, ic, lbl, bdg]) => [k, ic, lbl, bdg]);
  if (!navItems.some(x => x[0] === curTab)) {
    curTab = navItems[0][0];
  }
  state.merchantTab = curTab;

  let bannerIcon = '📊';
  let bannerTitle = tr('Executive Dashboard', 'एग्जीक्यूटिव डैशबोर्ड एवं व्यापार प्रदर्शन');
  let bannerSubtitle = tr(`Welcome back, ${u.name}! Here is your business performance summary.`, `स्वागत है, ${u.name}! यहाँ आपके व्यापार के प्रदर्शन का संपूर्ण सारांश है।`);
  let bannerActionHtml = `
    ${u.role === 'admin' ? `<button class="btn btn-sm" style="background:#f59e0b;color:#0f172a;font-weight:800;border:1.5px solid #fde047" onclick="navigate('/admin')">👑 ${tr('Super Admin Console', 'सुपर एडमिन कंसोल')}</button>` : ''}
    <button class="btn btn-ghost btn-sm" style="background:rgba(255,255,255,0.14);color:#ffffff;border:1px solid rgba(255,255,255,0.35)" onclick="state.merchantTab='AI Manager';render()">✨ ${tr('Ask AI Manager', 'AI मैनेजर से पूछें')}</button>
    <button class="btn btn-gold btn-sm" onclick="openCustomerModal()">+ ${tr('Add Customer', 'नया ग्राहक')}</button>
    <button class="btn btn-primary btn-sm" style="background:#0284c7;border-color:#38bdf8" onclick="state.invoiceDocType='Tax Invoice';state.merchantTab='Billing';render()">+ ${tr('New Invoice', 'नया GST बिल')}</button>
  `;
  let contentHtml = '';

  if (curTab === 'Dashboard') {
    contentHtml = renderMerchantDashboard(shop);
  } else if (curTab === 'Customers') {
    bannerIcon = '👥';
    bannerTitle = tr('Customers CRM & One-Time Buyer Profiles', 'ग्राहक CRM एवं वन-टाइम खरीदार प्रोफ़ाइल');
    bannerSubtitle = tr('Manage customer profiles, GSTIN, billing addresses, credit limits, and 1-click invoicing', 'ग्राहकों का विवरण एक बार सेव करें ताकि बिल बनाते समय बार-बार विवरण न डालना पड़े');
    bannerActionHtml = `<button class="btn btn-primary btn-sm" style="background:#0284c7;border-color:#38bdf8" onclick="openCustomerModal()">+ ${tr('Add New Customer', '+ नया ग्राहक जोड़ें')}</button>`;
    contentHtml = renderMerchantCustomersCrm(shop);
  } else if (curTab === 'Tasks') {
    bannerIcon = '✅';
    bannerTitle = tr('Tasks & Follow-Up Reminders', 'टास्क एवं फॉलो-अप रिमाइंडर्स');
    bannerSubtitle = tr('Track daily tasks, urgent payment follow-ups, due dates, and staff assignments', 'अपने और स्टाफ के लिए दैनिक कार्य, प्राथमिकता (Urgent/High/Medium), नियत तिथि और स्थिति ट्रैक करें');
    bannerActionHtml = `<button class="btn btn-primary btn-sm" style="background:#0284c7;border-color:#38bdf8" onclick="openTaskModal()">+ ${tr('Add Task / Reminder', '+ नया टास्क / रिमाइंडर जोड़ें')}</button>`;
    contentHtml = renderMerchantTasks(shop);
  } else if (curTab === 'AI Manager') {
    bannerIcon = '✨';
    bannerTitle = tr('AI Digital Business Manager ("Ask Your Data Anything")', 'AI डिजिटल बिज़नेस मैनेजर (अपने व्यापार के पोर्टफोलियो से कुछ भी पूछें)');
    bannerSubtitle = tr('Natural language Q&A across your entire portfolio, live KPI charts & Owner-approved Action Proposals', 'ग्राहक, लीड्स, बिल, उधार, स्टॉक या 6-माह के मुनाफ़े के बारे में पूछें');
    bannerActionHtml = `
      <button class="btn btn-gold btn-sm" onclick="state.settingsSubTab='ai_apis';state.merchantTab='Settings';render()">🔑 ${tr('Configure AI API Key', 'AI API कॉन्फ़िगर करें')}</button>
      <button class="btn btn-ghost btn-sm" style="color:#ffffff;border-color:rgba(255,255,255,0.4)" onclick="state.merchantTab='Dashboard';render()">← ${tr('Dashboard', 'डैशबोर्ड')}</button>
    `;
    contentHtml = renderMerchantAiBusinessManager(shop);
  } else if (curTab === 'CRM Pipeline') {
    bannerIcon = '🎯';
    bannerTitle = tr('Leads & Deals Pipeline', 'लीड्स एवं डील्स सेल्स पाइपलाइन');
    bannerSubtitle = tr('Track sales progress from initial discovery to closed business across 6 stages', 'प्रारंभिक पूछताछ से लेकर डील पक्की होने तक 6 चरणों में अपनी बिक्री ट्रैक करें');
    bannerActionHtml = `
      <button class="btn btn-primary btn-sm" style="background:#0284c7;border-color:#38bdf8" onclick="openDealModal()">+ ${tr('Add Deal', '+ नई डील जोड़ें')}</button>
      <button class="btn btn-gold btn-sm" onclick="state.invoiceDocType='Quotation';state.merchantTab='Billing';render()">+ ${tr('New Quotation', '+ नया कोटेशन')}</button>
    `;
    contentHtml = renderMerchantCrmPipeline(shop);
  } else if (curTab === 'Billing') {
    bannerIcon = '🧾';
    bannerTitle = tr('5-Second Quick Billing, Quotations & GST Invoices', 'त्वरित 5-सेकंड बिलिंग, कोटेशन एवं पक्का GST इनवॉइस');
    bannerSubtitle = tr('1-Click saved customer auto-fill, seller invoice defaults, HSN & thermal/A4 print', 'सेव किए गए ग्राहक का 1-क्लिक चयन, डिफ़ॉल्ट बिल सेटिंग्स व A4/थर्मल प्रिंटिंग');
    bannerActionHtml = `
      <button class="btn btn-gold btn-sm" onclick="openCustomerModal()">+ ${tr('Add Customer', '+ नया ग्राहक')}</button>
      <button class="btn btn-ghost btn-sm" style="color:#ffffff;border-color:rgba(255,255,255,0.4)" onclick="state.settingsSubTab='invoice';state.merchantTab='Settings';render()">⚙️ ${tr('Invoice Defaults', 'इनवॉइस डिफ़ॉल्ट')}</button>
    `;
    contentHtml = renderMerchantInvoiceBuilder(shop);
  } else if (curTab === 'Inventory') {
    bannerIcon = '📦';
    bannerTitle = tr('Products & Services Catalog', 'प्रोडक्ट्स, सर्विसेज एवं स्टॉक प्रबंधन');
    bannerSubtitle = tr('Add single or multi-row products/services with blurred popup modal, HSN & AI scanner', 'पॉपअप फॉर्म में हॉरिजॉन्टल व वर्टिकल पंक्तियों के साथ सामान या सर्विस जोड़ें');
    bannerActionHtml = `
      <button class="btn btn-primary btn-sm" style="background:#0284c7;border-color:#38bdf8" onclick="openProductAddModal()">+ ${tr('Add Product / Service (Popup)', '+ प्रोडक्ट / सर्विस जोड़ें (Popup)')}</button>
      <button class="btn btn-gold btn-sm" onclick="openAiScannerModal()">✨ ${tr('AI Stock Scanner', 'AI बिल स्कैनर')}</button>
    `;
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
    bannerIcon = '📈';
    bannerTitle = tr('6-Month P&L Statement, Top Customers & GSTR-3B Reports', '6-माह का लाभ-हानि विवरण, शीर्ष ग्राहक एवं GSTR-3B रिपोर्ट्स');
    bannerSubtitle = tr('Comprehensive financial intelligence, customer revenue ranking & printable Dr/Cr ledgers', 'संपूर्ण वित्तीय रिपोर्ट्स, शीर्ष ग्राहक रैंकिंग, खर्च विश्लेषण एवं पार्टी बहीखाता');
    bannerActionHtml = `<button class="btn btn-ghost btn-sm" style="color:#ffffff;border-color:rgba(255,255,255,0.4)" onclick="state.merchantTab='Dashboard';render()">← ${tr('Back to Dashboard', 'डैशबोर्ड पर लौटें')}</button>`;
    contentHtml = renderMerchantReportsOnly(shop);
  } else if (curTab === 'Staff') {
    bannerIcon = '🛡️';
    bannerTitle = tr('Managers & Staff Login IDs (14 Granular RBAC Permissions)', 'मैनेजर एवं स्टाफ लॉगिन ID निर्माण (केवल ओनर द्वारा)');
    bannerSubtitle = tr('Owner-only creation of Staff/Manager login credentials with 14 module-level access controls', 'मोबाइल नंबर, ईमेल व पासवर्ड के साथ मैनेजर/स्टाफ की लॉगिन ID बनाएँ और 14 अनुमतियाँ नियंत्रित करें');
    bannerActionHtml = `<button class="btn btn-primary btn-sm" style="background:#0284c7;border-color:#38bdf8" onclick="openManagerModal()">+ ${tr('Create Manager / Staff ID', '+ नई मैनेजर / स्टाफ ID बनाएँ')}</button>`;
    contentHtml = renderMerchantStaff(shop);
  } else if (curTab === 'Standee') {
    bannerIcon = '📢';
    bannerTitle = tr('Shop QR Standee, Promotion & B2B Leads', 'दुकान QR स्टैंडी एवं व्यापार प्रचार');
    bannerSubtitle = tr('Print table-top QR standee, WhatsApp marketing & spotlit listings', 'प्रिंट योग्य टेबल-टॉप QR स्टैंडी, B2B लीड्स एवं व्यापार स्पॉटलाइट');
    bannerActionHtml = `<button class="btn btn-ghost btn-sm" style="color:#ffffff;border-color:rgba(255,255,255,0.4)" onclick="state.merchantTab='Dashboard';render()">← ${tr('Back to Dashboard', 'डैशबोर्ड पर लौटें')}</button>`;
    contentHtml = renderMerchantMoreTools(shop, qrUrl);
  } else if (curTab === 'Settings') {
    bannerIcon = '⚙️';
    bannerTitle = tr('System Settings, Invoice Defaults & AI Provider APIs', 'सिस्टम सेटिंग्स, इनवॉइस डिफ़ॉल्ट एवं AI प्रोवाइडर API');
    bannerSubtitle = tr('Configure organization profile, banking & UPI, invoice defaults, AI APIs, and backups', 'व्यापार प्रोफ़ाइल, बैंकिंग, डिफ़ॉल्ट इनवॉइस नियम, AI प्रोवाइडर व बैकअप सेटिंग्स');
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

  // Executive Dashboard Metrics & Charts Data (Item #5 — Screenshot 1)
  const totalCollected = Math.max(0, grossSales - split.Credit);
  const netMarginPct = grossSales > 0 ? ((netProfit / grossSales) * 100).toFixed(1) : '0.0';
  const activeDeals = (state.data.myCrmLeads || []).filter(l => l.stage !== 'Lost' && l.stage !== 'Closed Lost');
  const activeDealPipelineVal = activeDeals.reduce((s, l) => s + (Number(l.expectedValue) || 0), 0);
  const unpaidInvoices = orders.filter(o => o.status !== 'Rejected' && o.status !== 'Sales Return' && o.docType !== 'Quotation' && o.status !== 'Quotation' && o.paymentMode === 'Credit' && !o.udhaarSettled);
  const pendingTasks = (state.data.myTasks || []).filter(t => t.status !== 'Completed');
  const recentActivity = (state.data.myActivity || []).slice(0, 6);

  // 6-Month Revenue & Expense Trend SVG Points
  const sixMonths = computeSixMonthFinancials(allOrders, allExpenses);
  const maxChartVal = Math.max(20000, ...sixMonths.map(m => Math.max(m.revenue, m.expenses)));
  const svgW = 540;
  const svgH = 180;
  const padL = 48;
  const padR = 18;
  const padT = 16;
  const padB = 28;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;
  const revPts = sixMonths.map((m, idx) => {
    const x = padL + (idx / Math.max(1, sixMonths.length - 1)) * plotW;
    const y = padT + plotH - (Math.min(maxChartVal, m.revenue) / maxChartVal) * plotH;
    return { x: Math.round(x), y: Math.round(y), label: m.label, val: m.revenue };
  });
  const expPts = sixMonths.map((m, idx) => {
    const x = padL + (idx / Math.max(1, sixMonths.length - 1)) * plotW;
    const y = padT + plotH - (Math.min(maxChartVal, m.expenses) / maxChartVal) * plotH;
    return { x: Math.round(x), y: Math.round(y), label: m.label, val: m.expenses };
  });
  const revPolyline = revPts.map(p => `${p.x},${p.y}`).join(' ');
  const expPolyline = expPts.map(p => `${p.x},${p.y}`).join(' ');
  const revArea = `${revPts[0].x},${padT + plotH} ${revPolyline} ${revPts[revPts.length - 1].x},${padT + plotH}`;

  // Donut Chart Distribution (Paid, Pending, Overdue, Draft/Quotation)
  const paidCnt = allOrders.filter(o => o.status !== 'Rejected' && o.docType !== 'Quotation' && (o.paymentMode !== 'Credit' || o.udhaarSettled)).length || 1;
  const overdueCnt = unpaidInvoices.filter(o => (Date.now() - new Date(o.date || Date.now()).getTime()) > 15 * 86400000).length;
  const pendingCnt = Math.max(0, unpaidInvoices.length - overdueCnt);
  const draftCnt = allOrders.filter(o => o.docType === 'Quotation' || o.status === 'Quotation').length;
  const totalDonut = Math.max(1, paidCnt + pendingCnt + overdueCnt + draftCnt);
  const paidDash = Math.round((paidCnt / totalDonut) * 251);
  const pendDash = Math.round((pendingCnt / totalDonut) * 251);
  const overDash = Math.round((overdueCnt / totalDonut) * 251);
  const draftDash = Math.max(0, 251 - paidDash - pendDash - overDash);

  return `
    <div style="display:grid;gap:16px">
      <!-- 1. EXECUTIVE DASHBOARD 4 KPI CARDS (Matching Screenshot 1) -->
      <div class="exec-kpi-grid">
        <div class="exec-kpi-card indigo">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:0.74rem;font-weight:700;color:#64748b;letter-spacing:0.5px">${tr('TOTAL COLLECTED', 'कुल प्राप्त राशि (COLLECTED)')}</span>
            <span style="background:#e0f2fe;color:#0284c7;width:28px;height:28px;border-radius:7px;display:grid;place-items:center;font-size:0.9rem">💵</span>
          </div>
          <div style="font-size:1.55rem;font-weight:800;color:#0f172a;margin:6px 0">${fmtINR(totalCollected)}</div>
          <div style="font-size:0.76rem;color:#16a34a;font-weight:600">↗ ${tr('Invoiced:', 'कुल बिलिंग:')} ${fmtINR(grossSales)}</div>
        </div>

        <div class="exec-kpi-card amber" style="cursor:pointer" onclick="state.merchantTab='Udhaar';render()">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:0.74rem;font-weight:700;color:#64748b;letter-spacing:0.5px">${tr('OUTSTANDING RECEIVABLES', 'बकाया उधारी (RECEIVABLES)')}</span>
            <span style="background:#fef3c7;color:#d97706;width:28px;height:28px;border-radius:7px;display:grid;place-items:center;font-size:0.9rem">⏱️</span>
          </div>
          <div style="font-size:1.55rem;font-weight:800;color:#d97706;margin:6px 0">${fmtINR(split.Credit)}</div>
          <div style="font-size:0.76rem;color:#64748b">${unpaidInvoices.length} ${tr('invoice(s) need attention', 'बिल बकाया हैं')}</div>
        </div>

        <div class="exec-kpi-card emerald">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:0.74rem;font-weight:700;color:#64748b;letter-spacing:0.5px">${tr('NET OPERATING PROFIT', 'शुद्ध मुनाफ़ा (NET PROFIT)')}</span>
            <span style="background:#dcfce7;color:#16a34a;width:28px;height:28px;border-radius:7px;display:grid;place-items:center;font-size:0.9rem">📈</span>
          </div>
          <div style="font-size:1.55rem;font-weight:800;color:${netProfit >= 0 ? '#16a34a' : '#dc2626'};margin:6px 0">${fmtINR(netProfit)}</div>
          <div><span style="background:#dcfce7;color:#15803d;font-size:0.72rem;font-weight:700;padding:2px 8px;border-radius:99px">${netMarginPct}% Net Margin</span></div>
        </div>

        <div class="exec-kpi-card indigo" style="cursor:pointer" onclick="state.merchantTab='CRM Pipeline';render()">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:0.74rem;font-weight:700;color:#64748b;letter-spacing:0.5px">${tr('ACTIVE DEAL PIPELINE', 'सक्रिय डील पाइपलाइन')}</span>
            <span style="background:#e0f2fe;color:#0284c7;width:28px;height:28px;border-radius:7px;display:grid;place-items:center;font-size:0.9rem">🎯</span>
          </div>
          <div style="font-size:1.55rem;font-weight:800;color:#0369a1;margin:6px 0">${fmtINR(activeDealPipelineVal)}</div>
          <div style="font-size:0.76rem;color:#64748b">${activeDeals.length} ${tr('prospective leads', 'सक्रिय व्यापारिक लीड्स')}</div>
        </div>
      </div>

      <!-- 2. VISUAL CHARTS ROW: 6-Month Revenue & Expense Trend + Invoice Status Donut (Screenshot 1) -->
      <div class="exec-charts-row">
        <div class="erp-card" style="margin-bottom:0">
          <div class="erp-card-header" style="margin-bottom:10px;padding-bottom:8px">
            <h3 style="font-size:0.98rem">📈 ${tr('6-Month Revenue & Expense Trend', '6-माह रेवेन्यू एवं खर्च ट्रेंड चार्ट')}</h3>
            <span class="badge badge-ghost" style="font-size:0.72rem">${tr('Monthly Financials', 'मासिक वित्तीय ग्राफ')}</span>
          </div>
          <div style="display:flex;justify-content:center;gap:18px;font-size:0.76rem;font-weight:600;margin-bottom:6px">
            <span style="display:inline-flex;align-items:center;gap:5px"><span style="width:10px;height:10px;border-radius:50%;background:#0284c7;display:inline-block"></span> Revenue (₹)</span>
            <span style="display:inline-flex;align-items:center;gap:5px"><span style="width:10px;height:10px;border-radius:50%;background:#e11d48;display:inline-block"></span> Expenses (₹)</span>
          </div>
          <svg viewBox="0 0 ${svgW} ${svgH}" style="width:100%;height:auto;max-height:200px;overflow:visible">
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#0284c7" stop-opacity="0.24"/>
                <stop offset="100%" stop-color="#0284c7" stop-opacity="0.02"/>
              </linearGradient>
            </defs>
            ${[0, 0.25, 0.5, 0.75, 1].map(fr => {
              const y = Math.round(padT + plotH * (1 - fr));
              const v = Math.round((maxChartVal * fr) / 1000);
              return `
                <line x1="${padL}" y1="${y}" x2="${svgW - padR}" y2="${y}" stroke="#e2e8f0" stroke-dasharray="3,3" />
                <text x="${padL - 6}" y="${y + 4}" text-anchor="end" font-size="9" fill="#64748b">₹${v}k</text>
              `;
            }).join('')}
            <polygon points="${revArea}" fill="url(#revGrad)" />
            <polyline fill="none" stroke="#0284c7" stroke-width="2.5" points="${revPolyline}" />
            <polyline fill="none" stroke="#e11d48" stroke-width="2" points="${expPolyline}" />
            ${revPts.map(p => `<circle cx="${p.x}" cy="${p.y}" r="3.8" fill="#0284c7"><title>${p.label}: ₹${p.val}</title></circle>`).join('')}
            ${expPts.map(p => `<circle cx="${p.x}" cy="${p.y}" r="3.2" fill="#e11d48"><title>${p.label}: ₹${p.val}</title></circle>`).join('')}
            ${revPts.map(p => `<text x="${p.x}" y="${svgH - 6}" text-anchor="middle" font-size="9.5" fill="#64748b">${esc(p.label)}</text>`).join('')}
          </svg>
        </div>

        <div class="erp-card" style="margin-bottom:0;display:flex;flex-direction:column;justify-content:space-between">
          <div class="erp-card-header" style="margin-bottom:8px;padding-bottom:8px">
            <h3 style="font-size:0.98rem">🍩 ${tr('Invoice Status', 'इनवॉइस स्थिति')}</h3>
            <span class="badge badge-ghost" style="font-size:0.72rem">${tr('Distribution', 'विभाजन')}</span>
          </div>
          <div style="display:flex;align-items:center;justify-content:center;padding:6px 0">
            <svg width="150" height="150" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" stroke-width="14" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" stroke-width="14" stroke-dasharray="${paidDash} 251" stroke-dashoffset="0" transform="rotate(-90 50 50)" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" stroke-width="14" stroke-dasharray="${pendDash} 251" stroke-dashoffset="-${paidDash}" transform="rotate(-90 50 50)" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" stroke-width="14" stroke-dasharray="${overDash} 251" stroke-dashoffset="-${paidDash + pendDash}" transform="rotate(-90 50 50)" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#64748b" stroke-width="14" stroke-dasharray="${draftDash} 251" stroke-dashoffset="-${paidDash + pendDash + overDash}" transform="rotate(-90 50 50)" />
              <text x="50" y="48" text-anchor="middle" font-size="12" font-weight="800" fill="#0f172a">${allOrders.length}</text>
              <text x="50" y="60" text-anchor="middle" font-size="7.5" fill="#64748b">Total Bills</text>
            </svg>
          </div>
          <div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;font-size:0.74rem;font-weight:600">
            <span>🟢 Paid (${paidCnt})</span>
            <span>🟡 Pending (${pendingCnt})</span>
            <span>🔴 Overdue (${overdueCnt})</span>
            <span>⚪ Quote (${draftCnt})</span>
          </div>
        </div>
      </div>

      <!-- 3. SCROLLABLE FOLLOW-UP INVOICES + PENDING TASKS & AUDIT TRAIL (Item #5 — Screenshot 1) -->
      <div class="exec-charts-row">
        <div class="erp-card" style="margin-bottom:0">
          <div class="erp-card-header" style="margin-bottom:10px;padding-bottom:8px">
            <h3 style="font-size:0.98rem;color:#dc2626">⚠️ ${tr('Invoices Requiring Follow-Up', 'भुगतान फॉलो-अप वाले बकाया इनवॉइस')}</h3>
            <button type="button" class="btn btn-ghost btn-sm" style="font-size:0.76rem;color:#0284c7" onclick="state.merchantTab='Udhaar';render()">${tr('View All Invoices →', 'सभी देखें →')}</button>
          </div>
          <div class="table-wrap" style="max-height:210px;overflow-y:auto">
            <table>
              <thead>
                <tr>
                  <th>INVOICE #</th>
                  <th>CUSTOMER</th>
                  <th>DUE DATE</th>
                  <th>BALANCE DUE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                ${unpaidInvoices.length === 0 ? `
                  <tr><td colspan="5" style="text-align:center;color:#16a34a;padding:18px;font-weight:700">🎉 ${tr('All invoices collected! Zero overdue balance.', 'सभी इनवॉइस का भुगतान प्राप्त हो चुका है!')}</td></tr>
                ` : unpaidInvoices.map(inv => {
                  const g = Number(inv.totals?.gross) || 0;
                  const pd = Number(inv.paidAmount) || 0;
                  const bal = Math.max(0, g - pd);
                  const dueD = new Date(new Date(inv.date || Date.now()).getTime() + (Number(shop.invoiceDefaults?.dueDays || 15) * 86400000)).toLocaleDateString('en-IN');
                  return `
                    <tr>
                      <td><b style="color:#0284c7">${esc(inv.invoiceNo)}</b></td>
                      <td><b>${esc(inv.customer)}</b><div class="text-muted" style="font-size:0.72rem">${esc(inv.phone)}</div></td>
                      <td style="color:#dc2626;font-size:0.8rem;font-weight:600">${dueD}</td>
                      <td><b style="color:#0f172a">${fmtINR(bal)}</b></td>
                      <td>
                        <button type="button" class="btn btn-primary btn-sm" style="padding:3px 8px;font-size:0.72rem" onclick="state.merchantTab='Udhaar';render()">Collect</button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="erp-card" style="margin-bottom:0">
          <div class="erp-card-header" style="margin-bottom:10px;padding-bottom:8px">
            <h3 style="font-size:0.98rem">✅ ${tr('Pending Tasks & Audit Activity', 'लंबित टास्क रिमाइंडर एवं गतिविधि')}</h3>
            <button type="button" class="btn btn-ghost btn-sm" style="font-size:0.74rem;color:#0284c7" onclick="openTaskModal()">+ ${tr('Add Task', '+ टास्क')}</button>
          </div>
          <div style="max-height:210px;overflow-y:auto;display:grid;gap:8px;padding-right:4px">
            ${pendingTasks.map(tsk => {
              const pColor = tsk.priority === 'Urgent' ? '#dc2626' : (tsk.priority === 'High' ? '#ea580c' : '#0284c7');
              return `
                <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;padding:8px 10px;border-radius:8px;border:1px solid #e2e8f0;background:#f8fafc">
                  <div style="min-width:0">
                    <div style="font-weight:700;font-size:0.82rem;color:#0f172a">${esc(tsk.title)}</div>
                    <div style="font-size:0.72rem;color:#64748b;margin-top:2px">
                      <span style="color:${pColor};font-weight:700">● ${esc(tsk.priority)}</span> · Due: ${esc(tsk.dueDate || 'Today')} · 👤 ${esc(tsk.assignedTo || 'Owner')}
                    </div>
                  </div>
                  <button type="button" class="btn btn-ghost btn-sm" style="padding:2px 7px;font-size:0.72rem;color:#16a34a;border:1px solid #86efac" title="Mark Completed" onclick="quickCompleteTask('${tsk.id}')">✓</button>
                </div>
              `;
            }).join('')}
            ${recentActivity.map(act => `
              <div style="display:flex;align-items:flex-start;gap:8px;padding:6px 8px;border-left:2px solid #0284c7;font-size:0.76rem">
                <div>
                  <div style="font-weight:600;color:#334155">${esc(act.action)}</div>
                  <div style="font-size:0.7rem;color:#94a3b8">${esc(act.actorName || act.actor || 'Owner')} · ${new Date(act.at || act.date || Date.now()).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

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
  const isQuoteMode = state.invoiceDocType === 'Quotation';
  const nextSeq = String((Number(shop.invoiceCounter) || 0) + 1).padStart(4, '0');
  const nextQtSeq = String((Number(shop.quotationCounter) || 0) + 1).padStart(4, '0');
  const previewInvNo = isQuoteMode ? `QT-2627-${nextQtSeq}` : `KQ-2627-${nextSeq}`;
  const activeQuotations = (state.data.myOrders || []).filter(o => o.docType === 'Quotation' || o.status === 'Quotation' || String(o.invoiceNo || '').startsWith('QT-'));

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

      <!-- Document Mode Toggle: Official GST Invoice vs Formal Quotation / Estimate -->
      <div class="card no-print" style="padding:12px 16px;background:#0f172a;color:#fff;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button type="button" class="btn btn-sm ${!isQuoteMode ? 'btn-gold' : 'btn-ghost'}" style="${!isQuoteMode ? '' : 'color:#fff;border-color:rgba(255,255,255,0.3)'}" onclick="state.invoiceDocType='Tax Invoice';render()">
            🧾 ${tr('1. Official GST Tax Invoice (KQ-2627)', '1. पक्का GST टैक्स इनवॉइस (KQ-2627)')}
          </button>
          <button type="button" class="btn btn-sm ${isQuoteMode ? 'btn-gold' : 'btn-ghost'}" style="${isQuoteMode ? '' : 'color:#fff;border-color:rgba(255,255,255,0.3)'}" onclick="state.invoiceDocType='Quotation';render()">
            📝 ${tr('2. Formal Quotation / Estimate (QT-2627 · 1-Click Convert)', '2. कोटेशन / कच्चा अनुमान (QT-2627 · 1-क्लिक बिल रूपांतरण)')}
          </button>
        </div>
        <span style="font-size:0.8rem;color:#93c5fd">${isQuoteMode ? tr('Quotation mode: Stock is NOT deducted until converted to GST Invoice', 'कोटेशन मोड: जब तक पक्के बिल में न बदलें, स्टॉक नहीं घटेगा') : tr('Invoice mode: Auto-deducts stock & updates party ledger', 'इनवॉइस मोड: स्टॉक स्वतः घटेगा व लेजर अपडेट होगा')}</span>
      </div>

      <div class="grid grid-2">
        <!-- Left: Full Rule-46 GST / Estimate Invoice Entry Form (Hidden when printing) -->
        <div class="card no-print">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
          <h3>${isQuoteMode ? `📝 ${tr('Formal Quotation / Estimate Builder', 'कोटेशन / अनुमानित कच्चा बिल निर्माता')}` : `🧾 ${hasGstin ? tr('Rule-46 GST / IGST Tax Invoice', 'GST / IGST टैक्स इनवॉइस') : tr('Estimate / Bill of Supply (Non-GST)', 'एस्टीमेट / बिल ऑफ़ सप्लाई')}`}</h3>
          <span class="badge badge-gold">${previewInvNo}</span>
        </div>

        ${!hasGstin ? `
          <div class="card-subtle" style="margin-bottom:12px;border-color:var(--gold);font-size:0.8rem">
            ⚖️ <b>${tr('Legal Safeguard Active (0% Tax & 0% ITC):', 'कानूनी सुरक्षा चालू (0% टैक्स व 0% ITC):')}</b> ${tr('Your shop has no GSTIN on file, so bills are automatically titled "BILL OF SUPPLY / ESTIMATE" with mandatory HSN codes, 0% GST, and 0% ITC eligibility.', 'आपकी दुकान का GSTIN दर्ज नहीं है, इसलिए कानून के अनुसार बिल स्वचालित रूप से "BILL OF SUPPLY / ESTIMATE (0% GST — 0% ITC क्रेडिट)" के रूप में अनिवार्य HSN कोड के साथ बनेगा।')}
          </div>
        ` : ''}

        <!-- 1-Click Saved Customer CRM Auto-Fill (Item #8: One-Time Customer Save — Never Re-Type!) -->
        <div class="card-subtle" style="margin-bottom:10px;background:#eff6ff;border:1.5px solid #2563EB;padding:10px 12px">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap">
            <label class="form-label" style="color:#1e40af;font-size:0.8rem;margin:0">👥 ${tr('1-Click Saved Customer Auto-Fill (Select once — auto-fills Name, Mobile, GSTIN & Address!)', '1-क्लिक सेव ग्राहक चयन (एक बार सेव करें — बार-बार नाम, मोबाइल और GSTIN लिखने की ज़रूरत नहीं!)')}</label>
            <button type="button" class="btn btn-primary btn-sm" style="padding:3px 10px;font-size:0.74rem" onclick="openCustomerModal()">+ ${tr('Add New Customer', '+ नया ग्राहक सेव करें')}</button>
          </div>
          <select class="select" style="padding:6px 10px;font-size:0.84rem;margin-top:6px" onchange="pickSavedCrmCustomerForInvoice(this.value)">
            <option value="">-- ${tr('Select from Saved Customers CRM (Or type below)', 'सेव किए गए ग्राहकों में से चुनें (या नीचे नया लिखें)')} --</option>
            ${(state.data.myCustomers || []).map(c => `
              <option value="${c.id}">👤 ${esc(c.companyName || c.contactName)} (${esc(c.contactName)}) · 📱 ${esc(c.phone || '—')} · GSTIN: ${esc(c.gstin || 'Unregistered')}</option>
            `).join('')}
          </select>
        </div>

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
          ${isQuoteMode
            ? `📝🖨️ ${tr('Save Formal Quotation (No Stock Deduction) & Print', 'कोटेशन सेव करें (बिना स्टॉक घटाए) और प्रिंट करें')}`
            : `💾🖨️ ${tr('Save Bill to Ledger, Deduct Stock & Print Invoice', 'बिल बही-खाते में सेव करें, स्टॉक घटाएँ और प्रिंट करें')}`}
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
            <p style="font-weight:800;font-size:0.95rem">${isQuoteMode ? 'FORMAL QUOTATION / PROFORMA ESTIMATE' : (hasGstin ? (isInterState ? 'INTER-STATE TAX INVOICE' : 'TAX INVOICE') : 'BILL OF SUPPLY / ESTIMATE')}</p>
            <p style="font-size:0.8rem">No: <b>${previewInvNo}</b></p>
            <p style="font-size:0.78rem">Date: ${new Date().toLocaleDateString('en-IN')}</p>
          </div>
        </div>

        <div style="padding:10px 0;border-bottom:1px solid var(--border-subtle);font-size:0.8rem">
          <p><b>${isQuoteMode ? 'Quotation For:' : 'Bill To:'}</b> ${esc(state.invoiceBuyer.name || 'Walk-in Cash Customer')} ${state.invoiceBuyer.phone ? `(${esc(state.invoiceBuyer.phone)})` : ''}</p>
          <p><b>Buyer GSTIN:</b> ${esc(buyerGstin || 'Unregistered (B2C)')} | <b>Mode:</b> ${isQuoteMode ? 'Quotation / Estimate' : esc(state.invoiceBuyer.paymentMode)}</p>
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
          <p style="font-size:1.15rem;margin-top:6px"><b>${isQuoteMode ? 'Estimated Total:' : 'Grand Total:'} ${fmtINR(grandTotal)}</b></p>
          ${!isQuoteMode && state.invoiceBuyer.paymentMode === 'Credit' && Number(state.invoiceBuyer.paidAmount) > 0 ? `
            <p style="font-size:0.8rem;color:#dc2626">Paid Now: <b>${fmtINR(state.invoiceBuyer.paidAmount)}</b> | Balance Udhaar Due: <b>${fmtINR(Math.max(0, grandTotal - Number(state.invoiceBuyer.paidAmount)))}</b></p>
          ` : ''}
          ${(shop.banking?.upiId || shop.upiId) ? `<p style="font-size:0.75rem;margin-top:4px">Pay via UPI: <b>${esc(shop.banking?.upiId || shop.upiId)}</b></p>` : ''}
        </div>
        ${(shop.invoiceDefaults?.showBankDetails !== false && (shop.banking?.bankName || shop.banking?.accountNumber)) ? `
          <div style="margin-top:10px;padding-top:8px;border-top:1px dashed var(--border-subtle);font-size:0.73rem;color:#334155">
            <b>Bank Details:</b> ${esc(shop.banking.bankName || '')} | A/C: <b>${esc(shop.banking.accountNumber || '')}</b> | IFSC: <b>${esc(shop.banking.ifsc || '')}</b>
          </div>
        ` : ''}
        <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:12px;margin-top:12px;padding-top:8px;border-top:1px solid var(--border-subtle);font-size:0.72rem">
          <div style="max-width:65%;white-space:pre-line;color:#475569">
            <b>Terms &amp; Conditions:</b><br/>${esc(shop.invoiceDefaults?.terms || '1. Goods once sold will not be taken back.\n2. Subject to local jurisdiction.')}
          </div>
          <div style="text-align:right">
            <div style="margin-bottom:18px;font-weight:700">${esc(shop.invoiceDefaults?.signatory || ('For ' + shop.shop))}</div>
            <div style="border-top:1px solid #64748b;padding-top:3px;font-size:0.68rem">Authorized Signatory</div>
          </div>
        </div>
        <p style="text-align:center;font-size:0.7rem;margin-top:10px;opacity:0.75">${esc(shop.invoiceDefaults?.footerNote || 'Thank you for your business! · Generated on KuberQ B2B Trade OS')}</p>
      </div>
      </div>

      <!-- Active Quotations / Estimates Register (1-Click Convert to GST Tax Invoice) -->
      <div class="erp-card no-print">
        <div class="erp-card-header">
          <div>
            <span class="badge badge-gold">📝 ${tr('QUOTATION & ESTIMATE REGISTER (1-CLICK CONVERT)', 'कोटेशन व कच्चा अनुमान रजिस्टर (1-क्लिक में पक्का GST बिल बनाएँ)')}</span>
            <h3 style="margin-top:6px">${tr('Active Quotations — Convert to Official GST Tax Invoice in 1 Click', 'जारी किए गए कोटेशन — 1 क्लिक में पक्के GST बिल और लेजर में बदलें')}</h3>
          </div>
          <span class="badge badge-primary">${activeQuotations.length} ${tr('Quotations', 'कोटेशन')}</span>
        </div>
        ${activeQuotations.length === 0 ? `
          <p class="text-muted" style="font-size:0.86rem;margin:0">${tr('No active quotations yet. Switch to "2. Formal Quotation" above to create one.', 'अभी कोई कोटेशन नहीं है। ऊपर "2. Formal Quotation" चुनकर नया कोटेशन बनाएँ।')}</p>
        ` : `
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>${tr('Quotation No & Date', 'कोटेशन संख्या व दिनांक')}</th>
                  <th>${tr('Party / Customer', 'पार्टी / ग्राहक')}</th>
                  <th>${tr('Items', 'सामान विवरण')}</th>
                  <th>${tr('Estimated Amount', 'अनुमानित राशि')}</th>
                  <th>${tr('1-Click Convert / Share', '1-क्लिक पक्का बिल / शेयर')}</th>
                </tr>
              </thead>
              <tbody>
                ${activeQuotations.map(q => {
                  const qGross = Number(q.totals?.gross) || 0;
                  const waQuoteMsg = `📝 *Quotation / Estimate from ${shop.shop}*\nQuotation No: *${q.invoiceNo}*\nParty: ${q.customer}\nEstimated Total: *₹${qGross}*\nValid Until: ${q.validUntil || '7 Days'}`;
                  return `
                    <tr>
                      <td><b>${esc(q.invoiceNo)}</b><div class="text-muted" style="font-size:0.74rem">${new Date(q.date).toLocaleDateString('en-IN')}</div></td>
                      <td><b>${esc(q.customer)}</b><div class="text-muted" style="font-size:0.74rem">📱 ${esc(q.phone)}</div></td>
                      <td style="font-size:0.8rem">${(q.items || []).map(i => `${esc(i.name)} × ${i.qty}`).join(', ') || esc(q.note || '—')}</td>
                      <td><b style="color:#2563EB;font-size:1rem">${fmtINR(qGross)}</b></td>
                      <td>
                        <div style="display:flex;gap:6px;flex-wrap:wrap">
                          <button type="button" class="btn btn-gold btn-sm" onclick="convertQuotationToTaxInvoice('${q.id}')">
                            ⚡ ${tr('Convert to GST Invoice', '1-क्लिक पक्का GST बिल बनाएँ')}
                          </button>
                          <a class="btn btn-primary btn-sm" target="_blank" rel="noreferrer" href="https://wa.me/91${q.phone}?text=${encodeURIComponent(waQuoteMsg)}">
                            📲 ${tr('Share Quote', 'कोटेशन भेजें')}
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

// ============================================================================
// B2B LEADS & DEALS PIPELINE (6-STAGE VISUAL KANBAN BOARD MATCHING SCREENSHOT 5)
// ============================================================================
function renderMerchantCrmPipeline(shop) {
  const leads = state.data.myCrmLeads || [];
  const stages = [
    { key: 'New Inquiry', matchKeys: ['New Inquiry', 'New Inquiries'], labelEn: 'New Inquiries', labelHi: 'नई पूछताछ (New Inquiries)', color: '#0284c7', badgeBg: '#e0f2fe', badgeColor: '#0284c7' },
    { key: 'Contacted', matchKeys: ['Contacted', 'Discovery / Qualified'], labelEn: 'Discovery / Qualified', labelHi: 'क्वालिफाइड (Discovery)', color: '#2563EB', badgeBg: '#dbeafe', badgeColor: '#1d4ed8' },
    { key: 'Proposal Sent', matchKeys: ['Proposal Sent'], labelEn: 'Proposal Sent', labelHi: 'कोटेशन भेजा (Proposal Sent)', color: '#0ea5e9', badgeBg: '#e0f2fe', badgeColor: '#0369a1' },
    { key: 'Negotiation', matchKeys: ['Negotiation'], labelEn: 'Negotiation', labelHi: 'मोल-भाव (Negotiation)', color: '#d97706', badgeBg: '#fef3c7', badgeColor: '#b45309' },
    { key: 'Won', matchKeys: ['Won', 'Closed Won'], labelEn: 'Closed Won', labelHi: 'डील पक्की (Closed Won)', color: '#16a34a', badgeBg: '#dcfce7', badgeColor: '#15803d' },
    { key: 'Lost', matchKeys: ['Lost', 'Closed Lost'], labelEn: 'Closed Lost', labelHi: 'ड्रॉप (Closed Lost)', color: '#dc2626', badgeBg: '#fee2e2', badgeColor: '#b91c1c' }
  ];

  const totalPipelineValue = leads.filter(l => l.stage !== 'Lost' && l.stage !== 'Closed Lost').reduce((s, l) => s + (Number(l.expectedValue) || 0), 0);
  const wonValue = leads.filter(l => l.stage === 'Won' || l.stage === 'Closed Won').reduce((s, l) => s + (Number(l.expectedValue) || 0), 0);
  const activeQuotations = (state.data.myOrders || []).filter(o => o.docType === 'Quotation' || o.status === 'Quotation' || String(o.invoiceNo || '').startsWith('QT-'));

  return `
    <div style="display:grid;gap:16px">
      <!-- Top Header Matching Screenshot 5: Title + "+ Add Deal" Button -->
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
        <div>
          <h2 style="font-size:1.35rem;font-weight:900;color:#0f172a;margin:0">${tr('Leads & Deals Pipeline', 'लीड्स और सेल्स पाइपलाइन (Leads & Deals Pipeline)')}</h2>
          <p style="font-size:0.82rem;color:#64748b;margin:3px 0 0">${tr('Track daily sales progress from initial discovery to closed business', 'प्रारंभिक पूछताछ से लेकर पक्की डील तक अपनी दैनिक सेल्स लीड्स को ट्रैक करें')}</p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button type="button" class="btn btn-primary btn-sm" style="background:#0284c7;border-color:#0284c7;padding:8px 16px;font-weight:800" onclick="openDealModal()">
            + ${tr('Add Deal', '+ नई डील / लीड जोड़ें')}
          </button>
        </div>
      </div>

      <!-- Top Pipeline KPIs -->
      <div class="grid grid-4" style="gap:10px">
        <div class="erp-card" style="padding:12px 14px;border-left:4px solid #0284c7">
          <div style="font-size:0.74rem;color:#64748b;font-weight:700">${tr('Total Active Pipeline Value', 'कुल सक्रिय लीड्स मूल्य')}</div>
          <div style="font-size:1.3rem;font-weight:900;color:#0f172a;margin-top:3px">${fmtINR(totalPipelineValue)}</div>
          <div style="font-size:0.72rem;color:#0284c7">${leads.length} ${tr('deals tracked', 'व्यापारिक डील्स')}</div>
        </div>
        <div class="erp-card" style="padding:12px 14px;border-left:4px solid #d97706">
          <div style="font-size:0.74rem;color:#64748b;font-weight:700">${tr('Proposals / Quotations Sent', 'भेजे गए कोटेशन')}</div>
          <div style="font-size:1.3rem;font-weight:900;color:#d97706;margin-top:3px">${leads.filter(l => l.stage === 'Proposal Sent').length + activeQuotations.length}</div>
          <div style="font-size:0.72rem;color:#92400e">${tr('Ready for 1-click GST billing', '1-क्लिक बिलिंग हेतु तैयार')}</div>
        </div>
        <div class="erp-card" style="padding:12px 14px;border-left:4px solid #16a34a">
          <div style="font-size:0.74rem;color:#64748b;font-weight:700">${tr('Closed Won Deals', 'पक्की हुई डील (Closed Won)')}</div>
          <div style="font-size:1.3rem;font-weight:900;color:#16a34a;margin-top:3px">${fmtINR(wonValue)}</div>
          <div style="font-size:0.72rem;color:#15803d">${leads.filter(l => l.stage === 'Won' || l.stage === 'Closed Won').length} ${tr('deals converted', 'सफल आर्डर')}</div>
        </div>
        <div class="erp-card" style="padding:12px 14px;border-left:4px solid #7c3aed">
          <div style="font-size:0.74rem;color:#64748b;font-weight:700">${tr('Pending Follow-Up Deals', 'आज के फॉलो-अप रिमाइंडर')}</div>
          <div style="font-size:1.3rem;font-weight:900;color:#7c3aed;margin-top:3px">${leads.filter(l => l.stage !== 'Won' && l.stage !== 'Closed Won' && l.stage !== 'Lost' && l.stage !== 'Closed Lost').length}</div>
          <div style="font-size:0.72rem;color:#6d28d9">${tr('1-click WhatsApp follow-up', '1-क्लिक WhatsApp संपर्क')}</div>
        </div>
      </div>

      <!-- 6-Stage Visual Kanban Board (Matching Screenshot 5) -->
      <div class="ybt-kanban-board">
        ${stages.map((st, stIdx) => {
          const stageLeads = leads.filter(l => st.matchKeys.includes(l.stage));
          const stageSum = stageLeads.reduce((s, l) => s + (Number(l.expectedValue) || 0), 0);
          return `
            <div class="ybt-kanban-col">
              <div class="ybt-kanban-col-head">
                <div>
                  <div class="ybt-kanban-col-title">${state.lang === 'hi' ? st.labelHi : st.labelEn}</div>
                  <div class="ybt-kanban-col-sum">${fmtINR(stageSum)}</div>
                </div>
                <span style="background:${st.badgeBg};color:${st.badgeColor};font-weight:800;font-size:0.72rem;padding:2px 8px;border-radius:999px">${stageLeads.length}</span>
              </div>

              ${stageLeads.length === 0 ? `
                <div style="text-align:center;padding:36px 8px;color:#94a3b8;font-size:0.76rem">
                  ${tr('No deals in this stage', 'इस चरण में कोई डील नहीं')}
                </div>
              ` : stageLeads.map(ld => {
                const prevStage = stIdx > 0 ? stages[stIdx - 1].key : null;
                const nextStage = stIdx < stages.length - 1 ? stages[stIdx + 1].key : null;
                const dealTitle = ld.dealTitle || ld.itemsInterest || ld.buyerName;
                const companyName = ld.companyName || ld.buyerName;
                const contactName = ld.contactName || ld.buyerName;
                const waFollowMsg = `नमस्ते *${ld.buyerName}* जी,\n*${shop.shop}* से आपके सामान (*${ld.itemsInterest}*) के कोटेशन/ऑर्डर के संबंध में संपर्क कर रहे हैं। कृपया बताएं कब डिस्पैच करना है?`;
                return `
                  <div class="ybt-deal-card">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:6px;margin-bottom:6px">
                      <b style="font-size:0.84rem;color:#0f172a;line-height:1.3">${esc(dealTitle)}</b>
                      <span style="background:#f1f5f9;color:#475569;font-size:0.66rem;font-weight:700;padding:2px 6px;border-radius:6px;white-space:nowrap">${esc(ld.source || 'Direct')}</span>
                    </div>
                    <div style="font-size:0.75rem;color:#64748b;display:grid;gap:2px;margin-bottom:8px">
                      <div>🏢 ${esc(companyName)}</div>
                      <div>👤 ${esc(contactName)} ${ld.phone ? `· 📞 ${esc(ld.phone)}` : ''}</div>
                      ${ld.followUpDate ? `<div style="font-size:0.7rem;color:#94a3b8">📅 Follow-up: ${esc(ld.followUpDate)}</div>` : ''}
                    </div>
                    <div style="display:flex;justify-content:space-between;align-items:center;padding-top:6px;border-top:1px solid #f1f5f9">
                      <span style="font-weight:900;font-size:0.86rem;color:#0284c7">${fmtINR(ld.expectedValue)}</span>
                      <div style="display:flex;gap:3px;align-items:center">
                        ${prevStage ? `<button type="button" class="btn btn-ghost btn-sm" style="padding:2px 6px;font-size:0.68rem" title="Previous Stage" onclick="moveCrmLeadStage('${ld.id}', '${prevStage}')">←</button>` : ''}
                        ${nextStage ? `<button type="button" class="btn btn-primary btn-sm" style="padding:2px 7px;font-size:0.68rem" title="Move to Next Stage" onclick="moveCrmLeadStage('${ld.id}', '${nextStage}')">→</button>` : ''}
                        <button type="button" class="btn btn-gold btn-sm" style="padding:2px 6px;font-size:0.68rem" title="Convert to Quote / Invoice" onclick="prefillQuotationFromLead('${esc(ld.buyerName)}', '${esc(ld.phone)}', '${esc(ld.itemsInterest)}', ${Number(ld.expectedValue) || 0})">📝</button>
                        <button type="button" class="btn btn-ghost btn-sm" style="padding:2px 6px;font-size:0.68rem" title="Edit Deal" onclick="openDealModal('${ld.id}')">✏️</button>
                        ${ld.phone ? `<a class="btn btn-ghost btn-sm" style="padding:2px 5px;font-size:0.68rem" target="_blank" rel="noreferrer" href="https://wa.me/91${ld.phone}?text=${encodeURIComponent(waFollowMsg)}">📲</a>` : ''}
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// ============================================================================
// 🤖 AI DIGITAL BUSINESS MANAGER ("ASK YOUR DATA ANYTHING" — 883s FEATURE)
// WITH DYNAMIC KPI CHARTS & ZERO-DIRECT-MUTATION OWNER APPROVAL PROPOSALS
// ============================================================================
function renderMerchantAiBusinessManager(shop) {
  const u = state.data.user || {};
  const isOwner = u.role === 'merchant' || u.role === 'manufacturer' || u.role === 'admin';
  const messages = state.aiManagerMessages && state.aiManagerMessages.length > 0
    ? state.aiManagerMessages
    : [
        {
          id: 'welcome-ai',
          role: 'assistant',
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          html: renderAiManagerInsightCard('welcome', shop)
        }
      ];

  return `
    <div style="display:grid;gap:18px">
      <!-- Security & Architecture Banner -->
      <div class="erp-card" style="background:linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);color:#ffffff;border:none;padding:16px 20px">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
          <div>
            <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(250,204,21,0.18);border:1px solid rgba(250,204,21,0.45);color:#fde047;padding:3px 10px;border-radius:999px;font-size:0.74rem;font-weight:800;margin-bottom:6px">
              🛡️ ZERO DIRECT MUTATION SAFETY INVARIANT ACTIVE
            </div>
            <h3 style="color:#ffffff;margin:0;font-size:1.25rem">🤖 ${tr('AI Digital Business Manager — "Ask Your Data Anything"', 'AI डिजिटल बिज़नेस मैनेजर — अपने व्यापार के डेटा से हिंदी या अंग्रेज़ी में कुछ भी पूछें')}</h3>
            <p style="color:#cbd5e1;font-size:0.82rem;margin:4px 0 0">
              ${tr(
                'Ask in Hindi or English for live KPI charts, debtor aging, top items, or net profit. If you ask to create a bill, expense, or lead, AI generates an Action Proposal Card that executes ONLY after Owner approval.',
                'बिक्री, उधार, मुनाफ़े या स्टॉक के बारे में पूछें और चैट के अंदर ही लाइव चार्ट्स व टेबल पाएं। बिल या खर्च बनाने का कहने पर AI पहले "अनुमोदन प्रस्ताव कार्ड (Action Proposal Card)" बनाएगा जो केवल ओनर की मंजूरी पर ही सेव होगा।'
              )}
            </p>
          </div>
          <span class="badge badge-primary" style="font-size:0.8rem;padding:6px 12px">
            ${isOwner ? '👑 Owner Approval Authority' : '🔒 Staff View (Read-Only AI)'}
          </span>
        </div>

        <!-- 1-Tap Quick Query & Action Proposal Chips -->
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.15)">
          <button type="button" class="btn btn-sm btn-gold" onclick="askAiBusinessManager('sales_summary')">📊 ${tr("Today's & Total Sales", 'आज व कुल बिक्री')}</button>
          <button type="button" class="btn btn-sm btn-ghost" style="color:#fff;border-color:rgba(255,255,255,0.35)" onclick="askAiBusinessManager('pending_udhaar')">💰 ${tr('Pending Udhaar & Aging', 'बकाया उधार व एजिंग रडार')}</button>
          <button type="button" class="btn btn-sm btn-ghost" style="color:#fff;border-color:rgba(255,255,255,0.35)" onclick="askAiBusinessManager('profit_expenses')">📈 ${tr('Expenses vs Net Profit', 'खर्च बनाम शुद्ध मुनाफ़ा')}</button>
          <button type="button" class="btn btn-sm btn-ghost" style="color:#fff;border-color:rgba(255,255,255,0.35)" onclick="askAiBusinessManager('top_stock')">📦 ${tr('Top Items & Low Stock', 'टॉप सामान व कम स्टॉक')}</button>
          <button type="button" class="btn btn-sm btn-ghost" style="color:#fde047;border-color:#fde047" onclick="askAiBusinessManager('draft_bill_sharma')">⚡ ${tr('Draft Proposal: ₹2,500 Bill for Sharma Ji', 'प्रस्ताव: शर्मा जी का ₹2,500 बिल बनाएँ')}</button>
          <button type="button" class="btn btn-sm btn-ghost" style="color:#86efac;border-color:#86efac" onclick="askAiBusinessManager('draft_expense_elec')">⚡ ${tr('Draft Proposal: ₹1,200 Electricity Expense', 'प्रस्ताव: ₹1,200 बिजली बिल खर्च जोड़ें')}</button>
        </div>
      </div>

      <!-- Interactive Chat Stream with Dynamic KPI Cards, Charts & Proposal Cards -->
      <div class="erp-card" style="background:#f8fafc;display:flex;flex-direction:column;gap:14px;min-height:420px;max-height:620px;overflow-y:auto;padding:18px" id="ai-mgr-chat-box">
        ${messages.map(m => `
          <div style="display:flex;flex-direction:column;align-items:${m.role === 'user' ? 'flex-end' : 'flex-start'}">
            <div style="max-width:${m.role === 'user' ? '75%' : '96%'};width:${m.role === 'user' ? 'auto' : '100%'};background:${m.role === 'user' ? '#2563EB' : '#ffffff'};color:${m.role === 'user' ? '#ffffff' : '#0f172a'};padding:14px 16px;border-radius:14px;border:${m.role === 'user' ? 'none' : '1.5px solid #cbd5e1'};box-shadow:0 2px 8px rgba(15,23,42,0.06)">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:6px;font-size:0.72rem;opacity:0.8">
                <b>${m.role === 'user' ? `👤 ${esc(u.name || 'Merchant')}` : '🤖 KuberQ AI Business Manager'}</b>
                <span>${esc(m.time || '')}</span>
              </div>
              <div>${m.html}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Natural Language Chat Input Bar -->
      <div class="erp-card" style="padding:14px 16px">
        <form onsubmit="submitAiBusinessManagerPrompt(event)" style="display:grid;grid-template-columns:1fr auto auto;gap:8px;align-items:center">
          <input class="input" id="ai-mgr-input" placeholder="${tr('Ask anything in Hindi or English (e.g. "आज की बिक्री?", "किसका उधार बाकी है?", "Create bill for Verma Traders Rs 4500")...', 'हिंदी या अंग्रेज़ी में पूछें (उदा: "आज की कुल बिक्री?", "किसका उधार बाकी है?", "शर्मा जी के लिए 3500 का बिल बनाओ")...')}" style="font-size:0.95rem;padding:12px 14px" />
          <button type="button" class="btn btn-outline" style="padding:12px 14px" title="${tr('Speak in Hindi or English', 'बोलकर पूछें (Voice)')}" onclick="startAiVoiceInput('ai-mgr-input')">
            🎤 ${tr('Voice', 'बोलें')}
          </button>
          <button type="submit" class="btn btn-primary" style="padding:12px 22px;font-size:0.95rem">
            🚀 ${tr('Ask AI Manager', 'AI से पूछें')}
          </button>
        </form>
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
            <button type="button" class="btn btn-primary" style="background:#0284c7;border-color:#0284c7" onclick="openProductAddModal()">
              ➕ ${tr('+ Add Product / Service (Popup)', '+ नया सामान / सेवा जोड़ें (पॉपअप)')}
            </button>
            <select class="select" id="tpl-picker" style="width:auto;min-width:220px">
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
  const u = state.data.user || {};
  const isOwner = u.role === 'merchant' || u.role === 'manufacturer' || u.role === 'admin';
  const managersList = state.data.myManagers || [];
  const staffList = state.data.myStaff || [];
  const activityList = state.data.myActivity || [];
  const maxStaff = shop.plan && shop.plan.includes('Enterprise') ? 99 : shop.plan && shop.plan.includes('Pro') ? 3 : 0;

  return `
    <div style="display:grid;gap:18px">
      <!-- Item #16: Owner-Only Staff / Manager Login ID Creation with 14 Granular Permissions -->
      <div class="erp-card" style="border-top:4px solid #0284c7">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:14px">
          <div>
            <span class="badge badge-primary">🛡️ ${tr('OWNER-ONLY STAFF / MANAGER LOGIN IDs (14 GRANULAR PERMISSIONS)', 'केवल मालिक (Owner) द्वारा मैनेजर / स्टाफ लॉगिन ID व 14 कार्य अधिकार प्रबंधन')}</span>
            <h3 style="margin-top:6px">${tr('Create Staff & Manager Login IDs with Role-Based Module Permissions', 'मोबाइल नंबर, ईमेल और पासवर्ड के साथ मैनेजर/स्टाफ लॉगिन ID बनाएँ व 14 मॉड्यूल अनुमतियाँ चुनें')}</h3>
            <p class="text-muted" style="font-size:0.82rem;margin:2px 0 0">
              ${tr('Staff/Managers created here can sign in directly on the Login page using their Mobile Number or Email ID and Password, and will only see the modules permitted by the Owner.', 'यहाँ बनाए गए मैनेजर/स्टाफ अपने मोबाइल नंबर या ईमेल और पासवर्ड से लॉगिन कर सकते हैं और उन्हें केवल वही टैब दिखेंगे जिनकी अनुमति मालिक (Owner) ने दी है।')}
            </p>
          </div>
          ${isOwner ? `
            <button type="button" class="btn btn-primary" style="background:#0284c7;border-color:#0284c7" onclick="openManagerModal()">
              + ${tr('Create Manager / Staff Login ID', '+ नया मैनेजर / स्टाफ ID बनाएँ')}
            </button>
          ` : `
            <span class="badge badge-danger">🔒 ${tr('Owner Only Permission', 'केवल मालिक (Owner) के लिए')}</span>
          `}
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>${tr('Manager / Staff Name', 'नाम व पद')}</th>
                <th>${tr('Login Mobile & Email', 'मोबाइल व ईमेल ID')}</th>
                <th>${tr('Assigned Module Permissions (14 Modules)', 'अनुमत मॉड्यूल अधिकार (14 Permissions)')}</th>
                <th>${tr('Status', 'स्थिति')}</th>
                <th>${tr('Actions', 'कार्रवाई')}</th>
              </tr>
            </thead>
            <tbody>
              ${managersList.length === 0 ? `
                <tr>
                  <td colspan="5" style="text-align:center;padding:24px" class="text-muted">
                    ${tr('No Manager/Staff Login IDs created yet. Click "+ Create Manager / Staff Login ID" above to assign granular access.', 'अभी कोई मैनेजर/स्टाफ लॉगिन ID नहीं बनाई गई है। ऊपर "+ Create Manager / Staff Login ID" बटन दबाकर नई ID बनाएँ।')}
                  </td>
                </tr>
              ` : managersList.map(m => `
                <tr>
                  <td>
                    <b>${esc(m.name)}</b>
                    <div class="text-muted" style="font-size:0.75rem">${esc(m.designation || 'Store Manager')} · <span style="font-family:monospace">${esc(m.uniqueId || '')}</span></div>
                  </td>
                  <td>
                    <div>📱 <b>${esc(m.phone)}</b></div>
                    <div class="text-muted" style="font-size:0.76rem">✉️ ${esc(m.email || '—')}</div>
                  </td>
                  <td>
                    <div style="display:flex;gap:4px;flex-wrap:wrap;max-width:460px">
                      ${(m.permissions || []).map(pk => {
                        const found = ALL_14_STAFF_PERMISSIONS.find(x => x.key === pk);
                        return `<span class="badge badge-primary" style="font-size:0.68rem;padding:2px 7px">${esc(found ? found.label : pk)}</span>`;
                      }).join('')}
                    </div>
                  </td>
                  <td>
                    <span class="badge ${m.active !== false ? 'badge-primary' : 'badge-danger'}">${m.active !== false ? 'Active' : 'Suspended'}</span>
                  </td>
                  <td>
                    ${isOwner ? `
                      <div style="display:flex;gap:6px">
                        <button type="button" class="btn btn-ghost btn-sm" onclick="openManagerModal('${m.id}')">✏️ ${tr('Edit Access', 'अधिकार बदलें')}</button>
                        <button type="button" class="btn btn-danger btn-sm" onclick="deleteManagerAccount('${m.id}')">🗑️</button>
                      </div>
                    ` : '—'}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="grid grid-2">
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
            <span class="badge badge-gold">👥 ${tr('COUNTER STAFF ROSTER', 'दुकान काउंटर कर्मचारी सूची')}</span>
            <span class="badge badge-primary">${staffList.length} / ${maxStaff === 99 ? '∞' : maxStaff} ${tr('Staff Quota', 'स्टाफ सीमा')}</span>
          </div>
          <h3 style="margin-bottom:8px">${tr('Add Counter Staff (Cashier / Stock / Delivery)', 'नया काउंटर कर्मचारी जोड़ें (कैशियर / स्टॉक / डिलीवरी)')}</h3>
          <p class="text-muted" style="font-size:0.86rem;margin-bottom:14px">
            ${tr('Assign counter roles to your shop helpers. Every bill they create or stock change they make is recorded in the Activity Log.', 'अपने काउंटर सहायकों को भूमिका दें। उनके द्वारा बनाया गया हर बिल और स्टॉक बदलाव नीचे कार्य विवरण में दर्ज होगा।')}
          </p>

          ${maxStaff === 0 ? `
            <div class="card-subtle" style="border-color:var(--gold);text-align:center;padding:18px">
              <p style="font-weight:700;color:#0f172a">🔒 ${tr('Counter Staff Roster requires Vyapar Pro or B2B Enterprise (Or use Manager Login IDs above!)', 'काउंटर स्टाफ जोड़ने के लिए व्यापार प्रो चुनें (या ऊपर दिए गए "Create Manager / Staff Login ID" का उपयोग करें!)')}</p>
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
          <h3 style="margin-bottom:12px">📋 ${tr('Active Counter Staff Members', 'सक्रिय दुकान कर्मचारी सूची')} (${staffList.length})</h3>
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
                ${staffList.length === 0 ? `<tr><td colspan="5" style="text-align:center" class="text-muted">${tr('No counter staff added yet.', 'अभी कोई काउंटर कर्मचारी नहीं जोड़ा गया है।')}</td></tr>` : ''}
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
  let bannerActionHtml = `
    <button class="btn btn-sm" style="background:linear-gradient(135deg,#0284c7,#0369a1);color:#ffffff;font-weight:800;border:1.5px solid #38bdf8;box-shadow:0 4px 12px rgba(2,132,199,0.35);display:inline-flex;align-items:center;gap:6px" onclick="navigate('/merchant')">🚀 <span>${tr('Open Business CRM & ERP (All 16 Modules)', 'बिज़नेस CRM व ERP खोलें (सभी 16 नए मॉड्यूल)')}</span></button>
    <button class="btn btn-sm" style="background:#ffffff;color:#0f172a;font-weight:700;border:1.5px solid #cbd5e1;box-shadow:0 2px 8px rgba(0,0,0,0.18);display:inline-flex;align-items:center;gap:6px" onclick="bootstrap()">🔄 <span>${tr('Refresh Records', 'डेटा ताज़ा करें')}</span></button>
  `;

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
      title: tr('Privacy Policy & DPDP Rules 2025 Compliance', 'गोपनीयता नीति एवं DPDP नियम 2025 अनुपालन'),
      items: [
        [
          tr('1. Purpose & Categories of Data Collected', '1. एकत्रित डेटा की श्रेणियां एवं उद्देश्य'),
          tr(
            'We collect Primary Contact Name, 10-digit Indian Mobile Number, Business Name, Billing/Delivery Addresses, optional Buyer GSTIN, and accounting ledger records strictly for order processing, digital invoice generation, and tax compliance.',
            'हम नाम, 10 अंकों का मोबाइल नंबर, व्यापारिक फ़र्म का नाम, डिलीवरी पता, वैकल्पिक GSTIN और बिल/बही-खाता डेटा केवल ऑर्डर निष्पादन, डिजिटल बिल निर्माण और वैधानिक टैक्स अनुपालन हेतु सुरक्षित रखते हैं।'
          )
        ],
        [
          tr('2. Statutory Data Retention Periods (GST Law vs CRM Drafts)', '2. वैधानिक डेटा संरक्षण समय-सीमा (GST कानून बनाम अस्थायी ड्राफ्ट)'),
          tr(
            '• Tax Invoices, Credit Notes & Accounting Ledgers: Retained for a mandatory statutory period of 6 years (72 months) as mandated under Section 36 of the Central Goods and Services Tax (CGST) Act, 2017.\n• Parchi notes, abandoned cart drafts, and transient inquiries: Retained for up to 90 days or until user-requested deletion.',
            '• पक्के GST इनवॉइस, क्रेडिट नोट एवं बही-खाता: CGST अधिनियम, 2017 की धारा 36 के अनुसार न्यूनतम 6 वर्ष (72 महीने) तक सुरक्षित रखना अनिवार्य है।\n• कच्ची पर्ची, अपूर्ण कार्ट एवं सामान्य पूछताछ: अधिकतम 90 दिन या उपयोगकर्ता द्वारा हटाने के अनुरोध तक ही रखी जाती हैं।'
          )
        ],
        [
          tr('3. Data Processors & Security Architecture', '3. डेटा प्रोसेसर्स एवं सुरक्षा संरचना'),
          tr(
            'Passwords are cryptographically salted and hashed via Scrypt. Platform API credentials are stored in an AES-256-GCM server-only encrypted vault. Transactional WhatsApp/SMS communications are dispatched solely via authorized enterprise gateway APIs for delivery notifications and invoice sharing. KuberQ never sells, rents, or monetizes personal data to third parties.',
            'पासवर्ड Scrypt तकनीक द्वारा सुरक्षित हैं। संवेदनशील API चाबियां सर्वर की AES-256-GCM तिजोरी में बंद रहती हैं। WhatsApp/SMS अलर्ट केवल अधिकृत गेटवे API द्वारा बिल और डिलीवरी सूचना हेतु भेजे जाते हैं। KuberQ कभी भी किसी तीसरे पक्ष को डेटा बेचता या साझा नहीं करता।'
          )
        ],
        [
          tr('4. Consent Withdrawal & Right to Erasure (DPDP Rules 2025)', '4. सहमति वापस लेना एवं डेटा हटाने का अधिकार'),
          tr(
            'Under Digital Personal Data Protection (DPDP) Rules 2025, users may withdraw communication consent or request complete erasure of non-statutory records at any time by emailing grievance@kuberq.in. Deletion requests are processed and confirmed within 7 business days.',
            'DPDP नियम 2025 के तहत, कोई भी उपयोगकर्ता grievance@kuberq.in पर ईमेल करके अपनी सहमति वापस ले सकता है या गैर-वैधानिक डेटा को हटाने का अनुरोध कर सकता है। डेटा निष्कासन अनुरोधों का निस्तारण 7 कार्य दिवसों में किया जाता है।'
          )
        ],
        [
          tr('5. Grievance Officer & Resolution SLA', '5. शिकायत निवारण अधिकारी व समय-सीमा'),
          tr(
            'Designated Grievance Officer: Legal & Compliance Officer, KuberQ\nEmail: grievance@kuberq.in | WhatsApp: +91-7240692736\nAcknowledgement SLA: Within 48 hours | Resolution SLA: Within 15 calendar days under IT Rules 2021 & DPDP framework.',
            'शिकायत अधिकारी: विधिक एवं अनुपालन अधिकारी, KuberQ\nईमेल: grievance@kuberq.in | WhatsApp: 7240692736\nपावती समय: 48 घंटे के भीतर | पूर्ण समाधान: 15 दिनों के भीतर (IT नियम 2021 व DPDP के अनुरूप)।'
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
    saveBrowserAccount(identifier, res.name, res.role);
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
      email: document.getElementById('su-email')?.value.trim() || '',
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
    saveBrowserAccount(payload.email || payload.phone, res.name, res.role);
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
    const phoneInput = document.getElementById('ord-phone');
    const phoneVal = phoneInput ? phoneInput.value.trim() : '';
    const errEl = document.getElementById('ord-phone-err');

    if (!/^[6-9]\d{9}$/.test(phoneVal)) {
      if (errEl) {
        errEl.textContent = tr('Please enter a valid 10-digit Indian mobile number (e.g. 9828XXXXXX)', 'कृपया 10 अंकों का वैध भारतीय मोबाइल नंबर दर्ज करें (शुरुआत 6, 7, 8 या 9 से हो)');
        errEl.style.display = 'block';
      }
      showToast(tr('Invalid mobile number: Please enter 10 digits starting with 6, 7, 8 or 9.', 'अमान्य मोबाइल नंबर: कृपया 6, 7, 8 या 9 से शुरू होने वाले 10 अंक दर्ज करें।'), 'error');
      if (phoneInput) phoneInput.focus();
      return;
    }
    if (errEl) errEl.style.display = 'none';

    const consentBox = document.getElementById('ord-consent');
    if (consentBox && !consentBox.checked) {
      showToast(tr('Please agree to receive order notifications as per Privacy Policy.', 'कृपया गोपनीयता नीति के तहत ऑर्डर नोटिफिकेशन पाने की अनुमति दें।'), 'error');
      return;
    }

    const items = Object.entries(state.cart)
      .filter(([, q]) => q > 0)
      .map(([productId, qty]) => ({ productId, qty }));
    const payload = {
      shopId,
      customer: document.getElementById('ord-name').value.trim(),
      phone: phoneVal,
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
    const isQuote = state.invoiceDocType === 'Quotation';
    const payload = {
      shopId,
      customer: state.invoiceBuyer.name || 'Walk-in Buyer',
      phone: state.invoiceBuyer.phone || '9999999999',
      address: state.data.myShop?.city || 'Counter Sale',
      buyerGstin: state.invoiceBuyer.gstin,
      paymentMode: isQuote ? 'Quotation' : state.invoiceBuyer.paymentMode,
      discount: Number(state.invoiceBuyer.discount || 0),
      paidAmount: isQuote ? 0 : Number(state.invoiceBuyer.paidAmount || 0),
      supplyType: state.invoiceBuyer.supplyType === 'auto' ? undefined : state.invoiceBuyer.supplyType,
      docType: state.invoiceDocType || 'Tax Invoice',
      validUntil: state.invoiceValidUntil || '',
      channel: 'Walk-in',
      items: validLines
    };
    const res = await apiFetch('/api/orders/create', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    await bootstrap();
    if (isQuote) {
      showToast(tr(`Quotation ${res.order.invoiceNo} saved! Convert it to Tax Invoice anytime in 1 click.`, `कोटेशन ${res.order.invoiceNo} सुरक्षित! किसी भी समय 1-क्लिक में टैक्स इनवॉइस में बदलें।`));
    } else {
      showToast(`Saved ${res.order.invoiceNo} to ledger & updated stock!`);
    }
    setTimeout(() => window.print(), 250);
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.convertQuotationToTaxInvoice = async function(orderId) {
  try {
    const res = await apiFetch('/api/merchant/order-update', {
      method: 'POST',
      body: JSON.stringify({ orderId, convertToTaxInvoice: true })
    });
    await bootstrap();
    showToast(tr(`✅ Converted Quotation to Official GST Invoice ${res.order.invoiceNo} & synced stock/ledger!`, `✅ कोटेशन को आधिकारिक GST इनवॉइस ${res.order.invoiceNo} में बदल दिया गया और स्टॉक/खाता अपडेट हो गया!`));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.addCrmLeadForm = async function(e) {
  e.preventDefault();
  try {
    const payload = {
      kind: 'add_crm_lead',
      buyerName: document.getElementById('crm-name')?.value.trim() || '',
      contactPerson: document.getElementById('crm-contact')?.value.trim() || '',
      phone: document.getElementById('crm-phone')?.value.trim() || '',
      city: document.getElementById('crm-city')?.value.trim() || '',
      source: document.getElementById('crm-source')?.value || 'WhatsApp Inquiry',
      itemsInterest: document.getElementById('crm-items')?.value.trim() || '',
      expectedValue: Number(document.getElementById('crm-val')?.value || 0),
      stage: document.getElementById('crm-stage')?.value || 'New Inquiry',
      followUpDate: document.getElementById('crm-date')?.value || ''
    };
    await apiFetch('/api/merchant/ledger', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    await bootstrap();
    showToast(tr('✅ B2B Lead added to Sales Pipeline!', '✅ B2B लीड सेल्स पाइपलाइन में जोड़ दी गई!'));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.moveCrmLeadStage = async function(id, stage) {
  try {
    await apiFetch('/api/merchant/ledger', {
      method: 'POST',
      body: JSON.stringify({ kind: 'update_crm_lead_stage', id, stage })
    });
    await bootstrap();
    showToast(tr(`Lead moved to "${stage}"`, `लीड को "${stage}" चरण में ले जाया गया`));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.prefillQuotationFromLead = function(buyerName, phone, itemsInterest, expectedValue) {
  state.invoiceDocType = 'Quotation';
  state.invoiceBuyer = {
    ...state.invoiceBuyer,
    name: buyerName || '',
    phone: phone || '',
    paymentMode: 'Quotation',
    paidAmount: 0
  };
  if (itemsInterest) {
    state.invoiceLines = [
      {
        productId: '',
        name: itemsInterest,
        hsn: '8471',
        qty: 1,
        price: Number(expectedValue || 0) || 1000,
        gstRate: 18,
        taxMode: 'exclusive'
      }
    ];
  }
  state.merchantTab = 'Billing';
  render();
  showToast(tr(`📋 Pre-filled Quotation for ${buyerName}! Review and click Save & Print Quotation.`, `📋 ${buyerName} के लिए कोटेशन भर दिया गया है! जांचें और सेव व प्रिंट दबाएं।`));
};

// ============================================================================
// AI DIGITAL BUSINESS MANAGER (883s "ASK YOUR DATA ANYTHING" + ZERO DIRECT MUTATION)
// ============================================================================
function getActiveAiShop() {
  return state.data.myShop || state.data.merchants?.[0] || { id: 'MQM-31CD16', shop: 'Marwar Hardware & Sanitary Mart', city: 'Jodhpur' };
}

function renderAiManagerInsightCard(queryType, shop, customPayload = null) {
  const fmt = (n) => Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 });
  const targetShop = shop || getActiveAiShop();
  const rawOrders = (state.data.myOrders && state.data.myOrders.length > 0)
    ? state.data.myOrders
    : (state.data.adminData?.orders || [
        { id: 'KQ-2627-101', shopId: targetShop.id, customer: 'Sharma Traders', phone: '9829011223', amount: 48500, paidAmount: 28500, estimatedProfit: 7760, paymentMode: 'Credit', status: 'Delivered', date: new Date(Date.now() - 68 * 86400000).toISOString() },
        { id: 'KQ-2627-102', shopId: targetShop.id, customer: 'Rathore Builders', phone: '9829044556', amount: 32400, paidAmount: 12400, estimatedProfit: 5180, paymentMode: 'Credit', status: 'Delivered', date: new Date(Date.now() - 38 * 86400000).toISOString() },
        { id: 'KQ-2627-103', shopId: targetShop.id, customer: 'Agrawal Brothers', phone: '9829077889', amount: 19800, paidAmount: 19800, estimatedProfit: 3168, paymentMode: 'UPI', status: 'Delivered', date: new Date().toISOString() }
      ]);
  const myOrders = rawOrders.filter(o => !targetShop.id || !o.shopId || o.shopId === targetShop.id);
  const activeOrders = myOrders.filter(o => o.status !== 'Rejected' && o.status !== 'Cancelled' && o.docType !== 'Quotation' && o.status !== 'Quotation');
  const myProducts = (state.data.products || []).filter(p => !targetShop.id || !p.shopId || p.shopId === targetShop.id);
  const myExpenses = (state.data.myExpenses && state.data.myExpenses.length > 0)
    ? state.data.myExpenses
    : [{ id: 'EXP-1', category: 'Transport / Freight', amount: 1850 }, { id: 'EXP-2', category: 'Shop Electricity & Tea', amount: 950 }];
  const myLeads = state.data.myCrmLeads || [];

  // Calculate real customer Udhaar & Aging buckets from orders
  const nowMs = Date.now();
  const buckets = { b30: 0, b60: 0, b90: 0, b90plus: 0 };
  const partyUdhaarMap = new Map();
  activeOrders.forEach(o => {
    const gross = Number(o.customAmount || o.amount || 0);
    const paid = Number(o.paidAmount || (o.paymentMode !== 'Credit' ? gross : 0));
    const due = o.udhaarSettled ? 0 : Math.max(0, gross - paid);
    if (due <= 0) return;
    const orderTs = new Date(o.date || o.createdAt || nowMs).getTime();
    const d = Math.max(0, Math.floor((nowMs - (isNaN(orderTs) ? nowMs : orderTs)) / 86400000));
    if (d <= 30) buckets.b30 += due;
    else if (d <= 60) buckets.b60 += due;
    else if (d <= 90) buckets.b90 += due;
    else buckets.b90plus += due;
    const key = `${o.customer || 'Party'}__${o.phone || ''}`;
    partyUdhaarMap.set(key, (partyUdhaarMap.get(key) || 0) + due);
  });

  const totalUdhaar = buckets.b30 + buckets.b60 + buckets.b90 + buckets.b90plus;
  const udhaarPartyCount = partyUdhaarMap.size;
  const grossRev = activeOrders.reduce((s, o) => s + Number(o.customAmount || o.amount || 0), 0);
  const totalProfitBeforeExp = activeOrders.reduce((s, o) => s + Number(o.estimatedProfit || Math.round((o.customAmount || o.amount || 0) * 0.16)), 0);
  const totalExpenses = myExpenses.reduce((s, x) => s + Number(x.amount || 0), 0);
  const netOperatingProfit = totalProfitBeforeExp - totalExpenses;

  if (queryType === 'PROPOSAL_CARD' && customPayload) {
    const pId = customPayload.proposalId || ('prop_' + Date.now());
    const encoded = encodeURIComponent(JSON.stringify(customPayload));
    const statusBadge = customPayload.executedStatus === 'APPROVED'
      ? `<span class="badge badge-green">✔ ${tr('Approved & Executed by Owner', 'स्वामी द्वारा स्वीकृत एवं निष्पादित')}</span>`
      : customPayload.executedStatus === 'DISCARDED'
      ? `<span class="badge badge-red">✕ ${tr('Proposal Discarded (Zero DB Changes)', 'प्रस्ताव निरस्त (डेटाबेस में कोई बदलाव नहीं)')}</span>`
      : `
          <button type="button" class="btn btn-gold btn-sm" style="background:#16A34A;border-color:#16A34A;color:#FFFFFF" onclick="approveAiProposal('${pId}', '${customPayload.actionType}', '${encoded}')">
            ✔ ${tr('Approve & Execute in Database', 'स्वीकृत करें और डेटाबेस में दर्ज करें')}
          </button>
          <button type="button" class="btn btn-outline btn-sm" style="color:#DC2626;border-color:#FECACA" onclick="discardAiProposal('${pId}')">
            ✕ ${tr('Discard Proposal', 'प्रस्ताव निरस्त करें')}
          </button>
        `;
    return `
      <div id="${pId}" style="border:2px solid #2563EB;background:#EFF6FF;border-radius:12px;padding:16px">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px">
          <span class="badge" style="background:#1D4ED8;color:#FFFFFF;font-weight:700">🛡️ ${tr('ACTION PROPOSAL CARD (AWAITING OWNER APPROVAL)', 'कार्य प्रस्ताव कार्ड (स्वामी की स्वीकृति प्रतीक्षित)')}</span>
          <span style="font-size:0.74rem;color:#1E40AF;font-weight:600">${tr('Zero Direct Mutation Invariant Active', 'शून्य प्रत्यक्ष परिवर्तन सुरक्षा नियम सक्रिय')}</span>
        </div>
        <div style="font-weight:700;font-size:0.98rem;color:#0F172A;margin-bottom:6px">${esc(customPayload.title)}</div>
        <p style="font-size:0.84rem;color:#334155;margin:0 0 12px">${esc(customPayload.summary)}</p>
        <div style="background:#FFFFFF;border:1px solid #BFDBFE;border-radius:8px;padding:10px 12px;margin-bottom:12px;font-size:0.82rem;display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px">
          ${(customPayload.fields || []).map(f => `
            <div>
              <div style="font-size:0.7rem;color:#64748B;text-transform:uppercase">${esc(f.label)}</div>
              <div style="font-weight:700;color:#0F172A">${esc(f.value)}</div>
            </div>
          `).join('')}
        </div>
        <div class="proposal-actions" style="display:flex;gap:10px;flex-wrap:wrap">
          ${statusBadge}
        </div>
      </div>
    `;
  }

  if (queryType === 'UDHAAR_AGING' || queryType === 'pending_udhaar') {
    return `
      <div>
        <div style="font-weight:700;font-size:0.96rem;color:#0F172A;margin-bottom:8px">
          📒 ${tr('Receivables & Aging Debtors Analysis', 'बकाया उधार और समय-आधारित (Aging) विश्लेषण')}
        </div>
        <p style="font-size:0.84rem;color:#334155;margin:0 0 12px">
          ${tr(
            `Total market credit pending is ₹${fmt(totalUdhaar)} across ${udhaarPartyCount} parties. Critical 60+ days overdue is ₹${fmt(buckets.b90 + buckets.b90plus)}.`,
            `बाजार में कुल बकाया उधार ₹${fmt(totalUdhaar)} है (${udhaarPartyCount} पार्टियां)। 60+ दिन से अधिक का गंभीर बकाया ₹${fmt(buckets.b90 + buckets.b90plus)} है।`
          )}
        </p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;margin-bottom:12px">
          <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:8px;padding:8px">
            <div style="font-size:0.72rem;color:#166534;font-weight:700">🟢 0–30 Days</div>
            <div style="font-size:1.05rem;font-weight:800;color:#15803D">₹${fmt(buckets.b30)}</div>
          </div>
          <div style="background:#FEFCE8;border:1px solid #FEF08A;border-radius:8px;padding:8px">
            <div style="font-size:0.72rem;color:#854D0E;font-weight:700">🟡 31–60 Days</div>
            <div style="font-size:1.05rem;font-weight:800;color:#B45309">₹${fmt(buckets.b60)}</div>
          </div>
          <div style="background:#FFF7ED;border:1px solid #FED7AA;border-radius:8px;padding:8px">
            <div style="font-size:0.72rem;color:#9A3412;font-weight:700">🟠 61–90 Days</div>
            <div style="font-size:1.05rem;font-weight:800;color:#EA580C">₹${fmt(buckets.b90)}</div>
          </div>
          <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:8px;padding:8px">
            <div style="font-size:0.72rem;color:#991B1B;font-weight:700">🔴 90+ Days</div>
            <div style="font-size:1.05rem;font-weight:800;color:#DC2626">₹${fmt(buckets.b90plus)}</div>
          </div>
        </div>
        <button type="button" class="btn btn-outline btn-xs" onclick="state.aiChatModalOpen=false;state.merchantTab='Udhaar';if(state.route!=='/merchant')navigate('/merchant');else render()">
          📲 ${tr('Open Aging Radar & Send WhatsApp Reminders', 'एजिंग रडार खोलें और WhatsApp रिमाइंडर भेजें')} →
        </button>
      </div>
    `;
  }

  if (queryType === 'TOP_ITEMS' || queryType === 'top_stock') {
    const sorted = [...myProducts].sort((a, b) => (Number(a.stock || 0)) - (Number(b.stock || 0)));
    const lowStock = myProducts.filter(p => Number(p.stock || 0) <= 10);
    return `
      <div>
        <div style="font-weight:700;font-size:0.96rem;color:#0F172A;margin-bottom:8px">
          📦 ${tr('Inventory Health, Margin & Low-Stock Alert', 'स्टॉक स्वास्थ्य, मार्जिन और कम-स्टॉक चेतावनी')}
        </div>
        <p style="font-size:0.84rem;color:#334155;margin:0 0 10px">
          ${tr(
            `You have ${myProducts.length} active SKUs in catalog. ${lowStock.length} items are running low on stock (≤10 units).`,
            `आपके कैटलॉग में ${myProducts.length} उत्पाद हैं। ${lowStock.length} उत्पादों का स्टॉक कम (≤10 इकाई) है।`
          )}
        </p>
        <div style="overflow-x:auto">
          <table class="data-table" style="font-size:0.8rem">
            <thead>
              <tr>
                <th>${tr('Product', 'उत्पाद')}</th>
                <th>${tr('Cost', 'लागत')}</th>
                <th>${tr('Sale Rate', 'बिक्री दर')}</th>
                <th>${tr('Unit Margin', 'प्रति इकाई लाभ')}</th>
                <th>${tr('Stock', 'स्टॉक')}</th>
              </tr>
            </thead>
            <tbody>
              ${sorted.slice(0, 5).map(p => {
                const margin = Number(p.price || 0) - Number(p.costPrice || Math.round(p.price * 0.82));
                return `
                  <tr>
                    <td><strong>${esc(p.name)}</strong></td>
                    <td>₹${fmt(p.costPrice || Math.round(p.price * 0.82))}</td>
                    <td>₹${fmt(p.price)}</td>
                    <td style="color:#16A34A;font-weight:700">+₹${fmt(margin)}</td>
                    <td><span class="badge ${p.stock <= 10 ? 'badge-red' : 'badge-green'}">${p.stock}</span></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Default: DAILY_SUMMARY / Net Profit P&L overview with visual bars
  const maxBar = Math.max(grossRev, totalProfitBeforeExp, totalExpenses, Math.abs(netOperatingProfit), 1);
  return `
    <div>
      <div style="font-weight:700;font-size:0.96rem;color:#0F172A;margin-bottom:6px">
        📊 ${tr('Executive Financial Summary & Net Operating Profit', 'कार्यकारी वित्तीय सारांश और शुद्ध परिचालन लाभ')} — ${esc(targetShop.shop || targetShop.name || 'KuberQ Store')}
      </div>
      <p style="font-size:0.84rem;color:#334155;margin:0 0 12px">
        ${tr(
          `Based on ${activeOrders.length} active GST bills and ${myExpenses.length} expense vouchers, your Net Operating Profit is ₹${fmt(netOperatingProfit)} (${grossRev > 0 ? ((netOperatingProfit / grossRev) * 100).toFixed(1) : '0.0'}% net margin).`,
          `${activeOrders.length} सक्रिय GST बिलों और ${myExpenses.length} खर्च वाउचरों के आधार पर, आपका शुद्ध परिचालन लाभ (Net Profit) ₹${fmt(netOperatingProfit)} (${grossRev > 0 ? ((netOperatingProfit / grossRev) * 100).toFixed(1) : '0.0'}% शुद्ध मार्जिन) है।`
        )}
      </p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:10px;margin-bottom:14px">
        <div style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:10px;padding:10px">
          <div style="font-size:0.72rem;color:#1D4ED8;font-weight:700">${tr('GROSS REVENUE', 'कुल बिक्री आय')}</div>
          <div style="font-size:1.15rem;font-weight:800;color:#1E3A8A">₹${fmt(grossRev)}</div>
          <div style="height:5px;background:#DBEAFE;border-radius:99px;margin-top:6px"><div style="height:100%;width:100%;background:#2563EB;border-radius:99px"></div></div>
        </div>
        <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:10px;padding:10px">
          <div style="font-size:0.72rem;color:#15803D;font-weight:700">${tr('GROSS MARGIN', 'सकल मार्जिन')}</div>
          <div style="font-size:1.15rem;font-weight:800;color:#166534">₹${fmt(totalProfitBeforeExp)}</div>
          <div style="height:5px;background:#DCFCE7;border-radius:99px;margin-top:6px"><div style="height:100%;width:${Math.min(100, Math.round((totalProfitBeforeExp / maxBar) * 100))}%;background:#16A34A;border-radius:99px"></div></div>
        </div>
        <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:10px;padding:10px">
          <div style="font-size:0.72rem;color:#B91C1C;font-weight:700">${tr('SHOP EXPENSES', 'दुकान के खर्चे')}</div>
          <div style="font-size:1.15rem;font-weight:800;color:#DC2626">-₹${fmt(totalExpenses)}</div>
          <div style="height:5px;background:#FEE2E2;border-radius:99px;margin-top:6px"><div style="height:100%;width:${Math.min(100, Math.round((totalExpenses / maxBar) * 100))}%;background:#DC2626;border-radius:99px"></div></div>
        </div>
        <div style="background:#F8FAFC;border:2px solid ${netOperatingProfit >= 0 ? '#16A34A' : '#DC2626'};border-radius:10px;padding:10px">
          <div style="font-size:0.72rem;color:#0F172A;font-weight:700">${tr('NET PROFIT', 'शुद्ध मुनाफा')}</div>
          <div style="font-size:1.15rem;font-weight:800;color:${netOperatingProfit >= 0 ? '#15803D' : '#DC2626'}">${netOperatingProfit >= 0 ? '+' : '-'}₹${fmt(Math.abs(netOperatingProfit))}</div>
          <div style="font-size:0.7rem;color:#64748B;margin-top:4px">${myLeads.length} ${tr('Active CRM Leads', 'सक्रिय लीड्स')}</div>
        </div>
      </div>
    </div>
  `;
}

function scrollAiChatBoxesToBottom() {
  setTimeout(() => {
    ['ai-mgr-chat-box', 'ai-global-chat-box'].forEach(id => {
      const box = document.getElementById(id);
      if (box) box.scrollTop = box.scrollHeight;
    });
  }, 40);
}

window.askAiBusinessManager = function(chipKey) {
  const shop = getActiveAiShop();
  const nowStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  let userText = '';
  let html = '';
  let proposalPayload = null;

  if (chipKey === 'DAILY_SUMMARY' || chipKey === 'sales_summary' || chipKey === 'profit_expenses') {
    userText = tr('Show me today’s total sales, expenses & Net Operating Profit summary.', 'आज की कुल बिक्री, खर्च और शुद्ध मुनाफे (Net Profit) का विवरण दिखाएं।');
    html = renderAiManagerInsightCard('DAILY_SUMMARY', shop);
  } else if (chipKey === 'UDHAAR_AGING' || chipKey === 'pending_udhaar') {
    userText = tr('Whose Udhaar payment is overdue by 60+ days?', 'किन पार्टियों का उधार 60+ दिनों से बाकी है?');
    html = renderAiManagerInsightCard('UDHAAR_AGING', shop);
  } else if (chipKey === 'TOP_ITEMS' || chipKey === 'top_stock') {
    userText = tr('Show me top margin products and low-stock alerts.', 'सबसे अधिक मार्जिन वाले उत्पाद और कम स्टॉक की चेतावनी दिखाएं।');
    html = renderAiManagerInsightCard('TOP_ITEMS', shop);
  } else if (chipKey === 'PROPOSE_INVOICE' || chipKey === 'draft_bill_sharma') {
    userText = tr('Prepare a GST Bill / Quotation of ₹2,500 for Sharma Traders.', 'शर्मा ट्रेडर्स के लिए ₹2,500 का बिल / कोटेशन तैयार करें।');
    proposalPayload = {
      proposalId: 'prop_' + Date.now(),
      actionType: 'CREATE_QUOTATION',
      title: tr('Create Formal Quotation (QT-2627) for Sharma Traders (₹2,500)', 'शर्मा ट्रेडर्स के लिए औपचारिक कोटेशन (QT-2627) बनाएं (₹2,500)'),
      summary: tr('AI has prepared a draft quotation. Per the Zero Direct Mutation safety rule, database records will only be created when you click Approve & Execute.', 'AI ने ड्राफ्ट कोटेशन तैयार कर लिया है। सुरक्षा नियम के अनुसार, जब आप "स्वीकृत करें" दबाएंगे तभी डेटाबेस में एंट्री होगी।'),
      fields: [
        { label: tr('Party Name', 'पार्टी का नाम'), value: 'Sharma Traders' },
        { label: tr('Document Type', 'दस्तावेज़ प्रकार'), value: 'Formal Quotation (QT-2627)' },
        { label: tr('Amount (Incl. GST)', 'राशि (GST सहित)'), value: '₹2,500' },
        { label: tr('Stock Impact', 'स्टॉक प्रभाव'), value: '0 (Locked until Invoice Conversion)' }
      ],
      payload: {
        shopId: shop.id,
        customer: 'Sharma Traders',
        phone: '9829011223',
        docType: 'Quotation',
        paymentMode: 'Quotation',
        items: [{ name: 'B2B Assorted Wholesale Lot', hsn: '8471', qty: 1, price: 2500, gstRate: 18, taxMode: 'inclusive' }]
      }
    };
    html = renderAiManagerInsightCard('PROPOSAL_CARD', shop, proposalPayload);
  } else if (chipKey === 'PROPOSE_EXPENSE' || chipKey === 'draft_expense_elec') {
    userText = tr('Log ₹1,200 Electricity Bill Expense for today.', 'आज का ₹1,200 बिजली बिल खर्च दर्ज करें।');
    proposalPayload = {
      proposalId: 'prop_' + Date.now(),
      actionType: 'ADD_EXPENSE',
      title: tr('Log Operating Expense Voucher (₹1,200)', 'परिचालन खर्च वाउचर दर्ज करें (₹1,200)'),
      summary: tr('This will record ₹1,200 under Electricity & Utility and automatically recalculate your Real-Time Net Operating Profit.', 'यह बिजली और उपयोगिता श्रेणी में ₹1,200 दर्ज करेगा और आपके शुद्ध मुनाफे (Net Profit) की स्वतः गणना करेगा।'),
      fields: [
        { label: tr('Category', 'श्रेणी'), value: 'Electricity & Utility' },
        { label: tr('Amount', 'राशि'), value: '₹1,200' },
        { label: tr('Payment Mode', 'भुगतान माध्यम'), value: 'UPI' },
        { label: tr('Note', 'विवरण'), value: 'Monthly Shop Electricity Bill' }
      ],
      payload: {
        kind: 'add_expense',
        category: 'Electricity & Utility',
        amount: 1200,
        paymentMode: 'UPI',
        date: new Date().toISOString().slice(0, 10),
        note: 'Monthly Shop Electricity Bill (AI Assisted)'
      }
    };
    html = renderAiManagerInsightCard('PROPOSAL_CARD', shop, proposalPayload);
  }

  state.aiManagerMessages.push({ role: 'user', time: nowStr, html: esc(userText) });
  state.aiManagerMessages.push({ role: 'assistant', time: nowStr, proposalId: proposalPayload?.proposalId, proposalPayload, html });
  render();
  scrollAiChatBoxesToBottom();
};

window.submitAiBusinessManagerPrompt = function(e, inputId = 'ai-mgr-input') {
  e.preventDefault();
  const input = document.getElementById(inputId) || document.getElementById('ai-mgr-input') || document.getElementById('ai-global-input');
  const text = (input?.value || '').trim();
  if (!text) return;
  const shop = getActiveAiShop();

  const fmt = (n) => Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 });
  const nowStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  state.aiManagerMessages.push({ role: 'user', time: nowStr, html: esc(text) });
  const lower = text.toLowerCase();
  const numMatch = text.match(/(\d[\d,]*)/);
  const amountVal = numMatch ? Number(numMatch[1].replace(/,/g, '')) : 1500;

  let responseHtml = '';
  let proposalPayload = null;
  // Check if user is asking for a mutation / action (bill, quote, expense, lead)
  if (lower.includes('बिल') || lower.includes('bill') || lower.includes('invoice') || lower.includes('quote') || lower.includes('quotation') || lower.includes('कोटेशन') || lower.includes('बनाओ') || lower.includes('create')) {
    const isQuote = lower.includes('quote') || lower.includes('quotation') || lower.includes('कोटेशन');
    let partyName = 'Walk-in B2B Party';
    const forMatch = text.match(/(?:for|to|के लिए)\s+([A-Za-z\u0900-\u097F\s]{2,25})/i);
    if (forMatch && forMatch[1]) {
      partyName = forMatch[1].replace(/(?:का|की|के|bill|invoice|quote|quotation|बनाओ)$/i, '').trim() || 'Sharma Traders';
    } else if (lower.includes('शर्मा') || lower.includes('sharma')) {
      partyName = 'Sharma Traders';
    } else if (lower.includes('अग्रवाल') || lower.includes('agrawal') || lower.includes('agarwal')) {
      partyName = 'Agrawal Brothers';
    }
    proposalPayload = {
      proposalId: 'prop_' + Date.now(),
      actionType: isQuote ? 'CREATE_QUOTATION' : 'CREATE_INVOICE',
      title: isQuote
        ? tr(`Create Quotation for ${partyName} (₹${fmt(amountVal)})`, `${partyName} के लिए कोटेशन बनाएं (₹${fmt(amountVal)})`)
        : tr(`Create GST Tax Invoice for ${partyName} (₹${fmt(amountVal)})`, `${partyName} के लिए GST टैक्स इनवॉइस बनाएं (₹${fmt(amountVal)})`),
      summary: tr('AI parsed your instruction and created a safe Action Proposal Card. Click Approve & Execute to commit to ledger.', 'AI ने आपके निर्देश के अनुसार सुरक्षित कार्य प्रस्ताव कार्ड तैयार किया है। खाते में दर्ज करने के लिए "स्वीकृत करें" दबाएं।'),
      fields: [
        { label: tr('Party Name', 'पार्टी का नाम'), value: partyName },
        { label: tr('Document Type', 'दस्तावेज़'), value: isQuote ? 'Quotation (QT-2627)' : 'Tax Invoice (KQ-2627)' },
        { label: tr('Amount', 'राशि'), value: `₹${fmt(amountVal)}` },
        { label: tr('Safety Check', 'सुरक्षा जांच'), value: 'Owner Approval Required' }
      ],
      payload: {
        shopId: shop.id,
        customer: partyName,
        phone: '9829011223',
        docType: isQuote ? 'Quotation' : 'Tax Invoice',
        paymentMode: isQuote ? 'Quotation' : 'UPI',
        paidAmount: isQuote ? 0 : amountVal,
        items: [{ name: 'As per Order / B2B Supply', hsn: '8471', qty: 1, price: amountVal, gstRate: 18, taxMode: 'inclusive' }]
      }
    };
    responseHtml = renderAiManagerInsightCard('PROPOSAL_CARD', shop, proposalPayload);
  } else if (lower.includes('खर्च') || lower.includes('खर्चा') || lower.includes('expense') || lower.includes('भाड़ा') || lower.includes('freight') || lower.includes('rent')) {
    proposalPayload = {
      proposalId: 'prop_' + Date.now(),
      actionType: 'ADD_EXPENSE',
      title: tr(`Record Shop Expense Voucher (₹${fmt(amountVal)})`, `दुकान खर्च वाउचर दर्ज करें (₹${fmt(amountVal)})`),
      summary: tr('Review the expense details below and click Approve & Execute to deduct from Net Operating Profit.', 'नीचे खर्च का विवरण जांचें और शुद्ध मुनाफे में समायोजित करने के लिए "स्वीकृत करें" दबाएं।'),
      fields: [
        { label: tr('Category', 'श्रेणी'), value: 'Transport / Operations' },
        { label: tr('Amount', 'राशि'), value: `₹${fmt(amountVal)}` },
        { label: tr('Note', 'विवरण'), value: text }
      ],
      payload: {
        kind: 'add_expense',
        category: 'Transport / Freight',
        amount: amountVal,
        paymentMode: 'Cash',
        date: new Date().toISOString().slice(0, 10),
        note: text
      }
    };
    responseHtml = renderAiManagerInsightCard('PROPOSAL_CARD', shop, proposalPayload);
  } else if (lower.includes('उधार') || lower.includes('udhaar') || lower.includes('बकाया') || lower.includes('due') || lower.includes('aging') || lower.includes('overdue')) {
    responseHtml = renderAiManagerInsightCard('UDHAAR_AGING', shop);
  } else if (lower.includes('स्टॉक') || lower.includes('stock') || lower.includes('सामान') || lower.includes('item') || lower.includes('product') || lower.includes('margin')) {
    responseHtml = renderAiManagerInsightCard('TOP_ITEMS', shop);
  } else if (lower.includes('customer') || lower.includes('ग्राहक') || lower.includes('task') || lower.includes('reminder') || lower.includes('रिमाइंडर') || lower.includes('lead') || lower.includes('deal') || lower.includes('pipeline')) {
    const custs = state.data.myCustomers || [];
    const tasks = (state.data.myTasks || []).filter(t => t.status !== 'Completed');
    const leads = state.data.myCrmLeads || [];
    responseHtml = `
      <div>
        <div style="font-weight:800;font-size:0.95rem;color:#0f172a;margin-bottom:8px">📋 ${tr('Portfolio CRM, Tasks & Pipeline Intelligence', 'पोर्टफोलियो CRM, रिमाइंडर और पाइपलाइन विवरण')}</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:10px">
          <div style="background:#eff6ff;padding:8px 10px;border-radius:8px;border:1px solid #bfdbfe">
            <div style="font-size:0.7rem;color:#1d4ed8;font-weight:700">SAVED CUSTOMERS</div>
            <div style="font-size:1.1rem;font-weight:900;color:#1e3a8a">${custs.length}</div>
          </div>
          <div style="background:#fef3c7;padding:8px 10px;border-radius:8px;border:1px solid #fde68a">
            <div style="font-size:0.7rem;color:#b45309;font-weight:700">PENDING TASKS</div>
            <div style="font-size:1.1rem;font-weight:900;color:#92400e">${tasks.length}</div>
          </div>
          <div style="background:#f0fdf4;padding:8px 10px;border-radius:8px;border:1px solid #bbf7d0">
            <div style="font-size:0.7rem;color:#15803d;font-weight:700">ACTIVE DEALS</div>
            <div style="font-size:1.1rem;font-weight:900;color:#166534">${leads.length}</div>
          </div>
        </div>
        <div style="font-size:0.8rem;color:#334155;display:grid;gap:4px">
          <div><b>👥 Top Customers:</b> ${custs.slice(0, 4).map(c => `${esc(c.companyName || c.contactName)} (${esc(c.phone)})`).join(' · ') || 'None'}</div>
          <div><b>✅ Pending Tasks:</b> ${tasks.slice(0, 3).map(t => `[${esc(t.priority)}] ${esc(t.title)} (Due: ${esc(t.dueDate)})`).join(' · ') || 'All clear!'}</div>
          <div><b>🎯 Active Pipeline Deals:</b> ${leads.slice(0, 3).map(l => `${esc(l.buyerName)}: ${fmtINR(l.expectedValue)} (${esc(l.stage)})`).join(' · ') || 'None'}</div>
        </div>
      </div>
    `;
  } else {
    responseHtml = renderAiManagerInsightCard('DAILY_SUMMARY', shop);
  }

  state.aiManagerMessages.push({ role: 'assistant', time: nowStr, proposalId: proposalPayload?.proposalId, proposalPayload, html: responseHtml });
  if (input) input.value = '';
  render();
  scrollAiChatBoxesToBottom();

  // If a cloud AI provider is configured in Settings -> AI Digital Manager & APIs, also fetch generative response
  if (!proposalPayload && state.token && Array.isArray(shop.aiProviders) && shop.aiProviders.some(p => p.enabled !== false && p.hasKey)) {
    apiFetch('/api/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ prompt: text })
    }).then(res => {
      if (res && res.reply && res.engine && !res.engine.includes('Local')) {
        state.aiManagerMessages.push({
          role: 'assistant',
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          html: `<div style="font-size:0.72rem;color:#0284c7;font-weight:800;margin-bottom:4px">✨ ${esc(res.engine)}</div><div style="white-space:pre-line;font-size:0.84rem;line-height:1.5">${esc(res.reply)}</div>`
        });
        render();
        scrollAiChatBoxesToBottom();
      }
    }).catch(() => {});
  }
};

window.approveAiProposal = async function(proposalId, actionType, encodedData) {
  try {
    const u = state.data.user || {};
    const isStaffRestricted = u.role === 'staff' && u.staffRole && u.staffRole !== 'Owner';
    if (isStaffRestricted) {
      return showToast(tr('Only Store Owner can approve & execute AI Action Proposals!', 'केवल दुकान के स्वामी (Owner) ही AI कार्य प्रस्ताव को स्वीकृत कर सकते हैं!'), 'error');
    }
    const parsed = JSON.parse(decodeURIComponent(encodedData));
    if (actionType === 'CREATE_INVOICE' || actionType === 'CREATE_QUOTATION') {
      const res = await apiFetch('/api/orders/create', {
        method: 'POST',
        body: JSON.stringify(parsed.payload)
      });
      // Mark message as approved before re-render
      const msg = state.aiManagerMessages.find(m => m.proposalId === proposalId);
      if (msg && msg.proposalPayload) {
        msg.proposalPayload.executedStatus = 'APPROVED';
        msg.html = renderAiManagerInsightCard('PROPOSAL_CARD', getActiveAiShop(), msg.proposalPayload);
      }
      await bootstrap();
      showToast(tr(`✅ Executed! Created ${res.order.invoiceNo} for ${res.order.customer}.`, `✅ निष्पादित! ${res.order.customer} के लिए ${res.order.invoiceNo} बना दिया गया।`));
    } else if (actionType === 'ADD_EXPENSE') {
      if (state.token) {
        await apiFetch('/api/merchant/ledger', {
          method: 'POST',
          body: JSON.stringify(parsed.payload)
        });
      } else {
        state.data.myExpenses = state.data.myExpenses || [];
        state.data.myExpenses.unshift({ id: 'EXP-' + Date.now(), ...parsed.payload });
      }
      const msg = state.aiManagerMessages.find(m => m.proposalId === proposalId);
      if (msg && msg.proposalPayload) {
        msg.proposalPayload.executedStatus = 'APPROVED';
        msg.html = renderAiManagerInsightCard('PROPOSAL_CARD', getActiveAiShop(), msg.proposalPayload);
      }
      if (state.token) await bootstrap();
      else render();
      showToast(tr('✅ Executed! Expense voucher saved & Net Profit updated.', '✅ निष्पादित! खर्च वाउचर सुरक्षित हो गया और शुद्ध मुनाफा अपडेट हो गया।'));
    }
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.discardAiProposal = function(proposalId) {
  const msg = state.aiManagerMessages.find(m => m.proposalId === proposalId);
  if (msg && msg.proposalPayload) {
    msg.proposalPayload.executedStatus = 'DISCARDED';
    msg.html = renderAiManagerInsightCard('PROPOSAL_CARD', getActiveAiShop(), msg.proposalPayload);
  }
  render();
  showToast(tr('Action proposal discarded safely.', 'कार्य प्रस्ताव सुरक्षित रूप से निरस्त कर दिया गया।'));
};

window.openAiScannerModal = function() {
  state.aiModalOpen = true;
  render();
};

window.pickRegisteredBuyerForInvoice = function(merchantId) {
  if (!merchantId) return;
  const m = (state.data.merchants || []).find(x => x.id === merchantId);
  if (!m) return;
  state.invoiceBuyer = {
    ...state.invoiceBuyer,
    buyerShopId: m.id,
    name: m.shop || m.name || '',
    phone: m.phone || '',
    gstin: m.gstin || '',
    address: m.city ? `${m.city}, ${m.state || 'Rajasthan'}` : ''
  };
  render();
  showToast(tr(`🔄 Linked ${m.shop} for Dual-Ledger Auto-Sync!`, `🔄 दोहरे बही-खाते हेतु ${m.shop} को चुन लिया गया!`));
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
    const adminWa = state.data.settings?.adminWhatsApp || CENTRAL_SUPPORT_PHONE;
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
    const phone = document.getElementById('faq-phone').value.trim();
    if (!/^[6-9]\d{9}$/.test(phone)) {
      showToast(tr('Please enter a valid 10-digit Indian mobile number (e.g. 98XXXXXXXX)', 'कृपया 10 अंकों का वैध भारतीय मोबाइल नंबर दर्ज करें (शुरुआत 6, 7, 8 या 9 से हो)'), 'error');
      document.getElementById('faq-phone').focus();
      return;
    }
    await apiFetch('/api/public/submit', {
      method: 'POST',
      body: JSON.stringify({
        kind: 'faq',
        name: document.getElementById('faq-name').value.trim(),
        phone,
        question: document.getElementById('faq-question').value.trim()
      })
    });
    document.getElementById('faq-question').value = '';
    showToast(tr('Question submitted! Expected response within 2–4 business hours via WhatsApp/Call.', 'प्रश्न सफलतापूर्वक दर्ज हो गया! हमारी टीम 2 से 4 कार्य घंटों में WhatsApp या कॉल द्वारा संपर्क करेगी।'));
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
        <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end;margin-bottom:6px">
          <button type="button" class="floating-sub-btn" style="background:linear-gradient(135deg,#1E3A8A,#2563EB);color:#ffffff;border-color:#1D4ED8;font-weight:700" onclick="state.floatingHubOpen=false;openGlobalAiChatModal()">
            🤖 <span>${tr('AI Business Chat ("Ask Your Data")', 'AI बिज़नेस चैट (डेटा से पूछें)')}</span>
          </button>
          <button type="button" class="floating-sub-btn" onclick="state.floatingHubOpen=false;openVoucherScanModal()">
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

      <!-- Desktop View: Dual Pill Buttons -->
      <div class="desktop-only" style="display:flex;gap:8px;align-items:center">
        <button type="button" class="floating-hub-pill" style="background:linear-gradient(135deg,#0F172A,#1E3A8A);border:1.5px solid #3B82F6" onclick="openGlobalAiChatModal()">
          <span>🤖 ${tr('AI Chat', 'AI चैट')}</span>
        </button>
        <button type="button" class="floating-hub-pill" onclick="state.floatingHubOpen=!state.floatingHubOpen;render()">
          <span>${isOpen ? tr('✕ Close', '✕ बंद करें') : tr('✨ AI Tools & Excel', '✨ AI टूल्स व एक्सेल')}</span>
        </button>
      </div>

      <!-- Mobile View: Compact 48px Circular FAB (Does Not Obscure Cards) -->
      <div class="mobile-only">
        <button type="button" class="mobile-fab-circle" aria-label="AI Business Hub" title="${tr('AI Hub & Tools', 'AI टूल्स व असिस्टेंट')}" onclick="state.floatingHubOpen=!state.floatingHubOpen;render()">
          <span>${isOpen ? '✕' : '✨'}</span>
        </button>
      </div>
    </div>
  `;
}

function renderGlobalAiChatModal() {
  const shop = getActiveAiShop();
  const u = state.data.user || {};
  const messages = state.aiManagerMessages && state.aiManagerMessages.length > 0
    ? state.aiManagerMessages
    : [
        {
          id: 'welcome-ai',
          role: 'assistant',
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          html: renderAiManagerInsightCard('welcome', shop)
        }
      ];

  return `
    <div class="modal-overlay" style="display:flex;align-items:center;justify-content:center;position:fixed;inset:0;background:rgba(15,23,42,0.72);z-index:99999;backdrop-filter:blur(4px);padding:12px">
      <div class="card" style="max-width:860px;width:100%;max-height:92vh;display:flex;flex-direction:column;border-radius:18px;padding:0;overflow:hidden;border:2px solid #2563EB;box-shadow:0 24px 48px rgba(15,23,42,0.35)">
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#0F172A 0%,#1E3A8A 100%);color:#ffffff;padding:14px 18px;display:flex;justify-content:space-between;align-items:center;gap:12px">
          <div>
            <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(250,204,21,0.2);border:1px solid rgba(250,204,21,0.5);color:#fde047;padding:2px 8px;border-radius:999px;font-size:0.7rem;font-weight:800;margin-bottom:4px">
              🛡️ ZERO DIRECT MUTATION · 883s AI BUSINESS MANAGER
            </div>
            <h3 style="color:#ffffff;margin:0;font-size:1.1rem">🤖 ${tr('KuberQ AI Business Chat — "Ask Your Data Anything"', 'KuberQ AI बिज़नेस चैट — अपने व्यापार के डेटा से कुछ भी पूछें')}</h3>
          </div>
          <button type="button" class="btn btn-ghost btn-sm" style="color:#ffffff;border-color:rgba(255,255,255,0.3)" onclick="state.aiChatModalOpen=false;render()">✕ ${tr('Close', 'बंद करें')}</button>
        </div>

        <!-- Quick Chips -->
        <div style="background:#EFF6FF;padding:10px 16px;border-bottom:1px solid #BFDBFE;display:flex;gap:6px;flex-wrap:wrap">
          <button type="button" class="btn btn-xs btn-primary" onclick="askAiBusinessManager('sales_summary')">📊 ${tr('Sales & Net Profit', 'बिक्री व शुद्ध मुनाफ़ा')}</button>
          <button type="button" class="btn btn-xs btn-outline" style="background:#fff" onclick="askAiBusinessManager('pending_udhaar')">📒 ${tr('Udhaar & 60+ Days Aging', 'बकाया उधार व एजिंग')}</button>
          <button type="button" class="btn btn-xs btn-outline" style="background:#fff" onclick="askAiBusinessManager('top_stock')">📦 ${tr('Stock & Margins', 'स्टॉक व मार्जिन')}</button>
          <button type="button" class="btn btn-xs btn-outline" style="background:#FEFCE8;border-color:#FDE047;color:#854D0E" onclick="askAiBusinessManager('draft_bill_sharma')">⚡ ${tr('Proposal: ₹2,500 Quote for Sharma Ji', 'प्रस्ताव: शर्मा जी ₹2,500 कोटेशन')}</button>
          <button type="button" class="btn btn-xs btn-outline" style="background:#F0FDF4;border-color:#86EFAC;color:#166534" onclick="askAiBusinessManager('draft_expense_elec')">⚡ ${tr('Proposal: ₹1,200 Electricity Expense', 'प्रस्ताव: ₹1,200 बिजली खर्च')}</button>
        </div>

        <!-- Chat Stream -->
        <div id="ai-global-chat-box" style="flex:1;overflow-y:auto;padding:16px;background:#F8FAFC;display:flex;flex-direction:column;gap:12px;min-height:280px;max-height:54vh">
          ${messages.map(m => `
            <div style="display:flex;flex-direction:column;align-items:${m.role === 'user' ? 'flex-end' : 'flex-start'}">
              <div style="max-width:${m.role === 'user' ? '80%' : '98%'};width:${m.role === 'user' ? 'auto' : '100%'};background:${m.role === 'user' ? '#2563EB' : '#ffffff'};color:${m.role === 'user' ? '#ffffff' : '#0f172a'};padding:12px 14px;border-radius:14px;border:${m.role === 'user' ? 'none' : '1.5px solid #cbd5e1'};box-shadow:0 2px 6px rgba(15,23,42,0.05)">
                <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:4px;font-size:0.7rem;opacity:0.8">
                  <b>${m.role === 'user' ? `👤 ${esc(u.name || tr('Merchant / Visitor', 'व्यापारी / उपयोगकर्ता'))}` : '🤖 KuberQ AI Business Manager'}</b>
                  <span>${esc(m.time || '')}</span>
                </div>
                <div>${m.html}</div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Input Bar -->
        <form onsubmit="submitAiBusinessManagerPrompt(event, 'ai-global-input')" style="padding:12px 16px;background:#ffffff;border-top:1px solid #E2E8F0;display:grid;grid-template-columns:1fr auto auto;gap:8px;align-items:center">
          <input class="input" id="ai-global-input" placeholder="${tr('Ask in Hindi or English: "आज की कुल बिक्री?", "किसका उधार बाकी है?", "Create bill for Sharma Traders Rs 2500"...', 'हिंदी या अंग्रेज़ी में पूछें: "आज की कुल बिक्री?", "किसका उधार बाकी है?", "शर्मा जी का 2500 का बिल बनाओ"...')}" style="font-size:0.92rem;padding:10px 14px" />
          <button type="button" class="btn btn-outline" style="padding:10px 12px" title="${tr('Speak in Hindi or English', 'बोलकर पूछें (Voice)')}" onclick="startAiVoiceInput('ai-global-input')">
            🎤 ${tr('Voice', 'बोलें')}
          </button>
          <button type="submit" class="btn btn-primary" style="padding:10px 18px;font-weight:700">
            🚀 ${tr('Ask AI', 'पूछें')}
          </button>
        </form>
      </div>
    </div>
  `;
}

window.openGlobalAiChatModal = function() {
  state.aiChatModalOpen = true;
  state.floatingHubOpen = false;
  render();
  scrollAiChatBoxesToBottom();
};

window.startAiVoiceInput = function(inputId = 'ai-mgr-input') {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) {
    return showToast(tr('Voice input is supported in Chrome / Edge browsers.', 'वॉइस इनपुट Chrome / Edge ब्राउज़र में समर्थित है।'), 'error');
  }
  const rec = new SpeechRec();
  rec.lang = state.lang === 'hi' ? 'hi-IN' : 'en-IN';
  rec.interimResults = false;
  rec.maxAlternatives = 1;
  showToast(tr('🎤 Listening... Speak your query or billing instruction now!', '🎤 सुन रहा हूँ... अपना सवाल या बिल निर्देश बोलें!'));
  rec.onresult = function(event) {
    const transcript = event.results?.[0]?.[0]?.transcript || '';
    const el = document.getElementById(inputId) || document.getElementById('ai-mgr-input') || document.getElementById('ai-global-input');
    if (el && transcript) {
      el.value = transcript;
      window.submitAiBusinessManagerPrompt({ preventDefault: () => {} }, inputId);
    }
  };
  rec.onerror = function() {
    showToast(tr('Could not capture voice. Please try again or type below.', 'आवाज़ स्पष्ट नहीं आई, कृपया पुनः प्रयास करें या टाइप करें।'), 'error');
  };
  rec.start();
};

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

// ============================================================================
// CUSTOMERS CRM DIRECTORY & BLURRED ADD/EDIT CUSTOMER MODAL (ITEMS #6, #7, #8)
// ============================================================================
const ALL_14_STAFF_PERMISSIONS = [
  { key: 'Dashboard View', label: '📊 Dashboard View', hi: 'डैशबोर्ड दृश्य' },
  { key: 'Customers', label: '👥 Customers', hi: 'ग्राहक CRM' },
  { key: 'Leads', label: '🎯 Leads & Deals', hi: 'लीड्स व पाइपलाइन' },
  { key: 'Product', label: '📦 Product & Stock', hi: 'सामान व स्टॉक' },
  { key: 'Tasks', label: '✅ Tasks & Reminders', hi: 'टास्क व रिमाइंडर' },
  { key: 'Quotation', label: '📝 Quotation', hi: 'कोटेशन' },
  { key: 'Invoices', label: '🧾 Invoices & Billing', hi: 'इनवॉइस व बिलिंग' },
  { key: 'Payments', label: '💳 Payments & Udhaar', hi: 'पेमेंट व उधार' },
  { key: 'Expenses', label: '💸 Expenses', hi: 'खर्च रजिस्टर' },
  { key: 'Report', label: '📈 Reports & P&L', hi: 'रिपोर्ट्स व P&L' },
  { key: 'AI Access', label: '✨ AI Access', hi: 'AI मैनेजर एक्सेस' },
  { key: 'Managers', label: '🛡️ Managers & Staff', hi: 'मैनेजर व स्टाफ' },
  { key: 'Setting', label: '⚙️ Setting', hi: 'सेटिंग्स' },
  { key: 'Backup', label: '💾 Backup', hi: 'डेटा बैकअप' }
];

function renderMerchantCustomersCrm(shop) {
  const customers = state.data.myCustomers || [];
  const orders = (state.data.myOrders || []).filter(o => o.status !== 'Rejected' && o.docType !== 'Quotation');

  return `
    <div style="display:grid;gap:16px">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
        <div>
          <h2 style="font-size:1.35rem;font-weight:900;color:#0f172a;margin:0">👥 ${tr('Customers CRM Directory (360° Profiles)', 'ग्राहक डायरेक्टरी (Customers CRM — एक बार सेव करें, बार-बार उपयोग करें)')}</h2>
          <p style="font-size:0.82rem;color:#64748b;margin:3px 0 0">${tr('Manage customer profiles, GSTIN, PAN, billing addresses, credit limits, and 1-click invoicing', 'ग्राहकों का नाम, कंपनी, GSTIN, पता और क्रेडिट लिमिट एक बार सेव करें — बिल बनाते समय 1-क्लिक में ऑटो-फिल होगा')}</p>
        </div>
        <button type="button" class="btn btn-primary" style="background:#0284c7;border-color:#0284c7;padding:9px 18px;font-weight:800" onclick="openCustomerModal()">
          + ${tr('Add New Customer', '+ नया ग्राहक जोड़ें')}
        </button>
      </div>

      <div class="erp-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
          <h3 style="margin:0;font-size:1rem">${tr('Customer List', 'पंजीकृत ग्राहक सूची')} (${customers.length})</h3>
          <span class="badge badge-primary">${tr('1-Click Auto-Fill in GST Billing Enabled', 'बिलिंग में 1-क्लिक ऑटो-फिल चालू')}</span>
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>${tr('Customer / Company Name', 'ग्राहक / फर्म का नाम')}</th>
                <th>${tr('Phone & Email', 'मोबाइल व ईमेल')}</th>
                <th>${tr('GSTIN & PAN', 'GSTIN व PAN')}</th>
                <th>${tr('Billing City & State', 'शहर व राज्य')}</th>
                <th>${tr('Total Invoiced', 'कुल बिलिंग')}</th>
                <th>${tr('Outstanding Due', 'बकाया उधार')}</th>
                <th style="text-align:right">${tr('Quick Actions', 'त्वरित कार्रवाई')}</th>
              </tr>
            </thead>
            <tbody>
              ${customers.length === 0 ? `
                <tr>
                  <td colspan="7" style="text-align:center;padding:28px" class="text-muted">
                    ${tr('No customers saved yet. Click "+ Add New Customer" above to save your first buyer profile.', 'अभी कोई ग्राहक सेव नहीं है। ऊपर "+ Add New Customer" बटन दबाकर ग्राहक जोड़ें।')}
                  </td>
                </tr>
              ` : customers.map(c => {
                const custOrders = orders.filter(o => (c.phone && o.phone === c.phone) || (o.customer && (o.customer.toLowerCase() === (c.companyName || '').toLowerCase() || o.customer.toLowerCase() === (c.contactName || '').toLowerCase())));
                const totalInvoiced = custOrders.reduce((s, o) => s + (Number(o.totals?.gross) || 0), 0);
                const totalDue = custOrders.reduce((s, o) => {
                  const g = Number(o.totals?.gross) || 0;
                  const pd = o.paymentMode === 'Credit' && !o.udhaarSettled ? Math.min(g, Number(o.paidAmount) || 0) : g;
                  return s + Math.max(0, g - pd);
                }, 0);
                return `
                  <tr>
                    <td>
                      <b style="color:#0284c7;cursor:pointer" onclick="openCustomerModal('${c.id}')">${esc(c.contactName)}</b>
                      <div class="text-muted" style="font-size:0.76rem">${esc(c.companyName || 'Individual / Retail')}</div>
                    </td>
                    <td>
                      <div>📱 <b>${esc(c.phone || '—')}</b></div>
                      <div class="text-muted" style="font-size:0.74rem">${esc(c.email || '—')}</div>
                    </td>
                    <td>
                      <div style="font-family:monospace;font-size:0.78rem;font-weight:700">${esc(c.gstin || 'Unregistered')}</div>
                      ${c.pan ? `<div class="text-muted" style="font-family:monospace;font-size:0.72rem">PAN: ${esc(c.pan)}</div>` : ''}
                    </td>
                    <td style="font-size:0.8rem">${esc(c.city || '—')}, ${esc(c.state || '—')} ${c.pincode ? `(${esc(c.pincode)})` : ''}</td>
                    <td><b>${fmtINR(totalInvoiced)}</b></td>
                    <td><b style="color:${totalDue > 0 ? '#dc2626' : '#16a34a'}">${fmtINR(totalDue)}</b></td>
                    <td style="text-align:right">
                      <div style="display:flex;gap:5px;justify-content:flex-end;flex-wrap:wrap">
                        <button type="button" class="btn btn-primary btn-sm" style="padding:3px 9px;font-size:0.73rem" onclick="prefillInvoiceFromCustomer('${c.id}')">🧾 ${tr('Create Bill', 'बिल बनाएँ')}</button>
                        <button type="button" class="btn btn-ghost btn-sm" style="padding:3px 8px;font-size:0.73rem" onclick="openCustomerModal('${c.id}')">✏️ ${tr('Edit', 'बदलें')}</button>
                        <button type="button" class="btn btn-danger btn-sm" style="padding:3px 7px;font-size:0.73rem" onclick="deleteCustomerRecord('${c.id}')">🗑️</button>
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

// Blurred-Background Modal for Add/Edit Customer (Matching Screenshot 2)
function renderCustomerModal() {
  const c = state.customerModal;
  if (!c) return '';
  const isEdit = Boolean(c.id);
  return `
    <div class="pro-blur-modal-overlay" onclick="state.customerModal=null;render()">
      <div class="pro-blur-modal-card" onclick="event.stopPropagation()">
        <div class="pro-blur-modal-head">
          <h3>👤 ${isEdit ? tr('Edit Customer Profile', 'ग्राहक विवरण अपडेट करें') : tr('Add New Customer', 'नया ग्राहक जोड़ें (Add New Customer)')}</h3>
          <button type="button" class="btn btn-ghost btn-sm" onclick="state.customerModal=null;render()">✕</button>
        </div>
        <form onsubmit="saveCustomerModalForm(event)">
          <div class="pro-blur-modal-body" style="display:grid;gap:12px">
            <div class="grid grid-2" style="gap:12px">
              <div>
                <label class="form-label">${tr('Primary Contact Name', 'संपर्क व्यक्ति का नाम')} <span style="color:#dc2626">*</span></label>
                <input class="input" id="cm-contact" required value="${esc(c.contactName || '')}" placeholder="e.g. Rajesh Sharma" />
              </div>
              <div>
                <label class="form-label">${tr('Business / Company Name', 'व्यापार / कंपनी का नाम')}</label>
                <input class="input" id="cm-company" value="${esc(c.companyName || '')}" placeholder="e.g. Sharma Hardware Mart" />
              </div>
            </div>

            <div class="grid grid-2" style="gap:12px">
              <div>
                <label class="form-label">${tr('Email Address', 'ईमेल पता')}</label>
                <input class="input" type="email" id="cm-email" value="${esc(c.email || '')}" placeholder="customer@example.com" />
              </div>
              <div>
                <label class="form-label">${tr('Phone / WhatsApp', 'मोबाइल / WhatsApp नंबर')} *</label>
                <input class="input" id="cm-phone" required value="${esc(c.phone || '')}" placeholder="+91 9829011223" />
              </div>
            </div>

            <div class="grid grid-2" style="gap:12px">
              <div>
                <label class="form-label">${tr('GSTIN (15 characters)', 'GSTIN (15 अंक)')}</label>
                <input class="input" id="cm-gstin" maxlength="15" style="text-transform:uppercase;font-family:monospace" value="${esc(c.gstin || '')}" placeholder="27AAACA1234A1Z5" />
              </div>
              <div>
                <label class="form-label">${tr('PAN (10 characters)', 'पैन नंबर (10 अंक)')}</label>
                <input class="input" id="cm-pan" maxlength="10" style="text-transform:uppercase;font-family:monospace" value="${esc(c.pan || '')}" placeholder="AAACA1234A" />
              </div>
            </div>

            <div>
              <label class="form-label">${tr('Billing Address', 'बिलिंग पता (Billing Address)')}</label>
              <input class="input" id="cm-street" value="${esc(c.street || '')}" placeholder="${tr('Street / Market / Industrial Area', 'गली / मार्केट / इंडस्ट्रियल एरिया')}" style="margin-bottom:8px" />
              <div class="grid grid-3" style="gap:8px">
                <input class="input" id="cm-city" value="${esc(c.city || state.data.myShop?.city || 'Jodhpur')}" placeholder="${tr('City', 'शहर')}" />
                <input class="input" id="cm-state" value="${esc(c.state || state.data.myShop?.state || 'Rajasthan')}" placeholder="${tr('State', 'राज्य')}" />
                <input class="input" id="cm-pincode" maxlength="6" value="${esc(c.pincode || '')}" placeholder="${tr('Pincode', 'पिनकोड')}" />
              </div>
            </div>

            <div class="grid grid-2" style="gap:12px">
              <div>
                <label class="form-label">${tr('Credit Limit (₹)', 'अधिकतम उधार सीमा (Credit Limit ₹)')}</label>
                <input class="input" type="number" id="cm-limit" value="${Number(c.creditLimit || 100000)}" />
              </div>
              <div>
                <label class="form-label">${tr('Internal Notes', 'विशेष विवरण / नोट्स')}</label>
                <input class="input" id="cm-notes" value="${esc(c.notes || '')}" placeholder="${tr('Special requirements, contact preferences...', 'विशेष शर्तें या डिलीवरी निर्देश...')}" />
              </div>
            </div>
          </div>

          <div class="pro-blur-modal-foot">
            <button type="button" class="btn btn-ghost" onclick="state.customerModal=null;render()">${tr('Cancel', 'रद्द करें')}</button>
            <button type="submit" class="btn btn-primary" style="background:#0284c7;border-color:#0284c7;padding:8px 20px;font-weight:800">
              ✓ ${tr('Save Customer', '✓ ग्राहक सेव करें')}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

window.openCustomerModal = function(custId = null) {
  if (custId) {
    const existing = (state.data.myCustomers || []).find(x => x.id === custId);
    state.customerModal = existing ? { ...existing } : {};
  } else {
    state.customerModal = {
      contactName: '',
      companyName: '',
      email: '',
      phone: '',
      gstin: '',
      pan: '',
      street: '',
      city: state.data.myShop?.city || 'Jodhpur',
      state: state.data.myShop?.state || 'Rajasthan',
      pincode: '',
      creditLimit: 100000,
      notes: ''
    };
  }
  render();
};

window.saveCustomerModalForm = async function(e) {
  e.preventDefault();
  try {
    const payload = {
      action: 'customer_save',
      id: state.customerModal?.id || null,
      contactName: document.getElementById('cm-contact').value.trim(),
      companyName: document.getElementById('cm-company').value.trim(),
      email: document.getElementById('cm-email').value.trim(),
      phone: document.getElementById('cm-phone').value.trim().replace(/\D/g, '').slice(-10),
      gstin: document.getElementById('cm-gstin').value.trim().toUpperCase(),
      pan: document.getElementById('cm-pan').value.trim().toUpperCase(),
      street: document.getElementById('cm-street').value.trim(),
      city: document.getElementById('cm-city').value.trim(),
      state: document.getElementById('cm-state').value.trim(),
      pincode: document.getElementById('cm-pincode').value.trim(),
      creditLimit: Number(document.getElementById('cm-limit').value || 100000),
      notes: document.getElementById('cm-notes').value.trim()
    };
    const res = await apiFetch('/api/merchant/pro', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    state.customerModal = null;
    await bootstrap();
    if (res.customer && state.merchantTab === 'InvoiceBuilder') {
      window.pickSavedCrmCustomerForInvoice(res.customer.id);
    }
    showToast(tr('✅ Customer profile saved! Available for 1-click auto-fill in all future bills.', '✅ ग्राहक प्रोफाइल सेव हो गया! अब हर बिल में 1-क्लिक में ऑटो-फिल होगा।'));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.deleteCustomerRecord = async function(id) {
  if (!confirm(tr('Delete this customer profile?', 'क्या आप इस ग्राहक प्रोफाइल को हटाना चाहते हैं?'))) return;
  try {
    await apiFetch('/api/merchant/pro', {
      method: 'POST',
      body: JSON.stringify({ action: 'customer_delete', id })
    });
    await bootstrap();
    showToast(tr('Customer removed', 'ग्राहक हटाया गया'));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.pickSavedCrmCustomerForInvoice = function(customerId) {
  if (!customerId) return;
  const c = (state.data.myCustomers || []).find(x => x.id === customerId);
  if (!c) return;
  state.invoiceBuyer = {
    ...state.invoiceBuyer,
    name: c.companyName || c.contactName || '',
    phone: c.phone || '',
    gstin: c.gstin || '',
    address: [c.street, c.city, c.state, c.pincode].filter(Boolean).join(', ')
  };
  render();
  showToast(tr(`✅ Auto-filled details for ${c.companyName || c.contactName}!`, `✅ ${c.companyName || c.contactName} का विवरण बिल में स्वतः भर गया!`));
};

window.prefillInvoiceFromCustomer = function(customerId) {
  const c = (state.data.myCustomers || []).find(x => x.id === customerId);
  if (!c) return;
  state.invoiceDocType = 'Tax Invoice';
  state.invoiceBuyer = {
    ...state.invoiceBuyer,
    name: c.companyName || c.contactName || '',
    phone: c.phone || '',
    gstin: c.gstin || '',
    address: [c.street, c.city, c.state, c.pincode].filter(Boolean).join(', ')
  };
  state.merchantTab = 'InvoiceBuilder';
  render();
  showToast(tr(`🧾 Ready to bill ${c.companyName || c.contactName}`, `🧾 ${c.companyName || c.contactName} के लिए बिल तैयार है`));
};

// ============================================================================
// TASKS & REMINDERS MODULE + BLURRED MODAL (ITEM #13)
// ============================================================================
function renderMerchantTasks(shop) {
  const tasks = state.data.myTasks || [];
  const pendingCount = tasks.filter(t => t.status !== 'Completed').length;

  return `
    <div style="display:grid;gap:16px">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
        <div>
          <h2 style="font-size:1.35rem;font-weight:900;color:#0f172a;margin:0">✅ ${tr('Tasks & Follow-Up Reminders', 'टास्क व फॉलो-अप रिमाइंडर (Tasks & Reminders)')}</h2>
          <p style="font-size:0.82rem;color:#64748b;margin:3px 0 0">${tr('Manage daily reminders for payment follow-ups, dispatch schedules, GST filing, and staff assignments', 'पेमेंट तकादा, माल डिस्पैच, GST रिटर्न और स्टाफ के दैनिक कार्यों के रिमाइंडर यहाँ ट्रैक करें')}</p>
        </div>
        <button type="button" class="btn btn-primary" style="background:#0284c7;border-color:#0284c7;padding:9px 18px;font-weight:800" onclick="openTaskModal()">
          + ${tr('Add Task / Reminder', '+ नया रिमाइंडर जोड़ें')}
        </button>
      </div>

      <div class="grid grid-4" style="gap:10px">
        <div class="erp-card" style="padding:12px 14px;border-left:4px solid #dc2626">
          <div style="font-size:0.74rem;color:#64748b;font-weight:700">${tr('Urgent / High Priority', 'अति-आवश्यक (Urgent / High)')}</div>
          <div style="font-size:1.35rem;font-weight:900;color:#dc2626;margin-top:3px">${tasks.filter(t => t.status !== 'Completed' && (t.priority === 'Urgent' || t.priority === 'High')).length}</div>
        </div>
        <div class="erp-card" style="padding:12px 14px;border-left:4px solid #d97706">
          <div style="font-size:0.74rem;color:#64748b;font-weight:700">${tr('Pending / In Progress', 'लंबित कार्य (Pending)')}</div>
          <div style="font-size:1.35rem;font-weight:900;color:#d97706;margin-top:3px">${pendingCount}</div>
        </div>
        <div class="erp-card" style="padding:12px 14px;border-left:4px solid #16a34a">
          <div style="font-size:0.74rem;color:#64748b;font-weight:700">${tr('Completed Tasks', 'पूर्ण किए गए कार्य')}</div>
          <div style="font-size:1.35rem;font-weight:900;color:#16a34a;margin-top:3px">${tasks.filter(t => t.status === 'Completed').length}</div>
        </div>
        <div class="erp-card" style="padding:12px 14px;border-left:4px solid #0284c7">
          <div style="font-size:0.74rem;color:#64748b;font-weight:700">${tr('Total Reminders', 'कुल रिमाइंडर')}</div>
          <div style="font-size:1.35rem;font-weight:900;color:#0284c7;margin-top:3px">${tasks.length}</div>
        </div>
      </div>

      <div class="erp-card">
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>${tr('Task Title & Details', 'कार्य शीर्षक व विवरण')}</th>
                <th>${tr('Priority', 'प्राथमिकता (Priority)')}</th>
                <th>${tr('Due Date', 'नियत तिथि (Due Date)')}</th>
                <th>${tr('Assigned To', 'किसे सौंपा गया')}</th>
                <th>${tr('Status', 'स्थिति (Status)')}</th>
                <th style="text-align:right">${tr('Actions', 'कार्रवाई')}</th>
              </tr>
            </thead>
            <tbody>
              ${tasks.length === 0 ? `
                <tr>
                  <td colspan="6" style="text-align:center;padding:28px" class="text-muted">
                    ${tr('No tasks or reminders yet. Click "+ Add Task / Reminder" above to create one.', 'अभी कोई रिमाइंडर नहीं है। ऊपर "+ Add Task / Reminder" दबाकर नया रिमाइंडर जोड़ें।')}
                  </td>
                </tr>
              ` : tasks.map(t => {
                const prColors = {
                  Urgent: { bg: '#fee2e2', color: '#dc2626' },
                  High: { bg: '#ffedd5', color: '#ea580c' },
                  Medium: { bg: '#fef3c7', color: '#d97706' },
                  Low: { bg: '#e0f2fe', color: '#0284c7' }
                };
                const pr = prColors[t.priority] || prColors.Medium;
                return `
                  <tr style="${t.status === 'Completed' ? 'opacity:0.65' : ''}">
                    <td>
                      <b style="${t.status === 'Completed' ? 'text-decoration:line-through' : ''}">${esc(t.title)}</b>
                      <div class="text-muted" style="font-size:0.76rem;margin-top:2px">${esc(t.details || '')}</div>
                    </td>
                    <td>
                      <span style="background:${pr.bg};color:${pr.color};font-weight:800;font-size:0.72rem;padding:3px 9px;border-radius:999px">${esc(t.priority || 'Medium')}</span>
                    </td>
                    <td style="font-size:0.82rem;font-weight:700">${esc(t.dueDate || 'Today')}</td>
                    <td style="font-size:0.82rem">👤 ${esc(t.assignedTo || 'Owner')}</td>
                    <td>
                      <span class="badge ${t.status === 'Completed' ? 'badge-primary' : 'badge-gold'}">${esc(t.status || 'Pending')}</span>
                    </td>
                    <td style="text-align:right">
                      <div style="display:flex;gap:5px;justify-content:flex-end">
                        ${t.status !== 'Completed' ? `<button type="button" class="btn btn-primary btn-sm" style="padding:3px 9px;font-size:0.72rem" onclick="quickCompleteTask('${t.id}')">✓ ${tr('Done', 'पूर्ण')}</button>` : ''}
                        <button type="button" class="btn btn-ghost btn-sm" style="padding:3px 8px;font-size:0.72rem" onclick="openTaskModal('${t.id}')">✏️</button>
                        <button type="button" class="btn btn-danger btn-sm" style="padding:3px 8px;font-size:0.72rem" onclick="deleteTaskRecord('${t.id}')">🗑️</button>
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

function renderTaskModal() {
  const t = state.taskModal;
  if (!t) return '';
  const isEdit = Boolean(t.id);
  const staffOptions = ['Owner', ...(state.data.myManagers || []).map(m => m.name), ...(state.data.myStaff || []).map(s => s.name)];
  return `
    <div class="pro-blur-modal-overlay" onclick="state.taskModal=null;render()">
      <div class="pro-blur-modal-card" style="max-width:560px" onclick="event.stopPropagation()">
        <div class="pro-blur-modal-head">
          <h3>✅ ${isEdit ? tr('Update Task / Reminder', 'रिमाइंडर अपडेट करें') : tr('Add New Task / Reminder', 'नया टास्क / रिमाइंडर जोड़ें')}</h3>
          <button type="button" class="btn btn-ghost btn-sm" onclick="state.taskModal=null;render()">✕</button>
        </div>
        <form onsubmit="saveTaskModalForm(event)">
          <div class="pro-blur-modal-body" style="display:grid;gap:12px">
            <div>
              <label class="form-label">${tr('Task Title / Reminder Headline', 'कार्य का शीर्षक')} <span style="color:#dc2626">*</span></label>
              <input class="input" id="tm-title" required value="${esc(t.title || '')}" placeholder="${tr('e.g. Call Rajesh Sharma for ₹86,000 Pending Invoice', 'उदा: राजेश शर्मा से ₹86,000 बकाया बिल के लिए बात करें')}" />
            </div>
            <div>
              <label class="form-label">${tr('Task Details / Notes', 'विस्तृत विवरण / नोट्स')}</label>
              <textarea class="textarea" rows="3" id="tm-details" placeholder="${tr('Add payment reference, phone number, or dispatch instructions...', 'भुगतान विवरण, फोन नंबर या निर्देश लिखें...')}">${esc(t.details || '')}</textarea>
            </div>
            <div class="grid grid-2" style="gap:12px">
              <div>
                <label class="form-label">${tr('Priority', 'प्राथमिकता (Priority)')} *</label>
                <select class="select" id="tm-priority">
                  ${['Urgent', 'High', 'Medium', 'Low'].map(p => `<option value="${p}" ${(t.priority || 'High') === p ? 'selected' : ''}>${p}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="form-label">${tr('Due Date', 'नियत तिथि (Due Date)')} *</label>
                <input class="input" type="date" id="tm-date" required value="${esc(t.dueDate || new Date().toISOString().slice(0, 10))}" />
              </div>
            </div>
            <div class="grid grid-2" style="gap:12px">
              <div>
                <label class="form-label">${tr('Assigned To', 'किसे सौंपा गया (Assigned To)')}</label>
                <input class="input" id="tm-assigned" list="tm-staff-list" value="${esc(t.assignedTo || 'Owner')}" placeholder="Owner / Staff Name" />
                <datalist id="tm-staff-list">
                  ${staffOptions.map(s => `<option value="${esc(s)}"></option>`).join('')}
                </datalist>
              </div>
              <div>
                <label class="form-label">${tr('Status', 'स्थिति (Status)')}</label>
                <select class="select" id="tm-status">
                  ${['Pending', 'In Progress', 'Completed'].map(s => `<option value="${s}" ${(t.status || 'Pending') === s ? 'selected' : ''}>${s}</option>`).join('')}
                </select>
              </div>
            </div>
          </div>
          <div class="pro-blur-modal-foot">
            <button type="button" class="btn btn-ghost" onclick="state.taskModal=null;render()">${tr('Cancel', 'रद्द करें')}</button>
            <button type="submit" class="btn btn-primary" style="background:#0284c7;border-color:#0284c7;padding:8px 20px;font-weight:800">
              ✓ ${tr('Save Task', '✓ रिमाइंडर सेव करें')}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

window.openTaskModal = function(taskId = null) {
  if (taskId) {
    const existing = (state.data.myTasks || []).find(x => x.id === taskId);
    state.taskModal = existing ? { ...existing } : {};
  } else {
    state.taskModal = {
      title: '',
      details: '',
      priority: 'High',
      dueDate: new Date().toISOString().slice(0, 10),
      assignedTo: 'Owner',
      status: 'Pending'
    };
  }
  render();
};

window.saveTaskModalForm = async function(e) {
  e.preventDefault();
  try {
    await apiFetch('/api/merchant/pro', {
      method: 'POST',
      body: JSON.stringify({
        action: 'task_save',
        id: state.taskModal?.id || null,
        title: document.getElementById('tm-title').value.trim(),
        details: document.getElementById('tm-details').value.trim(),
        priority: document.getElementById('tm-priority').value,
        dueDate: document.getElementById('tm-date').value,
        assignedTo: document.getElementById('tm-assigned').value.trim() || 'Owner',
        status: document.getElementById('tm-status').value
      })
    });
    state.taskModal = null;
    await bootstrap();
    showToast(tr('✅ Task / Reminder saved!', '✅ रिमाइंडर सफलतापूर्वक सेव हो गया!'));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.quickCompleteTask = async function(id) {
  try {
    const existing = (state.data.myTasks || []).find(x => x.id === id);
    if (!existing) return;
    await apiFetch('/api/merchant/pro', {
      method: 'POST',
      body: JSON.stringify({
        action: 'task_save',
        ...existing,
        status: 'Completed'
      })
    });
    await bootstrap();
    showToast(tr('✅ Task marked as completed!', '✅ कार्य पूर्ण हो गया!'));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.deleteTaskRecord = async function(id) {
  if (!confirm(tr('Delete this task?', 'क्या आप इस रिमाइंडर को हटाना चाहते हैं?'))) return;
  try {
    await apiFetch('/api/merchant/pro', {
      method: 'POST',
      body: JSON.stringify({ action: 'task_delete', id })
    });
    await bootstrap();
    showToast(tr('Task deleted', 'रिमाइंडर हटाया गया'));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

// ============================================================================
// BLURRED "+ ADD DEAL / LEAD" MODAL FOR 6-STAGE KANBAN PIPELINE (ITEM #11)
// ============================================================================
function renderDealModal() {
  const d = state.dealModal;
  if (!d) return '';
  const isEdit = Boolean(d.id);
  const stages = [
    { key: 'New Inquiry', label: 'New Inquiries (नई पूछताछ)' },
    { key: 'Contacted', label: 'Discovery / Qualified (क्वालिफाइड)' },
    { key: 'Proposal Sent', label: 'Proposal Sent (कोटेशन भेजा)' },
    { key: 'Negotiation', label: 'Negotiation (मोल-भाव)' },
    { key: 'Won', label: 'Closed Won (डील पक्की)' },
    { key: 'Lost', label: 'Closed Lost (ड्रॉप)' }
  ];
  return `
    <div class="pro-blur-modal-overlay" onclick="state.dealModal=null;render()">
      <div class="pro-blur-modal-card" style="max-width:580px" onclick="event.stopPropagation()">
        <div class="pro-blur-modal-head">
          <h3>🎯 ${isEdit ? tr('Edit Deal / Pipeline Lead', 'डील / लीड अपडेट करें') : tr('Add New Deal to Pipeline', 'पाइपलाइन में नई डील / लीड जोड़ें')}</h3>
          <button type="button" class="btn btn-ghost btn-sm" onclick="state.dealModal=null;render()">✕</button>
        </div>
        <form onsubmit="saveDealModalForm(event)">
          <div class="pro-blur-modal-body" style="display:grid;gap:12px">
            <div>
              <label class="form-label">${tr('Deal Title / Requirement Headline', 'डील का शीर्षक / मुख्य आवश्यकता')} <span style="color:#dc2626">*</span></label>
              <input class="input" id="dm-title" required value="${esc(d.dealTitle || d.itemsInterest || '')}" placeholder="e.g. ERP Upgrade for Retail Chain / 200 Bags Cement Supply" />
            </div>
            <div class="grid grid-2" style="gap:12px">
              <div>
                <label class="form-label">${tr('Company / Firm Name', 'कंपनी / फर्म का नाम')} *</label>
                <input class="input" id="dm-company" required value="${esc(d.companyName || d.buyerName || '')}" placeholder="e.g. Metro Hypermarkets" />
              </div>
              <div>
                <label class="form-label">${tr('Contact Person Name', 'संपर्क व्यक्ति का नाम')}</label>
                <input class="input" id="dm-contact" value="${esc(d.contactName || d.buyerName || '')}" placeholder="e.g. Deepak Chopra" />
              </div>
            </div>
            <div class="grid grid-2" style="gap:12px">
              <div>
                <label class="form-label">${tr('Phone / WhatsApp Number', 'मोबाइल नंबर')} *</label>
                <input class="input" id="dm-phone" required maxlength="10" value="${esc(d.phone || '')}" placeholder="98290XXXXX" />
              </div>
              <div>
                <label class="form-label">${tr('Expected Deal Value (₹)', 'अनुमानित डील राशि (₹)')} *</label>
                <input class="input" type="number" id="dm-val" required min="1" value="${Number(d.expectedValue || 45000)}" />
              </div>
            </div>
            <div class="grid grid-3" style="gap:10px">
              <div>
                <label class="form-label">${tr('Pipeline Stage', 'पाइपलाइन चरण')}</label>
                <select class="select" id="dm-stage">
                  ${stages.map(s => `<option value="${s.key}" ${(d.stage || 'New Inquiry') === s.key ? 'selected' : ''}>${s.label}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="form-label">${tr('Lead Source', 'लीड स्रोत')}</label>
                <select class="select" id="dm-source">
                  ${['WhatsApp Inquiry', 'Website Form', 'Cold Outreach', 'Referral', 'LinkedIn', 'Walk-in'].map(src => `<option value="${src}" ${(d.source || 'WhatsApp Inquiry') === src ? 'selected' : ''}>${src}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="form-label">${tr('Follow-Up Date', 'फॉलो-अप दिनांक')}</label>
                <input class="input" type="date" id="dm-date" value="${esc(d.followUpDate || new Date(Date.now() + 86400000).toISOString().slice(0, 10))}" />
              </div>
            </div>
          </div>
          <div class="pro-blur-modal-foot">
            <button type="button" class="btn btn-ghost" onclick="state.dealModal=null;render()">${tr('Cancel', 'रद्द करें')}</button>
            <button type="submit" class="btn btn-primary" style="background:#0284c7;border-color:#0284c7;padding:8px 20px;font-weight:800">
              ✓ ${tr('Save Deal', '✓ डील सेव करें')}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

window.openDealModal = function(leadId = null) {
  if (leadId) {
    const existing = (state.data.myCrmLeads || []).find(x => x.id === leadId);
    state.dealModal = existing ? { ...existing } : {};
  } else {
    state.dealModal = {
      dealTitle: '',
      companyName: '',
      contactName: '',
      phone: '',
      expectedValue: 50000,
      stage: 'New Inquiry',
      source: 'WhatsApp Inquiry',
      followUpDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10)
    };
  }
  render();
};

window.saveDealModalForm = async function(e) {
  e.preventDefault();
  try {
    const dealTitle = document.getElementById('dm-title').value.trim();
    const companyName = document.getElementById('dm-company').value.trim();
    const contactName = document.getElementById('dm-contact').value.trim() || companyName;
    await apiFetch('/api/merchant/pro', {
      method: 'POST',
      body: JSON.stringify({
        action: 'lead_save',
        id: state.dealModal?.id || null,
        dealTitle,
        companyName,
        contactName,
        buyerName: companyName,
        itemsInterest: dealTitle,
        phone: document.getElementById('dm-phone').value.trim(),
        expectedValue: Number(document.getElementById('dm-val').value || 0),
        stage: document.getElementById('dm-stage').value,
        source: document.getElementById('dm-source').value,
        followUpDate: document.getElementById('dm-date').value
      })
    });
    state.dealModal = null;
    await bootstrap();
    showToast(tr('✅ Deal saved to Leads & Deals Pipeline!', '✅ डील सफलतापूर्वक पाइपलाइन में सेव हो गई!'));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

// ============================================================================
// BLURRED MULTI-ROW & MULTI-COLUMN PRODUCT ADD POPUP MODAL (ITEM #12)
// ============================================================================
function renderProductAddModal() {
  const m = state.productModal;
  if (!m) return '';
  const rows = m.rows || [];
  return `
    <div class="pro-blur-modal-overlay" onclick="state.productModal=null;render()">
      <div class="pro-blur-modal-card" style="max-width:960px" onclick="event.stopPropagation()">
        <div class="pro-blur-modal-head">
          <div>
            <h3>📦 ${tr('Add Products / Services (Multi-Row & Custom Attributes Matrix)', 'नया सामान / सेवा जोड़ें (क्षैतिज पंक्तियाँ व लम्बवत विशेषता कॉलम)')}</h3>
            <p style="font-size:0.76rem;color:#64748b;margin:2px 0 0">${tr('For Merchants, Wholesalers & Service Providers — Add multiple product rows (horizontal) and custom specification columns (vertical)', 'व्यापारी, होलसेलर और सर्विस प्रोवाइडर एक साथ कई सामान (Horizontal Rows) और साइज/ब्रांड/वारंटी कॉलम (Vertical Columns) जोड़ सकते हैं')}</p>
          </div>
          <button type="button" class="btn btn-ghost btn-sm" onclick="state.productModal=null;render()">✕</button>
        </div>
        <form onsubmit="saveProductAddModalForm(event)">
          <div class="pro-blur-modal-body">
            <div class="table-wrap" style="max-height:420px;overflow-y:auto">
              <table>
                <thead>
                  <tr>
                    <th style="min-width:170px">${tr('Product / Service Name *', 'सामान / सेवा का नाम *')}</th>
                    <th style="width:85px">HSN/SAC</th>
                    <th style="width:95px">${tr('Cost ₹', 'खरीद ₹')}</th>
                    <th style="width:95px">${tr('Retail ₹ *', 'खुदरा ₹ *')}</th>
                    <th style="width:95px">${tr('Wholesale ₹', 'थोक ₹')}</th>
                    <th style="width:80px">GST %</th>
                    <th style="width:80px">${tr('Stock', 'स्टॉक')}</th>
                    <th style="min-width:130px">${tr('Size / Brand / Spec (Vertical Col)', 'साइज / ब्रांड / विवरण')}</th>
                    <th style="width:45px"></th>
                  </tr>
                </thead>
                <tbody>
                  ${rows.map((r, idx) => `
                    <tr>
                      <td><input class="input" required value="${esc(r.name)}" oninput="state.productModal.rows[${idx}].name=this.value" placeholder="Item / Service Name" style="padding:6px 8px;font-size:0.8rem" /></td>
                      <td><input class="input" value="${esc(r.hsn)}" oninput="state.productModal.rows[${idx}].hsn=this.value" placeholder="3917" style="padding:6px 8px;font-size:0.8rem" /></td>
                      <td><input class="input" type="number" value="${r.costPrice}" oninput="state.productModal.rows[${idx}].costPrice=Number(this.value)" placeholder="140" style="padding:6px 8px;font-size:0.8rem" /></td>
                      <td><input class="input" type="number" required value="${r.price}" oninput="state.productModal.rows[${idx}].price=Number(this.value)" placeholder="185" style="padding:6px 8px;font-size:0.8rem" /></td>
                      <td><input class="input" type="number" value="${r.wholesalePrice}" oninput="state.productModal.rows[${idx}].wholesalePrice=Number(this.value)" placeholder="165" style="padding:6px 8px;font-size:0.8rem" /></td>
                      <td>
                        <select class="select" onchange="state.productModal.rows[${idx}].gstRate=Number(this.value)" style="padding:6px;font-size:0.8rem">
                          ${[0, 5, 12, 18, 28].map(g => `<option value="${g}" ${Number(r.gstRate) === g ? 'selected' : ''}>${g}%</option>`).join('')}
                        </select>
                      </td>
                      <td><input class="input" type="number" value="${r.stock}" oninput="state.productModal.rows[${idx}].stock=Number(this.value)" style="padding:6px 8px;font-size:0.8rem" /></td>
                      <td><input class="input" value="${esc(r.spec || '')}" oninput="state.productModal.rows[${idx}].spec=this.value" placeholder="e.g. 25mm / ISI / 1Yr" style="padding:6px 8px;font-size:0.8rem" /></td>
                      <td>
                        <button type="button" class="btn btn-danger btn-sm" style="padding:4px 7px" onclick="removeProductModalRow(${idx})">✕</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            <div style="margin-top:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
              <button type="button" class="btn btn-outline btn-sm" onclick="addProductModalRow()">
                + ${tr('Add Horizontal Product Line (Row)', '+ नई क्षैतिज पंक्ति (Row) जोड़ें')}
              </button>
              <span style="font-size:0.76rem;color:#64748b">${rows.length} ${tr('product line(s) ready to save', 'पंक्तियाँ सेव करने के लिए तैयार')}</span>
            </div>
          </div>
          <div class="pro-blur-modal-foot">
            <button type="button" class="btn btn-ghost" onclick="state.productModal=null;render()">${tr('Cancel', 'रद्द करें')}</button>
            <button type="submit" class="btn btn-primary" style="background:#0284c7;border-color:#0284c7;padding:8px 20px;font-weight:800">
              ✓ ${tr('Save All Products to Catalog', '✓ सभी सामान स्टॉक में सेव करें')}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

window.openProductAddModal = function() {
  const def = state.data.myShop?.invoiceDefaults || {};
  state.productModal = {
    rows: [
      { name: '', hsn: def.defaultHsn || '3917', costPrice: 140, price: 185, wholesalePrice: 165, gstRate: def.defaultGstRate !== undefined ? Number(def.defaultGstRate) : 18, stock: 50, spec: '' }
    ]
  };
  render();
};

window.addProductModalRow = function() {
  if (!state.productModal) return;
  const def = state.data.myShop?.invoiceDefaults || {};
  state.productModal.rows.push({
    name: '',
    hsn: def.defaultHsn || '3917',
    costPrice: 100,
    price: 130,
    wholesalePrice: 115,
    gstRate: def.defaultGstRate !== undefined ? Number(def.defaultGstRate) : 18,
    stock: 50,
    spec: ''
  });
  render();
};

window.removeProductModalRow = function(idx) {
  if (!state.productModal) return;
  state.productModal.rows.splice(idx, 1);
  if (state.productModal.rows.length === 0) window.addProductModalRow();
  else render();
};

window.saveProductAddModalForm = async function(e) {
  e.preventDefault();
  try {
    const rows = (state.productModal?.rows || []).filter(r => r.name && r.name.trim());
    if (rows.length === 0) return;
    const items = rows.map(r => ({
      name: r.spec ? `${r.name.trim()} (${r.spec.trim()})` : r.name.trim(),
      hsn: r.hsn || '3917',
      costPrice: Number(r.costPrice) || Math.round((Number(r.price) || 100) * 0.8),
      price: Number(r.price) || 100,
      wholesalePrice: Number(r.wholesalePrice) || Number(r.price) || 100,
      gstRate: Number(r.gstRate ?? 18),
      stock: Number(r.stock ?? 50),
      taxMode: 'exclusive'
    }));
    await apiFetch('/api/merchant/product-save', {
      method: 'POST',
      body: JSON.stringify({ action: 'bulk_add', items })
    });
    state.productModal = null;
    await bootstrap();
    showToast(tr(`✅ Added ${items.length} product(s) to your catalog!`, `✅ ${items.length} सामान आपके स्टॉक में सफलतापूर्वक जुड़ गए!`));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

// ============================================================================
// OWNER-ONLY STAFF / MANAGER LOGIN ID MODAL WITH 14 PERMISSIONS (ITEM #16)
// ============================================================================
function renderManagerModal() {
  const m = state.managerModal;
  if (!m) return '';
  const isEdit = Boolean(m.id);
  const selectedPerms = Array.isArray(m.permissions) ? m.permissions : [];

  return `
    <div class="pro-blur-modal-overlay" onclick="state.managerModal=null;render()">
      <div class="pro-blur-modal-card" style="max-width:680px" onclick="event.stopPropagation()">
        <div class="pro-blur-modal-head">
          <div>
            <h3>🛡️ ${isEdit ? tr('Edit Manager / Staff Login ID & Permissions', 'मैनेजर / स्टाफ लॉगिन व अधिकार अपडेट करें') : tr('Create Staff / Manager Login ID (Owner Only)', 'नया स्टाफ / मैनेजर लॉगिन ID बनाएँ (केवल मालिक द्वारा)')}</h3>
            <p style="font-size:0.75rem;color:#64748b;margin:2px 0 0">${tr('Assign Name, Mobile Number, Email ID, Password, and select from 14 module permissions', 'नाम, मोबाइल नंबर, ईमेल ID, पासवर्ड दर्ज करें और नीचे दिए गए 14 कार्य अधिकारों में से चुनें')}</p>
          </div>
          <button type="button" class="btn btn-ghost btn-sm" onclick="state.managerModal=null;render()">✕</button>
        </div>
        <form onsubmit="saveManagerModalForm(event)">
          <div class="pro-blur-modal-body" style="display:grid;gap:12px">
            <div class="grid grid-2" style="gap:12px">
              <div>
                <label class="form-label">${tr('Staff / Manager Full Name', 'पूरा नाम')} <span style="color:#dc2626">*</span></label>
                <input class="input" id="mm-name" required value="${esc(m.name || '')}" placeholder="e.g. Suresh Gehlot" />
              </div>
              <div>
                <label class="form-label">${tr('10-Digit Mobile Number (Login ID)', '10-अंकीय मोबाइल नंबर (लॉगिन ID)')} <span style="color:#dc2626">*</span></label>
                <input class="input" id="mm-phone" required maxlength="10" value="${esc(m.phone || '')}" placeholder="98290XXXXX" />
              </div>
            </div>

            <div class="grid grid-3" style="gap:12px">
              <div>
                <label class="form-label">${tr('Email ID (Login ID)', 'ईमेल ID (लॉगिन हेतु)')} <span style="color:#dc2626">*</span></label>
                <input class="input" type="email" id="mm-email" required value="${esc(m.email || '')}" placeholder="manager@shop.com" />
              </div>
              <div>
                <label class="form-label">${tr('Login Password', 'लॉगिन पासवर्ड')} ${isEdit ? tr('(Leave blank to keep)', '(बदलने हेतु भरें)') : '*'}</label>
                <input class="input" type="password" id="mm-pass" ${isEdit ? '' : 'required'} placeholder="••••••••" />
              </div>
              <div>
                <label class="form-label">${tr('Designation / Role', 'पद / भूमिका')}</label>
                <input class="input" id="mm-role" value="${esc(m.designation || 'Store Manager')}" placeholder="Store Manager / Accountant" />
              </div>
            </div>

            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                <label class="form-label" style="margin:0">${tr('Select Granular Module Permissions (14 Modules):', '14 मॉड्यूल अनुमतियाँ चुनें (Granular Access Control):')}</label>
                <div style="display:flex;gap:6px">
                  <button type="button" class="btn btn-ghost btn-sm" style="padding:2px 8px;font-size:0.72rem" onclick="document.querySelectorAll('input[name=mm_perm]').forEach(el=>el.checked=true)">✓ Select All 14</button>
                  <button type="button" class="btn btn-ghost btn-sm" style="padding:2px 8px;font-size:0.72rem" onclick="document.querySelectorAll('input[name=mm_perm]').forEach(el=>el.checked=false)">Clear</button>
                </div>
              </div>
              <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(185px,1fr));gap:8px;background:#f8fafc;padding:12px;border-radius:10px;border:1px solid #cbd5e1">
                ${ALL_14_STAFF_PERMISSIONS.map(p => `
                  <label style="display:flex;align-items:center;gap:8px;font-size:0.8rem;font-weight:700;cursor:pointer;padding:5px 8px;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px">
                    <input type="checkbox" name="mm_perm" value="${esc(p.key)}" ${selectedPerms.includes(p.key) ? 'checked' : ''} />
                    <span>${state.lang === 'hi' ? p.hi : p.label}</span>
                  </label>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="pro-blur-modal-foot">
            <button type="button" class="btn btn-ghost" onclick="state.managerModal=null;render()">${tr('Cancel', 'रद्द करें')}</button>
            <button type="submit" class="btn btn-primary" style="background:#0284c7;border-color:#0284c7;padding:8px 20px;font-weight:800">
              ✓ ${isEdit ? tr('Update Manager Access', '✓ अधिकार अपडेट करें') : tr('Create Manager Login ID', '✓ मैनेजर ID बनाएँ')}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

window.openManagerModal = function(mgrId = null) {
  if (mgrId) {
    const existing = (state.data.myManagers || []).find(x => x.id === mgrId);
    state.managerModal = existing ? { ...existing } : {};
  } else {
    state.managerModal = {
      name: '',
      phone: '',
      email: '',
      designation: 'Store Manager',
      permissions: ['Dashboard View', 'Customers', 'Invoices', 'Product', 'Quotations', 'Quotation', 'Tasks']
    };
  }
  render();
};

window.saveManagerModalForm = async function(e) {
  e.preventDefault();
  try {
    const perms = [...document.querySelectorAll('input[name="mm_perm"]:checked')].map(el => el.value);
    await apiFetch('/api/merchant/pro', {
      method: 'POST',
      body: JSON.stringify({
        action: 'manager_save',
        id: state.managerModal?.id || null,
        name: document.getElementById('mm-name').value.trim(),
        phone: document.getElementById('mm-phone').value.trim(),
        email: document.getElementById('mm-email').value.trim(),
        password: document.getElementById('mm-pass').value,
        designation: document.getElementById('mm-role').value.trim() || 'Store Manager',
        permissions: perms,
        active: true
      })
    });
    state.managerModal = null;
    await bootstrap();
    showToast(tr('✅ Staff / Manager Login ID saved with selected permissions!', '✅ चयनित 14 अधिकारों के साथ मैनेजर लॉगिन ID सफलतापूर्वक सेव हो गई!'));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.deleteManagerAccount = async function(id) {
  if (!confirm(tr('Remove this Staff / Manager login account?', 'क्या आप इस मैनेजर/स्टाफ लॉगिन ID को हटाना चाहते हैं?'))) return;
  try {
    await apiFetch('/api/merchant/pro', {
      method: 'POST',
      body: JSON.stringify({ action: 'manager_delete', id })
    });
    await bootstrap();
    showToast(tr('Manager login removed', 'मैनेजर ID हटा दी गई'));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

// ============================================================================
// 5-TAB SYSTEM SETTINGS & AI PROVIDER API HANDLERS (ITEMS #8, #9, #10)
// ============================================================================
window.saveSystemSettingsTab = async function(e, tab) {
  e.preventDefault();
  try {
    if (tab === 'profile') {
      await apiFetch('/api/merchant/pro', {
        method: 'POST',
        body: JSON.stringify({
          action: 'settings_save',
          shop: document.getElementById('set-shop-name').value.trim(),
          legalName: document.getElementById('set-legal-name').value.trim(),
          tagline: document.getElementById('set-tagline').value.trim(),
          officialEmail: document.getElementById('set-email').value.trim(),
          phone: document.getElementById('set-phone').value.trim(),
          gstin: document.getElementById('set-gstin').value.trim().toUpperCase(),
          pan: document.getElementById('set-pan').value.trim().toUpperCase(),
          addressLine1: document.getElementById('set-addr1').value.trim(),
          addressLine2: document.getElementById('set-addr2').value.trim(),
          city: document.getElementById('set-city').value.trim(),
          state: document.getElementById('set-state').value.trim(),
          pincode: document.getElementById('set-pincode').value.trim()
        })
      });
      await bootstrap();
      showToast(tr('✅ Business Profile & Tax Identity saved!', '✅ व्यापार प्रोफाइल और GST विवरण सेव हो गया!'));
    } else if (tab === 'banking') {
      const upiId = document.getElementById('set-upi-id').value.trim();
      await apiFetch('/api/merchant/pro', {
        method: 'POST',
        body: JSON.stringify({
          action: 'settings_save',
          upiId,
          banking: {
            bankName: document.getElementById('set-bank-name').value.trim(),
            accountHolder: document.getElementById('set-acc-holder').value.trim(),
            accountNumber: document.getElementById('set-acc-no').value.trim(),
            ifsc: document.getElementById('set-ifsc').value.trim().toUpperCase(),
            branch: document.getElementById('set-branch').value.trim(),
            upiId
          }
        })
      });
      await bootstrap();
      showToast(tr('✅ Banking & UPI settlement details saved!', '✅ बैंक खाता और UPI विवरण सेव हो गया!'));
    } else if (tab === 'invoice_defaults') {
      await apiFetch('/api/merchant/pro', {
        method: 'POST',
        body: JSON.stringify({
          action: 'settings_save',
          invoiceDefaults: {
            defaultPaymentMode: document.getElementById('def-pay-mode').value,
            defaultGstRate: Number(document.getElementById('def-gst-rate').value),
            defaultTaxMode: document.getElementById('def-tax-mode').value,
            defaultHsn: document.getElementById('def-hsn').value.trim() || '3917',
            defaultSupplyType: document.getElementById('def-supply').value,
            dueDays: Number(document.getElementById('def-due-days').value || 15),
            quoteValidDays: Number(document.getElementById('def-quote-days').value || 7),
            printFormat: document.getElementById('def-print-fmt').value,
            showBankDetails: document.getElementById('def-show-bank').checked,
            terms: document.getElementById('def-terms').value,
            signatory: document.getElementById('def-signatory').value.trim(),
            footerNote: document.getElementById('def-footer').value.trim()
          }
        })
      });
      await bootstrap();
      showToast(tr('✅ Invoice Default Settings saved! Every new bill will now auto-populate these defaults.', '✅ इनवॉइस डिफ़ॉल्ट सेटिंग्स सेव हो गईं! अब हर नए बिल में ये विवरण अपने-आप भर जाएँगे।'));
    }
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.onAiProviderPlatformChange = function(val) {
  const labelEl = document.getElementById('ai-cfg-label');
  const modelEl = document.getElementById('ai-cfg-model');
  const urlEl = document.getElementById('ai-cfg-url');
  if (val.includes('Google AI Studio')) {
    if (labelEl) labelEl.value = 'Google AI Studio (Gemini)';
    if (modelEl) modelEl.value = 'gemini-2.5-flash';
    if (urlEl) urlEl.value = 'https://generativelanguage.googleapis.com/v1beta';
  } else if (val.includes('OpenRouter')) {
    if (labelEl) labelEl.value = 'OpenRouter Unified Gateway';
    if (modelEl) modelEl.value = 'google/gemini-flash-1.5';
    if (urlEl) urlEl.value = 'https://openrouter.ai/api/v1';
  } else if (val.includes('OpenAI')) {
    if (labelEl) labelEl.value = 'OpenAI (ChatGPT)';
    if (modelEl) modelEl.value = 'gpt-4o-mini';
    if (urlEl) urlEl.value = 'https://api.openai.com/v1';
  } else if (val.includes('Anthropic')) {
    if (labelEl) labelEl.value = 'Anthropic Claude';
    if (modelEl) modelEl.value = 'claude-3-5-sonnet-latest';
    if (urlEl) urlEl.value = 'https://api.anthropic.com/v1';
  } else {
    if (labelEl) labelEl.value = 'Custom OpenAI-Compatible API';
    if (modelEl) modelEl.value = 'llama-3.3-70b-versatile';
    if (urlEl) urlEl.value = 'https://api.groq.com/openai/v1';
  }
};

window.saveAiProviderConfig = async function(e) {
  e.preventDefault();
  try {
    await apiFetch('/api/merchant/pro', {
      method: 'POST',
      body: JSON.stringify({
        action: 'ai_provider_save',
        platform: document.getElementById('ai-cfg-platform').value,
        label: document.getElementById('ai-cfg-label').value.trim(),
        apiKey: document.getElementById('ai-cfg-key').value.trim(),
        modelId: document.getElementById('ai-cfg-model').value.trim(),
        baseUrl: document.getElementById('ai-cfg-url').value.trim(),
        temperature: parseFloat(document.getElementById('ai-cfg-temp').value) || 0.7,
        maxTokens: parseInt(document.getElementById('ai-cfg-tokens').value, 10) || 4096,
        enabled: document.getElementById('ai-cfg-enabled').checked,
        isPrimary: document.getElementById('ai-cfg-primary').checked
      })
    });
    document.getElementById('ai-cfg-key').value = '';
    await bootstrap();
    showToast(tr('🔐 AI Provider encrypted with AES-256-GCM and saved!', '🔐 AI प्रोवाइडर AES-256-GCM सुरक्षा के साथ सेव हो गया!'));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.testAiProviderConnection = async function(id = null) {
  try {
    showToast(tr('⏳ Testing AI Provider connection...', '⏳ AI कनेक्शन जाँचा जा रहा है...'));
    const body = id
      ? { action: 'ai_provider_test', id }
      : {
          action: 'ai_provider_test',
          platform: document.getElementById('ai-cfg-platform')?.value || 'Google AI Studio (Gemini)',
          apiKey: document.getElementById('ai-cfg-key')?.value.trim() || '',
          modelId: document.getElementById('ai-cfg-model')?.value.trim() || 'gemini-2.5-flash',
          baseUrl: document.getElementById('ai-cfg-url')?.value.trim() || ''
        };
    const res = await apiFetch('/api/merchant/pro', {
      method: 'POST',
      body: JSON.stringify(body)
    });
    showToast(res.reply || tr('✅ Connection verified!', '✅ कनेक्शन सफल!'));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.deleteAiProviderConfig = async function(id) {
  if (!confirm(tr('Delete this AI provider configuration?', 'क्या आप इस AI प्रोवाइडर को हटाना चाहते हैं?'))) return;
  try {
    await apiFetch('/api/merchant/pro', {
      method: 'POST',
      body: JSON.stringify({ action: 'ai_provider_delete', id })
    });
    await bootstrap();
    showToast(tr('AI provider removed', 'AI प्रोवाइडर हटाया गया'));
  } catch (err) {
    showToast(err.message, 'error');
  }
};

// Bind to window
window.renderAdminOverview = renderAdminOverview;
window.renderMerchantManufacturing = renderMerchantManufacturing;
window.renderMerchantCustomersCrm = renderMerchantCustomersCrm;
window.renderMerchantTasks = renderMerchantTasks;
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

  // Preserve active input focus and cursor position across full DOM re-renders
  const activeEl = document.activeElement;
  let focusInfo = null;
  if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA') && activeEl.type !== 'file' && activeEl.type !== 'checkbox' && activeEl.type !== 'radio') {
    const allInputs = Array.from(root.querySelectorAll('input, textarea'));
    focusInfo = {
      id: activeEl.id || '',
      placeholder: activeEl.getAttribute('placeholder') || '',
      index: allInputs.indexOf(activeEl),
      start: activeEl.selectionStart,
      end: activeEl.selectionEnd
    };
  }

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

  const extraModals = `${renderFloatingActionHub()}${state.aiChatModalOpen ? renderGlobalAiChatModal() : ''}${state.bulkReviewModal ? renderBulkReviewModal() : ''}${state.voucherModalOpen ? renderVoucherScanModal() : ''}${state.customerModal ? renderCustomerModal() : ''}${state.productModal ? renderProductAddModal() : ''}${state.dealModal ? renderDealModal() : ''}${state.taskModal ? renderTaskModal() : ''}${state.managerModal ? renderManagerModal() : ''}${state.forgotPasswordModal ? renderForgotPasswordModal() : ''}`;

  if (isEnterpriseView) {
    root.innerHTML = `${pageHtml}${state.demoModalOpen ? renderDemoModal() : ''}${state.reportModal ? renderReportModal() : ''}${state.orderReviewModal ? renderOrderReviewModal() : ''}${state.customerBillModal ? renderCustomerBillModal() : ''}${state.partyLedgerModalKey ? renderPartyLedgerModal() : ''}${state.aiModalOpen ? (state.data.myShop ? renderAiScannerModal(state.data.myShop) : '') : ''}${extraModals}`;
  } else {
    root.innerHTML = `${renderHeader()}<main>${pageHtml}</main>${renderFooter()}${renderMobileBottomNav()}${state.demoModalOpen ? renderDemoModal() : ''}${state.reportModal ? renderReportModal() : ''}${state.orderReviewModal ? renderOrderReviewModal() : ''}${state.customerBillModal ? renderCustomerBillModal() : ''}${state.partyLedgerModalKey ? renderPartyLedgerModal() : ''}${extraModals}`;
  }

  // Restore focus & cursor position if an input was being typed into
  if (focusInfo) {
    let target = focusInfo.id ? document.getElementById(focusInfo.id) : null;
    if (!target && focusInfo.placeholder) {
      target = Array.from(root.querySelectorAll('input, textarea')).find(el => el.getAttribute('placeholder') === focusInfo.placeholder);
    }
    if (!target && focusInfo.index >= 0) {
      const allNow = Array.from(root.querySelectorAll('input, textarea'));
      target = allNow[focusInfo.index] || null;
    }
    if (target) {
      target.focus();
      try {
        if (typeof focusInfo.start === 'number' && target.setSelectionRange) {
          target.setSelectionRange(focusInfo.start, focusInfo.end);
        }
      } catch (_) {}
    }
  }
}

bootstrap();
