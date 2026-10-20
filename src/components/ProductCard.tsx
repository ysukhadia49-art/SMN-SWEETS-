import React, { useState } from 'react';
import { Product } from '../types';
import { formatINR, generateProductWhatsAppUrl } from '../utils/whatsapp';
import { Phone, Eye, Sparkles, CheckCircle2, Clock } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  verifiedWhatsAppNumber: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  verifiedWhatsAppNumber
}) => {
  const [selectedPackIndex, setSelectedPackIndex] = useState<number>(0);
  const selectedPack = product.packageSizes[selectedPackIndex];

  // Determine current display price
  const displayPrice = selectedPack?.price !== undefined 
    ? selectedPack.price 
    : product.priceAmount;

  const whatsappUrl = generateProductWhatsAppUrl(
    product, 
    selectedPack ? selectedPack.label : undefined, 
    verifiedWhatsAppNumber
  );

  return (
    <div 
      className="card"
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        padding: 0,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#FFFEFA'
      }}
    >
      {/* Product Image Container */}
      <div 
        style={{ 
          position: 'relative', 
          width: '100%', 
          paddingTop: '68%', 
          overflow: 'hidden',
          backgroundColor: '#FFF1DC'
        }}
      >
        <img 
          src={product.imageUrl} 
          alt={product.name}
          loading="lazy"
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
        />

        {/* Category & Availability Badges */}
        <div 
          style={{ 
            position: 'absolute', 
            top: '0.75rem', 
            left: '0.75rem', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.35rem',
            alignItems: 'flex-start'
          }}
        >
          <span 
            className="badge badge-orange"
            style={{ backdropFilter: 'blur(4px)', backgroundColor: 'rgba(255, 248, 237, 0.95)' }}
          >
            {product.categoryName}
          </span>
          {product.availability === 'fresh_daily' && (
            <span 
              className="badge badge-green"
              style={{ backdropFilter: 'blur(4px)', backgroundColor: 'rgba(220, 252, 231, 0.95)' }}
            >
              <Sparkles size={11} /> Freshly Made Daily
            </span>
          )}
          {product.availability === 'seasonal' && (
            <span className="badge badge-gold">
              <Clock size={11} /> Seasonal Special
            </span>
          )}
        </div>

        {/* Pure Desi Ghee Pill */}
        <div 
          style={{ 
            position: 'absolute', 
            bottom: '0.75rem', 
            right: '0.75rem',
            backgroundColor: 'rgba(51, 34, 24, 0.85)',
            color: '#FFF1DC',
            fontSize: '0.7rem',
            fontWeight: 600,
            padding: '0.2rem 0.55rem',
            borderRadius: 'var(--radius-full)',
            letterSpacing: '0.02em'
          }}
        >
          Pure Desi Ghee
        </div>
      </div>

      {/* Card Content */}
      <div 
        style={{ 
          padding: '1.25rem', 
          display: 'flex', 
          flexDirection: 'column', 
          flexGrow: 1 
        }}
      >
        {/* Title & Gujarati Script */}
        <div style={{ marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
            <h3 
              style={{ 
                fontSize: '1.15rem', 
                fontWeight: 700, 
                color: '#332218', 
                margin: 0,
                lineHeight: 1.3
              }}
            >
              {product.name}
            </h3>
          </div>
          {product.nameGu && (
            <span style={{ fontSize: '0.85rem', color: '#EA580C', fontWeight: 600, display: 'block', marginTop: '0.15rem' }}>
              {product.nameGu}
            </span>
          )}
        </div>

        {/* Short Description */}
        <p 
          style={{ 
            fontSize: '0.86rem', 
            color: '#806656', 
            lineHeight: 1.5,
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.description}
        </p>

        {/* Packaging Selector */}
        {product.packageSizes && product.packageSizes.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#806656', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.35rem' }}>
              Packaging Options:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {product.packageSizes.map((pack, idx) => {
                const isSelected = idx === selectedPackIndex;
                return (
                  <button
                    key={pack.label}
                    onClick={() => setSelectedPackIndex(idx)}
                    type="button"
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: isSelected ? 700 : 500,
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      border: isSelected ? '1px solid #EA580C' : '1px solid #EEDCCA',
                      backgroundColor: isSelected ? '#FFF1DC' : '#FFFEFA',
                      color: isSelected ? '#EA580C' : '#806656',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {pack.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Pricing & Enquiry Action Footer */}
        <div 
          style={{ 
            marginTop: 'auto', 
            paddingTop: '0.85rem', 
            borderTop: '1px solid #F5EAE0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem'
          }}
        >
          <div>
            <div style={{ fontSize: '0.72rem', color: '#806656', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {product.priceAmount ? (selectedPack ? selectedPack.label : product.priceUnit) : 'Pricing'}
            </div>
            <div 
              style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: displayPrice ? '1.25rem' : '1.05rem', 
                fontWeight: 700, 
                color: displayPrice ? '#EA580C' : '#806656' 
              }}
            >
              {formatINR(displayPrice)}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <button
              onClick={() => onSelect(product)}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.45rem 0.65rem' }}
              title="View product specifications and details"
            >
              <Eye size={15} />
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm"
              title="Enquire on WhatsApp"
            >
              <Phone size={14} />
              <span>Enquire</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
