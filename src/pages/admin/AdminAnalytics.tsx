import React from 'react';
import { AnalyticsSummary, BulkEnquiry } from '../../types';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp, 
  CheckCircle2, 
  PieChart, 
  Sparkles,
  Package
} from 'lucide-react';

interface AdminAnalyticsProps {
  analytics: AnalyticsSummary;
  enquiries: BulkEnquiry[];
}

export const AdminAnalytics: React.FC<AdminAnalyticsProps> = ({ analytics, enquiries }) => {
  // Calculate conversion rate: (Confirmed + Completed) / Total Enquiries
  const conversionRate = analytics.totalEnquiries > 0
    ? Math.round(((analytics.confirmedEnquiries + analytics.completedEnquiries) / analytics.totalEnquiries) * 100)
    : 0;

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      'Reference ID',
      'Customer Name',
      'Contact Number',
      'Email',
      'Occasion',
      'Requested Date',
      'Requested Products',
      'Quantity',
      'Collection/Delivery',
      'Status',
      'Created At'
    ];

    const rows = enquiries.map(e => [
      `"${e.enquiryReference}"`,
      `"${e.customerName}"`,
      `"${e.contactNumber}"`,
      `"${e.email || ''}"`,
      `"${e.occasion}"`,
      `"${e.requestedDate}"`,
      `"${e.requestedProducts.replace(/"/g, '""')}"`,
      `"${e.approximateQuantity}"`,
      `"${e.collectionOrDelivery}"`,
      `"${e.status}"`,
      `"${e.createdAt}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `SMN_Bulk_Enquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="animate-fade-in" style={{ padding: 'clamp(1rem, 2.5vw, 2rem)' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', color: '#332218', margin: 0 }}>
            Business & Enquiry Analytics
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#806656', margin: '0.25rem 0 0' }}>
            Derived from actual store enquiries and active product records. No simulated or loyalty metrics.
          </p>
        </div>

        <button onClick={handleExportCSV} className="btn btn-secondary btn-sm">
          <Download size={15} /> Export Enquiries to CSV
        </button>
      </div>

      {/* KPI Cards */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '1.25rem',
          marginBottom: '2.5rem'
        }}
      >
        <div className="card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#806656', textTransform: 'uppercase' }}>
            Total Bulk Enquiries
          </span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#332218', fontFamily: 'var(--font-serif)', marginTop: '0.25rem' }}>
            {analytics.totalEnquiries}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#806656' }}>
            Logged in system
          </span>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#806656', textTransform: 'uppercase' }}>
            Conversion to Confirmed Orders
          </span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#15803D', fontFamily: 'var(--font-serif)', marginTop: '0.25rem' }}>
            {conversionRate}%
          </div>
          <span style={{ fontSize: '0.75rem', color: '#15803D', fontWeight: 600 }}>
            {analytics.confirmedEnquiries + analytics.completedEnquiries} Confirmed / Completed
          </span>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#806656', textTransform: 'uppercase' }}>
            Pending Quotation Actions
          </span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#EA580C', fontFamily: 'var(--font-serif)', marginTop: '0.25rem' }}>
            {analytics.newEnquiries + analytics.pendingEnquiries}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#EA580C' }}>
            {analytics.newEnquiries} New + {analytics.pendingEnquiries} In-Review
          </span>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#806656', textTransform: 'uppercase' }}>
            Active Catalogue Breadth
          </span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#332218', fontFamily: 'var(--font-serif)', marginTop: '0.25rem' }}>
            {analytics.totalProducts} Items
          </div>
          <span style={{ fontSize: '0.75rem', color: '#806656' }}>
            Across {analytics.activeCategories} Categories
          </span>
        </div>
      </div>

      {/* Visual Distributions Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Enquiries by Occasion */}
        <div 
          style={{ 
            backgroundColor: '#FFFEFA', 
            borderRadius: 'var(--radius-lg)', 
            border: '1px solid #EEDCCA', 
            padding: '1.75rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#332218', margin: 0 }}>
              Enquiries by Occasion
            </h3>
            <span className="badge badge-orange">Demand Breakdown</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {analytics.enquiriesByOccasion.map(({ occasion, count }) => {
              const pct = analytics.totalEnquiries > 0 
                ? Math.round((count / analytics.totalEnquiries) * 100) 
                : 0;
              return (
                <div key={occasion}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.35rem' }}>
                    <strong>{occasion}</strong>
                    <span style={{ color: '#806656' }}>{count} ({pct}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#FFF1DC', borderRadius: '4px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        width: `${pct}%`, 
                        height: '100%', 
                        backgroundColor: '#EA580C',
                        borderRadius: '4px'
                      }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Pipeline Distribution */}
        <div 
          style={{ 
            backgroundColor: '#FFFEFA', 
            borderRadius: 'var(--radius-lg)', 
            border: '1px solid #EEDCCA', 
            padding: '1.75rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#332218', margin: 0 }}>
              Enquiry Status Pipeline
            </h3>
            <span className="badge badge-green">Workflow Health</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {analytics.enquiriesByStatus.map(({ status, count }) => {
              const pct = analytics.totalEnquiries > 0 
                ? Math.round((count / analytics.totalEnquiries) * 100) 
                : 0;
              return (
                <div key={status}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.35rem' }}>
                    <span>{status}</span>
                    <strong style={{ color: '#332218' }}>{count}</strong>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#FFF1DC', borderRadius: '4px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        width: `${pct}%`, 
                        height: '100%', 
                        backgroundColor: status === 'Confirmed' || status === 'Completed' ? '#15803D' : status === 'New' ? '#EA580C' : '#D97706',
                        borderRadius: '4px'
                      }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
