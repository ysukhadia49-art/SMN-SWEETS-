import React, { useState } from 'react';
import { ShopSettings } from '../../types';
import { store } from '../../services/store';
import { generateDirectShopWhatsAppUrl } from '../../utils/whatsapp';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  ExternalLink, 
  Send, 
  CheckCircle2, 
  Sparkles,
  MessageSquare
} from 'lucide-react';

interface ContactPageProps {
  settings: ShopSettings;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    store.createEnquiry({
      customerName: name.trim(),
      contactNumber: phone.trim(),
      email: email.trim() || undefined,
      occasion: 'Other',
      requestedDate: new Date().toISOString().split('T')[0],
      requestedProducts: 'General Shop Enquiry: ' + message.trim(),
      approximateQuantity: 'General Enquiry',
      collectionOrDelivery: 'pickup',
      notes: message.trim()
    });

    setSubmitted(true);
  };

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
            <MapPin size={14} color="#EA580C" />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#EA580C', textTransform: 'uppercase' }}>
              Manek Chowk, Ahmedabad
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#332218', marginBottom: '0.75rem' }}>
            Visit Our Shop & Contact Us
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#806656', lineHeight: 1.6 }}>
            Whether you are visiting our historic Manek Chowk counter for fresh jalebi or 
            planning a lavish wedding feast, we are always eager to assist.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '3.5rem' }}>
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '3rem',
            alignItems: 'flex-start'
          }}
        >
          {/* Shop Information Column */}
          <div>
            <div 
              style={{ 
                backgroundColor: '#FFFEFA', 
                borderRadius: 'var(--radius-xl)', 
                border: '1px solid #EEDCCA', 
                padding: '2rem',
                boxShadow: 'var(--shadow-sm)',
                marginBottom: '2rem'
              }}
            >
              <h3 style={{ fontSize: '1.4rem', color: '#332218', marginBottom: '1.5rem', borderBottom: '1px solid #F5EAE0', paddingBottom: '0.75rem' }}>
                Store Details
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Address */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div 
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      backgroundColor: '#FFF1DC', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: '#EA580C'
                    }}
                  >
                    <MapPin size={20} />
                  </div>
                  <div>
                    <strong style={{ color: '#332218', fontSize: '1rem', display: 'block', marginBottom: '0.2rem' }}>
                      Physical Address:
                    </strong>
                    <span style={{ color: '#806656', fontSize: '0.92rem', lineHeight: 1.5, display: 'block' }}>
                      {settings.address}, {settings.city}, {settings.state} - {settings.pincode}
                    </span>
                    <a
                      href={settings.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ 
                        color: '#EA580C', 
                        fontSize: '0.86rem', 
                        fontWeight: 600, 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '0.25rem',
                        marginTop: '0.4rem',
                        textDecoration: 'none'
                      }}
                    >
                      Open in Google Maps <ExternalLink size={13} />
                    </a>
                  </div>
                </div>

                {/* Operating Hours */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div 
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      backgroundColor: '#FFF1DC', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: '#EA580C'
                    }}
                  >
                    <Clock size={20} />
                  </div>
                  <div>
                    <strong style={{ color: '#332218', fontSize: '1rem', display: 'block', marginBottom: '0.2rem' }}>
                      Shop Timings:
                    </strong>
                    <span style={{ color: '#806656', fontSize: '0.92rem', lineHeight: 1.5, display: 'block' }}>
                      {settings.openingHours}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#15803D', fontWeight: 600 }}>
                      Open all 7 days including Sunday & public holidays
                    </span>
                  </div>
                </div>

                {/* WhatsApp Support */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div 
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      backgroundColor: '#DCFCE7', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: '#15803D'
                    }}
                  >
                    <Phone size={20} />
                  </div>
                  <div>
                    <strong style={{ color: '#332218', fontSize: '1rem', display: 'block', marginBottom: '0.2rem' }}>
                      Verified WhatsApp Desk:
                    </strong>
                    <span style={{ color: '#806656', fontSize: '0.92rem', display: 'block' }}>
                      {settings.verifiedWhatsAppNumber}
                    </span>
                    <a
                      href={generateDirectShopWhatsAppUrl(settings.verifiedWhatsAppNumber)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp btn-sm"
                      style={{ marginTop: '0.5rem', textDecoration: 'none' }}
                    >
                      <Phone size={14} /> Chat on WhatsApp
                    </a>
                  </div>
                </div>

                {/* Landline Counter */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div 
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      backgroundColor: '#FFF1DC', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: '#EA580C'
                    }}
                  >
                    <Phone size={20} />
                  </div>
                  <div>
                    <strong style={{ color: '#332218', fontSize: '1rem', display: 'block', marginBottom: '0.2rem' }}>
                      Counter Calling Phone:
                    </strong>
                    <span style={{ color: '#806656', fontSize: '0.92rem' }}>
                      {settings.phone}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Landmark Guidance Card */}
            <div 
              style={{ 
                backgroundColor: '#FFF1DC', 
                borderRadius: 'var(--radius-lg)', 
                border: '1px solid #EEDCCA', 
                padding: '1.5rem' 
              }}
            >
              <h4 style={{ fontSize: '1.05rem', color: '#332218', marginBottom: '0.4rem' }}>
                How to Reach in Manek Chowk:
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#806656', lineHeight: 1.6, margin: 0 }}>
                Located right near the traditional jewelry merchants of Choksi Bazar. 
                Vehicles can be parked at the nearby AMC Multilevel Parking at Kankaria or Bhadra Plaza, 
                with a picturesque 3-minute stroll through the historic pol market.
              </p>
            </div>
          </div>

          {/* Quick Contact Form Column */}
          <div 
            style={{ 
              backgroundColor: '#FFFEFA', 
              borderRadius: 'var(--radius-xl)', 
              border: '1px solid #EEDCCA', 
              padding: '2.5rem',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <h3 style={{ fontSize: '1.4rem', color: '#332218', marginBottom: '0.5rem' }}>
              Send an Enquiry / Message
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#806656', marginBottom: '1.75rem' }}>
              Have questions regarding festival sweets, custom gift boxes, or bulk orders? 
              Leave us a note and we will reply promptly.
            </p>

            {submitted ? (
              <div 
                className="animate-fade-in"
                style={{ 
                  backgroundColor: '#DCFCE7', 
                  border: '1px solid #86EFAC', 
                  borderRadius: 'var(--radius-lg)', 
                  padding: '2rem',
                  textAlign: 'center'
                }}
              >
                <CheckCircle2 size={40} color="#15803D" style={{ margin: '0 auto 0.75rem' }} />
                <h4 style={{ fontSize: '1.2rem', color: '#14532D', marginBottom: '0.35rem' }}>
                  Message Received!
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#166534', margin: '0 0 1.25rem' }}>
                  Thank you, {name}. Our Manek Chowk team has logged your enquiry and will connect with you on {phone}.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn btn-outline btn-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anandbhai Patel"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98250 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email (Optional)</label>
                  <input
                    type="email"
                    placeholder="e.g. anand@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message / Enquiry *</label>
                  <textarea
                    required
                    placeholder="How can we assist you today? (e.g., sweet availability, gift box pricing, event orders)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="form-textarea"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  <Send size={16} /> Send Message to Shop
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
