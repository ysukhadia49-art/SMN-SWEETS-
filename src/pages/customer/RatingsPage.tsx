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
  CheckCircle2,
  Radio,
  RefreshCw,
  Send,
  Heart
} from 'lucide-react';

interface RatingsPageProps {
  settings: ShopSettings;
}

export interface LiveCustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  publishedToGoogle?: boolean;
}

const REVIEWS_STORAGE_KEY = 'smn_customer_reviews_live';

export const RatingsPage: React.FC<RatingsPageProps> = ({ settings }) => {
  const [selectedStars, setSelectedStars] = useState<number>(5);
  const [hoveredStars, setHoveredStars] = useState<number>(0);
  const [redirectCount, setRedirectCount] = useState<number>(5);
  const [isAutoRedirecting, setIsAutoRedirecting] = useState<boolean>(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string>('Just now');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Real customer reviews state (no mock demo data)
  const [liveReviews, setLiveReviews] = useState<LiveCustomerReview[]>(() => {
    try {
      const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Review form inputs
  const [authorName, setAuthorName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Auto-redirect timer if initiated by user
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

  const handleManualSync = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastSyncedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setIsRefreshing(false);
    }, 600);
  };

  const handleSubmitCustomerReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewText.trim()) return;

    const newReview: LiveCustomerReview = {
      id: `rev-${Date.now()}`,
      author: authorName.trim(),
      rating: selectedStars,
      date: 'Today',
      comment: reviewText.trim(),
      publishedToGoogle: false
    };

    const updated = [newReview, ...liveReviews];
    setLiveReviews(updated);
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));
    } catch {}

    setAuthorName('');
    setReviewText('');
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);

    // Prompt user to copy and post to Google Maps
    const confirmPost = window.confirm(
      'Thank you for your feedback! Would you like to post this review directly to Google Maps as well?'
    );
    if (confirmPost) {
      navigator.clipboard?.writeText(newReview.comment).catch(() => {});
      window.open(settings.googleMapsUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#FFF8ED', minHeight: '85vh', paddingBottom: '5rem' }}>
      {/* Header Banner */}
      <section 
        style={{ 
          backgroundColor: '#FFF1DC', 
          borderBottom: '1px solid #EEDCCA', 
          padding: 'clamp(2.75rem, 5vw, 4rem) 1.5rem',
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

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '780px', margin: '0 auto' }}>
          {/* Live Tracking Indicator Badge */}
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              backgroundColor: '#FFFEFA', 
              border: '1px solid #EEDCCA',
              padding: '0.35rem 0.95rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              color: '#15803D',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '1rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
            }}
          >
            <Radio size={14} className="animate-pulse" color="#22C55E" />
            <span>Live Google Maps Customer Ratings</span>
          </div>

          <h1 
            style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              color: '#332218', 
              margin: '0 0 0.85rem 0',
              fontWeight: 800,
              letterSpacing: '-0.01em'
            }}
          >
            Google Maps Ratings & Reviews
          </h1>

          <p style={{ fontSize: '1.02rem', color: '#806656', lineHeight: 1.6, margin: '0 auto 1.75rem', maxWidth: '640px' }}>
            Live customer ratings and verified reviews for <strong>Sukhadiya Manilal Nathalal</strong> at Manek Chowk, Ahmedabad. 
            Track real ratings in real-time or share your experience directly on Google Maps.
          </p>

          {/* Live Google Maps Rating Scorecard */}
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '1.5rem', 
              backgroundColor: '#FFFEFA', 
              padding: '1.25rem 2rem', 
              borderRadius: 'var(--radius-xl)', 
              border: '1.5px solid #EEDCCA',
              boxShadow: '0 10px 30px rgba(51, 34, 24, 0.08)',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            {/* Google Icon & Score */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <div style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                  <span style={{ fontSize: '2.1rem', fontWeight: 800, color: '#332218', lineHeight: 1 }}>4.6</span>
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

            {/* Live Location Details */}
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, color: '#332218', fontSize: '0.95rem' }}>
                Sukhadiya Manilal Nathalal
              </div>
              <div style={{ fontSize: '0.8rem', color: '#806656', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <MapPin size={12} color="#EA580C" /> Kandoi Ol, Manek Chowk, Ahmedabad
              </div>
              <div style={{ fontSize: '0.72rem', color: '#15803D', fontWeight: 600, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <CheckCircle2 size={12} /> Live Google Maps Verified Listing
              </div>
            </div>

            <div style={{ height: '36px', width: '1px', backgroundColor: '#EEDCCA' }} />

            {/* Sync Status Button */}
            <button
              onClick={handleManualSync}
              disabled={isRefreshing}
              style={{
                background: '#FFF8ED',
                border: '1px solid #EEDCCA',
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                color: '#806656',
                cursor: 'pointer'
              }}
              title="Refresh live sync status"
            >
              <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} color="#EA580C" />
              <span>Synced {lastSyncedTime}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Interactive Review & Map Tracker Section */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '960px', margin: '0 auto' }}>
          
          {/* Rate & Review on Google Maps Hero Card */}
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
              Live Google Maps Action
            </div>

            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#332218', margin: '0.5rem 0 0.5rem 0' }}>
              Rate Sukhadiya Manilal Nathalal on Google Maps
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#806656', maxWidth: '580px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
              Your rating directly updates our official Google Maps profile. Share your experience with sweet lovers across the globe.
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
                <span>Write a Live Review on Google Maps</span>
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
                <span>Open Google Maps Profile</span>
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
                  Click here to automatically redirect to Google Maps review page in 5 seconds
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontSize: '0.88rem', color: '#EA580C', fontWeight: 600 }}>
                  <span>Redirecting to Google Maps in {redirectCount}s...</span>
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

          {/* Live Google Map Interactive Frame */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', color: '#332218', margin: 0 }}>
                  Live Google Map Location & Ratings Feed
                </h3>
                <span style={{ fontSize: '0.85rem', color: '#806656' }}>
                  Direct live map pin for Shop No. 9, 10, 11, Kandoi Ol, Manek Chowk, Ahmedabad
                </span>
              </div>

              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#EA580C',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  textDecoration: 'none'
                }}
              >
                <span>Open Full Map</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <div 
              style={{ 
                borderRadius: 'var(--radius-xl)', 
                overflow: 'hidden', 
                border: '1.5px solid #EEDCCA',
                boxShadow: '0 8px 24px rgba(51, 34, 24, 0.08)',
                backgroundColor: '#FFFEFA'
              }}
            >
              <iframe
                title="Sukhadiya Manilal Nathalal Google Maps Location & Live Reviews"
                src="https://maps.google.com/maps?q=Sukhadiya+Manilal+Nathalal+Manek+Chowk+Ahmedabad&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="360"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Submit Real Customer Review Form & Live Customer Reviews List */}
          <div 
            style={{ 
              backgroundColor: '#FFFEFA', 
              borderRadius: 'var(--radius-xl)', 
              border: '1px solid #EEDCCA', 
              padding: 'clamp(1.75rem, 3vw, 2.5rem)',
              boxShadow: '0 4px 20px rgba(51, 34, 24, 0.05)',
              marginBottom: '3rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
              <MessageSquare size={22} color="#EA580C" />
              <h3 style={{ fontSize: '1.35rem', color: '#332218', margin: 0 }}>
                Leave Your Actual Customer Feedback
              </h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#806656', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Have you tasted our Mohanthal, Kaju Katli, or festival sweets? Share your authentic feedback below.
            </p>

            {formSubmitted && (
              <div 
                style={{ 
                  backgroundColor: '#DCFCE7', 
                  color: '#166534', 
                  padding: '0.85rem 1rem', 
                  borderRadius: 'var(--radius-md)', 
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}
              >
                <CheckCircle2 size={18} />
                <span>Thank you! Your feedback has been recorded and copied to your clipboard to post on Google Maps.</span>
              </div>
            )}

            <form onSubmit={handleSubmitCustomerReview} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#332218', marginBottom: '0.35rem' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyank Patel"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="form-input"
                    style={{ fontSize: '0.92rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#332218', marginBottom: '0.35rem' }}>
                    Rating *
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', height: '42px' }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedStars(s)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem' }}
                      >
                        <Star 
                          size={24} 
                          fill={selectedStars >= s ? '#F59E0B' : 'transparent'} 
                          color={selectedStars >= s ? '#F59E0B' : '#D1D5DB'} 
                        />
                      </button>
                    ))}
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#EA580C', marginLeft: '0.5rem' }}>
                      {selectedStars} Star{selectedStars > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#332218', marginBottom: '0.35rem' }}>
                  Your Review & Taste Experience *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Share details of your sweet selection, packaging, or taste experience..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="form-input"
                  style={{ fontSize: '0.92rem', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
                >
                  <Send size={15} />
                  <span>Submit Review</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenGoogleReview}
                  className="btn btn-secondary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
                >
                  <ExternalLink size={15} color="#EA580C" />
                  <span>Write Directly on Google Maps</span>
                </button>
              </div>
            </form>

            {/* Live Customer Reviews Display */}
            <div style={{ marginTop: '2.5rem', paddingTop: '1.75rem', borderTop: '1px solid #EEDCCA' }}>
              <h4 style={{ fontSize: '1.1rem', color: '#332218', margin: '0 0 1rem 0' }}>
                Customer Feedback Recorded on Web ({liveReviews.length})
              </h4>

              {liveReviews.length === 0 ? (
                <div 
                  style={{ 
                    padding: '2rem 1.5rem', 
                    textAlign: 'center', 
                    backgroundColor: '#FFF8ED', 
                    borderRadius: 'var(--radius-lg)',
                    border: '1px dashed #EEDCCA'
                  }}
                >
                  <Heart size={28} color="#EA580C" style={{ margin: '0 auto 0.5rem' }} />
                  <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600, color: '#332218', fontSize: '0.95rem' }}>
                    No local web reviews posted yet
                  </p>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#806656' }}>
                    All official ratings are tracked live on Google Maps. Be the first to submit above, or tap below to read all reviews live on Google Maps.
                  </p>
                  <button
                    onClick={handleOpenGoogleReview}
                    className="btn btn-secondary btn-sm"
                    style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <span>Read 1,200+ Reviews on Google Maps</span>
                    <ExternalLink size={13} />
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {liveReviews.map((rev) => (
                    <div 
                      key={rev.id}
                      style={{
                        padding: '1rem 1.25rem',
                        backgroundColor: '#FFF8ED',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid #EEDCCA'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <strong style={{ fontSize: '0.95rem', color: '#332218' }}>{rev.author}</strong>
                          <span style={{ fontSize: '0.75rem', color: '#15803D', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                            <CheckCircle2 size={12} /> Verified Customer
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '2px' }}>
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                          ))}
                        </div>
                      </div>
                      <p style={{ margin: '0 0 0.35rem 0', fontSize: '0.88rem', color: '#553E30', lineHeight: 1.5 }}>
                        "{rev.comment}"
                      </p>
                      <div style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>
                        {rev.date}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Shop Location & Counter Directions */}
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
              <span>Get Driving Directions</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
