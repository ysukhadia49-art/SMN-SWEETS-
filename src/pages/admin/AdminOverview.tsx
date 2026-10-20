import React from 'react';
import { AnalyticsSummary, BulkEnquiry, Product, ShopSettings } from '../../types';
import { 
  Package, 
  FolderTree, 
  ClipboardList, 
  Clock, 
  CheckCircle2, 
  Phone, 
  ArrowRight, 
  Sparkles,
  ExternalLink,
  Plus
} from 'lucide-react';
import { generateBulkEnquiryWhatsAppUrl } from '../../utils/whatsapp';

interface AdminOverviewProps {
  analytics: AnalyticsSummary;
  enquiries: BulkEnquiry[];
  products: Product[];
  settings: ShopSettings;
  onNavigateTab: (tab: any) => void;
  onUpdateEnquiryStatus: (id: string, status: BulkEnquiry['status']) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  analytics,
  enquiries,
  products,
  settings,
  onNavigateTab,
  onUpdateEnquiryStatus
}) => {
  const recentEnquiries = enquiries.slice(0, 5);

  return (
    <div className="animate-fade-in" style={{ padding: 'clamp(1rem, 2.5vw, 2rem)' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', color: '#332218', margin: 0 }}>
            Shop Overview
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#806656', margin: '0.25rem 0 0' }}>
            Live business activity, catalogue status, and bulk orders for Sukhadiya Manilal Nathalal.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => onNavigateTab('products')}
            className="btn btn-primary btn-sm"
          >
            <Plus size={15} /> Add New Product
          </button>
          <button
            onClick={() => onNavigateTab('bulk-enquiries')}
            className="btn btn-secondary btn-sm"
          >
            Manage Enquiries
          </button>
        </div>
      </div>

      {/* Real Metric Cards Grid */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1.25rem',
          marginBottom: '2.5rem'
        }}
      >
        {/* Total Products */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#806656', textTransform: 'uppercase' }}>
              Catalogue Products
            </span>
            <Package size={18} color="#EA580C" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 700, color: '#332218', fontFamily: 'var(--font-serif)' }}>
            {analytics.totalProducts}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#15803D', fontWeight: 500, marginTop: '0.2rem', display: 'block' }}>
            Across {analytics.activeCategories} Active Categories
          </span>
        </div>

        {/* New Bulk Enquiries */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#806656', textTransform: 'uppercase' }}>
              New Enquiries
            </span>
            <ClipboardList size={18} color="#EA580C" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 700, color: '#EA580C', fontFamily: 'var(--font-serif)' }}>
            {analytics.newEnquiries}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#EA580C', fontWeight: 600, marginTop: '0.2rem', display: 'block' }}>
            Requires Initial Response
          </span>
        </div>

        {/* Pending Enquiries */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#806656', textTransform: 'uppercase' }}>
              Pending Quotations
            </span>
            <Clock size={18} color="#D97706" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 700, color: '#332218', fontFamily: 'var(--font-serif)' }}>
            {analytics.pendingEnquiries}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#806656', marginTop: '0.2rem', display: 'block' }}>
            Quotation / Follow-up pending
          </span>
        </div>

        {/* Confirmed Orders */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#806656', textTransform: 'uppercase' }}>
              Confirmed Orders
            </span>
            <CheckCircle2 size={18} color="#15803D" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 700, color: '#15803D', fontFamily: 'var(--font-serif)' }}>
            {analytics.confirmedEnquiries}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#15803D', fontWeight: 500, marginTop: '0.2rem', display: 'block' }}>
            Scheduled for Preparation
          </span>
        </div>
      </div>

      {/* Recent Enquiries Table Card */}
      <div 
        style={{ 
          backgroundColor: '#FFFEFA', 
          border: '1px solid #EEDCCA', 
          borderRadius: 'var(--radius-lg)', 
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid #F5EAE0', paddingBottom: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', color: '#332218', margin: 0 }}>
              Recent Bulk Enquiries
            </h2>
            <span style={{ fontSize: '0.8rem', color: '#806656' }}>
              Latest customer enquiries received via website
            </span>
          </div>

          <button
            onClick={() => onNavigateTab('bulk-enquiries')}
            className="btn btn-outline btn-sm"
          >
            View All ({analytics.totalEnquiries})
          </button>
        </div>

        {recentEnquiries.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #EEDCCA', color: '#806656', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Ref ID</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Customer</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Occasion</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Quantity</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Required Date</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
                  <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentEnquiries.map((enq) => (
                  <tr key={enq.id} style={{ borderBottom: '1px solid #F5EAE0' }}>
                    <td style={{ padding: '0.85rem 0.5rem', fontWeight: 700, color: '#EA580C' }}>
                      {enq.enquiryReference}
                    </td>
                    <td style={{ padding: '0.85rem 0.5rem' }}>
                      <div style={{ fontWeight: 600, color: '#332218' }}>{enq.customerName}</div>
                      <div style={{ fontSize: '0.78rem', color: '#806656' }}>{enq.contactNumber}</div>
                    </td>
                    <td style={{ padding: '0.85rem 0.5rem' }}>
                      <span className="badge badge-cream">{enq.occasion}</span>
                    </td>
                    <td style={{ padding: '0.85rem 0.5rem', color: '#332218' }}>
                      {enq.approximateQuantity}
                    </td>
                    <td style={{ padding: '0.85rem 0.5rem', color: '#806656' }}>
                      {enq.requestedDate}
                    </td>
                    <td style={{ padding: '0.85rem 0.5rem' }}>
                      <select
                        value={enq.status}
                        onChange={(e) => onUpdateEnquiryStatus(enq.id, e.target.value as any)}
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          padding: '0.25rem 0.5rem',
                          borderRadius: 'var(--radius-full)',
                          border: '1px solid #EEDCCA',
                          backgroundColor: enq.status === 'Confirmed' || enq.status === 'Completed' ? '#DCFCE7' : '#FFF1DC',
                          color: enq.status === 'Confirmed' || enq.status === 'Completed' ? '#15803D' : '#EA580C',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Quotation Pending">Quotation Pending</option>
                        <option value="Quotation Shared">Quotation Shared</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td style={{ padding: '0.85rem 0.5rem', textAlign: 'right' }}>
                      <a
                        href={generateBulkEnquiryWhatsAppUrl(enq, settings.verifiedWhatsAppNumber)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp btn-sm"
                        style={{ padding: '0.35rem 0.65rem', textDecoration: 'none' }}
                        title="Open WhatsApp with customer"
                      >
                        <Phone size={13} /> Reply
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#806656' }}>
            No bulk enquiries logged yet.
          </div>
        )}
      </div>
    </div>
  );
};
