import React from 'react';
import { CustomerPage, Product, ShopSettings } from '../../types';
import { ProductCard } from '../../components/ProductCard';
import { MenuMaintenanceBanner } from '../../components/MenuMaintenanceBanner';
import { Gift, Sparkles, CheckCircle2, ArrowRight, Phone } from 'lucide-react';
import { generateDirectShopWhatsAppUrl } from '../../utils/whatsapp';

interface GiftBoxesPageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onNavigate: (page: CustomerPage) => void;
  settings: ShopSettings;
}

export const GiftBoxesPage: React.FC<GiftBoxesPageProps> = ({
  products,
  onSelectProduct,
  onNavigate,
  settings
}) => {
  const giftBoxes = products.filter(p => p.categoryId === 'cat-giftboxes');

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#FFF8ED', minHeight: '80vh', paddingBottom: '5rem' }}>
      {/* Header Banner */}
      <section 
        style={{ 
          backgroundColor: '#FFF1DC', 
          borderBottom: '1px solid #EEDCCA', 
          padding: 'clamp(2.5rem, 4vw, 4rem) 1.5rem',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '780px' }}>
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
            <Gift size={14} color="#EA580C" />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#EA580C', textTransform: 'uppercase' }}>
              Celebration & Shagun Hampers
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#332218', marginBottom: '0.75rem' }}>
            Artisanal Gift Boxes & Hampers
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#806656', lineHeight: 1.6 }}>
            Elegantly designed presentation boxes crafted for wedding invitations, Diwali shagun, 
            corporate milestones, and royal family hospitality.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '3rem' }}>
        {/* Menu Maintenance Notice */}
        <MenuMaintenanceBanner settings={settings} onNavigateBulk={() => onNavigate('bulk-orders')} />

        {/* Products Grid */}
        <div className="catalog-grid" style={{ marginBottom: '4rem' }}>
          {giftBoxes.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              verifiedWhatsAppNumber={settings.verifiedWhatsAppNumber}
              isUnderMaintenance={settings.menuUnderMaintenance}
            />
          ))}
        </div>

        {/* Customization Details Feature Block */}
        <div 
          style={{ 
            backgroundColor: '#FFFEFA', 
            borderRadius: 'var(--radius-xl)', 
            border: '1px solid #EEDCCA', 
            padding: 'clamp(2rem, 4vw, 3.5rem)',
            boxShadow: 'var(--shadow-md)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}
        >
          <div>
            <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
              Bespoke Gifting
            </span>
            <h2 style={{ fontSize: '2.2rem', color: '#332218', marginBottom: '1rem' }}>
              Custom Curated Sweet Boxes for Your Occasion
            </h2>
            <p style={{ fontSize: '0.98rem', color: '#806656', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Whether you require 25 luxury boxes for an intimate ring ceremony or 1,000 corporate Diwali hampers, 
              we offer full personalization:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.92rem', color: '#332218' }}>
                <CheckCircle2 size={18} color="#EA580C" />
                <span>Choice of sweets (Kaju Katli, Mohanthal, Peda, Dry Fruit Rolls)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.92rem', color: '#332218' }}>
                <CheckCircle2 size={18} color="#EA580C" />
                <span>Option to add savory farsan pouches & roasted dry fruits</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.92rem', color: '#332218' }}>
                <CheckCircle2 size={18} color="#EA580C" />
                <span>Custom gold-embossed family crests or corporate logo branding</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.92rem', color: '#332218' }}>
                <CheckCircle2 size={18} color="#EA580C" />
                <span>Sample box tasting sessions at our Manek Chowk store</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <button
                onClick={() => onNavigate('bulk-orders')}
                className="btn btn-primary"
              >
                Submit Bulk Gift Enquiry <ArrowRight size={16} />
              </button>
              <a
                href={generateDirectShopWhatsAppUrl(settings.verifiedWhatsAppNumber, 'Custom Gift Box Enquiry')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ textDecoration: 'none' }}
              >
                <Phone size={16} /> WhatsApp Gifting Desk
              </a>
            </div>
          </div>

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
                width: '60px', 
                height: '60px', 
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
              <Gift size={28} />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: '#332218', marginBottom: '0.5rem' }}>
              Sample Box Tasting
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#806656', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Hosting a wedding? We are delighted to prepare a complimentary sample tasting box for bride & groom families 
              to finalize the sweets and box styling.
            </p>
            <div style={{ fontSize: '0.82rem', color: '#806656', borderTop: '1px solid #EEDCCA', paddingTop: '0.85rem' }}>
              Please schedule 24 hours in advance via WhatsApp.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
