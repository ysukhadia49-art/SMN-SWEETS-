import React, { useState, useEffect, useRef } from 'react';
import { User, ShopSettings } from '../../types';
import { authService, decodeGoogleJwt } from '../../services/auth';
import { GOOGLE_AUTH_CONFIG } from '../../config/googleAuth';
import { 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  AlertCircle,
  Mail,
  Info
} from 'lucide-react';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (parent: HTMLElement, options: any) => void;
          prompt: (notification?: any) => void;
          cancel?: () => void;
        };
      };
    };
  }
}

interface LoginPageProps {
  settings: ShopSettings;
  onLoginSuccess: (user: User) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ settings, onLoginSuccess }) => {
  const [gmailInput, setGmailInput] = useState('');
  const [userNameInput, setUserNameInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [gisLoaded, setGisLoaded] = useState(false);
  const googleBtnContainerRef = useRef<HTMLDivElement>(null);

  // Handle Google Identity Services (GIS) Token Callback
  const handleCredentialResponse = (response: { credential?: string }) => {
    setErrorMsg('');
    if (!response?.credential) {
      setErrorMsg('No credential returned from Google. Please try again.');
      return;
    }

    try {
      setIsLoading(true);
      const payload = decodeGoogleJwt(response.credential);
      if (!payload || !payload.email) {
        throw new Error('Unable to verify Google credential.');
      }

      // Log in or register user using their verified Google identity
      const loggedInUser = authService.loginWithGoogle(
        payload.email,
        payload.name || payload.given_name,
        payload.picture
      );

      onLoginSuccess(loggedInUser);
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      setErrorMsg(err.message || 'Failed to authenticate with Google. Please try again.');
      setIsLoading(false);
    }
  };

  // Mount Google Identity Services Button
  useEffect(() => {
    let checkInterval: any = null;

    const initGis = () => {
      if (window.google?.accounts?.id && googleBtnContainerRef.current) {
        try {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_AUTH_CONFIG.clientId,
            callback: handleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
          });

          // Render the official Google Sign-In button
          googleBtnContainerRef.current.innerHTML = '';
          window.google.accounts.id.renderButton(googleBtnContainerRef.current, {
            type: 'standard',
            shape: 'pill',
            theme: 'outline',
            text: 'continue_with',
            size: 'large',
            logo_alignment: 'left',
            width: 320
          });

          setGisLoaded(true);

          // Prompt One-Tap if eligible
          try {
            window.google.accounts.id.prompt();
          } catch (_) {}

          return true;
        } catch (e) {
          console.warn('GIS init error:', e);
          return false;
        }
      }
      return false;
    };

    if (!initGis()) {
      checkInterval = setInterval(() => {
        if (initGis()) {
          clearInterval(checkInterval);
        }
      }, 300);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, []);

  // Direct Gmail Submit Handler
  const handleDirectGmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanEmail = gmailInput.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMsg('Please enter a valid Gmail address (e.g., yourname@gmail.com).');
      return;
    }

    // Require a Google account address (@gmail.com or googlemail.com)
    if (!cleanEmail.endsWith('@gmail.com') && !cleanEmail.endsWith('@googlemail.com') && !cleanEmail.includes('google')) {
      setErrorMsg('Only Google / Gmail accounts are permitted. Please use your @gmail.com address.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      try {
        const user = authService.loginWithGoogle(cleanEmail, userNameInput.trim() || undefined);
        onLoginSuccess(user);
      } catch (err) {
        setErrorMsg('Failed to sign in with Gmail. Please try again.');
        setIsLoading(false);
      }
    }, 300);
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
          maxWidth: '480px', 
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
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
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
              Sign in with Gmail
            </h2>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#806656', lineHeight: 1.45 }}>
              Authentication is required to visit our sweet shop catalogue. Please sign in with your Google / Gmail account.
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
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Official Google Identity Services Button Target */}
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center',
              minHeight: '48px',
              marginBottom: '1.25rem' 
            }}
          >
            <div 
              id="googleSignInDiv" 
              ref={googleBtnContainerRef}
              style={{ minHeight: '44px', display: 'flex', justifyContent: 'center' }}
            />
            {!gisLoaded && (
              <div style={{ fontSize: '0.8rem', color: '#9CA3AF', marginTop: '0.35rem' }}>
                Connecting to Google Identity Services...
              </div>
            )}
          </div>

          {/* Divider */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              margin: '1.25rem 0 1rem 0' 
            }}
          >
            <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
            <span style={{ fontSize: '0.78rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              or enter gmail address
            </span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
          </div>

          {/* Direct Gmail Input Form */}
          <form onSubmit={handleDirectGmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <label 
                htmlFor="gmail-address-input"
                style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#332218', marginBottom: '0.35rem' }}
              >
                Gmail Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail 
                  size={16} 
                  color="#9CA3AF" 
                  style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} 
                />
                <input
                  id="gmail-address-input"
                  type="email"
                  placeholder="yourname@gmail.com"
                  value={gmailInput}
                  onChange={(e) => setGmailInput(e.target.value)}
                  required
                  className="form-input"
                  style={{ paddingLeft: '2.5rem', fontSize: '0.92rem' }}
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor="gmail-name-input"
                style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#332218', marginBottom: '0.35rem' }}
              >
                Your Name <span style={{ fontWeight: 400, color: '#9CA3AF' }}>(Optional)</span>
              </label>
              <input
                id="gmail-name-input"
                type="text"
                placeholder="e.g. Yug Sukhadia"
                value={userNameInput}
                onChange={(e) => setUserNameInput(e.target.value)}
                className="form-input"
                style={{ fontSize: '0.92rem' }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
              style={{ 
                width: '100%', 
                justifyContent: 'center', 
                padding: '0.75rem 1rem', 
                fontSize: '0.92rem',
                fontWeight: 700,
                marginTop: '0.25rem'
              }}
            >
              {isLoading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign in with Gmail</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Quick Notice for OAuth setup */}
          <div 
            style={{
              marginTop: '1.25rem',
              padding: '0.65rem 0.85rem',
              backgroundColor: '#FFF8ED',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #FDE68A',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem',
              fontSize: '0.75rem',
              color: '#806656',
              lineHeight: 1.4
            }}
          >
            <Info size={14} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Secure Google Sign-In:</strong> Connected to Google OAuth Client (<code style={{ fontSize: '0.72rem', backgroundColor: '#FEF3C7', padding: '1px 3px', borderRadius: '3px' }}>neural-ripple-492807-u2</code>).
            </div>
          </div>

          {/* Purity Guarantee Footer */}
          <div 
            style={{ 
              marginTop: '1.25rem', 
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
            <span>Pure Desi Ghee Mithai & Farsan Since 1849</span>
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
