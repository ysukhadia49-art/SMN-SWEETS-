import React, { useState } from 'react';
import { BulkEnquiry, EnquiryStatus, OccasionType, ShopSettings } from '../../types';
import { store } from '../../services/store';
import { generateBulkEnquiryWhatsAppUrl } from '../../utils/whatsapp';
import { 
  ClipboardList, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  Edit3, 
  X, 
  User, 
  Save
} from 'lucide-react';

interface AdminBulkEnquiriesProps {
  enquiries: BulkEnquiry[];
  settings: ShopSettings;
  onRefresh: () => void;
}

export const AdminBulkEnquiries: React.FC<AdminBulkEnquiriesProps> = ({
  enquiries,
  settings,
  onRefresh
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [occasionFilter, setOccasionFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<BulkEnquiry | null>(null);

  // Modal Editing State
  const [modalStatus, setModalStatus] = useState<EnquiryStatus>('New');
  const [modalNotes, setModalNotes] = useState('');
  const [modalStaff, setModalStaff] = useState('');

  const openDetailModal = (enq: BulkEnquiry) => {
    setSelectedEnquiry(enq);
    setModalStatus(enq.status);
    setModalNotes(enq.internalNotes || '');
    setModalStaff(enq.assignedStaff || '');
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;

    store.updateEnquiryStatus(selectedEnquiry.id, modalStatus, modalNotes.trim() || undefined);
    if (modalStaff.trim()) {
      store.updateEnquiryStaff(selectedEnquiry.id, modalStaff.trim());
    }

    setSelectedEnquiry(null);
    onRefresh();
  };

  // Filter enquiries
  const filtered = enquiries.filter(e => {
    if (statusFilter !== 'all' && e.status !== statusFilter) return false;
    if (occasionFilter !== 'all' && e.occasion !== occasionFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        e.enquiryReference.toLowerCase().includes(q) ||
        e.customerName.toLowerCase().includes(q) ||
        e.contactNumber.includes(q) ||
        e.requestedProducts.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="animate-fade-in" style={{ padding: 'clamp(1rem, 2.5vw, 2rem)' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', color: '#332218', margin: 0 }}>
            Bulk Order Enquiries
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#806656', margin: '0.25rem 0 0' }}>
            Manage wedding mithai, corporate festival hampers, and event requests.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span className="badge badge-orange" style={{ fontSize: '0.82rem', padding: '0.45rem 0.9rem' }}>
            {enquiries.filter(e => e.status === 'New').length} New Enquiries
          </span>
          <span className="badge badge-green" style={{ fontSize: '0.82rem', padding: '0.45rem 0.9rem' }}>
            {enquiries.filter(e => e.status === 'Confirmed').length} Confirmed
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div 
        style={{ 
          backgroundColor: '#FFFEFA', 
          border: '1px solid #EEDCCA', 
          borderRadius: 'var(--radius-lg)', 
          padding: '1.25rem',
          marginBottom: '1.75rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ position: 'relative', flexGrow: 1, minWidth: '240px' }}>
          <input
            type="text"
            placeholder="Search by customer name, ref ID, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search size={18} color="#806656" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-select"
            style={{ width: 'auto' }}
          >
            <option value="all">All Statuses ({enquiries.length})</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Quotation Pending">Quotation Pending</option>
            <option value="Quotation Shared">Quotation Shared</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            value={occasionFilter}
            onChange={(e) => setOccasionFilter(e.target.value)}
            className="form-select"
            style={{ width: 'auto' }}
          >
            <option value="all">All Occasions</option>
            <option value="Wedding">Wedding</option>
            <option value="Festival">Festival</option>
            <option value="Corporate Gifting">Corporate Gifting</option>
            <option value="Family Function">Family Function</option>
            <option value="Religious Event">Religious Event</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      <div 
        style={{ 
          backgroundColor: '#FFFEFA', 
          border: '1px solid #EEDCCA', 
          borderRadius: 'var(--radius-lg)', 
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#FFF1DC', color: '#806656', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '0.85rem 1rem' }}>Ref ID</th>
                <th style={{ padding: '0.85rem 1rem' }}>Customer Details</th>
                <th style={{ padding: '0.85rem 1rem' }}>Occasion</th>
                <th style={{ padding: '0.85rem 1rem' }}>Requested Products & Qty</th>
                <th style={{ padding: '0.85rem 1rem' }}>Event Date</th>
                <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((enq) => (
                <tr key={enq.id} style={{ borderBottom: '1px solid #F5EAE0' }}>
                  <td style={{ padding: '1rem', fontWeight: 800, color: '#EA580C', fontFamily: 'var(--font-serif)', fontSize: '0.95rem' }}>
                    {enq.enquiryReference}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: '#332218' }}>{enq.customerName}</div>
                    <div style={{ fontSize: '0.8rem', color: '#806656' }}>{enq.contactNumber}</div>
                    {enq.email && <div style={{ fontSize: '0.75rem', color: '#A38B7C' }}>{enq.email}</div>}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span className="badge badge-cream">{enq.occasion}</span>
                  </td>
                  <td style={{ padding: '1rem', maxWidth: '280px' }}>
                    <div style={{ fontWeight: 600, color: '#332218', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {enq.approximateQuantity}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#806656', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {enq.requestedProducts}
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: '#806656', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={13} color="#EA580C" />
                      <span>{enq.requestedDate}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span 
                      className={`badge ${enq.status === 'Confirmed' || enq.status === 'Completed' ? 'badge-green' : enq.status === 'New' ? 'badge-orange' : 'badge-gold'}`}
                      style={{ fontSize: '0.78rem' }}
                    >
                      {enq.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                      <button
                        onClick={() => openDetailModal(enq)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.35rem 0.65rem' }}
                        title="View details & manage status"
                      >
                        <Edit3 size={14} /> Review
                      </button>
                      <a
                        href={generateBulkEnquiryWhatsAppUrl(enq, settings.verifiedWhatsAppNumber)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp btn-sm"
                        style={{ padding: '0.35rem 0.65rem', textDecoration: 'none' }}
                        title="Chat on WhatsApp"
                      >
                        <Phone size={13} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail & Status Modal */}
      {selectedEnquiry && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(51, 34, 24, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          <div 
            style={{
              backgroundColor: '#FFFEFA',
              borderRadius: 'var(--radius-xl)',
              maxWidth: '650px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2rem',
              border: '1px solid #EEDCCA',
              boxShadow: 'var(--shadow-lg)',
              position: 'relative'
            }}
            className="animate-fade-in"
          >
            <button
              onClick={() => setSelectedEnquiry(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#806656'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span className="badge badge-orange">{selectedEnquiry.enquiryReference}</span>
              <span className="badge badge-cream">{selectedEnquiry.occasion}</span>
            </div>

            <h2 style={{ fontSize: '1.5rem', color: '#332218', marginBottom: '1rem' }}>
              Enquiry from {selectedEnquiry.customerName}
            </h2>

            {/* Quick Specs */}
            <div style={{ backgroundColor: '#FFF8ED', border: '1px solid #EEDCCA', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.25rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.88rem' }}>
              <div>
                <span style={{ color: '#806656', fontSize: '0.75rem', display: 'block' }}>Contact Phone</span>
                <strong>{selectedEnquiry.contactNumber}</strong>
              </div>
              <div>
                <span style={{ color: '#806656', fontSize: '0.75rem', display: 'block' }}>Required Date</span>
                <strong>{selectedEnquiry.requestedDate}</strong>
              </div>
              <div>
                <span style={{ color: '#806656', fontSize: '0.75rem', display: 'block' }}>Estimated Quantity</span>
                <strong>{selectedEnquiry.approximateQuantity}</strong>
              </div>
              <div>
                <span style={{ color: '#806656', fontSize: '0.75rem', display: 'block' }}>Fulfillment Method</span>
                <strong>{selectedEnquiry.collectionOrDelivery === 'delivery' ? 'Delivery in Ahmedabad' : selectedEnquiry.collectionOrDelivery === 'pickup' ? 'Shop Pickup' : 'To Discuss'}</strong>
              </div>
            </div>

            {selectedEnquiry.deliveryAddress && (
              <div style={{ marginBottom: '1rem', fontSize: '0.88rem' }}>
                <span style={{ color: '#806656', fontSize: '0.75rem', display: 'block' }}>Delivery Address:</span>
                <strong>{selectedEnquiry.deliveryAddress}</strong>
              </div>
            )}

            <div style={{ marginBottom: '1.25rem', fontSize: '0.88rem' }}>
              <span style={{ color: '#806656', fontSize: '0.75rem', display: 'block' }}>Requested Items:</span>
              <p style={{ margin: '0.2rem 0', color: '#332218', backgroundColor: '#FFF5E5', padding: '0.65rem', borderRadius: 'var(--radius-md)' }}>
                {selectedEnquiry.requestedProducts}
              </p>
            </div>

            {selectedEnquiry.notes && (
              <div style={{ marginBottom: '1.25rem', fontSize: '0.88rem' }}>
                <span style={{ color: '#806656', fontSize: '0.75rem', display: 'block' }}>Customer Special Notes:</span>
                <p style={{ margin: '0.2rem 0', color: '#806656', fontStyle: 'italic' }}>
                  "{selectedEnquiry.notes}"
                </p>
              </div>
            )}

            {/* Status & Staff Editor Form */}
            <form onSubmit={handleSaveModal} style={{ borderTop: '1px solid #EEDCCA', paddingTop: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Workflow Status *</label>
                  <select
                    value={modalStatus}
                    onChange={(e) => setModalStatus(e.target.value as any)}
                    className="form-select"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Quotation Pending">Quotation Pending</option>
                    <option value="Quotation Shared">Quotation Shared</option>
                    <option value="Confirmed">Confirmed by Shop</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Assigned Staff Member</label>
                  <input
                    type="text"
                    value={modalStaff}
                    onChange={(e) => setModalStaff(e.target.value)}
                    className="form-input"
                    placeholder="e.g. Maheshbhai"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Internal Staff Notes / Quotation Details</label>
                <textarea
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  className="form-textarea"
                  placeholder="Record quoted rates, tasting schedule, advance payment received..."
                  style={{ minHeight: '80px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
                <a
                  href={generateBulkEnquiryWhatsAppUrl(selectedEnquiry, settings.verifiedWhatsAppNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm"
                  style={{ textDecoration: 'none' }}
                >
                  <Phone size={14} /> Open Customer WhatsApp
                </a>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedEnquiry(null)}
                    className="btn btn-secondary"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <Save size={16} /> Update Enquiry
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
