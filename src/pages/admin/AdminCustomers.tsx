import React, { useState } from 'react';
import { CustomerContact, ShopSettings } from '../../types';
import { generateDirectShopWhatsAppUrl } from '../../utils/whatsapp';
import { Users, Search, Phone, Mail, Calendar, Sparkles } from 'lucide-react';

interface AdminCustomersProps {
  contacts: CustomerContact[];
  settings: ShopSettings;
}

export const AdminCustomers: React.FC<AdminCustomersProps> = ({ contacts, settings }) => {
  const [search, setSearch] = useState('');

  const filtered = contacts.filter(c => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      (c.email && c.email.toLowerCase().includes(q))
    );
  });

  return (
    <div className="animate-fade-in" style={{ padding: 'clamp(1rem, 2.5vw, 2rem)' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', color: '#332218', margin: 0 }}>
            Customers & Event Contacts
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#806656', margin: '0.25rem 0 0' }}>
            Verified customer contacts captured from bulk orders, wedding enquiries, and store messages.
          </p>
        </div>

        <div className="badge badge-orange" style={{ padding: '0.5rem 1rem' }}>
          {contacts.length} Total Contact Records
        </div>
      </div>

      {/* Search Bar */}
      <div 
        style={{ 
          backgroundColor: '#FFFEFA', 
          border: '1px solid #EEDCCA', 
          borderRadius: 'var(--radius-lg)', 
          padding: '1rem 1.25rem',
          marginBottom: '1.75rem',
          maxWidth: '450px',
          position: 'relative'
        }}
      >
        <input
          type="text"
          placeholder="Search by customer name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input"
          style={{ paddingLeft: '2.5rem' }}
        />
        <Search size={18} color="#806656" style={{ position: 'absolute', left: '2rem', top: '50%', transform: 'translateY(-50%)' }} />
      </div>

      {/* Table */}
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
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#FFF1DC', color: '#806656', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '0.85rem 1rem' }}>Customer Name</th>
                <th style={{ padding: '0.85rem 1rem' }}>Phone Number</th>
                <th style={{ padding: '0.85rem 1rem' }}>Email</th>
                <th style={{ padding: '0.85rem 1rem' }}>Enquiries Logged</th>
                <th style={{ padding: '0.85rem 1rem' }}>Last Enquiry Date</th>
                <th style={{ padding: '0.85rem 1rem' }}>Occasions</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Direct Contact</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((contact) => (
                <tr key={contact.id} style={{ borderBottom: '1px solid #F5EAE0' }}>
                  <td style={{ padding: '1rem', fontWeight: 700, color: '#332218' }}>
                    {contact.name}
                  </td>
                  <td style={{ padding: '1rem', color: '#806656' }}>
                    {contact.phone}
                  </td>
                  <td style={{ padding: '1rem', color: '#806656' }}>
                    {contact.email || '—'}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span className="badge badge-orange">
                      {contact.totalEnquiries} {contact.totalEnquiries === 1 ? 'Enquiry' : 'Enquiries'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: '#806656', fontSize: '0.85rem' }}>
                    {new Date(contact.lastEnquiryDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                      {contact.occasions.map((occ) => (
                        <span key={occ} className="badge badge-cream" style={{ fontSize: '0.72rem' }}>
                          {occ}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <a
                      href={`https://wa.me/${contact.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${contact.name}! Reaching out from Sukhadiya Manilal Nathalal regarding your sweet shop enquiry.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp btn-sm"
                      style={{ textDecoration: 'none', padding: '0.35rem 0.65rem' }}
                      title="Open WhatsApp with customer"
                    >
                      <Phone size={13} /> WhatsApp
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
