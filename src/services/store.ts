import {
  Product,
  Category,
  BulkEnquiry,
  ShopSettings,
  AnalyticsSummary,
  CustomerContact
} from '../types';
import {
  MENU_CATEGORIES,
  RATE_CARD_PRODUCTS,
  OFFICIAL_SHOP_SETTINGS
} from '../data/menuData';

const STORAGE_KEYS = {
  PRODUCTS: 'smn_products_v7',
  CATEGORIES: 'smn_categories_v7',
  ENQUIRIES: 'smn_bulk_enquiries_v6',
  SETTINGS: 'smn_shop_settings_v7',
  LEGACY_CLEANUP_DONE: 'smn_legacy_loyalty_purged'
};

// Safe purge of old loyalty data and demo enquiries if present in local browser storage
export function purgeLegacyLoyaltyData(): void {
  try {
    if (typeof localStorage === 'undefined') return;
    const keysToPurge = [
      'smn_loyalty_cards',
      'smn_stamps',
      'smn_rewards',
      'smn_customer_qr',
      'smn_loyalty_campaigns',
      'smn_loyalty_transactions',
      'smn_bulk_enquiries_v5'
    ];
    keysToPurge.forEach(k => localStorage.removeItem(k));
    localStorage.setItem(STORAGE_KEYS.LEGACY_CLEANUP_DONE, 'true');
  } catch {
    // Fail silently in restricted sandbox
  }
}

export const INITIAL_CATEGORIES: Category[] = MENU_CATEGORIES;

export const INITIAL_PRODUCTS: Product[] = RATE_CARD_PRODUCTS;

export const INITIAL_SETTINGS: ShopSettings = OFFICIAL_SHOP_SETTINGS;

export const INITIAL_BULK_ENQUIRIES: BulkEnquiry[] = [];

class StoreService {
  private products: Product[] = [];
  private categories: Category[] = [];
  private enquiries: BulkEnquiry[] = [];
  private settings: ShopSettings = INITIAL_SETTINGS;

  constructor() {
    this.init();
  }

  private init(): void {
    purgeLegacyLoyaltyData();

    try {
      if (typeof localStorage === 'undefined') {
        this.products = [...INITIAL_PRODUCTS];
        this.categories = [...INITIAL_CATEGORIES];
        this.enquiries = [...INITIAL_BULK_ENQUIRIES];
        this.settings = { ...INITIAL_SETTINGS };
        return;
      }

      const storedProds = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (storedProds) {
        const parsed = JSON.parse(storedProds);
        if (Array.isArray(parsed) && parsed.length >= 40) {
          this.products = parsed;
        } else {
          this.products = [...INITIAL_PRODUCTS];
          this.saveProducts();
        }
      } else {
        this.products = [...INITIAL_PRODUCTS];
        this.saveProducts();
      }

      const storedCats = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (storedCats) {
        const parsedCats = JSON.parse(storedCats);
        if (Array.isArray(parsedCats) && parsedCats.length >= 8) {
          this.categories = parsedCats;
        } else {
          this.categories = [...INITIAL_CATEGORIES];
          this.saveCategories();
        }
      } else {
        this.categories = [...INITIAL_CATEGORIES];
        this.saveCategories();
      }

      const storedEnq = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
      if (storedEnq) {
        this.enquiries = JSON.parse(storedEnq);
      } else {
        this.enquiries = [...INITIAL_BULK_ENQUIRIES];
        this.saveEnquiries();
      }

      const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings);
        this.settings = { ...INITIAL_SETTINGS, ...parsed };
        if (parsed.menuUnderMaintenance === undefined) {
          this.settings.menuUnderMaintenance = INITIAL_SETTINGS.menuUnderMaintenance;
        }
        if (parsed.menuMaintenanceMessage === undefined) {
          this.settings.menuMaintenanceMessage = INITIAL_SETTINGS.menuMaintenanceMessage;
        }
      } else {
        this.settings = { ...INITIAL_SETTINGS };
        this.saveSettings();
      }
    } catch (e) {
      console.warn('LocalStorage error or unavailable, using in-memory state', e);
      this.products = [...INITIAL_PRODUCTS];
      this.categories = [...INITIAL_CATEGORIES];
      this.enquiries = [...INITIAL_BULK_ENQUIRIES];
      this.settings = { ...INITIAL_SETTINGS };
    }
  }

  // Products
  public getProducts(): Product[] {
    return [...this.products].sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public getProductById(id: string): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  public addProduct(product: Omit<Product, 'id'>): Product {
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`
    };
    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
  }

  public updateProduct(id: string, updates: Partial<Product>): Product | null {
    const idx = this.products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.products[idx] = {
      ...this.products[idx],
      ...updates,
      lastPriceUpdated: new Date().toISOString().split('T')[0]
    };
    this.saveProducts();
    return this.products[idx];
  }

  public deleteProduct(id: string): boolean {
    const before = this.products.length;
    this.products = this.products.filter(p => p.id !== id);
    if (this.products.length !== before) {
      this.saveProducts();
      return true;
    }
    return false;
  }

  private saveProducts(): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(this.products));
    } catch {}
  }

  // Categories
  public getCategories(): Category[] {
    return [...this.categories].map(cat => ({
      ...cat,
      itemCount: this.products.filter(p => p.categoryId === cat.id).length
    })).sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public addCategory(cat: Omit<Category, 'id'>): Category {
    const newCat: Category = {
      ...cat,
      id: `cat-${Date.now()}`
    };
    this.categories.push(newCat);
    this.saveCategories();
    return newCat;
  }

  public updateCategory(id: string, updates: Partial<Category>): Category | null {
    const idx = this.categories.findIndex(c => c.id === id);
    if (idx === -1) return null;
    this.categories[idx] = { ...this.categories[idx], ...updates };
    this.saveCategories();
    return this.categories[idx];
  }

  public deleteCategory(id: string): boolean {
    const count = this.products.filter(p => p.categoryId === id).length;
    if (count > 0) return false; // Guard: Cannot delete category containing products
    this.categories = this.categories.filter(c => c.id !== id);
    this.saveCategories();
    return true;
  }

  private saveCategories(): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(this.categories));
    } catch {}
  }

  // Bulk Enquiries
  public getEnquiries(): BulkEnquiry[] {
    return [...this.enquiries].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public getEnquiryByRef(ref: string): BulkEnquiry | undefined {
    const clean = ref.trim().toUpperCase();
    return this.enquiries.find(e => e.enquiryReference.toUpperCase() === clean);
  }

  public createEnquiry(data: Omit<BulkEnquiry, 'id' | 'enquiryReference' | 'createdAt' | 'updatedAt' | 'status'>): BulkEnquiry {
    const rand = Math.floor(1000 + Math.random() * 9000);
    const ref = `SMN-BULK-${rand}`;
    const now = new Date().toISOString();

    const newEnquiry: BulkEnquiry = {
      ...data,
      id: `enq-${Date.now()}`,
      enquiryReference: ref,
      status: 'New',
      createdAt: now,
      updatedAt: now
    };

    this.enquiries.unshift(newEnquiry);
    this.saveEnquiries();
    return newEnquiry;
  }

  public updateEnquiryStatus(id: string, status: BulkEnquiry['status'], internalNotes?: string): BulkEnquiry | null {
    const idx = this.enquiries.findIndex(e => e.id === id);
    if (idx === -1) return null;

    this.enquiries[idx] = {
      ...this.enquiries[idx],
      status,
      internalNotes: internalNotes !== undefined ? internalNotes : this.enquiries[idx].internalNotes,
      updatedAt: new Date().toISOString()
    };
    this.saveEnquiries();
    return this.enquiries[idx];
  }

  public updateEnquiryStaff(id: string, staffName: string): void {
    const idx = this.enquiries.findIndex(e => e.id === id);
    if (idx !== -1) {
      this.enquiries[idx].assignedStaff = staffName;
      this.enquiries[idx].updatedAt = new Date().toISOString();
      this.saveEnquiries();
    }
  }

  private saveEnquiries(): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(this.enquiries));
    } catch {}
  }

  // Contacts
  public getCustomerContacts(): CustomerContact[] {
    const map = new Map<string, CustomerContact>();

    this.enquiries.forEach(enq => {
      const key = enq.contactNumber.trim();
      const existing = map.get(key);

      if (!existing) {
        map.set(key, {
          id: `cont-${key.replace(/\D/g, '')}`,
          name: enq.customerName,
          phone: enq.contactNumber,
          email: enq.email,
          totalEnquiries: 1,
          lastEnquiryDate: enq.createdAt,
          occasions: [enq.occasion]
        });
      } else {
        existing.totalEnquiries += 1;
        if (!existing.occasions.includes(enq.occasion)) {
          existing.occasions.push(enq.occasion);
        }
        if (new Date(enq.createdAt) > new Date(existing.lastEnquiryDate)) {
          existing.lastEnquiryDate = enq.createdAt;
          existing.name = enq.customerName; // update latest name
          if (enq.email) existing.email = enq.email;
        }
      }
    });

    return Array.from(map.values()).sort((a, b) => b.totalEnquiries - a.totalEnquiries);
  }

  // Settings
  public getShopSettings(): ShopSettings {
    return { ...this.settings };
  }

  public updateShopSettings(updates: Partial<ShopSettings>): ShopSettings {
    this.settings = { ...this.settings, ...updates };
    this.saveSettings();
    return { ...this.settings };
  }

  private saveSettings(): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(this.settings));
    } catch {}
  }

  // Analytics
  public getAnalytics(): AnalyticsSummary {
    const totalEnquiries = this.enquiries.length;
    const newEnquiries = this.enquiries.filter(e => e.status === 'New').length;
    const pendingEnquiries = this.enquiries.filter(
      e => e.status === 'Quotation Pending' || e.status === 'Contacted'
    ).length;
    const confirmedEnquiries = this.enquiries.filter(e => e.status === 'Confirmed').length;
    const completedEnquiries = this.enquiries.filter(e => e.status === 'Completed').length;

    // Group by occasion
    const occasionMap: Record<string, number> = {};
    this.enquiries.forEach(e => {
      occasionMap[e.occasion] = (occasionMap[e.occasion] || 0) + 1;
    });
    const enquiriesByOccasion = Object.entries(occasionMap).map(([occasion, count]) => ({
      occasion,
      count
    }));

    // Group by status
    const statusMap: Record<string, number> = {};
    this.enquiries.forEach(e => {
      statusMap[e.status] = (statusMap[e.status] || 0) + 1;
    });
    const enquiriesByStatus = Object.entries(statusMap).map(([status, count]) => ({
      status,
      count
    }));

    return {
      totalProducts: this.products.length,
      activeCategories: this.categories.filter(c => c.active).length,
      totalEnquiries,
      newEnquiries,
      pendingEnquiries,
      confirmedEnquiries,
      completedEnquiries,
      enquiriesByOccasion,
      enquiriesByStatus,
      recentUpdatesCount: this.products.filter(p => !!p.lastPriceUpdated).length
    };
  }

  // Reset to Factory Demo
  public resetToFactoryDemo(): void {
    this.products = [...INITIAL_PRODUCTS];
    this.categories = [...INITIAL_CATEGORIES];
    this.enquiries = [...INITIAL_BULK_ENQUIRIES];
    this.settings = { ...INITIAL_SETTINGS };
    this.saveProducts();
    this.saveCategories();
    this.saveEnquiries();
    this.saveSettings();
  }
}

export const store = new StoreService();
