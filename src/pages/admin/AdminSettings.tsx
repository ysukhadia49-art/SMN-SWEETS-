import React, { useState } from 'react';
import { ShopSettings } from '../../types';
import { store } from '../../services/store';
import { cleanPhoneForWhatsApp } from '../../utils/whatsapp';
import { 
  Settings, 
  Save, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface AdminSettingsProps {
  settings: ShopSettings;
  onRefresh: () => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ settings, onRefresh }) => {
  const [formData, setFormData] = useState<ShopSettings>({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Validate WhatsApp number
  const cleanedDigits = cleanPhoneForWhatsApp(formData.verifiedWhatsAppNumber);
  const isWhatsAppFormatValid = cleanedDigits.length >= 10 && cleanedDigits.length <= 13;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateShopSettings({
      ...formData,
      isWhatsAppVerified: isWhatsAppFormatValid
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
    onRefresh();
  };

  const handleResetToFactory = () => {
    if (window.confirm('Reset all products, categories, enquiries, and settings back to verified factory demo state? This will purge all local changes.')) {
      store.resetToFactoryDemo();
      setFormData(store.getShopSettings());
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
      onRefresh();
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: 'clamp(1rem, 2.5vw, 2rem)', maxWidth: '850px' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.85rem', color: '#332218', margin: 0 }}>
          Shop & Contact Settings
        </h1>
        <p style={{ fontSize: '0.92rem', color: '#806656', margin: '0.25rem 0 0' }}>
          Configure verified business details, Manek Chowk store address, WhatsApp contact desk, and hours.
        </p>
      </div>

      {savedSuccess && (
        <div 
          className="animate-fade-in"
          style={{ 
            backgroundColor: '#DCFCE7', 
            color: '#15803D', 
            padding: '0.85rem 1.25rem', 
            borderRadius: 'var(--radius-md)', 
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 600
          }}
        >
          <CheckCircle2 size={18} /> Shop settings updated and saved successfully!
        </div>
      )}

      {resetSuccess && (
        <div 
          className="animate-fade-in"
          style={{ 
            backgroundColor: '#FEF3C7', 
            color: '#92400E', 
            padding: '0.85rem 1.25rem', 
            borderRadius: 'var(--radius-md)', 
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 600
          }}
        >
          <RotateCcw size={18} /> Restored default catalogue and shop settings!
        </div>
      )}

      {/* Main Settings Card */}
      <div 
        style={{ 
          backgroundColor: '#FFFEFA', 
          border: '1px solid #EEDCCA', 
          borderRadius: 'var(--radius-xl)', 
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '2rem'
        }}
      >
        <form onSubmit={handleSave}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Business Name *</label>
              <input
                type="text"
                required
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Business Type</label>
              <input
                type="text"
                value={formData.businessType}
                onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Hero Tagline</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="form-input"
            />
          </div>

          {/* WhatsApp Configuration with Validation */}
          <div 
            style={{ 
              backgroundColor: '#FFF8ED', 
              border: isWhatsAppFormatValid ? '1px solid #EEDCCA' : '1px solid #F87171', 
              borderRadius: 'var(--radius-lg)', 
              padding: '1.25rem',
              marginBottom: '1.5rem'
            }}
          >
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Phone size={15} color="#15803D" /> Verified WhatsApp Number (for Customer Enquiries) *
            </label>
            <input
              type="text"
              required
              value={formData.verifiedWhatsAppNumber}
              onChange={(e) => setFormData({ ...formData, verifiedWhatsAppNumber: e.target.value })}
              className="form-input"
              placeholder="+919825012345"
            />
            {!isWhatsAppFormatValid ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#B91C1C', fontSize: '0.82rem', marginTop: '0.4rem' }}>
                <AlertTriangle size={14} /> Please enter a valid phone number with country code (e.g. +91 98250 12345).
              </div>
            ) : (
              <div style={{ color: '#15803D', fontSize: '0.8rem', marginTop: '0.4rem' }}>
                ✓ Clean WhatsApp format: <strong>+{cleanedDigits}</strong>
              </div>
            )}
          </div>

          {/* Physical Address */}
          <div className="form-group">
            <label className="form-label">Shop Street Address in Manek Chowk *</label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="form-input"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Pincode</label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Google Maps URL *</label>
            <input
              type="url"
              required
              value={formData.googleMapsUrl}
              onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Live Storefront / Website URL (Vercel)</label>
            <input
              type="url"
              value={formData.websiteUrl || 'https://smn-sweets.vercel.app/'}
              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              className="form-input"
              placeholder="https://smn-sweets.vercel.app/"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Calling Landline / Counter Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Official Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Opening Hours</label>
            <input
              type="text"
              value={formData.openingHours}
              onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
              className="form-input"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button type="submit" className="btn btn-primary">
              <Save size={16} /> Save Shop Settings
            </button>
          </div>
        </form>
      </div>

      {/* Legacy Notice & Factory Reset Card */}
      <div 
        style={{ 
          backgroundColor: '#FFF1DC', 
          border: '1px solid #EEDCCA', 
          borderRadius: 'var(--radius-lg)', 
          padding: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}
      >
        <div>
          <h4 style={{ fontSize: '1rem', color: '#332218', margin: 0 }}>
            Restore Factory Demo Data
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#806656', margin: '0.2rem 0 0' }}>
            Resets all sweets, farsan, bulk enquiries, and Manek Chowk configurations to clean verified defaults.
          </p>
        </div>

        <button
          onClick={handleResetToFactory}
          className="btn btn-secondary btn-sm"
          style={{ borderColor: '#EA580C', color: '#EA580C' }}
        >
          <RotateCcw size={14} /> Restore Defaults
        </button>
      </div>
    </div>
  );
};
