import React from 'react';
import { CustomerPage, ShopSettings } from '../types';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  Heart, 
  Sparkles,
  Lock
} from 'lucide-react';
import { generateDirectShopWhatsAppUrl } from '../utils/whatsapp';

interface FooterProps {
  onNavigate: (page: CustomerPage) => void;
  settings: ShopSettings;
  onToggleAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, settings }) => {
  return (
    <footer 
      style={{ 
        backgroundColor: '#FFF1DC', 
        borderTop: '1px solid #EEDCCA', 
        color: '#332218',
        paddingTop: '4rem',
        paddingBottom: '2.5rem'
      }}
    >
      <div className="container">
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
            gap: '2.5rem',
            marginBottom: '3rem'
          }}
        >
          {/* Brand & Heritage Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <img 
                src="/images/logo.png" 
                alt="Sukhadiya Manilal Nathalal - SMN Sweets Logo" 
                style={{ 
                  height: '52px', 
                  width: 'auto', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 6px rgba(51, 34, 24, 0.12))'
                }} 
              />
              <div>
                <h3 style={{ fontSize: '1.2rem', margin: 0, color: '#332218' }}>
                  Sukhadiya Manilal Nathalal
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#EA580C', fontWeight: 600 }}>
                  Est. 1948 • Manek Chowk, Ahmedabad
                </span>
              </div>
            </div>
            
            <p style={{ fontSize: '0.92rem', color: '#806656', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Preserving the authentic culinary heritage of Gujarat for generations. We take pride in 
              handcrafting pure desi ghee sweets, celebratory mithai hampers, and exquisite gift boxes.
            </p>

            <div 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                backgroundColor: '#FFFEFA', 
                border: '1px solid #EEDCCA',
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                color: '#15803D',
                fontWeight: 600
              }}
            >
              <ShieldCheck size={16} /> 100% Vegetarian • Pure Desi Ghee
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 
              style={{ 
                fontSize: '1.05rem', 
                marginBottom: '1.25rem', 
                color: '#332218',
                position: 'relative',
                paddingBottom: '0.5rem'
              }}
            >
              Explore Storefront
              <span 
                style={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  width: '32px', 
                  height: '2px', 
                  backgroundColor: '#F97316' 
                }} 
              />
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'sweets', label: 'Traditional Sweets & Mithai' },
                { id: 'gift-boxes', label: 'Festive & Shagun Gift Boxes' },
                { id: 'bulk-orders', label: 'Bulk Orders & Wedding Enquiries' },
                { id: 'ratings', label: 'Google Ratings & Reviews (4.9 ★)' },
                { id: 'about', label: 'Our Story & Heritage' },
                { id: 'contact', label: 'Visit Our Shop' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onNavigate(item.id as CustomerPage);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: '#806656',
                      fontSize: '0.92rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'color 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#EA580C')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#806656')}
                  >
                    → {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit & Contact */}
          <div>
            <h4 
              style={{ 
                fontSize: '1.05rem', 
                marginBottom: '1.25rem', 
                color: '#332218',
                position: 'relative',
                paddingBottom: '0.5rem'
              }}
            >
              Visit Our Shop
              <span 
                style={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  width: '32px', 
                  height: '2px', 
                  backgroundColor: '#F97316' 
                }} 
              />
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', color: '#806656' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <MapPin size={18} color="#EA580C" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#332218' }}>Shop Location:</strong>
                  <br />
                  {settings.address}, {settings.city}, {settings.state} - {settings.pincode}
                  <br />
                  <a 
                    href={settings.googleMapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      color: '#EA580C', 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.25rem',
                      fontWeight: 600,
                      marginTop: '0.3rem',
                      textDecoration: 'none'
                    }}
                  >
                    Open in Google Maps <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Clock size={16} color="#EA580C" style={{ flexShrink: 0 }} />
                <span>{settings.openingHours}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={16} color="#EA580C" style={{ flexShrink: 0 }} />
                <span>Call: {settings.phone}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={16} color="#EA580C" style={{ flexShrink: 0 }} />
                <span>{settings.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Administrative Access */}
        <div 
          style={{ 
            borderTop: '1px solid #EEDCCA', 
            paddingTop: '1.75rem', 
            display: 'flex', 
            flexWrap: 'wrap', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.85rem',
            color: '#806656'
          }}
        >
          <div>
            © {new Date().getFullYear()} Sukhadiya Manilal Nathalal. All rights reserved. Handcrafted in Ahmedabad, Gujarat.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <a 
              href={generateDirectShopWhatsAppUrl(settings.verifiedWhatsAppNumber)} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#15803D', fontWeight: 600, textDecoration: 'none' }}
            >
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
