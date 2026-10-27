import React from 'react';
import { ShopSettings } from '../types';
import { generateDirectShopWhatsAppUrl } from '../utils/whatsapp';
import { AlertTriangle, Phone, MessageSquare, Clock, MapPin, Sparkles } from 'lucide-react';

interface MenuMaintenanceBannerProps {
  settings: ShopSettings;
  onNavigateBulk?: () => void;
}

export const MenuMaintenanceBanner: React.FC<MenuMaintenanceBannerProps> = ({
  settings,
  onNavigateBulk
}) => {
  if (!settings.menuUnderMaintenance) return null;

  const whatsappUrl = generateDirectShopWhatsAppUrl(
    settings.verifiedWhatsAppNumber,
    "Hello Sukhadiya Manilal Nathalal! I saw that the online menu is currently under maintenance. Could you please share today's available fresh sweets, rates, and special items?"
  );

  return (
    <div 
      className="animate-fade-in"
      style={{
        backgroundColor: '#FFFBEB',
        border: '1px solid #FDE68A',
        borderRadius: 'var(--radius-xl)',
        padding: 'clamp(1.5rem, 3vw, 2.25rem)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '2.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative accent background pill */}
      <div 
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          backgroundColor: 'rgba(245, 158, 11, 0.08)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Status Pill & Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#FEF3C7', border: '1px solid #F59E0B', color: '#92400E', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            <AlertTriangle size={15} color="#D97706" />
            <span>Menu Temporarily Under Maintenance</span>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#806656', fontSize: '0.85rem', fontWeight: 600 }}>
            <Clock size={15} color="#EA580C" />
            <span>Store Open: 8:00 AM – 10:30 PM Daily</span>
          </div>
        </div>

        {/* Title and Explanation */}
        <div>
          <h2 style={{ fontSize: 'clamp(1.35rem, 2.5vw, 1.85rem)', color: '#332218', margin: '0 0 0.5rem', fontWeight: 800 }}>
            Our Sweet Catalog & Daily Rates are Updating
          </h2>
          <p style={{ fontSize: '0.98rem', color: '#806656', lineHeight: 1.6, margin: 0, maxWidth: '820px' }}>
            {settings.menuMaintenanceMessage || 
              "Our online menu and pricing are temporarily under maintenance while we update our fresh daily batch selections. Our Manek Chowk store is open, and direct orders via WhatsApp and Phone are actively accepted!"}
          </p>
          <div style={{ marginTop: '0.4rem', fontSize: '0.9rem', color: '#B45309', fontWeight: 600 }}>
            ગુજરાતી: મેનૂ અને દૈનિક ભાવ પત્રક અપડેટ થઈ રહ્યું છે. તાજી મીઠાઈઓ અને ઓર્ડર માટે કૃપા કરીને સીધો વ્હોટ્સએપ અથવા ફોન પર સંપર્ક કરો.
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', paddingTop: '0.5rem' }}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.35rem', fontWeight: 700 }}
          >
            <MessageSquare size={18} />
            <span>Ask Today's Fresh Sweets on WhatsApp</span>
          </a>

          <a
            href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
            className="btn btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', fontWeight: 700 }}
          >
            <Phone size={18} />
            <span>Call Store ({settings.phone})</span>
          </a>

          {onNavigateBulk && (
            <button
              onClick={onNavigateBulk}
              className="btn btn-outline"
              style={{ padding: '0.75rem 1.25rem' }}
            >
              Bulk / Wedding Enquiry
            </button>
          )}

          <a
            href={settings.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.75rem 1.1rem' }}
          >
            <MapPin size={16} />
            <span>Visit Manek Chowk Store</span>
          </a>
        </div>
      </div>
    </div>
  );
};
