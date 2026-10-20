import { Product, BulkEnquiry } from '../types';

export function cleanPhoneForWhatsApp(phone: string): string {
  // Remove non-digit characters
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length === 12) {
    return digits;
  }
  if (digits.length === 10) {
    return `91${digits}`;
  }
  return digits;
}

export function generateProductWhatsAppUrl(
  product: Product,
  packageLabel?: string,
  businessPhone: string = '+919825012345'
): string {
  const cleanNumber = cleanPhoneForWhatsApp(businessPhone);
  const pkgText = packageLabel ? ` for the ${packageLabel}` : '';
  const priceText = product.priceAmount 
    ? ` (Listed: ₹${product.priceAmount} ${product.priceUnit})` 
    : '';

  const message = `Hello Sukhadiya Manilal Nathalal!
I would like to enquire about *${product.name}* (${product.nameGu || ''})${pkgText}${priceText}.
Please share current fresh batch availability and pricing details. Thank you!`;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export function generateBulkEnquiryWhatsAppUrl(
  enquiry: BulkEnquiry,
  businessPhone: string = '+919825012345'
): string {
  const cleanNumber = cleanPhoneForWhatsApp(businessPhone);
  
  const message = `Hello Sukhadiya Manilal Nathalal!
I have submitted a Bulk Order Enquiry:
*Reference ID:* ${enquiry.enquiryReference}
*Customer Name:* ${enquiry.customerName}
*Occasion:* ${enquiry.occasion}
*Required By:* ${enquiry.requestedDate}
*Estimated Quantity:* ${enquiry.approximateQuantity}
*Products Requested:* ${enquiry.requestedProducts}
*Preference:* ${enquiry.collectionOrDelivery === 'delivery' ? 'Delivery' : enquiry.collectionOrDelivery === 'pickup' ? 'Shop Pickup' : 'To Discuss'}

Kindly review and share the official quotation and sample box details.`;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export function generateDirectShopWhatsAppUrl(
  businessPhone: string = '+919825012345',
  customSubject?: string
): string {
  const cleanNumber = cleanPhoneForWhatsApp(businessPhone);
  const message = customSubject 
    ? `Hello Sukhadiya Manilal Nathalal! I am reaching out regarding: ${customSubject}.`
    : `Hello Sukhadiya Manilal Nathalal! I am visiting your Manek Chowk sweet shop and have an enquiry regarding your sweets and farsan.`;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export function formatINR(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) {
    return 'Price on Enquiry';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}
