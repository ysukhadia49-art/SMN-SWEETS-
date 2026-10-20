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
      <div className="product-card-body">
        {/* Title & Gujarati Script */}
        <div style={{ marginBottom: '0.4rem', minWidth: 0 }}>
          <h3 className="product-card-title">
            {product.name}
          </h3>
          {product.nameGu && (
            <span className="product-card-title-gu">
              {product.nameGu}
            </span>
          )}
        </div>

        {/* Short Description */}
        <p className="product-card-desc">
          {product.description}
        </p>

        {/* Packaging Selector */}
        {product.packageSizes && product.packageSizes.length > 0 && (
          <div className="product-pack-section">
            <span className="product-pack-title">
              Packaging Options:
            </span>
            <div className="product-pack-pills">
              {product.packageSizes.map((pack, idx) => {
                const isSelected = idx === selectedPackIndex;
                return (
                  <button
                    key={pack.label}
                    onClick={() => setSelectedPackIndex(idx)}
                    type="button"
                    className={`product-pack-pill ${isSelected ? 'selected' : ''}`}
                  >
                    {pack.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Pricing & Enquiry Action Footer */}
        <div className="product-card-footer">
          {/* Price Row */}
          <div className="product-card-price-row">
            <span className="product-card-price-label">
              {product.priceAmount ? (selectedPack ? selectedPack.label : product.priceUnit) : 'Pure Mithai'}
            </span>
            <div className="product-card-price-val">
              {formatINR(displayPrice)}
            </div>
          </div>

          {/* Actions Row: Preview & Enquire */}
          <div className="product-card-actions">
            <button
              onClick={() => onSelect(product)}
              className="product-card-preview-btn"
              title="View product details & ingredients"
              aria-label="View product details"
            >
              <Eye size={16} />
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="product-card-enquire-btn"
              title="Enquire on WhatsApp"
            >
              <Phone size={15} />
              <span>Enquire</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
