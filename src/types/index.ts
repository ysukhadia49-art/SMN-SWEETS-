export type ProductAvailability = 'in_stock' | 'fresh_daily' | 'seasonal';

export interface PackagingOption {
  label: string; // e.g. "250g", "500g", "1 kg", "Box of 16"
  price?: number; // Verified price if configured, or undefined for enquiry
  available: boolean;
}

export interface Product {
  id: string;
  name: string;
  nameGu?: string; // Gujarati script name
  categoryId: string;
  categoryName: string;
  description: string;
  imageUrl: string;
  availability: ProductAvailability;
  priceAmount: number | null; // Null means "Price on Enquiry"
  currency: string;
  priceUnit: string; // "per kg", "per 500g", "per piece", "per box"
  priceVerified: boolean;
  packageSizes: PackagingOption[];
  allergenInfo?: string;
  storageInfo?: string;
  isFeatured?: boolean;
  displayOrder: number;
  lastPriceUpdated?: string;
}

export interface Category {
  id: string;
  name: string;
  nameGu?: string;
  slug: string;
  description: string;
  displayOrder: number;
  active: boolean;
  itemCount?: number;
}

export type OccasionType = 
  | 'Wedding'
  | 'Festival'
  | 'Corporate Gifting'
  | 'Family Function'
  | 'Religious Event'
  | 'Other';

export type EnquiryStatus =
  | 'New'
  | 'Contacted'
  | 'Quotation Pending'
  | 'Quotation Shared'
  | 'Confirmed'
  | 'Completed'
  | 'Cancelled';

export interface BulkEnquiry {
  id: string;
  enquiryReference: string; // e.g. "SMN-2026-1042"
  customerName: string;
  contactNumber: string;
  email?: string;
  occasion: OccasionType;
  requestedDate: string;
  requestedProducts: string;
  approximateQuantity: string;
  collectionOrDelivery: 'pickup' | 'delivery' | 'discuss';
  deliveryAddress?: string;
  notes?: string;
  status: EnquiryStatus;
  internalNotes?: string;
  assignedStaff?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerContact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  totalEnquiries: number;
  lastEnquiryDate: string;
  occasions: OccasionType[];
}

export interface ShopSettings {
  businessName: string;
  businessType: string;
  tagline: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  googleMapsUrl: string;
  verifiedWhatsAppNumber: string;
  isWhatsAppVerified: boolean;
  phone: string;
  email: string;
  openingHours: string;
  establishedYear: string;
  purityGuarantee: string;
  language: 'en' | 'gu';
}

export interface AnalyticsSummary {
  totalProducts: number;
  activeCategories: number;
  totalEnquiries: number;
  newEnquiries: number;
  pendingEnquiries: number;
  confirmedEnquiries: number;
  completedEnquiries: number;
  enquiriesByOccasion: { occasion: string; count: number }[];
  enquiriesByStatus: { status: string; count: number }[];
  recentUpdatesCount: number;
}

export type CustomerPage = 
  | 'home'
  | 'sweets'
  | 'gift-boxes'
  | 'bulk-orders'
  | 'about'
  | 'contact';

export type AdminTab = 
  | 'overview'
  | 'products'
  | 'categories'
  | 'bulk-enquiries'
  | 'customers'
  | 'analytics'
  | 'settings';

export type UserRole = 'customer' | 'admin' | 'staff';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: string;
  avatarUrl?: string;
  authProvider?: 'google';
}
