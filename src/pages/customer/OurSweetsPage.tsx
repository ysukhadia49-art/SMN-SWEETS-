import React, { useState } from 'react';
import { Product, Category, ShopSettings } from '../../types';
import { ProductCard } from '../../components/ProductCard';
import { MenuMaintenanceBanner } from '../../components/MenuMaintenanceBanner';
import { Search, Sparkles, Filter, X } from 'lucide-react';

interface OurSweetsPageProps {
  products: Product[];
  categories: Category[];
  onSelectProduct: (product: Product) => void;
  settings: ShopSettings;
}

export const OurSweetsPage: React.FC<OurSweetsPageProps> = ({
  products,
  categories,
  onSelectProduct,
  settings
}) => {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [freshOnly, setFreshOnly] = useState<boolean>(false);

  // Sweet categories (excluding pure farsan)
  const sweetCategories = categories.filter(c => c.slug !== 'namkeen-farsan');

  // Filter products
  const filteredProducts = products.filter(p => {
    // Exclude farsan from the dedicated sweets page
    if (p.categoryId === 'cat-farsan') return false;

    // Category filter
    if (selectedCategorySlug !== 'all') {
      const matchCat = categories.find(c => c.slug === selectedCategorySlug);
      if (matchCat && p.categoryId !== matchCat.id) return false;
    }

    // Fresh daily filter
    if (freshOnly && p.availability !== 'fresh_daily') return false;

    // Search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(query);
      const matchGu = p.nameGu?.toLowerCase().includes(query);
      const matchDesc = p.description.toLowerCase().includes(query);
      if (!matchName && !matchGu && !matchDesc) return false;
    }

    return true;
  });

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
            <Sparkles size={14} color="#EA580C" />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#EA580C', textTransform: 'uppercase' }}>
              Pure Desi Ghee Handcrafted Mithai
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#332218', marginBottom: '0.75rem' }}>
            Our Traditional Sweets
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#806656', lineHeight: 1.6 }}>
            Explore our artisanal Gujarati and royal Indian confections. Slow-cooked in pure A2 Gir cow ghee, 
            blended with saffron, cardamom, and premium nuts.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div className="container" style={{ marginTop: '2.5rem' }}>
        {/* Menu Maintenance Banner */}
        <MenuMaintenanceBanner settings={settings} />

        <div 
          style={{ 
            backgroundColor: '#FFFEFA', 
            borderRadius: 'var(--radius-lg)', 
            border: '1px solid #EEDCCA', 
            padding: '1.25rem',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          {/* Top Row: Search & Fresh Checkbox */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ position: 'relative', flexGrow: 1, minWidth: '240px' }}>
              <input
                type="text"
                placeholder="Search sweets by name, cashew, saffron, peda..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
              />
              <Search 
                size={18} 
                color="#806656" 
                style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} 
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '0.85rem',
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

            <label 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                fontSize: '0.88rem', 
                color: '#332218', 
                fontWeight: 600,
                cursor: 'pointer' 
              }}
            >
              <input
                type="checkbox"
                checked={freshOnly}
                onChange={(e) => setFreshOnly(e.target.checked)}
                style={{ accentColor: '#EA580C', width: '16px', height: '16px' }}
              />
              <span>Freshly Made Daily Only</span>
            </label>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', borderTop: '1px solid #F5EAE0', paddingTop: '1rem' }}>
            <button
              onClick={() => setSelectedCategorySlug('all')}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                border: selectedCategorySlug === 'all' ? '1px solid #EA580C' : '1px solid #EEDCCA',
                backgroundColor: selectedCategorySlug === 'all' ? '#FFF1DC' : '#FFFEFA',
                color: selectedCategorySlug === 'all' ? '#EA580C' : '#806656',
                fontWeight: selectedCategorySlug === 'all' ? 700 : 500,
                fontSize: '0.86rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              All Sweets ({products.filter(p => p.categoryId !== 'cat-farsan').length})
            </button>

            {sweetCategories.map((cat) => {
              const isSelected = selectedCategorySlug === cat.slug;
              const count = products.filter(p => p.categoryId === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategorySlug(cat.slug)}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    border: isSelected ? '1px solid #EA580C' : '1px solid #EEDCCA',
                    backgroundColor: isSelected ? '#FFF1DC' : '#FFFEFA',
                    color: isSelected ? '#EA580C' : '#806656',
                    fontWeight: isSelected ? 700 : 500,
                    fontSize: '0.86rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {cat.name} {cat.nameGu ? `(${cat.nameGu})` : ''} · {count}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="catalog-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                verifiedWhatsAppNumber={settings.verifiedWhatsAppNumber}
                isUnderMaintenance={settings.menuUnderMaintenance}
              />
            ))}
          </div>
        ) : (
          <div 
            style={{ 
              textAlign: 'center', 
              padding: '4rem 1.5rem', 
              backgroundColor: '#FFFEFA', 
              borderRadius: 'var(--radius-lg)',
              border: '1px dashed #EEDCCA'
            }}
          >
            <h3 style={{ fontSize: '1.25rem', color: '#332218', marginBottom: '0.5rem' }}>
              No Sweets Matched Your Search
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#806656', marginBottom: '1.5rem' }}>
              Try searching with another keyword or reset the category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategorySlug('all');
                setSearchQuery('');
                setFreshOnly(false);
              }}
              className="btn btn-outline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
