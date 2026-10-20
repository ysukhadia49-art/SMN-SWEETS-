import React, { useState } from 'react';
import { Category } from '../../types';
import { store } from '../../services/store';
import { Plus, Edit, Trash2, FolderTree, Check, X, AlertCircle } from 'lucide-react';

interface AdminCategoriesProps {
  categories: Category[];
  onRefresh: () => void;
}

export const AdminCategories: React.FC<AdminCategoriesProps> = ({
  categories,
  onRefresh
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [name, setName] = useState('');
  const [nameGu, setNameGu] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [displayOrder, setDisplayOrder] = useState('1');
  const [errorMsg, setErrorMsg] = useState('');

  const openAddModal = () => {
    setEditingCategory(null);
    setName('');
    setNameGu('');
    setSlug('');
    setDescription('');
    setDisplayOrder(String(categories.length + 1));
    setErrorMsg('');
    setModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setNameGu(cat.nameGu || '');
    setSlug(cat.slug);
    setDescription(cat.description);
    setDisplayOrder(String(cat.displayOrder));
    setErrorMsg('');
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Category name is required.');
      return;
    }

    const cleanSlug = (slug.trim() || name.trim())
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    if (editingCategory) {
      store.updateCategory(editingCategory.id, {
        name: name.trim(),
        nameGu: nameGu.trim() || undefined,
        slug: cleanSlug,
        description: description.trim(),
        displayOrder: parseInt(displayOrder) || 1
      });
    } else {
      store.addCategory({
        name: name.trim(),
        nameGu: nameGu.trim() || undefined,
        slug: cleanSlug,
        description: description.trim(),
        displayOrder: parseInt(displayOrder) || 1,
        active: true
      });
    }

    setModalOpen(false);
    onRefresh();
  };

  const handleDelete = (cat: Category) => {
    if (cat.itemCount && cat.itemCount > 0) {
      alert(`Cannot delete category "${cat.name}" because it currently contains ${cat.itemCount} products. Please reassign or delete the products first.`);
      return;
    }
    if (window.confirm(`Are you sure you want to delete category "${cat.name}"?`)) {
      store.deleteCategory(cat.id);
      onRefresh();
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: 'clamp(1rem, 2.5vw, 2rem)' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', color: '#332218', margin: 0 }}>
            Product Categories
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#806656', margin: '0.25rem 0 0' }}>
            Structure and organize sweets, farsan, and gift box collections.
          </p>
        </div>

        <button onClick={openAddModal} className="btn btn-primary">
          <Plus size={16} /> Add New Category
        </button>
      </div>

      {/* Categories Grid / Table */}
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
                <th style={{ padding: '0.85rem 1rem' }}>Order</th>
                <th style={{ padding: '0.85rem 1rem' }}>Category Name</th>
                <th style={{ padding: '0.85rem 1rem' }}>Gujarati Name</th>
                <th style={{ padding: '0.85rem 1rem' }}>URL Slug</th>
                <th style={{ padding: '0.85rem 1rem' }}>Products Count</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} style={{ borderBottom: '1px solid #F5EAE0' }}>
                  <td style={{ padding: '1rem', fontWeight: 600, color: '#806656' }}>
                    #{cat.displayOrder}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: '#332218' }}>{cat.name}</div>
                    <div style={{ fontSize: '0.78rem', color: '#806656' }}>{cat.description}</div>
                  </td>
                  <td style={{ padding: '1rem', color: '#EA580C', fontWeight: 600 }}>
                    {cat.nameGu || '—'}
                  </td>
                  <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.85rem', color: '#806656' }}>
                    /{cat.slug}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span className="badge badge-orange">
                      {cat.itemCount || 0} Products
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                      <button
                        onClick={() => openEditModal(cat)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.35rem 0.65rem' }}
                        title="Edit category"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(cat)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.35rem 0.65rem', color: '#B91C1C' }}
                        title="Delete category"
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

      {/* Modal */}
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
              maxWidth: '520px',
              width: '100%',
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

            <h2 style={{ fontSize: '1.4rem', color: '#332218', marginBottom: '1.25rem' }}>
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h2>

            {errorMsg && (
              <div style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.88rem' }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">Category Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!editingCategory && !slug) {
                      setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                    }
                  }}
                  className="form-input"
                  placeholder="e.g. Dry Fruit Sweets"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Gujarati Name (Optional)</label>
                <input
                  type="text"
                  value={nameGu}
                  onChange={(e) => setNameGu(e.target.value)}
                  className="form-input"
                  placeholder="e.g. ડ્રાયફ્રૂટ સ્વીટ્સ"
                />
              </div>

              <div className="form-group">
                <label className="form-label">URL Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="form-input"
                  placeholder="dry-fruit-sweets"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-textarea"
                  placeholder="Category overview..."
                  style={{ minHeight: '75px' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Display Order</label>
                <input
                  type="number"
                  min="1"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(e.target.value)}
                  className="form-input"
                />
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
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
