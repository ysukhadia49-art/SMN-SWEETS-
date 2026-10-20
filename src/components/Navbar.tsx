import React, { useState } from 'react';
import { CustomerPage, ShopSettings, User } from '../types';
import { 
  Sparkles, 
  Phone, 
  MapPin, 
  Search, 
  ShieldCheck, 
  Menu, 
  X, 
  ChevronRight,
  ClipboardList,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { generateDirectShopWhatsAppUrl } from '../utils/whatsapp';

interface NavbarProps {
  currentPage: CustomerPage;
  onNavigate: (page: CustomerPage) => void;
  settings: ShopSettings;
  isAdmin: boolean;
  onToggleAdmin?: () => void;
  onOpenTracker: () => void;
  currentUser: User | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  settings,
  isAdmin,
  onToggleAdmin,
  onOpenTracker,
  currentUser,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: CustomerPage; label: string; guLabel: string }[] = [
    { id: 'home', label: 'Home', guLabel: 'મુખ્ય પૃષ્ઠ' },
    { id: 'sweets', label: 'Our Sweets', guLabel: 'મીઠાઈઓ' },
    { id: 'gift-boxes', label: 'Gift Boxes', guLabel: 'ગિફ્ટ બોક્સ' },
    { id: 'bulk-orders', label: 'Bulk Orders', guLabel: 'બલ્ક ઓર્ડર' },
    { id: 'ratings', label: 'Ratings', guLabel: 'રેટિંગ્સ' },
    { id: 'about', label: 'About Us', guLabel: 'અમારા વિશે' },
    { id: 'contact', label: 'Contact', guLabel: 'સંપર્ક' }
  ];

  const handleNavClick = (page: CustomerPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, width: '100%' }}>
      {/* Top Heritage Notice Bar */}
      <div 
        style={{ 
          backgroundColor: '#332218', 
          color: '#FFF1DC', 
          fontSize: '0.8rem', 
          padding: '0.45rem 1rem', 
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.25rem',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Sparkles size={14} color="#F97316" />
          <span>Tradition in Every Bite • Pure Desi Ghee Sweets & Festive Gift Boxes</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0.85 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <MapPin size={13} color="#F97316" /> Manek Chowk, Ahmedabad
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <ShieldCheck size={13} color="#22C55E" /> 100% Vegetarian
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        style={{ 
          backgroundColor: '#FFFEFA', 
          borderBottom: '1px solid #EEDCCA', 
          boxShadow: '0 2px 10px rgba(51, 34, 24, 0.04)',
          transition: 'all 0.2s ease'
        }}
      >
        <div 
          className="container"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            paddingTop: '0.85rem',
            paddingBottom: '0.85rem'
          }}
        >
          {/* Brand Logo & Heritage Title */}
          <button
            onClick={() => handleNavClick('home')}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.85rem',
              textAlign: 'left',
              padding: 0
            }}
          >
            {/* Traditional Emblem */}
            <div 
              style={{ 
                width: '46px', 
                height: '46px', 
                borderRadius: '50%', 
                backgroundColor: '#FFF1DC', 
                border: '2px solid #F97316',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#EA580C',
                fontWeight: 'bold',
                fontSize: '1.35rem',
                fontFamily: 'var(--font-serif)',
                boxShadow: '0 2px 8px rgba(249, 115, 22, 0.2)'
              }}
            >
              SMN
            </div>
            <div>
              <div 
                style={{ 
                  fontFamily: 'var(--font-serif)', 
                  fontWeight: 800, 
                  fontSize: '1.25rem', 
                  color: '#332218',
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em'
                }}
              >
                Sukhadiya Manilal Nathalal
              </div>
              <div 
                style={{ 
                  fontSize: '0.72rem', 
                  fontWeight: 600, 
                  letterSpacing: '0.08em', 
                  color: '#EA580C', 
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  marginTop: '0.15rem'
                }}
              >
                <span>Pure Mithai & Gift Hampers</span>
                <span>•</span>
                <span>Manek Chowk, Ahmedabad</span>
              </div>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <div 
            style={{ 
              display: 'none', 
              alignItems: 'center', 
              gap: '0.3rem'
            }}
            className="desktop-nav"
          >
            {navItems.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    background: active ? '#FFF1DC' : 'transparent',
                    border: 'none',
                    color: active ? '#EA580C' : '#332218',
                    fontWeight: active ? 700 : 500,
                    fontSize: '0.92rem',
                    padding: '0.55rem 0.95rem',
                    borderRadius: 'var(--radius-full)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.color = '#F97316';
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.color = '#332218';
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {/* Track Bulk Enquiry Button */}
            <button
              onClick={onOpenTracker}
              title="Track submitted bulk order enquiry"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: '#FFF8ED',
                color: '#806656',
                border: '1px solid #EEDCCA',
                padding: '0.45rem 0.8rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#F97316';
                e.currentTarget.style.color = '#EA580C';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#EEDCCA';
                e.currentTarget.style.color = '#806656';
              }}
            >
              <ClipboardList size={15} color="#EA580C" />
              <span className="hide-on-mobile">Track Enquiry</span>
            </button>

            {/* Direct WhatsApp Contact */}
            <a
              href={generateDirectShopWhatsAppUrl(settings.verifiedWhatsAppNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}
              title="Enquire directly on shop WhatsApp"
            >
              <Phone size={14} />
              <span className="hide-on-mobile">WhatsApp</span>
            </a>

            {/* Authenticated User Status */}
            {currentUser && (
              <div 
                className="hide-on-mobile"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: '#FFF1DC',
                  border: '1px solid #EEDCCA',
                  padding: '0.35rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.78rem',
                  color: '#332218'
                }}
              >
                {currentUser.avatarUrl ? (
                  <img 
                    src={currentUser.avatarUrl} 
                    alt={currentUser.name} 
                    style={{ width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover' }} 
                  />
                ) : (
                  <UserIcon size={13} color="#EA580C" />
                )}
                <span style={{ fontWeight: 700, maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {currentUser.name}
                </span>
                {currentUser.role === 'admin' && onToggleAdmin && (
                  <button
                    onClick={onToggleAdmin}
                    style={{
                      backgroundColor: '#EA580C',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      marginLeft: '0.2rem'
                    }}
                    title="Open Shop Owner Admin Dashboard"
                  >
                    <ShieldCheck size={12} />
                    <span>Admin</span>
                  </button>
                )}
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '2px',
                    cursor: 'pointer',
                    color: '#806656',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#B91C1C')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#806656')}
                >
                  <LogOut size={13} />
                </button>
              </div>
            )}

            {!currentUser && (
              <button
                onClick={onLogout}
                className="btn btn-outline btn-sm hide-on-mobile"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  borderColor: '#EEDCCA',
                  fontSize: '0.78rem',
                  padding: '0.35rem 0.75rem',
                  backgroundColor: '#FFFFFF',
                  color: '#332218'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                <span>Google Sign In</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: '#FFF1DC',
                border: '1px solid #EEDCCA',
                color: '#332218',
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              className="mobile-toggle"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div 
            style={{ 
              backgroundColor: '#FFFEFA', 
              borderTop: '1px solid #EEDCCA', 
              padding: '1rem 1.5rem 1.5rem',
              boxShadow: '0 10px 25px rgba(51, 34, 24, 0.1)'
            }}
            className="animate-fade-in"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navItems.map((item) => {
                const active = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: active ? '#FFF1DC' : 'transparent',
                      border: 'none',
                      color: active ? '#EA580C' : '#332218',
                      fontWeight: active ? 700 : 500,
                      fontSize: '1rem',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span>{item.label}</span>
                    <span style={{ fontSize: '0.85rem', color: '#806656' }}>{item.guLabel}</span>
                  </button>
                );
              })}

              <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #EEDCCA', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTracker();
                  }}
                  className="btn btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <ClipboardList size={16} /> Track Bulk Order Enquiry
                </button>
                {currentUser?.role === 'admin' && onToggleAdmin && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onToggleAdmin();
                    }}
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem' }}
                  >
                    <ShieldCheck size={16} /> Open Shop Admin Dashboard
                  </button>
                )}
                {currentUser && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFF1DC', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #EEDCCA' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.86rem' }}>
                      <UserIcon size={16} color="#EA580C" />
                      <div>
                        <strong style={{ color: '#332218', display: 'block', lineHeight: 1.2 }}>{currentUser.name}</strong>
                        <span style={{ fontSize: '0.72rem', color: '#806656' }}>{currentUser.phone}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onLogout();
                      }}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }}
                    >
                      <LogOut size={13} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
        @media (max-width: 600px) {
          .hide-on-mobile {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
