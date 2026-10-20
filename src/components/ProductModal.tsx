import React, { useState } from 'react';
import { Product } from '../types';
import { formatINR, generateProductWhatsAppUrl } from '../utils/whatsapp';
import { 
  X, 
  Phone, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  CalendarDays, 
  Package
} from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  verifiedWhatsAppNumber: string;
  onBulkEnquire: (productName: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  verifiedWhatsAppNumber,
  onBulkEnquire
}) => {
  if (!product) return null;

  const [selectedPackIndex, setSelectedPackIndex] = useState<number>(0);
  const selectedPack = product.packageSizes[selectedPackIndex];
  const displayPrice = selectedPack?.price !== undefined ? selectedPack.price : product.priceAmount;

  const whatsappUrl = generateProductWhatsAppUrl(
    product,
    selectedPack ? selectedPack.label : undefined,
    verifiedWhatsAppNumber
  );

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(51, 34, 24, 0.65)',
        backdropFilter: 'blur(5px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: '#FFFEFA',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '850px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid #EEDCCA'
        }}
        onClick={(e) => e.stopPropagation()}
        className="animate-fade-in"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#FFFEFA',
            border: '1px solid #EEDCCA',
            color: '#332218',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            boxShadow: 'var(--shadow-sm)'
          }}
          aria-label="Close Modal"
        >
          <X size={18} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))' }}>
          {/* Image Pane */}
          <div 
            style={{ 
              position: 'relative', 
              minHeight: '320px', 
              backgroundColor: '#FFF1DC',
              borderTopLeftRadius: 'var(--radius-xl)',
              overflow: 'hidden'
            }}
          >
            <img 
              src={product.imageUrl} 
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div 
              style={{ 
                position: 'absolute', 
                bottom: '1rem', 
                left: '1rem',
                backgroundColor: 'rgba(255, 254, 250, 0.95)',
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#15803D',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <ShieldCheck size={16} /> 100% Pure Vegetarian & Desi Ghee
            </div>
          </div>

          {/* Details Pane */}
          <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-orange">{product.categoryName}</span>
              {product.availability === 'fresh_daily' && (
                <span className="badge badge-green">
                  <Sparkles size={12} /> Freshly Made Daily
                </span>
              )}
            </div>

            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.2rem', color: '#332218' }}>
              {product.name}
            </h2>
            {product.nameGu && (
              <span style={{ fontSize: '1rem', color: '#EA580C', fontWeight: 600, marginBottom: '1rem', display: 'block' }}>
                {product.nameGu}
              </span>
            )}

            <p style={{ fontSize: '0.95rem', color: '#806656', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {product.description}
            </p>

            {/* Packaging options */}
            {product.packageSizes && product.packageSizes.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#332218', display: 'block', marginBottom: '0.5rem' }}>
                  Select Packaging / Weight:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {product.packageSizes.map((pack, idx) => {
                    const isSelected = idx === selectedPackIndex;
                    return (
                      <button
                        key={pack.label}
                        onClick={() => setSelectedPackIndex(idx)}
                        style={{
                          padding: '0.45rem 0.9rem',
                          borderRadius: 'var(--radius-md)',
                          border: isSelected ? '2px solid #EA580C' : '1px solid #EEDCCA',
                          backgroundColor: isSelected ? '#FFF1DC' : '#FFFEFA',
                          color: isSelected ? '#EA580C' : '#806656',
                          fontWeight: isSelected ? 700 : 500,
                          fontSize: '0.88rem',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {isSelected && <Check size={14} />}
                        <span>{pack.label}</span>
                        {pack.price && <span style={{ opacity: 0.8 }}>({formatINR(pack.price)})</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Price section */}
            <div 
              style={{ 
                backgroundColor: '#FFF8ED', 
                border: '1px solid #EEDCCA', 
                borderRadius: 'var(--radius-md)', 
                padding: '1rem',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <span style={{ fontSize: '0.78rem', color: '#806656', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Configured Price ({selectedPack ? selectedPack.label : product.priceUnit})
                </span>
                <div 
                  style={{ 
                    fontFamily: 'var(--font-serif)', 
                    fontSize: '1.5rem', 
                    fontWeight: 700, 
                    color: displayPrice ? '#EA580C' : '#806656' 
                  }}
                >
                  {formatINR(displayPrice)}
                </div>
              </div>
              {product.priceVerified ? (
                <span className="badge badge-green">
                  <Check size={12} /> Verified Shop Price
                </span>
              ) : (
                <span className="badge badge-cream">
                  Price on Enquiry
                </span>
              )}
            </div>

            {/* Allergen & Storage Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem', fontSize: '0.86rem', color: '#806656' }}>
              {product.allergenInfo && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <AlertCircle size={16} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Allergens:</strong> {product.allergenInfo}</span>
                </div>
              )}
              {product.storageInfo && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <Clock size={16} color="#806656" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Storage & Shelf Life:</strong> {product.storageInfo}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
                style={{ width: '100%', textDecoration: 'none' }}
              >
                <Phone size={18} />
                <span>Enquire via WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBulkEnquire(product.name);
                }}
                className="btn btn-secondary"
                style={{ width: '100%' }}
              >
                <Package size={16} /> Request Bulk Order / Wedding Enquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
