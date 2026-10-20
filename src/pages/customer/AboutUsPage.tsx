import React from 'react';
import { CustomerPage, ShopSettings } from '../../types';
import { 
  Sparkles, 
  Award, 
  ShieldCheck, 
  MapPin, 
  Flame, 
  HeartHandshake, 
  CheckCircle2, 
  ArrowRight,
  Clock
} from 'lucide-react';

interface AboutUsPageProps {
  onNavigate: (page: CustomerPage) => void;
  settings: ShopSettings;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigate, settings }) => {
  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#FFF8ED', minHeight: '80vh', paddingBottom: '5rem' }}>
      {/* Header Banner */}
      <section 
        style={{ 
          backgroundColor: '#FFF1DC', 
          borderBottom: '1px solid #EEDCCA', 
          padding: 'clamp(3rem, 5vw, 5rem) 1.5rem',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '800px' }}>
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
              Four Generations of Craftsmanship
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: '#332218', marginBottom: '1rem' }}>
            Our Heritage & Story
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#806656', lineHeight: 1.7 }}>
            From the bustling bylanes of Manek Chowk in 1948 to the modern celebration tables across Gujarat, 
            discover how Sukhadiya Manilal Nathalal preserves true halwai tradition.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '3.5rem' }}>
        {/* Story Section */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '3.5rem', 
            alignItems: 'center',
            marginBottom: '4rem'
          }}
        >
          <div>
            <span className="badge badge-orange" style={{ marginBottom: '0.75rem' }}>
              The Manek Chowk Legacy
            </span>
            <h2 style={{ fontSize: '2.4rem', color: '#332218', marginBottom: '1.25rem' }}>
              Born in Ahmedabad's Historic Heart
            </h2>
            <p style={{ fontSize: '1rem', color: '#806656', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              In the historic square of Manek Chowk, amidst the gold merchants and ancient pols of Old Ahmedabad, 
              <strong> Sukhadiya Manilal Nathalal</strong> began with a singular promise: to never compromise on the purity 
              of ingredients or the integrity of time-tested Gujarati recipes.
            </p>
            <p style={{ fontSize: '0.98rem', color: '#806656', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Over seven decades, while industrial sweet manufacturers switched to palm oil and synthetic flavorings, 
              our hearths have remained true to 100% pure desi ghee, slow iron-kadhai roasting, and genuine saffron infusion. 
              Grandparents who bought their wedding mithai from our counter now bring their grandchildren for their wedding shagun.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigate('sweets')}
                className="btn btn-primary"
              >
                Explore Sweets <ArrowRight size={16} />
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="btn btn-secondary"
              >
                Visit Our Shop
              </button>
            </div>
          </div>

          <div 
            style={{ 
              borderRadius: 'var(--radius-xl)', 
              overflow: 'hidden', 
              boxShadow: 'var(--shadow-lg)',
              border: '6px solid #FFFEFA',
              backgroundColor: '#FFF1DC'
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80" 
              alt="Traditional Mohanthal Roasting"
              style={{ width: '100%', height: '400px', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>

        {/* 4 Pillars of Purity */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 2.5rem' }}>
            <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>
              Our Unshakable Pillars
            </span>
            <h2 style={{ fontSize: '2.2rem', color: '#332218' }}>
              The Sukhadiya Purity Standards
            </h2>
          </div>

          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
              gap: '1.75rem' 
            }}
          >
            {[
              {
                icon: <ShieldCheck size={26} color="#EA580C" />,
                title: '100% Pure Desi Ghee',
                desc: 'Every laddoo, mohanthal, halwa, and peda is cooked exclusively in pure cow ghee. No vanaspati, no adulterants.'
              },
              {
                icon: <Flame size={26} color="#EA580C" />,
                title: 'Artisanal Wood & Flame',
                desc: 'Slow batch roasting that caramelizes milk solids and besan to nutty perfection without scorching or rushing.'
              },
              {
                icon: <Award size={26} color="#EA580C" />,
                title: 'Hand-Selected Dry Fruits',
                desc: 'Grade-A whole Goan cashews, Mamra almonds, and Iranian pistachios ground in-house for rich wholesome textures.'
              },
              {
                icon: <HeartHandshake size={26} color="#EA580C" />,
                title: 'No Artificial Chemicals',
                desc: 'Pure saffron strands for color and aroma. Zero artificial essences, emulsifiers, or synthetic preservatives.'
              }
            ].map((pillar, i) => (
              <div 
                key={i} 
                style={{ 
                  backgroundColor: '#FFFEFA', 
                  borderRadius: 'var(--radius-lg)', 
                  border: '1px solid #EEDCCA', 
                  padding: '2rem 1.5rem',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div 
                  style={{ 
                    width: '52px', 
                    height: '52px', 
                    borderRadius: '50%', 
                    backgroundColor: '#FFF1DC', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginBottom: '1.25rem'
                  }}
                >
                  {pillar.icon}
                </div>
                <h3 style={{ fontSize: '1.2rem', color: '#332218', marginBottom: '0.5rem' }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#806656', lineHeight: 1.6, margin: 0 }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
