import React, { useState } from 'react';
import { Product, Category, ProductAvailability } from '../../types';
import { store } from '../../services/store';
import { formatINR } from '../../utils/whatsapp';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Sparkles, 
  Check, 
  X, 
  Image as ImageIcon,
  AlertCircle
} from 'lucide-react';

interface AdminProductsProps {
  products: Product[];
  categories: Category[];
  onRefresh: () => void;
}

export const AdminProducts: React.FC<AdminProductsProps> = ({
  products,
  categories,
  onRefresh
}) => {
  const [selectedCatId, setSelectedCatId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [nameGu, setNameGu] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [availability, setAvailability] = useState<ProductAvailability>('in_stock');
  const [isPriceOnEnquiry, setIsPriceOnEnquiry] = useState(false);
  const [priceAmount, setPriceAmount] = useState<string>('');
  const [priceUnit, setPriceUnit] = useState('per kg');
  const [allergenInfo, setAllergenInfo] = useState('');
  const [storageInfo, setStorageInfo] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [packageLabels, setPackageLabels] = useState('250g, 500g, 1 kg');
  const [formError, setFormError] = useState('');

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setNameGu('');
    setCategoryId(categories[0]?.id || '');
    setDescription('');
    setImageUrl('https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80');
    setAvailability('in_stock');
    setIsPriceOnEnquiry(false);
    setPriceAmount('');
    setPriceUnit('per kg');
    setAllergenInfo('');
    setStorageInfo('');
    setIsFeatured(false);
    setPackageLabels('250g, 500g, 1 kg');
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setNameGu(p.nameGu || '');
    setCategoryId(p.categoryId);
    setDescription(p.description);
    setImageUrl(p.imageUrl);
    setAvailability(p.availability);
    setIsPriceOnEnquiry(p.priceAmount === null);
    setPriceAmount(p.priceAmount !== null ? String(p.priceAmount) : '');
    setPriceUnit(p.priceUnit);
    setAllergenInfo(p.allergenInfo || '');
    setStorageInfo(p.storageInfo || '');
    setIsFeatured(!!p.isFeatured);
    setPackageLabels(p.packageSizes?.map(ps => ps.label).join(', ') || '');
    setFormError('');
    setModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim()) {
      setFormError('Product name is required.');
      return;
    }
    if (!description.trim()) {
      setFormError('Product description is required.');
      return;
    }

    const matchedCategory = categories.find(c => c.id === categoryId);
    const categoryName = matchedCategory ? matchedCategory.name : 'Mithai';

    // Parse package sizes
    const packageSizes = packageLabels
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .map(label => ({
        label,
        available: true
      }));

    const finalPrice = isPriceOnEnquiry ? null : (priceAmount ? parseFloat(priceAmount) : null);

    if (editingProduct) {
      store.updateProduct(editingProduct.id, {
        name: name.trim(),
        nameGu: nameGu.trim() || undefined,
        categoryId,
        categoryName,
        description: description.trim(),
        imageUrl: imageUrl.trim(),
        availability,
        priceAmount: finalPrice,
        currency: 'INR',
        priceUnit,
        priceVerified: finalPrice !== null,
        packageSizes,
        allergenInfo: allergenInfo.trim() || undefined,
        storageInfo: storageInfo.trim() || undefined,
        isFeatured
      });
    } else {
      store.addProduct({
        name: name.trim(),
        nameGu: nameGu.trim() || undefined,
        categoryId,
        categoryName,
        description: description.trim(),
        imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80',
        availability,
        priceAmount: finalPrice,
        currency: 'INR',
        priceUnit,
        priceVerified: finalPrice !== null,
        packageSizes,
        allergenInfo: allergenInfo.trim() || undefined,
        storageInfo: storageInfo.trim() || undefined,
        isFeatured,
        displayOrder: products.length + 1
      });
    }

    setModalOpen(false);
    onRefresh();
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the catalogue?`)) {
      store.deleteProduct(id);
      onRefresh();
    }
  };

  // Filter products
  const filtered = products.filter(p => {
    if (selectedCatId !== 'all' && p.categoryId !== selectedCatId) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        (p.nameGu && p.nameGu.toLowerCase().includes(q)) ||
        p.categoryName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="animate-fade-in" style={{ padding: 'clamp(1rem, 2.5vw, 2rem)' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', color: '#332218', margin: 0 }}>
            Product Catalogue
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#806656', margin: '0.25rem 0 0' }}>
            Manage sweets, farsan items, package sizes, verified prices, and stock availability.
          </p>
        </div>

        <button onClick={openAddModal} className="btn btn-primary">
          <Plus size={16} /> Add New Product
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div 
        style={{ 
          backgroundColor: '#FFFEFA', 
          border: '1px solid #EEDCCA', 
          borderRadius: 'var(--radius-lg)', 
          padding: '1.25rem',
          marginBottom: '1.75rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ position: 'relative', flexGrow: 1, minWidth: '250px' }}>
          <input
            type="text"
            placeholder="Search products by title or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search size={18} color="#806656" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: '#806656', fontWeight: 600 }}>Category:</span>
          <select
            value={selectedCatId}
            onChange={(e) => setSelectedCatId(e.target.value)}
            className="form-select"
            style={{ width: 'auto' }}
          >
            <option value="all">All Categories ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div 
        style={{ 
          backgroundColor: '#FFFEFA', 
          border: '1px solid #EEDCCA', 
          borderRadius: 'var(--radius-lg)', 
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#FFF1DC', color: '#806656', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '0.85rem 1rem' }}>Product</th>
                <th style={{ padding: '0.85rem 1rem' }}>Category</th>
                <th style={{ padding: '0.85rem 1rem' }}>Price (INR)</th>
                <th style={{ padding: '0.85rem 1rem' }}>Availability</th>
                <th style={{ padding: '0.85rem 1rem' }}>Sizes</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} style={{ borderBottom: '1px solid #F5EAE0' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', objectFit: 'cover', backgroundColor: '#FFF1DC' }} 
                      />
                      <div>
                        <div style={{ fontWeight: 700, color: '#332218' }}>
                          {product.name}
                        </div>
                        {product.nameGu && (
                          <div style={{ fontSize: '0.8rem', color: '#EA580C', fontWeight: 600 }}>
                            {product.nameGu}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span className="badge badge-orange">{product.categoryName}</span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: product.priceAmount ? '#EA580C' : '#806656' }}>
                      {formatINR(product.priceAmount)}
                    </div>
                    {product.priceAmount && (
                      <span style={{ fontSize: '0.75rem', color: '#806656' }}>{product.priceUnit}</span>
                    )}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <select
                      value={product.availability}
                      onChange={(e) => {
                        store.updateProduct(product.id, { availability: e.target.value as any });
                        onRefresh();
                      }}
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        padding: '0.25rem 0.5rem',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid #EEDCCA',
                        backgroundColor: product.availability === 'fresh_daily' ? '#DCFCE7' : '#FFFEFA',
                        color: product.availability === 'fresh_daily' ? '#15803D' : '#332218',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="in_stock">In Stock</option>
                      <option value="fresh_daily">Fresh Daily</option>
                      <option value="seasonal">Seasonal</option>
                    </select>
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.82rem', color: '#806656' }}>
                    {product.packageSizes?.map(p => p.label).join(', ') || 'Standard'}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                      <button
                        onClick={() => openEditModal(product)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.35rem 0.65rem' }}
                        title="Edit product"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.35rem 0.65rem', color: '#B91C1C' }}
                        title="Delete product"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(51, 34, 24, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          <div 
            style={{
              backgroundColor: '#FFFEFA',
              borderRadius: 'var(--radius-xl)',
              maxWidth: '650px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2rem',
              border: '1px solid #EEDCCA',
              boxShadow: 'var(--shadow-lg)',
              position: 'relative'
            }}
            className="animate-fade-in"
          >
            <button
              onClick={() => setModalOpen(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#806656'
              }}
            >
              <X size={20} />
            </button>

            <h2 style={{ fontSize: '1.5rem', color: '#332218', marginBottom: '1.25rem' }}>
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>

            {formError && (
              <div style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.88rem' }}>
                {formError}
              </div>
            )}

            <form onSubmit={handleSaveProduct}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    placeholder="e.g. Special Kaju Katli"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Gujarati Name (Optional)</label>
                  <input
                    type="text"
                    value={nameGu}
                    onChange={(e) => setNameGu(e.target.value)}
                    className="form-input"
                    placeholder="e.g. કાજુ કાતલી"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="form-select"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Availability Status</label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value as any)}
                    className="form-select"
                  >
                    <option value="in_stock">In Stock</option>
                    <option value="fresh_daily">Fresh Daily</option>
                    <option value="seasonal">Seasonal</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-textarea"
                  placeholder="Ingredients, preparation method, texture..."
                />
              </div>

              {/* Price Row */}
              <div style={{ backgroundColor: '#FFF8ED', border: '1px solid #EEDCCA', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.25rem' }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.88rem', fontWeight: 600, color: '#332218', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={isPriceOnEnquiry}
                    onChange={(e) => setIsPriceOnEnquiry(e.target.checked)}
                    style={{ accentColor: '#EA580C' }}
                  />
                  <span>Mark as "Price on Enquiry" (e.g. for custom hampers)</span>
                </label>

                {!isPriceOnEnquiry && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Verified Price (₹ INR)</label>
                      <input
                        type="number"
                        min="0"
                        placeholder="e.g. 1100"
                        value={priceAmount}
                        onChange={(e) => setPriceAmount(e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Price Unit</label>
                      <input
                        type="text"
                        placeholder="per kg, per box, per 500g"
                        value={priceUnit}
                        onChange={(e) => setPriceUnit(e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Image URL / Path</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="form-input"
                  placeholder="/images/sweets/penda/kesar-penda.jpg or https://..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Packaging Options (comma separated)</label>
                <input
                  type="text"
                  value={packageLabels}
                  onChange={(e) => setPackageLabels(e.target.value)}
                  className="form-input"
                  placeholder="250g Box, 500g Box, 1 kg Box"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Allergen Notice</label>
                  <input
                    type="text"
                    value={allergenInfo}
                    onChange={(e) => setAllergenInfo(e.target.value)}
                    className="form-input"
                    placeholder="e.g. Contains Cashews, Milk"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Storage & Shelf Life</label>
                  <input
                    type="text"
                    value={storageInfo}
                    onChange={(e) => setStorageInfo(e.target.value)}
                    className="form-input"
                    placeholder="e.g. Cool dry place. Shelf life 15 days."
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
