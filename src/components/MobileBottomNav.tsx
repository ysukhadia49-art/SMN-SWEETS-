import React, { useState } from 'react';
import { CustomerPage, ShopSettings, User } from '../types';
import { 
  Home, 
  Sparkles, 
  Flame, 
  Star,
  Package, 
  Menu, 
  X, 
  Gift, 
  Info, 
  Phone, 
  MapPin, 
  ClipboardList, 
  Lock,
  ExternalLink,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { generateDirectShopWhatsAppUrl } from '../utils/whatsapp';

interface MobileBottomNavProps {
  currentPage: CustomerPage;
  onNavigate: (page: CustomerPage) => void;
  settings: ShopSettings;
  onToggleAdmin?: () => void;
  onOpenTracker: () => void;
  currentUser: User | null;
  onLogout: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onNavigate,
  settings,
  onToggleAdmin,
  onOpenTracker,
  currentUser,
  onLogout
}) => {
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const handleItemClick = (page: CustomerPage) => {
    onNavigate(page);
    setMoreMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Mobile Slide-up "More" Sheet */}
      {moreMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(51, 34, 24, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 90,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}
          onClick={() => setMoreMenuOpen(false)}
        >
          <div 
            style={{
              backgroundColor: '#FFFEFA',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              padding: '1.5rem 1.25rem calc(1.5rem + env(safe-area-inset-bottom, 0px))',
              maxHeight: '80vh',
              overflowY: 'auto',
              borderTop: '2px solid #EEDCCA',
              boxShadow: '0 -10px 30px rgba(51, 34, 24, 0.15)'
            }}
            onClick={(e) => e.stopPropagation()}
            className="animate-slide-up"
          >
            {/* Header in sheet */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid #F5EAE0', paddingBottom: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#EA580C', fontWeight: 700, textTransform: 'uppercase' }}>
                  Explore More
                </span>
                <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#332218' }}>
                  Sukhadiya Manilal Nathalal
                </h3>
              </div>
              <button
                onClick={() => setMoreMenuOpen(false)}
                style={{
                  background: '#FFF1DC',
                  border: 'none',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#332218',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Menu Items */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <button
                onClick={() => handleItemClick('sweets')}
                style={{
                  backgroundColor: '#FFF8ED',
                  border: '1px solid #EEDCCA',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '0.4rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <Sparkles size={20} color="#EA580C" />
                  {settings.menuUnderMaintenance && (
                    <span style={{ fontSize: '0.62rem', backgroundColor: '#FEF3C7', color: '#B45309', padding: '0.1rem 0.35rem', borderRadius: 'var(--radius-full)', border: '1px solid #F59E0B', fontWeight: 700 }}>
                      Updating
                    </span>
                  )}
                </div>
                <strong style={{ fontSize: '0.9rem', color: '#332218' }}>Our Sweets</strong>
                <span style={{ fontSize: '0.75rem', color: '#806656' }}>Pure Desi Ghee</span>
              </button>

              <button
                onClick={() => handleItemClick('about')}
                style={{
                  backgroundColor: '#FFF8ED',
                  border: '1px solid #EEDCCA',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '0.4rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <Info size={20} color="#EA580C" />
                <strong style={{ fontSize: '0.9rem', color: '#332218' }}>About Us</strong>
                <span style={{ fontSize: '0.75rem', color: '#806656' }}>Heritage since 1948</span>
              </button>

              <button
                onClick={() => handleItemClick('contact')}
                style={{
                  backgroundColor: '#FFF8ED',
                  border: '1px solid #EEDCCA',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '0.4rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <MapPin size={20} color="#EA580C" />
                <strong style={{ fontSize: '0.9rem', color: '#332218' }}>Shop Location</strong>
                <span style={{ fontSize: '0.75rem', color: '#806656' }}>Manek Chowk counter</span>
              </button>

              <button
                onClick={() => {
                  setMoreMenuOpen(false);
                  onOpenTracker();
                }}
                style={{
                  backgroundColor: '#FFF8ED',
                  border: '1px solid #EEDCCA',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '0.4rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <ClipboardList size={20} color="#EA580C" />
                <strong style={{ fontSize: '0.9rem', color: '#332218' }}>Track Enquiry</strong>
                <span style={{ fontSize: '0.75rem', color: '#806656' }}>Lookup ref ID</span>
              </button>
            </div>

            {/* Direct WhatsApp & Google Ratings Callout */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <button
                onClick={() => handleItemClick('ratings')}
                className="btn btn-secondary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: '#FFFEFA',
                  borderColor: '#EA580C',
                  color: '#EA580C',
                  fontWeight: 700,
                  fontSize: '0.88rem'
                }}
              >
                <Star size={16} fill="#F59E0B" color="#F59E0B" />
                <span>Google Ratings & Reviews (4.9 ★)</span>
              </button>

              <a
                href={generateDirectShopWhatsAppUrl(settings.verifiedWhatsAppNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}
              >
                <Phone size={16} /> Chat on WhatsApp ({settings.verifiedWhatsAppNumber})
              </a>


              {/* Logged in User Card & Sign Out */}
              {currentUser && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFF1DC', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #EEDCCA', marginTop: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    {currentUser.avatarUrl ? (
                      <img 
                        src={currentUser.avatarUrl} 
                        alt={currentUser.name} 
                        style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #EA580C' }} 
                      />
                    ) : (
                      <UserIcon size={18} color="#EA580C" />
                    )}
                    <div>
                      <strong style={{ fontSize: '0.88rem', color: '#332218', display: 'block', lineHeight: 1.2 }}>{currentUser.name}</strong>
                      <span style={{ fontSize: '0.72rem', color: '#806656' }}>{currentUser.email}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMoreMenuOpen(false);
                      onLogout();
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem', color: '#B91C1C' }}
                  >
                    <LogOut size={13} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation Bar on Mobile */}
      <nav
        className="mobile-bottom-bar"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#FFFEFA',
          borderTop: '1px solid #EEDCCA',
          boxShadow: '0 -4px 16px rgba(51, 34, 24, 0.08)',
          zIndex: 80,
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          alignItems: 'center',
          height: 'calc(62px + env(safe-area-inset-bottom, 0px))',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          width: '100%'
        }}
      >
        {/* 1. Home */}
        <button
          onClick={() => handleItemClick('home')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.15rem',
            padding: '0.25rem 0',
            width: '100%',
            minWidth: 0,
            minHeight: '44px',
            color: currentPage === 'home' && !moreMenuOpen ? '#EA580C' : '#806656',
            transition: 'color 0.15s ease'
          }}
        >
          <Home size={20} strokeWidth={currentPage === 'home' && !moreMenuOpen ? 2.4 : 1.8} />
          <span style={{ fontSize: '0.67rem', fontWeight: currentPage === 'home' && !moreMenuOpen ? 700 : 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Home
          </span>
        </button>

        {/* 2. Sweets */}
        <button
          onClick={() => handleItemClick('sweets')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.15rem',
            padding: '0.25rem 0',
            width: '100%',
            minWidth: 0,
            minHeight: '44px',
            color: currentPage === 'sweets' && !moreMenuOpen ? '#EA580C' : '#806656',
            transition: 'color 0.15s ease'
          }}
        >
          <div style={{ position: 'relative', display: 'inline-flex' }}>
            <Sparkles size={20} strokeWidth={currentPage === 'sweets' && !moreMenuOpen ? 2.4 : 1.8} />
            {settings.menuUnderMaintenance && (
              <span
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-4px',
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#F59E0B',
                  borderRadius: '50%',
                  border: '1.5px solid #FFFEFA'
                }}
                title="Menu Under Maintenance"
              />
            )}
          </div>
          <span style={{ fontSize: '0.67rem', fontWeight: currentPage === 'sweets' && !moreMenuOpen ? 700 : 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Sweets
          </span>
        </button>

        {/* 3. Gift Boxes */}
        <button
          onClick={() => handleItemClick('gift-boxes')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.15rem',
            padding: '0.25rem 0',
            width: '100%',
            minWidth: 0,
            minHeight: '44px',
            color: currentPage === 'gift-boxes' && !moreMenuOpen ? '#EA580C' : '#806656',
            transition: 'color 0.15s ease'
          }}
        >
          <Gift size={20} strokeWidth={currentPage === 'gift-boxes' && !moreMenuOpen ? 2.4 : 1.8} />
          <span style={{ fontSize: '0.67rem', fontWeight: currentPage === 'gift-boxes' && !moreMenuOpen ? 700 : 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Gift Boxes
          </span>
        </button>

        {/* 4. Bulk Orders */}
        <button
          onClick={() => handleItemClick('bulk-orders')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.15rem',
            padding: '0.25rem 0',
            width: '100%',
            minWidth: 0,
            minHeight: '44px',
            color: currentPage === 'bulk-orders' && !moreMenuOpen ? '#EA580C' : '#806656',
            transition: 'color 0.15s ease'
          }}
        >
          <Package size={20} strokeWidth={currentPage === 'bulk-orders' && !moreMenuOpen ? 2.4 : 1.8} />
          <span style={{ fontSize: '0.67rem', fontWeight: currentPage === 'bulk-orders' && !moreMenuOpen ? 700 : 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Bulk Order
          </span>
        </button>

        {/* 5. More */}
        <button
          onClick={() => setMoreMenuOpen(!moreMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.15rem',
            padding: '0.25rem 0',
            width: '100%',
            minWidth: 0,
            minHeight: '44px',
            color: moreMenuOpen ? '#EA580C' : '#806656',
            transition: 'color 0.15s ease'
          }}
        >
          <Menu size={20} strokeWidth={moreMenuOpen ? 2.4 : 1.8} />
          <span style={{ fontSize: '0.67rem', fontWeight: moreMenuOpen ? 700 : 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            More
          </span>
        </button>
      </nav>

      {/* Responsive Visibility Style */}
      <style>{`
        @media (min-width: 900px) {
          .mobile-bottom-bar {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
