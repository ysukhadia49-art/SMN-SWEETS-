import React, { useState } from 'react';
import { User, ShopSettings } from '../../types';
import { authService, PRESET_GOOGLE_ACCOUNTS } from '../../services/auth';
import { 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  PlusCircle,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface LoginPageProps {
  settings: ShopSettings;
  onLoginSuccess: (user: User) => void;
  onContinueAsGuest?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ settings, onLoginSuccess, onContinueAsGuest }) => {
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSelectGoogleAccount = (email: string, name?: string, avatarUrl?: string) => {
    setErrorMsg('');
    setLoadingEmail(email);

    setTimeout(() => {
      try {
        const user = authService.loginWithGoogle(email, name, avatarUrl);
        onLoginSuccess(user);
      } catch (err) {
        setErrorMsg('Failed to sign in with Google ID. Please try again.');
        setLoadingEmail(null);
      }
    }, 250);
  };

  const handleCustomGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customEmail.trim() || !customEmail.includes('@')) {
      setErrorMsg('Please enter a valid Google Account email (e.g., yourname@gmail.com).');
      return;
    }

    handleSelectGoogleAccount(customEmail.trim(), customName.trim() || undefined);
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        backgroundColor: '#FFF8ED',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Radial Backdrop */}
      <div 
        style={{
          position: 'absolute',
          top: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '750px',
          height: '750px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.09) 0%, rgba(255, 248, 237, 0) 70%)',
          pointerEvents: 'none'
        }}
      />

      <div 
        style={{ 
          maxWidth: '520px', 
          width: '100%', 
          position: 'relative', 
          zIndex: 1 
        }}
        className="animate-fade-in"
      >
        {/* Brand Emblem & Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div 
            style={{ 
              width: '68px', 
              height: '68px', 
              borderRadius: '50%', 
              backgroundColor: '#FFFEFA', 
              border: '3px solid #EA580C',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#EA580C',
              fontWeight: 800,
              fontSize: '1.75rem',
              fontFamily: 'var(--font-serif)',
              boxShadow: '0 8px 24px rgba(234, 88, 12, 0.2)',
              marginBottom: '0.85rem'
            }}
          >
            SMN
          </div>

          <h1 
            style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: 'clamp(1.6rem, 3.5vw, 2.15rem)', 
              color: '#332218', 
              margin: '0 0 0.35rem 0',
              fontWeight: 800,
              letterSpacing: '-0.01em'
            }}
          >
            Sukhadiya Manilal Nathalal
          </h1>
          
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.45rem', 
              fontSize: '0.82rem', 
              color: '#EA580C', 
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              backgroundColor: '#FFF1DC',
              padding: '0.25rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid #EEDCCA'
            }}
          >
            <Sparkles size={12} />
            <span>Since 1849 • Manek Chowk, Ahmedabad</span>
          </div>
        </div>

        {/* Google Authentication Portal Card */}
        <div 
          style={{ 
            backgroundColor: '#FFFEFA', 
            borderRadius: 'var(--radius-xl)', 
            border: '1px solid #EEDCCA', 
            padding: 'clamp(1.5rem, 3vw, 2.25rem)',
            boxShadow: '0 12px 35px rgba(51, 34, 24, 0.08)'
          }}
        >
          {/* Header Title */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid #E5E7EB',
                marginBottom: '0.75rem'
              }}
            >
              {/* Official Google 'G' Multi-Color SVG */}
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
            </div>

            <h2 
              style={{ 
                margin: '0 0 0.35rem 0', 
                fontSize: '1.45rem', 
                color: '#332218',
                fontWeight: 700 
              }}
            >
              Sign in with Google ID
            </h2>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#806656', lineHeight: 1.45 }}>
              Choose your Google Account to enter our sweet shop directly. No registration or password required.
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div 
              style={{
                backgroundColor: '#FEE2E2',
                color: '#B91C1C',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Quick Google ID Account List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {PRESET_GOOGLE_ACCOUNTS.map((acc) => {
              const isLoadingThis = loadingEmail === acc.email;
              return (
                <button
                  key={acc.id}
                  onClick={() => handleSelectGoogleAccount(acc.email, acc.name, acc.avatarUrl)}
                  disabled={!!loadingEmail}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    padding: '0.75rem 1rem',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #E5E7EB',
                    borderRadius: 'var(--radius-lg)',
                    cursor: loadingEmail ? 'wait' : 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    textAlign: 'left',
                    width: '100%',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                  }}
                  onMouseEnter={(e) => {
                    if (!loadingEmail) {
                      e.currentTarget.style.borderColor = '#EA580C';
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(234, 88, 12, 0.12)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loadingEmail) {
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {/* Account Avatar or Google Logo */}
                  <div 
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      flexShrink: 0,
                      backgroundColor: '#F3F4F6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #EEDCCA'
                    }}
                  >
                    {acc.avatarUrl ? (
                      <img 
                        src={acc.avatarUrl} 
                        alt={acc.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    ) : (
                      <span style={{ fontWeight: 700, color: '#EA580C', fontSize: '1rem' }}>
                        {acc.name.charAt(0)}
                      </span>
                    )}
                  </div>

                  {/* Name and Email Details */}
                  <div style={{ flexGrow: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1F2937', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {acc.name}
                      </span>
                      {acc.badge && (
                        <span 
                          style={{ 
                            fontSize: '0.68rem', 
                            padding: '0.1rem 0.45rem', 
                            backgroundColor: '#FFF1DC', 
                            color: '#EA580C', 
                            fontWeight: 700, 
                            borderRadius: 'var(--radius-full)' 
                          }}
                        >
                          {acc.badge}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {acc.email}
                    </div>
                  </div>

                  {/* Action Chevron or Loading indicator */}
                  <div style={{ flexShrink: 0, color: '#9CA3AF' }}>
                    {isLoadingThis ? (
                      <span style={{ fontSize: '0.78rem', color: '#EA580C', fontWeight: 600 }}>Signing in...</span>
                    ) : (
                      <ArrowRight size={18} color="#EA580C" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Toggle Custom Google ID Input */}
          <div style={{ borderTop: '1px dashed #E5E7EB', paddingTop: '1rem', marginTop: '0.5rem' }}>
            {!showCustomInput ? (
              <button
                type="button"
                onClick={() => setShowCustomInput(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#EA580C',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  width: '100%',
                  padding: '0.4rem'
                }}
              >
                <PlusCircle size={16} />
                <span>Use another Google account</span>
              </button>
            ) : (
              <form onSubmit={handleCustomGoogleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#332218', marginBottom: '0.35rem' }}>
                    Your Google Email ID
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. yourname@gmail.com"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    required
                    className="form-input"
                    style={{ fontSize: '0.92rem' }}
                    autoFocus
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#332218', marginBottom: '0.35rem' }}>
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Yug Sukhadia"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="form-input"
                    style={{ fontSize: '0.92rem' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <button
                    type="submit"
                    disabled={!!loadingEmail}
                    className="btn btn-primary"
                    style={{ flexGrow: 1, justifyContent: 'center' }}
                  >
                    {loadingEmail ? 'Connecting...' : 'Sign in with this Google ID'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCustomInput(false);
                      setErrorMsg('');
                    }}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Optional Guest Browsing */}
          {onContinueAsGuest && (
            <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
              <button
                type="button"
                onClick={onContinueAsGuest}
                className="btn btn-outline"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  borderColor: '#EEDCCA',
                  color: '#806656',
                  backgroundColor: '#FFF8ED',
                  padding: '0.65rem 1rem',
                  fontSize: '0.88rem',
                  fontWeight: 600
                }}
              >
                <span>Browse Catalogue as Guest (અતિથિ તરીકે મુલાકાત)</span>
                <ArrowRight size={15} color="#EA580C" />
              </button>
            </div>
          )}

          {/* Purity Guarantee & Safe Auth Footer */}
          <div 
            style={{ 
              marginTop: '1.5rem', 
              paddingTop: '1rem', 
              borderTop: '1px solid #F3F4F6', 
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              color: '#6B7280',
              fontSize: '0.78rem'
            }}
          >
            <ShieldCheck size={14} color="#15803D" />
            <span>Direct Google ID Access • Pure Desi Ghee Mithai Since 1849</span>
          </div>
        </div>

        {/* Store Location Footer */}
        <div 
          style={{ 
            marginTop: '1.5rem', 
            textAlign: 'center', 
            color: '#806656', 
            fontSize: '0.82rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem'
          }}
        >
          <MapPin size={14} color="#EA580C" />
          <span>Shop No. 9, 10, 11, Kandoi Ol, Manek Chowk, Ahmedabad</span>
        </div>
      </div>
    </div>
  );
};
