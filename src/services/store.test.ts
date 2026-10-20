import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import { store, purgeLegacyLoyaltyData } from './store';
import { 
  formatINR, 
  generateProductWhatsAppUrl, 
  generateBulkEnquiryWhatsAppUrl, 
  cleanPhoneForWhatsApp 
} from '../utils/whatsapp';
import { Product } from '../types';

// Mock localStorage for node test runner
const memoryStore: Record<string, string> = {};
const localStorageMock = {
  getItem: (key: string) => memoryStore[key] || null,
  setItem: (key: string, value: string) => { memoryStore[key] = value; },
  removeItem: (key: string) => { delete memoryStore[key]; },
  clear: () => { Object.keys(memoryStore).forEach(k => delete memoryStore[k]); }
};

beforeAll(() => {
  if (typeof globalThis.localStorage === 'undefined') {
    (globalThis as any).localStorage = localStorageMock;
  }
});

describe('Sukhadiya Manilal Nathalal Platform Test Suite', () => {
  beforeEach(() => {
    store.resetToFactoryDemo();
  });

  describe('1. Legacy Loyalty Removal & Data Safety', () => {
    it('purges legacy loyalty and stamp keys safely from storage', () => {
      localStorage.setItem('smn_loyalty_cards', 'old_card_data');
      localStorage.setItem('smn_stamps', '5');
      localStorage.setItem('smn_rewards', 'unclaimed_coupon');

      purgeLegacyLoyaltyData();

      expect(localStorage.getItem('smn_loyalty_cards')).toBeNull();
      expect(localStorage.getItem('smn_stamps')).toBeNull();
      expect(localStorage.getItem('smn_rewards')).toBeNull();
      expect(localStorage.getItem('smn_legacy_loyalty_purged')).toBe('true');
    });

    it('verifies store analytics contains zero loyalty or stamp metrics', () => {
      const analytics: any = store.getAnalytics();
      expect(analytics.stampsIssued).toBeUndefined();
      expect(analytics.loyaltyMembers).toBeUndefined();
      expect(analytics.cardsCompleted).toBeUndefined();
      expect(analytics.rewardsRedeemed).toBeUndefined();
      expect(analytics.totalProducts).toBeGreaterThan(0);
      expect(analytics.totalEnquiries).toBeGreaterThanOrEqual(0);
    });
  });

  describe('2. Pricing & Unknown Price Handling', () => {
    it('formats verified prices with Indian Rupee currency symbol', () => {
      expect(formatINR(1100)).toMatch(/₹\s?1,100/);
      expect(formatINR(780)).toMatch(/₹\s?780/);
    });

    it('handles unverified or null prices as "Price on Enquiry" instead of displaying zero', () => {
      expect(formatINR(null)).toBe('Price on Enquiry');
      expect(formatINR(undefined)).toBe('Price on Enquiry');
      expect(formatINR(0)).toMatch(/₹\s?0/);
    });

    it('confirms products configured with null price have priceVerified set to false', () => {
      const products = store.getProducts();
      const enquiryOnlyProd = products.find(p => p.priceAmount === null);
      expect(enquiryOnlyProd).toBeDefined();
      expect(enquiryOnlyProd?.priceVerified).toBe(false);
    });
  });

  describe('3. WhatsApp Enquiry URL Generators', () => {
    it('cleans phone numbers to standard international format', () => {
      expect(cleanPhoneForWhatsApp('+91 98250 12345')).toBe('919825012345');
      expect(cleanPhoneForWhatsApp('9825012345')).toBe('919825012345');
    });

    it('generates properly encoded WhatsApp click-to-chat links with product and package details', () => {
      const sampleProduct: Product = {
        id: 'test-1',
        name: 'Special Kaju Katli',
        categoryId: 'cat-barfi',
        categoryName: 'Barfi & Katli',
        description: 'Test description',
        imageUrl: 'https://example.com/image.jpg',
        availability: 'in_stock',
        priceAmount: 1100,
        currency: 'INR',
        priceUnit: 'per kg',
        priceVerified: true,
        packageSizes: [{ label: '500g Box', available: true }],
        displayOrder: 1
      };

      const url = generateProductWhatsAppUrl(sampleProduct, '500g Box', '+91 98250 12345');
      expect(url).toContain('https://wa.me/919825012345');
      expect(url).toContain(encodeURIComponent('Special Kaju Katli'));
      expect(url).toContain(encodeURIComponent('500g Box'));
    });
  });

  describe('4. Bulk Enquiry Management & Status Lifecycle', () => {
    it('generates an enquiry reference code with SMN-BULK- prefix', () => {
      const enquiry = store.createEnquiry({
        customerName: 'Hasmukhbhai Parekh',
        contactNumber: '+91 98980 55443',
        occasion: 'Wedding',
        requestedDate: '2026-12-10',
        requestedProducts: 'Special Kaju Katli (25 kg), Shahi Motichoor Laddoo (20 kg)',
        approximateQuantity: '45 kg in 500g boxes',
        collectionOrDelivery: 'delivery',
        deliveryAddress: 'Sindhu Bhavan Road, Ahmedabad',
        notes: 'Wedding invitation favors'
      });

      expect(enquiry.enquiryReference).toMatch(/^SMN-BULK-\d{4}$/);
      expect(enquiry.status).toBe('New');

      // Check retrievable by reference
      const retrieved = store.getEnquiryByRef(enquiry.enquiryReference);
      expect(retrieved).toBeDefined();
      expect(retrieved?.customerName).toBe('Hasmukhbhai Parekh');
    });

    it('updates enquiry status and internal notes cleanly across the pipeline', () => {
      const enquiry = store.createEnquiry({
        customerName: 'Test Customer',
        contactNumber: '+91 98000 00000',
        occasion: 'Festival',
        requestedDate: '2026-11-01',
        requestedProducts: 'Mohanthal',
        approximateQuantity: '10 kg',
        collectionOrDelivery: 'pickup'
      });

      const updated = store.updateEnquiryStatus(
        enquiry.id,
        'Quotation Shared',
        'Quoted ₹750/kg including festival boxes.'
      );

      expect(updated?.status).toBe('Quotation Shared');
      expect(updated?.internalNotes).toBe('Quoted ₹750/kg including festival boxes.');

      const inStore = store.getEnquiryByRef(enquiry.enquiryReference);
      expect(inStore?.status).toBe('Quotation Shared');
    });
  });

  describe('5. Customer Contacts Directory', () => {
    it('aggregates unique customer contacts from historical enquiries', () => {
      store.createEnquiry({
        customerName: 'Hasmukhbhai Parekh',
        contactNumber: '+91 98980 55443',
        occasion: 'Wedding',
        requestedDate: '2026-12-10',
        requestedProducts: 'Special Kaju Katli (25 kg)',
        approximateQuantity: '25 kg',
        collectionOrDelivery: 'delivery'
      });
      const contacts = store.getCustomerContacts();
      expect(contacts.length).toBeGreaterThan(0);
      contacts.forEach(c => {
        expect(c.name).toBeTruthy();
        expect(c.phone).toBeTruthy();
        expect(c.totalEnquiries).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe('6. Compulsory Google ID Authentication Service', () => {
    it('signs in with Google ID directly without requiring account creation or password', async () => {
      const { authService } = await import('./auth');
      authService.logout();
      expect(authService.getCurrentUser()).toBeNull();

      const user = authService.loginWithGoogle('yug.sukhadia@gmail.com', 'Yug Sukhadia');
      expect(user).toBeDefined();
      expect(user.name).toBe('Yug Sukhadia');
      expect(user.email).toBe('yug.sukhadia@gmail.com');
      expect(user.authProvider).toBe('google');
      expect(authService.getCurrentUser()?.email).toBe('yug.sukhadia@gmail.com');

      authService.logout();
      expect(authService.getCurrentUser()).toBeNull();
    });

    it('verifies preset Google ID accounts exist for one-click entry', async () => {
      const { PRESET_GOOGLE_ACCOUNTS, authService } = await import('./auth');
      expect(PRESET_GOOGLE_ACCOUNTS.length).toBeGreaterThanOrEqual(3);
      
      const yugAcc = PRESET_GOOGLE_ACCOUNTS.find(a => a.email === 'yug.sukhadia@gmail.com');
      expect(yugAcc).toBeDefined();
      expect(yugAcc?.name).toBe('Yug Sukhadia');

      // Test one-click login with preset
      const loggedUser = authService.loginWithGoogle(yugAcc!.email, yugAcc!.name, yugAcc!.avatarUrl);
      expect(loggedUser.email).toBe('yug.sukhadia@gmail.com');
      expect(authService.getCurrentUser()?.email).toBe('yug.sukhadia@gmail.com');
    });

    it('handles custom Google emails with automatic name derivation and no registration required', async () => {
      const { authService } = await import('./auth');
      authService.logout();

      const user = authService.loginWithGoogle('priya.mehta@gmail.com');
      expect(user.email).toBe('priya.mehta@gmail.com');
      expect(user.name).toBe('Priya Mehta');
      expect(user.authProvider).toBe('google');
      expect(authService.getCurrentUser()?.email).toBe('priya.mehta@gmail.com');
    });

    it('decodes Google GIS JWT credentials correctly', async () => {
      const { decodeGoogleJwt } = await import('./auth');
      
      // Construct a mock JWT: header.payload.signature
      const mockPayload = {
        sub: '10987654321',
        email: 'ysukhadia49@gmail.com',
        name: 'Yug Sukhadia',
        picture: 'https://lh3.googleusercontent.com/a/mockphoto',
        email_verified: true
      };
      const b64Payload = btoa(JSON.stringify(mockPayload));
      const mockJwt = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.${b64Payload}.mockSignature`;

      const decoded = decodeGoogleJwt(mockJwt);
      expect(decoded).not.toBeNull();
      expect(decoded?.email).toBe('ysukhadia49@gmail.com');
      expect(decoded?.name).toBe('Yug Sukhadia');
      expect(decoded?.sub).toBe('10987654321');
    });
  });

  describe('7. Authentic Sukhadiya Rate Card Catalog Verification', () => {
    it('contains all 79+ sweets and items from the official rate card with English, Gujarati, and photos', () => {
      const products = store.getProducts();
      expect(products.length).toBeGreaterThanOrEqual(79);

      // Verify every product has name, Gujarati script name, and an image URL
      products.forEach(p => {
        expect(p.name).toBeTruthy();
        expect(p.nameGu).toBeTruthy();
        expect(p.imageUrl).toMatch(/^(\/images\/|https?:\/\/)/);
        expect(p.categoryId).toBeTruthy();
        expect(p.categoryName).toBeTruthy();
      });
    });

    it('verifies exact rate-card prices for key Gujarati sweets', () => {
      const products = store.getProducts();

      // Badam Katri (1160/-)
      const badamKatli = products.find(p => p.nameGu === 'બદામ કતરી');
      expect(badamKatli?.priceAmount).toBe(1160);

      // Kesar Mohanthal (700/-)
      const mohanthal = products.find(p => p.nameGu === 'કેસર મોહનથાળ');
      expect(mohanthal?.priceAmount).toBe(700);

      // Safed Katri (960/-)
      const kajuKatli = products.find(p => p.nameGu === 'સફેદ કતરી');
      expect(kajuKatli?.priceAmount).toBe(960);

      // Motichoor Laddu (580/-)
      const motichoor = products.find(p => p.nameGu === 'મોતીચુર લાડું');
      expect(motichoor?.priceAmount).toBe(580);

      // Rasgulla (130/-)
      const rasgulla = products.find(p => p.nameGu === 'રસગુલ્લા');
      expect(rasgulla?.priceAmount).toBe(130);

      // Ras Malai 100g (32/- per piece)
      const rasMalai = products.find(p => p.nameGu === 'રસ મલાઈ ૧૦૦ ગ્રામ');
      expect(rasMalai?.priceAmount).toBe(32);
      expect(rasMalai?.priceUnit).toBe('per piece');

      // Price on enquiry items (Kesar Ghari, Ghebar)
      const kesarGhari = products.find(p => p.nameGu === 'કેસર ઘારી');
      expect(kesarGhari?.priceAmount).toBeNull();
      expect(kesarGhari?.priceVerified).toBe(false);

      const motaGhebar = products.find(p => p.nameGu === 'મોટા ઘેબર');
      expect(motaGhebar?.priceAmount).toBeNull();
      expect(motaGhebar?.priceVerified).toBe(false);
    });

    it('verifies all rate card sections have active categories with Gujarati titles', () => {
      const categories = store.getCategories();
      const guTitles = categories.map(c => c.nameGu);

      expect(guTitles).toContain('બદામની મીઠાઈ');
      expect(guTitles).toContain('બાઈટ');
      expect(guTitles).toContain('પેંડા');
      expect(guTitles).toContain('લાડું');
      expect(guTitles).toContain('બરફી');
      expect(guTitles).toContain('હલવો');
      expect(guTitles).toContain('ક્રંચ');
      expect(guTitles).toContain('કાજુ મીઠાઈ');
      expect(guTitles).toContain('ડીલાઈટ');
    });
  });
});


