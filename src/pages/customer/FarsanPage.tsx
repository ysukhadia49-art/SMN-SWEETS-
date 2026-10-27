import React, { useState } from 'react';
import { Product, ShopSettings } from '../../types';
import { ProductCard } from '../../components/ProductCard';
import { MenuMaintenanceBanner } from '../../components/MenuMaintenanceBanner';
import { Sparkles, Clock, ShieldCheck, Flame, Search, X } from 'lucide-react';

interface FarsanPageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  settings: ShopSettings;
}

export const FarsanPage: React.FC<FarsanPageProps> = ({
  products,
  onSelectProduct,
  settings
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const farsanProducts = products.filter(p => {
    if (p.categoryId !== 'cat-farsan') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        (p.nameGu && p.nameGu.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#FFF8ED', minHeight: '80vh', paddingBottom: '5rem' }}>
      {/* Hero Banner */}
      <section 
        style={{ 
          backgroundColor: '#FFF1DC', 
          borderBottom: '1px solid #EEDCCA', 
          padding: 'clamp(2.5rem, 4vw, 4rem) 1.5rem',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '750px' }}>
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              backgroundColor: '#FFFEFA', 
              padding: '0.3rem 0.85rem', 
              borderRadius: 'var(--radius-full)', 
              border: '1px solid #EEDCCA',
              marginBottom: '1rem'
            }}
          >
            <Flame size={14} color="#EA580C" />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#EA580C', textTransform: 'uppercase' }}>
              Fresh Daily Frying • Pure Groundnut Oil
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#332218', marginBottom: '0.75rem' }}>
            Traditional Gujarati Farsan
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#806656', lineHeight: 1.6 }}>
            Crisp, golden, aromatic savouries prepared using time-honoured techniques. 
            From melt-in-mouth Bhavnagari Gathiya to hand-rolled crispy Fafda and spicy Bhakarwadi.
          </p>

          {/* Morning Batch Notification */}
          <div 
            style={{ 
              marginTop: '1.5rem', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.6rem', 
              backgroundColor: '#FFFEFA', 
              border: '1px solid #EEDCCA',
              padding: '0.5rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.86rem',
              color: '#332218',
              fontWeight: 600
            }}
          >
            <Clock size={16} color="#EA580C" />
            <span>Morning Kadhais fired up at 6:30 AM daily at Manek Chowk</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container" style={{ marginTop: '2.5rem' }}>
        {/* Menu Maintenance Notice */}
        <MenuMaintenanceBanner settings={settings} />

        {/* Search Bar */}
        <div 
          style={{ 
            backgroundColor: '#FFFEFA', 
            borderRadius: 'var(--radius-lg)', 
            border: '1px solid #EEDCCA', 
            padding: '1rem 1.25rem',
            marginBottom: '2rem',
            maxWidth: '500px',
            position: 'relative'
          }}
        >
          <input
            type="text"
            placeholder="Search gathiya, fafda, bhakarwadi, chevdo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search 
            size={18} 
            color="#806656" 
            style={{ position: 'absolute', left: '2rem', top: '50%', transform: 'translateY(-50%)' }} 
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '2rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#806656'
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Farsan Product Cards Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '1.75rem' 
          }}
        >
          {farsanProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              verifiedWhatsAppNumber={settings.verifiedWhatsAppNumber}
              isUnderMaintenance={settings.menuUnderMaintenance}
            />
          ))}
        </div>

        {/* Gujarati Farsan Culture Note */}
        <div 
          style={{ 
            marginTop: '4rem', 
            backgroundColor: '#FFFEFA', 
            borderRadius: 'var(--radius-xl)', 
            border: '1px solid #EEDCCA', 
            padding: '2.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            alignItems: 'center'
          }}
        >
          <div>
            <span className="badge badge-orange" style={{ marginBottom: '0.5rem' }}>
              Purity & Tradition
            </span>
            <h3 style={{ fontSize: '1.5rem', color: '#332218', marginBottom: '0.75rem' }}>
              Why Our Farsan Stays Unmatched
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#806656', lineHeight: 1.6, marginBottom: '1rem' }}>
              At Sukhadiya Manilal Nathalal, we adhere strictly to traditional Gujarati seasoning: 
              fragrant asafoetida (hing), freshly cracked black pepper, aromatic ajwain (carom), and sesame seeds. 
              We never reuse cooking oil or rely on artificial flavor enhancers.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', fontWeight: 600, color: '#15803D' }}>
              <span>✓ Single-use pure groundnut oil</span>
              <span>✓ Fresh papaya sambharo accompaniment</span>
              <span>✓ Airtight tamper-proof pouches</span>
            </div>
          </div>

          <div 
            style={{ 
              backgroundColor: '#FFF8ED', 
              borderRadius: 'var(--radius-lg)', 
              border: '1px solid #EEDCCA', 
              padding: '1.5rem' 
            }}
          >
            <h4 style={{ fontSize: '1.1rem', color: '#332218', marginBottom: '0.5rem' }}>
              Planning Breakfast or High-Tea for Guests?
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#806656', lineHeight: 1.5, marginBottom: '1rem' }}>
              We prepare hot bulk batches of Vanela Gathiya, Fafda, and Nylon Khaman for morning functions and Vastu Pujas across Ahmedabad.
            </p>
            <a
              href={`https://wa.me/${settings.verifiedWhatsAppNumber.replace(/\D/g, '')}?text=${encodeURIComponent("Hello Sukhadiya Manilal Nathalal! I would like to order fresh morning farsan for an event.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm"
              style={{ textDecoration: 'none' }}
            >
              Enquire Morning Batch on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
