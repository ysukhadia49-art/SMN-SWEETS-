import React from 'react';
import { CustomerPage, Product, ShopSettings } from '../../types';
import { ProductCard } from '../../components/ProductCard';
import { generateDirectShopWhatsAppUrl } from '../../utils/whatsapp';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Phone, 
  ExternalLink, 
  Award, 
  Flame, 
  HeartHandshake, 
  PackageCheck,
  Star,
  Gift
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: CustomerPage) => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  settings: ShopSettings;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  products,
  onSelectProduct,
  settings
}) => {
  const featuredSweets = products
    .filter(p => p.isFeatured && p.categoryId !== 'cat-farsan')
    .slice(0, 8);

  const giftBoxes = products
    .filter(p => p.categoryId === 'cat-giftboxes')
    .slice(0, 2);

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#FFF8ED' }}>
      {/* 1. EDITORIAL HERO SECTION */}
      <section 
        style={{ 
          position: 'relative', 
          backgroundColor: '#FFF1DC', 
          borderBottom: '1px solid #EEDCCA',
          paddingTop: 'clamp(3rem, 6vw, 6rem)',
          paddingBottom: 'clamp(3.5rem, 6vw, 6.5rem)',
          overflow: 'hidden'
        }}
      >
        {/* Subtle decorative background watermarks */}
        <div 
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, rgba(255, 241, 220, 0) 70%)',
            pointerEvents: 'none'
          }}
        />

        <div className="container">
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              alignItems: 'center', 
              gap: '3rem' 
            }}
          >
            {/* Left Content */}
            <div style={{ textAlign: 'left' }}>
              {/* Heritage Tag */}
              <div 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.45rem', 
                  backgroundColor: '#FFFEFA', 
                  border: '1px solid #EEDCCA', 
                  padding: '0.35rem 0.9rem', 
                  borderRadius: 'var(--radius-full)',
                  marginBottom: '1.25rem'
                }}
              >
                <Sparkles size={14} color="#EA580C" />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#EA580C', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Historic Manek Chowk • Estd. 1948
                </span>
              </div>

              {/* Exact Hero Heading */}
              <h1 
                style={{ 
                  fontFamily: 'var(--font-serif)', 
                  fontSize: 'clamp(2.5rem, 5vw + 1rem, 4.2rem)', 
                  fontWeight: 800, 
                  color: '#332218', 
                  lineHeight: 1.1,
                  marginBottom: '1.25rem'
                }}
              >
                Tradition in Every Bite.
              </h1>

              {/* Exact Supporting Text */}
              <p 
                style={{ 
                  fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)', 
                  color: '#806656', 
                  lineHeight: 1.6, 
                  marginBottom: '2rem',
                  maxWidth: '540px'
                }}
              >
                Discover the rich taste of traditional Indian mithai, pure desi ghee sweets, and festive gift boxes, crafted for celebrations and everyday moments.
              </p>

              {/* Exact Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '2.5rem' }}>
                <button
                  onClick={() => onNavigate('sweets')}
                  className="btn btn-primary btn-lg"
                >
                  Explore Our Sweets <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => onNavigate('bulk-orders')}
                  className="btn btn-secondary btn-lg"
                >
                  Bulk Order Enquiry
                </button>
              </div>

              {/* Trust Badges */}
              <div 
                style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '1.5rem', 
                  borderTop: '1px solid #EEDCCA', 
                  paddingTop: '1.5rem',
                  fontSize: '0.88rem',
                  color: '#332218',
                  fontWeight: 600
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <ShieldCheck size={18} color="#EA580C" />
                  <span>100% Pure Desi Ghee</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Award size={18} color="#EA580C" />
                  <span>Generations of Trust</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <MapPin size={18} color="#EA580C" />
                  <span>Manek Chowk, Ahmedabad</span>
                </div>
              </div>
            </div>

            {/* Right Visual Collage */}
            <div style={{ position: 'relative' }}>
              <div 
                style={{ 
                  borderRadius: 'var(--radius-xl)', 
                  overflow: 'hidden', 
                  boxShadow: 'var(--shadow-lg)',
                  border: '8px solid #FFFEFA',
                  position: 'relative'
                }}
              >
                <img 
                  src="/images/sweets/kaju-mithai/kaju-mix-mithai.jpg" 
                  alt="Sukhadiya Traditional Kaju Katli and Mithai"
                  style={{ width: '100%', height: '440px', objectFit: 'cover', display: 'block' }}
                />

                <div 
                  style={{ 
                    position: 'absolute', 
                    bottom: '1.25rem', 
                    left: '1.25rem', 
                    right: '1.25rem',
                    backgroundColor: 'rgba(255, 254, 250, 0.95)',
                    backdropFilter: 'blur(8px)',
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-md)'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#EA580C', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Heritage Confectionery
                    </span>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#332218' }}>
                      Special Kaju Katli & Mohanthal
                    </h4>
                  </div>
                  <button
                    onClick={() => onNavigate('sweets')}
                    className="btn btn-outline btn-sm"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED SWEETS SECTION */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', gap: '1rem' }}>
            <div>
              <span className="badge badge-orange" style={{ marginBottom: '0.5rem' }}>
                Handcrafted Daily
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.4rem)', color: '#332218', margin: 0 }}>
                Featured Sweets
              </h2>
              <p style={{ fontSize: '1rem', color: '#806656', marginTop: '0.35rem' }}>
                Pure desi ghee creations made with sacred recipes passed down for over 7 decades.
              </p>
            </div>
            <button
              onClick={() => onNavigate('sweets')}
              className="btn btn-secondary"
            >
              Browse All Sweets <ArrowRight size={16} />
            </button>
          </div>

          <div className="catalog-grid">
            {featuredSweets.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                verifiedWhatsAppNumber={settings.verifiedWhatsAppNumber}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE COLLECTIONS & GIFT BOXES */}
      <section className="section-padding">
        <div className="container">
          <div 
            style={{ 
              backgroundColor: '#FFFEFA', 
              borderRadius: 'var(--radius-xl)', 
              border: '1px solid #EEDCCA',
              padding: 'clamp(2rem, 4vw, 3.5rem)',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
              <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
                <Gift size={12} /> Celebrations & Shagun
              </span>
              <h2 style={{ fontSize: '2.4rem', color: '#332218', marginBottom: '0.75rem' }}>
                Signature Gift Boxes
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#806656' }}>
                Crafted for Gujarati wedding invitations, family festivities, and prestigious corporate celebrations. 
                Customizable assortments with gold-embossed bespoke boxes.
              </p>
            </div>

            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '2rem',
                marginBottom: '2.5rem'
              }}
            >
              {giftBoxes.map((product) => (
                <div 
                  key={product.id} 
                  style={{ 
                    backgroundColor: '#FFF8ED', 
                    borderRadius: 'var(--radius-lg)', 
                    border: '1px solid #EEDCCA',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#332218' }}>
                      {product.name}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#806656', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {product.description}
                    </p>
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span className="badge badge-cream">Custom Curation Available</span>
                      <button
                        onClick={() => onNavigate('gift-boxes')}
                        className="btn btn-outline btn-sm"
                      >
                        Enquire Box
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => onNavigate('gift-boxes')}
                className="btn btn-primary"
              >
                Explore Full Gift Collection <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FESTIVAL SPECIALS BANNER */}
      <section style={{ backgroundColor: '#EA580C', color: '#FFF8ED', padding: '3.5rem 1.5rem' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '820px' }}>
          <span 
            style={{ 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              color: '#FFFFFF', 
              padding: '0.35rem 0.9rem', 
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              display: 'inline-block',
              marginBottom: '1rem'
            }}
          >
            Festive Bookings Open
          </span>
          <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '1rem' }}>
            Auspicious Delicacies for Every Festival
          </h2>
          <p style={{ color: '#FED7AA', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            From Diwali shagun boxes to Uttarayan chikki and Holi specials, we freshly prepare Gujarat's finest sweets to make your traditions truly memorable.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('bulk-orders')}
              style={{
                backgroundColor: '#FFFEFA',
                color: '#EA580C',
                border: 'none',
                padding: '0.85rem 1.8rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Submit Festive Bulk Enquiry
            </button>
            <a
              href={generateDirectShopWhatsAppUrl(settings.verifiedWhatsAppNumber, 'Festive Mithai Orders')}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.4)',
                padding: '0.85rem 1.8rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '1rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Phone size={16} /> WhatsApp Us Directly
            </a>
          </div>
        </div>
      </section>

      {/* 6. OUR STORY SECTION */}
      <section className="section-padding">
        <div className="container">
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: '3.5rem', 
              alignItems: 'center' 
            }}
          >
            <div>
              <span className="badge badge-orange" style={{ marginBottom: '0.75rem' }}>
                Our Heritage
              </span>
              <h2 style={{ fontSize: '2.4rem', color: '#332218', marginBottom: '1.25rem' }}>
                Seven Decades of Culinary Craftsmanship
              </h2>
              <p style={{ fontSize: '1rem', color: '#806656', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                Founded in the vibrant historic heart of Ahmedabad at Manek Chowk, 
                <strong> Sukhadiya Manilal Nathalal</strong> has stood as a beacon of uncompromising purity 
                and authentic Gujarati taste since 1948.
              </p>
              <p style={{ fontSize: '0.98rem', color: '#806656', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                Every single piece of mithai is prepared using pure A2 Desi Ghee, premium quality nuts, 
                and slow roasting techniques that honor traditional Indian halwai art. No shortcuts, no artificial food colors, 
                and no chemical additives — just pure, honest sweetness.
              </p>

              <button
                onClick={() => onNavigate('about')}
                className="btn btn-outline"
              >
                Read Our Full Heritage Story <ArrowRight size={16} />
              </button>
            </div>

            <div 
              style={{ 
                backgroundColor: '#FFF1DC', 
                borderRadius: 'var(--radius-xl)', 
                border: '1px solid #EEDCCA',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div 
                  style={{ 
                    width: '44px', 
                    height: '44px', 
                    borderRadius: '50%', 
                    backgroundColor: '#FFFEFA', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#EA580C',
                    border: '1px solid #EEDCCA'
                  }}
                >
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', margin: 0, color: '#332218' }}>100% Pure Desi Ghee</h4>
                  <p style={{ fontSize: '0.88rem', color: '#806656', margin: '0.2rem 0 0' }}>
                    Authentic richness crafted using traditional churning methods.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div 
                  style={{ 
                    width: '44px', 
                    height: '44px', 
                    borderRadius: '50%', 
                    backgroundColor: '#FFFEFA', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#EA580C',
                    border: '1px solid #EEDCCA'
                  }}
                >
                  <Flame size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', margin: 0, color: '#332218' }}>Freshly Prepared Daily</h4>
                  <p style={{ fontSize: '0.88rem', color: '#806656', margin: '0.2rem 0 0' }}>
                    Our kadhais start bubbling before sunrise at Manek Chowk to serve fresh batches.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div 
                  style={{ 
                    width: '44px', 
                    height: '44px', 
                    borderRadius: '50%', 
                    backgroundColor: '#FFFEFA', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#EA580C',
                    border: '1px solid #EEDCCA'
                  }}
                >
                  <HeartHandshake size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', margin: 0, color: '#332218' }}>Weddings & Bulk Orders</h4>
                  <p style={{ fontSize: '0.88rem', color: '#806656', margin: '0.2rem 0 0' }}>
                    Trusted by generations of families for wedding feasts and royal hospitality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. GOOGLE MAP RATINGS & REVIEWS CALLOUT */}
      <section style={{ backgroundColor: '#FFFEFA', borderTop: '1px solid #EEDCCA', padding: 'clamp(2.5rem, 4vw, 3.5rem) 1.5rem', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: '#EA580C', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.65rem', backgroundColor: '#FFF1DC', padding: '0.3rem 0.95rem', borderRadius: 'var(--radius-full)', border: '1px solid #EEDCCA' }}>
            <Star size={15} fill="#F59E0B" color="#F59E0B" />
            <span>4.9 ★ Rated on Google Maps • Manek Chowk, Ahmedabad</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#332218', margin: '0.5rem 0 0.75rem 0' }}>
            Loved by Patrons in Ahmedabad & Across India
          </h2>
          <p style={{ color: '#806656', fontSize: '0.98rem', margin: '0 auto 1.75rem', maxWidth: '620px', lineHeight: 1.6 }}>
            Experience our 7-decade legacy of pure buffalo milk desi ghee sweets. Read verified customer reviews or leave your own rating on Google Maps.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => {
                onNavigate('ratings');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className="btn btn-primary btn-lg"
            >
              <Star size={17} fill="#F59E0B" color="#F59E0B" />
              <span>View Reviews & Rate Us</span>
              <ArrowRight size={16} />
            </button>
            <a 
              href={settings.googleMapsUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary btn-lg"
              style={{ textDecoration: 'none' }}
            >
              <ExternalLink size={16} color="#EA580C" />
              <span>Direct Google Maps Review</span>
            </a>
          </div>
        </div>
      </section>

      {/* 7. VISIT OUR SHOP SECTION */}
      <section 
        style={{ 
          backgroundColor: '#FFF1DC', 
          borderTop: '1px solid #EEDCCA', 
          paddingTop: 'clamp(3.5rem, 5vw, 5.5rem)',
          paddingBottom: 'clamp(3.5rem, 5vw, 5.5rem)'
        }}
      >
        <div className="container">
          <div 
            style={{ 
              backgroundColor: '#FFFEFA', 
              borderRadius: 'var(--radius-xl)', 
              border: '1px solid #EEDCCA',
              padding: 'clamp(2rem, 4vw, 3rem)',
              boxShadow: 'var(--shadow-md)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center'
            }}
          >
            <div>
              <span className="badge badge-orange" style={{ marginBottom: '0.75rem' }}>
                Manek Chowk, Ahmedabad
              </span>
              <h2 style={{ fontSize: '2.2rem', color: '#332218', marginBottom: '1rem' }}>
                Visit Our Historic Sweet Shop
              </h2>
              <p style={{ fontSize: '0.98rem', color: '#806656', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                Experience the authentic aromas of sizzling jalebi, freshly tempered gathiya, and slow-roasted mohanthal 
                in person at our historic store in Manek Chowk.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <MapPin size={20} color="#EA580C" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>{settings.address}</strong>
                    <br />
                    <span>{settings.city}, {settings.state} - {settings.pincode}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Clock size={18} color="#EA580C" style={{ flexShrink: 0 }} />
                  <span>{settings.openingHours}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Phone size={18} color="#EA580C" style={{ flexShrink: 0 }} />
                  <span>Shop Counter: {settings.phone}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ textDecoration: 'none' }}
                >
                  <MapPin size={16} /> Get Driving Directions <ExternalLink size={14} />
                </a>
                <a
                  href={generateDirectShopWhatsAppUrl(settings.verifiedWhatsAppNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ textDecoration: 'none' }}
                >
                  <Phone size={16} /> Contact on WhatsApp
                </a>
              </div>
            </div>

            {/* Shop Experience Card */}
            <div 
              style={{ 
                backgroundColor: '#FFF8ED', 
                borderRadius: 'var(--radius-lg)', 
                border: '1px solid #EEDCCA', 
                padding: '2rem',
                textAlign: 'center'
              }}
            >
              <div 
                style={{ 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '50%', 
                  backgroundColor: '#FFF1DC', 
                  border: '2px solid #F97316',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                  color: '#EA580C'
                }}
              >
                <MapPin size={30} />
              </div>
              <h3 style={{ fontSize: '1.35rem', color: '#332218', marginBottom: '0.5rem' }}>
                Manek Chowk Counter
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#806656', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Located in the heritage jewelry and culinary market of Old Ahmedabad. Walk-ins are always welcomed with a warm smile and tasting samples.
              </p>
              <div 
                style={{ 
                  backgroundColor: '#FFFEFA', 
                  border: '1px solid #EEDCCA', 
                  borderRadius: 'var(--radius-md)', 
                  padding: '1rem',
                  fontSize: '0.85rem',
                  color: '#15803D',
                  fontWeight: 600
                }}
              >
                ✓ Fresh Morning Batches Ready by 8:00 AM Daily
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
