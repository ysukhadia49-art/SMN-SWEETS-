import React, { useState } from 'react';
import { BulkEnquiry, OccasionType, ShopSettings, User } from '../../types';
import { store } from '../../services/store';
import { generateBulkEnquiryWhatsAppUrl } from '../../utils/whatsapp';
import { 
  Package, 
  Calendar, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  ClipboardCheck,
  Send
} from 'lucide-react';

interface BulkOrdersPageProps {
  initialProductName?: string;
  settings: ShopSettings;
  onOpenTracker: () => void;
  currentUser?: User | null;
}

export const BulkOrdersPage: React.FC<BulkOrdersPageProps> = ({
  initialProductName = '',
  settings,
  onOpenTracker,
  currentUser
}) => {
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [contactNumber, setContactNumber] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [occasion, setOccasion] = useState<OccasionType>('Wedding');
  const [requestedDate, setRequestedDate] = useState('');
  const [requestedProducts, setRequestedProducts] = useState(initialProductName);
  const [approximateQuantity, setApproximateQuantity] = useState('');
  const [collectionOrDelivery, setCollectionOrDelivery] = useState<'pickup' | 'delivery' | 'discuss'>('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');

  const [submittedEnquiry, setSubmittedEnquiry] = useState<BulkEnquiry | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const popularItems = [
    'Special Kaju Katli',
    'Traditional Mohanthal',
    'Shahi Motichoor Laddoo',
    'Mathura Kesar Peda',
    'Bhavnagari Gathiya',
    'Traditional Fafda',
    'Royal Heritage Gift Box',
    'Shagun Wedding Mithai Box'
  ];

  const handleToggleProduct = (item: string) => {
    if (!requestedProducts) {
      setRequestedProducts(item);
    } else if (requestedProducts.includes(item)) {
      setRequestedProducts(
        requestedProducts
          .split(',')
          .map((s: string) => s.trim())
          .filter((s: string) => s !== item)
          .join(', ')
      );
    } else {
      setRequestedProducts(`${requestedProducts}, ${item}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!contactNumber.trim() || contactNumber.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile contact number.');
      return;
    }
    if (!requestedDate) {
      setErrorMsg('Please select the required event or delivery date.');
      return;
    }
    if (!requestedProducts.trim()) {
      setErrorMsg('Please specify the products or sweets you are interested in.');
      return;
    }
    if (!approximateQuantity.trim()) {
      setErrorMsg('Please enter an approximate quantity (e.g. 25 kg or 100 boxes).');
      return;
    }

    try {
      const created = store.createEnquiry({
        customerName: customerName.trim(),
        contactNumber: contactNumber.trim(),
        email: email.trim() || undefined,
        occasion,
        requestedDate,
        requestedProducts: requestedProducts.trim(),
        approximateQuantity: approximateQuantity.trim(),
        collectionOrDelivery,
        deliveryAddress: deliveryAddress.trim() || undefined,
        notes: notes.trim() || undefined
      });

      setSubmittedEnquiry(created);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setErrorMsg('Failed to submit enquiry. Please try again or contact us directly on WhatsApp.');
    }
  };

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#FFF8ED', minHeight: '80vh', paddingBottom: '5rem' }}>
      {/* Header Banner */}
      <section 
        style={{ 
          backgroundColor: '#FFF1DC', 
          borderBottom: '1px solid #EEDCCA', 
          padding: 'clamp(2.5rem, 4vw, 4rem) 1.5rem',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '800px' }}>
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              backgroundColor: '#FFFEFA', 
              padding: '0.3rem 0.85rem', 
              borderRadius: 'var(--radius-full)', 
              border: '1px solid #EEDCCA',
              marginBottom: '1rem'
            }}
          >
            <Package size={14} color="#EA580C" />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#EA580C', textTransform: 'uppercase' }}>
              Weddings • Festivals • Corporate Celebrations
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#332218', marginBottom: '0.75rem' }}>
            Bulk Orders & Celebration Enquiries
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#806656', lineHeight: 1.6 }}>
            Plan your auspicious celebrations with authentic Manek Chowk sweets. 
            Fill out the form below to receive customized pricing, packaging options, and sample tasting boxes.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '3rem', maxWidth: '850px' }}>
        {/* SUCCESS STATE */}
        {submittedEnquiry ? (
          <div 
            className="animate-fade-in"
            style={{ 
              backgroundColor: '#FFFEFA', 
              borderRadius: 'var(--radius-xl)', 
              border: '2px solid #EA580C', 
              padding: 'clamp(2rem, 4vw, 3.5rem)',
              boxShadow: 'var(--shadow-lg)',
              textAlign: 'center'
            }}
          >
            <div 
              style={{ 
                width: '72px', 
                height: '72px', 
                borderRadius: '50%', 
                backgroundColor: '#DCFCE7', 
                color: '#15803D',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}
            >
              <CheckCircle2 size={40} />
            </div>

            <span className="badge badge-green" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              Enquiry Submitted Successfully
            </span>

            <h2 style={{ fontSize: '2rem', color: '#332218', marginBottom: '0.75rem' }}>
              Dhanyawaad, {submittedEnquiry.customerName}!
            </h2>

            <p style={{ fontSize: '1rem', color: '#806656', maxWidth: '550px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
              We have received your bulk enquiry for <strong>{submittedEnquiry.occasion}</strong>. 
              Our shop team at Manek Chowk will review the requirements and reach out promptly.
            </p>

            {/* Reference Box */}
            <div 
              style={{ 
                backgroundColor: '#FFF8ED', 
                border: '1px solid #EEDCCA', 
                borderRadius: 'var(--radius-lg)', 
                padding: '1.25rem',
                maxWidth: '420px',
                margin: '0 auto 2rem'
              }}
            >
              <span style={{ fontSize: '0.78rem', color: '#806656', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Your Unique Enquiry Reference
              </span>
              <div 
                style={{ 
                  fontFamily: 'var(--font-serif)', 
                  fontSize: '1.75rem', 
                  fontWeight: 800, 
                  color: '#EA580C',
                  marginTop: '0.2rem'
                }}
              >
                {submittedEnquiry.enquiryReference}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#806656', marginTop: '0.35rem', display: 'block' }}>
                Save this reference code to track updates online anytime.
              </span>
            </div>

            {/* Actions: Instant WhatsApp Follow-up & Tracker */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
              <a
                href={generateBulkEnquiryWhatsAppUrl(submittedEnquiry, settings.verifiedWhatsAppNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
                style={{ textDecoration: 'none' }}
              >
                <Phone size={18} /> Send Details on WhatsApp for Instant Quotation
              </a>

              <button
                type="button"
                onClick={onOpenTracker}
                className="btn btn-secondary btn-lg"
              >
                <ClipboardCheck size={18} /> Track Enquiry Status
              </button>
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #EEDCCA' }}>
              <button
                type="button"
                onClick={() => {
                  setSubmittedEnquiry(null);
                  setCustomerName('');
                  setContactNumber('');
                  setRequestedProducts('');
                  setApproximateQuantity('');
                  setNotes('');
                }}
                className="btn btn-outline btn-sm"
              >
                Submit Another Enquiry
              </button>
            </div>
          </div>
        ) : (
          /* FORM STATE */
          <div 
            style={{ 
              backgroundColor: '#FFFEFA', 
              borderRadius: 'var(--radius-xl)', 
              border: '1px solid #EEDCCA', 
              padding: 'clamp(1.75rem, 3.5vw, 3rem)',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            {errorMsg && (
              <div 
                style={{ 
                  backgroundColor: '#FEE2E2', 
                  color: '#B91C1C', 
                  padding: '0.75rem 1rem', 
                  borderRadius: 'var(--radius-md)', 
                  marginBottom: '1.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}
              >
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Occasion Selection */}
              <div className="form-group">
                <label className="form-label">Type of Celebration / Occasion *</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {(['Wedding', 'Festival', 'Corporate Gifting', 'Family Function', 'Religious Event', 'Other'] as OccasionType[]).map((occ) => {
                    const isSelected = occasion === occ;
                    return (
                      <button
                        key={occ}
                        type="button"
                        onClick={() => setOccasion(occ)}
                        style={{
                          padding: '0.5rem 1rem',
                          borderRadius: 'var(--radius-full)',
                          border: isSelected ? '2px solid #EA580C' : '1px solid #EEDCCA',
                          backgroundColor: isSelected ? '#FFF1DC' : '#FFFEFA',
                          color: isSelected ? '#EA580C' : '#806656',
                          fontWeight: isSelected ? 700 : 500,
                          fontSize: '0.88rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {occ}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Personal Details Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rameshchandra Patel"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Mobile Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98250 12345"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="e.g. ramesh@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Required Delivery / Event Date *</label>
                  <input
                    type="date"
                    required
                    value={requestedDate}
                    onChange={(e) => setRequestedDate(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Quick Checklist for Popular Items */}
              <div className="form-group">
                <label className="form-label">
                  Requested Sweets & Farsan * (Select popular items or type below)
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.65rem' }}>
                  {popularItems.map((item) => {
                    const isAdded = requestedProducts.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleToggleProduct(item)}
                        style={{
                          fontSize: '0.78rem',
                          padding: '0.25rem 0.65rem',
                          borderRadius: 'var(--radius-full)',
                          border: isAdded ? '1px solid #EA580C' : '1px solid #EEDCCA',
                          backgroundColor: isAdded ? '#FFF1DC' : '#FFFEFA',
                          color: isAdded ? '#EA580C' : '#806656',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}
                      >
                        {isAdded ? '✓' : '+'} {item}
                      </button>
                    );
                  })}
                </div>
                <textarea
                  required
                  placeholder="Specify sweets, farsan varieties, packaging preferences..."
                  value={requestedProducts}
                  onChange={(e) => setRequestedProducts(e.target.value)}
                  className="form-textarea"
                  style={{ minHeight: '80px' }}
                />
              </div>

              {/* Approximate Quantity & Delivery Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Estimated Quantity *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 50 kg or 120 Gift Boxes"
                    value={approximateQuantity}
                    onChange={(e) => setApproximateQuantity(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Arrangement Preference *</label>
                  <select
                    value={collectionOrDelivery}
                    onChange={(e) => setCollectionOrDelivery(e.target.value as any)}
                    className="form-select"
                  >
                    <option value="pickup">Self Pickup from Manek Chowk Shop</option>
                    <option value="delivery">Doorstep Delivery in Ahmedabad</option>
                    <option value="discuss">To Discuss with Shop Staff</option>
                  </select>
                </div>
              </div>

              {collectionOrDelivery === 'delivery' && (
                <div className="form-group animate-fade-in">
                  <label className="form-label">Delivery Address in Ahmedabad</label>
                  <input
                    type="text"
                    placeholder="Venue name, street, area in Ahmedabad"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="form-input"
                  />
                </div>
              )}

              {/* Special Instructions */}
              <div className="form-group">
                <label className="form-label">Additional Instructions / Custom Packaging Notes</label>
                <textarea
                  placeholder="e.g. Need gold ribbon wedding boxes, sample tasting needed on Saturday, morning 7 AM delivery..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="form-textarea"
                  style={{ minHeight: '75px' }}
                />
              </div>

              {/* Privacy Notice */}
              <div style={{ fontSize: '0.82rem', color: '#806656', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                <ShieldCheck size={14} color="#EA580C" style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                Your contact details are strictly used for preparing your enquiry quotation and will never be shared. 
                Submitting this form does not charge any money and is not an instant confirmed order.
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
              >
                <Send size={18} /> Submit Bulk Order Enquiry
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
