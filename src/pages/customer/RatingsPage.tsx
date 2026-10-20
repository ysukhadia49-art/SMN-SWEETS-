import React, { useState, useEffect } from 'react';
import { ShopSettings } from '../../types';
import { 
  Star, 
  ExternalLink, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  MessageSquare,
  ThumbsUp,
  CheckCircle2
} from 'lucide-react';

interface RatingsPageProps {
  settings: ShopSettings;
}

interface ReviewItem {
  id: string;
  author: string;
  tag: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  avatarBg: string;
}

const FEATURED_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Anandbhai Patel',
    tag: 'Local Guide • 48 Reviews',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Best Mohanthal and Kaju Katli in Ahmedabad! The aroma and richness of pure desi ghee has remained unchanged for decades. A must-visit sweet counter in historic Manek Chowk.',
    verified: true,
    avatarBg: '#EA580C'
  },
  {
    id: 'rev-2',
    author: 'Hitesh & Meera Shah',
    tag: 'Wedding Client • Ahmedabad',
    rating: 5,
    date: '1 month ago',
    comment: 'We ordered over 250 wedding gift boxes for our daughter’s marriage. The sweets were extremely fresh, packaging was royal and premium, and every guest praised the pure ghee taste.',
    verified: true,
    avatarBg: '#D97706'
  },
  {
    id: 'rev-3',
    author: 'Priya Mehta',
    tag: 'Food Enthusiast',
    rating: 5,
    date: '3 weeks ago',
    comment: 'Their Pista Ghari, Dryfruit Halwa, and Kaju Peda are unmatched. You can taste the genuine purity. Warm and courteous customer service every time.',
    verified: true,
    avatarBg: '#B45309'
  },
  {
    id: 'rev-4',
    author: 'Rajesh Vora',
    tag: 'Regular Customer since 1994',
    rating: 5,
    date: '2 months ago',
    comment: 'Authentic 7-decade legacy shop. My grandfather used to purchase Diwali sweets from here and today our third generation continues the tradition. 5 stars without hesitation.',
    verified: true,
    avatarBg: '#EA580C'
  }
];

export const RatingsPage: React.FC<RatingsPageProps> = ({ settings }) => {
  const [selectedStars, setSelectedStars] = useState<number>(5);
  const [hoveredStars, setHoveredStars] = useState<number>(0);
  const [redirectCount, setRedirectCount] = useState<number>(5);
  const [isAutoRedirecting, setIsAutoRedirecting] = useState<boolean>(false);

  // Auto-redirect timer if initiated
  useEffect(() => {
    let timer: any = null;
    if (isAutoRedirecting && redirectCount > 0) {
      timer = setTimeout(() => {
        setRedirectCount(prev => prev - 1);
      }, 1000);
    } else if (isAutoRedirecting && redirectCount === 0) {
      window.open(settings.googleMapsUrl, '_blank', 'noopener,noreferrer');
      setIsAutoRedirecting(false);
      setRedirectCount(5);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isAutoRedirecting, redirectCount, settings.googleMapsUrl]);

  const handleOpenGoogleReview = () => {
    window.open(settings.googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#FFF8ED', minHeight: '85vh', paddingBottom: '5rem' }}>
      {/* Header Banner */}
      <section 
        style={{ 
          backgroundColor: '#FFF1DC', 
          borderBottom: '1px solid #EEDCCA', 
          padding: 'clamp(3rem, 5vw, 4.5rem) 1.5rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: '-30%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '650px',
            height: '650px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, rgba(255, 241, 220, 0) 70%)',
            pointerEvents: 'none'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '750px', margin: '0 auto' }}>
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.45rem', 
              backgroundColor: '#FFFEFA', 
              border: '1px solid #EEDCCA',
              padding: '0.35rem 0.95rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              color: '#EA580C',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '1rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
            }}
          >
            <Sparkles size={14} />
            <span>Verified Customer Ratings & Google Reviews</span>
          </div>

          <h1 
            style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              color: '#332218', 
              margin: '0 0 1rem 0',
              fontWeight: 800,
              letterSpacing: '-0.01em'
            }}
          >
            Customer Love & Google Ratings
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#806656', lineHeight: 1.6, margin: '0 auto 2rem', maxWidth: '620px' }}>
            Serving pure desi ghee sweets in Manek Chowk, Ahmedabad since 1849. 
            Read our verified community feedback and share your own experience on Google Maps.
          </p>

          {/* Google Summary Scorecard */}
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '1.5rem', 
              backgroundColor: '#FFFEFA', 
              padding: '1.25rem 2rem', 
              borderRadius: 'var(--radius-xl)', 
              border: '1px solid #EEDCCA',
              boxShadow: '0 10px 30px rgba(51, 34, 24, 0.08)',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            {/* Google G Logo & Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <svg width="34" height="34" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <div style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 800, color: '#332218', lineHeight: 1 }}>4.9</span>
                  <span style={{ fontSize: '1rem', color: '#806656', fontWeight: 600 }}>/ 5.0</span>
                </div>
                <div style={{ display: 'flex', gap: '0.2rem', marginTop: '0.2rem' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={15} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
              </div>
            </div>

            <div style={{ height: '36px', width: '1px', backgroundColor: '#EEDCCA' }} />

            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, color: '#332218', fontSize: '0.95rem' }}>
                Sukhadiya Manilal Nathalal
              </div>
              <div style={{ fontSize: '0.8rem', color: '#806656', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <MapPin size={12} color="#EA580C" /> Manek Chowk, Ahmedabad
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Review Portal Section */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          {/* Rate Us Action Card */}
          <div 
            style={{ 
              backgroundColor: '#FFFEFA', 
              borderRadius: 'var(--radius-xl)', 
              border: '2px solid #EA580C', 
              padding: 'clamp(2rem, 4vw, 2.75rem)',
              boxShadow: '0 12px 35px rgba(234, 88, 12, 0.1)',
              marginBottom: '3rem',
              textAlign: 'center',
              position: 'relative'
            }}
          >
            <div 
              style={{
                position: 'absolute',
                top: '-14px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#EA580C',
                color: '#FFF8ED',
                padding: '0.25rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}
            >
              Direct Google Map Review
            </div>

            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#332218', margin: '0.5rem 0 0.5rem 0' }}>
              Rate Your Experience on Google Maps
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#806656', maxWidth: '580px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
              Your feedback helps us preserve our 7-decade tradition of unmatched pure desi ghee sweets and warm hospitality.
            </p>

            {/* Interactive Star Picker */}
            <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginBottom: '1.75rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#806656', fontWeight: 600 }}>
                Select your rating:
              </span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[1, 2, 3, 4, 5].map((starVal) => {
                  const isFilled = (hoveredStars || selectedStars) >= starVal;
                  return (
                    <button
                      key={starVal}
                      type="button"
                      onMouseEnter={() => setHoveredStars(starVal)}
                      onMouseLeave={() => setHoveredStars(0)}
                      onClick={() => setSelectedStars(starVal)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.35rem',
                        transition: 'transform 0.15s ease'
                      }}
                      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.85)')}
                      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
                    >
                      <Star 
                        size={36} 
                        fill={isFilled ? '#F59E0B' : 'transparent'} 
                        color={isFilled ? '#F59E0B' : '#D1D5DB'}
                        strokeWidth={1.5}
                      />
                    </button>
                  );
                })}
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#EA580C' }}>
                {selectedStars === 5 ? '★★★★★ Excellent (5.0)' : `${selectedStars}.0 Stars Selected`}
              </span>
            </div>

            {/* Direct Google Maps Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
              <button
                onClick={handleOpenGoogleReview}
                className="btn btn-primary btn-lg"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  fontSize: '1.05rem',
                  padding: '0.9rem 2rem',
                  boxShadow: '0 4px 15px rgba(234, 88, 12, 0.3)'
                }}
              >
                <span>Write a Google Map Review</span>
                <ExternalLink size={18} />
              </button>

              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none'
                }}
              >
                <MapPin size={17} color="#EA580C" />
                <span>Open Google Maps Listing</span>
              </a>
            </div>

            {/* Auto Redirect Helper */}
            <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px dashed #EEDCCA' }}>
              {!isAutoRedirecting ? (
                <button
                  type="button"
                  onClick={() => setIsAutoRedirecting(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#806656',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Click here to automatically redirect to Google Maps reviews in 5 seconds
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontSize: '0.88rem', color: '#EA580C', fontWeight: 600 }}>
                  <span>Redirecting to Google Maps Review in {redirectCount}s...</span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAutoRedirecting(false);
                      setRedirectCount(5);
                    }}
                    style={{
                      background: '#FFF1DC',
                      border: '1px solid #EEDCCA',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.75rem',
                      color: '#332218',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Verified Customer Testimonials Grid */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.45rem', color: '#332218', margin: 0 }}>
                  Recent Google Reviews
                </h3>
                <span style={{ fontSize: '0.85rem', color: '#806656' }}>
                  Verified experiences from patrons in Ahmedabad & across India
                </span>
              </div>

              <button
                onClick={handleOpenGoogleReview}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#EA580C',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <span>View all reviews on Google</span>
                <ArrowRight size={15} />
              </button>
            </div>

            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '1.5rem' 
              }}
            >
              {FEATURED_REVIEWS.map((rev) => (
                <div 
                  key={rev.id}
                  style={{
                    backgroundColor: '#FFFEFA',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid #EEDCCA',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 10px rgba(51, 34, 24, 0.04)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(234, 88, 12, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(51, 34, 24, 0.04)';
                  }}
                >
                  <div>
                    {/* Header: Author & Stars */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div 
                          style={{ 
                            width: '38px', 
                            height: '38px', 
                            borderRadius: '50%', 
                            backgroundColor: rev.avatarBg, 
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '0.95rem'
                          }}
                        >
                          {rev.author.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#332218' }}>
                            {rev.author}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#806656' }}>
                            {rev.tag}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '1px' }}>
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                        ))}
                      </div>
                    </div>

                    <p style={{ fontSize: '0.88rem', color: '#553E30', lineHeight: 1.55, margin: 0 }}>
                      "{rev.comment}"
                    </p>
                  </div>

                  {/* Verification Footer */}
                  <div 
                    style={{ 
                      marginTop: '1.25rem', 
                      paddingTop: '0.75rem', 
                      borderTop: '1px solid #FFF1DC',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.75rem',
                      color: '#9CA3AF'
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#15803D', fontWeight: 600 }}>
                      <CheckCircle2 size={13} /> Verified Google Review
                    </span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shop Location & Directions Card */}
          <div 
            style={{ 
              backgroundColor: '#FFF1DC', 
              borderRadius: 'var(--radius-xl)', 
              border: '1px solid #EEDCCA', 
              padding: '1.75rem 2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.25rem'
            }}
          >
            <div>
              <h4 style={{ fontSize: '1.15rem', color: '#332218', margin: '0 0 0.35rem 0' }}>
                Visit our Historic Manek Chowk Counter
              </h4>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#806656' }}>
                Shop No. 9, 10, 11, Kandoi Ol, Manek Chowk, Ahmedabad, Gujarat 380001
              </p>
            </div>

            <a
              href={settings.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
            >
              <MapPin size={16} />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
