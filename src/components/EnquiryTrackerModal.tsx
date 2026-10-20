import React, { useState } from 'react';
import { BulkEnquiry, ShopSettings } from '../types';
import { store } from '../services/store';
import { generateBulkEnquiryWhatsAppUrl } from '../utils/whatsapp';
import { 
  X, 
  Search, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Calendar, 
  Package, 
  FileText, 
  AlertCircle 
} from 'lucide-react';

interface EnquiryTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ShopSettings;
}

export const EnquiryTrackerModal: React.FC<EnquiryTrackerModalProps> = ({
  isOpen,
  onClose,
  settings
}) => {
  if (!isOpen) return null;

  const [refInput, setRefInput] = useState('');
  const [searchedEnquiry, setSearchedEnquiry] = useState<BulkEnquiry | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refInput.trim()) return;
    const found = store.getEnquiryByRef(refInput.trim());
    setSearchedEnquiry(found || null);
    setSearched(true);
  };

  const statusSteps: BulkEnquiry['status'][] = [
    'New',
    'Contacted',
    'Quotation Pending',
    'Quotation Shared',
    'Confirmed',
    'Completed'
  ];

  const currentStepIndex = searchedEnquiry 
    ? statusSteps.indexOf(searchedEnquiry.status)
    : -1;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(51, 34, 24, 0.65)',
        backdropFilter: 'blur(5px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: '#FFFEFA',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '650px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid #EEDCCA',
          padding: 'clamp(1.25rem, 3vw, 2rem)'
        }}
        onClick={(e) => e.stopPropagation()}
        className="animate-fade-in"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: '#FFFEFA',
            border: '1px solid #EEDCCA',
            color: '#332218',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          aria-label="Close Tracker"
        >
          <X size={16} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <h2 style={{ fontSize: '1.6rem', color: '#332218', marginBottom: '0.35rem' }}>
            Track Bulk Order Enquiry
          </h2>
          <p style={{ fontSize: '0.92rem', color: '#806656' }}>
            Enter your reference ID (e.g. <strong>SMN-BULK-1042</strong>) to view status & updates.
          </p>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSearch} style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ position: 'relative', flexGrow: 1 }}>
              <input
                type="text"
                placeholder="Enter reference (e.g. SMN-BULK-1042)"
                value={refInput}
                onChange={(e) => setRefInput(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.5rem', fontWeight: 600, textTransform: 'uppercase' }}
              />
              <Search 
                size={18} 
                color="#806656" 
                style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} 
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Track
            </button>
          </div>
        </form>

        {/* Search Result */}
        {searched && searchedEnquiry && (
          <div 
            style={{ 
              backgroundColor: '#FFF8ED', 
              border: '1px solid #EEDCCA', 
              borderRadius: 'var(--radius-lg)', 
              padding: '1.5rem' 
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #EEDCCA', paddingBottom: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: '#806656', textTransform: 'uppercase' }}>Reference Code</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#EA580C', fontFamily: 'var(--font-serif)' }}>
                  {searchedEnquiry.enquiryReference}
                </div>
              </div>
              <span className={`badge ${searchedEnquiry.status === 'Confirmed' || searchedEnquiry.status === 'Completed' ? 'badge-green' : 'badge-orange'}`} style={{ fontSize: '0.82rem' }}>
                {searchedEnquiry.status}
              </span>
            </div>

            {/* Visual Step Progress */}
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#806656', display: 'block', marginBottom: '0.75rem' }}>
                Enquiry Lifecycle:
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                {['Received', 'Contacted', 'Quotation', 'Confirmed'].map((step, idx) => {
                  const isDone = currentStepIndex >= idx;
                  return (
                    <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
                      <div 
                        style={{ 
                          width: '28px', 
                          height: '28px', 
                          borderRadius: '50%', 
                          backgroundColor: isDone ? '#EA580C' : '#FFFEFA', 
                          color: isDone ? '#FFFFFF' : '#806656',
                          border: isDone ? '2px solid #EA580C' : '2px solid #EEDCCA',
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 700
                        }}
                      >
                        {isDone ? '✓' : idx + 1}
                      </div>
                      <span style={{ fontSize: '0.72rem', color: isDone ? '#332218' : '#806656', fontWeight: isDone ? 700 : 500, marginTop: '0.35rem' }}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Details List */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem', marginBottom: '1.25rem', fontSize: '0.88rem' }}>
              <div>
                <span style={{ color: '#806656', display: 'block', fontSize: '0.78rem' }}>Customer Name:</span>
                <strong>{searchedEnquiry.customerName}</strong>
              </div>
              <div>
                <span style={{ color: '#806656', display: 'block', fontSize: '0.78rem' }}>Occasion:</span>
                <strong>{searchedEnquiry.occasion}</strong>
              </div>
              <div>
                <span style={{ color: '#806656', display: 'block', fontSize: '0.78rem' }}>Required Date:</span>
                <strong>{searchedEnquiry.requestedDate}</strong>
              </div>
              <div>
                <span style={{ color: '#806656', display: 'block', fontSize: '0.78rem' }}>Approximate Quantity:</span>
                <strong>{searchedEnquiry.approximateQuantity}</strong>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFEFA', border: '1px solid #EEDCCA', borderRadius: 'var(--radius-md)', padding: '0.85rem', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
              <span style={{ color: '#806656', display: 'block', fontSize: '0.75rem', marginBottom: '0.2rem' }}>Requested Products:</span>
              <p style={{ margin: 0, color: '#332218' }}>{searchedEnquiry.requestedProducts}</p>
            </div>

            {/* WhatsApp Contact Action */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <a
                href={generateBulkEnquiryWhatsAppUrl(searchedEnquiry, settings.verifiedWhatsAppNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ width: '100%', textDecoration: 'none' }}
              >
                <Phone size={16} /> Chat with Shop Regarding this Enquiry
              </a>
            </div>
          </div>
        )}

        {searched && !searchedEnquiry && (
          <div 
            style={{ 
              textAlign: 'center', 
              padding: '2rem 1rem', 
              backgroundColor: '#FFF8ED', 
              borderRadius: 'var(--radius-lg)',
              border: '1px dashed #EEDCCA'
            }}
          >
            <AlertCircle size={32} color="#EA580C" style={{ margin: '0 auto 0.75rem' }} />
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.25rem', color: '#332218' }}>
              No Enquiry Found
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#806656', maxWidth: '380px', margin: '0 auto 1rem' }}>
              We could not find an enquiry matching reference "<strong>{refInput}</strong>". Please verify your reference number or contact us directly on WhatsApp.
            </p>
            <button
              onClick={() => {
                setRefInput('SMN-BULK-1042');
                const sample = store.getEnquiryByRef('SMN-BULK-1042');
                setSearchedEnquiry(sample || null);
                setSearched(true);
              }}
              className="btn btn-outline btn-sm"
            >
              Try Sample Reference (SMN-BULK-1042)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
